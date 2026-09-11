import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { job_title, target_role } = await req.json();
    const sessionId = crypto.randomUUID();
    const now = new Date().toISOString();

    const firstQuestion = `Could you briefly introduce yourself and walk me through your engineering experience relevant to the ${job_title} role?`;

    return NextResponse.json({
      id: sessionId,
      job_title,
      target_role: target_role || "Senior Full-Stack Engineer",
      status: "in_progress",
      turns: [
        {
          id: "turn_1",
          question_number: 1,
          question_type: "role_specific",
          question_text: firstQuestion,
          ideal_points: [
            "Mention specific frontend / backend stack experience",
            "Give concrete examples of production scale and outcomes",
            "Highlight architectural and database design decisions"
          ],
          created_at: now
        }
      ],
      created_at: now
    });
  } catch (e: any) {
    return NextResponse.json({ detail: e.message || "Failed to start interview." }, { status: 500 });
  }
}
