import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from .schemas import SetsData, UsersData

load_dotenv()
router=APIRouter()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

@router.post("/log_set")
def log_set(sets_data:SetsData):
    res = supabase.table("sets").insert({
    "users_id": sets_data.users_id,
    "exercises_id": sets_data.exercises_id,
    "weight": sets_data.weight,
    "repetitions": sets_data.repetitions
    }).execute()
    res = supabase.table("sets") \
    .select("*") \
    .eq("users_id", sets_data.users_id) \
    .order("datetime", desc=True) \
    .limit(1) \
    .execute()
    row = res.data[0]
    last_sets_data = {
        "users_id": row["users_id"],
        "exercises_id": row["exercises_id"],
        "weight": row["weight"],
        "repetitions": row["repetitions"],
        "datetime": row["datetime"],
        }
    return {"reply":"Logged exercise", "last_inserted": last_sets_data}

@router.post("/day_workouts")
def day_workouts(users_data: UsersData):
    # 🔹 Validate required field
    if not users_data.users_id:
        raise HTTPException(status_code=400, detail="Missing 'users_id'")

    # 🔹 Handle missing or invalid day (default to today)
    if not users_data.day:
        dt = datetime.now(timezone.utc)
    else:
        try:
            dt = datetime.fromisoformat(users_data.day.replace("Z", "+00:00"))
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid 'day' format — must be ISO string")

    start_of_day = datetime(dt.year, dt.month, dt.day, tzinfo=timezone.utc)
    end_of_day = start_of_day + timedelta(days=1)

    # 🔹 Supabase query
    res = (
        supabase.table("sets")
        .select("*")
        .eq("users_id", users_data.users_id)
        .gte("datetime", start_of_day.isoformat())
        .lt("datetime", end_of_day.isoformat())
        .execute()
    )

    return {"reply": "Query executed", "data": res.data}