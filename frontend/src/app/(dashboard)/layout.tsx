"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  Target,
  Sparkle,
  MailQuestion,
  MessageSquareCode,
  GraduationCap,
  Settings,
  LogOut,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/context/auth-context";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Resumes", href: "/resumes", icon: FileText },
  { name: "Match Analysis", href: "/analyze", icon: Target },
  { name: "Improve Resume", href: "/improve", icon: Sparkle },
  { name: "Cover Letters", href: "/cover-letter", icon: MailQuestion },
  { name: "Mock Interview", href: "/interview", icon: MessageSquareCode },
  { name: "Skill Roadmaps", href: "/skills", icon: GraduationCap },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                Career Copilot
              </span>
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-slate-500 dark:text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer profile */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                {user?.full_name?.charAt(0) || "U"}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold truncate">{user?.full_name || "Alex Morgan"}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email || "alex@example.com"}</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="h-16 md:hidden border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-30">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm">Career Copilot</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={logout} className="text-xs text-rose-500 font-medium">Logout</button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
