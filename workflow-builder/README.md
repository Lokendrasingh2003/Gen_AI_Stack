# 🧠 AI Workflow Builder  
*(React + FastAPI + PostgreSQL + ChromaDB)*

A no-code / low-code platform to visually build and execute AI-powered workflows using drag-and-drop components, document embeddings, and LLM-based chat interactions.

---

## 🚀 Run with Docker

### 1️⃣ Create `.env` file in root

- OPENAI_API_KEY=your_openai_key_here
- GEMINI_API_KEY=your_gemini_key_here # optional
- SERPAPI_API_KEY=your_serpapi_key_here # optional


### 2️⃣ Start the application

- docker-compose up --build


---

## 🌐 URLs

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:8000  
- **ChromaDB:** http://localhost:8001  

---

## 🧩 Core Components

- **User Query Node** – Accepts user input
- **Knowledge Base Node** – Uploads PDFs, extracts text, creates embeddings
- **LLM Engine Node** – Generates responses using OpenAI / Gemini
- **Output Node** – Chat interface for final responses

---

## 🔁 Workflow Execution

- User Query → (Optional) Knowledge Base → LLM Engine → Output


---

## 🛠 Tech Stack

- **Frontend:** React.js, React Flow
- **Backend:** FastAPI
- **Database:** PostgreSQL
- **Vector Store:** ChromaDB
- **LLMs:** OpenAI GPT, Gemini
- **PDF Parsing:** PyMuPDF

---

## 📦 Features

- Drag & drop workflow builder
- Configurable AI components
- Document-based semantic search
- Chat-based interaction
- Dockerized setup

---

## 👨‍💻 Author

**Lokendra Singh**
