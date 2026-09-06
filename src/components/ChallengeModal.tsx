import React, { useState } from "react";
import { Challenge } from "../types";
import { 
  Search, 
  X, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  ChevronRight
} from "lucide-react";

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: Challenge[];
  currentChallengeId: string;
  onSelectChallenge: (c: Challenge) => void;
  solvedChallengeIds: string[];
  isDark?: boolean;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  challenges,
  currentChallengeId,
  onSelectChallenge,
  solvedChallengeIds,
  isDark = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");

  if (!isOpen) return null;

  const levels = ["All", "Level 1", "Level 2", "Level 3", "Level 4"];
  const companies = ["All", ...Array.from(new Set(challenges.map((c) => c.nzCompany)))];
  const difficulties = ["All", ...Array.from(new Set(challenges.map((c) => c.difficulty)))];

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      selectedLevel === "All" ||
      (c.level && `Level ${c.level}` === selectedLevel);

    const matchesDifficulty =
      selectedDifficulty === "All" || c.difficulty === selectedDifficulty;

    const matchesCompany =
      selectedCompany === "All" || c.nzCompany === selectedCompany;

    return matchesSearch && matchesLevel && matchesDifficulty && matchesCompany;
  });

  const difficultyColors = isDark ? {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    "Senior Specialist": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  } : {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Hard: "bg-red-50 text-red-700 border-red-200",
    "Senior Specialist": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-colors ${
        isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800"
      }`}>
        {/* Modal Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div>
            <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <span>Codebyte C# Challenges Catalog</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
                isDark ? "bg-indigo-950 text-indigo-400 border-indigo-800" : "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold"
              }`}>
                {challenges.length} Challenges
              </span>
            </h2>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Curated authentic Coderbyte algorithmic assessment challenges with test runners and senior technical reviews.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className={`p-4 border-b flex flex-wrap items-center gap-3 ${
          isDark ? "bg-slate-900/30 border-slate-800/80" : "bg-slate-50/50 border-slate-200"
        }`}>
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search challenges by title, category, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:border-indigo-500 ${
                isDark 
                  ? "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500" 
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
              }`}
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className={isDark ? "text-slate-500" : "text-slate-500"}>Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`rounded-lg px-2.5 py-1 text-xs border focus:outline-none focus:border-indigo-500 ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800 shadow-sm"
              }`}
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l === "Level 1" ? "🟢 Level 1: Fundamentals" :
                   l === "Level 2" ? "🟡 Level 2: Arrays & Colls" :
                   l === "Level 3" ? "🟠 Level 3: Strings & Algos" :
                   l === "Level 4" ? "🔴 Level 4: Senior .NET" : "All Levels"}
                </option>
              ))}
            </select>
          </div>

          {/* Company Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className={isDark ? "text-slate-500" : "text-slate-500"}>Company:</span>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className={`rounded-lg px-2.5 py-1 text-xs border focus:outline-none focus:border-indigo-500 ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800 shadow-sm"
              }`}
            >
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className={isDark ? "text-slate-500" : "text-slate-500"}>Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={`rounded-lg px-2.5 py-1 text-xs border focus:outline-none focus:border-indigo-500 ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800 shadow-sm"
              }`}
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge List Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredChallenges.length === 0 ? (
            <div className={`py-12 text-center text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              No challenges match the current filter.
            </div>
          ) : (
            filteredChallenges.map((ch) => {
              const isSolved = solvedChallengeIds.includes(ch.id);
              const isCurrent = ch.id === currentChallengeId;

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    onSelectChallenge(ch);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? isDark 
                        ? "bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/30"
                        : "bg-indigo-50 border-indigo-300 ring-1 ring-indigo-400/40"
                      : isDark
                      ? "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                      : "bg-white border-slate-200 hover:bg-slate-50/80 shadow-sm"
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      {isSolved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border shrink-0 ${isDark ? "border-slate-700" : "border-slate-300"}`} />
                      )}
                      <h3 className={`font-semibold text-sm ${isDark ? "text-slate-100" : "text-slate-900"}`}>{ch.title}</h3>
                      {ch.level && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border ${
                          ch.level === 1 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                          ch.level === 2 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" :
                          ch.level === 3 ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                          "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}>
                          L{ch.level}
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.2 rounded border font-medium ${difficultyColors[ch.difficulty]}`}>
                        {ch.difficulty}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {ch.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px]">
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">
                        <Briefcase className="w-3 h-3" />
                        {ch.nzCompany}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        <Layers className="w-3 h-3" />
                        {ch.category}
                      </span>
                      <span className={`font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Time: {ch.expectedTimeComplexity}
                      </span>
                      <span className={`font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Space: {ch.expectedSpaceComplexity}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
