import os
from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    APP_NAME: str = "AI Career Copilot"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "insecure-secret-key-change-in-prod-09348924892348"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./career_copilot.db"

    # AI Configuration
    AI_PROVIDER: str = "openrouter"  # openrouter | openai | gemini | mock
    AI_API_KEY: Optional[str] = None
    AI_MODEL_NAME: str = "openai/gpt-4o-mini"
    AI_BASE_URL: Optional[str] = "https://openrouter.ai/api/v1"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://ai-career-copilot.vercel.app"
    ]

    # File uploads
    MAX_UPLOAD_SIZE_MB: int = 5
    ALLOWED_EXTENSIONS: List[str] = [".pdf"]

    model_config = {
        "env_file": os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        "extra": "ignore"
    }

settings = Settings()
