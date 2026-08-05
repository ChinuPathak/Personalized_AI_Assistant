import os
import time
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    retries = 10
    delay = 3

    while retries > 0:
        try:
            conn = psycopg2.connect(
                dbname=os.getenv("DB_NAME"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                host=os.getenv("DB_HOST"),
                port=os.getenv("DB_PORT"),
            )
            print("✅ Connected to PostgreSQL")
            return conn

        except psycopg2.OperationalError as e:
            retries -= 1
            print(f"❌ Database not ready ({e})")
            print(f"Retrying in {delay} seconds... ({retries} retries left)")
            time.sleep(delay)

    raise Exception("Could not connect to PostgreSQL after multiple retries.")


def create_tables():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS chat_sessions(
        session_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        title TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS chat_history(
        message_id SERIAL PRIMARY KEY,
        session_id INTEGER NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS documents(
        document_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        session_id INTEGER REFERENCES chat_sessions(session_id) ON DELETE SET NULL,
        file_name TEXT NOT NULL,
        file_type VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS document_chunks(
        chunk_id SERIAL PRIMARY KEY,
        document_id INTEGER NOT NULL REFERENCES documents(document_id) ON DELETE CASCADE,
        chunk_number INTEGER,
        chunk_text TEXT
    );
    """)

    conn.commit()
    cur.close()
    conn.close()