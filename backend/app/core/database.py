from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import ssl
from app.core.config import settings
from app.models.all_models import User, Resume, JobAnalysis, CoverLetter, InterviewSession, InterviewTurn

db_url = settings.DATABASE_URL
# Strip potential unsupported query params for asyncpg if present
if "channel_binding" in db_url:
    db_url = db_url.split("&channel_binding")[0]
if "sslmode=require" in db_url:
    db_url = db_url.replace("sslmode=require", "ssl=require")

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

connect_args = {}
if "postgresql" in db_url:
    connect_args["ssl"] = ssl_ctx

engine = create_async_engine(
    db_url,
    echo=settings.DEBUG,
    future=True,
    connect_args=connect_args
)

async_session_factory = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session():
    async with async_session_factory() as session:
        yield session
