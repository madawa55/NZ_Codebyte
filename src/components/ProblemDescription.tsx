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
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  challenge,
  onRequestCustomHint,
  isLoadingHint,
  customHintText,
}) => {
  const [activeTab, setActiveTab] = useState<"problem" | "rubric" | "hints" | "solution">("problem");
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState<{ [key: number]: boolean }>({ 1: true });

  const handleCopySolution = () => {
    navigator.clipboard.writeText(challenge.referenceSolution);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const difficultyColors = {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    "Senior Specialist": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden select-text">
      {/* Bento Tab Navigation */}
      <div className="h-11 border-b border-slate-800 px-4 flex items-center gap-1.5 shrink-0 bg-slate-900/90">
        <button
          onClick={() => setActiveTab("problem")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "problem"
              ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Description</span>
        </button>

        <button
          onClick={() => setActiveTab("rubric")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "rubric"
              ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>NZ Rubric</span>
        </button>

        <button
          onClick={() => setActiveTab("hints")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "hints"
              ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Hints</span>
        </button>

        <button
          onClick={() => setActiveTab("solution")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "solution"
              ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Solution</span>
        </button>
      </div>

      {/* Bento Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-5 text-slate-300 text-sm leading-relaxed space-y-5">
        {activeTab === "problem" && (
          <>
            {/* Header / Badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs font-bold rounded border uppercase ${difficultyColors[challenge.difficulty]}`}>
                  {challenge.difficulty}
                </span>
                <span className="text-slate-500 text-xs font-mono">
                  Target: <strong className="text-slate-300 font-sans">{challenge.nzCompany}</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500 text-xs">
                  {challenge.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{challenge.title}</h2>
            </div>

            {/* Complexity Targets Card */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Target Time</div>
                  <div className="font-mono text-xs font-bold text-indigo-400">{challenge.expectedTimeComplexity}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                  <HardDrive className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Target Space</div>
                  <div className="font-mono text-xs font-bold text-emerald-400">{challenge.expectedSpaceComplexity}</div>
                </div>
              </div>
            </div>

            {/* NZ Senior Context Callout Bento Tile */}
            <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>NZ Tech Lead Context ({challenge.nzCompany})</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.nzInterviewContext}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500">Problem Specification</h3>
              <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                {challenge.description}
              </div>
            </div>

            {/* Examples Bento Cards */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500">Examples</h3>
              {challenge.examples.map((ex, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Example {idx + 1}</p>
                  <p className="font-mono text-xs text-slate-300">
                    <span className="text-slate-500">Input: </span>
                    <span className="text-indigo-300 font-semibold">{ex.input}</span>
                    <br />
                    <span className="text-slate-500">Output: </span>
                    <span className="text-emerald-400 font-semibold">{ex.output}</span>
                    {ex.explanation && (
                      <>
                        <br />
                        <span className="text-slate-500">Explanation: </span>
                        <span className="text-slate-400 font-sans">{ex.explanation}</span>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold text-xs tracking-wider uppercase">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                {challenge.constraints.map((c, idx) => (
                  <li key={idx}>
                    <span className="text-slate-200">{c}</span>
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
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                NZ Senior Software Engineer Competency Rubric
              </h2>
              <p className="text-xs text-slate-400">
                How Principal & Lead Engineers evaluate candidates at Xero, Pushpay, Datacom, and Trade Me.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>1. Memory Allocation & GC Efficiency (Gen 0/1/2)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Senior candidates avoid gratuitous heap allocations. Use <code className="bg-slate-800 text-slate-200 px-1 rounded">ReadOnlySpan&lt;T&gt;</code>, avoid LINQ on hot loops, and eliminate boxing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Big-O Complexity Rigor</span>
                </div>
                <p className="text-xs text-slate-400">
                  State the Time & Space complexity before writing code. If an algorithm is <code className="text-amber-400 font-mono">O(N²)</code>, proactively explain why quadratic scaling fails on large datasets.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. Modern C# (.NET 8 & 9) Idioms</span>
                </div>
                <p className="text-xs text-slate-400">
                  Leverage C# 12 collection expressions <code className="bg-slate-800 text-slate-200 px-1 rounded">[..items]</code>, pattern matching, <code className="bg-slate-800 text-slate-200 px-1 rounded">record struct</code>, and nullable reference annotations.
                </p>
              </div>
            </div>

            {/* Challenge-specific Tips */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500">
                Architectural Invariants for this Challenge
              </h3>
              <ul className="space-y-1.5 text-xs">
                {challenge.seniorEngineeringTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Progressive Interview Hints
              </h2>
              <p className="text-xs text-slate-400">
                Reveal clues progressively to mimic a real collaborative interview coaching session.
              </p>
            </div>

            {/* Hint 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Hint 1: Conceptual Intuition</span>
                <button
                  onClick={() => setRevealedHints((p) => ({ ...p, 1: !p[1] }))}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  {revealedHints[1] ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealedHints[1] && (
                <p className="text-xs text-slate-300 leading-relaxed">{challenge.hints.level1}</p>
              )}
            </div>

            {/* Hint 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Hint 2: Algorithm & Data Structure</span>
                <button
                  onClick={() => setRevealedHints((p) => ({ ...p, 2: !p[2] }))}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  {revealedHints[2] ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealedHints[2] ? (
                <p className="text-xs text-slate-300 leading-relaxed">{challenge.hints.level2}</p>
              ) : (
                <p className="text-xs text-slate-500 italic">Click reveal for the recommended data structure.</p>
              )}
            </div>

            {/* Dynamic AI Hint Coach */}
            <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Ask AI Senior Coach for Dynamic Hint</span>
              </div>
              <p className="text-xs text-slate-400">
                Stuck on your current implementation? Ask for tailored guidance:
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRequestCustomHint(1)}
                  disabled={isLoadingHint}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                >
                  Subtle Nudge
                </button>
                <button
                  onClick={() => onRequestCustomHint(2)}
                  disabled={isLoadingHint}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                >
                  Algorithmic Hint
                </button>
                <button
                  onClick={() => onRequestCustomHint(3)}
                  disabled={isLoadingHint}
                  className="px-3 py-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600/60 text-xs font-medium text-indigo-200 border border-indigo-500/30"
                >
                  Deep C# Tip
                </button>
              </div>

              {isLoadingHint && (
                <div className="flex items-center gap-2 text-xs text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing your C# code for tailored feedback...</span>
                </div>
              )}

              {customHintText && (
                <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs text-slate-200">
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
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  NZ Senior-Grade Reference Implementation
                </h2>
                <p className="text-xs text-slate-400">
                  Optimal time & space complexity adhering to modern C# 12 and .NET 8 idioms.
                </p>
              </div>

              <button
                onClick={handleCopySolution}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300"
              >
                {copiedSolution ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSolution ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Block */}
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
              <code>{challenge.referenceSolution}</code>
            </pre>

            {/* Architectural Explanation */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Architectural Proof & Breakdown
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.solutionExplanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
