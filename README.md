# AI Career Copilot 🚀
### AI-Powered Resume Analyzer, Skill Gap Intelligence & Turn-by-Turn Mock Interview Simulator

**AI Career Copilot** is a production-grade SaaS web application engineered for candidates, software engineers, and product builders. It analyzes candidate resumes against complex job descriptions, computes an ATS-calibrated weighted match score, identifies technical gaps, suggests non-fabricating high-impact bullet rewrites, generates tone-specific cover letters, and runs interactive turn-by-turn mock interviews.

---

## 🌟 Key Architecture & Features

1. **Resume vs. Job Match Engine**:
   - Computes an ATS relevance score across Hard Technical Skills (40%), Experience & Domain Alignment (35%), Keyword Coverage (15%), and Educational Baseline (10%).
   - Explicitly flags matching competencies and missing skills with recruiter notes.

2. **Resume Bullet Rewriter ("Improve My Resume")**:
   - Evaluates passive job duties and suggests metric-driven before/after rewrites without fabricating fake experiences.

3. **Multi-Tone Cover Letter Generator**:
   - Tailors letters across *Professional*, *Confident*, *Friendly*, and *Concise* tones with a live editable canvas.

4. **Turn-by-Turn AI Mock Interviewer**:
   - Interactive, turn-based technical and behavioral interviewer that evaluates candidate responses in real-time, grades answer quality, highlights missing concepts, and provides a final readiness report.

5. **Skill Gap & Study Roadmaps**:
   - Auto-generates study objectives for technical requirements missing from the candidate's resume.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons, `next-themes` (Dark/Light mode).
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, SQLModel / SQLAlchemy (Async).
- **Database**: Serverless PostgreSQL via **Neon DB** (with async connection pooling).
- **Security**: Argon2/Bcrypt salted hashing, JWT Bearer tokens, CORS origin protection.
- **AI Layer**: Pluggable LLM abstraction supporting OpenRouter, Google Gemini, OpenAI, and fallback deterministic models with strict structured JSON schema validation.
- **DevOps**: Multi-stage production `Dockerfile`, `.dockerignore`, and Vercel-ready frontend.

---

## 🚀 Quick Start & Local Setup

### 1. Backend Setup
```bash
# Navigate to backend and create virtualenv
cd backend
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Configure .env
cp .env.example .env

# Run FastAPI backend
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Interactive Swagger API documentation is available at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install packages
npm install

# Run Next.js 16 development server
npm run dev
```
Open `http://localhost:3000` to view the application.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
APP_NAME="AI Career Copilot"
ENVIRONMENT=production
DEBUG=false
SECRET_KEY="your-strong-jwt-secret-key"
DATABASE_URL="postgresql+asyncpg://neondb_owner:PASSWORD@ep-endpoint.neon.tech/neondb?ssl=require"

# AI Provider Configuration (Optional - fallback mock runs automatically)
AI_PROVIDER="openrouter" # openrouter | openai | gemini
AI_API_KEY="sk-or-v1-..."
AI_MODEL_NAME="openai/gpt-4o-mini"
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
```

---

## 🛡️ Security & Privacy Notice
Candidate resumes contain sensitive career information. AI Career Copilot adheres to zero-trust storage policies:
- Passwords are never stored in plaintext.
- Resumes are isolated per authenticated user ID in PostgreSQL.
- Resumes are never exposed publicly or used to train third-party public models.
