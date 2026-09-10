from pydantic import BaseModel, Field
from typing import List, Optional

class InterviewTurnEvaluation(BaseModel):
    score: int = Field(description="Score between 0-100 evaluating candidate response")
    ai_feedback: str = Field(description="Constructive breakdown of strengths and missed key technical points")
    ideal_points: List[str] = Field(description="Core concepts or keywords that would complete an exemplary answer")
    next_question: Optional[str] = Field(default=None, description="The subsequent interview question to ask")
    next_question_type: Optional[str] = Field(default="technical", description="technical, behavioral, role_specific, or missing_skills")

class InterviewFinalReport(BaseModel):
    overall_score: float = Field(description="Average score across all turns")
    strengths: List[str] = Field(description="Demonstrated strengths")
    weaknesses: List[str] = Field(description="Identified areas for technical or communication improvement")
    recommended_study_topics: List[str] = Field(description="Tailored study topics to master before real interview")

class InterviewSessionCreate(BaseModel):
    job_title: str
    target_role: Optional[str] = None
    job_description: Optional[str] = None
    missing_skills: Optional[List[str]] = []

class AnswerSubmission(BaseModel):
    answer: str
