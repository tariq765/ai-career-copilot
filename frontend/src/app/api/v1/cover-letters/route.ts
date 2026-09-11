import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { resume_id, job_title, company_name, job_description, tone } = await req.json();

    const companyStr = company_name || "your esteemed organization";
    let content = "";

    if (tone === "Confident") {
      content = `Dear Hiring Team at ${companyStr},\n\nI am writing to express my strong enthusiasm for the ${job_title} role. With a solid track record of delivering resilient full-stack systems, architecting high-throughput microservices with Next.js and FastAPI, and optimizing PostgreSQL databases, I am confident in my ability to make an immediate impact on your product roadmap.\n\nIn my recent engineering initiatives, I have consistently focused on measurable performance gains—optimizing SQL queries, automating CI/CD pipelines, and containerizing distributed applications with Docker. I look forward to discussing how my skills and proactive problem-solving mindset can accelerate your team's goals.\n\nSincerely,\nMuhammad Tariq Asghar`;
    } else if (tone === "Concise") {
      content = `Dear Hiring Team,\n\nI am applying for the ${job_title} position at ${companyStr}.\n\nKey Qualifications:\n• Strong engineering foundation in TypeScript, Next.js 16, Python, and SQL databases.\n• Proven ability to design scalable APIs, optimize query latency, and build accessible web apps.\n• Focus on clean architecture, comprehensive automated testing, and dependable delivery.\n\nI would welcome the opportunity to connect and discuss how my background fits your technical needs.\n\nBest regards,\nMuhammad Tariq Asghar`;
    } else if (tone === "Friendly") {
      content = `Hi ${companyStr} Team,\n\nI came across the opening for the ${job_title} role and was immediately excited to apply! Having followed your recent growth, I have been impressed by your commitment to building high-quality software experiences.\n\nThroughout my career, I've loved collaborating across teams to turn complex ideas into clean, user-focused products. Whether building full-stack features or fine-tuning database performance, I bring both technical enthusiasm and a supportive team spirit.\n\nWarmly,\nMuhammad Tariq Asghar`;
    } else {
      content = `Dear Hiring Manager,\n\nPlease accept this letter as an expression of my serious interest in the ${job_title} position at ${companyStr}. Having reviewed your requirements, I believe my background in full-stack software development, database design, and API engineering makes me a strong candidate for your team.\n\nMy technical experience encompasses designing performant backend services with PostgreSQL, building modern frontend interfaces in Next.js, and implementing scalable cloud architectures. I prioritize clean code principles, system maintainability, and data integrity across every stage of development.\n\nThank you for your time and consideration. I welcome the opportunity to discuss my qualifications in greater detail during an interview.\n\nSincerely,\nMuhammad Tariq Asghar`;
    }

    const letterId = crypto.randomUUID();
    const now = new Date().toISOString();

    return NextResponse.json({
      id: letterId,
      job_title,
      company_name,
      tone: tone || "Professional",
      content,
      is_edited: false,
      created_at: now
    });
  } catch (e: any) {
    return NextResponse.json({ detail: e.message || "Failed to generate cover letter." }, { status: 500 });
  }
}
