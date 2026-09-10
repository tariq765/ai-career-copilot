"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";

export function DetailAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How is the Resume–Job Match Score calculated?",
      a: "The score is calculated using a weighted multi-factor formula: Hard Technical Skill Coverage (40%), Experience & Domain Alignment (35%), ATS Keyword Presence (15%), and Educational/Role Baseline (10%). It serves as an objective relevance indicator against the job requirements."
    },
    {
      q: "Does AI Career Copilot store my personal documents publicly?",
      a: "No. All resume files and text are strictly isolated in your personal account database. We never expose resumes publicly, nor do we sell or share applicant data with third-party advertisers."
    },
    {
      q: "Can I edit the generated cover letters and resume points?",
      a: "Absolutely! All AI outputs—from cover letters to resume bullet rewrite suggestions—are fully editable in the dashboard before you copy or export them."
    },
    {
      q: "How does the Mock Interview simulation work?",
      a: "The AI acts as a technical or hiring manager interviewer. It asks one question at a time (tailored to your missing skills and target role), listens to your answer, provides an answer score with constructive feedback, and gives a full summary report at the end."
    },
    {
      q: "What LLM models power the assistant?",
      a: "The backend is powered by a modular AI abstraction supporting OpenAI GPT-4o, Google Gemini 1.5/2.0, and OpenRouter-compatible models with strict JSON schema validation."
    }
  ];

  return (
    <div className="py-20">
      {/* Resume Analysis Showcase Section */}
      <section id="resume-analysis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="success" className="mb-3">Deep ATS Intelligence</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Stop guessing why recruiters aren't responding
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              Applicant Tracking Systems (ATS) and recruiters scan for specific domain terminologies, hard skills, and metric-driven achievements. Our AI pinpoints exact gaps in seconds.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Explicit Skill Gap Flagging:</strong> Know which libraries, frameworks, or methodologies the job post requires that your resume skipped.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Bullet-Point Rewriting:</strong> Convert vague statements like "worked on backend" into high-impact metrics like "Architected distributed FastAPI microservices handling 2M+ daily requests".
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Ethical AI:</strong> We enhance clarity and highlight your real strengths without fabricating fake experiences.
                </span>
              </li>
            </ul>
          </div>

          <Card className="border-indigo-100 dark:border-indigo-900/60 shadow-xl p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" /> Resume Improvement Engine
              </h4>
              <Badge variant="purple">High Impact</Badge>
            </div>

            <div className="mt-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1">Original Wording</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">"Responsible for writing SQL queries and fixing database issues."</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">AI Suggested High-Impact Wording</p>
                <p className="text-xs text-slate-800 dark:text-slate-100 font-medium">"Optimized complex PostgreSQL queries and indexing schemas, reducing query latency by 42% across critical reporting pipelines."</p>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                <strong>Why:</strong> Replaces passive duty listing with measurable engineering outcome and specific database technology.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Security & Privacy Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="rounded-3xl bg-indigo-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-800/80 border border-indigo-700 text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Enterprise-Grade Privacy & Security
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">Your career documents belong to you. Always.</h3>
            <p className="mt-4 text-indigo-200 text-sm sm:text-base leading-relaxed">
              We apply strict input validation, encrypted storage, and sanitized AI prompts. Your resumes are never indexed publicly or used to train third-party public models.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-3">Got Questions?</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
