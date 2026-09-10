from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.core.database import get_session
from app.api.deps import get_current_user
from app.models.all_models import User, InterviewSession, InterviewTurn
from app.schemas.interview_schemas import InterviewSessionCreate, AnswerSubmission
from app.services.interview_service import evaluate_turn, generate_final_interview_report

router = APIRouter(prefix="/interviews", tags=["Mock Interviews"])

@router.post("", response_model=InterviewSession)
async def start_interview_session(
    data: InterviewSessionCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    first_question = f"Could you briefly introduce yourself and walk me through your technical experience relevant to the {data.job_title} role?"
    
    interview_session = InterviewSession(
        user_id=current_user.id,
        job_title=data.job_title,
        target_role=data.target_role or current_user.target_role,
        status="in_progress"
    )
    session.add(interview_session)
    await session.commit()
    await session.refresh(interview_session)
    
    first_turn = InterviewTurn(
        session_id=interview_session.id,
        question_number=1,
        question_type="role_specific",
        question_text=first_question
    )
    session.add(first_turn)
    await session.commit()
    
    stmt = select(InterviewSession).where(InterviewSession.id == interview_session.id).options(selectinload(InterviewSession.turns))
    res = await session.execute(stmt)
    return res.scalar_one()

@router.post("/{session_id}/turns/{turn_id}/answer", response_model=InterviewSession)
async def submit_answer(
    session_id: str,
    turn_id: str,
    submission: AnswerSubmission,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(InterviewSession).where(InterviewSession.id == session_id, InterviewSession.user_id == current_user.id).options(selectinload(InterviewSession.turns))
    res = await session.execute(stmt)
    interview_session = res.scalar_one_or_none()
    
    if not interview_session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview session not found.")
        
    turn_stmt = select(InterviewTurn).where(InterviewTurn.id == turn_id, InterviewTurn.session_id == session_id)
    turn_res = await session.execute(turn_stmt)
    turn = turn_res.scalar_one_or_none()
    
    if not turn:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview question turn not found.")
        
    evaluation = await evaluate_turn(
        job_title=interview_session.job_title,
        question=turn.question_text,
        answer=submission.answer,
        question_number=turn.question_number
    )
    
    turn.user_answer = submission.answer
    turn.ai_feedback = evaluation.ai_feedback
    turn.score = evaluation.score
    turn.ideal_points = evaluation.ideal_points
    session.add(turn)
    
    if evaluation.next_question:
        next_turn = InterviewTurn(
            session_id=session_id,
            question_number=turn.question_number + 1,
            question_type=evaluation.next_question_type or "technical",
            question_text=evaluation.next_question
        )
        session.add(next_turn)
    else:
        # Finalize interview session report
        summary_text = "\n".join([f"Q: {t.question_text}\nA: {t.user_answer or ''}" for t in interview_session.turns])
        final_rep = await generate_final_interview_report(interview_session.job_title, summary_text)
        
        interview_session.status = "completed"
        interview_session.overall_score = final_rep.overall_score
        interview_session.strengths = final_rep.strengths
        interview_session.weaknesses = final_rep.weaknesses
        interview_session.recommended_study_topics = final_rep.recommended_study_topics
        session.add(interview_session)
        
    await session.commit()
    
    # Reload session with updated turns
    refetched = await session.execute(
        select(InterviewSession).where(InterviewSession.id == session_id).options(selectinload(InterviewSession.turns))
    )
    return refetched.scalar_one()

@router.get("", response_model=List[InterviewSession])
async def list_interviews(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    stmt = select(InterviewSession).where(InterviewSession.user_id == current_user.id).options(selectinload(InterviewSession.turns)).order_by(InterviewSession.created_at.desc())
    res = await session.execute(stmt)
    return res.scalars().all()
