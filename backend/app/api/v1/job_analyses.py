from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.database import get_session
from app.api.deps import get_current_user
from app.models.all_models import User, Resume, JobAnalysis
from app.schemas.analysis_schemas import JobAnalysisCreate
from app.services.analysis_service import analyze_job_match

router = APIRouter(prefix="/job-analyses", tags=["Job Analyses"])

@router.post("", response_model=JobAnalysis)
async def create_job_analysis(
    data: JobAnalysisCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(Resume).where(Resume.id == data.resume_id, Resume.user_id == current_user.id)
    result = await session.execute(stmt)
    resume = result.scalar_one_or_none()
    
    if not resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Selected resume not found.")
        
    ai_result = await analyze_job_match(
        resume_text=resume.raw_text,
        job_title=data.job_title,
        company=data.company_name or "",
        job_description=data.job_description
    )
    
    job_analysis = JobAnalysis(
        user_id=current_user.id,
        resume_id=resume.id,
        job_title=data.job_title,
        company_name=data.company_name,
        job_description_raw=data.job_description,
        overall_match_score=ai_result.overall_match_score,
        matching_skills=ai_result.matching_skills,
        missing_skills=ai_result.missing_skills,
        relevant_experience_notes=ai_result.relevant_experience_notes,
        potential_weaknesses=ai_result.potential_weaknesses,
        missing_keywords=ai_result.missing_keywords,
        recommended_improvements=[item.model_dump() for item in ai_result.recommended_improvements],
        score_breakdown=ai_result.score_breakdown.model_dump()
    )
    
    session.add(job_analysis)
    await session.commit()
    await session.refresh(job_analysis)
    
    return job_analysis

@router.get("", response_model=List[JobAnalysis])
async def list_job_analyses(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(JobAnalysis).where(JobAnalysis.user_id == current_user.id).order_by(JobAnalysis.created_at.desc())
    result = await session.execute(stmt)
    return result.scalars().all()

@router.get("/{analysis_id}", response_model=JobAnalysis)
async def get_job_analysis(
    analysis_id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(JobAnalysis).where(JobAnalysis.id == analysis_id, JobAnalysis.user_id == current_user.id)
    result = await session.execute(stmt)
    analysis = result.scalar_one_or_none()
    
    if not analysis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job analysis not found.")
    return analysis
