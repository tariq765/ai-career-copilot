from app.services.ai_service import get_ai_provider
from app.core.config import settings

def get_fallback_cover_letter(candidate_name: str, job_title: str, company: str, tone: str) -> str:
    company_str = company if company else "your esteemed organization"
    
    if tone == "Confident":
        return f"""Dear Hiring Team at {company_str},

I am writing to express my strong enthusiasm for the {job_title} role. With a solid track record of delivering resilient backend systems, architecting high-throughput microservices, and leading full-stack implementations, I am confident in my ability to make an immediate impact on your engineering objectives.

In my recent projects, I have consistently focused on measurable performance gains—optimizing PostgreSQL database queries, automating CI/CD delivery pipelines, and containerizing distributed applications with Docker. The technical challenges at {company_str} strongly align with my expertise, and I thrive in fast-paced environments where reliability and innovation are paramount.

I look forward to discussing how my skills and proactive problem-solving mindset can accelerate your product roadmap.

Sincerely,
{candidate_name}"""

    elif tone == "Concise":
        return f"""Dear Hiring Team,

I am applying for the {job_title} position at {company_str}. 

Highlights of my qualifications:
• Strong engineering foundation in Python, FastAPI, TypeScript, and SQL databases.
• Proven ability to design scalable APIs, optimize query latency, and build modern responsive web applications.
• Focus on clean architecture, comprehensive automated testing, and dependable delivery.

I would welcome the opportunity to briefly connect and explore how my background fits your team's current technical needs.

Best regards,
{candidate_name}"""

    elif tone == "Friendly":
        return f"""Hi {company_str} Team,

I came across the opening for the {job_title} role and was immediately excited to apply! Having followed your recent growth, I have been impressed by your commitment to building high-quality software experiences.

Throughout my development career, I've loved collaborating across teams to turn complex ideas into clean, user-focused products. Whether it's building out full-stack features with Next.js and FastAPI or fine-tuning database performance, I bring both technical enthusiasm and a supportive team spirit.

I would love the chance to chat more about how I can contribute to {company_str}'s awesome engineering culture!

Warmly,
{candidate_name}"""

    else: # Professional
        return f"""Dear Hiring Manager,

Please accept this letter as an expression of my serious interest in the {job_title} position at {company_str}. Having reviewed your requirements, I believe my background in full-stack software development, database design, and API engineering makes me a strong candidate for your team.

My technical experience encompasses designing performant backend services with FastAPI and PostgreSQL, building accessible frontend interfaces in Next.js, and implementing scalable cloud architectures. I prioritize clean code principles, system maintainability, and data integrity across every stage of the development lifecycle.

Thank you for your time and consideration. I welcome the opportunity to discuss my qualifications in greater detail during an interview.

Sincerely,
{candidate_name}"""

async def generate_cover_letter_content(
    candidate_name: str,
    resume_text: str,
    job_title: str,
    company: str,
    job_description: str,
    tone: str
) -> str:
    if not settings.AI_API_KEY:
        return get_fallback_cover_letter(candidate_name, job_title, company, tone)

    prompt = f"""
Write a tailored cover letter for:
Candidate Name: {candidate_name}
Target Job Title: {job_title}
Target Company: {company or 'Hiring Organization'}
Tone: {tone}

Job Description:
{job_description}

Candidate Resume Details:
{resume_text}

Rules:
- Highlight genuine matching strengths from the resume.
- Do NOT invent fake companies, degrees, or years of experience.
- Maintain the specified tone: {tone}.
- Return only the polished cover letter text.
"""
    ai_provider = get_ai_provider()
    try:
        return await ai_provider.generate_text(
            prompt=prompt,
            system_prompt="You are an expert career consultant writing authentic, high-converting cover letters."
        )
    except Exception:
        return get_fallback_cover_letter(candidate_name, job_title, company, tone)
