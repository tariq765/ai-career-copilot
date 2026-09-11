import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "ai-career-copilot-super-secret-production-key-2026-portfolio";

export async function POST(req: Request) {
  try {
    const { token, new_password } = await req.json();

    if (!token || !new_password) {
      return NextResponse.json(
        { detail: "Reset token and new password are required." },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { detail: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Verify reset token
    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err: any) {
      return NextResponse.json(
        { detail: "Invalid or expired reset token. Please request a new one." },
        { status: 401 }
      );
    }

    if (decoded.type !== "password_reset" || !decoded.sub) {
      return NextResponse.json(
        { detail: "Invalid token purpose." },
        { status: 400 }
      );
    }

    const userId = decoded.sub;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update in database
    await sql`
      UPDATE users 
      SET hashed_password = ${hashedPassword} 
      WHERE id = ${userId}
    `;

    return NextResponse.json({
      message: "Your password has been successfully reset. You can now log in."
    });
  } catch (error: any) {
    console.error("Reset password API error:", error);
    return NextResponse.json(
      { detail: error.message || "Failed to reset password." },
      { status: 500 }
    );
  }
}
