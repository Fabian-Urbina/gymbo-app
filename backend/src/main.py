from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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
