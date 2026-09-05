import React from "react";
import { X, Briefcase, ShieldCheck, CheckCircle2, Award, Cpu } from "lucide-react";

interface NZInterviewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const NZInterviewGuideModal: React.FC<NZInterviewGuideModalProps> = ({ isOpen, onClose, isDark = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden select-text border transition-colors ${
        isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-800"
      }`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
              isDark ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-400" : "bg-indigo-50 border-indigo-200 text-indigo-600"
            }`}>
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                New Zealand Senior Software Engineer Interview Handbook
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Competency roadmap for landing Senior / Lead .NET roles across Auckland and Wellington.
              </p>
            </div>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs leading-relaxed">
          {/* Key NZ Companies */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-600 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Major C# / .NET Tech Employers in New Zealand
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/70 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <strong className={`block text-xs ${isDark ? "text-white" : "text-slate-900"}`}>Xero (Auckland / Wellington)</strong>
                <span className={`mt-1 block ${isDark ? "text-slate-400" : "text-slate-600"}`}>Global accounting platform. Focuses on high-scale financial ledgers, AWS + .NET 8, and concurrency.</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/70 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <strong className={`block text-xs ${isDark ? "text-white" : "text-slate-900"}`}>Pushpay (Auckland)</strong>
                <span className={`mt-1 block ${isDark ? "text-slate-400" : "text-slate-600"}`}>Donor and church management systems. Heavy emphasis on zero-allocation tokenizers, resilience, and microservices.</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/70 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <strong className={`block text-xs ${isDark ? "text-white" : "text-slate-900"}`}>Datacom (Nationwide)</strong>
                <span className={`mt-1 block ${isDark ? "text-slate-400" : "text-slate-600"}`}>Enterprise cloud & government engineering. Tests candidates on enterprise architecture, transactional integrity, and memory safety.</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/70 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <strong className={`block text-xs ${isDark ? "text-white" : "text-slate-900"}`}>Trade Me (Wellington)</strong>
                <span className={`mt-1 block ${isDark ? "text-slate-400" : "text-slate-600"}`}>NZ's largest marketplace. Focuses on high-throughput search queries, sliding window caches, and low-latency ASP.NET Core APIs.</span>
              </div>
            </div>
          </div>

          {/* Senior Evaluation Pillars */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              What NZ Tech Leads Look For in Senior Candidates
            </h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Pragmatic Zero-Allocation Mindset
                </span>
                <p className={`mt-1 pl-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Do not allocate arrays or LINQ enumerators inside high-frequency loops. Senior candidates leverage <code className={`px-1 rounded ${isDark ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-800"}`}>ReadOnlySpan&lt;char&gt;</code> and stack allocations.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Clear Complexity Articulation
                </span>
                <p className={`mt-1 pl-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Always explain trade-offs between Time Complexity vs Space Complexity. Mention why an <code className="text-amber-600">O(N log N)</code> approach is preferred over <code className="text-red-500">O(N²)</code> on production scale.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Modern C# 12 & .NET 8 Idioms
                </span>
                <p className={`mt-1 pl-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Demonstrate familiarity with primary constructors, collection expressions, pattern matching, records, and nullable reference types.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex justify-end ${
          isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Close Handbook
          </button>
        </div>
      </div>
    </div>
  );
};
