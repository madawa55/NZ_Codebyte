import { Challenge } from "../types";

export const CHALLENGES_L1: Challenge[] = [
  // 1. First Non-Repeating Character
  {
    id: "first-non-repeating-character",
    title: "First Non-Repeating Character",
    slug: "first-non-repeating-character",
    level: 1,
    levelName: "Level 1 — Fundamentals",
    difficulty: "Easy",
    category: "Strings & Manipulation",
    nzCompany: "Partly",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(K) unique characters",
    shortDescription: "Given a string, find and return the first character that appears only once.",
    description: `Have the function \`FirstNonRepeatingCharacter(string str)\` read \`str\` and return the first character that appears only once in the string. If every character repeats, return an empty string \`""\`.

For example: if \`str\` is \`"swiss"\`, the character \`'s'\` appears 3 times, \`'w'\` appears 1 time, and \`'i'\` appears 1 time. The first single-frequency character encountered from left to right is \`"w"\`.`,
    constraints: [
      "1 <= str.Length <= 50,000",
      "str contains standard ASCII printable characters",
      "Case sensitive matching"
    ],
    examples: [
      {
        input: 'str = "swiss"',
        output: '"w"',
        explanation: "'w' is the first unique character."
      },
      {
        input: 'str = "hello"',
        output: '"h"',
        explanation: "'h' is unique and appears first."
      },
      {
        input: 'str = "aabbcc"',
        output: '""',
        explanation: "All characters repeat at least twice."
      }
    ],
    nzInterviewContext: "Frequently asked at Partly and modern NZ backend teams to test fundamental frequency map understanding and dictionary lookup efficiency without redundant nested iterations.",
    seniorEngineeringTips: [
      "Avoid nested loops (O(N^2)) by building an O(N) frequency dictionary on the first pass.",
      "Use char as the dictionary key to minimize boxing and memory footprint.",
      "Preserve left-to-right discovery by iterating the original string or an ordered key sequence on the second pass."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string FirstNonRepeatingCharacter(string str) {

    // code goes here  
    return str.Length > 0 ? str[0].ToString() : "";

  }

  static void Main() {  
    Console.WriteLine(FirstNonRepeatingCharacter("swiss"));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string FirstNonRepeatingCharacter(string str) {
    if (string.IsNullOrEmpty(str)) return "";

    var counts = new Dictionary<char, int>();
    foreach (char c in str) {
      if (!counts.ContainsKey(c)) {
        counts[c] = 0;
      }
      counts[c]++;
    }

    foreach (char c in str) {
      if (counts[c] == 1) {
        return c.ToString();
      }
    }

    return "";
  }

  static void Main() {  
    Console.WriteLine(FirstNonRepeatingCharacter("swiss"));
  }

}`,
    solutionExplanation: `We construct a frequency count map using \`Dictionary<char, int>\` in O(N) time. In a second O(N) scan over the original string, the first character whose mapped count is 1 is immediately returned. Total runtime is O(N) with O(K) auxiliary space where K <= 256 for ASCII.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"swiss"', input: "swiss", expected: "w" },
      { id: "tc-2", inputDisplay: '"hello"', input: "hello", expected: "h" },
      { id: "tc-3", inputDisplay: '"aabbcc"', input: "aabbcc", expected: "" },
      { id: "tc-4", inputDisplay: '"madam"', input: "madam", expected: "d", isHidden: true },
      { id: "tc-5", inputDisplay: '"partly"', input: "partly", expected: "p", isHidden: true }
    ],
    hints: {
      level1: "Count character frequencies first so you know how many times each character appears.",
      level2: "Use a Dictionary<char, int> to store the count for each character in a single pass.",
      level3: "On a second pass through the string, return the first character whose dictionary count equals 1."
    }
  },

  // 2. Reverse a String
  {
    id: "reverse-a-string",
    title: "Reverse a String",
    slug: "reverse-a-string",
    level: 1,
    levelName: "Level 1 — Fundamentals",
    difficulty: "Easy",
    category: "Strings & Manipulation",
    nzCompany: "Xero",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Reverse a string without using built-in Reverse() methods.",
    description: `Have the function \`ReverseString(string str)\` take the \`str\` parameter being passed and return the string in reversed order.

**Requirement**: Do not use built-in \`Array.Reverse()\` or LINQ \`.Reverse()\` methods. Use iterative two-pointer array swapping or a loop.`,
    constraints: [
      "0 <= str.Length <= 100,000",
      "Characters can be alphanumeric, spaces, and punctuation"
    ],
    examples: [
      {
        input: 'str = "hello"',
        output: '"olleh"',
        explanation: "'hello' reversed character-by-character is 'olleh'."
      },
      {
        input: 'str = "Coderbyte"',
        output: '"etybredoC"',
        explanation: "Preserves case while inverting order."
      }
    ],
    nzInterviewContext: "A foundational baseline question commonly asked during initial technical screens to verify algorithmic mechanics, boundary condition checking, and memory awareness.",
    seniorEngineeringTips: [
      "Convert the string to a char array (\`char[]\`) and perform in-place swapping using two pointers (left and right).",
      "Avoid repeated string concatenation in loops (\`s = s + c\`), which triggers O(N^2) memory allocations.",
      "Construct the final string directly from the char array with \`new string(chars)\`."
    ],
    starterCode: `using System;

class MainClass {

  public static string ReverseString(string str) {

    // code goes here  
    return str;

  }

  static void Main() {  
    Console.WriteLine(ReverseString("hello"));
  }

}`,
    referenceSolution: `using System;

class MainClass {

  public static string ReverseString(string str) {
    if (string.IsNullOrEmpty(str)) return "";

    char[] chars = str.ToCharArray();
    int left = 0;
    int right = chars.Length - 1;

    while (left < right) {
      char temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }

    return new string(chars);
  }

  static void Main() {  
    Console.WriteLine(ReverseString("hello"));
  }

}`,
    solutionExplanation: `By converting the string to a mutable \`char[]\` buffer, we place two pointers at the boundaries and swap elements converging toward the center. This performs N/2 swaps in O(N) time with zero redundant intermediate string allocations.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"hello"', input: "hello", expected: "olleh" },
      { id: "tc-2", inputDisplay: '"Coderbyte"', input: "Coderbyte", expected: "etybredoC" },
      { id: "tc-3", inputDisplay: '"Partly NZ"', input: "Partly NZ", expected: "ZN yltraP" },
      { id: "tc-4", inputDisplay: '"a"', input: "a", expected: "a", isHidden: true },
      { id: "tc-5", inputDisplay: '""', input: "", expected: "", isHidden: true }
    ],
    hints: {
      level1: "Strings in C# are immutable, so convert the string into a char array first.",
      level2: "Use two pointers: one at index 0 and one at chars.Length - 1.",
      level3: "Swap the characters at the two pointers, increment the left index, and decrement the right index until they meet."
    }
  },

  // 3. Palindrome Checker
  {
    id: "palindrome-checker",
    title: "Palindrome Checker",
    slug: "palindrome-checker",
    level: 1,
    levelName: "Level 1 — Fundamentals",
    difficulty: "Easy",
    category: "Strings & Manipulation",
    nzCompany: "Trade Me",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) auxiliary",
    shortDescription: "Determine whether a string reads the same forwards and backwards.",
    description: `Have the function \`PalindromeChecker(string str)\` take the \`str\` parameter being passed and return the string \`"true"\` if the parameter is a palindrome, otherwise return the string \`"false"\`.

Non-alphanumeric characters (spaces, punctuation) should be stripped out and comparison should be case-insensitive.`,
    constraints: [
      "1 <= str.Length <= 100,000",
      "Letters, digits, spaces, and punctuation may appear"
    ],
    examples: [
      {
        input: 'str = "madam"',
        output: '"true"',
        explanation: "'madam' spelled backwards is 'madam'."
      },
      {
        input: 'str = "hello"',
        output: '"false"',
        explanation: "'hello' != 'olleh'."
      },
      {
        input: 'str = "race car"',
        output: '"true"',
        explanation: "Ignoring spaces, 'racecar' is a palindrome."
      }
    ],
    nzInterviewContext: "Standard screening question at Trade Me and eCommerce platforms to test string hygiene, case normalization, and two-pointer traversal.",
    seniorEngineeringTips: [
      "Clean the string to retain only alphanumeric characters and normalize to lower case.",
      "Compare corresponding characters from both ends moving inward.",
      "Early exit as soon as a mismatch is detected to optimize average execution time."
    ],
    starterCode: `using System;

class MainClass {

  public static string PalindromeChecker(string str) {

    // code goes here  
    return "true";

  }

  static void Main() {  
    Console.WriteLine(PalindromeChecker("madam"));
  }

}`,
    referenceSolution: `using System;
using System.Text;

class MainClass {

  public static string PalindromeChecker(string str) {
    if (string.IsNullOrEmpty(str)) return "true";

    var sb = new StringBuilder();
    foreach (char c in str) {
      if (char.IsLetterOrDigit(c)) {
        sb.Append(char.ToLower(c));
      }
    }

    string clean = sb.ToString();
    int left = 0;
    int right = clean.Length - 1;

    while (left < right) {
      if (clean[left] != clean[right]) {
        return "false";
      }
      left++;
      right--;
    }

    return "true";
  }

  static void Main() {  
    Console.WriteLine(PalindromeChecker("madam"));
  }

}`,
    solutionExplanation: `We filter the input string to keep only alphanumeric characters converted to lowercase using \`StringBuilder\`. Then two pointers at left and right boundaries verify symmetry in O(N) time.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"madam"', input: "madam", expected: "true" },
      { id: "tc-2", inputDisplay: '"hello"', input: "hello", expected: "false" },
      { id: "tc-3", inputDisplay: '"race car"', input: "race car", expected: "true" },
      { id: "tc-4", inputDisplay: '"A man, a plan, a canal: Panama"', input: "A man, a plan, a canal: Panama", expected: "true", isHidden: true },
      { id: "tc-5", inputDisplay: '"Partly NZ"', input: "Partly NZ", expected: "false", isHidden: true }
    ],
    hints: {
      level1: "Normalize your input by removing spaces and punctuation and converting to lowercase.",
      level2: "Use two pointers starting at the beginning and the end of the cleaned string.",
      level3: "If characters match at both ends, move inward. If any character differs, return 'false'."
    }
  },

  // 4. Find Intersection
  {
    id: "find-intersection",
    title: "Find Intersection",
    slug: "find-intersection",
    level: 1,
    levelName: "Level 1 — Fundamentals",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Coderbyte / Google Screen",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N + M)",
    expectedSpaceComplexity: "O(min(N, M))",
    shortDescription: "Read two sorted comma-separated string lists and return the intersection in sorted order, or 'false'.",
    description: `Have the function \`FindIntersection(string[] strArr)\` read the array of strings stored in \`strArr\` which will contain 2 elements: the first element will represent a list of comma-separated numbers sorted in ascending order, the second element will represent a second list of comma-separated numbers (also sorted).

Your goal is to return a comma-separated string containing the numbers that occur in elements of \`strArr\` in sorted order. If there is no intersection, return the string \`"false"\`.

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
      "Parse numbers cleanly to avoid high-volume garbage collection on large feeds.",
      "Remember to return the literal string \"false\" when the intersection is empty."
    ],
    starterCode: `using System;

class MainClass {

  public static string FindIntersection(string[] strArr) {

    // code goes here  
    return strArr[0];

  }

  static void Main() {  
    Console.WriteLine(FindIntersection(new string[] {"1, 3, 4, 7, 13", "1, 2, 4, 13, 15"}));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string FindIntersection(string[] strArr) {
    if (strArr == null || strArr.Length < 2) return "false";

    string[] firstParts = strArr[0].Split(',', StringSplitOptions.TrimEntries);
    string[] secondParts = strArr[1].Split(',', StringSplitOptions.TrimEntries);

    var firstSet = new HashSet<string>();
    foreach (var num in firstParts) {
      firstSet.Add(num);
    }

    var intersection = new List<string>();
    foreach (var num in secondParts) {
      if (firstSet.Contains(num)) {
        intersection.Add(num);
      }
    }

    if (intersection.Count == 0) {
      return "false";
    }

    return string.Join(",", intersection);
  }

  static void Main() {  
    Console.WriteLine(FindIntersection(new string[] {"1, 3, 4, 7, 13", "1, 2, 4, 13, 15"}));
  }

}`,
    solutionExplanation: `We tokenize the first comma-delimited string into a HashSet<string> for O(1) membership lookups. We then iterate through the second list, collecting values present in the hash set. If matches exist, we join them with commas; otherwise, we return "false".`,
    testCases: [
      { id: "tc-1", inputDisplay: '["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]', input: ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"], expected: "1,4,13" },
      { id: "tc-2", inputDisplay: '["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"]', input: ["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"], expected: "1,9,10" },
      { id: "tc-3", inputDisplay: '["2, 5, 7", "3, 6, 8"]', input: ["2, 5, 7", "3, 6, 8"], expected: "false" },
      { id: "tc-4", inputDisplay: '["1, 2, 3, 4, 5", "6, 7, 8, 9, 10"]', input: ["1, 2, 3, 4, 5", "6, 7, 8, 9, 10"], expected: "false", isHidden: true },
      { id: "tc-5", inputDisplay: '["10, 20, 30", "10, 30, 50"]', input: ["10, 20, 30", "10, 30, 50"], expected: "10,30", isHidden: true },
      { id: "tc-6", inputDisplay: '["-4, -2, 0, 5", "-2, 5, 9"]', input: ["-4, -2, 0, 5", "-2, 5, 9"], expected: "-2,5", isHidden: true }
    ],
    hints: {
      level1: "The two lists of numbers are comma-separated strings inside a 2-element array.",
      level2: "Split both strings by commas and trim whitespace. Put the first list into a HashSet<string>.",
      level3: "Iterate through the second list. If an item is in the HashSet, collect it. If no items match, return 'false'."
    }
  },

  // 5. Count Character Frequency
  {
    id: "count-character-frequency",
    title: "Count Character Frequency",
    slug: "count-character-frequency",
    level: 1,
    levelName: "Level 1 — Fundamentals",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    nzCompany: "Pushpay",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(K) unique characters",
    shortDescription: "Return how many times each character appears in order of first appearance.",
    description: `Have the function \`CountCharacterFrequency(string str)\` read \`str\` and return a comma-separated string displaying each distinct character and its frequency in the format \`char:count\`, in order of its first occurrence.

For example: if \`str\` is \`"hello"\`, the character \`'h'\` appears 1 time, \`'e'\` appears 1 time, \`'l'\` appears 2 times, and \`'o'\` appears 1 time.
The output should be \`"h:1, e:1, l:2, o:1"\`.`,
    constraints: [
      "1 <= str.Length <= 50,000",
      "str consists of printable characters",
      "Case-sensitive counting"
    ],
    examples: [
      {
        input: 'str = "hello"',
        output: '"h:1, e:1, l:2, o:1"',
        explanation: "'l' appears twice, others appear once."
      },
      {
        input: 'str = "partly"',
        output: '"p:1, a:1, r:1, t:1, l:1, y:1"',
        explanation: "Each character appears once."
      },
      {
        input: 'str = "success"',
        output: '"s:3, u:1, c:2, e:1"',
        explanation: "Order of first appearance: s, u, c, e."
      }
    ],
    nzInterviewContext: "Commonly used in financial and payment processing systems (e.g. Pushpay) to verify telemetry string parsing, character hashing, and ordered serialization.",
    seniorEngineeringTips: [
      "Use a Dictionary<char, int> alongside a List<char> to retain deterministic first-occurrence ordering.",
      "Avoid LINQ GroupBy on hot paths if allocations matter; a primitive dictionary is significantly faster.",
      "Format output using string.Join to produce clean readable output without trailing commas."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string CountCharacterFrequency(string str) {

    // code goes here  
    return "";

  }

  static void Main() {  
    Console.WriteLine(CountCharacterFrequency("hello"));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string CountCharacterFrequency(string str) {
    if (string.IsNullOrEmpty(str)) return "";

    var counts = new Dictionary<char, int>();
    var order = new List<char>();

    foreach (char c in str) {
      if (!counts.ContainsKey(c)) {
        counts[c] = 0;
        order.Add(c);
      }
      counts[c]++;
    }

    var parts = new List<string>();
    foreach (char c in order) {
      parts.Add(c + ":" + counts[c]);
    }

    return string.Join(", ", parts);
  }

  static void Main() {  
    Console.WriteLine(CountCharacterFrequency("hello"));
  }

}`,
    solutionExplanation: `We iterate through the input string, inserting unseen characters into both a dictionary and an order list. After populating frequencies in O(N), we format each unique character as "char:count" joined by ", ".`,
    testCases: [
      { id: "tc-1", inputDisplay: '"hello"', input: "hello", expected: "h:1, e:1, l:2, o:1" },
      { id: "tc-2", inputDisplay: '"partly"', input: "partly", expected: "p:1, a:1, r:1, t:1, l:1, y:1" },
      { id: "tc-3", inputDisplay: '"success"', input: "success", expected: "s:3, u:1, c:2, e:1" },
      { id: "tc-4", inputDisplay: '"a"', input: "a", expected: "a:1", isHidden: true },
      { id: "tc-5", inputDisplay: '"banana"', input: "banana", expected: "b:1, a:3, n:2", isHidden: true }
    ],
    hints: {
      level1: "You need to store both the counts of each character and their original order of appearance.",
      level2: "Use a Dictionary<char, int> for the frequency and a List<char> for order.",
      level3: "Iterate through the ordered list and format each pair as 'c:count', then join with ', '."
    }
  }
];
