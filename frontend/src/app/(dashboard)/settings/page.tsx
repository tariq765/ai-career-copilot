"use client";

import React, { useState } from "react";
import { User, Key, Database, Shield, Check, Save } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function SettingsPage() {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState(user?.target_role || "Senior Full-Stack Engineer");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Account & Model Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your career profile, AI provider configuration, and database connection status.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details */}
        <Card className="p-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-500" /> Career Profile
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={user?.full_name || "Syed Test User"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-sm opacity-80"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || "syed.portfolio@example.com"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-sm opacity-80"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Card>

        {/* Database Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Neon Serverless PostgreSQL</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Connected & Synced (ep-crimson-frost-a7dr4fkn)
                </p>
              </div>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </Card>

        {/* AI Provider Config */}
        <Card className="p-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-500" /> Custom AI Provider Key (Optional)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            By default, AI Career Copilot uses the configured backend provider (OpenRouter / Gemini / OpenAI). You can optionally provide your own key:
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              OpenRouter / OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" size="md">
            {saved ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {saved ? "Settings Saved" : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
