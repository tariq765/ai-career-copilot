import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaAndFooter() {
  return (
    <div>
      {/* Final CTA Banner */}
      <section className="py-20 bg-gradient-to-b from-transparent to-indigo-50/50 dark:to-indigo-950/20 border-t border-slate-200/60 dark:border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ready to accelerate your next career move?
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Upload your resume, paste the job posting, and receive instant actionable insights today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/register">
              <Button variant="gradient" size="lg" className="shadow-xl shadow-indigo-500/25 px-8">
                Get Started for Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              AI Career Copilot
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} AI Career Copilot. Built with Next.js, FastAPI & PostgreSQL.
          </p>

          <div className="flex items-center gap-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs">
            <Link href="/login" className="hover:underline">Sign In</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
