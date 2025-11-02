from pydantic import BaseModel, Field
from typing import Optional,List
class SetsData(BaseModel):
    users_id : int
    exercises_id: int 
    weight : float
    repetitions: float
    day: Optional[str] = None
class UsersData(BaseModel):
    users_id: int
    name: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    day: Optional[str] = None
class Message(BaseModel):
    role : str
    content : str
class ChatRequest(BaseModel):
    users_data: UsersData = Field(alias="userData")
    conversation: List[Message] = Field(alias="messages")

    class Config:
        populate_by_name = True  