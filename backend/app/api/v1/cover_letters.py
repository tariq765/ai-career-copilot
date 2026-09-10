from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.database import get_session
from app.api.deps import get_current_user
from app.models.all_models import User, Resume, CoverLetter
from app.schemas.cover_letter_schemas import CoverLetterCreate, CoverLetterUpdate
from app.services.cover_letter_service import generate_cover_letter_content

router = APIRouter(prefix="/cover-letters", tags=["Cover Letters"])

@router.post("", response_model=CoverLetter)
async def create_cover_letter(
    data: CoverLetterCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(Resume).where(Resume.id == data.resume_id, Resume.user_id == current_user.id)
    result = await session.execute(stmt)
    resume = result.scalar_one_or_none()
    
    if not resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found.")
        
    generated_text = await generate_cover_letter_content(
        candidate_name=current_user.full_name,
        resume_text=resume.raw_text,
        job_title=data.job_title,
        company=data.company_name or "",
        job_description=data.job_description,
        tone=data.tone
    )
    
    cover_letter = CoverLetter(
        user_id=current_user.id,
        resume_id=resume.id,
        job_title=data.job_title,
        company_name=data.company_name,
        tone=data.tone,
        content=generated_text,
        is_edited=False
    )
    
    session.add(cover_letter)
    await session.commit()
    await session.refresh(cover_letter)
    
    return cover_letter

@router.get("", response_model=List[CoverLetter])
async def list_cover_letters(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(CoverLetter).where(CoverLetter.user_id == current_user.id).order_by(CoverLetter.created_at.desc())
    result = await session.execute(stmt)
    return result.scalars().all()

@router.put("/{letter_id}", response_model=CoverLetter)
async def update_cover_letter(
    letter_id: str,
    update_data: CoverLetterUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(CoverLetter).where(CoverLetter.id == letter_id, CoverLetter.user_id == current_user.id)
    result = await session.execute(stmt)
    letter = result.scalar_one_or_none()
    
    if not letter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cover letter not found.")
        
    letter.content = update_data.content
    letter.is_edited = True
    session.add(letter)
    await session.commit()
    await session.refresh(letter)
    
    return letter
