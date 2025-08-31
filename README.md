# AI-Powered-PDF-Chat-System

This project allows users to **upload a PDF and chat with it using AI**.  
The system extracts text from the PDF, processes it, and provides answers to user queries in real-time using NLP and vector search techniques.

---

## 🚀 Features
- Upload and process PDFs
- Ask questions and get context-aware answers
- Backend powered by Node.js & Express
- Frontend built with React
- Uses embeddings and AI models for smart responses

---

## ⚙️ Installation & Setup

### 1️ Clone the repository
```bash
git clone https://github.com/Ankita5051/AI-Powered-PDF-Chat-System.git
cd AI-Powered-PDF-Chat-System
set-up Docker
```

### 2️ Install dependencies
```bash
cd client
pnpm install
cd ../server
pnpm install
```

### 3️ Setup environment
Create a `.env` file inside `server/` and add:
```
PORT=8000
HUGGINGFACE_API_KEY=your_hf_api_key
```

### 4️ Run the backend
```bash
docker compose up -d
cd server
pnpm dev
pnpm dev:worker
```

### 5️ Run the frontend
```bash
cd client
npm start
```

---

##  Usage
1. Upload a PDF from the UI.  
2. Ask questions in the chat box.  
3. Get instant answers based on the PDF’s content.  

---
✅ Now your system is ready to chat with PDFs!
