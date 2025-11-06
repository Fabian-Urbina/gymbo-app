from pydantic import BaseModel, Field
from typing import Optional, List, Literal, Union
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

class Filter(BaseModel):
    column: str
    op: Literal["eq", "neq", "gt", "gte", "lt", "lte", "like", "ilike", "in"]
    value: Union[str, int, float, bool, List[Union[str, int, float, bool]]]

class OrderBy(BaseModel):
    column: str
    desc: bool = False

class SQLCommand(BaseModel):
    action: Literal["select", "insert", "update", "delete", "rpc"]
    table: str
    columns: Optional[List[str]] = ["*"]
    filters: Optional[List[Filter]] = None
    order: Optional[OrderBy] = None
    limit: Optional[int] = None
    values: Optional[Union[dict, List[dict]]] = None  # for insert/update
    function: Optional[str] = None                    # for rpc
    args: Optional[dict] = None    