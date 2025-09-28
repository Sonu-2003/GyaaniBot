# app.py
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from rag import get_rag_response  # import your notebook pipeline

app = FastAPI()

# CORS for React frontend
origins = ["http://localhost:8080"]  # React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: MessageRequest):
    response_text = get_rag_response(req.message)
    return {
        "id": str(datetime.now().timestamp()),
        "content": response_text,
        "role": "assistant",
        "timestamp": datetime.now().isoformat()
    }
