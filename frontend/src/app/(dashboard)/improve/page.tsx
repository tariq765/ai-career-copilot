"use client";

import React, { useState } from "react";
import { Sparkles, Check, Copy, ArrowRight, ThumbsUp, ShieldCheck } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ImproveResumePage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const improvements = [
    {
      id: 1,
      section: "Experience • Backend Microservices",
      impact: "High",
      original: "Worked on developing backend APIs in Python and writing SQL queries.",
      suggested: "Architected high-throughput FastAPI microservices and optimized PostgreSQL schemas, reducing average API response latency by 42% across core endpoints.",
      reason: "Replaces passive task description with named production tech stack and quantified latency performance outcome."
    },
    {
      id: 2,
      section: "Experience • Cloud & CI/CD",
      impact: "High",
      original: "Responsible for Docker deployments and Github pipelines.",
      suggested: "Engineered automated GitHub Actions CI/CD workflows and containerized multi-service Docker architectures, cutting deployment cycle times by 65%.",
      reason: "Emphasizes engineering ownership and measurable business impact on release velocity."
    },
    {
      id: 3,
      section: "Summary • Executive Profile",
      impact: "Medium",
      original: "Software engineer looking for full stack roles with React and Python.",
      suggested: "Full-Stack AI & Software Engineer with 4+ years specializing in Next.js 16, Python/FastAPI architectures, and resilient relational database design.",
      reason: "Positions candidate as a specialized senior engineer with clear domain competencies."
    }
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="purple">AI Precision Rewriting</Badge>
          <Badge variant="outline">Non-Fabricating</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Improve My Resume
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Transform weak, passive job descriptions into metric-driven, high-impact bullet points without fabricating fake experience.
        </p>
      </div>

      {/* Rewrites List */}
      <div className="space-y-6">
        {improvements.map((item, idx) => (
          <Card key={item.id} hoverEffect className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.section}</span>
              <Badge variant={item.impact === "High" ? "danger" : "default"}>
                {item.impact} Impact
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {/* Original */}
              <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5 uppercase tracking-wider">
                  Current / Original Wording
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{item.original}"
                </p>
              </div>

              {/* Suggested */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 relative">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5 uppercase tracking-wider">
                  AI Suggested High-Impact Wording
                </p>
                <p className="text-xs text-slate-900 dark:text-slate-100 font-medium leading-relaxed pr-10">
                  "{item.suggested}"
                </p>

                <button
                  onClick={() => handleCopy(item.suggested, idx)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 hover:scale-105 transition-transform"
                  title="Copy bullet"
                >
                  {copiedIdx === idx ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Why explanation */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Why this works:</span>
              <span>{item.reason}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
