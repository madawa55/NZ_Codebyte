import React, { useState, useEffect } from "react";
import { TestCase, ExecutionResult, SeniorReviewFeedback } from "../types";
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  Sparkles, 
  Clock, 
  Cpu, 
  Copy, 
  Check, 
  MessageSquare 
} from "lucide-react";

interface ExecutionConsoleProps {
  testCases: TestCase[];
  executionResult: ExecutionResult | null;
  isRunning: boolean;
  onRunCustomTest: () => void;
  customInput: string;
  onCustomInputChange: (val: string) => void;
  onRequestSeniorReview: () => void;
  isReviewing: boolean;
  seniorFeedback: SeniorReviewFeedback | null;
  onApplySeniorSnippet?: (code: string) => void;
  onRunCode?: () => void;
  onSubmitCode?: () => void;
  isDark?: boolean;
}

export const ExecutionConsole: React.FC<ExecutionConsoleProps> = ({
  testCases,
  executionResult,
  isRunning,
  onRunCustomTest,
  customInput,
  onCustomInputChange,
  onRequestSeniorReview,
  isReviewing,
  seniorFeedback,
  onApplySeniorSnippet,
  onRunCode,
  onSubmitCode,
  isDark = true,
}) => {
  const [activeTab, setActiveTab] = useState<"cases" | "results" | "diagnostics" | "senior-review">("cases");
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Automatically switch to output when running
  useEffect(() => {
    if (isRunning) {
      setActiveTab("results");
    }
  }, [isRunning]);

  // Automatically switch tabs upon results or senior feedback
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
    <div className={`h-full flex flex-col rounded-2xl shadow-sm overflow-hidden select-text transition-colors duration-300 border ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      {/* Bento Console Header */}
      <div className={`h-10 px-4 flex items-center justify-between shrink-0 text-xs border-b ${
        isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center gap-2">
          {/* Header tabs styled as bento pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("cases")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                activeTab === "cases"
                  ? isDark 
                    ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                    : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-semibold"
                  : isDark 
                  ? "text-slate-400 hover:text-white" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Test Cases ({visibleTestCases.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("results")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                activeTab === "results"
                  ? isDark 
                    ? "bg-slate-950 text-indigo-400 border border-slate-800 shadow-sm"
                    : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-semibold"
                  : isDark 
                  ? "text-slate-400 hover:text-white" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {executionResult?.overallStatus === "passed" ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : executionResult?.overallStatus === "failed" ? (
                <XCircle className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Terminal className="w-3.5 h-3.5" />
              )}
              <span>Output</span>
              {executionResult && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  executionResult.overallStatus === "passed" 
                    ? isDark ? "bg-emerald-950 text-emerald-400" : "bg-emerald-100 text-emerald-700" 
                    : isDark ? "bg-red-950 text-red-400" : "bg-red-100 text-red-700"
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
                    ? isDark 
                      ? "bg-slate-950 text-red-400 border border-slate-800 shadow-sm" 
                      : "bg-white text-red-700 border border-red-200 shadow-sm"
                    : "text-red-500 hover:text-red-700"
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
                  ? isDark 
                    ? "bg-slate-950 text-indigo-300 border border-slate-800 shadow-sm"
                    : "bg-white text-indigo-700 border border-slate-200 shadow-sm font-semibold"
                  : isDark 
                  ? "text-indigo-400/80 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>NZ Senior Review</span>
              {seniorFeedback && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border ${
                  isDark ? "bg-indigo-950 text-indigo-300 border-indigo-800/40" : "bg-indigo-100 text-indigo-800 border-indigo-200"
                }`}>
                  {seniorFeedback.grade}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Console Action Buttons */}
        <div className="flex items-center gap-2">
          {onRunCode && (
            <button
              onClick={onRunCode}
              disabled={isRunning}
              className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg font-semibold shadow-xs transition-colors ${
                isRunning 
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
              title="Execute test cases (Ctrl+Enter)"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>{isRunning ? "Running..." : "Run Tests"}</span>
            </button>
          )}

          {!seniorFeedback && (
            <button
              onClick={onRequestSeniorReview}
              disabled={isReviewing}
              className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                isDark 
                  ? "text-indigo-300 hover:text-white bg-indigo-950/40 border-indigo-800/40" 
                  : "text-indigo-700 hover:text-indigo-900 bg-indigo-50 border-indigo-200"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{isReviewing ? "Evaluating..." : "Review"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Bento Console Body */}
      <div className={`flex-1 overflow-y-auto p-4 text-xs font-mono ${isDark ? "text-slate-300" : "text-slate-800"}`}>
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
                      ? isDark 
                        ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                        : "bg-indigo-600 text-white shadow-sm"
                      : isDark
                      ? "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-transparent"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  Case {index + 1}
                </button>
              ))}
              <button
                onClick={() => setSelectedCaseIndex(-1)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCaseIndex === -1
                    ? isDark 
                      ? "bg-indigo-950 text-indigo-200 border border-indigo-800 shadow-sm"
                      : "bg-indigo-100 text-indigo-800 border border-indigo-300 shadow-sm font-bold"
                    : isDark
                    ? "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-transparent"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                + Custom Input
              </button>
            </div>

            {selectedCaseIndex >= 0 && visibleTestCases[selectedCaseIndex] && (
              <div className={`p-4 rounded-xl border space-y-3 shadow-sm ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div>
                  <div className={`text-[10px] uppercase tracking-widest font-sans mb-1 font-bold ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}>
                    Input Arguments:
                  </div>
                  <pre className={`p-2.5 rounded-lg border overflow-x-auto ${
                    isDark ? "bg-black/40 border-slate-800/80 text-indigo-300" : "bg-white border-slate-200 text-indigo-700 font-semibold"
                  }`}>
                    {visibleTestCases[selectedCaseIndex].inputDisplay}
                  </pre>
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-widest font-sans mb-1 font-bold ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}>
                    Expected Return Value:
                  </div>
                  <pre className={`p-2.5 rounded-lg border overflow-x-auto ${
                    isDark ? "bg-black/40 border-slate-800/80 text-emerald-400" : "bg-white border-slate-200 text-emerald-700 font-semibold"
                  }`}>
                    {String(visibleTestCases[selectedCaseIndex].expected)}
                  </pre>
                </div>
                {visibleTestCases[selectedCaseIndex].explanation && (
                  <div className={`font-sans text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    <strong className={isDark ? "text-slate-300" : "text-slate-800"}>Note: </strong>
                    {visibleTestCases[selectedCaseIndex].explanation}
                  </div>
                )}

                {/* Quick execution bar inside test case view */}
                <div className={`pt-3 border-t flex items-center justify-between font-sans ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}>
                  <div className="flex items-center gap-2">
                    {onRunCode && (
                      <button
                        onClick={onRunCode}
                        disabled={isRunning}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                          isRunning 
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{isRunning ? "Running tests..." : "Run Tests"}</span>
                      </button>
                    )}
                    {onSubmitCode && (
                      <button
                        onClick={onSubmitCode}
                        disabled={isRunning}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                          isRunning
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Submit Solution</span>
                      </button>
                    )}
                  </div>
                  <span className={`text-[11px] font-sans ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Shortcut: <kbd className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${
                      isDark ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"
                    }`}>Ctrl+Enter</kbd>
                  </span>
                </div>
              </div>
            )}

            {/* Custom Input Editor */}
            {selectedCaseIndex === -1 && (
              <div className={`p-4 rounded-xl border space-y-3 shadow-sm ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center justify-between font-sans">
                  <span className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
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
                  className={`w-full h-20 p-2.5 border rounded-lg font-mono text-xs focus:outline-none focus:border-indigo-500 ${
                    isDark ? "bg-black/40 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-900"
                  }`}
                />
                <p className={`text-[11px] font-sans ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Verify edge cases, null guards, or extreme values against your algorithm.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Test Results / Terminal Output */}
        {activeTab === "results" && (
          <div className="space-y-3">
            {isRunning ? (
              <div className={`rounded-xl border p-8 text-center font-mono space-y-3 ${
                isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}>
                <div className="w-7 h-7 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-indigo-400">Compiling with Roslyn & Executing Test Cases...</p>
                  <p className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Validating C# types, executing sandbox, measuring execution time & peak memory
                  </p>
                </div>
              </div>
            ) : !executionResult ? (
              <div className={`rounded-xl border p-6 text-center font-mono space-y-2 ${
                isDark ? "bg-black/40 border-slate-800/80 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-500"
              }`}>
                <Terminal className={`w-6 h-6 mx-auto ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                <p className="text-xs">No execution output yet. Click <strong>Run Tests</strong> or <strong>Submit Solution</strong> to compile and execute.</p>
                <p className="text-indigo-500 animate-pulse">_</p>
              </div>
            ) : (
              <>
                {/* Overall Terminal Summary Box */}
                <div className={`rounded-xl border p-3 font-mono space-y-1.5 ${
                  isDark ? "bg-slate-950 border-slate-800/80" : "bg-slate-900 text-slate-100 border-slate-800"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={executionResult.overallStatus === "passed" ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                      [{executionResult.overallStatus.toUpperCase()}] {executionResult.stats?.passedTests ?? 0}/{executionResult.stats?.totalTests ?? (executionResult.results?.length || 0)} Tests Passed
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Execution: {executionResult.stats?.totalExecutionTimeMs ?? 0}ms | Memory: {executionResult.stats?.peakMemoryKb ?? 0}KB
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
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
                          ? isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                          : isDark ? "bg-red-500/5 border-red-500/20" : "bg-red-50/50 border-red-200 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {res.passed ? (
                            <span className="text-emerald-500 font-bold">[PASS]</span>
                          ) : (
                            <span className="text-red-500 font-bold">[FAIL]</span>
                          )}
                          <span className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            Test Case {idx + 1}
                          </span>
                        </div>
                        <span className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                          {res.executionTimeMs}ms • {res.memoryKb}KB
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className={`block text-[10px] uppercase font-sans ${isDark ? "text-slate-500" : "text-slate-500"}`}>Input:</span>
                          <pre className={`p-1.5 rounded overflow-x-auto truncate ${
                            isDark ? "bg-black/40 text-indigo-300" : "bg-slate-100 text-indigo-700"
                          }`}>
                            {res.input}
                          </pre>
                        </div>
                        <div>
                          <span className={`block text-[10px] uppercase font-sans ${isDark ? "text-slate-500" : "text-slate-500"}`}>Expected:</span>
                          <pre className={`p-1.5 rounded overflow-x-auto truncate ${
                            isDark ? "bg-black/40 text-emerald-400" : "bg-slate-100 text-emerald-700"
                          }`}>
                            {res.expected}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <span className={`block text-[10px] uppercase font-sans ${isDark ? "text-slate-500" : "text-slate-500"}`}>Actual Output:</span>
                        <pre className={`p-1.5 rounded overflow-x-auto ${
                          isDark ? "bg-black/40" : "bg-slate-100"
                        } ${
                          res.passed ? isDark ? "text-slate-300" : "text-slate-800" : "text-red-600 font-bold"
                        }`}>
                          {res.actual || (res.error ? `Runtime Exception: ${res.error}` : "null")}
                        </pre>
                      </div>

                      {res.stdout && (
                        <div>
                          <span className={`block text-[10px] uppercase font-sans ${isDark ? "text-slate-500" : "text-slate-500"}`}>stdout:</span>
                          <pre className={`p-1.5 rounded overflow-x-auto text-[11px] ${
                            isDark ? "bg-black/40 text-slate-400" : "bg-slate-100 text-slate-600"
                          }`}>
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
            <div className="flex items-center gap-2 text-red-500 font-sans font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>C# Roslyn Compilation Diagnostics</span>
            </div>

            {executionResult?.diagnostics && executionResult.diagnostics.length > 0 ? (
              <div className="space-y-2">
                {executionResult.diagnostics.map((diag, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border space-y-1 ${
                    isDark ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-600">
                        {diag.code}: {diag.severity.toUpperCase()}
                      </span>
                      <span className={isDark ? "text-slate-500" : "text-slate-500"}>
                        Line {diag.line}, Column {diag.column}
                      </span>
                    </div>
                    <p className={`font-mono text-xs ${isDark ? "text-slate-200" : "text-slate-800"}`}>{diag.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-4 rounded-xl border font-sans ${
                isDark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}>
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
                <Sparkles className="w-7 h-7 mx-auto text-indigo-500 animate-spin" />
                <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  NZ Principal Engineer Reviewing Your C# Implementation...
                </div>
                <p className={`text-xs max-w-md mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Analyzing Big-O complexity, heap allocations, GC pressure, and C# 12 idioms.
                </p>
              </div>
            ) : !seniorFeedback ? (
              <div className="text-center py-6 space-y-2">
                <Sparkles className="w-6 h-6 mx-auto text-indigo-500" />
                <div className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Get Senior NZ Tech Lead Evaluation</div>
                <p className={`text-xs max-w-md mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Receive an authentic architectural review from an NZ Senior Engineering Manager on time/space complexity, GC allocations, and interview questions.
                </p>
                <button
                  onClick={onRequestSeniorReview}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Architectural Review</span>
                </button>
              </div>
            ) : (
              <>
                {/* Grade Card */}
                <div className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? "bg-indigo-900/20 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
                      NZ Interview Evaluation Grade
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      seniorFeedback.grade === "Strong Hire"
                        ? isDark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : seniorFeedback.grade === "Hire"
                        ? isDark ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" : "bg-indigo-100 text-indigo-800 border-indigo-300"
                        : isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}>
                      {seniorFeedback.grade}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {seniorFeedback.summary}
                  </p>
                </div>

                {/* Big-O Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-xl border space-y-1 ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold flex items-center gap-1.5 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        Time Complexity
                      </span>
                      <span className="font-mono text-xs font-bold text-indigo-600 px-2 py-0.5 rounded">
                        {seniorFeedback.timeComplexity}
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{seniorFeedback.complexityExplanation}</p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1 ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold flex items-center gap-1.5 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
                        <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                        Space Complexity
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-600 px-2 py-0.5 rounded">
                        {seniorFeedback.spaceComplexity}
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{seniorFeedback.memoryAndGcAnalysis}</p>
                  </div>
                </div>

                {/* Follow-up Questions */}
                <div className={`p-3.5 rounded-xl border space-y-2 ${
                  isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    NZ Tech Lead Interview Follow-Up Questions
                  </h3>
                  <div className="space-y-1.5">
                    {seniorFeedback.nzInterviewFollowUpQuestions.map((q, idx) => (
                      <div key={idx} className={`p-2 rounded-lg border text-xs ${
                        isDark ? "bg-black/40 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-800"
                      }`}>
                        <strong className="text-amber-600">Q{idx + 1}: </strong>
                        {q}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimized Senior Snippet */}
                {seniorFeedback.optimizedSeniorSnippet && (
                  <div className={`p-3.5 rounded-xl border space-y-2 font-mono ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between font-sans">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${
                        isDark ? "text-slate-200" : "text-slate-800"
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        Senior Production-Grade Snippet
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopySnippet(seniorFeedback.optimizedSeniorSnippet)}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                            isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {copiedSnippet ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
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
                    <pre className={`p-3 rounded-lg border overflow-x-auto text-xs ${
                      isDark ? "bg-black/50 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-900"
                    }`}>
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
