import { Challenge } from "../types";

export const CHALLENGES: Challenge[] = [
  {
    id: "nz-ledger-reconciliation",
    title: "NZ Invoicing Ledger Reconciliation",
    slug: "nz-ledger-reconciliation",
    difficulty: "Medium",
    category: "Two Pointers & Sliding Window",
    nzCompany: "Xero",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N log N) or O(N + M)",
    expectedSpaceComplexity: "O(1) auxiliary",
    shortDescription: "Match bank transactions against invoice entries within a currency tolerance threshold with zero duplicate pairings.",
    description: `In enterprise accounting platforms like Xero, automated bank reconciliation matches incoming bank feed transactions with outstanding accounts receivable invoices.

You are given two sorted arrays of decimal amounts:
1. \`bankFeeds\`: An array of debits/credits recorded by the bank (sorted in ascending order).
2. \`invoices\`: An array of outstanding invoice amounts (sorted in ascending order).
3. \`tolerance\`: Maximum allowed variance due to foreign currency exchange fees or rounding (e.g., \`0.05m\`).

### Task
Write a method \`Reconcile(decimal[] bankFeeds, decimal[] invoices, decimal tolerance)\` that returns the maximum number of unique pairs \`(bankFeed, invoice)\` such that:
- \`Math.Abs(bankFeed - invoice) <= tolerance\`
- Each bank feed and invoice can be matched at most once.

### NZ Senior Software Engineer Context
At Xero and fintech firms across Auckland and Wellington, reconciliation engines process millions of rows daily. Senior interviewers look for:
- Avoidance of \`O(N * M)\` nested loops.
- Use of the **Two-Pointer Technique** on sorted collections.
- Correct handling of \`decimal\` types (never floating-point \`double\` or \`float\` for financial amounts to avoid IEEE 754 precision drift).
- Minimal memory allocations.`,
    constraints: [
      "1 <= bankFeeds.Length, invoices.Length <= 100,000",
      "0.01m <= bankFeeds[i], invoices[j] <= 1,000,000.00m",
      "0.00m <= tolerance <= 10.00m",
      "Both input arrays are already sorted in ascending order."
    ],
    examples: [
      {
        input: "bankFeeds = [10.00, 25.50, 100.00], invoices = [10.02, 25.48, 105.00], tolerance = 0.05",
        output: "2",
        explanation: "10.00 matches 10.02 (diff 0.02 <= 0.05) and 25.50 matches 25.48 (diff 0.02 <= 0.05). 100.00 and 105.00 diff is 5.00 > 0.05."
      },
      {
        input: "bankFeeds = [50.00, 50.00, 50.00], invoices = [50.01, 50.02], tolerance = 0.05",
        output: "2",
        explanation: "Two bank feeds pair with the two invoices; one bank feed remains unmatched."
      }
    ],
    nzInterviewContext: "Frequently asked at Xero (Wellington/Auckland) as a technical screen to verify financial data handling, algorithmic efficiency, and avoidance of quadratic complexity on high-volume feeds.",
    seniorEngineeringTips: [
      "Use decimal arithmetic instead of float/double to avoid precision issues with currency.",
      "Since arrays are pre-sorted, a two-pointer O(N + M) scan uses O(1) auxiliary space.",
      "Consider how early exits can optimize worst-case branching."
    ],
    starterCode: `using System;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        /// <summary>
        /// Calculates the maximum number of reconciled bank transactions.
        /// </summary>
        /// <param name="bankFeeds">Sorted bank transaction amounts</param>
        /// <param name="invoices">Sorted invoice amounts</param>
        /// <param name="tolerance">Maximum acceptable difference</param>
        /// <returns>Number of matched pairs</returns>
        public static int Reconcile(decimal[] bankFeeds, decimal[] invoices, decimal tolerance)
        {
            // TODO: Implement senior-level O(N + M) two-pointer matching
            int matched = 0;
            
            return matched;
        }
    }
}`,
    referenceSolution: `using System;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        public static int Reconcile(decimal[] bankFeeds, decimal[] invoices, decimal tolerance)
        {
            if (bankFeeds == null || invoices == null || bankFeeds.Length == 0 || invoices.Length == 0)
            {
                return 0;
            }

            int i = 0;
            int j = 0;
            int matchCount = 0;

            while (i < bankFeeds.Length && j < invoices.Length)
            {
                decimal diff = bankFeeds[i] - invoices[j];

                if (Math.Abs(diff) <= tolerance)
                {
                    matchCount++;
                    i++;
                    j++;
                }
                else if (bankFeeds[i] < invoices[j])
                {
                    // Bank feed is too small to match current or subsequent invoices
                    i++;
                }
                else
                {
                    // Invoice is too small to match current or subsequent bank feeds
                    j++;
                }
            }

            return matchCount;
        }
    }
}`,
    solutionExplanation: "The optimal solution maintains two pointers across the two pre-sorted lists. For each step, if the absolute difference is within tolerance, both pointers advance and the match counter increments. If bankFeeds[i] is smaller, increment i; otherwise increment j. This guarantees an O(N + M) runtime and O(1) memory.",
    testCases: [
      {
        id: "nz-rec-1",
        inputDisplay: "bankFeeds = [10.00m, 25.50m, 100.00m], invoices = [10.02m, 25.48m, 105.00m], tolerance = 0.05m",
        input: { bankFeeds: [10.00, 25.50, 100.00], invoices: [10.02, 25.48, 105.00], tolerance: 0.05 },
        expected: "2",
        explanation: "Matches 10.00 with 10.02 and 25.50 with 25.48"
      },
      {
        id: "nz-rec-2",
        inputDisplay: "bankFeeds = [50.00m, 50.00m, 50.00m], invoices = [50.01m, 50.02m], tolerance = 0.05m",
        input: { bankFeeds: [50.00, 50.00, 50.00], invoices: [50.01, 50.02], tolerance: 0.05 },
        expected: "2",
        explanation: "Greedy 1-to-1 pairing"
      },
      {
        id: "nz-rec-3",
        inputDisplay: "bankFeeds = [1.00m, 2.00m, 3.00m], invoices = [10.00m, 20.00m], tolerance = 0.10m",
        input: { bankFeeds: [1.00, 2.00, 3.00], invoices: [10.00, 20.00], tolerance: 0.10 },
        expected: "0",
        explanation: "No overlap within tolerance"
      },
      {
        id: "nz-rec-4-hidden",
        inputDisplay: "Edge Case: Single element matching exact boundary",
        input: { bankFeeds: [100.00], invoices: [100.05], tolerance: 0.05 },
        expected: "1",
        isHidden: true,
        explanation: "Exact boundary check Math.Abs(100.00 - 100.05) == 0.05 <= tolerance"
      },
      {
        id: "nz-rec-5-hidden",
        inputDisplay: "Large Scale: 50,000 items with staggered offsets",
        input: { bankFeeds: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], invoices: [10.01, 19.99, 35, 40.02, 50, 75, 80.05, 90, 99.98, 110], tolerance: 0.05 },
        expected: "7",
        isHidden: true,
        explanation: "Stress tests two-pointer linear speed"
      }
    ],
    hints: {
      level1: "Because both arrays are already sorted in ascending order, think about how two index pointers can move forward together without backtracking.",
      level2: "Compare bankFeeds[i] and invoices[j]. If the difference is <= tolerance, match them and advance both. What should you do if bankFeeds[i] is strictly less than invoices[j] - tolerance?",
      level3: "If bankFeeds[i] < invoices[j] - tolerance, bankFeeds[i] can never match any future invoices (which are even larger). So you simply increment i++. Conversely, if invoices[j] is too small, j++."
    }
  },
  {
    id: "zero-alloc-log-parser",
    title: "Zero-Allocation Log Tokenizer (Span<char>)",
    slug: "zero-alloc-log-parser",
    difficulty: "Hard",
    category: "Span<T> & Zero-Allocation",
    nzCompany: "Pushpay",
    timeLimitMs: 2500,
    expectedTimeComplexity: "O(N) single-pass",
    expectedSpaceComplexity: "O(1) heap allocation (zero string allocation)",
    shortDescription: "Extract payment transaction IDs and status codes from raw HTTP syslog entries without GC heap allocations.",
    description: `High-throughput payment platforms like Pushpay handle tens of thousands of requests per second. Allocating strings with \`string.Split()\` or \`Substring()\` causes severe Gen 0 Garbage Collection churn and latency spikes.

You are given a raw log line string in the following format:
\`TIMESTAMP | LEVEL | TXN_ID:<id> | STATUS:<statusCode> | MSG:<message>\`

Example:
\`2026-09-05T10:15:30Z | INFO | TXN_ID:NZP-88492 | STATUS:200 | MSG:Payment settled\`

### Task
Implement \`ExtractPaymentInfo(string rawLog)\` to return a struct \`PaymentLogResult\`:
\`\`\`csharp
public readonly record struct PaymentLogResult(string TransactionId, int StatusCode, bool IsSuccess);
\`\`\`
Where:
- \`TransactionId\` is extracted from \`TXN_ID:<value>\`
- \`StatusCode\` is parsed as integer from \`STATUS:<value>\`
- \`IsSuccess\` is \`true\` if \`StatusCode >= 200 && StatusCode < 300\`

### Senior NZ Interview Focus (.NET 8/9 & Span<char>)
In NZ senior engineering panels, candidates are asked:
- "How do you parse strings without triggering GC allocations?"
- Demonstrating \`rawLog.AsSpan()\` and \`MemoryExtensions.IndexOf()\` or slicing instead of \`Split('|')\`.
- Using \`int.Parse(ReadOnlySpan<char>)\` to convert ASCII numbers without creating an intermediate string.`,
    constraints: [
      "10 <= rawLog.Length <= 10,000",
      "Format is guaranteed to contain TXN_ID: and STATUS:",
      "StatusCode is a valid 3-digit HTTP status code (100 to 599)."
    ],
    examples: [
      {
        input: "rawLog = '2026-09-05T10:15:30Z | INFO | TXN_ID:NZP-88492 | STATUS:200 | MSG:Payment settled'",
        output: "{ TransactionId: 'NZP-88492', StatusCode: 200, IsSuccess: true }",
        explanation: "Extracts NZP-88492 and 200 (which is 2xx, so IsSuccess = true)."
      },
      {
        input: "rawLog = '2026-09-05T11:00:00Z | ERROR | TXN_ID:AKL-9912 | STATUS:503 | MSG:Gateway Timeout'",
        output: "{ TransactionId: 'AKL-9912', StatusCode: 503, IsSuccess: false }",
        explanation: "Status 503 is not 2xx, so IsSuccess = false."
      }
    ],
    nzInterviewContext: "Pushpay (Auckland) processes billions in donations and transactions with strict P99 latency SLA. Knowing when to use Span<char> over LINQ / regex separates Senior and Staff engineers.",
    seniorEngineeringTips: [
      "Avoid string.Split('|') as it allocates an array of string objects on the heap.",
      "Use ReadOnlySpan<char> slicing: rawLog.AsSpan()",
      "Use int.Parse(span) or int.TryParse(span, out int code) which allocates 0 bytes."
    ],
    starterCode: `using System;

namespace CodeByte.Challenges
{
    public readonly record struct PaymentLogResult(string TransactionId, int StatusCode, bool IsSuccess);

    public static class Solution
    {
        /// <summary>
        /// Parses log metadata using memory-efficient span techniques.
        /// </summary>
        public static PaymentLogResult ExtractPaymentInfo(string rawLog)
        {
            // TODO: Extract TransactionId and StatusCode using ReadOnlySpan<char>
            ReadOnlySpan<char> span = rawLog.AsSpan();
            
            string txnId = "";
            int statusCode = 0;
            bool isSuccess = false;

            return new PaymentLogResult(txnId, statusCode, isSuccess);
        }
    }
}`,
    referenceSolution: `using System;

namespace CodeByte.Challenges
{
    public readonly record struct PaymentLogResult(string TransactionId, int StatusCode, bool IsSuccess);

    public static class Solution
    {
        public static PaymentLogResult ExtractPaymentInfo(string rawLog)
        {
            if (string.IsNullOrEmpty(rawLog))
            {
                return new PaymentLogResult(string.Empty, 0, false);
            }

            ReadOnlySpan<char> span = rawLog.AsSpan();

            // Find TXN_ID:
            ReadOnlySpan<char> txnKey = "TXN_ID:".AsSpan();
            int txnIndex = span.IndexOf(txnKey);
            string txnId = string.Empty;

            if (txnIndex != -1)
            {
                ReadOnlySpan<char> afterTxn = span.Slice(txnIndex + txnKey.Length);
                int endTxn = afterTxn.IndexOf('|');
                ReadOnlySpan<char> txnSpan = endTxn != -1 ? afterTxn.Slice(0, endTxn).Trim() : afterTxn.Trim();
                txnId = txnSpan.ToString();
            }

            // Find STATUS:
            ReadOnlySpan<char> statusKey = "STATUS:".AsSpan();
            int statusIndex = span.IndexOf(statusKey);
            int statusCode = 0;

            if (statusIndex != -1)
            {
                ReadOnlySpan<char> afterStatus = span.Slice(statusIndex + statusKey.Length);
                int endStatus = afterStatus.IndexOf('|');
                ReadOnlySpan<char> statusSpan = endStatus != -1 ? afterStatus.Slice(0, endStatus).Trim() : afterStatus.Trim();
                int.TryParse(statusSpan, out statusCode);
            }

            bool isSuccess = statusCode >= 200 && statusCode < 300;
            return new PaymentLogResult(txnId, statusCode, isSuccess);
        }
    }
}`,
    solutionExplanation: "By taking a ReadOnlySpan<char> slice of the incoming string, we locate the marker indices using span.IndexOf() without any intermediate string allocations or regex compilation overhead. int.TryParse directly parses a span slice.",
    testCases: [
      {
        id: "span-log-1",
        inputDisplay: "'2026-09-05T10:15:30Z | INFO | TXN_ID:NZP-88492 | STATUS:200 | MSG:Payment settled'",
        input: "2026-09-05T10:15:30Z | INFO | TXN_ID:NZP-88492 | STATUS:200 | MSG:Payment settled",
        expected: "PaymentLogResult { TransactionId = NZP-88492, StatusCode = 200, IsSuccess = True }",
        explanation: "Standard 200 OK payment"
      },
      {
        id: "span-log-2",
        inputDisplay: "'2026-09-05T11:00:00Z | ERROR | TXN_ID:AKL-9912 | STATUS:503 | MSG:Gateway Timeout'",
        input: "2026-09-05T11:00:00Z | ERROR | TXN_ID:AKL-9912 | STATUS:503 | MSG:Gateway Timeout",
        expected: "PaymentLogResult { TransactionId = AKL-9912, StatusCode = 503, IsSuccess = False }",
        explanation: "503 Service Unavailable"
      },
      {
        id: "span-log-3",
        inputDisplay: "'DEBUG | TXN_ID:WLG-001 | STATUS:204'",
        input: "DEBUG | TXN_ID:WLG-001 | STATUS:204",
        expected: "PaymentLogResult { TransactionId = WLG-001, StatusCode = 204, IsSuccess = True }",
        explanation: "204 No Content (isSuccess = true, ending without pipe)"
      },
      {
        id: "span-log-4-hidden",
        inputDisplay: "Edge Case: 400 Bad Request with surrounding spaces",
        input: "LOG | TXN_ID:  CHCH-7711  | STATUS: 400 | MSG: Invalid Card",
        expected: "PaymentLogResult { TransactionId = CHCH-7711, StatusCode = 400, IsSuccess = False }",
        isHidden: true,
        explanation: "Validates span.Trim() handling"
      }
    ],
    hints: {
      level1: "Avoid using rawLog.Split('|'). Look at the string as a ReadOnlySpan<char> to slice views over the characters.",
      level2: "Use span.IndexOf(\"TXN_ID:\".AsSpan()) and span.IndexOf(\"STATUS:\".AsSpan()) to locate markers, then find the next '|' delimiter.",
      level3: "Once you have the span slice representing the digits of status code, call int.TryParse(statusSlice, out int code). Notice this parses numbers without creating a string!"
    }
  },
  {
    id: "sliding-window-rate-limiter",
    title: "High-Throughput Sliding Window Rate Limiter",
    slug: "sliding-window-rate-limiter",
    difficulty: "Medium",
    category: "Concurrency & Rate Limiting",
    nzCompany: "Trade Me",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(1) amortized per request",
    expectedSpaceComplexity: "O(K) where K is max requests per window",
    shortDescription: "Evaluate whether requests from a client should be allowed or throttled based on a sliding timestamp window.",
    description: `At Trade Me (NZ's largest online marketplace), the public APIs receive millions of listing and bidding requests. To protect downstream microservices, the edge gateway implements a sliding window rate limiter.

Given:
- \`maxRequests\`: Maximum allowed requests within the time window.
- \`windowSeconds\`: Window duration in seconds.
- \`requestTimestamps\`: An array of Unix timestamps in seconds when requests arrived from a single API consumer (sorted in ascending order).

### Task
Implement \`EvaluateRequests(int maxRequests, int windowSeconds, int[] requestTimestamps)\` returning a \`bool[]\` of length equal to \`requestTimestamps.Length\`, where the \`i\`-th element is \`true\` if the request was allowed, or \`false\` if it was throttled (rejected).

A request at timestamp \`T\` is allowed if and only if:
- The number of previously allowed requests in the interval \`(T - windowSeconds, T]\` is strictly less than \`maxRequests\`.
- Rejected requests do NOT consume capacity.

### Senior NZ Engineering Question
In a system design interview at Trade Me or Datacom:
- "Why use Sliding Window over Fixed Window Counter?"
- "How do you avoid unbounded memory leaks as timestamps grow into billions?"
- Using a Queue or circular buffer to keep only the timestamps within the current window.`,
    constraints: [
      "1 <= maxRequests <= 50,000",
      "1 <= windowSeconds <= 3,600",
      "1 <= requestTimestamps.Length <= 100,000",
      "requestTimestamps is sorted in non-decreasing order."
    ],
    examples: [
      {
        input: "maxRequests = 3, windowSeconds = 10, timestamps = [1, 2, 3, 4, 11, 12]",
        output: "[true, true, true, false, true, true]",
        explanation: "Req at t=1,2,3 allowed (3 requests in window). Req at t=4 throttled. At t=11, window (1, 11] drops t=1, allowing t=11."
      }
    ],
    nzInterviewContext: "Standard Senior Backend problem asked at Trade Me (Wellington) and cloud infrastructure teams to check algorithmic design of API middleware and queue efficiency.",
    seniorEngineeringTips: [
      "Use a System.Collections.Generic.Queue<int> to store timestamps of allowed requests.",
      "Before checking count, dequeue all timestamps <= (current - windowSeconds).",
      "Since only allowed requests consume quota, only enqueue when allowed."
    ],
    starterCode: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        /// <summary>
        /// Determines which requests are allowed under a sliding window limit.
        /// </summary>
        public static bool[] EvaluateRequests(int maxRequests, int windowSeconds, int[] requestTimestamps)
        {
            // TODO: Implement O(N) sliding window rate limiter
            bool[] result = new bool[requestTimestamps.Length];
            
            return result;
        }
    }
}`,
    referenceSolution: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        public static bool[] EvaluateRequests(int maxRequests, int windowSeconds, int[] requestTimestamps)
        {
            if (requestTimestamps == null || requestTimestamps.Length == 0)
            {
                return Array.Empty<bool>();
            }

            bool[] decisions = new bool[requestTimestamps.Length];
            Queue<int> allowedQueue = new Queue<int>(Math.Min(maxRequests, 1000));

            for (int i = 0; i < requestTimestamps.Length; i++)
            {
                int currentTimestamp = requestTimestamps[i];
                int cutoff = currentTimestamp - windowSeconds;

                // Evict expired timestamps outside the sliding window (timestamp <= cutoff)
                while (allowedQueue.Count > 0 && allowedQueue.Peek() <= cutoff)
                {
                    allowedQueue.Dequeue();
                }

                if (allowedQueue.Count < maxRequests)
                {
                    decisions[i] = true;
                    allowedQueue.Enqueue(currentTimestamp);
                }
                else
                {
                    decisions[i] = false;
                }
            }

            return decisions;
        }
    }
}`,
    solutionExplanation: "Using a Queue<int>, each timestamp is pushed and popped at most once, giving an amortized O(1) decision per request and total O(N) runtime. Space is bounded strictly by O(maxRequests).",
    testCases: [
      {
        id: "rl-1",
        inputDisplay: "maxRequests = 3, windowSeconds = 10, timestamps = [1, 2, 3, 4, 11, 12]",
        input: { maxRequests: 3, windowSeconds: 10, requestTimestamps: [1, 2, 3, 4, 11, 12] },
        expected: "[True, True, True, False, True, True]",
        explanation: "t=4 is blocked; t=11 is allowed because t=1 expired"
      },
      {
        id: "rl-2",
        inputDisplay: "maxRequests = 2, windowSeconds = 5, timestamps = [1, 1, 1, 2, 6, 7]",
        input: { maxRequests: 2, windowSeconds: 5, requestTimestamps: [1, 1, 1, 2, 6, 7] },
        expected: "[True, True, False, False, True, True]",
        explanation: "Multiple requests with the identical timestamp"
      },
      {
        id: "rl-3-hidden",
        inputDisplay: "Large burst: 100 requests arriving within 1 second with limit 5",
        input: { maxRequests: 5, windowSeconds: 60, requestTimestamps: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        expected: "[True, True, True, True, True, False, False, False, False, False]",
        isHidden: true,
        explanation: "First 5 allowed, remaining 5 blocked"
      }
    ],
    hints: {
      level1: "Keep track of the timestamps of currently active allowed requests.",
      level2: "Use a Queue<int>. For each new request, dequeue timestamps that are older than (currentTime - windowSeconds).",
      level3: "If queue.Count < maxRequests, approve the request and enqueue currentTime. If not, reject and do NOT enqueue."
    }
  },
  {
    id: "dependency-dag-build-order",
    title: "Microservice DAG Dependency Order (Kahn's Algorithm)",
    slug: "dependency-dag-build-order",
    difficulty: "Medium",
    category: "Graphs & Topological Sort",
    nzCompany: "Datacom",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V + E)",
    shortDescription: "Determine a valid deployment sequence for microservices or detect circular dependency deadlocks.",
    description: `Datacom manages massive government and enterprise cloud infrastructures across New Zealand and Australia. During automated CI/CD pipeline deployments, services have strict inter-dependencies (e.g. Identity Service must deploy before Payment Service).

You are given:
- \`numServices\`: Total number of services, labeled \`0\` through \`numServices - 1\`.
- \`dependencies\`: An array of pairs \`[A, B]\`, meaning service \`A\` depends on service \`B\` (service \`B\` must be deployed before service \`A\`).

### Task
Implement \`GetDeploymentOrder(int numServices, int[][] dependencies)\` that returns:
- An \`int[]\` containing a valid deployment sequence such that every prerequisite service appears before any dependent service.
- If there is a circular dependency (deadlock), return an empty array \`Array.Empty<int>()\`.
- If multiple valid orders exist, any valid topological order is accepted.

### Senior NZ Interview Focus
- Graph representation: Adjacency list with \`List<int>[]\` or \`Dictionary<int, List<int>>\`.
- Kahn's Algorithm using in-degree arrays vs Depth-First Search with 3-state graph coloring (Unvisited, Visiting, Visited).
- Scalability to 50,000 nodes without recursion stack overflow.`,
    constraints: [
      "1 <= numServices <= 20,000",
      "0 <= dependencies.Length <= 50,000",
      "dependencies[i].Length == 2",
      "0 <= A, B < numServices and A != B"
    ],
    examples: [
      {
        input: "numServices = 4, dependencies = [[1, 0], [2, 0], [3, 1], [3, 2]]",
        output: "[0, 1, 2, 3] (or [0, 2, 1, 3])",
        explanation: "Service 0 has no dependencies. 1 and 2 depend on 0. 3 depends on both 1 and 2."
      },
      {
        input: "numServices = 2, dependencies = [[0, 1], [1, 0]]",
        output: "[]",
        explanation: "Circular dependency between 0 and 1."
      }
    ],
    nzInterviewContext: "Very common architectural interview question at Datacom and cloud consultancy firms in Wellington to test graph theory and distributed systems understanding.",
    seniorEngineeringTips: [
      "Use Kahn's algorithm (BFS with in-degree array). It naturally avoids recursion depth limits.",
      "Track inDegrees for each node. Push all nodes with inDegree == 0 into a Queue.",
      "If the resolved order length != numServices, a cycle exists."
    ],
    starterCode: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        /// <summary>
        /// Resolves deployment order using topological sorting.
        /// </summary>
        public static int[] GetDeploymentOrder(int numServices, int[][] dependencies)
        {
            // TODO: Return topological sort or empty array if cycle detected
            return Array.Empty<int>();
        }
    }
}`,
    referenceSolution: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        public static int[] GetDeploymentOrder(int numServices, int[][] dependencies)
        {
            if (numServices <= 0) return Array.Empty<int>();

            List<int>[] graph = new List<int>[numServices];
            for (int i = 0; i < numServices; i++)
            {
                graph[i] = new List<int>();
            }

            int[] inDegree = new int[numServices];

            // Build graph: [A, B] means B -> A (B must be deployed before A)
            foreach (var dep in dependencies)
            {
                int dependent = dep[0];
                int prerequisite = dep[1];
                graph[prerequisite].Add(dependent);
                inDegree[dependent]++;
            }

            Queue<int> queue = new Queue<int>();
            for (int i = 0; i < numServices; i++)
            {
                if (inDegree[i] == 0)
                {
                    queue.Enqueue(i);
                }
            }

            int[] order = new int[numServices];
            int index = 0;

            while (queue.Count > 0)
            {
                int current = queue.Dequeue();
                order[index++] = current;

                foreach (int neighbor in graph[current])
                {
                    inDegree[neighbor]--;
                    if (inDegree[neighbor] == 0)
                    {
                        queue.Enqueue(neighbor);
                    }
                }
            }

            return index == numServices ? order : Array.Empty<int>();
        }
    }
}`,
    solutionExplanation: "Kahn's Algorithm (BFS) calculates the in-degree of all vertices. Vertices with in-degree 0 can be executed immediately. As each vertex is deployed, we decrement the in-degree of downstream services. If all vertices are deployed, the graph is acyclic.",
    testCases: [
      {
        id: "dag-1",
        inputDisplay: "numServices = 4, dependencies = [[1, 0], [2, 0], [3, 1], [3, 2]]",
        input: { numServices: 4, dependencies: [[1, 0], [2, 0], [3, 1], [3, 2]] },
        expected: "[0, 1, 2, 3]",
        explanation: "Service 0 first, followed by 1, 2 then 3"
      },
      {
        id: "dag-2",
        inputDisplay: "numServices = 2, dependencies = [[0, 1], [1, 0]]",
        input: { numServices: 2, dependencies: [[0, 1], [1, 0]] },
        expected: "[]",
        explanation: "Cycle detected"
      },
      {
        id: "dag-3-hidden",
        inputDisplay: "numServices = 1 (Single isolated service)",
        input: { numServices: 1, dependencies: [] },
        expected: "[0]",
        isHidden: true,
        explanation: "Single node without dependencies"
      }
    ],
    hints: {
      level1: "Model this as a Directed Acyclic Graph (DAG) where an edge goes from prerequisite to dependent service.",
      level2: "Track the in-degree (number of incoming prerequisites) for each service.",
      level3: "Initialize a queue with all services having in-degree 0. As you process a service, decrement the in-degree of its dependents."
    }
  },
  {
    id: "lru-cache-optimal",
    title: "High-Performance LRU Cache with O(1) Ops",
    slug: "lru-cache-optimal",
    difficulty: "Hard",
    category: "Arrays & Hashing",
    nzCompany: "Serko",
    timeLimitMs: 2500,
    expectedTimeComplexity: "O(1) strictly for both Get and Put",
    expectedSpaceComplexity: "O(Capacity)",
    shortDescription: "Design a Least Recently Used (LRU) Cache data structure with strictly O(1) Get and Put operations.",
    description: `Serko (Auckland-based corporate travel management) caches hotel and airline availability queries in high-performance memory tiers. When cache capacity is reached, the Least Recently Used item must be evicted immediately.

### Task
Implement an \`LruCache\` class:
- \`LruCache(int capacity)\`: Initializes the cache with positive capacity.
- \`int Get(int key)\`: Returns the value of the key if it exists, otherwise \`-1\`. Accessing an existing key marks it as most recently used.
- \`void Put(int key, int value)\`: Updates the value of the key if present, or inserts the key-value pair. If inserting exceeds capacity, evict the least recently used key.

Both \`Get\` and \`Put\` MUST run in strictly **O(1) average time complexity**.

### Senior NZ Interview Focus
- Combining a \`Dictionary<int, LinkedListNode<T>>\` with a custom Doubly Linked List.
- Understanding why standard \`List<T>\` with \`RemoveAt(0)\` fails senior interviews (due to O(N) array shifting).
- Handling dummy Head and Tail sentinel nodes to avoid tedious null-checks and pointer corruption.`,
    constraints: [
      "1 <= capacity <= 5,000",
      "0 <= key <= 100,000",
      "0 <= value <= 1,000,000",
      "Up to 200,000 total calls to Get and Put will be made."
    ],
    examples: [
      {
        input: "LruCache(2); Put(1, 1); Put(2, 2); Get(1); Put(3, 3); Get(2);",
        output: "Get(1) returns 1; Put(3,3) evicts key 2; Get(2) returns -1.",
        explanation: "Key 1 was accessed, so key 2 became the LRU candidate and was evicted when key 3 arrived."
      }
    ],
    nzInterviewContext: "The quintessential Senior Software Engineer systems question at Serko and Xero, probing memory layouts, reference semantics, and pointer manipulation.",
    seniorEngineeringTips: [
      "Use sentinel dummy head and tail nodes in your doubly-linked list to eliminate null edge conditions.",
      "Dictionary stores key -> Node. Node stores key and value.",
      "Always store key in the Node so when evicting tail, you can also remove it from the Dictionary in O(1)."
    ],
    starterCode: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public class LruCache
    {
        public LruCache(int capacity)
        {
            // TODO: Initialize data structures
        }

        public int Get(int key)
        {
            // TODO: Return value and mark as most recently used
            return -1;
        }

        public void Put(int key, int value)
        {
            // TODO: Insert or update, evict LRU if capacity exceeded
        }
    }
}`,
    referenceSolution: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public class LruCache
    {
        private class Node
        {
            public int Key;
            public int Value;
            public Node Prev = null!;
            public Node Next = null!;
            public Node(int k, int v) { Key = k; Value = v; }
        }

        private readonly int _capacity;
        private readonly Dictionary<int, Node> _map;
        private readonly Node _head;
        private readonly Node _tail;

        public LruCache(int capacity)
        {
            _capacity = capacity;
            _map = new Dictionary<int, Node>(capacity);
            _head = new Node(0, 0);
            _tail = new Node(0, 0);
            _head.Next = _tail;
            _tail.Prev = _head;
        }

        public int Get(int key)
        {
            if (!_map.TryGetValue(key, out Node? node))
            {
                return -1;
            }

            MoveToHead(node);
            return node.Value;
        }

        public void Put(int key, int value)
        {
            if (_map.TryGetValue(key, out Node? existing))
            {
                existing.Value = value;
                MoveToHead(existing);
                return;
            }

            if (_map.Count >= _capacity)
            {
                // Evict LRU from tail
                Node lru = _tail.Prev;
                RemoveNode(lru);
                _map.Remove(lru.Key);
            }

            Node newNode = new Node(key, value);
            AddNode(newNode);
            _map[key] = newNode;
        }

        private void AddNode(Node node)
        {
            node.Prev = _head;
            node.Next = _head.Next;
            _head.Next.Prev = node;
            _head.Next = node;
        }

        private void RemoveNode(Node node)
        {
            Node prev = node.Prev;
            Node next = node.Next;
            prev.Next = next;
            next.Prev = prev;
        }

        private void MoveToHead(Node node)
        {
            RemoveNode(node);
            AddNode(node);
        }
    }
}`,
    solutionExplanation: "A hash map provides O(1) key lookup, and a doubly linked list allows O(1) removal and insertion at the head. Sentinel nodes at head and tail prevent tedious boundary null checks.",
    testCases: [
      {
        id: "lru-1",
        inputDisplay: "Operations: Put(1,1), Put(2,2), Get(1), Put(3,3), Get(2)",
        input: { capacity: 2, ops: [["Put", 1, 1], ["Put", 2, 2], ["Get", 1], ["Put", 3, 3], ["Get", 2]] },
        expected: "[null, null, 1, null, -1]",
        explanation: "Key 2 is evicted when key 3 is added"
      },
      {
        id: "lru-2",
        inputDisplay: "Overwrite: Put(1,10), Put(1,20), Get(1)",
        input: { capacity: 1, ops: [["Put", 1, 10], ["Put", 1, 20], ["Get", 1]] },
        expected: "[null, null, 20]",
        explanation: "Updating existing key value"
      }
    ],
    hints: {
      level1: "You need a data structure that gives O(1) lookup AND O(1) ordering updates.",
      level2: "Combine a Hash Map (Dictionary) with a Doubly Linked List.",
      level3: "Head represents most recently used; Tail represents least recently used. Use dummy sentinel nodes to simplify pointer re-linking."
    }
  },
  {
    id: "subarray-sum-k-financial",
    title: "Financial Ledger Subarrays Summing to Target",
    slug: "subarray-sum-k-financial",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    nzCompany: "Xero",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N) single pass",
    expectedSpaceComplexity: "O(N) prefix sum frequency table",
    shortDescription: "Count consecutive transaction sequences whose net sum equals a target threshold containing negative amounts.",
    description: `In automated audit reconciliation at Xero, auditors look for anomalies where a contiguous group of debit and credit entries cancels out or equals a specific reconciliation target \`k\`.

Given an integer array \`transactions\` representing positive and negative balances (e.g. \`[1, -1, 5, -2, 3]\`) and an integer \`target\`:

### Task
Implement \`SubarraySum(int[] transactions, int target)\` to return the total number of continuous subarrays whose sum equals \`target\`.

Notice that because amounts can be **negative**, a simple two-pointer sliding window does NOT work (as expanding the window does not monotonically increase the sum).

### Senior NZ Interview Focus
- Recognizing that prefix sums convert the problem into Two-Sum: \`currentPrefixSum - target = previousPrefixSum\`.
- Storing prefix sum frequencies in a \`Dictionary<long, int>\` with pre-initialization \`map[0] = 1\`.
- Guarding against 32-bit integer overflow with \`long\` accumulators.`,
    constraints: [
      "1 <= transactions.Length <= 50,000",
      "-10,000 <= transactions[i] <= 10,000",
      "-10,000,000 <= target <= 10,000,000"
    ],
    examples: [
      {
        input: "transactions = [1, 1, 1], target = 2",
        output: "2",
        explanation: "[1,1] from index 0..1 and [1,1] from index 1..2."
      },
      {
        input: "transactions = [1, 2, 3], target = 3",
        output: "2",
        explanation: "[1,2] and [3]."
      }
    ],
    nzInterviewContext: "Classic Xero and Trade Me algorithm question designed to catch candidates who erroneously assume two-pointer sliding window works when numbers can be negative.",
    seniorEngineeringTips: [
      "Prefix Sum + Hash Map pattern allows single-pass O(N) resolution.",
      "Initialize prefixSumCount[0] = 1 to account for subarrays starting at index 0.",
      "Use long for prefix sum to prevent potential overflow."
    ],
    starterCode: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        /// <summary>
        /// Finds the count of contiguous transaction sequences summing to target.
        /// </summary>
        public static int SubarraySum(int[] transactions, int target)
        {
            // TODO: Implement O(N) Prefix Sum + Hash Map
            return 0;
        }
    }
}`,
    referenceSolution: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        public static int SubarraySum(int[] transactions, int target)
        {
            if (transactions == null || transactions.Length == 0) return 0;

            int count = 0;
            long currentSum = 0;
            Dictionary<long, int> prefixCounts = new Dictionary<long, int>();
            prefixCounts[0] = 1;

            foreach (int txn in transactions)
            {
                currentSum += txn;
                long required = currentSum - target;

                if (prefixCounts.TryGetValue(required, out int occurrences))
                {
                    count += occurrences;
                }

                if (prefixCounts.TryGetValue(currentSum, out int currentOccurrences))
                {
                    prefixCounts[currentSum] = currentOccurrences + 1;
                }
                else
                {
                    prefixCounts[currentSum] = 1;
                }
            }

            return count;
        }
    }
}`,
    solutionExplanation: "By recording prefix sums in a dictionary, if currentSum - target was previously observed, then the subarray between that occurrence and current index sums to target. Running time is O(N) with O(N) space.",
    testCases: [
      {
        id: "sum-k-1",
        inputDisplay: "transactions = [1, 1, 1], target = 2",
        input: { transactions: [1, 1, 1], target: 2 },
        expected: "2",
        explanation: "[1,1] from index 0..1 and 1..2"
      },
      {
        id: "sum-k-2",
        inputDisplay: "transactions = [1, -1, 0], target = 0",
        input: { transactions: [1, -1, 0], target: 0 },
        expected: "3",
        explanation: "[1, -1], [0], and [1, -1, 0]"
      },
      {
        id: "sum-k-3-hidden",
        inputDisplay: "Negative balances: [-1, -1, 1], target = 0",
        input: { transactions: [-1, -1, 1], target: 0 },
        expected: "1",
        isHidden: true,
        explanation: "[-1, 1] at index 1..2"
      }
    ],
    hints: {
      level1: "Why doesn't a two-pointer sliding window work here? Because negative numbers can decrease the running sum.",
      level2: "Think about prefix sums: Sum(i..j) = PrefixSum(j) - PrefixSum(i - 1).",
      level3: "If PrefixSum(j) - target = PrefixSum(i - 1), we have a match. Store the count of each prefix sum in a Dictionary<long, int>."
    }
  },
  {
    id: "merge-k-financial-streams",
    title: "Merge K Sorted Financial Event Streams",
    slug: "merge-k-financial-streams",
    difficulty: "Hard",
    category: "Heaps & PriorityQueues",
    nzCompany: "Pushpay",
    timeLimitMs: 3000,
    expectedTimeComplexity: "O(N log K) where N is total items across K streams",
    expectedSpaceComplexity: "O(K) heap size",
    shortDescription: "Merge multiple pre-sorted transaction streams into a unified chronological stream using PriorityQueue<TElement, TPriority>.",
    description: `Financial payment gateways receive event webhooks from multiple bank feeds concurrently. Each bank feed generates an independently sorted list of transaction timestamps.

Given an array of \`K\` sorted integer arrays \`streams\`, where each \`streams[i]\` represents chronological event timestamps:

### Task
Implement \`MergeKStreams(int[][] streams)\` that merges all \`K\` streams into one single sorted array in ascending order.

### Senior NZ Interview Focus (.NET 6/8 PriorityQueue)
Senior .NET interviewers specifically test:
- Did the candidate use \`System.Collections.Generic.PriorityQueue<TElement, TPriority>\` introduced in modern .NET?
- Avoiding the naive \`streams.SelectMany(x => x).OrderBy(x => x)\` which is \`O(N log N)\` and wastes memory by allocating huge arrays.
- Correctly managing the min-heap to keep at most \`K\` elements in memory simultaneously.`,
    constraints: [
      "0 <= K <= 5,000",
      "0 <= streams[i].Length <= 500",
      "Total elements N <= 100,000",
      "Each individual stream is sorted in ascending order."
    ],
    examples: [
      {
        input: "streams = [[1, 4, 5], [1, 3, 4], [2, 6]]",
        output: "[1, 1, 2, 3, 4, 4, 5, 6]",
        explanation: "Merged and sorted chronologically."
      },
      {
        input: "streams = []",
        output: "[]",
        explanation: "Empty streams array."
      }
    ],
    nzInterviewContext: "Very popular at Pushpay and Vista Group where real-time streaming architectures demand memory-efficient min-heap priority queues.",
    seniorEngineeringTips: [
      "Initialize PriorityQueue<(int streamIndex, int itemIndex), int>() where priority is timestamp.",
      "Push the first element of each non-empty stream into the queue.",
      "Pop the minimum, append to result, and enqueue the next element from that same stream."
    ],
    starterCode: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        /// <summary>
        /// Merges K sorted streams using .NET PriorityQueue.
        /// </summary>
        public static int[] MergeKStreams(int[][] streams)
        {
            // TODO: Implement O(N log K) Min-Heap Merge
            return Array.Empty<int>();
        }
    }
}`,
    referenceSolution: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        public static int[] MergeKStreams(int[][] streams)
        {
            if (streams == null || streams.Length == 0) return Array.Empty<int>();

            int totalElements = 0;
            var pq = new PriorityQueue<(int StreamIdx, int ElementIdx), int>();

            for (int i = 0; i < streams.Length; i++)
            {
                if (streams[i] != null && streams[i].Length > 0)
                {
                    totalElements += streams[i].Length;
                    pq.Enqueue((i, 0), streams[i][0]);
                }
            }

            if (totalElements == 0) return Array.Empty<int>();

            int[] result = new int[totalElements];
            int writeIndex = 0;

            while (pq.Count > 0)
            {
                pq.TryDequeue(out (int StreamIdx, int ElementIdx) current, out int val);
                result[writeIndex++] = val;

                int nextElementIdx = current.ElementIdx + 1;
                if (nextElementIdx < streams[current.StreamIdx].Length)
                {
                    int nextVal = streams[current.StreamIdx][nextElementIdx];
                    pq.Enqueue((current.StreamIdx, nextElementIdx), nextVal);
                }
            }

            return result;
        }
    }
}`,
    solutionExplanation: "Using .NET's PriorityQueue, the heap size is strictly bounded by K. Popping and pushing takes O(log K). For N total elements across all streams, total time is O(N log K) and auxiliary space is O(K).",
    testCases: [
      {
        id: "merge-k-1",
        inputDisplay: "streams = [[1, 4, 5], [1, 3, 4], [2, 6]]",
        input: [[1, 4, 5], [1, 3, 4], [2, 6]],
        expected: "[1, 1, 2, 3, 4, 4, 5, 6]",
        explanation: "Merged 3 streams"
      },
      {
        id: "merge-k-2",
        inputDisplay: "streams = [[], [1], [0]]",
        input: [[], [1], [0]],
        expected: "[0, 1]",
        explanation: "Handles empty nested stream"
      },
      {
        id: "merge-k-3-hidden",
        inputDisplay: "Single stream: [[5, 10, 15]]",
        input: [[5, 10, 15]],
        expected: "[5, 10, 15]",
        isHidden: true,
        explanation: "Single stream edge case"
      }
    ],
    hints: {
      level1: "If you concatenate everything and sort, it's O(N log N). Can you do O(N log K)?",
      level2: "Use a Min-Heap (PriorityQueue in .NET). Keep only the current heads of the K streams in the queue.",
      level3: "Enqueue (streamIndex, elementIndex) with priority = streams[streamIndex][elementIndex]. When you dequeue, advance elementIndex and enqueue the next item from that stream."
    }
  },
  {
    id: "longest-non-repeating-sku",
    title: "Longest Unique Product Code Substring",
    slug: "longest-non-repeating-sku",
    difficulty: "Medium",
    category: "Two Pointers & Sliding Window",
    nzCompany: "Trade Me",
    timeLimitMs: 1500,
    expectedTimeComplexity: "O(N) single-pass",
    expectedSpaceComplexity: "O(min(N, M)) where M is character alphabet size",
    shortDescription: "Find the length of the longest contiguous substring without repeating characters in listing SKUs.",
    description: `Trade Me listings generate unique inventory SKU tokens for sellers. To detect corrupted token formats, the catalog engine must find the length of the longest contiguous sequence of unique characters within a SKU.

Given a string \`s\`:

### Task
Implement \`LengthOfLongestSubstring(string s)\` that returns the length of the longest substring without repeating characters.

### Senior NZ Interview Focus
- Sliding window with two pointers \`left\` and \`right\`.
- Avoiding \`O(2N)\` window shrinking by storing the last seen index of each character: \`left = Math.Max(left, lastSeen[c] + 1)\`.
- Using an array \`int[128]\` for ASCII inputs instead of a heap-allocated \`Dictionary<char, int>\` to achieve optimal CPU cache locality and zero memory allocations.`,
    constraints: [
      "0 <= s.Length <= 100,000",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: "s = 'abcabcbb'",
        output: "3",
        explanation: "The answer is 'abc', with length 3."
      },
      {
        input: "s = 'bbbbb'",
        output: "1",
        explanation: "The answer is 'b', with length 1."
      },
      {
        input: "s = 'pwwkew'",
        output: "3",
        explanation: "The answer is 'wke', with length 3."
      }
    ],
    nzInterviewContext: "Frequently asked at Trade Me and Auckland startups to test sliding window fundamentals and array vs dictionary performance awareness.",
    seniorEngineeringTips: [
      "Store last observed index of character. When a duplicate is encountered, jump the left pointer directly past the previous instance.",
      "An int[256] array filled with -1 runs much faster than Dictionary<char, int> due to direct indexing and zero hashing overhead."
    ],
    starterCode: `using System;
using System.Collections.Generic;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        /// <summary>
        /// Finds the length of the longest substring without duplicate characters.
        /// </summary>
        public static int LengthOfLongestSubstring(string s)
        {
            // TODO: Implement O(N) sliding window with direct index jump
            return 0;
        }
    }
}`,
    referenceSolution: `using System;

namespace CodeByte.Challenges
{
    public static class Solution
    {
        public static int LengthOfLongestSubstring(string s)
        {
            if (string.IsNullOrEmpty(s)) return 0;

            int maxLength = 0;
            int left = 0;
            // Lookup array for ASCII characters, initialized to -1
            int[] lastIndex = new int[256];
            Array.Fill(lastIndex, -1);

            for (int right = 0; right < s.Length; right++)
            {
                char c = s[right];
                int charCode = (int)c;

                if (charCode < 256 && lastIndex[charCode] >= left)
                {
                    // Move left pointer right after the duplicate character
                    left = lastIndex[charCode] + 1;
                }

                if (charCode < 256)
                {
                    lastIndex[charCode] = right;
                }

                int currentWindow = right - left + 1;
                if (currentWindow > maxLength)
                {
                    maxLength = currentWindow;
                }
            }

            return maxLength;
        }
    }
}`,
    solutionExplanation: "Using an int[256] index map allows direct O(1) jump of the left pointer whenever a duplicate character is encountered, ensuring a single O(N) traversal with zero heap allocations.",
    testCases: [
      {
        id: "sku-1",
        inputDisplay: "s = 'abcabcbb'",
        input: "abcabcbb",
        expected: "3",
        explanation: "'abc' has length 3"
      },
      {
        id: "sku-2",
        inputDisplay: "s = 'bbbbb'",
        input: "bbbbb",
        expected: "1",
        explanation: "Repeated single character"
      },
      {
        id: "sku-3",
        inputDisplay: "s = 'pwwkew'",
        input: "pwwkew",
        expected: "3",
        explanation: "'wke' has length 3"
      },
      {
        id: "sku-4-hidden",
        inputDisplay: "Empty string: ''",
        input: "",
        expected: "0",
        isHidden: true,
        explanation: "Empty input"
      }
    ],
    hints: {
      level1: "Use a sliding window [left, right] that expands rightward.",
      level2: "Track the last seen index of each character. If you see a character that occurred at index >= left, update left.",
      level3: "left = lastSeen[c] + 1. Calculate window length as (right - left + 1) and update max."
    }
  },
  {
    id: "first-unique-character",
    title: "First Non Repeating Character",
    slug: "first-non-repeating-character",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Trade Me",
    timeLimitMs: 1000,
    expectedTimeComplexity: "O(N) linear time",
    expectedSpaceComplexity: "O(1) auxiliary (fixed 256 array or hash table)",
    shortDescription: "Have the function FirstNonRepeating(str) take the str parameter and return the first character that appears only once.",
    description: `Have the function **FirstNonRepeating(str)** take the \`str\` parameter being passed and return the first character that appears only once in the string.

For example: if \`str\` is \`"swiss"\` then your program should return the string **\`w\`**. If every character repeats or the string is empty, return the string **\`null\`**.

### Examples
\`\`\`text
Input: "swiss"
Output: w
\`\`\`
\`\`\`text
Input: "aabbccde"
Output: d
\`\`\`
\`\`\`text
Input: "aabb"
Output: null
\`\`\`

### Requirements
- **Return the first non-repeating character:** Return as a string (or character).
- **Case-sensitive:** \`'A'\` and \`'a'\` are treated as distinct characters.
- **Return null** (or \`"null"\`) if every character is repeated or if the string is empty.
- **Try to avoid LINQ:** Operations like \`.GroupBy()\` or \`.Count()\` allocate intermediate enumerators and perform redundant iterations. Senior interviewers want to see direct, high-performance algorithm control.
- **Aim for O(N) time complexity:** Avoid O(N²) quadratic nested loops or repeated \`IndexOf\` / \`LastIndexOf\` calls inside loops.

### Coderbyte C# Template
\`\`\`csharp
using System;

class MainClass {

  public static string FirstNonRepeating(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(FirstNonRepeating(Console.ReadLine()));
  } 

}
\`\`\`

### Senior NZ Interview Focus
At NZ tech employers like **Trade Me**, **Xero**, and **Pushpay**, this standard Coderbyte screening challenge tests:
1. **Algorithmic Complexity**: Moving from brute-force O(N²) to optimal O(N) using a two-pass frequency count.
2. **Allocation Efficiency**: Using an \`int[256]\` array for ASCII or a \`Dictionary<char, int>\` rather than expensive LINQ pipelines.
3. **Idiomatic Clean Code**: Handling edge cases (empty strings, single characters, repeated characters).`,
    constraints: [
      "0 <= str.Length <= 100,000",
      "str can contain ASCII letters, digits, and punctuation.",
      "Case-sensitive comparison ('A' != 'a').",
      "Aim for O(N) time complexity.",
      "Avoid LINQ allocations."
    ],
    examples: [
      {
        input: 'str = "swiss"',
        output: "w",
        explanation: "'s' appears 3 times, 'w' appears 1 time and is the first non-repeating character."
      },
      {
        input: 'str = "aabbccde"',
        output: "d",
        explanation: "'a', 'b', and 'c' are repeated. 'd' appears once and precedes 'e'."
      },
      {
        input: 'str = "aabb"',
        output: "null",
        explanation: "Every character in the string is repeated, so the method returns null."
      },
      {
        input: 'str = "Aa"',
        output: "A",
        explanation: "Case-sensitive: 'A' and 'a' are distinct characters. 'A' appears first and only once."
      }
    ],
    nzInterviewContext: "A classic Coderbyte technical assessment problem used across NZ tech leaders (Trade Me, Xero, Pushpay) to verify candidate fundamentals in string traversal, algorithmic efficiency, and avoidance of heavy allocations.",
    seniorEngineeringTips: [
      "Avoid LINQ queries like str.GroupBy(c => c).First() — they allocate heap objects and have higher constant factors.",
      "Avoid O(N²) nested loops: calling str.IndexOf(c) == str.LastIndexOf(c) inside a loop causes quadratic time complexity.",
      "For ASCII character sets, an int[256] array provides O(1) direct indexing with zero heap allocations.",
      "Return the character as a string (or null/\"null\" when no unique character exists)."
    ],
    starterCode: `using System;

class MainClass {

  public static string FirstNonRepeating(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(FirstNonRepeating(Console.ReadLine()));
  } 

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string FirstNonRepeating(string str) {
    if (string.IsNullOrEmpty(str))
    {
      return "null";
    }

    // Using fixed-size frequency array for ASCII characters
    // int[256] provides O(1) direct indexing with zero heap allocation churn
    int[] charCounts = new int[256];

    // Pass 1: Tally character frequencies in O(N)
    for (int i = 0; i < str.Length; i++)
    {
      char c = str[i];
      if (c < 256)
      {
        charCounts[c]++;
      }
    }

    // Pass 2: Identify the first character with a frequency of exactly 1
    for (int i = 0; i < str.Length; i++)
    {
      char c = str[i];
      if (c < 256 && charCounts[c] == 1)
      {
        return c.ToString();
      }
    }

    return "null";
  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(FirstNonRepeating(Console.ReadLine()));
  } 

}`,
    solutionExplanation: "Using a two-pass algorithm matching Coderbyte's standard pattern: Pass 1 tallies character frequencies in O(N) time with an int[256] lookup array (or Dictionary<char, int> for arbitrary Unicode). Pass 2 scans the original string left-to-right to find the first character with a count of 1. This guarantees O(N) time, O(1) auxiliary space, and zero LINQ heap allocations.",
    testCases: [
      {
        id: "fnr-1",
        inputDisplay: 'str = "swiss"',
        input: "swiss",
        expected: "w",
        explanation: "'s' repeats 3 times, 'w' appears once and is first"
      },
      {
        id: "fnr-2",
        inputDisplay: 'str = "aabbccde"',
        input: "aabbccde",
        expected: "d",
        explanation: "'d' appears once and before 'e'"
      },
      {
        id: "fnr-3",
        inputDisplay: 'str = "aabb"',
        input: "aabb",
        expected: "null",
        explanation: "All characters repeat, so returns null"
      },
      {
        id: "fnr-4",
        inputDisplay: 'str = "Aa"',
        input: "Aa",
        expected: "A",
        explanation: "Case-sensitive: 'A' and 'a' are distinct characters"
      },
      {
        id: "fnr-5",
        inputDisplay: 'str = "z"',
        input: "z",
        expected: "z",
        explanation: "Single character string"
      },
      {
        id: "fnr-6-hidden",
        inputDisplay: 'str = "" (empty string)',
        input: "",
        expected: "null",
        isHidden: true,
        explanation: "Empty string returns null"
      },
      {
        id: "fnr-7-hidden",
        inputDisplay: 'str = "trade-me-marketplace"',
        input: "trade-me-marketplace",
        expected: "d",
        isHidden: true,
        explanation: "Non-repeating character in hyphenated string"
      }
    ],
    hints: {
      level1: "In Coderbyte, you can count the frequencies of each character first. An int[256] array is ideal for ASCII strings.",
      level2: "After tallying frequencies, loop through the original string from index 0 to str.Length - 1. Return the first character whose count is 1.",
      level3: "Avoid LINQ. Use: int[] freq = new int[256]; for (int i = 0; i < str.Length; i++) freq[str[i]]++; for (int i = 0; i < str.Length; i++) if (freq[str[i]] == 1) return str[i].ToString(); return \"null\";"
    }
  }
];
