from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "AI backend running"}

@app.post("/chat")
def chat(req: ChatRequest):
    user_msg = req.message.lower()

    replies = {
        "hello": [
            "Hello Pallavi 😊 How can I help you today?",
            "Hi! I'm your AI assistant 👋",
            "Hey there! Ready to help you 🌸"
        ],
        "how are you": [
            "I'm doing great! Thanks for asking 💙",
            "Feeling smart and ready 😄"
        ],
        "who are you": [
            "I'm Pallavi AI Assistant 🤖",
            "Your personal AI helper 🌟"
        ]
    }

    for key in replies:
        if key in user_msg:
            return {"reply": random.choice(replies[key])}

    return {
        "reply": "I’m still learning 🤍 Please ask something else."
    }


