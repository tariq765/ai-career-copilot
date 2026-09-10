import React from "react";
import { UploadCloud, FileText, Cpu, CheckCircle, Sparkles, MessageSquareCode, ShieldCheck, Layers } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";

export function FeaturesSection() {
  const steps = [
    {
      step: "01",
      title: "Upload Your Resume",
      desc: "Upload your PDF resume. Our parser securely extracts your experience, tech stack, and key project metrics.",
      icon: UploadCloud,
    },
    {
      step: "02",
      title: "Paste Job Description",
      desc: "Add any job listing from LinkedIn, Indeed, or company career portals to calibrate requirements.",
      icon: FileText,
    },
    {
      step: "03",
      title: "Get Match & Skill Gaps",
      desc: "Receive a weighted match score, missing keywords, and specific bullet-point improvement suggestions.",
      icon: Cpu,
    },
    {
      step: "04",
      title: "Practice Mock Interview",
      desc: "Run turn-by-turn AI interview sessions tailored specifically to the target role's missing skills.",
      icon: MessageSquareCode,
    },
  ];

  const features = [
    {
      title: "Resume–Job Match Score",
      description: "A calculated relevance score based on required hard skills, domain experience, and ATS keyword density.",
      badge: "Analytics",
      icon: Layers,
    },
    {
      title: "Improve My Resume",
      description: "Direct before-and-after phrasing suggestions that turn passive descriptions into high-impact metrics.",
      badge: "Optimization",
      icon: Sparkles,
    },
    {
      title: "Tailored Cover Letters",
      description: "Generate tone-calibrated letters (Professional, Confident, Friendly, or Concise) ready for instant editing.",
      badge: "Generation",
      icon: FileText,
    },
    {
      title: "Turn-by-Turn AI Mock Interview",
      description: "Interactive AI interviewer that asks role-specific questions, grades answers, and highlights weak spots.",
      badge: "Preparation",
      icon: MessageSquareCode,
    },
    {
      title: "Skill Gap & Study Roadmaps",
      description: "Identifies technologies mentioned in the job post missing from your resume and provides study topics.",
      badge: "Insights",
      icon: Cpu,
    },
    {
      title: "Privacy First & Secure",
      description: "Your resume data is strictly isolated and sanitized. No personal information is sold or exposed.",
      badge: "Security",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-3">Simple 4-Step Process</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How AI Career Copilot Works
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            From raw resume to interview-ready application in less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.step} hoverEffect className="relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-800">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3">Everything You Need</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Comprehensive Career Acceleration Tools
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Engineered to give engineering, product, and tech applicants an undeniable edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <Card key={feat.title} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">{feat.badge}</Badge>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
