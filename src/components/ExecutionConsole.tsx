import React, { useState, useEffect } from "react";
import { TestCase, ExecutionResponse, SeniorFeedback } from "../types";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  MessageSquare,
  Play
} from "lucide-react";

interface ExecutionConsoleProps {
  testCases: TestCase[];
  customInput: string;
  onCustomInputChange: (val: string) => void;
  executionResult: ExecutionResponse | null;
  seniorFeedback: SeniorFeedback | null;
  isRunning: boolean;
  isReviewing: boolean;
  onRunCustomTest: () => void;
  onRequestSeniorReview: () => void;
  onApplySeniorSnippet?: (code: string) => void;
}

export const ExecutionConsole: React.FC<ExecutionConsoleProps> = ({
  testCases,
  customInput,
  onCustomInputChange,
  executionResult,
  seniorFeedback,
  isRunning,
  isReviewing,
  onRunCustomTest,
  onRequestSeniorReview,
  onApplySeniorSnippet,
}) => {
  const [activeTab, setActiveTab] = useState<"cases" | "results" | "diagnostics" | "senior-review">(
    executionResult ? "results" : "cases"
  );
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    if (executionResult) {
      if (!executionResult.compilationSuccess) {
        setActiveTab("diagnostics");
      } else {
        setActiveTab("results");
      }
    }
  }, [executionResult]);

  useEffect(() => {
    if (seniorFeedback) {
      setActiveTab("senior-review");
    }
  }, [seniorFeedback]);

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const visibleTestCases = testCases.filter((tc) => !tc.isHidden);

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden select-text">
      {/* Bento Console Header */}
      <div className="h-10 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 bg-slate-900/90 text-xs">
        <div className="flex items-center gap-2">
          {/* Header tabs styled as bento pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("cases")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                activeTab === "cases"
                  ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Test Cases ({visibleTestCases.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("results")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                activeTab === "results"
                  ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {executionResult?.overallStatus === "passed" ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : executionResult?.overallStatus === "failed" ? (
                <XCircle className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Terminal className="w-3.5 h-3.5" />
              )}
              <span>Output</span>
              {executionResult && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  executionResult.overallStatus === "passed" ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400"
                }`}>
                  {executionResult.stats.passedTests}/{executionResult.stats.totalTests}
                </span>
              )}
            </button>

            {executionResult?.diagnostics && executionResult.diagnostics.length > 0 && (
              <button
                onClick={() => setActiveTab("diagnostics")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === "diagnostics"
                    ? "bg-slate-950 text-red-400 border border-slate-800 shadow-sm"
                    : "text-red-400/80 hover:text-red-300"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Compiler Diagnostics ({executionResult.diagnostics.length})</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("senior-review")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                activeTab === "senior-review"
                  ? "bg-slate-950 text-indigo-300 border border-slate-800 shadow-sm"
                  : "text-indigo-400/80 hover:text-indigo-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>NZ Senior Review</span>
              {seniorFeedback && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800/40">
                  {seniorFeedback.grade}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Status dots on right */}
        <div className="flex items-center gap-2">
          {!seniorFeedback && (
            <button
              onClick={onRequestSeniorReview}
              disabled={isReviewing}
              className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-white bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-800/40 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isReviewing ? "Evaluating..." : "Review"}</span>
            </button>
          )}
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          </div>
        </div>
      </div>

      {/* Bento Console Body */}
      <div className="flex-1 overflow-y-auto p-4 text-xs font-mono">
        {/* Tab 1: Test Cases */}
        {activeTab === "cases" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {visibleTestCases.map((tc, index) => (
                <button
                  key={tc.id}
                  onClick={() => setSelectedCaseIndex(index)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCaseIndex === index
                      ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                      : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  Case {index + 1}
                </button>
              ))}
              <button
                onClick={() => setSelectedCaseIndex(-1)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCaseIndex === -1
                    ? "bg-indigo-950 text-indigo-200 border border-indigo-800 shadow-sm"
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                + Custom Input
              </button>
            </div>

            {selectedCaseIndex >= 0 && visibleTestCases[selectedCaseIndex] && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-sm">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-sans mb-1 font-bold">
                    Input Arguments:
                  </div>
                  <pre className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 text-indigo-300 overflow-x-auto">
                    {visibleTestCases[selectedCaseIndex].inputDisplay}
                  </pre>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-sans mb-1 font-bold">
                    Expected Return Value:
                  </div>
                  <pre className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 text-emerald-400 overflow-x-auto">
                    {String(visibleTestCases[selectedCaseIndex].expected)}
                  </pre>
                </div>
                {visibleTestCases[selectedCaseIndex].explanation && (
                  <div className="text-slate-400 font-sans text-xs">
                    <strong className="text-slate-300">Note: </strong>
                    {visibleTestCases[selectedCaseIndex].explanation}
                  </div>
                )}
              </div>
            )}

            {/* Custom Input Editor */}
            {selectedCaseIndex === -1 && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between font-sans">
                  <span className="text-xs font-bold text-slate-200">
                    Custom Test Input (JSON or Arguments)
                  </span>
                  <button
                    onClick={onRunCustomTest}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Run Custom Input</span>
                  </button>
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => onCustomInputChange(e.target.value)}
                  placeholder='e.g. { "tolerance": 0.05, "bankFeeds": [10.0, 20.0], "invoices": [10.02, 20.01] }'
                  className="w-full h-20 p-2.5 bg-black/40 border border-slate-800 rounded-lg font-mono text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] font-sans text-slate-400">
                  Verify edge cases, null guards, or extreme values against your algorithm.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Test Results / Terminal Output */}
        {activeTab === "results" && (
          <div className="space-y-3">
            {!executionResult ? (
              <div className="flex-1 bg-black/40 rounded-xl border border-slate-800/80 p-6 text-center text-slate-500 font-mono space-y-2">
                <Terminal className="w-6 h-6 mx-auto text-slate-600" />
                <p className="text-xs">No execution output yet. Click <strong>Run Tests</strong> or <strong>Submit Solution</strong> to compile and execute.</p>
                <p className="text-indigo-400 animate-pulse">_</p>
              </div>
            ) : (
              <>
                {/* Overall Terminal Summary Box */}
                <div className="bg-black/40 rounded-xl border border-slate-800/80 p-3 font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={executionResult.overallStatus === "passed" ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                      [{executionResult.overallStatus.toUpperCase()}] {executionResult.stats.passedTests}/{executionResult.stats.totalTests} Tests Passed
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Execution: {executionResult.stats.totalExecutionTimeMs}ms | Memory: {executionResult.stats.peakMemoryKb}KB
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Environment: Roslyn .NET 8 JIT | GC Mode: Workstation
                  </p>
                </div>

                {/* Individual Test Results */}
                <div className="space-y-2">
                  {executionResult.results.map((res, idx) => (
                    <div
                      key={res.testCaseId || idx}
                      className={`p-3 rounded-xl border space-y-1.5 ${
                        res.passed
                          ? "bg-slate-950/80 border-slate-800"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {res.passed ? (
                            <span className="text-emerald-400 font-bold">[PASS]</span>
                          ) : (
                            <span className="text-red-400 font-bold">[FAIL]</span>
                          )}
                          <span className="font-semibold text-slate-200">
                            Test Case {idx + 1}
                          </span>
                        </div>
                        <span className="text-slate-500 text-[11px]">
                          {res.executionTimeMs}ms • {res.memoryKb}KB
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-sans">Input:</span>
                          <pre className="p-1 bg-black/40 rounded text-indigo-300 overflow-x-auto truncate">
                            {res.input}
                          </pre>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-sans">Expected:</span>
                          <pre className="p-1 bg-black/40 rounded text-emerald-400 overflow-x-auto truncate">
                            {res.expected}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-sans">Actual Output:</span>
                        <pre className={`p-1 bg-black/40 rounded overflow-x-auto ${
                          res.passed ? "text-slate-300" : "text-red-400 font-bold"
                        }`}>
                          {res.actual || (res.error ? `Runtime Exception: ${res.error}` : "null")}
                        </pre>
                      </div>

                      {res.stdout && (
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-sans">stdout:</span>
                          <pre className="p-1 bg-black/40 text-slate-400 rounded overflow-x-auto text-[11px]">
                            {res.stdout}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 3: Compiler Diagnostics */}
        {activeTab === "diagnostics" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-sans font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>C# Roslyn Compilation Diagnostics</span>
            </div>

            {executionResult?.diagnostics && executionResult.diagnostics.length > 0 ? (
              <div className="space-y-2">
                {executionResult.diagnostics.map((diag, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-400">
                        {diag.code}: {diag.severity.toUpperCase()}
                      </span>
                      <span className="text-slate-500">
                        Line {diag.line}, Column {diag.column}
                      </span>
                    </div>
                    <p className="text-slate-200 font-mono text-xs">{diag.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-sans">
                Code compiled cleanly with zero diagnostic errors.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: NZ Senior AI Review */}
        {activeTab === "senior-review" && (
          <div className="space-y-4 font-sans">
            {isReviewing ? (
              <div className="py-8 text-center space-y-2">
                <Sparkles className="w-7 h-7 mx-auto text-indigo-400 animate-spin" />
                <div className="text-sm font-semibold text-white">
                  NZ Principal Engineer Reviewing Your C# Implementation...
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Analyzing Big-O complexity, heap allocations, GC pressure, and C# 12 idioms.
                </p>
              </div>
            ) : !seniorFeedback ? (
              <div className="text-center py-6 space-y-2">
                <Sparkles className="w-6 h-6 mx-auto text-indigo-400" />
                <div className="text-sm font-bold text-white">Get Senior NZ Tech Lead Evaluation</div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Receive an authentic architectural review from an NZ Senior Engineering Manager on time/space complexity, GC allocations, and interview questions.
                </p>
                <button
                  onClick={onRequestSeniorReview}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Architectural Review</span>
                </button>
              </div>
            ) : (
              <>
                {/* Grade Card */}
                <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                      NZ Interview Evaluation Grade
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      seniorFeedback.grade === "Strong Hire"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : seniorFeedback.grade === "Hire"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}>
                      {seniorFeedback.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {seniorFeedback.summary}
                  </p>
                </div>

                {/* Big-O Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        Time Complexity
                      </span>
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                        {seniorFeedback.timeComplexity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{seniorFeedback.complexityExplanation}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                        Space Complexity
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                        {seniorFeedback.spaceComplexity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{seniorFeedback.memoryAndGcAnalysis}</p>
                  </div>
                </div>

                {/* Follow-up Questions */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    NZ Tech Lead Interview Follow-Up Questions
                  </h3>
                  <div className="space-y-1.5">
                    {seniorFeedback.nzInterviewFollowUpQuestions.map((q, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-black/40 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-amber-300">Q{idx + 1}: </strong>
                        {q}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimized Senior Snippet */}
                {seniorFeedback.optimizedSeniorSnippet && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Senior Production-Grade Snippet
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopySnippet(seniorFeedback.optimizedSeniorSnippet)}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                        >
                          {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedSnippet ? "Copied" : "Copy"}</span>
                        </button>
                        {onApplySeniorSnippet && (
                          <button
                            onClick={() => onApplySeniorSnippet(seniorFeedback.optimizedSeniorSnippet)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                          >
                            Apply to Editor
                          </button>
                        )}
                      </div>
                    </div>
                    <pre className="p-3 rounded-lg bg-black/50 border border-slate-800 overflow-x-auto text-xs text-slate-200">
                      <code>{seniorFeedback.optimizedSeniorSnippet}</code>
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
