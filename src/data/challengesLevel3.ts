import { Challenge } from "../types";

export const CHALLENGES_L3: Challenge[] = [
  // 11. Bracket Matcher
  {
    id: "bracket-matcher",
    title: "Bracket Matcher",
    slug: "bracket-matcher",
    level: 3,
    levelName: "Level 3 — Strings & Algorithms",
    difficulty: "Medium",
    category: "Stack & Recursion",
    nzCompany: "Coderbyte / Pushpay",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) counter / O(N) stack",
    shortDescription: "Determine if parentheses in a string are correctly balanced and paired.",
    description: `Have the function \`BracketMatcher(string str)\` take the \`str\` parameter being passed and return \`"1"\` if the brackets are correctly matched and each open bracket has a corresponding closed bracket, or return \`"0"\` otherwise.

Only round parentheses \`(\` and \`)\` need to be matched. Other characters (letters, numbers, spaces, punctuation) should be ignored.

For example: if \`str\` is \`"(hello (world))"\`, then the output should be \`"1"\`.
If \`str\` is \`"(hello))"\` or \`")("\`, the output should be \`"0"\`.`,
    constraints: [
      "0 <= str.Length <= 50,000",
      "Only '(' and ')' are considered matching brackets"
    ],
    examples: [
      {
        input: 'str = "(hello (world))"',
        output: '"1"',
        explanation: "Two nested open brackets and two closing brackets."
      },
      {
        input: 'str = "(coder)(byte))"',
        output: '"0"',
        explanation: "Extra closing bracket at the end."
      },
      {
        input: 'str = ")("',
        output: '"0"',
        explanation: "Closing bracket appears before opening bracket."
      }
    ],
    nzInterviewContext: "Frequently assigned in Coderbyte screenings for NZ Senior Engineer positions to test stack-based validation, prefix invariant tracking, and early error termination.",
    seniorEngineeringTips: [
      "Because only one bracket type ('(' and ')') exists, a simple integer balance counter suffices instead of allocating a full Stack<char>.",
      "If the counter drops below 0 at any moment, return \"0\" immediately because a closing bracket appeared without an opening match.",
      "At the end of traversal, verify the counter is exactly 0."
    ],
    starterCode: `using System;

class MainClass {

  public static string BracketMatcher(string str) {

    // code goes here  
    return "1";

  }

  static void Main() {  
    Console.WriteLine(BracketMatcher("(hello (world))"));
  }

}`,
    referenceSolution: `using System;

class MainClass {

  public static string BracketMatcher(string str) {
    int openCount = 0;

    foreach (char c in str) {
      if (c == '(') {
        openCount++;
      } else if (c == ')') {
        openCount--;
        if (openCount < 0) {
          return "0";
        }
      }
    }

    return openCount == 0 ? "1" : "0";
  }

  static void Main() {  
    Console.WriteLine(BracketMatcher("(hello (world))"));
  }

}`,
    solutionExplanation: `We maintain an integer \`openCount\` initialized to 0. We iterate through characters of \`str\`. When encountering \`(\`, we increment \`openCount\`. When encountering \`)\`, we decrement \`openCount\`. If \`openCount\` ever becomes negative, an unmatched closing parenthesis occurred, so we exit early with \`"0"\`. At the end, if \`openCount == 0\`, all brackets are balanced and we return \`"1"\`.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"(hello (world))"', input: "(hello (world))", expected: "1" },
      { id: "tc-2", inputDisplay: '"(coder)(byte))"', input: "(coder)(byte))", expected: "0" },
      { id: "tc-3", inputDisplay: '")("', input: ")(", expected: "0" },
      { id: "tc-4", inputDisplay: '"(c(oder)) b(yte)"', input: "(c(oder)) b(yte)", expected: "1", isHidden: true },
      { id: "tc-5", inputDisplay: '"letter(s) without brackets"', input: "letter(s) without brackets", expected: "1", isHidden: true },
      { id: "tc-6", inputDisplay: '"(((((())))))"', input: "(((((())))))", expected: "1", isHidden: true }
    ],
    hints: {
      level1: "Keep a counter for open parentheses.",
      level2: "Increment the counter for '(' and decrement for ')'.",
      level3: "If the counter ever drops below zero, return '0' immediately. After the loop, verify counter == 0."
    }
  },

  // 12. Longest Word
  {
    id: "longest-word",
    title: "Longest Word",
    slug: "longest-word",
    level: 3,
    levelName: "Level 3 — Strings & Algorithms",
    difficulty: "Easy",
    category: "Strings & Manipulation",
    nzCompany: "Coderbyte / Trade Me",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Find the longest alphanumeric word in a sentence, ignoring punctuation.",
    description: `Have the function \`LongestWord(string sen)\` take the \`sen\` parameter being passed and return the longest word in the string.

If there are two or more words that are the same length, return the first word from the string with that length. Ignore punctuation and assume \`sen\` will not be empty. Words may also contain numbers.

For example: if \`sen\` is \`"fun&!! time"\`, the words are \`"fun"\` and \`"time"\`. The longest is \`"time"\`.`,
    constraints: [
      "1 <= sen.Length <= 100,000",
      "Words contain letters and digits",
      "Punctuation characters must be stripped"
    ],
    examples: [
      {
        input: 'sen = "fun&!! time"',
        output: '"time"',
        explanation: "'time' has 4 letters while 'fun' has 3."
      },
      {
        input: 'sen = "I love coding at Partly"',
        output: '"coding"',
        explanation: "'coding' and 'Partly' are both 6 chars; 'coding' appears first."
      }
    ],
    nzInterviewContext: "A staple Coderbyte technical challenge evaluating string manipulation, regex tokenization, and strict tie-breaking logic.",
    seniorEngineeringTips: [
      "Strip non-alphanumeric punctuation by replacing with space before splitting.",
      "Iterate over words and only update max if current.Length > longest.Length (strictly greater preserves first word in tie-breaks).",
      "Avoid allocating redundant intermediate arrays when running on heavy text feeds."
    ],
    starterCode: `using System;

class MainClass {

  public static string LongestWord(string sen) {

    // code goes here  
    return sen;

  }

  static void Main() {  
    Console.WriteLine(LongestWord("fun&!! time"));
  }

}`,
    referenceSolution: `using System;
using System.Text;

class MainClass {

  public static string LongestWord(string sen) {
    var sb = new StringBuilder();
    foreach (char c in sen) {
      if (char.IsLetterOrDigit(c) || c == ' ') {
        sb.Append(c);
      } else {
        sb.Append(' ');
      }
    }

    string[] words = sb.ToString().Split(' ', StringSplitOptions.RemoveEmptyEntries);
    string longest = "";

    foreach (string w in words) {
      if (w.Length > longest.Length) {
        longest = w;
      }
    }

    return longest;
  }

  static void Main() {  
    Console.WriteLine(LongestWord("fun&!! time"));
  }

}`,
    solutionExplanation: `We sanitize the string by converting all non-alphanumeric characters to spaces using a \`StringBuilder\`. We then split by space with \`RemoveEmptyEntries\` and scan through the words. By updating \`longest\` only when \`w.Length > longest.Length\`, we automatically preserve the first occurrence during ties.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"fun&!! time"', input: "fun&!! time", expected: "time" },
      { id: "tc-2", inputDisplay: '"I love coding at Partly"', input: "I love coding at Partly", expected: "coding" },
      { id: "tc-3", inputDisplay: '"a beautiful sentence^&!"', input: "a beautiful sentence^&!", expected: "beautiful" },
      { id: "tc-4", inputDisplay: '"letter after letter!!"', input: "letter after letter!!", expected: "letter", isHidden: true },
      { id: "tc-5", inputDisplay: '"123456789 98765432"', input: "123456789 98765432", expected: "123456789", isHidden: true }
    ],
    hints: {
      level1: "Punctuation should not count toward word length.",
      level2: "Replace any character that is not a letter or digit with a space, then split on spaces.",
      level3: "Keep track of the longest word. Only replace it if the new word is strictly longer."
    }
  },

  // 13. Anagram Checker
  {
    id: "anagram-checker",
    title: "Anagram Checker",
    slug: "anagram-checker",
    level: 3,
    levelName: "Level 3 — Strings & Algorithms",
    difficulty: "Medium",
    category: "Strings & Manipulation",
    nzCompany: "Partly",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) 26/128 characters",
    shortDescription: "Determine whether two strings contain the same characters in any order.",
    description: `Have the function \`AnagramChecker(string[] strArr)\` take the array of strings \`strArr\` which contains two strings: \`strArr[0]\` and \`strArr[1]\`.

Return \`"true"\` if the two strings are anagrams of each other, or \`"false"\` if they are not. The comparison should ignore non-alphanumeric characters (spaces, punctuation) and be case-insensitive.

For example: if \`strArr\` is \`["listen", "silent"]\`, the output should be \`"true"\`.
If \`strArr\` is \`["hello", "world"]\`, the output should be \`"false"\`.`,
    constraints: [
      "strArr.Length == 2",
      "0 <= strArr[i].Length <= 50,000"
    ],
    examples: [
      {
        input: 'strArr = ["listen", "silent"]',
        output: '"true"',
        explanation: "'listen' and 'silent' have identical letters."
      },
      {
        input: 'strArr = ["hello", "world"]',
        output: '"false"',
        explanation: "Different character sets."
      },
      {
        input: 'strArr = ["Dormitory", "Dirty room"]',
        output: '"true"',
        explanation: "Ignoring case and spaces, characters match."
      }
    ],
    nzInterviewContext: "Tested at Partly to evaluate part model number normalization, fuzzy SKU matching, and character count verification.",
    seniorEngineeringTips: [
      "Use a fixed-size frequency array or Dictionary<char, int> instead of sorting strings in O(N log N).",
      "Increment counts for the first string and decrement counts for the second string.",
      "Verify all character counts return to 0 with matching total valid character counts."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static string AnagramChecker(string[] strArr) {

    // code goes here  
    return "false";

  }

  static void Main() {  
    Console.WriteLine(AnagramChecker(new string[] { "listen", "silent" }));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static string AnagramChecker(string[] strArr) {
    if (strArr == null || strArr.Length < 2) return "false";

    string s1 = strArr[0].ToLower();
    string s2 = strArr[1].ToLower();

    var counts = new Dictionary<char, int>();
    int total1 = 0;

    foreach (char c in s1) {
      if (char.IsLetterOrDigit(c)) {
        if (!counts.ContainsKey(c)) counts[c] = 0;
        counts[c]++;
        total1++;
      }
    }

    int total2 = 0;
    foreach (char c in s2) {
      if (char.IsLetterOrDigit(c)) {
        if (!counts.ContainsKey(c) || counts[c] == 0) return "false";
        counts[c]--;
        total2++;
      }
    }

    return total1 == total2 ? "true" : "false";
  }

  static void Main() {  
    Console.WriteLine(AnagramChecker(new string[] { "listen", "silent" }));
  }

}`,
    solutionExplanation: `We count the frequencies of all valid alphanumeric characters in the first string. Then, traversing the second string, we decrement the corresponding counts. If a character is missing or exhausted, or if total character counts mismatch, we return "false". This runs in O(N) time and O(1) auxiliary space.`,
    testCases: [
      { id: "tc-1", inputDisplay: '["listen", "silent"]', input: ["listen", "silent"], expected: "true" },
      { id: "tc-2", inputDisplay: '["hello", "world"]', input: ["hello", "world"], expected: "false" },
      { id: "tc-3", inputDisplay: '["Dormitory", "Dirty room"]', input: ["Dormitory", "Dirty room"], expected: "true" },
      { id: "tc-4", inputDisplay: '["rail safety", "fairy tales"]', input: ["rail safety", "fairy tales"], expected: "true", isHidden: true },
      { id: "tc-5", inputDisplay: '["rat", "car"]', input: ["rat", "car"], expected: "false", isHidden: true }
    ],
    hints: {
      level1: "Normalize both strings to lower case and ignore spaces and punctuation.",
      level2: "Count the frequency of each character in the first string using a Dictionary<char, int>.",
      level3: "Decrement the frequency using characters from the second string. If any count is exhausted, return 'false'."
    }
  },

  // 14. Compress a String
  {
    id: "compress-string",
    title: "Compress a String",
    slug: "compress-string",
    level: 3,
    levelName: "Level 3 — Strings & Algorithms",
    difficulty: "Medium",
    category: "Strings & Manipulation",
    nzCompany: "Serko",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    shortDescription: "Run-length encoding: convert consecutive repeated characters to char + count.",
    description: `Have the function \`CompressString(string str)\` perform run-length compression on the string \`str\` by replacing consecutive repeated characters with the character followed by the number of occurrences.

For example: if \`str\` is \`"aaabbccccd"\`, the compressed output should be \`"a3b2c4d1"\`.
If \`str\` is \`"abc"\`, the output should be \`"a1b1c1"\`.`,
    constraints: [
      "0 <= str.Length <= 100,000",
      "str consists of letters and digits"
    ],
    examples: [
      {
        input: 'str = "aaabbccccd"',
        output: '"a3b2c4d1"',
        explanation: "3 a's, 2 b's, 4 c's, 1 d."
      },
      {
        input: 'str = "wwwwaaadexxxxxx"',
        output: '"w4a3d1e1x6"',
        explanation: "Consecutive repeated runs encoded."
      },
      {
        input: 'str = "abc"',
        output: '"a1b1c1"',
        explanation: "Single characters have count 1."
      }
    ],
    nzInterviewContext: "Tested at travel booking & expense platform Serko to assess efficient data compaction, string building, and loop boundary conditions.",
    seniorEngineeringTips: [
      "Use StringBuilder with pre-allocated capacity to prevent frequent heap re-allocations.",
      "Track current character and consecutive count using a while-loop or two-pointer scan.",
      "Handle single-character runs and string termination gracefully without index-out-of-range exceptions."
    ],
    starterCode: `using System;
using System.Text;

class MainClass {

  public static string CompressString(string str) {

    // code goes here  
    return "";

  }

  static void Main() {  
    Console.WriteLine(CompressString("aaabbccccd"));
  }

}`,
    referenceSolution: `using System;
using System.Text;

class MainClass {

  public static string CompressString(string str) {
    if (string.IsNullOrEmpty(str)) return "";

    var sb = new StringBuilder();
    int i = 0;

    while (i < str.Length) {
      char c = str[i];
      int count = 0;

      while (i < str.Length && str[i] == c) {
        count++;
        i++;
      }

      sb.Append(c);
      sb.Append(count);
    }

    return sb.ToString();
  }

  static void Main() {  
    Console.WriteLine(CompressString("aaabbccccd"));
  }

}`,
    solutionExplanation: `We iterate through the string with an index \`i\`. For each distinct character run, we count how many consecutive characters match \`str[i]\`. We append the character and its count to a \`StringBuilder\`. Runtime is O(N) linear time with O(N) space.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"aaabbccccd"', input: "aaabbccccd", expected: "a3b2c4d1" },
      { id: "tc-2", inputDisplay: '"wwwwaaadexxxxxx"', input: "wwwwaaadexxxxxx", expected: "w4a3d1e1x6" },
      { id: "tc-3", inputDisplay: '"abc"', input: "abc", expected: "a1b1c1" },
      { id: "tc-4", inputDisplay: '"zzzzzzzzzz"', input: "zzzzzzzzzz", expected: "z10", isHidden: true },
      { id: "tc-5", inputDisplay: '""', input: "", expected: "", isHidden: true }
    ],
    hints: {
      level1: "Use a StringBuilder to construct the result.",
      level2: "Use a while loop. For each index, record the character and count how many times it repeats consecutively.",
      level3: "Append the character followed by the count to your StringBuilder, and advance your index."
    }
  },

  // 15. Longest Substring Without Repeating Characters
  {
    id: "longest-substring-without-repeating",
    title: "Find the Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating",
    level: 3,
    levelName: "Level 3 — Strings & Algorithms",
    difficulty: "Medium",
    category: "Two Pointers & Sliding Window",
    nzCompany: "Partly / Canva NZ",
    timeLimitMs: 2000,
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(min(N, M))",
    shortDescription: "Return the length of the longest substring with all distinct characters.",
    description: `Have the function \`LongestSubstringWithoutRepeating(string str)\` return the length of the longest substring containing all unique characters (no duplicate letters).

For example: if \`str\` is \`"abcabcbb"\`, the longest substring without repeating characters is \`"abc"\`, which has a length of \`3\`.
If \`str\` is \`"bbbbb"\`, the answer is \`"b"\` with length \`1\`.
If \`str\` is \`"pwwkew"\`, the answer is \`"wke"\` with length \`3\`.`,
    constraints: [
      "0 <= str.Length <= 100,000",
      "str consists of English letters, digits, symbols and spaces"
    ],
    examples: [
      {
        input: 'str = "abcabcbb"',
        output: '3',
        explanation: "'abc' has length 3."
      },
      {
        input: 'str = "bbbbb"',
        output: '1',
        explanation: "Only 'b' can be formed with unique chars."
      },
      {
        input: 'str = "pwwkew"',
        output: '3',
        explanation: "'wke' has length 3."
      }
    ],
    nzInterviewContext: "A premier Senior Software Engineer interview question at Partly and Canva to test sliding window algorithms, boundary pointers, and index caching.",
    seniorEngineeringTips: [
      "Use a sliding window with two pointers: left and right.",
      "Store the most recent index of each character in a Dictionary<char, int>.",
      "When a duplicate is encountered inside the current window, jump the left pointer directly to lastIndex[c] + 1."
    ],
    starterCode: `using System;
using System.Collections.Generic;

class MainClass {

  public static int LongestSubstringWithoutRepeating(string str) {

    // code goes here  
    return 0;

  }

  static void Main() {  
    Console.WriteLine(LongestSubstringWithoutRepeating("abcabcbb"));
  }

}`,
    referenceSolution: `using System;
using System.Collections.Generic;

class MainClass {

  public static int LongestSubstringWithoutRepeating(string str) {
    if (string.IsNullOrEmpty(str)) return 0;

    var lastIndex = new Dictionary<char, int>();
    int maxLength = 0;
    int left = 0;

    for (int right = 0; right < str.Length; right++) {
      char c = str[right];

      if (lastIndex.ContainsKey(c) && lastIndex[c] >= left) {
        left = lastIndex[c] + 1;
      }

      lastIndex[c] = right;
      int currentLen = right - left + 1;
      if (currentLen > maxLength) {
        maxLength = currentLen;
      }
    }

    return maxLength;
  }

  static void Main() {  
    Console.WriteLine(LongestSubstringWithoutRepeating("abcabcbb"));
  }

}`,
    solutionExplanation: `We utilize a sliding window with a hash map storing each character's latest index. When the right pointer encounters a character already present in the active window (lastIndex[c] >= left), we shift left to lastIndex[c] + 1. The maximum window length observed (right - left + 1) is returned in O(N) time.`,
    testCases: [
      { id: "tc-1", inputDisplay: '"abcabcbb"', input: "abcabcbb", expected: 3 },
      { id: "tc-2", inputDisplay: '"bbbbb"', input: "bbbbb", expected: 1 },
      { id: "tc-3", inputDisplay: '"pwwkew"', input: "pwwkew", expected: 3 },
      { id: "tc-4", inputDisplay: '"abcdefg"', input: "abcdefg", expected: 7, isHidden: true },
      { id: "tc-5", inputDisplay: '""', input: "", expected: 0, isHidden: true }
    ],
    hints: {
      level1: "Use the sliding window technique with two pointers.",
      level2: "Store the last seen index of each character in a Dictionary<char, int>.",
      level3: "If you see a character already in your window, update your left pointer to (lastIndex + 1) and calculate the window size."
    }
  }
];
