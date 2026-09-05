import { Challenge } from "../types";

export const CHALLENGES: Challenge[] = [
  {
    id: "find-intersection",
    title: "Find Intersection",
    slug: "find-intersection",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte / Google Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N + M)",
    expectedSpaceComplexity: "O(min(N, M))",
    shortDescription: "Read two sorted comma-separated string lists and return the intersection in sorted order, or 'false'.",
    description: `Have the function \`FindIntersection(string[] strArr)\` read the array of strings stored in \`strArr\` which will contain 2 elements: the first element will represent a list of comma-separated numbers sorted in ascending order, the second element will represent a second list of comma-separated numbers (also sorted).

Your goal is to return a comma-separated string containing the numbers that occur in elements of \`strArr\` in sorted order. If there is no intersection, return the string \`false\`.

For example: if \`strArr\` contains \`["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]\` the output should return \`"1,4,13"\` because those numbers appear in both strings. The input will not be empty and each sublist will contain at least 1 number.`,
    constraints: [
      "strArr.Length == 2",
      "1 <= numbers in each string <= 100,000",
      "All numbers are sorted in ascending order and comma-separated with spaces (e.g. '1, 3, 4, 7')",
      "Negative and positive integers may appear."
    ],
    examples: [
      {
        input: 'strArr = ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]',
        output: '"1,4,13"',
        explanation: "1, 4, and 13 exist in both lists."
      },
      {
        input: 'strArr = ["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"]',
        output: '"1,9,10"',
        explanation: "Common numbers are 1, 9, and 10."
      },
      {
        input: 'strArr = ["2, 5, 7", "3, 6, 8"]',
        output: '"false"',
        explanation: "No intersection exists, so return the string 'false'."
      }
    ],
    nzInterviewContext: "Ranked as the #1 most frequently assigned Coderbyte screening problem by major tech companies. Senior interviewers look for two-pointer linear scans or HashSet lookups with zero redundant allocations.",
    seniorEngineeringTips: [
      "Because both lists are pre-sorted, use a Two Pointers scan to achieve O(N + M) time with minimal allocations.",
      "Parse numbers using ReadOnlySpan<char> or split carefully to avoid high-volume garbage collection on large feeds.",
      "Remember to return the literal string \"false\" when the intersection is empty."
    ],
    starterCode: `using System;

class MainClass {

  public static string FindIntersection(string[] strArr) {

    // code goes here  
    return strArr[0];

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(FindIntersection(new string[] { "1, 3, 4, 7, 13", "1, 2, 4, 13, 15" }));
  } 

}`,
    referenceSolution: `using System;
using System.Collections.Generic;
using System.Linq;

class MainClass {

  public static string FindIntersection(string[] strArr) {
    if (strArr == null || strArr.Length < 2) return "false";

    string[] firstParts = strArr[0].Split(',', StringSplitOptions.TrimEntries);
    string[] secondParts = strArr[1].Split(',', StringSplitOptions.TrimEntries);

    var firstSet = new HashSet<string>(firstParts);
    var intersection = new List<string>();

    foreach (var num in secondParts) {
      if (firstSet.Contains(num)) {
        intersection.Add(num);
      }
    }

    return intersection.Count > 0 ? string.Join(",", intersection) : "false";
  }

  static void Main() {  
    Console.WriteLine(FindIntersection(new string[] { "1, 3, 4, 7, 13", "1, 2, 4, 13, 15" }));
  } 

}`,
    solutionExplanation: "We parse the two comma-separated lists. We place the elements of the first list into a HashSet for O(1) lookup. Then we iterate through the second list; any element present in the set is collected into the intersection list in sorted order. If the intersection list is non-empty, we join with commas; otherwise return 'false'. Total time complexity is O(N + M).",
    testCases: [
      {
        id: "fi-1",
        inputDisplay: '["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]',
        input: ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"],
        expected: "1,4,13",
        explanation: "1, 4, 13 are shared"
      },
      {
        id: "fi-2",
        inputDisplay: '["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"]',
        input: ["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"],
        expected: "1,9,10",
        explanation: "Matches 1, 9, 10"
      },
      {
        id: "fi-3",
        inputDisplay: '["2, 5, 7", "3, 6, 8"]',
        input: ["2, 5, 7", "3, 6, 8"],
        expected: "false",
        explanation: "No overlapping numbers"
      },
      {
        id: "fi-4",
        inputDisplay: '["10, 20, 30", "10, 20, 30"]',
        input: ["10, 20, 30", "10, 20, 30"],
        expected: "10,20,30",
        explanation: "Identical lists"
      },
      {
        id: "fi-5-hidden",
        inputDisplay: '["1, 5, 6, 7, 10, 11, 12", "5, 6, 10, 13, 14"]',
        input: ["1, 5, 6, 7, 10, 11, 12", "5, 6, 10, 13, 14"],
        expected: "5,6,10",
        isHidden: true,
        explanation: "Overlapping elements in multiple ranges"
      },
      {
        id: "fi-6-hidden",
        inputDisplay: '["100, 200", "50, 75, 90"]',
        input: ["100, 200", "50, 75, 90"],
        expected: "false",
        isHidden: true,
        explanation: "Disjoint sets"
      }
    ],
    hints: {
      level1: "Convert the string inputs into separate arrays of numbers.",
      level2: "Since the lists are sorted, you can either use a HashSet for O(1) membership or two pointers advancing through both lists.",
      level3: "If your matched list has 0 elements, return 'false' as a string, not false as a boolean."
    }
  },
  {
    id: "questions-marks",
    title: "Questions Marks",
    slug: "questions-marks",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte / Amazon Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Check if there are exactly 3 question marks between every pair of two numbers adding up to 10.",
    description: `Have the function \`QuestionsMarks(string str)\` take the \`str\` string parameter, which will contain single digit numbers, letters, and question marks, and check if there are exactly 3 question marks between every pair of two numbers that add up to 10.

If so, then your program should return the string \`true\`, otherwise it should return the string \`false\`. If there aren't any two numbers that add up to 10 in the string, then your program should return \`false\` as well.

For example: if \`str\` is \`"arrb6???4xxbl5???eee5"\` then your program should return \`true\` because there are 3 question marks between 6 and 4, and 3 question marks between 5 and 5 at the end of the string.`,
    constraints: [
      "1 <= str.Length <= 1,000",
      "str contains digits ('0'-'9'), English letters ('a'-'z', 'A'-'Z'), and '?' symbols.",
      "Digits are single characters from 0 to 9."
    ],
    examples: [
      {
        input: 'str = "arrb6???4xxbl5???eee5"',
        output: '"true"',
        explanation: "6 + 4 = 10 with 3 question marks. 5 + 5 = 10 with 3 question marks. All valid."
      },
      {
        input: 'str = "aa6?9"',
        output: '"false"',
        explanation: "6 + 9 != 10 and no pairs add to 10."
      },
      {
        input: 'str = "acc?7??sss?3rr1??????5"',
        output: '"true"',
        explanation: "7 + 3 = 10 with 3 '?' between them. 1 + 5 != 10."
      }
    ],
    nzInterviewContext: "One of Coderbyte's most famous string validation challenges. Interviewers evaluate state machine thinking, loop bounds, and ensuring candidates don't return 'true' when no pairs sum to 10.",
    seniorEngineeringTips: [
      "Keep track of the last seen digit and count of question marks seen since that digit.",
      "Make sure you maintain a boolean flag hasPairSummingToTen so strings with no valid pairs return 'false'.",
      "A single linear pass achieves O(N) time with O(1) auxiliary space."
    ],
    starterCode: `using System;

class MainClass {

  public static string QuestionsMarks(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(QuestionsMarks(Console.ReadLine()));
  } 

}`,
    referenceSolution: `using System;

class MainClass {

  public static string QuestionsMarks(string str) {
    if (string.IsNullOrEmpty(str)) return "false";

    int lastDigit = -1;
    int questionMarkCount = 0;
    bool foundSumOfTen = false;

    for (int i = 0; i < str.Length; i++) {
      char c = str[i];

      if (char.IsDigit(c)) {
        int currentDigit = c - '0';

        if (lastDigit != -1) {
          if (lastDigit + currentDigit == 10) {
            if (questionMarkCount != 3) {
              return "false";
            }
            foundSumOfTen = true;
          }
        }

        lastDigit = currentDigit;
        questionMarkCount = 0;
      } else if (c == '?') {
        questionMarkCount++;
      }
    }

    return foundSumOfTen ? "true" : "false";
  }

  static void Main() {  
    Console.WriteLine(QuestionsMarks(Console.ReadLine()));
  } 

}`,
    solutionExplanation: "We perform a single pass over the string while tracking the previous digit and counting question marks. Whenever a new digit is encountered, if it and the previous digit sum to 10, we assert that exactly 3 question marks occurred between them; if not, we immediately return 'false'. Finally, we return 'true' if at least one pair summed to 10, otherwise 'false'.",
    testCases: [
      {
        id: "qm-1",
        inputDisplay: '"arrb6???4xxbl5???eee5"',
        input: "arrb6???4xxbl5???eee5",
        expected: "true",
        explanation: "Both (6,4) and (5,5) have exactly 3 '?'"
      },
      {
        id: "qm-2",
        inputDisplay: '"aa6?9"',
        input: "aa6?9",
        expected: "false",
        explanation: "No pairs sum to 10"
      },
      {
        id: "qm-3",
        inputDisplay: '"acc?7??sss?3rr1??????5"',
        input: "acc?7??sss?3rr1??????5",
        expected: "true",
        explanation: "7 and 3 sum to 10 with 3 '?'"
      },
      {
        id: "qm-4",
        inputDisplay: '"5??aaaaaaaaaaaaaaaaaaa?5?5"',
        input: "5??aaaaaaaaaaaaaaaaaaa?5?5",
        expected: "false",
        explanation: "Second pair (5,5) only has 1 '?'"
      },
      {
        id: "qm-5-hidden",
        inputDisplay: '"9???1???9???1???9"',
        input: "9???1???9???1???9",
        expected: "true",
        isHidden: true,
        explanation: "Multiple contiguous pairs all summing to 10 with 3 '?'"
      },
      {
        id: "qm-6-hidden",
        inputDisplay: '"mbe1a3"',
        input: "mbe1a3",
        expected: "false",
        isHidden: true,
        explanation: "No pairs sum to 10"
      }
    ],
    hints: {
      level1: "Iterate through the string and check characters using char.IsDigit().",
      level2: "Reset the question mark counter only when a new digit is found, after checking the sum with the previous digit.",
      level3: "If lastDigit + currentDigit == 10 and questionCount != 3, return 'false' right away."
    }
  },
  {
    id: "min-window-substring",
    title: "Min Window Substring",
    slug: "min-window-substring",
    difficulty: "Hard",
    category: "Two Pointers & Sliding Window",
    nzCompany: "Coderbyte / Meta Assessment",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N + K)",
    expectedSpaceComplexity: "O(K)",
    shortDescription: "Find the smallest substring of N that contains all characters in K.",
    description: `Have the function \`MinWindowSubstring(string[] strArr)\` take the array of strings stored in \`strArr\`, which will contain only two strings, the first parameter being \`N\` and the second parameter being \`K\`.

Your goal is to determine the smallest substring of \`N\` that contains all the characters in \`K\` (including duplicate characters).

For example: if \`strArr\` is \`["ahffaksfajeeubsne", "jefaa"]\` then the smallest substring of \`N\` that contains the characters \`a, e, f, j, a\` is \`"aksfaje"\`. The smallest substring will always be unique and exist in \`N\`.`,
    constraints: [
      "strArr.Length == 2",
      "1 <= K.Length <= N.Length <= 10,000",
      "Both N and K consist of lowercase English letters."
    ],
    examples: [
      {
        input: 'strArr = ["ahffaksfajeeubsne", "jefaa"]',
        output: '"aksfaje"',
        explanation: "'aksfaje' contains 2 'a's, 1 'e', 1 'f', and 1 'j'."
      },
      {
        input: 'strArr = ["aaffhkksemckelloe", "fhea"]',
        output: '"affhkkse"',
        explanation: "Smallest substring containing f, h, e, a."
      },
      {
        input: 'strArr = ["aabdccdbcaca", "aad"]',
        output: '"aabd"',
        explanation: "Shortest window covering 'a', 'a', and 'd'."
      }
    ],
    nzInterviewContext: "The definitive Sliding Window benchmark problem on Coderbyte. Often used by FAANG and tier-1 companies to screen candidates on two-pointer window expansion and contraction.",
    seniorEngineeringTips: [
      "Use an integer array of size 128 or Dictionary<char, int> to track required vs window character frequencies.",
      "Expand the right pointer until all characters in K are matched, then contract the left pointer to find the minimum valid window.",
      "Achieves optimal O(N + K) runtime without quadratic substring slicing."
    ],
    starterCode: `using System;

class MainClass {

  public static string MinWindowSubstring(string[] strArr) {

    // code goes here  
    return strArr[0];

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(MinWindowSubstring(new string[] { "ahffaksfajeeubsne", "jefaa" }));
  } 

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string MinWindowSubstring(string[] strArr) {
    if (strArr == null || strArr.Length < 2) return "";
    string n = strArr[0];
    string k = strArr[1];

    var targetFreq = new Dictionary<char, int>();
    foreach (char c in k) {
      if (!targetFreq.ContainsKey(c)) targetFreq[c] = 0;
      targetFreq[c]++;
    }

    int required = targetFreq.Count;
    var windowFreq = new Dictionary<char, int>();
    int formed = 0;

    int left = 0;
    int minLen = int.MaxValue;
    int minLeft = 0;

    for (int right = 0; right < n.Length; right++) {
      char c = n[right];
      if (!windowFreq.ContainsKey(c)) windowFreq[c] = 0;
      windowFreq[c]++;

      if (targetFreq.ContainsKey(c) && windowFreq[c] == targetFreq[c]) {
        formed++;
      }

      while (left <= right && formed == required) {
        int windowLen = right - left + 1;
        if (windowLen < minLen) {
          minLen = windowLen;
          minLeft = left;
        }

        char leftChar = n[left];
        windowFreq[leftChar]--;
        if (targetFreq.ContainsKey(leftChar) && windowFreq[leftChar] < targetFreq[leftChar]) {
          formed--;
        }
        left++;
      }
    }

    return minLen == int.MaxValue ? "" : n.Substring(minLeft, minLen);
  }

  static void Main() {  
    Console.WriteLine(MinWindowSubstring(new string[] { "ahffaksfajeeubsne", "jefaa" }));
  } 

}`,
    solutionExplanation: "We implement the classic Two-Pointer Sliding Window algorithm. A frequency map records character requirements of K. We advance the right pointer to expand the window until all characters are satisfied. Then, while the window remains valid, we contract the left pointer to discover the minimal valid substring. This guarantees O(N + K) time.",
    testCases: [
      {
        id: "mws-1",
        inputDisplay: '["ahffaksfajeeubsne", "jefaa"]',
        input: ["ahffaksfajeeubsne", "jefaa"],
        expected: "aksfaje",
        explanation: "Smallest valid window"
      },
      {
        id: "mws-2",
        inputDisplay: '["aaffhkksemckelloe", "fhea"]',
        input: ["aaffhkksemckelloe", "fhea"],
        expected: "affhkkse",
        explanation: "Matches f, h, e, a"
      },
      {
        id: "mws-3",
        inputDisplay: '["aabdccdbcaca", "aad"]',
        input: ["aabdccdbcaca", "aad"],
        expected: "aabd",
        explanation: "Prefix window"
      },
      {
        id: "mws-4",
        inputDisplay: '["vvaaaaaa", "v"]',
        input: ["vvaaaaaa", "v"],
        expected: "v",
        explanation: "Single character match"
      },
      {
        id: "mws-5-hidden",
        inputDisplay: '["caae", "cae"]',
        input: ["caae", "cae"],
        expected: "caae",
        isHidden: true,
        explanation: "Full string needed"
      }
    ],
    hints: {
      level1: "Count character frequencies in K first.",
      level2: "Use two pointers: right to expand the window until it contains all characters of K, left to shrink it as much as possible.",
      level3: "Keep track of minLeft and minLen whenever the window is valid, updating only when a smaller length is found."
    }
  },
  {
    id: "bracket-matcher",
    title: "Bracket Matcher",
    slug: "bracket-matcher",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte / Stripe Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Return 1 if brackets '(' and ')' are correctly matched and balanced, else return 0.",
    description: `Have the function \`BracketMatcher(string str)\` take the \`str\` parameter being passed and return \`1\` if the brackets are correctly matched and each one is accounted for. Otherwise return \`0\`.

For example: if \`str\` is \`"(hello (world))"\`, then the output should be \`1\`, but if \`str\` is \`"((hello (world))"\` then the output should be \`0\` because the brackets do not match up.

Only \`(\` and \`)\` will be used as brackets. If \`str\` contains no brackets return \`1\`.`,
    constraints: [
      "1 <= str.Length <= 10,000",
      "str may contain letters, numbers, spaces, and punctuation.",
      "Return integer string '1' or '0'."
    ],
    examples: [
      {
        input: 'str = "(c(oder)) b(yte)"',
        output: '"1"',
        explanation: "Every opening bracket has a corresponding closing bracket."
      },
      {
        input: 'str = "(coder)(byte))"',
        output: '"0"',
        explanation: "An unmatched closing bracket exists at the end."
      },
      {
        input: 'str = "the color (purple (is)) (nice)"',
        output: '"1"',
        explanation: "Properly balanced brackets."
      }
    ],
    nzInterviewContext: "A quintessential Coderbyte problem that checks whether a candidate understands bracket balance with constant O(1) space rather than allocating unnecessary Stack<char> data structures.",
    seniorEngineeringTips: [
      "Since there is only one bracket type ('(' and ')'), an integer counter tracks depth with zero heap allocation.",
      "If the counter ever drops below 0, return '0' immediately (early exit).",
      "At the end of the string, if counter == 0 return '1', otherwise '0'."
    ],
    starterCode: `using System;

class MainClass {

  public static string BracketMatcher(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(BracketMatcher(Console.ReadLine()));
  } 

}`,
    referenceSolution: `using System;

class MainClass {

  public static string BracketMatcher(string str) {
    if (str == null) return "1";

    int balance = 0;
    foreach (char c in str) {
      if (c == '(') {
        balance++;
      } else if (c == ')') {
        balance--;
        if (balance < 0) {
          return "0";
        }
      }
    }

    return balance == 0 ? "1" : "0";
  }

  static void Main() {  
    Console.WriteLine(BracketMatcher(Console.ReadLine()));
  } 

}`,
    solutionExplanation: "We iterate through the string maintaining a balance counter. For every '(', increment balance. For every ')', decrement balance. If balance becomes negative at any moment, a closing bracket appeared without a matching opening bracket, so we return '0'. At the end, if balance is 0, return '1', otherwise '0'. Space complexity is O(1).",
    testCases: [
      {
        id: "bm-1",
        inputDisplay: '"(c(oder)) b(yte)"',
        input: "(c(oder)) b(yte)",
        expected: "1",
        explanation: "All brackets matched"
      },
      {
        id: "bm-2",
        inputDisplay: '"(coder)(byte))"',
        input: "(coder)(byte))",
        expected: "0",
        explanation: "Unmatched closing bracket"
      },
      {
        id: "bm-3",
        inputDisplay: '"the color (purple (is)) (nice)"',
        input: "the color (purple (is)) (nice)",
        expected: "1",
        explanation: "Nested brackets balanced"
      },
      {
        id: "bm-4",
        inputDisplay: '")("',
        input: ")(",
        expected: "0",
        explanation: "Closed before opened"
      },
      {
        id: "bm-5-hidden",
        inputDisplay: '"letter(s) and (words)"',
        input: "letter(s) and (words)",
        expected: "1",
        isHidden: true,
        explanation: "Simple non-nested pairs"
      },
      {
        id: "bm-6-hidden",
        inputDisplay: '"((("',
        input: "(((",
        expected: "0",
        isHidden: true,
        explanation: "Unclosed opening brackets"
      }
    ],
    hints: {
      level1: "Count opening and closing brackets as you scan the string.",
      level2: "Can you solve it without a Stack, using just a single integer counter?",
      level3: "If your count ever drops below zero, return '0' immediately."
    }
  },
  {
    id: "tree-constructor",
    title: "Tree Constructor",
    slug: "tree-constructor",
    difficulty: "Medium",
    category: "Tree & Trie Structures",
    nzCompany: "Coderbyte / Microsoft Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Determine if integer pairs in the format (child, parent) can form a valid binary tree.",
    description: `Have the function \`TreeConstructor(string[] strArr)\` take the array of strings stored in \`strArr\`, which will contain pairs of integers in the following format: \`(i1,i2)\`, where \`i1\` represents the child node in a tree and the second integer \`i2\` represents its parent.

Determine if the integer pairs can form a valid binary tree. In a valid binary tree:
1. Each parent node can have at most two children.
2. Each child node can have at most one parent.
3. Every child node must be unique (no node can appear as a child multiple times).

If a valid binary tree can be formed, return the string \`true\`, otherwise return \`false\`.`,
    constraints: [
      "1 <= strArr.Length <= 100",
      "Each string element has format '(i1,i2)' where i1 and i2 are non-negative integers.",
      "Integers are between 0 and 1,000,000."
    ],
    examples: [
      {
        input: 'strArr = ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]',
        output: '"true"',
        explanation: "Valid binary tree structure."
      },
      {
        input: 'strArr = ["(1,2)", "(3,2)", "(2,12)", "(5,2)"]',
        output: '"false"',
        explanation: "Node 2 has three children (1, 3, 5), violating the binary tree property."
      },
      {
        input: 'strArr = ["(1,2)", "(2,4)", "(7,4)"]',
        output: '"true"',
        explanation: "Parent 4 has two children (2, 7), and child 1 has parent 2."
      }
    ],
    nzInterviewContext: "A staple Coderbyte data structures problem. Tests candidate proficiency with graph invariants, in-degree/out-degree constraints, and string parsing in C#.",
    seniorEngineeringTips: [
      "Parse the child and parent pairs using string slicing or string.Split.",
      "Maintain a Dictionary<int, int> of parentCount to ensure no parent has > 2 children.",
      "Maintain a HashSet<int> or Dictionary<int, int> of children to ensure no child has > 1 parent."
    ],
    starterCode: `using System;

class MainClass {

  public static string TreeConstructor(string[] strArr) {

    // code goes here  
    return strArr[0];

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(TreeConstructor(new string[] { "(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)" }));
  } 

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string TreeConstructor(string[] strArr) {
    if (strArr == null || strArr.Length == 0) return "true";

    var parentToChildrenCount = new Dictionary<int, int>();
    var childToParent = new Dictionary<int, int>();

    foreach (string pair in strArr) {
      string clean = pair.Trim('(', ')');
      string[] parts = clean.Split(',');
      int child = int.Parse(parts[0].Trim());
      int parent = int.Parse(parts[1].Trim());

      // Rule 1: A child can only have ONE parent
      if (childToParent.ContainsKey(child)) {
        return "false";
      }
      childToParent[child] = parent;

      // Rule 2: A parent can have AT MOST 2 children
      if (!parentToChildrenCount.ContainsKey(parent)) {
        parentToChildrenCount[parent] = 0;
      }
      parentToChildrenCount[parent]++;

      if (parentToChildrenCount[parent] > 2) {
        return "false";
      }
    }

    return "true";
  }

  static void Main() {  
    Console.WriteLine(TreeConstructor(new string[] { "(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)" }));
  } 

}`,
    solutionExplanation: "For every (child, parent) pair, we enforce binary tree rules: 1) if a child already has a registered parent, return 'false'; 2) if a parent receives more than 2 children, return 'false'. If all pairs satisfy these constraints, return 'true'. Runtime is linear O(N).",
    testCases: [
      {
        id: "tc-1",
        inputDisplay: '["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]',
        input: ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"],
        expected: "true",
        explanation: "Valid binary tree"
      },
      {
        id: "tc-2",
        inputDisplay: '["(1,2)", "(3,2)", "(2,12)", "(5,2)"]',
        input: ["(1,2)", "(3,2)", "(2,12)", "(5,2)"],
        expected: "false",
        explanation: "Node 2 has 3 children"
      },
      {
        id: "tc-3",
        inputDisplay: '["(1,2)", "(2,4)", "(7,4)"]',
        input: ["(1,2)", "(2,4)", "(7,4)"],
        expected: "true",
        explanation: "Valid tree"
      },
      {
        id: "tc-4",
        inputDisplay: '["(1,2)", "(1,3)"]',
        input: ["(1,2)", "(1,3)"],
        expected: "false",
        explanation: "Child 1 has 2 parents"
      },
      {
        id: "tc-5-hidden",
        inputDisplay: '["(2,5)", "(2,6)"]',
        input: ["(2,5)", "(2,6)"],
        expected: "false",
        isHidden: true,
        explanation: "Duplicate child with different parents"
      },
      {
        id: "tc-6-hidden",
        inputDisplay: '["(10,20)"]',
        input: ["(10,20)"],
        expected: "true",
        isHidden: true,
        explanation: "Single node pair is valid"
      }
    ],
    hints: {
      level1: "Parse each pair to get the child and parent as separate integers.",
      level2: "Track how many children each parent has, and make sure no child has more than one parent.",
      level3: "If any child is seen twice or any parent has > 2 children, return 'false'."
    }
  },
  {
    id: "bracket-combinations",
    title: "Bracket Combinations",
    slug: "bracket-combinations",
    difficulty: "Hard",
    category: "Dynamic Programming",
    nzCompany: "Coderbyte / Netflix Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(num)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Calculate the number of valid balanced bracket combinations for num pairs.",
    description: `Have the function \`BracketCombinations(int num)\` take the \`num\` parameter being passed and return the number of valid bracket combinations that can be formed with \`num\` pairs of brackets.

For example: if the input is \`3\`, there are \`5\` pairs of valid brackets that can be formed:
- \`()()()\`
- \`()(())\`
- \`(()())\`
- \`(())()\`
- \`((()))\`

The answer corresponds mathematically to the nth **Catalan Number**, given by:
\`C(n) = (2n)! / ((n + 1)! * n!)\``,
    constraints: [
      "0 <= num <= 15",
      "num is always an integer.",
      "Return value fits within standard integer types."
    ],
    examples: [
      {
        input: "num = 3",
        output: "5",
        explanation: "5 valid combinations for 3 pairs."
      },
      {
        input: "num = 2",
        output: "2",
        explanation: "()() and (())"
      },
      {
        input: "num = 1",
        output: "1",
        explanation: "Only ()"
      }
    ],
    nzInterviewContext: "A classic Coderbyte algorithmic problem testing combinatorics, dynamic programming, and formula simplification to prevent large integer overflow.",
    seniorEngineeringTips: [
      "Recognize that the number of valid combinations matches the Catalan number formula: C(n) = (2n)! / ((n+1)! * n!).",
      "Calculate iteratively using long arithmetic: C(n) = C(n-1) * 2*(2n - 1) / (n + 1).",
      "Notice that num = 0 yields 1 (the empty set)."
    ],
    starterCode: `using System;

class MainClass {

  public static int BracketCombinations(int num) {

    // code goes here  
    return num;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(BracketCombinations(Convert.ToInt32(Console.ReadLine())));
  } 

}`,
    referenceSolution: `using System;

class MainClass {

  public static int BracketCombinations(int num) {
    if (num <= 1) return 1;

    // Direct iterative calculation of nth Catalan Number:
    // C(n) = Product from k=2 to n of (n + k) / k
    long catalan = 1;
    for (int k = 1; k <= num; k++) {
      catalan = catalan * 2 * (2 * k - 1) / (k + 1);
    }

    return (int)catalan;
  }

  static void Main() {  
    Console.WriteLine(BracketCombinations(Convert.ToInt32(Console.ReadLine())));
  } 

}`,
    solutionExplanation: "The number of valid balanced parenthesizations with n pairs is given by the nth Catalan number: C(n) = (1 / (n + 1)) * (2n choose n). By using the recurrence relation C(k) = C(k - 1) * (4k - 2) / (k + 1), we compute the result in O(num) time and O(1) space without factorial overflow.",
    testCases: [
      {
        id: "bc-1",
        inputDisplay: "3",
        input: 3,
        expected: "5",
        explanation: "5 valid combinations"
      },
      {
        id: "bc-2",
        inputDisplay: "2",
        input: 2,
        expected: "2",
        explanation: "2 combinations"
      },
      {
        id: "bc-3",
        inputDisplay: "1",
        input: 1,
        expected: "1",
        explanation: "1 combination"
      },
      {
        id: "bc-4",
        inputDisplay: "4",
        input: 4,
        expected: "14",
        explanation: "14 combinations for 4 pairs"
      },
      {
        id: "bc-5-hidden",
        inputDisplay: "5",
        input: 5,
        expected: "42",
        isHidden: true,
        explanation: "Catalan(5) = 42"
      },
      {
        id: "bc-6-hidden",
        inputDisplay: "0",
        input: 0,
        expected: "1",
        isHidden: true,
        explanation: "Catalan(0) = 1"
      }
    ],
    hints: {
      level1: "Count how many combinations exist for n=1, n=2, n=3. Search for the sequence 1, 2, 5, 14...",
      level2: "This is the Catalan Number sequence: C(n) = (2n)! / ((n+1)! * n!).",
      level3: "Compute iteratively using 64-bit long to avoid factorial integer overflow."
    }
  },
  {
    id: "codeland-username-validation",
    title: "Codeland Username Validation",
    slug: "codeland-username-validation",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte / Uber Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Validate a username based on length, start character, allowed symbols, and end character.",
    description: `Have the function \`CodelandUsernameValidation(string str)\` take the \`str\` parameter being passed and determine if the string is a valid username according to the following rules:

1. The username is between 4 and 25 characters (inclusive).
2. It must start with a letter.
3. It can only contain letters, numbers, and the underscore character (\`_\`).
4. It cannot end with an underscore character.

If the username is valid then your program should return the string \`true\`, otherwise return \`false\`.`,
    constraints: [
      "1 <= str.Length <= 100",
      "str contains ASCII characters.",
      "Output is either 'true' or 'false'."
    ],
    examples: [
      {
        input: 'str = "u__hello_world123"',
        output: '"true"',
        explanation: "Starts with letter 'u', length is 18, contains only letters/numbers/_, does not end with _."
      },
      {
        input: 'str = "aa_"',
        output: '"false"',
        explanation: "Length is 3 (< 4) and ends with underscore."
      },
      {
        input: 'str = "123abc_456"',
        output: '"false"',
        explanation: "Starts with a number rather than a letter."
      }
    ],
    nzInterviewContext: "One of Coderbyte's most widely assigned beginner-to-intermediate validation problems. Evaluates defensive string handling, edge conditions, and clean boolean predicate design.",
    seniorEngineeringTips: [
      "Check length bounds first to short-circuit invalid inputs.",
      "Check char.IsLetter(str[0]) for rule 2.",
      "Check str[str.Length - 1] != '_' for rule 4.",
      "Iterate through the string to verify each char is letter, digit, or underscore."
    ],
    starterCode: `using System;

class MainClass {

  public static string CodelandUsernameValidation(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(CodelandUsernameValidation(Console.ReadLine()));
  } 

}`,
    referenceSolution: `using System;

class MainClass {

  public static string CodelandUsernameValidation(string str) {
    if (string.IsNullOrEmpty(str)) return "false";

    // Rule 1: Length between 4 and 25
    if (str.Length < 4 || str.Length > 25) return "false";

    // Rule 2: Must start with a letter
    if (!char.IsLetter(str[0])) return "false";

    // Rule 4: Cannot end with an underscore
    if (str[str.Length - 1] == '_') return "false";

    // Rule 3: Only letters, numbers, and underscore
    foreach (char c in str) {
      if (!char.IsLetterOrDigit(c) && c != '_') {
        return "false";
      }
    }

    return "true";
  }

  static void Main() {  
    Console.WriteLine(CodelandUsernameValidation(Console.ReadLine()));
  } 

}`,
    solutionExplanation: "We validate each rule in order: 1) Verify string length between 4 and 25 inclusive; 2) Check if first character is a letter; 3) Check if last character is not an underscore; 4) Iterate through all characters ensuring they are letters, digits, or underscores. Runtime is O(N) and space is O(1).",
    testCases: [
      {
        id: "cuv-1",
        inputDisplay: '"u__hello_world123"',
        input: "u__hello_world123",
        expected: "true",
        explanation: "Meets all 4 criteria"
      },
      {
        id: "cuv-2",
        inputDisplay: '"aa_"',
        input: "aa_",
        expected: "false",
        explanation: "Length < 4 and ends with underscore"
      },
      {
        id: "cuv-3",
        inputDisplay: '"123abc_456"',
        input: "123abc_456",
        expected: "false",
        explanation: "Does not start with letter"
      },
      {
        id: "cuv-4",
        inputDisplay: '"username"',
        input: "username",
        expected: "true",
        explanation: "Standard valid username"
      },
      {
        id: "cuv-5-hidden",
        inputDisplay: '"a__b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z"',
        input: "a__b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z",
        expected: "false",
        isHidden: true,
        explanation: "Length exceeds 25 characters"
      },
      {
        id: "cuv-6-hidden",
        inputDisplay: '"valid_name_here"',
        input: "valid_name_here",
        expected: "true",
        isHidden: true,
        explanation: "Valid with underscores"
      }
    ],
    hints: {
      level1: "Start by checking the length of the string: must be >= 4 and <= 25.",
      level2: "Use char.IsLetter(str[0]) and ensure str[str.Length - 1] != '_'.",
      level3: "Loop over characters with char.IsLetterOrDigit(c) || c == '_'."
    }
  },
  {
    id: "longest-word",
    title: "Longest Word",
    slug: "longest-word",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte / Apple Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) auxiliary",
    shortDescription: "Return the largest word in a string, ignoring punctuation.",
    description: `Have the function \`LongestWord(string sen)\` take the \`sen\` parameter being passed and return the largest word in the string.

If there are two or more words that are the same length, return the first word from the string with that length. Ignore punctuation and assume \`sen\` will not be empty. Words may also contain numbers, for example \`"Hello world123 567"\`.`,
    constraints: [
      "1 <= sen.Length <= 10,000",
      "sen contains English letters, digits, punctuation, and spaces.",
      "sen is never empty."
    ],
    examples: [
      {
        input: 'sen = "fun&!! time"',
        output: '"time"',
        explanation: "'time' has length 4, 'fun' has length 3 (ignoring '&!!')."
      },
      {
        input: 'sen = "I love dogs"',
        output: '"love"',
        explanation: "'love' has length 4, 'dogs' has length 4. 'love' appears first."
      },
      {
        input: 'sen = "a beautiful sentence^&!"',
        output: '"beautiful"',
        explanation: "'beautiful' is 9 characters."
      }
    ],
    nzInterviewContext: "One of the top 3 most completed Coderbyte questions. Evaluates string scanning, tokenization, and handling punctuation without allocating dozens of intermediate arrays.",
    seniorEngineeringTips: [
      "Scan character by character, tracking the start and length of alphanumeric sequences.",
      "Compare with the maximum length found so far, updating max only if strictly greater to preserve the first occurrence.",
      "Can be solved with ReadOnlySpan<char> to avoid sub-string allocations until the final return."
    ],
    starterCode: `using System;

class MainClass {

  public static string LongestWord(string sen) {

    // code goes here  
    return sen;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(LongestWord(Console.ReadLine()));
  } 

}`,
    referenceSolution: `using System;
using System.Text;

class MainClass {

  public static string LongestWord(string sen) {
    if (string.IsNullOrEmpty(sen)) return "";

    string longest = "";
    var currentWord = new StringBuilder();

    foreach (char c in sen) {
      if (char.IsLetterOrDigit(c)) {
        currentWord.Append(c);
      } else {
        if (currentWord.Length > longest.Length) {
          longest = currentWord.ToString();
        }
        currentWord.Clear();
      }
    }

    if (currentWord.Length > longest.Length) {
      longest = currentWord.ToString();
    }

    return longest;
  }

  static void Main() {  
    Console.WriteLine(LongestWord(Console.ReadLine()));
  } 

}`,
    solutionExplanation: "We iterate through the string keeping track of the current alphanumeric word using a StringBuilder. When a non-alphanumeric character or string end is reached, if currentWord.Length is strictly greater than longest.Length, we update longest. This ensures the first occurrence of equal-length words is preserved.",
    testCases: [
      {
        id: "lw-1",
        inputDisplay: '"fun&!! time"',
        input: "fun&!! time",
        expected: "time",
        explanation: "time (4) > fun (3)"
      },
      {
        id: "lw-2",
        inputDisplay: '"I love dogs"',
        input: "I love dogs",
        expected: "love",
        explanation: "First word of max length 4"
      },
      {
        id: "lw-3",
        inputDisplay: '"a beautiful sentence^&!"',
        input: "a beautiful sentence^&!",
        expected: "beautiful",
        explanation: "beautiful is 9 chars"
      },
      {
        id: "lw-4",
        inputDisplay: '"letter after letter!!"',
        input: "letter after letter!!",
        expected: "letter",
        explanation: "First occurrence of 6-letter word"
      },
      {
        id: "lw-5-hidden",
        inputDisplay: '"123456789 98765432"',
        input: "123456789 98765432",
        expected: "123456789",
        isHidden: true,
        explanation: "Words with numbers"
      }
    ],
    hints: {
      level1: "Punctuation is not part of a word. Only letters and numbers count.",
      level2: "Build words by checking char.IsLetterOrDigit().",
      level3: "When comparing word lengths, use > (strictly greater) rather than >= to keep the first longest word."
    }
  },
  {
    id: "first-reverse",
    title: "First Reverse",
    slug: "first-reverse",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte Warmup / Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Return the string in reversed order.",
    description: `Have the function \`FirstReverse(string str)\` take the \`str\` parameter being passed and return the string in reversed order.

For example: if the input string is \`"Hello World and Coders"\` then your program should return the string \`"sredoC dna dlroW olleH"\`.`,
    constraints: [
      "1 <= str.Length <= 100,000",
      "str may contain any printable ASCII characters."
    ],
    examples: [
      {
        input: 'str = "coderbyte"',
        output: '"etybredoc"',
        explanation: "Reversed string"
      },
      {
        input: 'str = "I Love Code"',
        output: '"edoC evoL I"',
        explanation: "Spaces and capitals preserved in reversed positions."
      },
      {
        input: 'str = "123456789"',
        output: '"987654321"',
        explanation: "Numbers reversed."
      }
    ],
    nzInterviewContext: "The signature introductory Coderbyte question. Often used in timed coding tests to test speed, string immutability in C#, and in-place array reversing.",
    seniorEngineeringTips: [
      "In C#, strings are immutable. Convert to char[] and reverse in-place using Array.Reverse or a two-pointer swap.",
      "Avoid string concatenation in a loop (which causes O(N^2) allocations and GC pressure).",
      "In .NET 8, string.Create with Span<char> allows zero-allocation reversing directly into memory."
    ],
    starterCode: `using System;

class MainClass {

  public static string FirstReverse(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(FirstReverse(Console.ReadLine()));
  } 

}`,
    referenceSolution: `using System;

class MainClass {

  public static string FirstReverse(string str) {
    if (string.IsNullOrEmpty(str)) return str;

    char[] chars = str.ToCharArray();
    Array.Reverse(chars);
    return new string(chars);
  }

  static void Main() {  
    Console.WriteLine(FirstReverse(Console.ReadLine()));
  } 

}`,
    solutionExplanation: "We convert the string into a char array and reverse it in O(N) time using Array.Reverse before constructing the final string. This avoids quadratic string concatenation allocations.",
    testCases: [
      {
        id: "fr-1",
        inputDisplay: '"coderbyte"',
        input: "coderbyte",
        expected: "etybredoc",
        explanation: "Reverse coderbyte"
      },
      {
        id: "fr-2",
        inputDisplay: '"I Love Code"',
        input: "I Love Code",
        expected: "edoC evoL I",
        explanation: "Reverse sentence with spaces"
      },
      {
        id: "fr-3",
        inputDisplay: '"123456789"',
        input: "123456789",
        expected: "987654321",
        explanation: "Reverse digits"
      },
      {
        id: "fr-4-hidden",
        inputDisplay: '"Ox"',
        input: "Ox",
        expected: "xO",
        isHidden: true,
        explanation: "Two characters"
      }
    ],
    hints: {
      level1: "Convert the string into a character array.",
      level2: "Use Array.Reverse() on the character array.",
      level3: "Construct a new string from the reversed char array: return new string(chars);"
    }
  },
  {
    id: "first-factorial",
    title: "First Factorial",
    slug: "first-factorial",
    difficulty: "Easy",
    category: "Dynamic Programming",
    nzCompany: "Coderbyte Benchmark",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(num)",
    expectedSpaceComplexity: "O(1)",
    shortDescription: "Return the factorial of an integer (1 to 18).",
    description: `Have the function \`FirstFactorial(int num)\` take the \`num\` parameter being passed and return the factorial of it.

For example: if \`num = 4\`, then your program should return \`(4 * 3 * 2 * 1) = 24\`. For the test cases, the range will be between 1 and 18 and the input will always be an integer.`,
    constraints: [
      "1 <= num <= 18",
      "Result fits within standard 64-bit integer range."
    ],
    examples: [
      {
        input: "num = 4",
        output: "24",
        explanation: "4 * 3 * 2 * 1 = 24"
      },
      {
        input: "num = 8",
        output: "40320",
        explanation: "8! = 40320"
      },
      {
        input: "num = 1",
        output: "1",
        explanation: "1! = 1"
      }
    ],
    nzInterviewContext: "Classic Coderbyte recursion and loop test problem. Tests basic loop invariants, stack depth awareness, and understanding arithmetic bounds.",
    seniorEngineeringTips: [
      "Prefer an iterative loop over recursion to avoid call stack frames.",
      "Use long arithmetic during multiplication to prevent 32-bit integer overflow for num >= 13.",
      "Base case: if num == 1 return 1."
    ],
    starterCode: `using System;

class MainClass {

  public static int FirstFactorial(int num) {

    // code goes here  
    return num;

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(FirstFactorial(Convert.ToInt32(Console.ReadLine())));
  } 

}`,
    referenceSolution: `using System;

class MainClass {

  public static int FirstFactorial(int num) {
    long result = 1;
    for (int i = 2; i <= num; i++) {
      result *= i;
    }
    return (int)result;
  }

  static void Main() {  
    Console.WriteLine(FirstFactorial(Convert.ToInt32(Console.ReadLine())));
  } 

}`,
    solutionExplanation: "An iterative accumulator multiplies result by every integer from 2 up to num. Since num <= 18, 64-bit integer arithmetic guarantees no overflow. Runtime is O(num) with O(1) space.",
    testCases: [
      {
        id: "ff-1",
        inputDisplay: "4",
        input: 4,
        expected: "24",
        explanation: "4! = 24"
      },
      {
        id: "ff-2",
        inputDisplay: "8",
        input: 8,
        expected: "40320",
        explanation: "8! = 40320"
      },
      {
        id: "ff-3",
        inputDisplay: "1",
        input: 1,
        expected: "1",
        explanation: "1! = 1"
      },
      {
        id: "ff-4",
        inputDisplay: "5",
        input: 5,
        expected: "120",
        explanation: "5! = 120"
      },
      {
        id: "ff-5-hidden",
        inputDisplay: "10",
        input: 10,
        expected: "3628800",
        isHidden: true,
        explanation: "10! = 3628800"
      }
    ],
    hints: {
      level1: "Multiply numbers from 1 to num in a loop.",
      level2: "Initialize a product variable to 1.",
      level3: "Loop from 2 to num: product *= i; and return product."
    }
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "Medium",
    category: "Span<T> & Zero-Allocation",
    nzCompany: "Coderbyte / Xero Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) (Capacity bounded at 5)",
    shortDescription: "Simulate an LRU cache with capacity 5 and return the state as hyphen-separated values.",
    description: `Have the function \`LRUCache(string[] strArr)\` take the array of characters stored in \`strArr\`, which will contain elements to store in an LRU Cache that holds a maximum of 5 elements.

As you iterate through the array:
- Add elements to the cache.
- If an element is already in the cache, move it to the most recently used position.
- If the cache is full (has 5 elements) and a new unique element arrives, remove the least recently used element before adding the new one.

Return the final state of the cache as a hyphen-separated string of elements from least recently used to most recently used.`,
    constraints: [
      "1 <= strArr.Length <= 100",
      "Cache capacity is strictly 5 elements.",
      "Each element in strArr is a single character string (e.g. 'A', 'B', '1')."
    ],
    examples: [
      {
        input: 'strArr = ["A", "B", "C", "D", "A", "E", "D", "Z"]',
        output: '"C-A-E-D-Z"',
        explanation: "A->[A], B->[A,B], C->[A,B,C], D->[A,B,C,D], A->[B,C,D,A], E->[B,C,D,A,E], D->[B,C,A,E,D], Z->evicts B->[C,A,E,D,Z]"
      },
      {
        input: 'strArr = ["A", "B", "A", "C", "A", "B"]',
        output: '"C-A-B"',
        explanation: "Final 3 elements: C is LRU, B is MRU."
      },
      {
        input: 'strArr = ["A", "1", "2", "p", "C", "B", "A", "D"]',
        output: '"p-C-B-A-D"',
        explanation: "Elements evicted in LRU order."
      }
    ],
    nzInterviewContext: "A classic Coderbyte system design micro-challenge frequently asked by fintech companies to verify doubly-linked-list or linked-set manipulation under strict size constraints.",
    seniorEngineeringTips: [
      "Use a LinkedList<string> or List<string> to maintain LRU order (index 0 = LRU, index Count-1 = MRU).",
      "When an existing item is encountered, remove it first and append to the end.",
      "When list.Count == 5 and item is not in list, remove from front (index 0).",
      "Join the final list using string.Join(\"-\", list)."
    ],
    starterCode: `using System;

class MainClass {

  public static string LRUCache(string[] strArr) {

    // code goes here  
    return strArr[0];

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(LRUCache(new string[] { "A", "B", "C", "D", "A", "E", "D", "Z" }));
  } 

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string LRUCache(string[] strArr) {
    if (strArr == null || strArr.Length == 0) return "";

    const int capacity = 5;
    var cache = new List<string>(capacity);

    foreach (string item in strArr) {
      if (cache.Contains(item)) {
        cache.Remove(item);
        cache.Add(item);
      } else {
        if (cache.Count == capacity) {
          cache.RemoveAt(0); // Evict LRU
        }
        cache.Add(item);
      }
    }

    return string.Join("-", cache);
  }

  static void Main() {  
    Console.WriteLine(LRUCache(new string[] { "A", "B", "C", "D", "A", "E", "D", "Z" }));
  } 

}`,
    solutionExplanation: "We maintain a List<string> representing the cache. The head of the list represents the least recently used element, and the tail represents the most recently used element. For each entry, if it exists, we remove it and re-append to the tail. If it does not exist and the cache is at capacity (5), we evict the head element before appending the new item. Finally, we join the items with hyphens.",
    testCases: [
      {
        id: "lru-1",
        inputDisplay: '["A", "B", "C", "D", "A", "E", "D", "Z"]',
        input: ["A", "B", "C", "D", "A", "E", "D", "Z"],
        expected: "C-A-E-D-Z",
        explanation: "Eviction and reordering"
      },
      {
        id: "lru-2",
        inputDisplay: '["A", "B", "A", "C", "A", "B"]',
        input: ["A", "B", "A", "C", "A", "B"],
        expected: "C-A-B",
        explanation: "Only 3 unique elements"
      },
      {
        id: "lru-3",
        inputDisplay: '["A", "1", "2", "p", "C", "B", "A", "D"]',
        input: ["A", "1", "2", "p", "C", "B", "A", "D"],
        expected: "p-C-B-A-D",
        explanation: "Multiple evictions"
      }
    ],
    hints: {
      level1: "Think of the cache as an ordered list where the end is Most Recently Used and the start is Least Recently Used.",
      level2: "If an item is already present, remove it from its current position and append to the end.",
      level3: "If cache.Count == 5 and item is new, remove at index 0 before adding the new item."
    }
  },
  {
    id: "array-addition-i",
    title: "Array Addition I",
    slug: "array-addition-i",
    difficulty: "Medium",
    category: "Dynamic Programming",
    nzCompany: "Coderbyte / Datacom Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(2^N) or O(N * Sum)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Check if any subset of numbers (excluding the max) can sum up to the maximum number.",
    description: `Have the function \`ArrayAdditionI(int[] arr)\` take the array of numbers stored in \`arr\` and return the string \`true\` if any combination of numbers in the array (excluding the largest number) can be added up to equal the largest number in the array, otherwise return the string \`false\`.

For example: if \`arr\` contains \`[4, 6, 23, 10, 1, 3]\` the output should return \`true\` because \`4 + 6 + 10 + 3 = 23\`.`,
    constraints: [
      "3 <= arr.Length <= 15",
      "-1,000 <= arr[i] <= 1,000",
      "Numbers in arr may be negative or positive.",
      "The largest number is strictly excluded from candidate subsets."
    ],
    examples: [
      {
        input: "arr = [4, 6, 23, 10, 1, 3]",
        output: '"true"',
        explanation: "4 + 6 + 10 + 3 = 23 (matches largest element 23)."
      },
      {
        input: "arr = [5, 7, 16, 1, 2]",
        output: '"false"',
        explanation: "Max is 16. Sum of remaining elements is 5+7+1+2 = 15 < 16."
      },
      {
        input: "arr = [3, 5, -1, 8, 12]",
        output: '"true"',
        explanation: "Largest is 12. 5 - 1 + 8 = 12."
      }
    ],
    nzInterviewContext: "A classic subset-sum variant on Coderbyte. Demonstrates backtracking, dynamic programming, or recursion with pruning.",
    seniorEngineeringTips: [
      "Find the maximum number in the array and remove or exclude it.",
      "Use recursive backtracking with index and currentSum to check if target can be reached.",
      "Since N <= 15, recursion with 2^N states executes in microseconds."
    ],
    starterCode: `using System;

class MainClass {

  public static string ArrayAdditionI(int[] arr) {

    // code goes here  
    return "false";

  }

  static void Main() {  
    // keep this function call here
    Console.WriteLine(ArrayAdditionI(new int[] { 4, 6, 23, 10, 1, 3 }));
  } 

}`,
    referenceSolution: `using System;
using System.Collections.Generic;
using System.Linq;

class MainClass {

  public static string ArrayAdditionI(int[] arr) {
    if (arr == null || arr.Length < 2) return "false";

    int max = arr.Max();
    var list = arr.ToList();
    list.Remove(max);

    return CanSum(list, 0, 0, max) ? "true" : "false";
  }

  private static bool CanSum(List<int> list, int index, int currentSum, int target) {
    if (currentSum == target && index > 0) return true;
    if (index >= list.Count) return currentSum == target;

    // Option 1: Include current element
    if (CanSum(list, index + 1, currentSum + list[index], target)) return true;

    // Option 2: Exclude current element
    if (CanSum(list, index + 1, currentSum, target)) return true;

    return false;
  }

  static void Main() {  
    Console.WriteLine(ArrayAdditionI(new int[] { 4, 6, 23, 10, 1, 3 }));
  } 

}`,
    solutionExplanation: "We identify the maximum number and remove it from the list of candidates. Then we recursively explore subset choices (including vs excluding each candidate number). If any path reaches the target sum, we return 'true'. With N <= 15, branching search completes well within milliseconds.",
    testCases: [
      {
        id: "aa-1",
        inputDisplay: "[4, 6, 23, 10, 1, 3]",
        input: [4, 6, 23, 10, 1, 3],
        expected: "true",
        explanation: "4 + 6 + 10 + 3 = 23"
      },
      {
        id: "aa-2",
        inputDisplay: "[5, 7, 16, 1, 2]",
        input: [5, 7, 16, 1, 2],
        expected: "false",
        explanation: "Cannot sum to 16"
      },
      {
        id: "aa-3",
        inputDisplay: "[3, 5, -1, 8, 12]",
        input: [3, 5, -1, 8, 12],
        expected: "true",
        explanation: "5 - 1 + 8 = 12"
      },
      {
        id: "aa-4-hidden",
        inputDisplay: "[1, 2, 3, 4]",
        input: [1, 2, 3, 4],
        expected: "true",
        isHidden: true,
        explanation: "1 + 3 = 4"
      },
      {
        id: "aa-5-hidden",
        inputDisplay: "[54, 49, 1, 0, 4]",
        input: [54, 49, 1, 0, 4],
        expected: "true",
        isHidden: true,
        explanation: "49 + 1 + 4 = 54"
      }
    ],
    hints: {
      level1: "First find the largest number in the array and remove it from the array.",
      level2: "Use a recursive helper function to test including or excluding each remaining number.",
      level3: "Base case: if currentSum == target, return true. If index >= list.Length, return false."
    }
  }
];
