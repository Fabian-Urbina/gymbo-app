from datetime import timedelta, timezone, datetime
from dotenv import load_dotenv
import os
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException
import jwt
from openai import OpenAI
from supabase import Client, create_client
import re, json
from .schemas import SQLCommand


load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
open_ai_key = os.getenv("OPEN_AI_KEY")
client = OpenAI(api_key = open_ai_key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def clean_reply(bot_message:str): # cleans bot_message, parse as json if possible, always returns a dictionary with "reply" and "command" keys
    reply=''
    command=''
    bot_message = re.sub(r"```json|```", "", bot_message).strip()
    bot_message = re.sub(r"//.*", "", bot_message)
    try:
        data = json.loads(bot_message)
        reply = data.get("reply", "")
        command = data.get("command", None)
    except Exception as e:
         return {"reply": f"Error parsing JSON: {e}", "command": None}
    return{"reply":reply,"command":command}

def execute_command(command:SQLCommand): #Read SQLCommand and execute
    return(True)

