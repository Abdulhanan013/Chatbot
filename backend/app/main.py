from pydantic import BaseModel
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

response = [
    'Hello',
    'how are you?',
    'goodluck',
    'goodbye',
    'what is your name?'
]

class ChatRequest(BaseModel):
    message: str

@app.get("/api/health-check")
async def health_check():
    return {'status':'healthy'}

@app.post('/api/chat')
async def chat(request: ChatRequest):
    return {"Response": random.choice(response)}
