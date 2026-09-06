import { Challenge } from "../types";

export const CHALLENGES_L4: Challenge[] = [
  // 16. LINQ Group By
  {
    id: "linq-group-by",
    title: "LINQ Group By",
    slug: "linq-group-by",
    level: 4,
    levelName: "Level 4 — C#/.NET Interview Level",
    difficulty: "Medium",
    category: "LINQ & Data Processing",
    nzCompany: "Partly",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N log D)",
    expectedSpaceComplexity: "O(D) departments",
    shortDescription: "Find the highest-paid employee in each department using C# grouping techniques.",
    description: `Have the function \`LinqGroupBy(string[] records)\` parse an array of employee strings in the format \`"Name:Department:Salary"\` and find the highest-paid employee in each department.

The result should be returned as a comma-separated string ordered alphabetically by department in the format:
\`"Department1 -> Name, Department2 -> Name"\`.

For example:
\`\`\`csharp
var employees = new[]
{
    "John:IT:100000",
    "Jane:HR:80000",
    "Mike:IT:120000",
    "Sara:HR:90000"
};
\`\`\`
The output should be:
\`"HR -> Sara, IT -> Mike"\` because Sara earns the most in HR ($90k) and Mike earns the most in IT ($120k).`,
    constraints: [
      "1 <= records.Length <= 50,000",
      "Salary is a positive integer <= 1,000,000",
      "No two employees in the same department have the exact same highest salary"
    ],
    examples: [
      {
        input: 'records = ["John:IT:100000", "Jane:HR:80000", "Mike:IT:120000", "Sara:HR:90000"]',
        output: '"HR -> Sara, IT -> Mike"',
        explanation: "Highest paid in HR is Sara; highest paid in IT is Mike."
      },
      {
        input: 'records = ["Alice:Finance:150000", "Bob:Finance:130000", "Charlie:Sales:90000"]',
        output: '"Finance -> Alice, Sales -> Charlie"',
        explanation: "Finance -> Alice, Sales -> Charlie."
      }
    ],
    nzInterviewContext: "Frequently asked at Partly, Xero, and .NET enterprise teams to evaluate real-world C# data modeling, record splitting, aggregation, and LINQ/dictionary grouping.",
    seniorEngineeringTips: [
      "Parse each record into strongly-typed primitives (Name, Department, Salary).",
      "Track highest earner per department using a Dictionary<string, (int Salary, string Name)> or LINQ GroupBy().",
      "Sort department keys alphabetically before formatting output."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string LinqGroupBy(string[] records) {

    // code goes here  
    return "";

  }

  static void Main() {  
    Console.WriteLine(LinqGroupBy(new string[] { "John:IT:100000", "Jane:HR:80000", "Mike:IT:120000", "Sara:HR:90000" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string LinqGroupBy(string[] records) {
    if (records == null || records.Length == 0) return "";

    var deptMaxSalary = new Dictionary<string, int>();
    var deptMaxPerson = new Dictionary<string, string>();
    var depts = new List<string>();

    foreach (string r in records) {
      string[] parts = r.Split(':');
      string name = parts[0].Trim();
      string dept = parts[1].Trim();
      int salary = int.Parse(parts[2].Trim());

      if (!deptMaxSalary.ContainsKey(dept)) {
        deptMaxSalary[dept] = salary;
        deptMaxPerson[dept] = name;
        depts.Add(dept);
      } else if (salary > deptMaxSalary[dept]) {
        deptMaxSalary[dept] = salary;
        deptMaxPerson[dept] = name;
      }
    }

    depts.Sort();
    var result = new List<string>();
    foreach (string dept in depts) {
      result.Add(dept + " -> " + deptMaxPerson[dept]);
    }

    return string.Join(", ", result);
  }

  static void Main() {  
    Console.WriteLine(LinqGroupBy(new string[] { "John:IT:100000", "Jane:HR:80000", "Mike:IT:120000", "Sara:HR:90000" }));
  }

}`,
    solutionExplanation: `We iterate through the employee records, extracting Name, Department, and Salary. Using dictionary tracking per department, we maintain the maximum salary and employee name for each department. Finally, we sort the distinct departments alphabetically and format as "Department -> Name", joined with commas.`,
    testCases: [
      { id: "tc-1", inputDisplay: '["John:IT:100000", "Jane:HR:80000", "Mike:IT:120000", "Sara:HR:90000"]', input: ["John:IT:100000", "Jane:HR:80000", "Mike:IT:120000", "Sara:HR:90000"], expected: "HR -> Sara, IT -> Mike" },
      { id: "tc-2", inputDisplay: '["Alice:Finance:150000", "Bob:Finance:130000", "Charlie:Sales:90000"]', input: ["Alice:Finance:150000", "Bob:Finance:130000", "Charlie:Sales:90000"], expected: "Finance -> Alice, Sales -> Charlie" },
      { id: "tc-3", inputDisplay: '["Dave:Engineering:140000"]', input: ["Dave:Engineering:140000"], expected: "Engineering -> Dave" },
      { id: "tc-4", inputDisplay: '["A:Ops:50000", "B:Ops:70000", "C:IT:80000", "D:IT:90000"]', input: ["A:Ops:50000", "B:Ops:70000", "C:IT:80000", "D:IT:90000"], expected: "IT -> D, Ops -> B", isHidden: true }
    ],
    hints: {
      level1: "Split each record on ':' to get Name, Department, and Salary.",
      level2: "Use a dictionary keyed by Department to keep track of the highest salary and person seen so far.",
      level3: "Sort the department names alphabetically, then format each entry as 'Dept -> Name' and join with ', '."
    }
  },

  // 17. Find the Second Highest Salary
  {
    id: "second-highest-salary",
    title: "Find the Second Highest Salary",
    slug: "second-highest-salary",
    level: 4,
    levelName: "Level 4 — C#/.NET Interview Level",
    difficulty: "Medium",
    category: "LINQ & Data Processing",
    nzCompany: "Xero",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N log K)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Find the second distinct highest salary value using LINQ or collection processing.",
    description: `Have the function \`SecondHighestSalary(string[] records)\` take an array of employee salary strings in the format \`"Name:Salary"\` and return the second highest distinct salary value as an integer.

If there are fewer than 2 distinct salary values, return \`-1\`.

For example:
\`\`\`csharp
var employees = new[]
{
    "John:100000",
    "Mike:120000",
    "Sara:90000",
    "David:110000"
};
\`\`\`
The distinct salaries are \`[120000, 110000, 100000, 90000]\`.
The second highest is \`110000\`.`,
    constraints: [
      "1 <= records.Length <= 50,000",
      "Salary is a positive integer"
    ],
    examples: [
      {
        input: 'records = ["John:100000", "Mike:120000", "Sara:90000", "David:110000"]',
        output: '110000',
        explanation: "120000 is highest, 110000 is second highest."
      },
      {
        input: 'records = ["Alice:95000", "Bob:95000", "Charlie:80000"]',
        output: '80000',
        explanation: "95000 is highest (shared by two), second highest is 80000."
      },
      {
        input: 'records = ["Eve:130000", "Frank:130000"]',
        output: '-1',
        explanation: "Only 1 distinct salary value."
      }
    ],
    nzInterviewContext: "Commonly asked at Xero and SaaS accounting platforms to test LINQ pipeline operations (OrderByDescending, Distinct, Skip, FirstOrDefault) vs imperative performance trade-offs.",
    seniorEngineeringTips: [
      "Ensure duplicate top salaries do not skew the result by filtering through Distinct() or a HashSet<int>.",
      "Check if distinct salary count >= 2; if not, return -1.",
      "In LINQ: records.Select(r => int.Parse(r.Split(':')[1])).Distinct().OrderByDescending(s => s).Skip(1).First()."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static int SecondHighestSalary(string[] records) {

    // code goes here  
    return -1;

  }

  static void Main() {  
    Console.WriteLine(SecondHighestSalary(new string[] { "John:100000", "Mike:120000", "Sara:90000", "David:110000" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static int SecondHighestSalary(string[] records) {
    if (records == null || records.Length < 2) return -1;

    var distinctSalaries = new HashSet<int>();
    foreach (string r in records) {
      string[] parts = r.Split(':');
      int salary = int.Parse(parts[1].Trim());
      distinctSalaries.Add(salary);
    }

    if (distinctSalaries.Count < 2) return -1;

    var list = new List<int>(distinctSalaries);
    list.Sort();

    return list[list.Count - 2];
  }

  static void Main() {  
    Console.WriteLine(SecondHighestSalary(new string[] { "John:100000", "Mike:120000", "Sara:90000", "David:110000" }));
  }

}`,
    solutionExplanation: `We extract each salary as an integer and add it to a \`HashSet<int>\` to eliminate duplicates. If fewer than two distinct salaries exist, we return -1. Otherwise, we sort the distinct values in ascending order and return the item at index \`list.Count - 2\` (the second highest).`,
    testCases: [
      { id: "tc-1", inputDisplay: '["John:100000", "Mike:120000", "Sara:90000", "David:110000"]', input: ["John:100000", "Mike:120000", "Sara:90000", "David:110000"], expected: 110000 },
      { id: "tc-2", inputDisplay: '["Alice:95000", "Bob:95000", "Charlie:80000"]', input: ["Alice:95000", "Bob:95000", "Charlie:80000"], expected: 80000 },
      { id: "tc-3", inputDisplay: '["Eve:130000", "Frank:130000"]', input: ["Eve:130000", "Frank:130000"], expected: -1 },
      { id: "tc-4", inputDisplay: '["Tom:50000", "Jerry:60000", "Spike:70000", "Tyke:70000"]', input: ["Tom:50000", "Jerry:60000", "Spike:70000", "Tyke:70000"], expected: 60000, isHidden: true }
    ],
    hints: {
      level1: "First extract all salaries as integers.",
      level2: "Remove duplicate salaries using a HashSet<int> so ties do not occupy 1st and 2nd rank.",
      level3: "Sort the unique salaries. If there are at least 2, return the second from the top."
    }
  },

  // 18. Merge Two Sorted Arrays
  {
    id: "merge-two-sorted-arrays",
    title: "Merge Two Sorted Arrays",
    slug: "merge-two-sorted-arrays",
    level: 4,
    levelName: "Level 4 — C#/.NET Interview Level",
    difficulty: "Medium",
    category: "Two Pointers & Sliding Window",
    nzCompany: "Partly",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N + M)",
    expectedSpaceComplexity: "O(N + M)",
    shortDescription: "Merge two sorted integer arrays in linear time using two pointers without OrderBy().",
    description: `Have the function \`MergeTwoSortedArrays(string[] strArr)\` take \`strArr\` which contains two elements:
- \`strArr[0]\`: comma-separated integers sorted in ascending order
- \`strArr[1]\`: comma-separated integers sorted in ascending order

Return a comma-separated string containing all numbers merged into a single sorted list.

**Senior Requirement**: Do not concatenate and call \`.OrderBy()\` or \`Array.Sort()\`. Solve in strictly O(N + M) time using the classic two-pointer merge algorithm.

For example: if \`strArr\` is \`["1, 3, 5, 7", "2, 4, 6, 8"]\`, the output should be \`"1, 2, 3, 4, 5, 6, 7, 8"\`.`,
    constraints: [
      "strArr.Length == 2",
      "1 <= number of elements in each string <= 50,000",
      "Both inputs are pre-sorted in ascending order"
    ],
    examples: [
      {
        input: 'strArr = ["1, 3, 5, 7", "2, 4, 6, 8"]',
        output: '"1, 2, 3, 4, 5, 6, 7, 8"',
        explanation: "Interleaved in ascending order."
      },
      {
        input: 'strArr = ["1, 10, 20", "2, 3, 4, 5"]',
        output: '"1, 2, 3, 4, 5, 10, 20"',
        explanation: "Merged seamlessly."
      }
    ],
    nzInterviewContext: "Core algorithm tested at Partly during catalog merge ingestion pipelines where millions of pre-sorted OEM part records must be combined with zero sort overhead.",
    seniorEngineeringTips: [
      "Maintain two pointers, i and j, scanning through both arrays simultaneously.",
      "Compare elements at current pointers; append the smaller value and increment that pointer.",
      "Flush any remaining elements from either array after the main loop finishes."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string MergeTwoSortedArrays(string[] strArr) {

    // code goes here  
    return "";

  }

  static void Main() {  
    Console.WriteLine(MergeTwoSortedArrays(new string[] { "1, 3, 5, 7", "2, 4, 6, 8" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string MergeTwoSortedArrays(string[] strArr) {
    if (strArr == null || strArr.Length < 2) return "";

    string[] s1 = strArr[0].Split(',', StringSplitOptions.TrimEntries);
    string[] s2 = strArr[1].Split(',', StringSplitOptions.TrimEntries);

    var merged = new List<int>();
    int i = 0;
    int j = 0;

    while (i < s1.Length && j < s2.Length) {
      int v1 = int.Parse(s1[i]);
      int v2 = int.Parse(s2[j]);

      if (v1 <= v2) {
        merged.Add(v1);
        i++;
      } else {
        merged.Add(v2);
        j++;
      }
    }

    while (i < s1.Length) {
      merged.Add(int.Parse(s1[i]));
      i++;
    }

    while (j < s2.Length) {
      merged.Add(int.Parse(s2[j]));
      j++;
    }

    return string.Join(", ", merged);
  }

  static void Main() {  
    Console.WriteLine(MergeTwoSortedArrays(new string[] { "1, 3, 5, 7", "2, 4, 6, 8" }));
  }

}`,
    solutionExplanation: `Because both inputs are already sorted, we can avoid an O((N+M) log(N+M)) full sort by using two pointers. We compare the heads of both arrays, select the smaller element, and advance its index. Once one array is exhausted, the remainder of the other array is appended in O(N + M) time.`,
    testCases: [
      { id: "tc-1", inputDisplay: '["1, 3, 5, 7", "2, 4, 6, 8"]', input: ["1, 3, 5, 7", "2, 4, 6, 8"], expected: "1, 2, 3, 4, 5, 6, 7, 8" },
      { id: "tc-2", inputDisplay: '["1, 10, 20", "2, 3, 4, 5"]', input: ["1, 10, 20", "2, 3, 4, 5"], expected: "1, 2, 3, 4, 5, 10, 20" },
      { id: "tc-3", inputDisplay: '["5, 10, 15", "1, 2, 3"]', input: ["5, 10, 15", "1, 2, 3"], expected: "1, 2, 3, 5, 10, 15" },
      { id: "tc-4", inputDisplay: '["1", "2"]', input: ["1", "2"], expected: "1, 2", isHidden: true },
      { id: "tc-5", inputDisplay: '["-5, -2, 0", "-3, 1, 4"]', input: ["-5, -2, 0", "-3, 1, 4"], expected: "-5, -3, -2, 0, 1, 4", isHidden: true }
    ],
    hints: {
      level1: "Use two pointer variables, i = 0 and j = 0, for array 1 and array 2.",
      level2: "Compare elements at arr1[i] and arr2[j]. Add the smaller one to your result and advance that pointer.",
      level3: "When one array runs out, flush all remaining items from the other array into the result."
    }
  },

  // 19. Implement an LRU Cache
  {
    id: "lru-cache",
    title: "Implement an LRU Cache",
    slug: "lru-cache",
    level: 4,
    levelName: "Level 4 — C#/.NET Interview Level",
    difficulty: "Hard",
    category: "Span<T> & Zero-Allocation",
    nzCompany: "Partly / AWS NZ",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(1) per access",
    expectedSpaceComplexity: "O(Capacity)",
    shortDescription: "Implement a Least Recently Used cache with bounded capacity and hyphen-delimited output.",
    description: `Have the function \`LRUCache(string[] strArr)\` take the array of characters stored in \`strArr\`, which will contain characters keys being accessed in order.

Maintain an LRU Cache of maximum capacity **5**.
- When an element is accessed:
  - If it already exists in the cache, move it to the most recently used (end) position.
  - If it does not exist and the cache is at capacity (5 elements), evict the least recently used element (the front) before adding the new element at the end.
- Return the final cache elements in order from least recently used to most recently used, separated by a hyphen \`"-"\`.

For example: if \`strArr\` is \`["A", "B", "C", "D", "A", "E", "D", "Z"]\`:
- "A" -> [A]
- "B" -> [A, B]
- "C" -> [A, B, C]
- "D" -> [A, B, C, D]
- "A" (re-accessed) -> [B, C, D, A]
- "E" -> [B, C, D, A, E] (capacity 5 reached)
- "D" (re-accessed) -> [B, C, A, E, D]
- "Z" (evicts least recent 'B') -> [C, A, E, D, Z]
Output: \`"C-A-E-D-Z"\`.`,
    constraints: [
      "1 <= strArr.Length <= 50,000",
      "Fixed capacity = 5 elements",
      "Keys are single alphanumeric characters"
    ],
    examples: [
      {
        input: 'strArr = ["A", "B", "C", "D", "A", "E", "D", "Z"]',
        output: '"C-A-E-D-Z"',
        explanation: "Final state formatted with hyphens."
      },
      {
        input: 'strArr = ["A", "B", "A", "C", "A", "B"]',
        output: '"C-A-B"',
        explanation: "Re-accessing pushes element to the most recent position."
      }
    ],
    nzInterviewContext: "A quintessential Senior Systems Engineer interview question at Partly and AWS to test understanding of cache eviction policies, linked hash maps, and low-latency storage buffers.",
    seniorEngineeringTips: [
      "In production .NET, an LRU is constructed via Dictionary<TKey, LinkedListNode<TValue>> + LinkedList<TValue> for true O(1) Get and Put.",
      "For small bounded capacity (capacity 5), a compact List<string> has minimal cache misses and zero pointer fragmentation.",
      "Join elements with string.Join(\"-\", cache) at output."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string LRUCache(string[] strArr) {

    // code goes here  
    return strArr[0];

  }

  static void Main() {  
    Console.WriteLine(LRUCache(new string[] { "A", "B", "C", "D", "A", "E", "D", "Z" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string LRUCache(string[] strArr) {
    if (strArr == null || strArr.Length == 0) return "";

    var cache = new List<string>();

    foreach (string item in strArr) {
      if (cache.Contains(item)) {
        cache.Remove(item);
      } else if (cache.Count >= 5) {
        cache.RemoveAt(0);
      }
      cache.Add(item);
    }

    return string.Join("-", cache);
  }

  static void Main() {  
    Console.WriteLine(LRUCache(new string[] { "A", "B", "C", "D", "A", "E", "D", "Z" }));
  }

}`,
    solutionExplanation: `We maintain a list of items up to capacity 5. When an item is accessed: if already in cache, we remove it from its current position; otherwise, if the cache has 5 items, we evict the item at index 0 (least recently used). Finally, we append the item to the end (most recently used). When finished, we join with hyphens.`,
    testCases: [
      { id: "tc-1", inputDisplay: '["A", "B", "C", "D", "A", "E", "D", "Z"]', input: ["A", "B", "C", "D", "A", "E", "D", "Z"], expected: "C-A-E-D-Z" },
      { id: "tc-2", inputDisplay: '["A", "B", "A", "C", "A", "B"]', input: ["A", "B", "A", "C", "A", "B"], expected: "C-A-B" },
      { id: "tc-3", inputDisplay: '["A", "1", "2", "p", "0", "A", "D"]', input: ["A", "1", "2", "p", "0", "A", "D"], expected: "2-p-0-A-D" },
      { id: "tc-4", inputDisplay: '["X"]', input: ["X"], expected: "X", isHidden: true },
      { id: "tc-5", inputDisplay: '["1", "2", "3", "1", "2", "3"]', input: ["1", "2", "3", "1", "2", "3"], expected: "1-2-3", isHidden: true }
    ],
    hints: {
      level1: "Use a List<string> to hold the active elements in order of usage.",
      level2: "If item exists in list, remove it. Else if count >= 5, remove element at index 0.",
      level3: "Add the new item to the end of the list. Return elements joined by '-'."
    }
  },

  // 20. Process API Transactions
  {
    id: "process-api-transactions",
    title: "Process API Transactions",
    slug: "process-api-transactions",
    level: 4,
    levelName: "Level 4 — C#/.NET Interview Level",
    difficulty: "Senior Specialist",
    category: "LINQ & Data Processing",
    nzCompany: "Partly / Pushpay",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N log U)",
    expectedSpaceComplexity: "O(U) users",
    shortDescription: "Filter, group, and calculate the top 3 users by total successful transaction volume.",
    description: `Have the function \`ProcessApiTransactions(string[] transactions)\` process a collection of payment transaction event logs.

Each record is formatted as:
\`"Id:UserId:Amount:Status:DaysAgo"\`

Your task:
1. Filter only transactions where \`Status == "SUCCESS"\`.
2. Ignore transactions that occurred more than 30 days ago (\`DaysAgo > 30\`).
3. Group valid transactions by \`UserId\` and calculate the total amount spent per user.
4. Find the top 3 users with the highest total amount spent (ordered descending by amount, and alphabetically by UserId on ties).
5. Format the result as a comma-separated string: \`"UserId: $Total, UserId: $Total"\`.

For example:
\`\`\`csharp
var txs = new[]
{
    "t1:usr_1:150:SUCCESS:5",
    "t2:usr_2:300:SUCCESS:12",
    "t3:usr_1:200:SUCCESS:2",
    "t4:usr_3:50:FAILED:1",
    "t5:usr_2:100:SUCCESS:45",
    "t6:usr_4:500:SUCCESS:10",
    "t7:usr_5:80:SUCCESS:15"
};
\`\`\`
- \`usr_4\`: 500
- \`usr_1\`: 150 + 200 = 350
- \`usr_2\`: 300 (t5 ignored because 45 > 30)
- \`usr_5\`: 80
- \`usr_3\`: 0 (FAILED)

Top 3 users:
Output: \`"usr_4: $500, usr_1: $350, usr_2: $300"\`.`,
    constraints: [
      "1 <= transactions.Length <= 50,000",
      "Amount is positive integer",
      "Status is either 'SUCCESS' or 'FAILED'",
      "DaysAgo is non-negative integer"
    ],
    examples: [
      {
        input: 'transactions = ["t1:usr_1:150:SUCCESS:5", "t2:usr_2:300:SUCCESS:12", "t3:usr_1:200:SUCCESS:2", "t4:usr_3:50:FAILED:1", "t5:usr_2:100:SUCCESS:45", "t6:usr_4:500:SUCCESS:10", "t7:usr_5:80:SUCCESS:15"]',
        output: '"usr_4: $500, usr_1: $350, usr_2: $300"',
        explanation: "usr_4 ($500), usr_1 ($350), usr_2 ($300) are top 3."
      },
      {
        input: 'transactions = ["t1:alice:100:SUCCESS:10", "t2:bob:200:SUCCESS:5", "t3:alice:150:SUCCESS:20"]',
        output: '"alice: $250, bob: $200"',
        explanation: "alice total is 250, bob total is 200."
      }
    ],
    nzInterviewContext: "Designed to emulate real production microservice tasks at Pushpay and Partly, combining record extraction, status/temporal filtering, aggregation, and top-K sorting.",
    seniorEngineeringTips: [
      "Parse and filter records early in the stream to prevent building objects for failed or expired transactions.",
      "Aggregate totals using a Dictionary<string, int> for O(1) user lookups.",
      "Sort user keys by comparing totals descending and resolving ties with alphabetical UserId comparison."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string ProcessApiTransactions(string[] transactions) {

    // code goes here  
    return "";

  }

  static void Main() {  
    Console.WriteLine(ProcessApiTransactions(new string[] { "t1:usr_1:150:SUCCESS:5", "t2:usr_2:300:SUCCESS:12", "t3:usr_1:200:SUCCESS:2", "t4:usr_3:50:FAILED:1", "t5:usr_2:100:SUCCESS:45", "t6:usr_4:500:SUCCESS:10", "t7:usr_5:80:SUCCESS:15" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string ProcessApiTransactions(string[] transactions) {
    if (transactions == null || transactions.Length == 0) return "";

    var userTotals = new Dictionary<string, int>();

    foreach (string tx in transactions) {
      string[] parts = tx.Split(':');
      string userId = parts[1].Trim();
      int amount = int.Parse(parts[2].Trim());
      string status = parts[3].Trim();
      int daysAgo = int.Parse(parts[4].Trim());

      if (status == "SUCCESS" && daysAgo <= 30) {
        if (!userTotals.ContainsKey(userId)) {
          userTotals[userId] = 0;
        }
        userTotals[userId] += amount;
      }
    }

    var userList = new List<string>(userTotals.Keys);
    userList.Sort((a, b) => {
      int comp = userTotals[b].CompareTo(userTotals[a]);
      return comp != 0 ? comp : a.CompareTo(b);
    });

    var top = new List<string>();
    int count = Math.Min(3, userList.Count);
    for (int i = 0; i < count; i++) {
      string u = userList[i];
      top.Add(u + ": $" + userTotals[u]);
    }

    return string.Join(", ", top);
  }

  static void Main() {  
    Console.WriteLine(ProcessApiTransactions(new string[] { "t1:usr_1:150:SUCCESS:5", "t2:usr_2:300:SUCCESS:12", "t3:usr_1:200:SUCCESS:2", "t4:usr_3:50:FAILED:1", "t5:usr_2:100:SUCCESS:45", "t6:usr_4:500:SUCCESS:10", "t7:usr_5:80:SUCCESS:15" }));
  }

}`,
    solutionExplanation: `We iterate through the transactions, extracting UserId, Amount, Status, and DaysAgo. If Status is "SUCCESS" and DaysAgo <= 30, we accumulate the amount into a Dictionary<string, int> keyed by UserId. Next, we sort user IDs by total amount descending (breaking ties alphabetically). Finally, we take up to the top 3 users and format them as "UserId: $Total", joined by ", ".`,
    testCases: [
      { id: "tc-1", inputDisplay: '["t1:usr_1:150:SUCCESS:5", "t2:usr_2:300:SUCCESS:12", "t3:usr_1:200:SUCCESS:2", "t4:usr_3:50:FAILED:1", "t5:usr_2:100:SUCCESS:45", "t6:usr_4:500:SUCCESS:10", "t7:usr_5:80:SUCCESS:15"]', input: ["t1:usr_1:150:SUCCESS:5", "t2:usr_2:300:SUCCESS:12", "t3:usr_1:200:SUCCESS:2", "t4:usr_3:50:FAILED:1", "t5:usr_2:100:SUCCESS:45", "t6:usr_4:500:SUCCESS:10", "t7:usr_5:80:SUCCESS:15"], expected: "usr_4: $500, usr_1: $350, usr_2: $300" },
      { id: "tc-2", inputDisplay: '["t1:alice:100:SUCCESS:10", "t2:bob:200:SUCCESS:5", "t3:alice:150:SUCCESS:20"]', input: ["t1:alice:100:SUCCESS:10", "t2:bob:200:SUCCESS:5", "t3:alice:150:SUCCESS:20"], expected: "alice: $250, bob: $200" },
      { id: "tc-3", inputDisplay: '["t1:usr_old:1000:SUCCESS:60", "t2:usr_active:50:SUCCESS:2"]', input: ["t1:usr_old:1000:SUCCESS:60", "t2:usr_active:50:SUCCESS:2"], expected: "usr_active: $50" },
      { id: "tc-4", inputDisplay: '["t1:a:100:SUCCESS:1", "t2:b:100:SUCCESS:1", "t3:c:100:SUCCESS:1", "t4:d:100:SUCCESS:1"]', input: ["t1:a:100:SUCCESS:1", "t2:b:100:SUCCESS:1", "t3:c:100:SUCCESS:1", "t4:d:100:SUCCESS:1"], expected: "a: $100, b: $100, c: $100", isHidden: true }
    ],
    hints: {
      level1: "Parse each transaction string by splitting on ':'.",
      level2: "Check if status == 'SUCCESS' and daysAgo <= 30 before updating the user's total amount in a Dictionary.",
      level3: "Sort the users descending by total amount (tie-break alphabetically by UserId), then take the top 3."
    }
  }
];
