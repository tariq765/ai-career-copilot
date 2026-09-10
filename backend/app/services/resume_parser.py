import io
import re
from typing import Tuple, List, Dict, Any
from pypdf import PdfReader

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract raw text from PDF bytes safely."""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        extracted_text = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text.append(text)
        return "\n".join(extracted_text).strip()
    except Exception as e:
        raise ValueError(f"Failed to read PDF file: {str(e)}")

def basic_heuristic_parse(text: str) -> Dict[str, Any]:
    """Lightweight heuristic parser for skills and summary fallback."""
    common_skills = [
        "Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "FastAPI",
        "Django", "Flask", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker",
        "Kubernetes", "AWS", "GCP", "Azure", "GraphQL", "REST API", "Tailwind CSS",
        "Git", "CI/CD", "Machine Learning", "PyTorch", "TensorFlow", "Pandas", "SQL"
    ]
    
    found_skills = []
    text_lower = text.lower()
    for skill in common_skills:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.append(skill)
            
    summary = text[:400].replace("\n", " ") + "..." if len(text) > 400 else text
    
    return {
        "summary": summary,
        "skills": list(set(found_skills)),
        "experience": [],
        "education": []
    }
