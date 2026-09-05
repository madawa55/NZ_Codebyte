export type Difficulty = "Easy" | "Medium" | "Hard" | "Senior Specialist";

export type ChallengeCategory = 
  | "Arrays & Hashing" 
  | "Two Pointers & Sliding Window" 
  | "Span<T> & Zero-Allocation" 
  | "Graphs & Topological Sort" 
  | "Concurrency & Rate Limiting" 
  | "Heaps & PriorityQueues" 
  | "Dynamic Programming"
  | "Tree & Trie Structures";

export interface TestCase {
  id: string;
  inputDisplay: string;
  input: any;
  expected: any;
  isHidden?: boolean;
  explanation?: string;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: ChallengeCategory;
  nzCompany: string; // e.g. "Xero", "Pushpay", "Trade Me", "Datacom", "Serko"
  timeLimitMs: number;
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  shortDescription: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  nzInterviewContext: string;
  seniorEngineeringTips: string[];
  starterCode: string;
  referenceSolution: string;
  solutionExplanation: string;
  testCases: TestCase[];
  hints: {
    level1: string;
    level2: string;
    level3: string;
  };
}

export interface CompilationDiagnostic {
  line: number;
  column: number;
  code: string;
  message: string;
  severity: "error" | "warning" | "info";
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  stdout?: string;
  executionTimeMs: number;
  memoryKb: number;
  error?: string;
}

export interface ExecutionResponse {
  compilationSuccess: boolean;
  diagnostics: CompilationDiagnostic[];
  results: TestCaseResult[];
  overallStatus: "passed" | "failed" | "compilation_error" | "runtime_error" | "time_limit_exceeded";
  stats: {
    totalTests: number;
    passedTests: number;
    totalExecutionTimeMs: number;
    peakMemoryKb: number;
  };
}

export interface SeniorFeedback {
  nzInterviewVerdict: string;
  grade: "Strong Hire" | "Hire" | "Borderline / Needs Polish" | "Junior / Not Senior Level";
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  complexityExplanation: string;
  memoryAndGcAnalysis: string;
  modernCsharpIdioms: string[];
  edgeCaseHandling: string;
  nzInterviewFollowUpQuestions: string[];
  optimizedSeniorSnippet: string;
}

export interface UserProgress {
  solvedChallengeIds: string[];
  bookmarkedChallengeIds: string[];
  codeDrafts: Record<string, string>; // challengeId -> code
  lastExecutionResults: Record<string, ExecutionResponse>;
  bestTimes: Record<string, number>;
}
