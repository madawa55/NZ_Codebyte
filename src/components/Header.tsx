import React, { useState, useEffect } from "react";
import { Challenge, BackgroundTheme } from "../types";
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
  Briefcase,
  Palette,
  Shuffle,
  Sun,
  Moon
} from "lucide-react";

interface HeaderProps {
  currentChallenge: Challenge;
  challenges: Challenge[];
  currentTheme: BackgroundTheme;
  isDark: boolean;
  onToggleMode: () => void;
  onOpenBgModal: () => void;
  onCycleTheme: () => void;
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
  currentTheme,
  isDark,
  onToggleMode,
  onOpenBgModal,
  onCycleTheme,
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

  const difficultyColors = isDark ? {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "Senior Specialist": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  } : {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Hard: "bg-rose-50 text-rose-700 border-rose-200",
    "Senior Specialist": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <header className={`h-14 backdrop-blur-md rounded-2xl px-4 md:px-6 flex items-center justify-between shadow-sm shrink-0 select-none transition-colors duration-300 border ${
      isDark 
        ? "bg-slate-900/70 border-slate-800 text-slate-200" 
        : "bg-white/90 border-slate-200/90 text-slate-800"
    }`}>
      {/* Left: Brand & Problem Switcher */}
      <div className="flex items-center gap-4">
        {/* Bento C# Logo Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/20">
            C#
          </div>
          <div>
            <h1 className={`text-base font-semibold tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <span>KiwiCode</span>
              <span className={`font-normal text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>// NZ Senior Path</span>
            </h1>
          </div>
        </div>

        <div className={`h-6 w-px hidden sm:block ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

        {/* Problem Selector Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenCatalog}
            id="btn-open-catalog"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
              isDark 
                ? "bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-200" 
                : "bg-slate-100 hover:bg-slate-200/70 border-slate-200 text-slate-700"
            }`}
          >
            <ListOrdered className={`w-3.5 h-3.5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
            {currentChallenge.level && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border ${
                currentChallenge.level === 1 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                currentChallenge.level === 2 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" :
                currentChallenge.level === 3 ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                "bg-rose-500/10 text-rose-400 border-rose-500/30"
              }`}>
                L{currentChallenge.level}
              </span>
            )}
            <span className="max-w-[130px] sm:max-w-[210px] md:max-w-[280px] truncate font-medium">
              {currentChallenge.title}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${difficultyColors[currentChallenge.difficulty]}`}>
              {currentChallenge.difficulty}
            </span>
          </button>

          {/* Prev/Next arrows */}
          <div className={`flex items-center rounded-xl border ${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
            <button
              onClick={() => prevChallenge && onSelectChallenge(prevChallenge)}
              disabled={!prevChallenge}
              title={prevChallenge ? `Previous: ${prevChallenge.title}` : "First challenge"}
              className={`p-1.5 disabled:opacity-30 transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className={`h-3 w-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
            <button
              onClick={() => nextChallenge && onSelectChallenge(nextChallenge)}
              disabled={!nextChallenge}
              title={nextChallenge ? `Next: ${nextChallenge.title}` : "Last challenge"}
              className={`p-1.5 disabled:opacity-30 transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`hidden xl:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl border ${
            isDark ? "text-slate-400 bg-slate-950/40 border-slate-800" : "text-slate-600 bg-slate-100/70 border-slate-200"
          }`}>
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            <span>Target:</span>
            <span className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{currentChallenge.nzCompany}</span>
          </div>
        </div>
      </div>

      {/* Right: Server Status, Timer & Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Server Status Pill (Auckland-1) */}
        <div className={`hidden md:flex items-center gap-2 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Auckland-1</span>
        </div>

        <div className={`h-8 w-[1px] hidden md:block ${isDark ? "bg-slate-800" : "bg-slate-200"}`}></div>

        {/* Timer Bento Block */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className={`text-[10px] uppercase tracking-widest leading-none font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}>Timer</p>
            <p className="font-mono text-xs font-bold text-indigo-600 leading-tight">
              {formatTime(timerSeconds)}
            </p>
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title={isTimerRunning ? "Pause timer" : "Start timer"}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Solved Counter Pill */}
        <div className={`hidden lg:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl border ${
          isDark ? "text-slate-400 bg-slate-950/50 border-slate-800" : "text-slate-600 bg-slate-100 border-slate-200"
        }`}>
          <span>Solved:</span>
          <span className="font-mono text-indigo-600 font-bold">{solvedCount}/{challenges.length}</span>
        </div>

        {/* Quick Light/Dark Mode Toggle Button */}
        <button
          onClick={onToggleMode}
          id="btn-toggle-light-dark"
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          className={`p-2 rounded-xl border transition-colors flex items-center justify-center ${
            isDark 
              ? "bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-amber-400 hover:text-amber-300" 
              : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-indigo-600 hover:text-indigo-700"
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Background & Theme Selector Trigger */}
        <div className={`flex items-center rounded-xl border ${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
          <button
            onClick={onOpenBgModal}
            id="btn-open-bg-modal"
            title={`Background Theme: ${currentTheme.name} (Click to customize)`}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-l-xl text-xs font-medium transition-colors ${
              isDark ? "text-slate-300 hover:text-white hover:bg-slate-800/80" : "text-slate-700 hover:text-slate-900 hover:bg-slate-200/70"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-400/40 shrink-0"
              style={{ backgroundColor: currentTheme.accentColor }}
            />
            <Palette className={`w-3.5 h-3.5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
            <span className="hidden sm:inline font-medium text-[11px] max-w-[85px] truncate">
              {currentTheme.name}
            </span>
          </button>
          <div className={`h-3.5 w-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
          <button
            onClick={onCycleTheme}
            id="btn-quick-cycle-bg"
            title="Quick Cycle Background (Press 'B' anytime)"
            className={`p-1.5 rounded-r-xl transition-colors ${
              isDark ? "text-slate-400 hover:text-white hover:bg-slate-800/80" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/70"
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset Code */}
          <button
            onClick={onResetCode}
            title="Reset code boilerplate"
            id="btn-reset-code"
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* AI Senior Review Button */}
          <button
            onClick={onRequestSeniorReview}
            disabled={isReviewing}
            id="btn-senior-review"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 border ${
              isDark 
                ? "text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/50 border-indigo-800/40 hover:border-indigo-600" 
                : "text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-indigo-200 hover:border-indigo-300"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isReviewing ? "animate-spin text-indigo-500" : "text-indigo-600"}`} />
            <span>Senior Review</span>
          </button>

          {/* Run Tests Button */}
          <button
            onClick={onRunCode}
            disabled={isRunning || isSubmitting}
            id="btn-run-code"
            className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 disabled:opacity-50 ${
              isDark 
                ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700" 
                : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : "text-emerald-500 fill-emerald-500"}`} />
            <span className="hidden sm:inline">{isRunning ? "Running..." : "Run Tests"}</span>
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={onSubmitCode}
            disabled={isRunning || isSubmitting}
            id="btn-submit-code"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
            <span>{isSubmitting ? "Evaluating..." : "Submit Solution"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
