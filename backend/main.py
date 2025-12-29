from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# Smart AI reply logic (30+ Q&A)
def ai_reply(user_message: str):
    msg = user_message.lower()

    # Greetings
    if any(word in msg for word in ["hello", "hi", "hey"]):
        return random.choice([
            "Hello 👋 How can I help you?",
            "Hi 😊 What can I do for you?",
            "Hey! Ask me anything 💬",
            "Hello Pallavi 💙"
        ])

    if "how are you" in msg:
        return random.choice([
            "I’m doing great 😊",
            "I’m fine and ready to help you 🚀",
            "Feeling awesome today 💫"
        ])

    if "your name" in msg:
        return "I’m Pallavi AI 🤖, your virtual assistant."

    if "who created you" in msg:
        return "I was created by Pallavi 💙 using Python & React."

    if "help" in msg:
        return "Sure! I can chat, answer questions, and guide you 🚀"

    if "frontend" in msg:
        return "Frontend is built using React + Vite ⚛️"

    if "backend" in msg:
        return "Backend is powered by FastAPI 🐍"

    if "python" in msg:
        return "Python is powerful and beginner-friendly 🐍"

    if "react" in msg:
        return "React is great for building modern UIs ⚛️"

    if "fastapi" in msg:
        return "FastAPI is fast, simple, and perfect for APIs 🚀"

    if "deploy" in msg:
        return "You deployed your backend on Render successfully 🎉"

    if "render" in msg:
        return "Render is used to deploy your backend 🌐"

    if "vercel" in msg:
        return "Vercel is best for frontend deployment ⚡"

    if "github" in msg:
        return "GitHub stores and manages your project code 🧠"

    if "error" in msg:
        return "Don’t worry 😊 Errors help you learn faster!"

    if "bug" in msg:
        return "Every developer faces bugs 🐞 You’ll fix it!"

    if "study" in msg:
        return "Stay consistent 📚 You’re doing great!"

    if "career" in msg:
        return "You have a bright future 🌟 Keep learning!"

    if "motivate" in msg or "motivation" in msg:
        return "Believe in yourself 💪 You’re capable of amazing things!"

    if "sad" in msg:
        return "I’m here for you 💙 Everything will be okay."

    if "happy" in msg:
        return "That’s wonderful 😊 Keep smiling!"

    if "joke" in msg:
        return random.choice([
            "Why do programmers love dark mode? Because light attracts bugs 😄",
            "Why Python? Because it’s hiss-terical 🐍😂"
        ])

    if "thank" in msg:
        return "You’re welcome 😊 Always happy to help!"

    if "bye" in msg or "goodbye" in msg:
        return "Goodbye 👋 Have a wonderful day!"

    if "what can you do" in msg:
        return "I can chat, guide, motivate, and help you learn 💡"

    if "ai" in msg:
        return "AI is the future, and you’re building it 🤖✨"

    # Default fallback replies
    return random.choice([
        "Interesting 🤔 Tell me more!",
        "I’m listening 👂",
        "Can you explain that again?",
        "That sounds cool 😄",
        "Hmm… I like that idea 💡",
        "Go on, I’m curious 😊"
    ])

@app.post("/chat")
def chat(data: ChatRequest):
    reply = ai_reply(data.message)
    return {"reply": reply}

@app.get("/")
def root():
    return {"status": "AI backend running 🚀"}
