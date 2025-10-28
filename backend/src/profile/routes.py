import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from .schemas import ProfileData, TokenData
from auth.utils import create_access_token

load_dotenv()
router=APIRouter()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

@router.post("/submit")
def submit(profile_data:ProfileData):
    return{"reply":profile_data.name}