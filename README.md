# 🤖 Personalized AI Assistant

A full-stack AI-powered personal assistant that enables users to chat with an AI, upload documents, maintain conversation history, and interact using voice. The application is built with a modern React frontend, FastAPI backend, PostgreSQL database, and vector search powered by Pinecone.

## 🌐 Live Demo

**Frontend:** https://personalized-ai-assistant-amber.vercel.app

**Backend API:** https://personalized-ai-assistant-95rh.onrender.com

---

# 📸 Screenshots

> Add screenshots inside the `screenshots/` folder and update the image paths below.

### Login

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Chat

![Chat](screenshots/chat.png)

### Document Upload

![Upload](screenshots/upload.png)

---

# ✨ Features

- 🔐 User Authentication
- 💬 AI Chat Assistant
- 📄 Upload PDF, DOCX and TXT files
- 🧠 Document-based Question Answering
- 🎤 Voice Input Support
- 💾 Persistent Chat History
- 📚 Multiple Chat Sessions
- 🔍 Semantic Search using Pinecone
- ⚡ Gemini AI Integration
- 🐳 Dockerized Application
- ☁️ Cloud Deployment

---

# 🏗️ Architecture

```text
                    React + TypeScript
                           │
                           ▼
                      Axios API Calls
                           │
                           ▼
                 FastAPI Backend (Python)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   Gemini AI         Neon PostgreSQL      Pinecone
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- Tailwind CSS

## Backend

- FastAPI
- Python
- Psycopg2
- Google Gemini API
- Pinecone

## Database

- PostgreSQL (Neon)

## Deployment

- Vercel
- Render
- Docker
- GitHub

---

# 📂 Project Structure

```
Personalized_AI_Assistant
│
├── backend
│   ├── Dockerfile
│   ├── index.py
│   ├── database.py
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   └── ...
│
├── screenshots
│
├── docker-compose.yml
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/ChinuPathak/Personalized_AI_Assistant.git

cd Personalized_AI_Assistant
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\Activate

pip install -r requirements.txt

uvicorn index:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🐳 Docker

Build and run the project using Docker Compose.

```bash
docker compose up --build
```

---

# 🔑 Environment Variables

## Backend

```env
DATABASE_URL=

GEMINI_API_KEY=

PINECONE_API_KEY=

PINECONE_INDEX=

PINECONE_HOST=
```

---

## Frontend

```env
VITE_API_URL=
```

---

# 📖 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /signup | Register User |
| POST | /login | Login User |
| POST | /sessions | Create Chat Session |
| POST | /generate | Generate AI Response |
| POST | /docUpload | Upload Documents |
| POST | /voiceChat | Voice Input |
| GET | /chat/history/{sessionId} | Chat History |
| GET | /chat/sessions/{userId} | User Sessions |
| DELETE | /sessions/{sessionId} | Delete Session |

---

# 🚀 Deployment

### Frontend

Vercel

### Backend

Render

### Database

Neon PostgreSQL

---

# 🔮 Future Improvements

- Streaming AI Responses
- Dark Mode
- AI Conversation Memory
- Image Upload Support
- OCR Integration
- Multi-language Support
- User Profile Management
- Export Chat as PDF
- Admin Dashboard

---

# 👨‍💻 Author

**Chinmay Pathak**

GitHub: https://github.com/ChinuPathak

LinkedIn: https://www.linkedin.com/in/chinmaypathak18/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.