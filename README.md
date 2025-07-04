# 📄 PDF Chat

A web-based tool to chat with PDFs in a specific folder. Users can create folders, upload multiple PDFs, and ask questions that are answered using context extracted from those PDFs. Real-time chat responses are streamed using WebSockets.

🎥 [Watch the demo](https://vimeo.com/1098860232)

---

## 🌐 Environment Variables

Set the following environment variables in your `.env` file before starting the frontend:

```env
REACT_APP_API_URI=http://localhost:8000/api/v1
REACT_APP_WS_ADDRESS=ws://localhost:8000
```

REACT_APP_API_URI: Points to the REST API server (used for folder creation, uploading PDFs, etc.).

REACT_APP_WS_ADDRESS: Points to the WebSocket server used for streaming real-time chat responses.

🛠 Local Setup
To run this project locally, you need to start the backend and the worker services:

🧠 Backend: https://github.com/harshit2786/pdf-chat-be

⚙️ Worker: https://github.com/harshit2786/pdf-chat-worker

Make sure both are running before using the frontend.

🚀 Features
Folder-based PDF chat: Ask questions based on all PDFs inside a folder.

Real-time WebSocket-based streaming responses.

PDF upload, context indexing, and retrieval.