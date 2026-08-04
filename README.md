# 🤖 AI RAG Chatbot with Intelligent Web Search

An AI-powered chatbot built using **FastAPI**, **Google Gemini**, **Pinecone**, and **PostgreSQL** that can answer questions using:

- 📄 Uploaded documents (PDF & DOCX)
- 💬 Conversation history
- 🌐 Live web search (when required)

Unlike traditional RAG applications, this chatbot intelligently decides **when a web search is needed** and automatically rewrites follow-up questions into standalone search queries before retrieving information from the web.

---

# 🚀 Features

- 🔐 User Authentication
  - Signup
  - Login
  - Password hashing using bcrypt

- 💬 Chat Sessions
  - Multiple chat sessions
  - Conversation history
  - Automatic chat title generation

- 📄 Document Upload
  - PDF support
  - DOCX support
  - Automatic text extraction
  - Text chunking
  - Embedding generation

- 🧠 RAG (Retrieval Augmented Generation)
  - Gemini Embeddings
  - Pinecone Vector Database
  - Semantic Search

- 🌐 Intelligent Web Search
  - AI decides if web search is required
  - Query rewriting for follow-up questions
  - Web scraping from multiple sources
  - AI summarizes web content before generating the final answer

- 🎤 Voice Input
  - Speech-to-text
  - Google Speech Recognition

---

# 🏗 Architecture

```text
                    User Query
                         │
                         ▼
                 Save User Message
                         │
                         ▼
            Load Last Conversation
                         │
                         ▼
                Generate Embedding
                         │
                         ▼
               Search Pinecone Index
                         │
                         ▼
             Gemini Web Search Router
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
     Web Search Not Needed        Web Search Needed
          │                             │
          │                     Rewrite Search Query
          │                             │
          │                             ▼
          │                     Search the Web
          │                             │
          │                             ▼
          │                   Extract Page Content
          │                             │
          │                             ▼
          │                 Summarize Web Results
          │                             │
          └──────────────┬──────────────┘
                         ▼
             Final Response Generation
                         │
                         ▼
                 Save Chat History
                         │
                         ▼
                    Return Response
```

---

# 🛠 Tech Stack

## Backend

- FastAPI
- Python
- PostgreSQL
- Pinecone
- Google Gemini API
- BeautifulSoup
- Requests
- bcrypt
- SpeechRecognition

## AI

- Gemini 2.5 Flash
- Gemini Embeddings
- Prompt Engineering
- Retrieval Augmented Generation (RAG)

## Database

- PostgreSQL

Tables:

- users
- chat_sessions
- chat_history
- documents
- document_chunks

## Vector Database

- Pinecone

---

# 📂 Project Structure

```
backend/
│
├── main.py
├── database.py
├── responseGenerationPrompt.py
├── webSearchRouterPrompt.py
├── rewriteSearchQueryPrompt.py
├── webScrapingPrompt.py
├── requirements.txt
├── .env
│
├── uploads/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git

cd <repository-name>
```

---

## Create Virtual Environment

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file

```env
GEMINI_API_KEY=YOUR_GEMINI_KEY

PINECONE_API_KEY=YOUR_PINECONE_KEY

PINECONE_INDEX=YOUR_INDEX_NAME

PINECONE_HOST=YOUR_HOST
```

---

## Run Backend

```bash
uvicorn main:app --reload
```

Server

```
http://127.0.0.1:8000
```

---

# 📑 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/signup` | Register User |
| POST | `/login` | Login User |

---

## Sessions

| Method | Endpoint |
|---------|----------|
| POST | `/sessions` |
| GET | `/chat/sessions/{userId}` |
| GET | `/session/{id}` |

---

## Chat

| Method | Endpoint |
|---------|----------|
| POST | `/generate` |
| GET | `/chat/history/{session_id}` |

---

## Documents

| Method | Endpoint |
|---------|----------|
| POST | `/docUpload` |

---

## Voice

| Method | Endpoint |
|---------|----------|
| POST | `/voiceChat` |

---

# 🧠 How the AI Works

## Step 1

User asks a question.

↓

## Step 2

Conversation history is loaded.

↓

## Step 3

Relevant document chunks are retrieved from Pinecone.

↓

## Step 4

A Gemini Router determines whether a web search is required.

↓

## Step 5 (If Required)

The user's query is rewritten into a standalone search query.

Example:

User

```
Tell me more.
```

↓

Rewritten Query

```
Tell me more about Nirmal Purja (Nimsdai).
```

↓

## Step 6

Relevant web pages are scraped.

↓

## Step 7

Gemini summarizes the scraped web content.

↓

## Step 8

Gemini generates the final response using:

- Conversation History
- Document Chunks
- Web Search Results
- General Knowledge

---

# 🧩 Intelligent Routing

The chatbot automatically decides whether to perform a web search.

Examples:

| User Query | Web Search |
|------------|------------|
| Summarize my uploaded PDF | ❌ |
| Explain Python Lists | ❌ |
| Latest IPL Winner | ✅ |
| Tell me more | ✅ *(if referring to a web topic)* |
| Is he still alive? | ✅ |

---

# 📄 Supported File Types

- PDF
- DOCX

---

# 🔒 Security

- Password hashing using bcrypt
- Parameterized SQL queries
- Environment variables for API keys

---

# 📈 Future Improvements

- Streaming responses
- Async web scraping
- Redis caching
- Citation support
- Hybrid search
- Multi-document retrieval
- Image understanding
- OCR support
- Conversation summarization
- Background task queue

---

# 👨‍💻 Author

**Chinmay Pathak**

Backend Developer | AI Enthusiast

---

# 📜 License

This project is licensed under the MIT License.
