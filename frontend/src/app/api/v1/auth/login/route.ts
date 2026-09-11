import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "ai-career-copilot-super-secret-production-key-2026-portfolio";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ detail: "Email and password are required." }, { status: 400 });
    }

    const users = await sql`
      SELECT id, email, hashed_password, full_name, target_role, auth_provider, created_at 
      FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      return NextResponse.json({ detail: "Incorrect email or password." }, { status: 401 });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return NextResponse.json({ detail: "Incorrect email or password." }, { status: 401 });
    }

    const token = jwt.sign({ sub: user.id }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({
      access_token: token,
      token_type: "bearer",
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        target_role: user.target_role,
        auth_provider: user.auth_provider,
        created_at: user.created_at
      }
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json({ detail: error.message || "Failed to log in." }, { status: 500 });
  }
}
