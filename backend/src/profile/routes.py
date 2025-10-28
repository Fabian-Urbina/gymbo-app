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
    res = supabase.table("users").update({
    "name": profile_data.name,
    "email": profile_data.email,
    "age": profile_data.age,
    "gender": profile_data.gender
    }).eq("users_id", profile_data.users_id).execute()
    res = supabase.table("users").select("*").eq("users_id", profile_data.users_id).execute()
    row = res.data[0]
    user_data = {
        "users_id": row["users_id"],
        "username": row["username"],
        "age": row["age"],
        "gender": row["gender"],
        "name": row["name"],
        "email": row["email"]}
    return{"reply":"Updated userdata", "user_data": user_data}