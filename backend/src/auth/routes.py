import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from .schemas import AuthData, TokenData
from .utils import create_access_token

load_dotenv()
router=APIRouter()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

@router.post("/register")
def register(registerdata: AuthData):
    username=registerdata.username
    res = supabase.table("users").select("*").eq("username", username).execute()
    if res.data != []:
        return{"reply": "Username already exists, try another one","error":True}
    
    password=registerdata.password.encode("utf-8")  
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    hashed_str = hashed.decode("utf-8")
    try:
        insert_res = supabase.table("users").insert({"username":username,"password":hashed_str}).execute()
        print("User inserted")
        return{"reply": "Account created succesfully", "error": False}
    except Exception as e:
        print("Error during insert")
        return{"reply": "Error during insert", "error": True}
    
@router.post("/login")
def login(logindata: AuthData):
    username=logindata.username
    password=logindata.password
    res = supabase.table("users").select("*").eq("username", username).execute()
    if res.data == []:
        return{"reply":"username not registered"}

    stored_hash = res.data[0]["password"]
    if bcrypt.checkpw(password.encode("utf-8"), stored_hash.encode("utf-8")):
        token = create_access_token({"username":username},expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        return {"reply": "Correct password","token": token}
    else:
        return {"reply": "Incorrect password","token":None}
    

@router.post("/verify")
def verify_token(tokendata: TokenData):
    try:
        payload = jwt.decode(tokendata.token, SECRET_KEY, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        if exp and datetime.now(timezone.utc).timestamp() > exp:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")

        return {"valid": True, "user": payload.get("username")}
    
    except jwt.ExpiredSignatureError:
        return {"valid": False, "error": "Token expired"}
    except jwt.InvalidTokenError:
        return {"valid": False, "error": "Invalid token"}
    except Exception as e:
        return {"valid": False, "error": "Invalid token"}