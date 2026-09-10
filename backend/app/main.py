from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api.v1.auth import router as auth_router
from app.api.v1.resumes import router as resumes_router
from app.api.v1.job_analyses import router as analyses_router
from app.api.v1.cover_letters import router as cover_letters_router
from app.api.v1.interviews import router as interviews_router
from app.api.v1.dashboard import router as dashboard_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title=settings.APP_NAME,
    description="Production-grade AI Career Copilot API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(resumes_router, prefix="/api/v1")
app.include_router(analyses_router, prefix="/api/v1")
app.include_router(cover_letters_router, prefix="/api/v1")
app.include_router(interviews_router, prefix="/api/v1")
app.include_router(dashboard_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "app": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": "AI Career Copilot Backend is Running!"}
