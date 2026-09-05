import React, { useRef, useState } from "react";
import { CompilationDiagnostic } from "../types";
import { Copy, Check, AlertCircle, ZoomIn, ZoomOut, RotateCcw, Play } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  diagnostics: CompilationDiagnostic[];
  onRunCode: () => void;
  onResetCode: () => void;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  diagnostics,
  onRunCode,
  onResetCode,
  readOnly = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(13);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const errorLines = new Set(
    diagnostics.filter((d) => d.severity === "error").map((d) => d.line)
  );
  const warningLines = new Set(
    diagnostics.filter((d) => d.severity === "warning").map((d) => d.line)
  );

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onRunCode();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const updateCursorPos = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const textBeforeCursor = code.substring(0, textarea.selectionStart);
    const lineNum = textBeforeCursor.split("\n").length;
    const colNum = textBeforeCursor.length - textBeforeCursor.lastIndexOf("\n");
    setCursorPos({ line: lineNum, col: colNum });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden select-text">
      {/* Bento Editor Header Bar */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
          <span className="text-xs font-mono text-slate-300 font-semibold">Solution.cs</span>
          {errorLines.size > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full font-bold">
              <AlertCircle className="w-3 h-3" />
              {errorLines.size} Error{errorLines.size > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setFontSize((f) => Math.max(11, f - 1))}
              title="Decrease font size"
              className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-slate-400 w-5 text-center">{fontSize}px</span>
            <button
              onClick={() => setFontSize((f) => Math.min(18, f + 1))}
              title="Increase font size"
              className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <div className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            UTF-8 | C# 12 (.NET 8)
          </div>
        </div>
      </div>

      {/* Editor Body: Line Numbers + Text Area */}
      <div className="flex-1 relative flex overflow-hidden font-mono bg-slate-950">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
          className="w-12 py-3 bg-slate-950 border-r border-slate-800/80 text-right pr-3 select-none text-slate-600 overflow-hidden shrink-0"
        >
          {lines.map((_, index) => {
            const lineNum = index + 1;
            const hasError = errorLines.has(lineNum);
            const hasWarning = warningLines.has(lineNum);
            const isCurrentLine = cursorPos.line === lineNum;

            return (
              <div
                key={index}
                className={`flex items-center justify-end gap-1 ${
                  hasError
                    ? "text-red-400 font-bold bg-red-500/10"
                    : hasWarning
                    ? "text-amber-400 font-bold bg-amber-500/10"
                    : isCurrentLine
                    ? "text-slate-300 font-semibold"
                    : ""
                }`}
              >
                {hasError && <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />}
                <span>{lineNum}</span>
              </div>
            );
          })}
        </div>

        {/* Textarea Code Input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursorPos}
          onClick={updateCursorPos}
          spellCheck={false}
          readOnly={readOnly}
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
          className="flex-1 h-full p-3 bg-slate-950 text-slate-200 font-mono resize-none focus:outline-none focus:ring-0 whitespace-pre overflow-auto tab-4 selection:bg-indigo-900/60 selection:text-white"
          placeholder="// Write your C# solution here..."
        />
      </div>

      {/* Bento Editor Footer Bar */}
      <div className="h-11 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
          <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
          <span>Spaces: 4</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">
            <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] text-slate-300">Ctrl + Enter</kbd> to run
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetCode}
            className="text-slate-400 text-xs font-semibold hover:text-white px-2.5 py-1 rounded transition-colors"
          >
            Reset Code
          </button>
          <button
            onClick={onRunCode}
            className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>Run Tests</span>
          </button>
        </div>
      </div>
    </div>
  );
};
