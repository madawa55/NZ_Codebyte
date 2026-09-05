import React from "react";
import { SeniorReviewFeedback, ExecutionResult, Challenge } from "../types";
import { Cpu, Clock, Sparkles, BookOpen, ShieldCheck } from "lucide-react";

interface SeniorSkillRadarProps {
  seniorFeedback: SeniorReviewFeedback | null;
  executionResult: ExecutionResult | null;
  currentChallenge: Challenge;
  onOpenGuide: () => void;
  onRequestHint: () => void;
  isDark?: boolean;
}

export const SeniorSkillRadar: React.FC<SeniorSkillRadarProps> = ({
  seniorFeedback,
  executionResult,
  currentChallenge,
  onOpenGuide,
  onRequestHint,
  isDark = true,
}) => {
  // Calculate dynamic skill metrics
  const isPassed = executionResult?.overallStatus === "passed";
  const hasSpan = seniorFeedback?.memoryAndGcAnalysis?.includes("Span") || seniorFeedback?.modernCsharpIdioms?.some(i => i.toLowerCase().includes("span"));
  const isOptimalTime = seniorFeedback?.timeComplexity === currentChallenge.expectedTimeComplexity;

  const memoryScore = seniorFeedback 
    ? (hasSpan ? 96 : 84) 
    : isPassed ? 88 : 65;

  const timeScore = seniorFeedback
    ? (isOptimalTime ? 95 : 78)
    : isPassed ? 92 : 60;

  const codeCleanlinessScore = seniorFeedback
    ? (seniorFeedback.grade === "Strong Hire" ? 95 : seniorFeedback.grade === "Hire" ? 85 : 72)
    : 78;

  return (
    <section className={`h-full rounded-2xl p-4 flex flex-col justify-between shadow-sm overflow-hidden select-text transition-colors duration-300 border ${
      isDark 
        ? "bg-indigo-900/20 border-indigo-500/20 backdrop-blur-sm" 
        : "bg-white border-slate-200"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
            isDark ? "bg-indigo-600/30 border-indigo-500/40 text-indigo-400" : "bg-indigo-50 border-indigo-200 text-indigo-600"
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Senior Skill Radar
            </h3>
            <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              NZ Target: <strong className={isDark ? "text-slate-200" : "text-slate-800"}>{currentChallenge.nzCompany}</strong>
            </p>
          </div>
        </div>

        {seniorFeedback && (
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
            seniorFeedback.grade === "Strong Hire"
              ? isDark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-emerald-100 text-emerald-800 border-emerald-300"
              : seniorFeedback.grade === "Hire"
              ? isDark ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" : "bg-indigo-100 text-indigo-800 border-indigo-300"
              : isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-amber-100 text-amber-800 border-amber-300"
          }`}>
            {seniorFeedback.grade}
          </span>
        )}
      </div>

      {/* Metric Bars */}
      <div className="space-y-3 my-auto py-1">
        {/* Metric 1: Memory Efficiency */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <Cpu className="w-3 h-3 text-indigo-500" />
              Memory & GC (Zero Allocation)
            </span>
            <span className="font-mono text-indigo-600 font-semibold">{memoryScore}%</span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-700"
              style={{ width: `${memoryScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Time Complexity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <Clock className="w-3 h-3 text-emerald-500" />
              Time Complexity ({currentChallenge.expectedTimeComplexity})
            </span>
            <span className="font-mono text-emerald-600 font-semibold">{timeScore}%</span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${timeScore}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Code Cleanliness */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <Sparkles className="w-3 h-3 text-amber-500" />
              C# 12 / .NET 8 Idioms
            </span>
            <span className="font-mono text-amber-600 font-semibold">{codeCleanlinessScore}%</span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${codeCleanlinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Access Footer buttons */}
      <div className={`flex items-center justify-between pt-1 border-t text-xs ${
        isDark ? "border-indigo-500/10" : "border-slate-200"
      }`}>
        <button
          onClick={onOpenGuide}
          className={`flex items-center gap-1.5 text-[11px] transition-colors ${
            isDark ? "text-indigo-300 hover:text-white" : "text-indigo-700 hover:text-indigo-900 font-medium"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>NZ Interview Handbook</span>
        </button>

        <button
          onClick={onRequestHint}
          className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg border transition-colors ${
            isDark 
              ? "bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border-indigo-500/30" 
              : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 font-medium"
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Get Hint</span>
        </button>
      </div>
    </section>
  );
};
