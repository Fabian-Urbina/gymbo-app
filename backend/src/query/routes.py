import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from .schemas import QueryData, TokenData
from auth.utils import create_access_token

load_dotenv()
router=APIRouter()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

@router.post("/log_set")
def log_set(query_data:QueryData):
    res = supabase.table("sets").insert({
    "users_id": query_data.users_id,
    "exercises_id": query_data.exercises_id,
    "weight": query_data.weight,
    "repetitions": query_data.repetitions
    }).execute()
    res = supabase.table("sets") \
    .select("*") \
    .eq("users_id", query_data.users_id) \
    .order("datetime", desc=True) \
    .limit(1) \
    .execute()
    row = res.data[0]
    sets_data = {
        "users_id": row["users_id"],
        "exercises_id": row["exercises_id"],
        "weight": row["weight"],
        "repetitions": row["repetitions"],
        "datetime": row["datetime"],
        }
    return {"reply":"Logged exercise", "last_inserted": sets_data}

@router.post("/day_filter")
def day_filter(query_data: QueryData):
    return(True)