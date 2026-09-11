import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "ai-career-copilot-super-secret-production-key-2026-portfolio";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ detail: "Email address is required." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const users = await sql`
      SELECT id, email, full_name FROM users WHERE LOWER(email) = ${normalizedEmail}
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { detail: "No account found with this email address." },
        { status: 404 }
      );
    }

    const user = users[0];

    // Generate a 1-hour secure reset token containing purpose "password_reset"
    const resetToken = jwt.sign(
      { sub: user.id, email: user.email, type: "password_reset" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Password reset instructions generated successfully.",
      email: user.email,
      reset_token: resetToken,
      reset_url: `/reset-password?token=${resetToken}`
    });
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { detail: error.message || "Failed to process forgot password request." },
      { status: 500 }
    );
  }
}
