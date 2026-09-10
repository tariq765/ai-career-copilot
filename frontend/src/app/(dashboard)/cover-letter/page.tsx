"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, Send, Sliders } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";

export default function CoverLetterPage() {
  const [tone, setTone] = useState<"Professional" | "Friendly" | "Confident" | "Concise">("Professional");
  const [jobTitle, setJobTitle] = useState("Senior Full-Stack AI Engineer");
  const [companyName, setCompanyName] = useState("Stripe");
  const [jobDescription, setJobDescription] = useState("Looking for an engineer to architect scalable Next.js and FastAPI services with PostgreSQL.");
  const [generatedLetter, setGeneratedLetter] = useState<string>(
`Dear Hiring Manager,

Please accept this letter as an expression of my serious interest in the Senior Full-Stack AI Engineer position at Stripe. Having reviewed your requirements, I believe my background in full-stack software development, database design, and API engineering makes me a strong candidate for your team.

My technical experience encompasses designing performant backend services with FastAPI and PostgreSQL, building accessible frontend interfaces in Next.js 16, and implementing scalable cloud architectures with Docker. I prioritize clean code principles, system maintainability, and data integrity across every stage of the development lifecycle.

Thank you for your time and consideration. I welcome the opportunity to discuss my qualifications in greater detail during an interview.

Sincerely,
Syed Portfolio User`
  );
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post("/cover-letters", {
        resume_id: "res_demo_1",
        job_title: jobTitle,
        company_name: companyName,
        job_description: jobDescription,
        tone: tone
      });
      setGeneratedLetter(res.data.content);
    } catch (e) {
      // Keep or refresh tone template locally
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tailored Cover Letter Studio
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Generate authentic, tone-calibrated cover letters tailored directly to your target job posting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings & Parameters */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-500" /> Letter Parameters
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Professional", "Confident", "Friendly", "Concise"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        tone === t
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Job Description Excerpt
                </label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <Button type="submit" variant="gradient" className="w-full" isLoading={loading}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Tailored Letter
              </Button>
            </form>
          </Card>
        </div>

        {/* Editable Output Canvas */}
        <div className="lg:col-span-7">
          <Card className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{tone} Tone</Badge>
                  <span className="text-xs text-slate-500">Live Editable Canvas</span>
                </div>

                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-3.5 w-3.5 mr-1.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                  {copied ? "Copied!" : "Copy Letter"}
                </Button>
              </div>

              <textarea
                rows={16}
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              Tip: You can edit or refine any sentences above before copying to your clipboard.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
