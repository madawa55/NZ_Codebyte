import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CHALLENGES } from "./data/challenges";
import { Challenge, ExecutionResponse, SeniorFeedback, CompilationDiagnostic } from "./types";
import { Header } from "./components/Header";
import { ProblemDescription } from "./components/ProblemDescription";
import { CodeEditor } from "./components/CodeEditor";
import { ExecutionConsole } from "./components/ExecutionConsole";
import { SeniorSkillRadar } from "./components/SeniorSkillRadar";
import { ChallengeModal } from "./components/ChallengeModal";
import { NZInterviewGuideModal } from "./components/NZInterviewGuideModal";

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
  const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null);
  const [seniorFeedback, setSeniorFeedback] = useState<SeniorFeedback | null>(null);
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

    try {
      const visibleCases = currentChallenge.testCases.filter((tc) => !tc.isHidden);

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

      const data: ExecutionResponse = await response.json();
      setExecutionResult(data);
      setDiagnostics(data.diagnostics || []);
    } catch (err) {
      console.error("Failed to run code:", err);
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

      const data: ExecutionResponse = await response.json();
      setExecutionResult(data);
      setDiagnostics(data.diagnostics || []);
    } catch (err) {
      console.error("Custom test failed:", err);
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Solution (Full test suite with hidden test cases + confetti)
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

      const data: ExecutionResponse = await response.json();
      setExecutionResult(data);
      setDiagnostics(data.diagnostics || []);

      if (data.overallStatus === "passed") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        if (!solvedChallengeIds.includes(currentChallenge.id)) {
          const updated = [...solvedChallengeIds, currentChallenge.id];
          setSolvedChallengeIds(updated);
          localStorage.setItem("codebyte_solved_ids", JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.error("Failed to submit code:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Request NZ Senior AI Review
  const handleRequestSeniorReview = async () => {
    if (isReviewing) return;
    setIsReviewing(true);

    try {
      const response = await fetch("/api/senior-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challenge: currentChallenge,
          testResults: executionResult,
        }),
      });

      const data: SeniorFeedback = await response.json();
      setSeniorFeedback(data);
    } catch (err) {
      console.error("Failed to get senior review:", err);
    } finally {
      setIsReviewing(false);
    }
  };

  // Request dynamic AI hint
  const handleRequestCustomHint = async (level: number) => {
    setIsLoadingHint(true);
    try {
      const response = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge: currentChallenge,
          userCode: code,
          hintLevel: level,
        }),
      });

      const data = await response.json();
      setCustomHintText(data.hint || "Try breaking the problem into sub-problems.");
    } catch (err) {
      console.error("Hint failed:", err);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleApplySeniorSnippet = (snippet: string) => {
    if (window.confirm("Apply the Senior C# snippet to your editor?")) {
      setCode(snippet);
      localStorage.setItem(`codebyte_draft_${currentChallenge.id}`, snippet);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#020617] text-slate-200 font-sans flex flex-col p-3 md:p-4 gap-3 md:gap-4 overflow-hidden select-none">
      {/* Bento Grid Header */}
      <Header
        currentChallenge={currentChallenge}
        challenges={challenges}
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

      {/* Main 4-Quadrant Bento Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 md:gap-4 min-h-0 overflow-hidden">
        {/* Quadrant 1: Problem Description (col-span-4 row-span-4) */}
        <section className="lg:col-span-4 lg:row-span-4 flex flex-col min-h-0 overflow-hidden">
          <ProblemDescription
            challenge={currentChallenge}
            onRequestCustomHint={handleRequestCustomHint}
            isLoadingHint={isLoadingHint}
            customHintText={customHintText}
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
      />

      {/* NZ Senior Interview Handbook Modal */}
      <NZInterviewGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
