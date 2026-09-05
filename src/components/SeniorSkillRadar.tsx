import React from "react";
import { SeniorFeedback, ExecutionResponse, Challenge } from "../types";
import { Cpu, Clock, Sparkles, BookOpen, ShieldCheck } from "lucide-react";

interface SeniorSkillRadarProps {
  seniorFeedback: SeniorFeedback | null;
  executionResult: ExecutionResponse | null;
  currentChallenge: Challenge;
  onOpenGuide: () => void;
  onRequestHint: () => void;
}

export const SeniorSkillRadar: React.FC<SeniorSkillRadarProps> = ({
  seniorFeedback,
  executionResult,
  currentChallenge,
  onOpenGuide,
  onRequestHint,
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
    <section className="h-full bg-indigo-900/20 border border-indigo-500/20 rounded-2xl p-4 flex flex-col justify-between shadow-lg backdrop-blur-sm overflow-hidden select-text">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Senior Skill Radar
            </h3>
            <p className="text-[11px] text-slate-400">
              NZ Target: <strong className="text-slate-200">{currentChallenge.nzCompany}</strong>
            </p>
          </div>
        </div>

        {seniorFeedback && (
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
            seniorFeedback.grade === "Strong Hire"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : seniorFeedback.grade === "Hire"
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
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
            <span className="text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-indigo-400" />
              Memory & GC (Zero Allocation)
            </span>
            <span className="font-mono text-indigo-400 font-semibold">{memoryScore}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${memoryScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Time Complexity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-400" />
              Time Complexity ({currentChallenge.expectedTimeComplexity})
            </span>
            <span className="font-mono text-emerald-400 font-semibold">{timeScore}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${timeScore}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Code Cleanliness */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              C# 12 / .NET 8 Idioms
            </span>
            <span className="font-mono text-amber-400 font-semibold">{codeCleanlinessScore}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${codeCleanlinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Access Footer buttons */}
      <div className="flex items-center justify-between pt-1 border-t border-indigo-500/10 text-xs">
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 text-[11px] text-indigo-300 hover:text-white transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>NZ Interview Handbook</span>
        </button>

        <button
          onClick={onRequestHint}
          className="flex items-center gap-1 text-[11px] bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 px-2 py-0.5 rounded-lg border border-indigo-500/30 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>Get Hint</span>
        </button>
      </div>
    </section>
  );
};
