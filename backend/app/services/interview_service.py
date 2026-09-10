from typing import List, Optional
from app.schemas.interview_schemas import InterviewTurnEvaluation, InterviewFinalReport
from app.services.ai_service import get_ai_provider
from app.core.config import settings

def get_fallback_turn_evaluation(question: str, answer: str, q_num: int) -> InterviewTurnEvaluation:
    next_questions = [
        ("Describe a challenging distributed systems or race condition bug you diagnosed and solved.", "technical"),
        ("Tell me about a time you had an engineering disagreement regarding architecture or tech stack with a teammate. How did you resolve it?", "behavioral"),
        ("How do you design database indexing and caching strategies to maintain low P99 latencies under high write load?", "missing_skills"),
        (None, None)
    ]
    
    next_q, next_type = next_questions[min(q_num - 1, len(next_questions) - 1)]
    
    return InterviewTurnEvaluation(
        score=85,
        ai_feedback="Solid structural explanation! You articulated the problem clearly and highlighted practical technical considerations. To elevate this response to a Staff/Lead level, include quantitative metrics (e.g. TPS, latency percentage drops) and potential trade-offs of your chosen approach.",
        ideal_points=[
            "Explicit mention of latency trade-offs and CAP theorem constraints",
            "Concrete measurement of before-and-after metrics",
            "Handling edge cases like node failures or network partitions"
        ],
        next_question=next_q,
        next_question_type=next_type
    )

def get_fallback_final_report() -> InterviewFinalReport:
    return InterviewFinalReport(
        overall_score=87.5,
        strengths=[
            "Clear articulation of backend architectures and asynchronous workflows",
            "Good understanding of SQL relational data modeling and indexing",
            "Proactive problem-solving mindset and collaborative behavioral responses"
        ],
        weaknesses=[
            "Could articulate caching invalidation strategies with more depth",
            "Can incorporate more exact quantitative SLA metrics when describing project impacts"
        ],
        recommended_study_topics=[
            "Distributed Event Streaming with Apache Kafka / RabbitMQ",
            "Redis Cache Aside vs Write-Through Invalidation Patterns",
            "PostgreSQL Execution Plans (EXPLAIN ANALYZE) & Partitioning",
            "STAR Method for Senior Behavioral Leadership Scenarios"
        ]
    )

async def evaluate_turn(
    job_title: str,
    question: str,
    answer: str,
    question_number: int,
    max_questions: int = 4
) -> InterviewTurnEvaluation:
    if not settings.AI_API_KEY:
        return get_fallback_turn_evaluation(question, answer, question_number)

    if question_number >= max_questions:
        prompt = f"""
ROLE: {job_title}
INTERVIEW QUESTION: {question}
CANDIDATE ANSWER: {answer}

This was the final question (Turn {question_number}/{max_questions}).
Evaluate the candidate's answer with constructive feedback, score (0-100), and ideal points.
Set 'next_question' to null.
"""
    else:
        prompt = f"""
ROLE: {job_title}
INTERVIEW QUESTION: {question}
CANDIDATE ANSWER: {answer}
CURRENT TURN: {question_number} of {max_questions}

Evaluate the candidate's answer constructively, provide score (0-100), ideal points, and formulate the NEXT question (technical, behavioral, or role-specific).
"""
    ai_provider = get_ai_provider()
    try:
        return await ai_provider.generate_structured(
            prompt=prompt,
            schema=InterviewTurnEvaluation,
            system_prompt="You are an expert technical interviewer conducting an interactive mock interview."
        )
    except Exception:
        return get_fallback_turn_evaluation(question, answer, question_number)

async def generate_final_interview_report(job_title: str, turns_summary: str) -> InterviewFinalReport:
    if not settings.AI_API_KEY:
        return get_fallback_final_report()

    prompt = f"""
ROLE: {job_title}
INTERVIEW TRANSCRIPT:
{turns_summary}

Generate the overall performance review report: average score, top strengths, key weaknesses, and recommended study topics.
"""
    ai_provider = get_ai_provider()
    try:
        return await ai_provider.generate_structured(
            prompt=prompt,
            schema=InterviewFinalReport,
            system_prompt="You are a principal engineering hiring director creating a final candidate evaluation report."
        )
    except Exception:
        return get_fallback_final_report()
