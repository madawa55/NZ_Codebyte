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
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  challenges,
  currentChallengeId,
  onSelectChallenge,
  solvedChallengeIds,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");

  if (!isOpen) return null;

  const companies = ["All", ...Array.from(new Set(challenges.map((c) => c.nzCompany)))];
  const difficulties = ["All", ...Array.from(new Set(challenges.map((c) => c.difficulty)))];

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "All" || c.difficulty === selectedDifficulty;

    const matchesCompany =
      selectedCompany === "All" || c.nzCompany === selectedCompany;

    return matchesSearch && matchesDifficulty && matchesCompany;
  });

  const difficultyColors = {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    "Senior Specialist": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>NZ Senior C# Algorithm Challenges</span>
              <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded-full font-mono">
                {challenges.length} Available
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Curated for senior engineering interviews at Xero, Pushpay, Datacom, Trade Me, and Serko.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/30 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search challenges by title, category, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Company Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Company:</span>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500"
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
            <span className="text-slate-500">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500"
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
            <div className="py-12 text-center text-slate-500 text-xs">
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
                      ? "bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/30"
                      : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      {isSolved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <h3 className="font-semibold text-slate-100 text-sm">{ch.title}</h3>
                      <span className={`text-[10px] px-2 py-0.2 rounded border font-medium ${difficultyColors[ch.difficulty]}`}>
                        {ch.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {ch.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-indigo-400">
                        <Briefcase className="w-3 h-3" />
                        {ch.nzCompany}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Layers className="w-3 h-3" />
                        {ch.category}
                      </span>
                      <span className="font-mono text-slate-400">
                        Time: {ch.expectedTimeComplexity}
                      </span>
                      <span className="font-mono text-slate-400">
                        Space: {ch.expectedSpaceComplexity}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
