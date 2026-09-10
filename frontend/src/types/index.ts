export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  auth_provider: string;
  target_role?: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export interface ResumeData {
  id: string;
  filename: string;
  file_size_bytes: number;
  raw_text: string;
  parsed_summary?: string;
  parsed_skills: string[];
  parsed_experience: any[];
  parsed_education: any[];
  is_primary: boolean;
  created_at: string;
}

export interface ScoreBreakdown {
  hard_skills_score: number;
  domain_experience_score: number;
  keyword_coverage_score: number;
  education_baseline_score: number;
  explanation: string;
}

export interface ResumeImprovementItem {
  section_type: string;
  original_text: string;
  suggested_text: string;
  reason: string;
  impact_level: "High" | "Medium" | "Low";
}

export interface JobAnalysisData {
  id: string;
  resume_id: string;
  job_title: string;
  company_name?: string;
  job_description_raw: string;
  overall_match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  relevant_experience_notes?: string;
  potential_weaknesses: string[];
  missing_keywords: string[];
  recommended_improvements: ResumeImprovementItem[];
  score_breakdown: ScoreBreakdown;
  created_at: string;
}

export interface CoverLetterData {
  id: string;
  job_title: string;
  company_name?: string;
  tone: "Professional" | "Friendly" | "Confident" | "Concise";
  content: string;
  is_edited: boolean;
  created_at: string;
}

export interface InterviewTurnData {
  id: string;
  question_number: number;
  question_type: "technical" | "behavioral" | "role_specific" | "missing_skills";
  question_text: string;
  user_answer?: string;
  ai_feedback?: string;
  score?: number;
  ideal_points: string[];
  created_at: string;
}

export interface InterviewSessionData {
  id: string;
  job_title: string;
  target_role?: string;
  status: "in_progress" | "completed";
  overall_score?: number;
  strengths: string[];
  weaknesses: string[];
  recommended_study_topics: string[];
  turns: InterviewTurnData[];
  created_at: string;
}
