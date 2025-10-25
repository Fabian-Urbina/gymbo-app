from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt
import jwt #add to req
from datetime import datetime, timedelta, timezone# add to req

# Load variables from .env
load_dotenv()

# Get them safely from the environment

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

class UserData(BaseModel):
    name : str = Field(..., min_length=1)
    age : int = Field(..., ge=0, le=120 )
    weight : float | None = None
    height : float | None = None
@app.post("/api/create_user")
async def create_user(userdata: UserData):
    return{"reply": f"Your username is {userdata.name} and you're {userdata.age} years old!"}

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)

class RegisterData(BaseModel):
    username : str = Field(...,min_length=1)
    password : str = Field(...,min_length=1)
@app.post("/api/register")
def register(registerdata: RegisterData):
    username=registerdata.username
    res = supabase.table("users").select("*").eq("username", username).execute()
    if res.data != []:
        return{"reply": "Username already exists, try another one"}
    
    password=registerdata.password.encode("utf-8")  
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    hashed_str = hashed.decode("utf-8")
    try:
        insert_res = supabase.table("users").insert({"username":username,"password":hashed_str}).execute()
        print("User inserted")
        return{"reply": f"user={username}, hashed={hashed_str}"}
    except Exception as e:
        print("Error during insert")
        return{"reply": "Error during insert"}

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

    
class LoginData(BaseModel):
    username : str = Field(...,min_length=1)
    password : str = Field(...,min_length=1)
@app.post("/api/login")
def login(logindata: LoginData):
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
        return {"reply": "Incorrect password"}
