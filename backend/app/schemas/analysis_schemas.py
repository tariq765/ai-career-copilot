from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class ResumeImprovementSuggestion(BaseModel):
    section_type: str = Field(description="e.g. Experience, Summary, Skills")
    original_text: str = Field(description="The exact or representative current wording")
    suggested_text: str = Field(description="High-impact bullet or rewritten wording with metrics")
    reason: str = Field(description="Explanation of why this change improves ATS and recruiter perception")
    impact_level: str = Field(description="High, Medium, or Low")

class ScoreBreakdownSchema(BaseModel):
    hard_skills_score: int = Field(description="0-100 score for matching hard technical skills")
    domain_experience_score: int = Field(description="0-100 score for seniority and domain alignment")
    keyword_coverage_score: int = Field(description="0-100 score for ATS keyword presence")
    education_baseline_score: int = Field(description="0-100 score for education and baseline qualifications")
    explanation: str = Field(description="Clear formula breakdown explaining how match score was calculated")

class JobAnalysisAIResult(BaseModel):
    overall_match_score: int = Field(description="Weighted overall score from 0 to 100")
    matching_skills: List[str] = Field(description="Skills found in both resume and job posting")
    missing_skills: List[str] = Field(description="Important skills in job post missing from resume")
    relevant_experience_notes: str = Field(description="Assessment of past work experience relevance")
    potential_weaknesses: List[str] = Field(description="Gaps or potential concerns a recruiter might flag")
    missing_keywords: List[str] = Field(description="Crucial ATS keywords missing from candidate profile")
    recommended_improvements: List[ResumeImprovementSuggestion] = Field(description="Specific actionable resume rewrites")
    score_breakdown: ScoreBreakdownSchema

class JobAnalysisCreate(BaseModel):
    resume_id: str
    job_title: str
    company_name: Optional[str] = None
    job_description: str
