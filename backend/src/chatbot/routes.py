import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from .schemas import SetsData, UsersData, ChatRequest,Message
from openai import OpenAI, RateLimitError
import re
from .utils import clean_reply

load_dotenv()
router=APIRouter()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
open_ai_key = os.getenv("OPEN_AI_KEY")
client = OpenAI(api_key = open_ai_key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

@router.post("/chat_response")
def chat_response(payload:ChatRequest):
    user_data=payload.users_data
    current_time= datetime.now(timezone.utc)
    users_keys= list(supabase.table("users").select("*").limit(1).execute().data[0].keys())
    exercises_keys= list(supabase.table("exercises").select("*").limit(1).execute().data[0].keys())
    sets_keys= list(supabase.table("sets").select("*").limit(1).execute().data[0].keys())
    conversation = [
    {"role": "system", "content": "You are an assistant that converts natural language workout queries into Python commands."},
    {"role": "system", "content": "The Supabase client is already defined with the name 'supabase'."},
    {"role": "system", "content": (
        "Always return a valid JSON object with keys 'reply' and 'command'. "
        "reply is the reply to the user."
        "'command' must be a single line or block of executable Python code. "
        "Do not include markdown, SQL, explanations, or comments. "
        "If a query cannot be expressed with Supabase syntax, set 'command' to null."
    )},
    {"role": "system", "content": (
        f"The 'users' table has columns: {users_keys} "
        f"The 'exercises' table has columns: {exercises_keys} "
        f"The 'sets' table has columns: {sets_keys} "
        f"The userdata of this user is {user_data}"
        f"The current time in UTC is {current_time}"
    )},
    {"role": "system", "content": "When asked for a query, generate a Supabase select or insert command"
    "like supabase.table('Series').insert({...}).execute()"}
    ]
    conversation = conversation + payload.conversation
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=conversation
        )
    except RateLimitError as e:
        return {"reply": e, "command": None,"last_user_input":str(payload.conversation[-1].content)}
    bot_message = response.choices[0].message.content
    bot_message = clean_reply(bot_message)
    conversation.append({"role": "assistant", "content": str(bot_message)})
    return {"reply":bot_message["reply"],"command":bot_message["command"],"last_user_input":str(payload.conversation[-1].content)}