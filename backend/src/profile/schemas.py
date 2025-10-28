from pydantic import BaseModel, Field
class ProfileData(BaseModel):
    users_id : int
    name: str 
    email : str
    age : int
    gender: str
class TokenData(BaseModel):
    token : str