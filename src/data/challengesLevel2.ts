import { Challenge } from "../types";

export const CHALLENGES_L2: Challenge[] = [
  // 6. Find the Missing Number
  {
    id: "find-missing-number",
    title: "Find the Missing Number",
    slug: "find-missing-number",
    level: 2,
    levelName: "Level 2 — Arrays & Collections",
    difficulty: "Easy",
    category: "Arrays & Collections",
    nzCompany: "Partly",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Given an array of n numbers from 1 to n+1, find the single missing number.",
    description: `Have the function \`FindMissingNumber(int[] arr)\` take the array of integers \`arr\` which contains distinct numbers from \`1\` to \`n + 1\` where one number is missing, and return the missing integer.

For example: if \`arr\` is \`[1, 2, 3, 5, 6]\`, the array length is 5, meaning the complete sequence spans 1 to 6. The missing number is \`4\`.`,
    constraints: [
      "1 <= arr.Length <= 100,000",
      "Numbers are in range [1, arr.Length + 1]",
      "All integers in arr are distinct"
    ],
    examples: [
      {
        input: 'arr = [1, 2, 3, 5, 6]',
        output: '4',
        explanation: "The complete set is 1..6; 4 is absent."
      },
      {
        input: 'arr = [2, 3, 4, 5, 6]',
        output: '1',
        explanation: "1 is missing from the beginning."
      },
      {
        input: 'arr = [1, 2, 3, 4, 5, 6, 7, 8, 10]',
        output: '9',
        explanation: "9 is missing."
      }
    ],
    nzInterviewContext: "Frequently asked at automotive parts data platforms like Partly where continuous catalog part ID sequences or vehicle variant IDs must be checked for gaps.",
    seniorEngineeringTips: [
      "Apply the Gaussian sum formula (n*(n+1)/2) to calculate expected sum in O(1) time without extra memory.",
      "Use 64-bit integers (long) for accumulators to prevent integer overflow on large arrays.",
      "Alternatively, XOR all elements with 1..(n+1) to guarantee zero chance of arithmetic overflow."
    ],
    starterCode: `using System;

class MainClass {

  public static int FindMissingNumber(int[] arr) {

    // code goes here  
    return 0;

  }

  static void Main() {  
    Console.WriteLine(FindMissingNumber(new int[] { 1, 2, 3, 5, 6 }));
  }

}`,
    referenceSolution: `using System;

class MainClass {

  public static int FindMissingNumber(int[] arr) {
    long n = arr.Length + 1;
    long expectedSum = (n * (n + 1)) / 2;
    long actualSum = 0;

    foreach (int num in arr) {
      actualSum += num;
    }

    return (int)(expectedSum - actualSum);
  }

  static void Main() {  
    Console.WriteLine(FindMissingNumber(new int[] { 1, 2, 3, 5, 6 }));
  }

}`,
    solutionExplanation: `For an array of length N, the complete sequence contains N + 1 numbers spanning 1 to N + 1. The sum of 1 through N + 1 is given by (N + 1) * (N + 2) / 2. Subtracting the actual sum of array elements yields the missing value in O(N) time and O(1) space.`,
    testCases: [
      { id: "tc-1", inputDisplay: "[1, 2, 3, 5, 6]", input: [1, 2, 3, 5, 6], expected: 4 },
      { id: "tc-2", inputDisplay: "[2, 3, 4, 5, 6]", input: [2, 3, 4, 5, 6], expected: 1 },
      { id: "tc-3", inputDisplay: "[1, 2, 3, 4, 5, 6, 7, 8, 10]", input: [1, 2, 3, 4, 5, 6, 7, 8, 10], expected: 9 },
      { id: "tc-4", inputDisplay: "[1, 2]", input: [1, 2], expected: 3, isHidden: true },
      { id: "tc-5", inputDisplay: "[2]", input: [2], expected: 1, isHidden: true }
    ],
    hints: {
      level1: "What should the sum of numbers from 1 to N+1 be?",
      level2: "The formula for the sum of integers from 1 to K is K * (K + 1) / 2, where K = arr.Length + 1.",
      level3: "Calculate the expected sum and subtract the sum of all elements currently in the array."
    }
  },

  // 7. Find Duplicate Numbers
  {
    id: "find-duplicate-numbers",
    title: "Find Duplicate Numbers",
    slug: "find-duplicate-numbers",
    level: 2,
    levelName: "Level 2 — Arrays & Collections",
    difficulty: "Easy",
    category: "Arrays & Collections",
    nzCompany: "Seequent",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Return all numbers that appear more than once, sorted in ascending order.",
    description: `Have the function \`FindDuplicateNumbers(int[] arr)\` take the array of integers \`arr\` and return a comma-separated string containing all numbers that appear more than once in \`arr\`, sorted in ascending order. If there are no duplicate numbers, return the string \`"none"\`.

For example: if \`arr\` is \`[1, 2, 3, 4, 2, 5, 3]\`, the numbers \`2\` and \`3\` appear multiple times. The output should be \`"2, 3"\`.`,
    constraints: [
      "1 <= arr.Length <= 100,000",
      "-1,000,000 <= arr[i] <= 1,000,000"
    ],
    examples: [
      {
        input: 'arr = [1, 2, 3, 4, 2, 5, 3]',
        output: '"2, 3"',
        explanation: "2 and 3 both appear twice."
      },
      {
        input: 'arr = [1, 1, 2, 2, 3, 3]',
        output: '"1, 2, 3"',
        explanation: "All elements have duplicates."
      },
      {
        input: 'arr = [5, 8, 9, 10]',
        output: '"none"',
        explanation: "Every number is unique."
      }
    ],
    nzInterviewContext: "Asked at geoscience and enterprise software firms like Seequent to evaluate duplicate sensor/coordinate telemetry detection and collection set operations.",
    seniorEngineeringTips: [
      "Track seen elements with a HashSet<int> in O(1) time per item to capture duplicates without nested loops.",
      "Store unique duplicate entries in a second HashSet<int> to avoid adding repeated duplicates.",
      "Sort the final duplicate collection before joining with comma and space."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string FindDuplicateNumbers(int[] arr) {

    // code goes here  
    return "none";

  }

  static void Main() {  
    Console.WriteLine(FindDuplicateNumbers(new int[] { 1, 2, 3, 4, 2, 5, 3 }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string FindDuplicateNumbers(int[] arr) {
    if (arr == null || arr.Length == 0) return "none";

    var seen = new HashSet<int>();
    var duplicates = new HashSet<int>();

    foreach (int num in arr) {
      if (seen.Contains(num)) {
        duplicates.Add(num);
      } else {
        seen.Add(num);
      }
    }

    if (duplicates.Count == 0) return "none";

    var list = new List<int>(duplicates);
    list.Sort();

    return string.Join(", ", list);
  }

  static void Main() {  
    Console.WriteLine(FindDuplicateNumbers(new int[] { 1, 2, 3, 4, 2, 5, 3 }));
  }

}`,
    solutionExplanation: `We iterate through the array maintaining a \`seen\` set. When a number is already in \`seen\`, we add it to the \`duplicates\` set. Finally, we convert the duplicates to a list, sort it in ascending order, and format as comma-separated values.`,
    testCases: [
      { id: "tc-1", inputDisplay: "[1, 2, 3, 4, 2, 5, 3]", input: [1, 2, 3, 4, 2, 5, 3], expected: "2, 3" },
      { id: "tc-2", inputDisplay: "[1, 1, 2, 2, 3, 3]", input: [1, 1, 2, 2, 3, 3], expected: "1, 2, 3" },
      { id: "tc-3", inputDisplay: "[5, 8, 9, 10]", input: [5, 8, 9, 10], expected: "none" },
      { id: "tc-4", inputDisplay: "[4, 4, 4, 4]", input: [4, 4, 4, 4], expected: "4", isHidden: true },
      { id: "tc-5", inputDisplay: "[-2, 5, -2, 0, 7, 0]", input: [-2, 5, -2, 0, 7, 0], expected: "-2, 0", isHidden: true }
    ],
    hints: {
      level1: "How can you tell if an item has been visited before in O(1) time?",
      level2: "Use a HashSet<int> called 'seen'. If an element is already in 'seen', add it to a 'duplicates' set.",
      level3: "If 'duplicates' is empty, return 'none'. Otherwise sort the duplicates and join them."
    }
  },

  // 8. Two Sum
  {
    id: "two-sum",
    title: "Two Sum",
    slug: "two-sum",
    level: 2,
    levelName: "Level 2 — Arrays & Collections",
    difficulty: "Medium",
    category: "Arrays & Collections",
    nzCompany: "Xero",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Find the 0-based indices of two numbers that add up to a target sum.",
    description: `Have the function \`TwoSum(string[] strArr)\` take \`strArr\` which contains two elements:
- \`strArr[0]\`: a comma-separated list of integers
- \`strArr[1]\`: a target integer

Return the 0-based indices of the two numbers that sum to the target value formatted as \`"[i, j]"\` where \`i < j\`. If no pair sums to the target, return \`"[]"\`.

For example: if \`strArr\` is \`["2, 7, 11, 15", "9"]\`, the target is 9. The numbers at index 0 (2) and index 1 (7) sum to 9, so the function should return \`"[0, 1]"\`.`,
    constraints: [
      "2 <= number of elements in strArr[0] <= 50,000",
      "-1,000,000 <= values, target <= 1,000,000",
      "Exactly one valid pair exists or none"
    ],
    examples: [
      {
        input: 'strArr = ["2, 7, 11, 15", "9"]',
        output: '"[0, 1]"',
        explanation: "2 + 7 = 9 at indices 0 and 1."
      },
      {
        input: 'strArr = ["3, 2, 4", "6"]',
        output: '"[1, 2]"',
        explanation: "2 + 4 = 6 at indices 1 and 2."
      },
      {
        input: 'strArr = ["3, 3", "6"]',
        output: '"[0, 1]"',
        explanation: "3 + 3 = 6 at indices 0 and 1."
      }
    ],
    nzInterviewContext: "The classic algorithmic interview problem universally tested at Xero, AWS, and tech startups to assess hash map lookup optimization over brute-force O(N^2).",
    seniorEngineeringTips: [
      "Store complement lookups (target - current) in a Dictionary<int, int> mapping value to index.",
      "Complete the search in a single pass: check for complement before inserting current value.",
      "Pre-size dictionary capacity if input size is known to prevent rehashing overhead."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string TwoSum(string[] strArr) {

    // code goes here  
    return "[]";

  }

  static void Main() {  
    Console.WriteLine(TwoSum(new string[] { "2, 7, 11, 15", "9" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string TwoSum(string[] strArr) {
    if (strArr == null || strArr.Length < 2) return "[]";

    string[] numStrs = strArr[0].Split(',', StringSplitOptions.TrimEntries);
    int target = int.Parse(strArr[1].Trim());

    var map = new Dictionary<int, int>();
    for (int i = 0; i < numStrs.Length; i++) {
      int val = int.Parse(numStrs[i]);
      int complement = target - val;

      if (map.ContainsKey(complement)) {
        return "[" + map[complement] + ", " + i + "]";
      }

      if (!map.ContainsKey(val)) {
        map[val] = i;
      }
    }

    return "[]";
  }

  static void Main() {  
    Console.WriteLine(TwoSum(new string[] { "2, 7, 11, 15", "9" }));
  }

}`,
    solutionExplanation: `We parse the numbers and iterate through them with a single pass. For each element, we compute complement = target - val. If the complement exists in our Dictionary<int, int>, we immediately return the stored index and current index. Otherwise, we record the current value and index. Total time is O(N) and space is O(N).`,
    testCases: [
      { id: "tc-1", inputDisplay: '["2, 7, 11, 15", "9"]', input: ["2, 7, 11, 15", "9"], expected: "[0, 1]" },
      { id: "tc-2", inputDisplay: '["3, 2, 4", "6"]', input: ["3, 2, 4", "6"], expected: "[1, 2]" },
      { id: "tc-3", inputDisplay: '["3, 3", "6"]', input: ["3, 3", "6"], expected: "[0, 1]" },
      { id: "tc-4", inputDisplay: '["1, 5, 7, 11, 19", "20"]', input: ["1, 5, 7, 11, 19", "20"], expected: "[0, 4]", isHidden: true },
      { id: "tc-5", inputDisplay: '["-3, 4, 3, 90", "0"]', input: ["-3, 4, 3, 90", "0"], expected: "[0, 2]", isHidden: true }
    ],
    hints: {
      level1: "A nested loop checks every pair in O(N^2) time, but you can do this in O(N) time with a hash map.",
      level2: "For any number x, the number required to reach target is (target - x).",
      level3: "As you iterate through the list, check if (target - x) is in your Dictionary. If yes, you found the pair."
    }
  },

  // 9. Find Largest and Smallest Number
  {
    id: "find-largest-smallest-number",
    title: "Find Largest and Smallest Number",
    slug: "find-largest-smallest-number",
    level: 2,
    levelName: "Level 2 — Arrays & Collections",
    difficulty: "Easy",
    category: "Arrays & Collections",
    nzCompany: "Datacom",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Find minimum and maximum values in an array in a single pass without sorting.",
    description: `Have the function \`FindMinMax(int[] arr)\` read the array of integers stored in \`arr\` and return a string formatted as \`"Min = X, Max = Y"\` where \`X\` is the smallest integer in \`arr\` and \`Y\` is the largest integer.

Do not sort the array (avoid O(N log N)); find both values in a single O(N) linear pass.`,
    constraints: [
      "1 <= arr.Length <= 100,000",
      "-1,000,000 <= arr[i] <= 1,000,000"
    ],
    examples: [
      {
        input: 'arr = [10, 4, 25, 7, 2]',
        output: '"Min = 2, Max = 25"',
        explanation: "Smallest is 2, largest is 25."
      },
      {
        input: 'arr = [-5, 0, 100, -20, 50]',
        output: '"Min = -20, Max = 100"',
        explanation: "-20 is min, 100 is max."
      },
      {
        input: 'arr = [42]',
        output: '"Min = 42, Max = 42"',
        explanation: "Single element array."
      }
    ],
    nzInterviewContext: "A classic baseline question to verify linear search mechanics, boundary condition handling (such as single-element arrays), and avoiding unnecessary sorting overhead.",
    seniorEngineeringTips: [
      "Initialize min and max with arr[0] instead of arbitrary constants like 0 or int.MaxValue.",
      "Scan from index 1 to N-1, updating min and max with simple comparisons.",
      "Execution time is strictly O(N) comparisons with O(1) memory."
    ],
    starterCode: `using System;

class MainClass {

  public static string FindMinMax(int[] arr) {

    // code goes here  
    return "Min = 0, Max = 0";

  }

  static void Main() {  
    Console.WriteLine(FindMinMax(new int[] { 10, 4, 25, 7, 2 }));
  }

}`,
    referenceSolution: `using System;

class MainClass {

  public static string FindMinMax(int[] arr) {
    if (arr == null || arr.Length == 0) return "Min = 0, Max = 0";

    int min = arr[0];
    int max = arr[0];

    for (int i = 1; i < arr.Length; i++) {
      if (arr[i] < min) min = arr[i];
      if (arr[i] > max) max = arr[i];
    }

    return "Min = " + min + ", Max = " + max;
  }

  static void Main() {  
    Console.WriteLine(FindMinMax(new int[] { 10, 4, 25, 7, 2 }));
  }

}`,
    solutionExplanation: `We initialize min and max with the first element of the array. We then iterate from index 1 through the rest of the array, updating min and max whenever a smaller or larger element is seen.`,
    testCases: [
      { id: "tc-1", inputDisplay: "[10, 4, 25, 7, 2]", input: [10, 4, 25, 7, 2], expected: "Min = 2, Max = 25" },
      { id: "tc-2", inputDisplay: "[-5, 0, 100, -20, 50]", input: [-5, 0, 100, -20, 50], expected: "Min = -20, Max = 100" },
      { id: "tc-3", inputDisplay: "[42]", input: [42], expected: "Min = 42, Max = 42" },
      { id: "tc-4", inputDisplay: "[5, 5, 5, 5]", input: [5, 5, 5, 5], expected: "Min = 5, Max = 5", isHidden: true },
      { id: "tc-5", inputDisplay: "[-1000, 1000]", input: [-1000, 1000], expected: "Min = -1000, Max = 1000", isHidden: true }
    ],
    hints: {
      level1: "Initialize min and max to the first element in the array.",
      level2: "Loop through the rest of the array from index 1 onwards.",
      level3: "If current < min, update min. If current > max, update max."
    }
  },

  // 10. Remove Duplicates
  {
    id: "remove-duplicates",
    title: "Remove Duplicates",
    slug: "remove-duplicates",
    level: 2,
    levelName: "Level 2 — Arrays & Collections",
    difficulty: "Easy",
    category: "Arrays & Collections",
    nzCompany: "Fisher & Paykel",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Return unique values preserving original relative insertion order.",
    description: `Have the function \`RemoveDuplicates(int[] arr)\` take the array of integers \`arr\` and return a comma-separated string containing the unique values from \`arr\`, preserving their original order of appearance.

For example: if \`arr\` is \`[1, 2, 2, 3, 4, 4, 5]\`, the result should be \`"1, 2, 3, 4, 5"\`.`,
    constraints: [
      "1 <= arr.Length <= 100,000",
      "-1,000,000 <= arr[i] <= 1,000,000"
    ],
    examples: [
      {
        input: 'arr = [1, 2, 2, 3, 4, 4, 5]',
        output: '"1, 2, 3, 4, 5"',
        explanation: "Duplicate 2 and 4 removed, order preserved."
      },
      {
        input: 'arr = [7, 3, 7, 2, 3, 9, 1]',
        output: '"7, 3, 2, 9, 1"',
        explanation: "Preserves first occurrence order."
      }
    ],
    nzInterviewContext: "Frequently tested at Fisher & Paykel IoT and smart appliance divisions to filter duplicate telemetry messages and device state updates.",
    seniorEngineeringTips: [
      "Use HashSet<int> to achieve O(1) membership checking per item.",
      "Maintain a separate List<int> to preserve deterministic insertion order.",
      "String.Join provides clean separation without trailing separators."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string RemoveDuplicates(int[] arr) {

    // code goes here  
    return "";

  }

  static void Main() {  
    Console.WriteLine(RemoveDuplicates(new int[] { 1, 2, 2, 3, 4, 4, 5 }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string RemoveDuplicates(int[] arr) {
    if (arr == null || arr.Length == 0) return "";

    var seen = new HashSet<int>();
    var result = new List<int>();

    foreach (int num in arr) {
      if (!seen.Contains(num)) {
        seen.Add(num);
        result.Add(num);
      }
    }

    return string.Join(", ", result);
  }

  static void Main() {  
    Console.WriteLine(RemoveDuplicates(new int[] { 1, 2, 2, 3, 4, 4, 5 }));
  }

}`,
    solutionExplanation: `We iterate through the input integers. We maintain a HashSet to check if we have seen the integer before. If it has not been seen, we add it to the set and our result list. This preserves exact arrival order while dropping duplicates in O(N) time.`,
    testCases: [
      { id: "tc-1", inputDisplay: "[1, 2, 2, 3, 4, 4, 5]", input: [1, 2, 2, 3, 4, 4, 5], expected: "1, 2, 3, 4, 5" },
      { id: "tc-2", inputDisplay: "[7, 3, 7, 2, 3, 9, 1]", input: [7, 3, 7, 2, 3, 9, 1], expected: "7, 3, 2, 9, 1" },
      { id: "tc-3", inputDisplay: "[10, 10, 10]", input: [10, 10, 10], expected: "10" },
      { id: "tc-4", inputDisplay: "[5, 4, 3, 2, 1]", input: [5, 4, 3, 2, 1], expected: "5, 4, 3, 2, 1", isHidden: true },
      { id: "tc-5", inputDisplay: "[-1, 0, -1, 2, 0]", input: [-1, 0, -1, 2, 0], expected: "-1, 0, 2", isHidden: true }
    ],
    hints: {
      level1: "You need a way to know if an item was already encountered, while keeping the items in order.",
      level2: "Use a HashSet<int> to store seen values and a List<int> to store unique items in order.",
      level3: "If seen.Add(num) returns true (or !seen.Contains(num)), add num to the list."
    }
  }
];
