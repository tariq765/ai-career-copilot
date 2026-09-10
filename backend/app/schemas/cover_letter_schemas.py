from pydantic import BaseModel, Field
from typing import Optional

class CoverLetterCreate(BaseModel):
    resume_id: str
    job_title: str
    company_name: Optional[str] = None
    job_description: str
    tone: str = Field(default="Professional", description="Professional, Friendly, Confident, or Concise")

class CoverLetterUpdate(BaseModel):
    content: str
