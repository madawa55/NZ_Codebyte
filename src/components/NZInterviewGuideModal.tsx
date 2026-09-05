import React from "react";
import { X, Briefcase, ShieldCheck, CheckCircle2, Award, Cpu } from "lucide-react";

interface NZInterviewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NZInterviewGuideModal: React.FC<NZInterviewGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-300 select-text">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                New Zealand Senior Software Engineer Interview Handbook
              </h2>
              <p className="text-xs text-slate-400">
                Competency roadmap for landing Senior / Lead .NET roles across Auckland and Wellington.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs leading-relaxed">
          {/* Key NZ Companies */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Major C# / .NET Tech Employers in New Zealand
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <strong className="text-white block text-xs">Xero (Auckland / Wellington)</strong>
                <span className="text-slate-400 mt-1 block">Global accounting platform. Focuses on high-scale financial ledgers, AWS + .NET 8, and concurrency.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <strong className="text-white block text-xs">Pushpay (Auckland)</strong>
                <span className="text-slate-400 mt-1 block">High-volume payment processor. Emphasizes low-latency algorithms, zero-allocation Span&lt;T&gt;, and ACID compliance.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <strong className="text-white block text-xs">Trade Me (Wellington / Auckland)</strong>
                <span className="text-slate-400 mt-1 block">New Zealand's largest online marketplace. Tests distributed caching, prefix trees, and sliding-window rate limiters.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <strong className="text-white block text-xs">Datacom & Serko</strong>
                <span className="text-slate-400 mt-1 block">Cloud migration & global corporate travel. Tests topological sort, graph traversal, and resilient API architecture.</span>
              </div>
            </div>
          </div>

          {/* The 4 Interview Stages in NZ */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Standard NZ Senior Engineering Interview Loop
            </h3>
            <ol className="space-y-2">
              <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200">1. Take-Home / Automated Coderbyte Screen (60–90 min):</strong>
                <p className="text-slate-400 mt-0.5">Focus on clean code, correct edge cases, and optimal Big-O complexity. Write clean methods with explanatory parameter names.</p>
              </li>
              <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200">2. Live Pair-Programming & Algorithm Discussion (60 min):</strong>
                <p className="text-slate-400 mt-0.5">Communicate your thought process out loud before typing. State Time/Space complexity upfront and evaluate trade-offs.</p>
              </li>
              <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200">3. System Design & .NET Internals (60 min):</strong>
                <p className="text-slate-400 mt-0.5">Be ready for GC questions: differences between Gen 0, 1, 2, and Large Object Heap (LOH &gt; 85KB), boxing overhead, and thread pool starvation.</p>
              </li>
              <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200">4. Kiwi Culture & Pragmatic Collaboration (45 min):</strong>
                <p className="text-slate-400 mt-0.5">NZ engineering cultures value humility, pragmatism, team mentorship, and avoiding over-engineering.</p>
              </li>
            </ol>
          </div>

          {/* Senior Technical Checklists */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Must-Know C# .NET 8 Senior Competencies
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Span&lt;T&gt; vs Memory&lt;T&gt;:</strong> Ref struct on stack for synchronous slicing vs heap-safe struct for async/await callbacks.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>ValueTask vs Task:</strong> Use ValueTask when an async method completes synchronously 95%+ of the time (e.g. cache hit) to eliminate state machine allocations.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Decimal vs Double:</strong> Always decimal (128-bit base 10) for financial ledgers at Xero / Pushpay to avoid binary floating-point rounding errors.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
