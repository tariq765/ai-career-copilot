"use client";

import React, { useState } from "react";
import { MessageSquareCode, Send, Sparkles, CheckCircle2, Award, PlayCircle, RefreshCw } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Turn {
  id: string;
  qNum: number;
  question: string;
  type: string;
  answer?: string;
  feedback?: string;
  score?: number;
  idealPoints?: string[];
}

export default function InterviewPage() {
  const [sessionActive, setSessionActive] = useState(true);
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [turns, setTurns] = useState<Turn[]>([
    {
      id: "turn_1",
      qNum: 1,
      type: "Role-Specific Overview",
      question: "Could you briefly introduce yourself and walk me through your engineering experience relevant to building distributed backend systems?",
      answer: "I have over 4 years of software development experience specializing in Python, FastAPI, and PostgreSQL. Recently I led the migration of a legacy monolithic service into containerized FastAPI microservices running in Docker, which improved P99 response times and simplified continuous deployment.",
      feedback: "Strong structured overview! You immediately highlighted relevant tech stacks (FastAPI, Docker, PostgreSQL) and mentioned a concrete migration outcome. To make it even stronger, mention the specific scale (e.g. daily request volume or team size).",
      score: 88,
      idealPoints: [
        "Mention of specific concurrency patterns in Python / FastAPI",
        "Clear quantitative metrics of the migration project",
        "Experience with database indexing and data integrity"
      ]
    },
    {
      id: "turn_2",
      qNum: 2,
      type: "Technical Deep Dive",
      question: "When designing high-throughput API endpoints with PostgreSQL and FastAPI, how do you handle database connection pooling and cache invalidation?",
    }
  ]);

  const handleSendAnswer = () => {
    if (!userAnswer.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const updatedTurns = [...turns];
      updatedTurns[1] = {
        ...updatedTurns[1],
        answer: userAnswer,
        score: 86,
        feedback: "Excellent technical response! You accurately explained async connection pooling with SQLAlchemy / asyncpg and described a cache-aside pattern with Redis. Good consideration for cache stampede edge cases.",
        idealPoints: [
          "Asyncpg connection pooling configurations (min/max connections)",
          "Redis TTL expiration vs event-driven cache invalidation",
          "Handling database write spikes with background workers"
        ]
      };

      setTurns(updatedTurns);
      setUserAnswer("");
      setLoading(false);
      setIsCompleted(true);
    }, 1200);
  };

  const restartSession = () => {
    setIsCompleted(false);
    setUserAnswer("");
    setCurrentTurnIdx(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple">Interactive Simulation</Badge>
            <Badge variant="success">Turn-by-Turn AI Evaluator</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            AI Mock Interview Simulator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Practice one question at a time. The AI grades your response, provides instant constructive feedback, and generates your final readiness report.
          </p>
        </div>

        {isCompleted && (
          <Button variant="outline" size="sm" onClick={restartSession}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Start New Interview
          </Button>
        )}
      </div>

      {/* Final Summary Card if Completed */}
      {isCompleted && (
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-0 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-indigo-600/60 border border-indigo-400 flex items-center justify-center font-black text-2xl text-emerald-400">
                87%
              </div>
              <div>
                <h3 className="text-xl font-bold">Interview Completed!</h3>
                <p className="text-xs text-indigo-200 mt-1">Performance Level: Strong Candidate (Senior Grade)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-bold text-emerald-400 mb-2 uppercase">Core Strengths</p>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-4">
                <li>Clear architectural reasoning with FastAPI & PostgreSQL</li>
                <li>Good grasp of containerization and CI/CD pipelines</li>
                <li>Structured communication under technical scrutiny</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-bold text-amber-400 mb-2 uppercase">Areas to Refine</p>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-4">
                <li>Include more exact quantitative metrics (TPS, latency drop %)</li>
                <li>Articulate trade-offs of chosen caching models in more depth</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-bold text-indigo-400 mb-2 uppercase">Recommended Study Topics</p>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-4">
                <li>Distributed Event Streaming (Apache Kafka)</li>
                <li>PostgreSQL EXPLAIN ANALYZE execution plan debugging</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Turn-by-Turn Q&A Stream */}
      <div className="space-y-6">
        {turns.map((turn, index) => (
          <Card key={turn.id} className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {turn.qNum}
                </span>
                <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {turn.type}
                </span>
              </div>
              {turn.score && (
                <Badge variant={turn.score >= 85 ? "success" : "warning"}>
                  Score: {turn.score}/100
                </Badge>
              )}
            </div>

            {/* Question */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {turn.question}
              </p>
            </div>

            {/* Answer Display */}
            {turn.answer && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Your Answer:</p>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">{turn.answer}</p>
              </div>
            )}

            {/* Feedback & Ideal Points */}
            {turn.feedback && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-3">
                <div>
                  <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> AI Interviewer Feedback
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{turn.feedback}</p>
                </div>

                {turn.idealPoints && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Key Points that elevate this answer:</p>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-0.5">
                      {turn.idealPoints.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Input for Active Question Turn */}
            {!turn.answer && (
              <div className="mt-6 space-y-3">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Type or dictate your answer:
                </label>
                <textarea
                  rows={4}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Explain your technical approach, decisions, and concrete examples..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex justify-end">
                  <Button variant="gradient" size="md" onClick={handleSendAnswer} isLoading={loading}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Answer for Evaluation
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
