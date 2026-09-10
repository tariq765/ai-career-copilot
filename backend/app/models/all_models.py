import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from sqlmodel import SQLModel, Field, Relationship, JSON, Column

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(index=True, unique=True, nullable=False)
    hashed_password: Optional[str] = Field(default=None, nullable=True)
    full_name: str = Field(nullable=False)
    avatar_url: Optional[str] = Field(default=None)
    auth_provider: str = Field(default="email")
    oauth_id: Optional[str] = Field(default=None, index=True)
    target_role: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    resumes: List["Resume"] = Relationship(back_populates="user")
    job_analyses: List["JobAnalysis"] = Relationship(back_populates="user")
    cover_letters: List["CoverLetter"] = Relationship(back_populates="user")
    interview_sessions: List["InterviewSession"] = Relationship(back_populates="user")


class Resume(SQLModel, table=True):
    __tablename__ = "resumes"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, nullable=False)
    filename: str = Field(nullable=False)
    file_size_bytes: int = Field(default=0)
    raw_text: str = Field(nullable=False)
    parsed_summary: Optional[str] = Field(default=None)
    parsed_skills: List[str] = Field(default=[], sa_column=Column(JSON))
    parsed_experience: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    parsed_education: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    is_primary: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="resumes")
    job_analyses: List["JobAnalysis"] = Relationship(back_populates="resume")
    cover_letters: List["CoverLetter"] = Relationship(back_populates="resume")


class JobAnalysis(SQLModel, table=True):
    __tablename__ = "job_analyses"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, nullable=False)
    resume_id: str = Field(foreign_key="resumes.id", index=True, nullable=False)
    job_title: str = Field(nullable=False)
    company_name: Optional[str] = Field(default=None)
    job_description_raw: str = Field(nullable=False)
    
    overall_match_score: int = Field(default=0)
    matching_skills: List[str] = Field(default=[], sa_column=Column(JSON))
    missing_skills: List[str] = Field(default=[], sa_column=Column(JSON))
    relevant_experience_notes: Optional[str] = Field(default=None)
    potential_weaknesses: List[str] = Field(default=[], sa_column=Column(JSON))
    missing_keywords: List[str] = Field(default=[], sa_column=Column(JSON))
    recommended_improvements: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    score_breakdown: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="job_analyses")
    resume: Optional[Resume] = Relationship(back_populates="job_analyses")


class CoverLetter(SQLModel, table=True):
    __tablename__ = "cover_letters"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, nullable=False)
    resume_id: Optional[str] = Field(foreign_key="resumes.id", default=None)
    job_title: str = Field(nullable=False)
    company_name: Optional[str] = Field(default=None)
    tone: str = Field(default="Professional")
    content: str = Field(nullable=False)
    is_edited: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="cover_letters")
    resume: Optional[Resume] = Relationship(back_populates="cover_letters")


class InterviewSession(SQLModel, table=True):
    __tablename__ = "interview_sessions"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, nullable=False)
    job_title: str = Field(nullable=False)
    target_role: Optional[str] = Field(default=None)
    status: str = Field(default="in_progress")
    overall_score: Optional[float] = Field(default=None)
    strengths: List[str] = Field(default=[], sa_column=Column(JSON))
    weaknesses: List[str] = Field(default=[], sa_column=Column(JSON))
    recommended_study_topics: List[str] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="interview_sessions")
    turns: List["InterviewTurn"] = Relationship(back_populates="session")


class InterviewTurn(SQLModel, table=True):
    __tablename__ = "interview_turns"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    session_id: str = Field(foreign_key="interview_sessions.id", index=True, nullable=False)
    question_number: int = Field(default=1)
    question_type: str = Field(default="technical")
    question_text: str = Field(nullable=False)
    user_answer: Optional[str] = Field(default=None)
    ai_feedback: Optional[str] = Field(default=None)
    score: Optional[int] = Field(default=None)
    ideal_points: List[str] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    session: Optional[InterviewSession] = Relationship(back_populates="turns")
