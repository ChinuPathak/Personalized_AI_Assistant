from fastapi import FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import bcrypt
from pydantic import BaseModel, EmailStr
import os
import google.generativeai as genai
from dotenv import load_dotenv
import speech_recognition as sr
import sounddevice as sd
from scipy.io.wavfile import write
import json
import tempfile
import fitz
import docx
import io
from bs4 import BeautifulSoup
from urllib.parse import quote, urlparse, parse_qs, unquote
import requests
from ddgs import DDGS
from webScrapingPrompt import web_Scraping_Prompt
from responseGenerationPrompt import response_Generation_Prompt
from database import create_tables, get_db_connection
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pinecone import Pinecone

load_dotenv()
create_tables()

secret_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key = secret_key)
model = genai.GenerativeModel("gemini-2.5-flash")
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone_index = os.getenv("PINECONE_INDEX")
pinecone_host = os.getenv("PINECONE_HOST")

# client = genai.Client(api_key=secret_key)
pc = Pinecone(api_key=pinecone_api_key)
index = pc.Index(pinecone_index , pinecone_host)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development (later restrict this)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SignupRequest(BaseModel):
    name: str
    email: EmailStr  # Automatically validates email formatting (e.g., user@domain.com)
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class sessionRequest(BaseModel):
    user_id: int

class textChatRequest(BaseModel):
    query: str

class webScrapRequest(BaseModel):
    query: str

class GenerateRequest(BaseModel):
    session_id: int
    query: str


def create_session(conn, cur, user_id):
    title = "New Chat"
    status = "EMPTY"

    query = """
    INSERT INTO chat_sessions(user_id, title, status)
    VALUES (%s, %s, %s)
    RETURNING session_id;
    """

    cur.execute(query, (user_id, title, status))
    return cur.fetchone()[0]


@app.post("/signup" , status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest):
    # Hash the password
    password_bytes = request.password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password_bytes = bcrypt.hashpw(password_bytes, salt)
    hashed_password_string = hashed_password_bytes.decode('utf-8')
    
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Inject the new structural account record safely using %s placeholders
        insert_query = """
        INSERT INTO users (name, email, password)
        VALUES (%s, %s, %s)
        """
        cur.execute(insert_query, (request.name, request.email, hashed_password_string))

        # Save transaction alterations explicitly to database state
        conn.commit()
        return {"message": "User registered successfully!"}

    except psycopg2.errors.UniqueViolation:
        if conn:
            conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email identifier profile already exists."
        )
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Database operational failure: {str(e)}"
        )
    finally:
        if cur: cur.close()
        if conn: conn.close()

@app.post("/login")
def login(request: LoginRequest):
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Fetch matching record based on inbound payload details
        select_query = "SELECT password, name, user_id FROM users WHERE email = %s;"
        cur.execute(select_query, (request.email,))
        user_record = cur.fetchone()

        # Fail explicitly if identity profile wasn't located
        if not user_record:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid credentials layout."
            )

        saved_hash_string, user_name, user_id = user_record
        
        # Compare provided login password with stored database hash string
        input_password_bytes = request.password.encode('utf-8')
        saved_hash_bytes = saved_hash_string.encode('utf-8')

        if not bcrypt.checkpw(input_password_bytes, saved_hash_bytes):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials."
            )

        session_id = create_session(conn , cur , user_id)

        conn.commit()

        return {
            "message": "Login successful!",
            "user": {
                "user_id": user_id,
                "name": user_name,
                "email": request.email
            },
            "session": {
                "session_id": session_id,
                "title": "New Chat",
                "status": "EMPTY"
            }
        }

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Authentication exception: {str(e)}"
        )
    finally:
        if cur: cur.close()
        if conn: conn.close()

@app.post("/sessions")
def sessions(request: sessionRequest):
    conn = get_db_connection()
    cur = conn.cursor()
    user_id = request.user_id
    sessionId = create_session(conn , cur , user_id)
    print("sessionId>>>>>>>>>>>>>>>>>>>>>" , sessionId)
    conn.commit()
    cur.close()
    conn.close()
    return {"sessionId" : sessionId , "message" : "Session created successfully"}


@app.get("/session/{id}")
def dataBasedOnSessionId(id : int):
    conn = get_db_connection()
    cur = conn.cursor()
    select_query = """
    SELECT * FROM chat_sessions 
    WHERE session_id = %s
    """
    cur.execute(select_query,(id,))
    session = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    print("sessionData>>>>>>>>>>>>>>>>>>" , session)
    return {
        "session": {
            "session_id": session[0],
            "user_id": session[1],
            "title": session[2],
            "status": session[3],
            "created_at": session[4]
        }
    }

@app.post("/voiceChat")
def voiceChat():
    r = sr.Recognizer()

    SAMPLE_RATE = 44100
    DURATION = 10  # seconds

    print("Listening...")

    # Record audio
    recording = sd.rec(
        int(DURATION * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype='int16'
    )

    sd.wait()

    # Save temporary WAV file
    temp_wav = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    write(temp_wav.name, SAMPLE_RATE, recording)

    # Read audio using SpeechRecognition
    with sr.AudioFile(temp_wav.name) as source:
        audio = r.record(source)

    # Convert speech to text
    text = r.recognize_google(audio)
    text = text.lower()

    print("You said:", text)

    # i will just send this text to frontend and frontend will show this in the text area and then when i click send button then give to me.
    return {
        "message" : "Audio text stored in database",
        "data" : text
    }

@app.post("/docUpload")
async def docUpload(userId: int, sessionId: int , file: UploadFile = File(...)):
    conn = get_db_connection()
    cur = conn.cursor()

    # Read uploaded file
    contents = await file.read()
    text = ""
    fileName = file.filename
    fileType = ""

    if file.filename.endswith(".pdf"):
        fileType = "pdf"
        doc = fitz.open(stream=contents, filetype="pdf")
        for page in doc:
            text += page.get_text()

    elif file.filename.endswith(".docx"):
        fileType = "docx"
        doc = docx.Document(io.BytesIO(contents))
        for para in doc.paragraphs:
            text += para.text + "\n"

    else:
        return {"error": "Unsupported file format. Please upload PDF or DOCX."}

    insert_query = """
    INSERT INTO documents(user_id , session_id , file_name , file_type)
    VALUES (%s , %s , %s , %s)
    RETURNING document_id;
    """
    
    cur.execute(insert_query,(userId , sessionId , fileName , fileType))
    documentId = cur.fetchone()[0]

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    # splitDocs = await splitter.splitDocuments(text);
    # splitter.split_text(text)
    splitDocs = splitter.create_documents([text])
    print("chunk>>>>>>>>>>>>>>>>" , splitDocs)

    # embed documents
    doc_embeddings = []

    for i , doc in enumerate(splitDocs):
        response = model.embed_content(
            model="gemini-embedding-001",
            contents=doc.page_content
        )

        embedding = response.embeddings[0].values
        doc_embeddings.append(embedding)
        insert_query = """
        INSERT INTO document_chunks(document_id , chunk_number , chunk_text)
        VALUES (%s , %s , %s)
        """
        cur.execute(insert_query , (documentId , i+1 , doc.page_content))

    print("Embeddings >>>>>>>>>>>>>>>", doc_embeddings)

    records = []
    for i, embedding in enumerate(doc_embeddings):
        records.append({
            "id" : f"{documentId}_{i+1}",
            "values": embedding,
            "metadata": {
                "user_id": userId,
                "document_id": documentId,
                "session_id": sessionId,
                "file_name": fileName,
                "text": splitDocs[i].page_content
            }
        })

    print("Records >>>>>>>>>>>>>>>", records)
    index.upsert(
        vectors=records,
        namespace="__default__"
    )

    print("Documents uploaded successfully!")
    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Document stored successfully",
        "total_documents": len(splitDocs)
    }

    # response = model.generate_content(text)
    # print("response>>>>>>>>>>>>>>>>>>>>" , response.text)


    # """
    # Extract actual URL from DuckDuckGo redirect URLs.
    # """
    # try:
    #     parsed = urlparse(ddg_url)

    #     if "duckduckgo.com" in parsed.netloc:
    #         params = parse_qs(parsed.query)

    #         if "uddg" in params:
    #             return unquote(params["uddg"][0])

    #     return ddg_url

    # except Exception:
    #     return ddg_url

def get_top_urls(query, num_results=3):
    # Using the new ddgs context manager
    with DDGS() as ddgs:
        # Specifying 'html' or 'lite' backend bypasses strict cloud/IP blocks
        results = ddgs.text(query, max_results=num_results, backend="html")
        
        # Safely extract the 'href' (URL) from the result dictionaries
        return [item['href'] for item in results if 'href' in item]

# webScraping will be used when the document data is not present in the db to answer the query
@app.post("/webScrape")
def webScrape(request: webScrapRequest):
    query = request.query
    print("query>>>>>>>>>>>>>>" , query)
    top_urls = get_top_urls(query, 3)
    print("top urls>>>>>>>>>>>>>>>>>>",top_urls)

    content = []
    for i in top_urls:
        res = requests.get(i)
        print("the status code is>>>>>>>>>>" , res.status_code)
        print("/n")
        soup_data = BeautifulSoup(res.text , "html.parser")
        # print(soup_data.title)
        print("/n")
        paragraphs = soup_data.find_all('p')
        print("paragraph>>>>>>>>>>>>>>>" , paragraphs)
        # text = "\n".join(
        #     p.get_text(strip=True)
        #     for p in paragraphs
        #         if p.get_text(strip=True)  # Skip empty paragraphs
        # )
        # print("text>>>>>>>>>>>>>" , text)
        # content.append(text)
        content.append(paragraphs)
    
    print("content>>>>>>>>>>>>>>>>" , content)
    prompt = web_Scraping_Prompt(content)
    response = model.generate_content(prompt)
    print("response>>>>>>>>>>>>>>>>>>>>" , response.text)

@app.post("/generate")
def generateResponse(request: GenerateRequest):
    conn = get_db_connection()
    cur = conn.cursor()
    status = "ACTIVE"

    sessionId = request.session_id
    query = request.query

    select_titleQuery = """
    SELECT title
    FROM chat_sessions
    WHERE session_id=%s
    """
    cur.execute(select_titleQuery, (sessionId,))
    title = cur.fetchone()[0]
    if title == "New Chat":
        update_query = """
        UPDATE chat_sessions 
        SET title = %s
        WHERE session_id = %s
        """
        cur.execute(update_query , (query , sessionId))

    update_statusQuery = """
    UPDATE chat_sessions
    SET status = %s
    WHERE session_id = %s
    """
    cur.execute(update_statusQuery, (status , sessionId))
    response = model.embed_content(
        model="gemini-embedding-001",
        contents=query
    )
    embeddedQuery = response.embeddings[0].values

    insert_query = """
    INSERT INTO chat_history(session_id , role , message)
    VALUES (%s,%s,%s) 
    """
    cur.execute(insert_query,(sessionId , "user" , query))    

    select_query = """
    SELECT role, message, created_at
    FROM chat_history
    WHERE session_id = %s
    ORDER BY message_id DESC
    LIMIT 10;
    """
    cur.execute(select_query,(sessionId,))
    messages = cur.fetchall()
    print("messages>>>>>>>>>>>>>>>>>>>>>>>",messages)
    reverseMessages = list(reversed(messages))
    print("reveredMessage>>>>>>>>>>>>>" , reverseMessages)

    search_result = index.query(
        vector=embeddedQuery,
        top_k=5,
        include_metadata=True,
        filter={
           "session_id": sessionId
        }
    )

    # Extract the relevant chunks
    relevant_chunks = [
        {"pageContent": match["metadata"]["text"]}
        for match in search_result["matches"]
    ]

    print("Relevant Chunks >>>>>>>>>>>>>",relevant_chunks)

    prompt = response_Generation_Prompt(query , reverseMessages , relevant_chunks)
    response = model.generate_content(prompt)
    print("response>>>>>>>>>>>>>>>>>>" , response.text)
    llm_response = """
    INSERT INTO chat_history(session_id , role , message)
    VALUES (%s,%s,%s) 
    """
    cur.execute(llm_response,(sessionId , "assistant" , response.text))
    conn.commit()

    cur.close()
    conn.close()
    return {
        "response": response.text
    }
