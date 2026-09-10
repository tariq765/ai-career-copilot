from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.core.database import get_session
from app.api.deps import get_current_user
from app.models.all_models import User, Resume, JobAnalysis, CoverLetter, InterviewSession

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    # Counts
    resume_count = await session.scalar(select(func.count(Resume.id)).where(Resume.user_id == current_user.id))
    analysis_count = await session.scalar(select(func.count(JobAnalysis.id)).where(JobAnalysis.user_id == current_user.id))
    interview_count = await session.scalar(select(func.count(InterviewSession.id)).where(InterviewSession.user_id == current_user.id))
    
    # Average score
    avg_score = await session.scalar(select(func.avg(JobAnalysis.overall_match_score)).where(JobAnalysis.user_id == current_user.id)) or 0
    
    # Recent analyses
    recent_analyses = await session.execute(
        select(JobAnalysis).where(JobAnalysis.user_id == current_user.id).order_by(JobAnalysis.created_at.desc()).limit(5)
    )
    
    return {
        "resumes_count": resume_count or 0,
        "analyses_count": analysis_count or 0,
        "interviews_count": interview_count or 0,
        "average_match_score": round(float(avg_score), 1),
        "recent_analyses": recent_analyses.scalars().all()
    }
