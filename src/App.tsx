import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CHALLENGES } from "./data/challenges";
import { Challenge, ExecutionResult, SeniorReviewFeedback, CompilationDiagnostic, BackgroundThemeId, BackgroundPatternId, BackgroundTheme } from "./types";
import { BACKGROUND_THEMES } from "./data/backgroundThemes";
import { Header } from "./components/Header";
import { ProblemDescription } from "./components/ProblemDescription";
import { CodeEditor } from "./components/CodeEditor";
import { ExecutionConsole } from "./components/ExecutionConsole";
import { SeniorSkillRadar } from "./components/SeniorSkillRadar";
import { ChallengeModal } from "./components/ChallengeModal";
import { NZInterviewGuideModal } from "./components/NZInterviewGuideModal";
import { BackgroundSelectorModal } from "./components/BackgroundSelectorModal";

export default function App() {
  const [challenges] = useState<Challenge[]>(CHALLENGES);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(() => {
    const savedId = localStorage.getItem("codebyte_current_challenge_id");
    const found = CHALLENGES.find((c) => c.id === savedId);
    return found || CHALLENGES[0];
  });

  // User Code drafts per challenge
  const [code, setCode] = useState<string>(() => {
    const savedCode = localStorage.getItem(`codebyte_draft_${currentChallenge.id}`);
    return savedCode !== null ? savedCode : currentChallenge.starterCode;
  });

  // Test & Diagnostics state
  const [diagnostics, setDiagnostics] = useState<CompilationDiagnostic[]>([]);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [seniorFeedback, setSeniorFeedback] = useState<SeniorReviewFeedback | null>(null);
  const [customInput, setCustomInput] = useState<string>("");

  // Loading states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [customHintText, setCustomHintText] = useState<string | null>(null);

  // Modals
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  // Background Theme & Pattern states: defaults to "studio-light"
  const [bgThemeId, setBgThemeId] = useState<BackgroundThemeId>(() => {
    const saved = localStorage.getItem("codebyte_bg_theme");
    return (saved as BackgroundThemeId) || "studio-light";
  });

  const [bgPattern, setBgPattern] = useState<BackgroundPatternId>(() => {
    const saved = localStorage.getItem("codebyte_bg_pattern");
    return (saved as BackgroundPatternId) || "grid";
  });

  const currentTheme: BackgroundTheme =
    BACKGROUND_THEMES.find((t) => t.id === bgThemeId) || BACKGROUND_THEMES[0];

  const handleSelectTheme = (themeId: BackgroundThemeId) => {
    setBgThemeId(themeId);
    localStorage.setItem("codebyte_bg_theme", themeId);
  };

  const handleSelectPattern = (patternId: BackgroundPatternId) => {
    setBgPattern(patternId);
    localStorage.setItem("codebyte_bg_pattern", patternId);
  };

  const handleToggleLightDark = () => {
    if (currentTheme.isDark) {
      handleSelectTheme("studio-light");
    } else {
      handleSelectTheme("midnight-slate");
    }
  };

  const handleCycleTheme = () => {
    const currentIndex = BACKGROUND_THEMES.findIndex((t) => t.id === bgThemeId);
    const nextTheme = BACKGROUND_THEMES[(currentIndex + 1) % BACKGROUND_THEMES.length];
    handleSelectTheme(nextTheme.id);
  };

  const handleRandomizeTheme = () => {
    const filtered = BACKGROUND_THEMES.filter((t) => t.id !== bgThemeId);
    const randomTheme = filtered[Math.floor(Math.random() * filtered.length)] || BACKGROUND_THEMES[0];
    handleSelectTheme(randomTheme.id);
  };

  const handleResetDefaultBg = () => {
    handleSelectTheme("studio-light");
    handleSelectPattern("grid");
  };

  // Keyboard shortcut: Press 'B' outside editor to cycle background
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        handleCycleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bgThemeId]);

  // Solved challenges tracker
  const [solvedChallengeIds, setSolvedChallengeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("codebyte_solved_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Switch challenge handler
  const handleSelectChallenge = (c: Challenge) => {
    setCurrentChallenge(c);
    localStorage.setItem("codebyte_current_challenge_id", c.id);

    const savedCode = localStorage.getItem(`codebyte_draft_${c.id}`);
    setCode(savedCode !== null ? savedCode : c.starterCode);
    setDiagnostics([]);
    setExecutionResult(null);
    setSeniorFeedback(null);
    setCustomHintText(null);
  };

  // Code change & persistence
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`codebyte_draft_${currentChallenge.id}`, newCode);
  };

  // Reset Code
  const handleResetCode = () => {
    if (window.confirm("Reset your solution to the starter C# boilerplate? Any unsaved edits will be cleared.")) {
      setCode(currentChallenge.starterCode);
      localStorage.removeItem(`codebyte_draft_${currentChallenge.id}`);
      setDiagnostics([]);
      setExecutionResult(null);
      setSeniorFeedback(null);
    }
  };

  // Run Code (sample visible test cases)
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);

    const visibleCases = currentChallenge.testCases.filter((tc) => !tc.isHidden);

    try {
      const response = await fetch("/api/compile-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeTitle: currentChallenge.title,
          challengeDescription: currentChallenge.description,
          testCases: visibleCases,
          isSubmission: false,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = "Execution request failed";
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error || errJson.message || errMsg;
        } catch {}
        setExecutionResult({
          compilationSuccess: false,
          overallStatus: "error",
          diagnostics: [{ line: 1, column: 1, severity: "error", message: errMsg, code: "CS9999" }],
          results: [],
          stats: { passedTests: 0, totalTests: visibleCases.length, totalExecutionTimeMs: 0, peakMemoryKb: 0 },
        });
        return;
      }

      const data: ExecutionResult = await response.json();
      setExecutionResult(data);
      setDiagnostics(data.diagnostics || []);
    } catch (err: any) {
      console.error("Failed to run code:", err);
      setExecutionResult({
        compilationSuccess: false,
        overallStatus: "error",
        diagnostics: [{ line: 1, column: 1, severity: "error", message: `Execution failed: ${err.message || err}`, code: "CS9999" }],
        results: [],
        stats: { passedTests: 0, totalTests: visibleCases.length, totalExecutionTimeMs: 0, peakMemoryKb: 0 },
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Run Custom Test Input
  const handleRunCustomTest = async () => {
    if (isRunning) return;
    setIsRunning(true);

    try {
      let parsedCustomInput: any = customInput;
      try {
        parsedCustomInput = JSON.parse(customInput);
      } catch {
        // Keep as string if not JSON
      }

      const customTestCase = [
        {
          id: "custom-case-1",
          inputDisplay: customInput || "Custom Arguments",
          input: parsedCustomInput,
          expected: "Custom Evaluation",
        },
      ];

      const response = await fetch("/api/compile-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeTitle: currentChallenge.title,
          challengeDescription: currentChallenge.description,
          testCases: customTestCase,
          isSubmission: false,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = "Execution request failed";
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error || errJson.message || errMsg;
        } catch {}
        setExecutionResult({
          compilationSuccess: false,
          overallStatus: "error",
          diagnostics: [{ line: 1, column: 1, severity: "error", message: errMsg, code: "CS9999" }],
          results: [],
          stats: { passedTests: 0, totalTests: 1, totalExecutionTimeMs: 0, peakMemoryKb: 0 },
        });
        return;
      }

      const data: ExecutionResult = await response.json();
      setExecutionResult(data);
      setDiagnostics(data.diagnostics || []);
    } catch (err: any) {
      console.error("Failed to run custom input:", err);
      setExecutionResult({
        compilationSuccess: false,
        overallStatus: "error",
        diagnostics: [{ line: 1, column: 1, severity: "error", message: `Execution failed: ${err.message || err}`, code: "CS9999" }],
        results: [],
        stats: { passedTests: 0, totalTests: 1, totalExecutionTimeMs: 0, peakMemoryKb: 0 },
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code (Runs all test cases + triggers AI review + confetti on pass)
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/compile-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeTitle: currentChallenge.title,
          challengeDescription: currentChallenge.description,
          testCases: currentChallenge.testCases,
          isSubmission: true,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = "Execution request failed";
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error || errJson.message || errMsg;
        } catch {}
        setExecutionResult({
          compilationSuccess: false,
          overallStatus: "error",
          diagnostics: [{ line: 1, column: 1, severity: "error", message: errMsg, code: "CS9999" }],
          results: [],
          stats: { passedTests: 0, totalTests: currentChallenge.testCases.length, totalExecutionTimeMs: 0, peakMemoryKb: 0 },
        });
        return;
      }

      const data: ExecutionResult = await response.json();
      setExecutionResult(data);
      setDiagnostics(data.diagnostics || []);

      if (data.overallStatus === "passed") {
        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#10b981", "#38bdf8", "#f59e0b"],
        });

        // Mark as solved
        if (!solvedChallengeIds.includes(currentChallenge.id)) {
          const updated = [...solvedChallengeIds, currentChallenge.id];
          setSolvedChallengeIds(updated);
          localStorage.setItem("codebyte_solved_ids", JSON.stringify(updated));
        }

        // Trigger Senior Review
        handleRequestSeniorReview();
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setExecutionResult({
        compilationSuccess: false,
        overallStatus: "error",
        diagnostics: [{ line: 1, column: 1, severity: "error", message: `Submission failed: ${err.message || err}`, code: "CS9999" }],
        results: [],
        stats: { passedTests: 0, totalTests: currentChallenge.testCases.length, totalExecutionTimeMs: 0, peakMemoryKb: 0 },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Request Senior Review via Gemini
  const handleRequestSeniorReview = async () => {
    if (isReviewing) return;
    setIsReviewing(true);

    try {
      const response = await fetch("/api/senior-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeTitle: currentChallenge.title,
          challengeDescription: currentChallenge.description,
          expectedTime: currentChallenge.expectedTimeComplexity,
          expectedSpace: currentChallenge.expectedSpaceComplexity,
          nzCompany: currentChallenge.nzCompany,
        }),
      });

      const data: SeniorReviewFeedback = await response.json();
      setSeniorFeedback(data);
    } catch (err) {
      console.error("Senior review failed:", err);
    } finally {
      setIsReviewing(false);
    }
  };

  // Request Dynamic AI Hint
  const handleRequestCustomHint = async (level: number) => {
    if (isLoadingHint) return;
    setIsLoadingHint(true);
    setCustomHintText(null);

    try {
      const response = await fetch("/api/hint-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeTitle: currentChallenge.title,
          challengeDescription: currentChallenge.description,
          level,
        }),
      });

      const data = await response.json();
      setCustomHintText(data.hint || "Keep refining your memory allocations.");
    } catch (err) {
      console.error("Hint coach failed:", err);
      setCustomHintText("Consider using a dictionary or hash set to achieve O(N) lookup time.");
    } finally {
      setIsLoadingHint(false);
    }
  };

  // Apply Senior Snippet to Editor
  const handleApplySeniorSnippet = (snippet: string) => {
    if (window.confirm("Replace current editor code with this Senior reference implementation?")) {
      setCode(snippet);
      handleCodeChange(snippet);
    }
  };

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to Run Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          handleSubmitCode();
        } else {
          handleRunCode();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, currentChallenge, isRunning, isSubmitting]);

  const isDark = currentTheme.isDark;

  return (
    <div
      className={`h-screen w-screen ${currentTheme.bgClass} ${
        isDark ? "text-slate-200" : "text-slate-800"
      } font-sans flex flex-col p-3 md:p-4 gap-3 md:gap-4 overflow-hidden select-none relative transition-colors duration-500`}
    >
      {/* Background Decorative Layer 1: Ambient Atmospheric Radial Glows */}
      {bgPattern === "aurora" ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className={`absolute -top-44 -left-44 w-[600px] h-[600px] rounded-full blur-[130px] ${
              isDark ? "opacity-30" : "opacity-40"
            } animate-pulse transition-all duration-700`}
            style={{ backgroundColor: currentTheme.accentColor }}
          />
          <div
            className={`absolute -bottom-44 -right-44 w-[600px] h-[600px] rounded-full blur-[140px] ${
              isDark ? "opacity-25" : "opacity-30"
            } transition-all duration-700`}
            style={{ backgroundColor: currentTheme.accentColor }}
          />
          <div
            className={`absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full blur-[130px] ${
              isDark ? "opacity-15" : "opacity-20"
            }`}
            style={{ backgroundColor: isDark ? "#3b82f6" : "#60a5fa" }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className={`absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full blur-[100px] ${
              isDark ? "opacity-20" : "opacity-25"
            } transition-all duration-700`}
            style={{ backgroundColor: currentTheme.accentColor }}
          />
          <div
            className={`absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full blur-[100px] ${
              isDark ? "opacity-15" : "opacity-20"
            } transition-all duration-700`}
            style={{ backgroundColor: currentTheme.accentColor }}
          />
        </div>
      )}

      {/* Background Decorative Layer 2: Texture Pattern */}
      {bgPattern === "grid" && (
        <div
          className={`absolute inset-0 pointer-events-none z-0 ${isDark ? "opacity-20" : "opacity-40"}`}
          style={{
            backgroundImage: isDark
              ? `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`
              : `linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      )}

      {bgPattern === "dots" && (
        <div
          className={`absolute inset-0 pointer-events-none z-0 ${isDark ? "opacity-25" : "opacity-50"}`}
          style={{
            backgroundImage: isDark
              ? `radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)`
              : `radial-gradient(circle, rgba(15,23,42,0.08) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      )}

      {/* Bento Grid Header */}
      <div className="relative z-10">
        <Header
          currentChallenge={currentChallenge}
          challenges={challenges}
          currentTheme={currentTheme}
          isDark={isDark}
          onToggleMode={handleToggleLightDark}
          onOpenBgModal={() => setIsBgModalOpen(true)}
          onCycleTheme={handleCycleTheme}
          onSelectChallenge={handleSelectChallenge}
          onOpenCatalog={() => setIsCatalogOpen(true)}
          onResetCode={handleResetCode}
          onRunCode={handleRunCode}
          onSubmitCode={handleSubmitCode}
          onRequestSeniorReview={handleRequestSeniorReview}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
          isReviewing={isReviewing}
          solvedCount={solvedChallengeIds.length}
        />
      </div>

      {/* Main 4-Quadrant Bento Grid */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 md:gap-4 min-h-0 overflow-hidden">
        {/* Quadrant 1: Problem Description (col-span-4 row-span-4) */}
        <section className="lg:col-span-4 lg:row-span-4 flex flex-col min-h-0 overflow-hidden">
          <ProblemDescription
            challenge={currentChallenge}
            onRequestCustomHint={handleRequestCustomHint}
            isLoadingHint={isLoadingHint}
            customHintText={customHintText}
            isDark={isDark}
          />
        </section>

        {/* Quadrant 2: Code Editor (col-span-8 row-span-4) */}
        <section className="lg:col-span-8 lg:row-span-4 flex flex-col min-h-0 overflow-hidden">
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            diagnostics={diagnostics}
            onRunCode={handleRunCode}
            onResetCode={handleResetCode}
            isDark={isDark}
          />
        </section>

        {/* Quadrant 3: Senior Skill Radar (col-span-4 row-span-2) */}
        <section className="lg:col-span-4 lg:row-span-2 flex flex-col min-h-0 overflow-hidden">
          <SeniorSkillRadar
            seniorFeedback={seniorFeedback}
            executionResult={executionResult}
            currentChallenge={currentChallenge}
            onOpenGuide={() => setIsGuideOpen(true)}
            onRequestHint={() => handleRequestCustomHint(1)}
            isDark={isDark}
          />
        </section>

        {/* Quadrant 4: Terminal / Output Console (col-span-8 row-span-2) */}
        <section className="lg:col-span-8 lg:row-span-2 flex flex-col min-h-0 overflow-hidden">
          <ExecutionConsole
            testCases={currentChallenge.testCases}
            customInput={customInput}
            onCustomInputChange={setCustomInput}
            executionResult={executionResult}
            seniorFeedback={seniorFeedback}
            isRunning={isRunning}
            isReviewing={isReviewing}
            onRunCustomTest={handleRunCustomTest}
            onRequestSeniorReview={handleRequestSeniorReview}
            onApplySeniorSnippet={handleApplySeniorSnippet}
            onRunCode={handleRunCode}
            onSubmitCode={handleSubmitCode}
            isDark={isDark}
          />
        </section>
      </main>

      {/* Challenge Catalog Modal */}
      <ChallengeModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        challenges={challenges}
        currentChallengeId={currentChallenge.id}
        onSelectChallenge={handleSelectChallenge}
        solvedChallengeIds={solvedChallengeIds}
        isDark={isDark}
      />

      {/* NZ Senior Interview Handbook Modal */}
      <NZInterviewGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        isDark={isDark}
      />

      {/* Background & Theme Selector Modal */}
      <BackgroundSelectorModal
        isOpen={isBgModalOpen}
        onClose={() => setIsBgModalOpen(false)}
        currentThemeId={bgThemeId}
        currentPattern={bgPattern}
        onSelectTheme={handleSelectTheme}
        onSelectPattern={handleSelectPattern}
        onRandomizeTheme={handleRandomizeTheme}
        onResetDefault={handleResetDefaultBg}
        isDark={isDark}
      />
    </div>
  );
}
