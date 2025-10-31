from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timedelta, timezone
from auth.routes import router as auth_router
from profile.routes import router as profile_router
from query.routes import router as query_router
from chatbot.routes import router as chatbot_router


# Load variables from .env
load_dotenv()

# Get them safely from the environment

app = FastAPI()
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(profile_router, prefix="/api/profile", tags=["profile"])
app.include_router(query_router, prefix="/api/query", tags=["query"])
app.include_router(chatbot_router, prefix="/api/chatbot", tags=["chatbot"])

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

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
