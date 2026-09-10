"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Target,
  Sparkle,
  MessageSquareCode,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Clock
} from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: "Overall Match Average", value: "84%", change: "+6%", icon: Target, color: "text-emerald-500" },
    { label: "Resumes Uploaded", value: "2", change: "Active", icon: FileText, color: "text-indigo-500" },
    { label: "Mock Interviews Completed", value: "5", change: "Avg Score: 88", icon: MessageSquareCode, color: "text-purple-500" },
    { label: "Skill Gaps Identified", value: "4", change: "Study Ready", icon: AlertTriangle, color: "text-amber-500" },
  ];

  const recentAnalyses = [
    {
      title: "Senior Full-Stack Engineer",
      company: "Stripe",
      date: "2 hours ago",
      score: 87,
      status: "High Match",
    },
    {
      title: "Staff AI Backend Architect",
      company: "Anthropic",
      date: "Yesterday",
      score: 79,
      status: "Moderate Match",
    },
    {
      title: "Lead Python Platform Engineer",
      company: "OpenAI",
      date: "3 days ago",
      score: 91,
      status: "Exceptional Match",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Badge variant="purple" className="mb-2 bg-indigo-700/80 text-indigo-100 border-indigo-600">
            Target Role: {user?.target_role || "Senior Full-Stack Engineer"}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.full_name || "Alex"} 👋
          </h1>
          <p className="text-indigo-200 text-sm mt-1 max-w-xl">
            You have 3 active job analyses and 4 identified skill improvement items to review today.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link href="/analyze">
            <Button variant="gradient" size="md" className="bg-white text-indigo-950 hover:bg-indigo-50 font-semibold shadow-lg">
              <Target className="h-4 w-4 mr-1.5 text-indigo-600" />
              Analyze New Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} hoverEffect className="p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</span>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.change}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Launch Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card hoverEffect className="p-6 flex flex-col justify-between border-indigo-100 dark:border-indigo-900/60">
          <div>
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Upload className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Upload & Parse Resume</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Upload your latest PDF resume to automatically parse your skills, career experience, and projects.
            </p>
          </div>
          <Link href="/resumes">
            <Button variant="outline" size="sm" className="w-full">
              Manage Resumes
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between border-purple-100 dark:border-purple-900/60">
          <div>
            <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Sparkle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Improve Resume Bullets</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Review AI before-and-after suggestions with high-impact metrics without fabricating fake work.
            </p>
          </div>
          <Link href="/improve">
            <Button variant="outline" size="sm" className="w-full">
              Review Suggestions
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between border-emerald-100 dark:border-emerald-900/60">
          <div>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <MessageSquareCode className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Mock Interview Simulator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Practice turn-by-turn role-specific technical and behavioral questions with instant AI feedback.
            </p>
          </div>
          <Link href="/interview">
            <Button variant="outline" size="sm" className="w-full">
              Start Session
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Recent Analyses List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Job Matches</h2>
          <Link href="/analyze" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All Matches
          </Link>
        </div>

        <div className="space-y-3">
          {recentAnalyses.map((item) => (
            <Card key={item.title} hoverEffect className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-black text-sm flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900">
                  {item.score}%
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{item.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>{item.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {item.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <Badge variant={item.score >= 85 ? "success" : "warning"}>
                  {item.status}
                </Badge>
                <Link href="/analyze">
                  <Button variant="ghost" size="sm">
                    View Breakdown
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
