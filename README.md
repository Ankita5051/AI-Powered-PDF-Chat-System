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
git clone https://github.com/your-username/AI-Powered-PDF-Chat-System.git
cd AI-Powered-PDF-Chat-System
```

### 2️ Install dependencies
```bash
cd client
npm install
cd ../server
npm install
```

### 3️ Setup environment
Create a `.env` file inside `server/` and add:
```
PORT=8000
OPENAI_API_KEY=your_openai_api_key
```

### 4️ Run the backend
```bash
cd server
pnpm dev
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
