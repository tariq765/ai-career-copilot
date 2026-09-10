"use client";

import React from "react";
import { GraduationCap, BookOpen, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SkillsRoadmapPage() {
  const roadmaps = [
    {
      title: "Distributed Message Streaming (Kafka)",
      category: "Backend & Systems",
      status: "High Priority Gap",
      duration: "3-4 hours",
      topics: [
        "Kafka Brokers, Topics, Partitions & Consumer Groups",
        "At-least-once vs Exactly-once message delivery semantics",
        "Integrating aiokafka with Python FastAPI event streams"
      ]
    },
    {
      title: "Redis Invalidation Patterns & Connection Pooling",
      category: "Database & Performance",
      status: "Recommended",
      duration: "2 hours",
      topics: [
        "Cache-aside pattern vs Write-through architectures",
        "Mitigating Cache Stampedes using Redis Distributed Locks (Redlock)",
        "Measuring P99 latency drops with redis-py connection pools"
      ]
    },
    {
      title: "PostgreSQL Query Optimization & Execution Plans",
      category: "Database Engineering",
      status: "Mastered Baseline",
      duration: "2 hours",
      topics: [
        "Reading and optimizing EXPLAIN (ANALYZE, BUFFERS) outputs",
        "B-Tree, GIN, and GiST indexes for JSON and full-text search",
        "Neon Serverless autoscaling and connection pooler tuning"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Skill Gap & Study Roadmaps
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Targeted study modules designed to bridge the gap between your current resume and senior engineering job requirements.
        </p>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 gap-6">
        {roadmaps.map((map) => (
          <Card key={map.title} hoverEffect className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{map.title}</h3>
                  <Badge variant={map.status.includes("High") ? "danger" : "default"}>
                    {map.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Category: {map.category} • Estimated Time: {map.duration}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Curated Study Objectives:
              </p>
              <ul className="space-y-2">
                {map.topics.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
