from datetime import timedelta, timezone, datetime
from dotenv import load_dotenv
import os
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException
import jwt
from openai import OpenAI
from supabase import Client, create_client
import re, json
from typing import Optional, List, Literal, Union
from .schemas import SQLCommand,Filter


load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_API_KEY")
supabase: Client =create_client(url,key)
open_ai_key = os.getenv("OPEN_AI_KEY")
client = OpenAI(api_key = open_ai_key)
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def clean_reply(bot_message:str): # cleans bot_message, parse as json if possible, always returns a dictionary with "reply" and "command" keys
    reply=''
    command=''
    bot_message = re.sub(r"```json|```", "", bot_message).strip()
    bot_message = re.sub(r"//.*", "", bot_message)
    try:
        data = json.loads(bot_message)
        reply = data.get("reply", "")
        command = data.get("command", None)
    except Exception as e:
         return {"reply": f"Error parsing JSON: {e}", "command": None}
    return{"reply":reply,"command":command}

def apply_filter(query, filter:Filter):
    """Apply a single filter safely."""
    col = filter.column
    op = filter.op
    val = filter.value
    if op == "eq": query = query.eq(col, val)
    elif op == "neq": query = query.neq(col, val)
    elif op == "gt": query = query.gt(col, val)
    elif op == "gte": query = query.gte(col, val)
    elif op == "lt": query = query.lt(col, val)
    elif op == "lte": query = query.lte(col, val)
    elif op == "like": query = query.like(col, val)
    elif op == "ilike": query = query.ilike(col, val)
    elif op == "in": query = query.in_(col, val if isinstance(val, list) else [val])
    return query

def apply_filters(query, filters: List[Filter]):
    for f in filters:
        query = apply_filter(query, f)
    return query

def execute_command(command: SQLCommand):
    """
    Executes a validated SQLCommand Pydantic object using Supabase Python client.
    Returns a dict with query results or error message.
    """
    try:
        action = command.action
        table = command.table

        if not action or not table:
            return {"error": "Invalid command: missing 'action' or 'table'."}

        query = supabase.table(table)

        # === SELECT ===
        if action == "select":
            columns = command.columns or ["*"]
            query = query.select(",".join(columns))

            if command.filters:
                query = apply_filters(query, command.filters)

            if command.order:
                query = query.order(
                    command.order.column, desc=command.order.desc
                )

            if command.limit:
                query = query.limit(command.limit)

            return query.execute().model_dump()

        # === INSERT ===
        elif action == "insert":
            if not command.values:
                return {"error": "INSERT command missing 'values'."}
            return query.insert(command.values).execute().model_dump()

        # === UPDATE ===
        elif action == "update":
            if not command.values:
                return {"error": "UPDATE command missing 'values'."}
            query = query.update(command.values)
            if command.filters:
                query = apply_filters(query, command.filters)
            return query.execute().model_dump()

        # === DELETE ===
        elif action == "delete":
            if command.filters:
                query = apply_filters(query, command.filters)
            return query.delete().execute().model_dump()

        # === RPC (for functions / aggregations) ===
        elif action == "rpc":
            if not command.function:
                return {"error": "RPC command missing 'function' name."}
            args = command.args or {}
            return supabase.rpc(command.function, args).execute().model_dump()

        else:
            return {"error": f"Unsupported action: {action}"}

    except Exception as e:
        return {"error": str(e)}
