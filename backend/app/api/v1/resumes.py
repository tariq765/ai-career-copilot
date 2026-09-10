from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.core.database import get_session
from app.api.deps import get_current_user
from app.models.all_models import User, Resume
from app.services.resume_parser import extract_text_from_pdf, basic_heuristic_parse
from app.core.config import settings

router = APIRouter(prefix="/resumes", tags=["Resumes"])

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    is_primary: bool = Form(True),
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF resume files are currently supported."
        )

    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds maximum allowed limit of {settings.MAX_UPLOAD_SIZE_MB}MB."
        )

    try:
        raw_text = extract_text_from_pdf(content)
        if len(raw_text.strip()) < 50:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not extract readable text from this PDF. Please ensure it is not a scanned image."
            )
        
        parsed = basic_heuristic_parse(raw_text)
        
        resume = Resume(
            user_id=current_user.id,
            filename=file.filename,
            file_size_bytes=len(content),
            raw_text=raw_text,
            parsed_summary=parsed["summary"],
            parsed_skills=parsed["skills"],
            parsed_experience=parsed["experience"],
            parsed_education=parsed["education"],
            is_primary=is_primary
        )
        
        session.add(resume)
        await session.commit()
        await session.refresh(resume)
        
        return resume
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing resume: {str(e)}"
        )

@router.get("", response_model=List[Resume])
async def list_resumes(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(Resume).where(Resume.user_id == current_user.id).order_by(Resume.created_at.desc())
    result = await session.execute(stmt)
    return result.scalars().all()

@router.delete("/{resume_id}")
async def delete_resume(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id)
    result = await session.execute(stmt)
    resume = result.scalar_one_or_none()
    
    if not resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found.")
        
    await session.delete(resume)
    await session.commit()
    return {"message": "Resume deleted successfully"}
