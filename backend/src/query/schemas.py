from pydantic import BaseModel, Field
from typing import Optional
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
class TableName(BaseModel):
    table_name : str