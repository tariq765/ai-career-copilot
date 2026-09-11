import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "ai-career-copilot-super-secret-production-key-2026-portfolio";

export async function POST(req: Request) {
  try {
    const { full_name, email, password, target_role } = await req.json();

    if (!email || !password || !full_name) {
      return NextResponse.json({ detail: "Full name, email, and password are required." }, { status: 400 });
    }

    // Check if user exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ detail: "An account with this email already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();

    await sql`
      INSERT INTO users (id, email, hashed_password, full_name, target_role, auth_provider, created_at, updated_at)
      VALUES (${userId}, ${email}, ${hashedPassword}, ${full_name}, ${target_role || "Senior Full-Stack Engineer"}, 'email', ${now}, ${now})
    `;

    const token = jwt.sign({ sub: userId }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({
      access_token: token,
      token_type: "bearer",
      user: {
        id: userId,
        email,
        full_name,
        target_role: target_role || "Senior Full-Stack Engineer",
        auth_provider: "email",
        created_at: now
      }
    });
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json({ detail: error.message || "Failed to register user." }, { status: 500 });
  }
}
