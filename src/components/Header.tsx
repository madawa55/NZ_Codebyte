import React, { useState, useEffect } from "react";
import { Challenge } from "../types";
import { 
  Play, 
  Send, 
  RotateCcw, 
  Clock, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  ListOrdered, 
  Sparkles,
  Briefcase
} from "lucide-react";

interface HeaderProps {
  currentChallenge: Challenge;
  challenges: Challenge[];
  onSelectChallenge: (c: Challenge) => void;
  onOpenCatalog: () => void;
  onResetCode: () => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  onRequestSeniorReview: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  isReviewing: boolean;
  solvedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentChallenge,
  challenges,
  onSelectChallenge,
  onOpenCatalog,
  onResetCode,
  onRunCode,
  onSubmitCode,
  onRequestSeniorReview,
  isRunning,
  isSubmitting,
  isReviewing,
  solvedCount,
}) => {
  // Mock interview timer
  const [timerSeconds, setTimerSeconds] = useState(35 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentIndex = challenges.findIndex((c) => c.id === currentChallenge.id);
  const prevChallenge = currentIndex > 0 ? challenges[currentIndex - 1] : null;
  const nextChallenge = currentIndex < challenges.length - 1 ? challenges[currentIndex + 1] : null;

  const difficultyColors = {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "Senior Specialist": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };

  return (
    <header className="h-14 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl px-4 md:px-6 flex items-center justify-between shadow-xl shrink-0 select-none">
      {/* Left: Brand & Problem Switcher */}
      <div className="flex items-center gap-4">
        {/* Bento C# Logo Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-950">
            C#
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
              <span>KiwiCode</span>
              <span className="text-slate-500 font-normal text-xs">// NZ Senior Path</span>
            </h1>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 hidden sm:block" />

        {/* Problem Selector Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenCatalog}
            id="btn-open-catalog"
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5 text-slate-400" />
            <span className="max-w-[130px] sm:max-w-[210px] md:max-w-[280px] truncate font-medium">
              {currentChallenge.title}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${difficultyColors[currentChallenge.difficulty]}`}>
              {currentChallenge.difficulty}
            </span>
          </button>

          {/* Prev/Next arrows */}
          <div className="flex items-center bg-slate-950/60 border border-slate-800 rounded-xl">
            <button
              onClick={() => prevChallenge && onSelectChallenge(prevChallenge)}
              disabled={!prevChallenge}
              title={prevChallenge ? `Previous: ${prevChallenge.title}` : "First challenge"}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="h-3 w-px bg-slate-800" />
            <button
              onClick={() => nextChallenge && onSelectChallenge(nextChallenge)}
              disabled={!nextChallenge}
              title={nextChallenge ? `Next: ${nextChallenge.title}` : "Last challenge"}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/40 px-2.5 py-1 rounded-xl border border-slate-800">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target:</span>
            <span className="text-white font-medium">{currentChallenge.nzCompany}</span>
          </div>
        </div>
      </div>

      {/* Right: Server Status, Timer & Action Buttons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Server Status Pill (Auckland-1) */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Server Ready: Auckland-1</span>
        </div>

        <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>

        {/* Timer Bento Block */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Timer</p>
            <p className="font-mono text-xs font-bold text-indigo-400 leading-tight">
              {formatTime(timerSeconds)}
            </p>
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title={isTimerRunning ? "Pause timer" : "Start timer"}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Solved Counter Pill */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/50 border border-slate-800 px-2.5 py-1 rounded-xl">
          <span>Solved:</span>
          <span className="font-mono text-indigo-400 font-bold">{solvedCount}/{challenges.length}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset Code */}
          <button
            onClick={onResetCode}
            title="Reset code boilerplate"
            id="btn-reset-code"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* AI Senior Review Button */}
          <button
            onClick={onRequestSeniorReview}
            disabled={isReviewing}
            id="btn-senior-review"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/40 hover:border-indigo-600 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isReviewing ? "animate-spin text-indigo-400" : "text-indigo-300"}`} />
            <span>Senior Review</span>
          </button>

          {/* Run Tests Button */}
          <button
            onClick={onRunCode}
            disabled={isRunning || isSubmitting}
            id="btn-run-code"
            className="bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : "text-emerald-400 fill-emerald-400"}`} />
            <span className="hidden sm:inline">{isRunning ? "Running..." : "Run Tests"}</span>
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={onSubmitCode}
            disabled={isRunning || isSubmitting}
            id="btn-submit-code"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-md shadow-indigo-950 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
            <span>{isSubmitting ? "Evaluating..." : "Submit Solution"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
