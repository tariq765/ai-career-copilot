from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    target_role: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    target_role: Optional[str] = None
    avatar_url: Optional[str] = None
    auth_provider: str
    created_at: Any

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
