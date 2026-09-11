"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetData, setResetData] = useState<{ token: string; reset_url: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.post("/auth/forgot-password", { email });
      setResetData({
        token: res.data.reset_token,
        reset_url: res.data.reset_url
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to generate password reset request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50/60 dark:bg-slate-950">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              AI Career Copilot
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot Password?</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Enter your registered email to reset your account password
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!resetData ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <Button type="submit" variant="gradient" className="w-full mt-2" isLoading={loading}>
                Generate Reset Link
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Reset Token Ready!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your secure verification token has been verified for <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="gradient"
                  className="w-full"
                  onClick={() => router.push(`/reset-password?token=${resetData.token}`)}
                >
                  <KeyRound className="h-4 w-4 mr-2" />
                  Set New Password Now
                </Button>
              </div>
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
