import React, { useState } from "react";
import { Challenge } from "../types";
import { 
  FileText, 
  Lightbulb, 
  Award, 
  Check, 
  Copy, 
  Compass, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  HardDrive,
  Sparkles
} from "lucide-react";

interface ProblemDescriptionProps {
  challenge: Challenge;
  onRequestCustomHint: (level: number) => void;
  isLoadingHint: boolean;
  customHintText: string | null;
  isDark?: boolean;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  challenge,
  onRequestCustomHint,
  isLoadingHint,
  customHintText,
  isDark = true,
}) => {
  const [activeTab, setActiveTab] = useState<"problem" | "rubric" | "hints" | "solution">("problem");
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState<{ [key: number]: boolean }>({ 1: true });

  const handleCopySolution = () => {
    navigator.clipboard.writeText(challenge.referenceSolution);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

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
    <div className={`h-full flex flex-col rounded-2xl shadow-sm overflow-hidden select-text transition-colors duration-300 border ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      {/* Bento Tab Navigation */}
      <div className={`h-11 px-4 flex items-center gap-1.5 shrink-0 border-b ${
        isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <button
          onClick={() => setActiveTab("problem")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "problem"
              ? isDark 
                ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-bold"
              : isDark
              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Description</span>
        </button>

        <button
          onClick={() => setActiveTab("rubric")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "rubric"
              ? isDark 
                ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-bold"
              : isDark
              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>NZ Rubric</span>
        </button>

        <button
          onClick={() => setActiveTab("hints")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "hints"
              ? isDark 
                ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-bold"
              : isDark
              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Hints</span>
        </button>

        <button
          onClick={() => setActiveTab("solution")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "solution"
              ? isDark 
                ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-bold"
              : isDark
              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Solution</span>
        </button>
      </div>

      {/* Bento Tab Content Area */}
      <div className={`flex-1 overflow-y-auto p-5 text-sm leading-relaxed space-y-5 ${
        isDark ? "text-slate-300" : "text-slate-700"
      }`}>
        {activeTab === "problem" && (
          <>
            {/* Header / Badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs font-bold rounded border uppercase ${difficultyColors[challenge.difficulty]}`}>
                  {challenge.difficulty}
                </span>
                <span className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                  Target: <strong className={`font-sans font-semibold ${isDark ? "text-slate-300" : "text-slate-800"}`}>{challenge.nzCompany}</strong>
                </span>
                <span className={isDark ? "text-slate-600" : "text-slate-300"}>•</span>
                <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                  {challenge.category}
                </span>
              </div>
              <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>{challenge.title}</h2>
            </div>

            {/* Complexity Targets Card */}
            <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-xl border shadow-sm ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                  isDark ? "bg-indigo-950/60 border-indigo-800/40 text-indigo-400" : "bg-indigo-100 border-indigo-200 text-indigo-600"
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-slate-500" : "text-slate-500"}`}>Target Time</div>
                  <div className="font-mono text-xs font-bold text-indigo-600">{challenge.expectedTimeComplexity}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                  isDark ? "bg-emerald-950/60 border-emerald-800/40 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-600"
                }`}>
                  <HardDrive className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-slate-500" : "text-slate-500"}`}>Target Space</div>
                  <div className="font-mono text-xs font-bold text-emerald-600">{challenge.expectedSpaceComplexity}</div>
                </div>
              </div>
            </div>

            {/* NZ Senior Context Callout Bento Tile */}
            <div className={`p-4 rounded-xl space-y-2 shadow-sm border ${
              isDark ? "bg-indigo-900/20 border-indigo-500/20" : "bg-indigo-50/70 border-indigo-200"
            }`}>
              <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${
                isDark ? "text-indigo-400" : "text-indigo-700"
              }`}>
                <Briefcase className="w-3.5 h-3.5" />
                <span>NZ Tech Lead Context ({challenge.nzCompany})</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {challenge.nzInterviewContext}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h3 className={`text-xs uppercase tracking-widest font-bold ${isDark ? "text-slate-500" : "text-slate-500"}`}>Problem Specification</h3>
              <div className={`text-sm whitespace-pre-line leading-relaxed ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                {challenge.description}
              </div>
            </div>

            {/* Examples Bento Cards */}
            <div className="space-y-3">
              <h3 className={`text-xs uppercase tracking-widest font-bold ${isDark ? "text-slate-500" : "text-slate-500"}`}>Examples</h3>
              {challenge.examples.map((ex, idx) => (
                <div key={idx} className={`p-4 rounded-xl border space-y-2 shadow-sm ${
                  isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-500"}`}>Example {idx + 1}</p>
                  <p className={`font-mono text-xs ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                    <span className={isDark ? "text-slate-500" : "text-slate-500"}>Input: </span>
                    <span className={`font-semibold ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>{ex.input}</span>
                    <br />
                    <span className={isDark ? "text-slate-500" : "text-slate-500"}>Output: </span>
                    <span className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>{ex.output}</span>
                    {ex.explanation && (
                      <>
                        <br />
                        <span className={isDark ? "text-slate-500" : "text-slate-500"}>Explanation: </span>
                        <span className={`font-sans ${isDark ? "text-slate-400" : "text-slate-600"}`}>{ex.explanation}</span>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h3 className={`font-semibold text-xs tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>Constraints</h3>
              <ul className={`list-disc list-inside space-y-1 text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {challenge.constraints.map((c, idx) => (
                  <li key={idx}>
                    <span className={isDark ? "text-slate-200" : "text-slate-800"}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Tab 2: NZ Senior Interview Rubric */}
        {activeTab === "rubric" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                NZ Senior Software Engineer Competency Rubric
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                How Principal & Lead Engineers evaluate candidates at Xero, Pushpay, Datacom, and Trade Me.
              </p>
            </div>

            <div className="space-y-3">
              <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                  <span>1. Memory Allocation & GC Efficiency (Gen 0/1/2)</span>
                </div>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Senior candidates avoid gratuitous heap allocations. Use <code className={`px-1 rounded ${isDark ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-800"}`}>ReadOnlySpan&lt;T&gt;</code>, avoid LINQ on hot loops, and eliminate boxing.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>2. Big-O Complexity Rigor</span>
                </div>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  State the Time & Space complexity before writing code. If an algorithm is <code className="text-amber-600 font-mono">O(N²)</code>, proactively explain why quadratic scaling fails on large datasets.
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. Modern C# (.NET 8 & 9) Idioms</span>
                </div>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Leverage C# 12 collection expressions <code className={`px-1 rounded ${isDark ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-800"}`}>[..items]</code>, pattern matching, <code className={`px-1 rounded ${isDark ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-800"}`}>record struct</code>, and nullable reference annotations.
                </p>
              </div>
            </div>

            {/* Challenge-specific Tips */}
            <div className="space-y-2 pt-2">
              <h3 className={`text-xs uppercase tracking-widest font-bold ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                Architectural Invariants for this Challenge
              </h3>
              <ul className="space-y-1.5 text-xs">
                {challenge.seniorEngineeringTips.map((tip, idx) => (
                  <li key={idx} className={`flex items-start gap-2 p-2.5 rounded-xl border ${
                    isDark ? "text-slate-300 bg-slate-950 border-slate-800" : "text-slate-700 bg-slate-50 border-slate-200"
                  }`}>
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Progressive Hints */}
        {activeTab === "hints" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Progressive Interview Hints
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Reveal clues progressively to mimic a real collaborative interview coaching session.
              </p>
            </div>

            {/* Hint 1 */}
            <div className={`p-4 rounded-xl border space-y-2 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Hint 1: Conceptual Intuition</span>
                <button
                  onClick={() => setRevealedHints((p) => ({ ...p, 1: !p[1] }))}
                  className={`text-xs underline ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  {revealedHints[1] ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealedHints[1] && (
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>{challenge.hints.level1}</p>
              )}
            </div>

            {/* Hint 2 */}
            <div className={`p-4 rounded-xl border space-y-2 ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Hint 2: Algorithm & Data Structure</span>
                <button
                  onClick={() => setRevealedHints((p) => ({ ...p, 2: !p[2] }))}
                  className={`text-xs underline ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  {revealedHints[2] ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealedHints[2] ? (
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>{challenge.hints.level2}</p>
              ) : (
                <p className={`text-xs italic ${isDark ? "text-slate-500" : "text-slate-400"}`}>Click reveal for the recommended data structure.</p>
              )}
            </div>

            {/* Dynamic AI Hint Coach */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              isDark ? "bg-indigo-900/20 border-indigo-500/20" : "bg-indigo-50/70 border-indigo-200"
            }`}>
              <div className={`flex items-center gap-2 text-xs font-bold ${isDark ? "text-indigo-300" : "text-indigo-800"}`}>
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Ask AI Senior Coach for Dynamic Hint</span>
              </div>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Stuck on your current implementation? Ask for tailored guidance:
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRequestCustomHint(1)}
                  disabled={isLoadingHint}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                  }`}
                >
                  Subtle Nudge
                </button>
                <button
                  onClick={() => onRequestCustomHint(2)}
                  disabled={isLoadingHint}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                  }`}
                >
                  Algorithmic Hint
                </button>
                <button
                  onClick={() => onRequestCustomHint(3)}
                  disabled={isLoadingHint}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    isDark ? "bg-indigo-600/40 hover:bg-indigo-600/60 text-indigo-200 border-indigo-500/30" : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600"
                  }`}
                >
                  Deep C# Tip
                </button>
              </div>

              {isLoadingHint && (
                <div className={`flex items-center gap-2 text-xs ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing your C# code for tailored feedback...</span>
                </div>
              )}

              {customHintText && (
                <div className={`p-3 rounded-xl border text-xs ${
                  isDark ? "bg-slate-950 border-indigo-500/30 text-slate-200" : "bg-white border-indigo-300 text-slate-800"
                }`}>
                  {customHintText}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Senior Reference Solution */}
        {activeTab === "solution" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  <Award className="w-4 h-4 text-emerald-500" />
                  NZ Senior-Grade Reference Implementation
                </h2>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Optimal time & space complexity adhering to modern C# 12 and .NET 8 idioms.
                </p>
              </div>

              <button
                onClick={handleCopySolution}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                  isDark ? "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300" : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                }`}
              >
                {copiedSolution ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSolution ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Block */}
            <pre className={`p-4 rounded-xl border overflow-x-auto text-xs font-mono leading-relaxed ${
              isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}>
              <code>{challenge.referenceSolution}</code>
            </pre>

            {/* Architectural Explanation */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Architectural Proof & Breakdown
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {challenge.solutionExplanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
