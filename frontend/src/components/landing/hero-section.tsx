import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Shield, BrainCircuit, FileSearch, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-purple-500/10 dark:bg-purple-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/40 backdrop-blur-md mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs sm:text-sm font-medium text-indigo-900 dark:text-indigo-200">
            Next-Generation AI Career Intelligence
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Your AI Career <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Copilot</span>
        </h1>

        {/* Supporting text */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Analyze your resume, understand your skill gaps, prepare for interviews, and tailor your job applications with AI.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-500/30">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Structured JSON AI Evaluation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>ATS Resume Match Score</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Interactive Mock Interviews</span>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-900/40 p-3 sm:p-4 backdrop-blur-2xl shadow-2xl">
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8 text-left shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">Senior Full-Stack Engineer</h3>
                  <Badge variant="success">87% Match Score</Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Target Company: Stripe / Cloudflare</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-medium">
                  Resume Tailored
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 font-medium">
                  4 Missing Skills Identified
                </span>
              </div>
            </div>

            {/* Analysis Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-3">
                  <CheckCircle2 className="h-4 w-4" /> Strong Matching Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "TypeScript", "Next.js", "FastAPI", "PostgreSQL", "Tailwind CSS"].map((s) => (
                    <span key={s} className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm mb-3">
                  <Target className="h-4 w-4" /> Identified Skill Gaps
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["GraphQL", "Kafka", "Distributed Caching", "Kubernetes"].map((s) => (
                    <span key={s} className="text-xs px-2.5 py-0.5 rounded-md bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-3">
                  <BrainCircuit className="h-4 w-4" /> Next Recommended Action
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Start a tailored mock interview focusing on System Architecture and Redis caching questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
