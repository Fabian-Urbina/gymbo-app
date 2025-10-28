from pydantic import BaseModel, Field
class ProfileData(BaseModel):
    name: str 
    email : str
    age : int
    gender: str
class TokenData(BaseModel):
    token : str