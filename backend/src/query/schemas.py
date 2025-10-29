from pydantic import BaseModel, Field
from typing import Optional
class QueryData(BaseModel):
    users_id : int
    exercises_id: int 
    weight : float
    repetitions: float
    day: Optional[str] = None
class TokenData(BaseModel):
    token : str