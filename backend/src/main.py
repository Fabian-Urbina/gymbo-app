from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for local dev
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model for request body
class Message(BaseModel):
    message: str

# Endpoint that converts text to uppercase
@app.post("/api/chat")
async def uppercase(msg: Message):
    upper_text = msg.message.upper()
    return {"reply":upper_text}