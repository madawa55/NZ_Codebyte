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
  isDark?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  diagnostics,
  onRunCode,
  onResetCode,
  readOnly = false,
  isDark = true,
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

    const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart);
    const line = textBeforeCursor.split("\n").length;
    const col = textBeforeCursor.split("\n").pop()?.length || 0;
    setCursorPos({ line, col: col + 1 });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`h-full flex flex-col rounded-2xl shadow-sm overflow-hidden select-text transition-colors duration-300 border ${
      isDark 
        ? "bg-slate-950 border-slate-800" 
        : "bg-white border-slate-200"
    }`}>
      {/* Bento Editor Header Bar */}
      <div className={`h-10 flex items-center justify-between px-4 shrink-0 border-b ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={`w-3 h-3 rounded-full inline-block ${isDark ? "bg-slate-700" : "bg-slate-300"}`}></span>
          <span className={`text-xs font-mono font-semibold ${isDark ? "text-slate-300" : "text-slate-800"}`}>Solution.cs</span>
          {errorLines.size > 0 && (
            <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold border ${
              isDark 
                ? "text-red-400 bg-red-500/10 border-red-500/20" 
                : "text-red-700 bg-red-50 border-red-200"
            }`}>
              <AlertCircle className="w-3 h-3" />
              {errorLines.size} Error{errorLines.size > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <button
              onClick={() => setFontSize((f) => Math.max(11, f - 1))}
              title="Decrease font size"
              className={`p-1 rounded transition-colors ${isDark ? "hover:text-white hover:bg-slate-800" : "hover:text-slate-900 hover:bg-slate-200/70"}`}
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono w-5 text-center">{fontSize}px</span>
            <button
              onClick={() => setFontSize((f) => Math.min(18, f + 1))}
              title="Increase font size"
              className={`p-1 rounded transition-colors ${isDark ? "hover:text-white hover:bg-slate-800" : "hover:text-slate-900 hover:bg-slate-200/70"}`}
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <div className={`h-3 w-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

          <button
            onClick={handleCopy}
            title="Copy code"
            className={`p-1 rounded transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/70"}`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <div className={`text-[10px] font-mono hidden sm:inline ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            UTF-8 | C# 12 (.NET 8)
          </div>
        </div>
      </div>

      {/* Editor Body: Line Numbers + Text Area */}
      <div className={`flex-1 relative flex overflow-hidden font-mono ${isDark ? "bg-slate-950" : "bg-white"}`}>
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
          className={`w-12 py-3 border-r text-right pr-3 select-none overflow-hidden shrink-0 ${
            isDark 
              ? "bg-slate-950 border-slate-800/80 text-slate-600" 
              : "bg-slate-50/80 border-slate-200 text-slate-400"
          }`}
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
                    ? isDark ? "text-red-400 font-bold bg-red-500/10" : "text-red-600 font-bold bg-red-50"
                    : hasWarning
                    ? isDark ? "text-amber-400 font-bold bg-amber-500/10" : "text-amber-600 font-bold bg-amber-50"
                    : isCurrentLine
                    ? isDark ? "text-slate-300 font-semibold" : "text-slate-800 font-semibold"
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
          className={`flex-1 h-full p-3 font-mono resize-none focus:outline-none focus:ring-0 whitespace-pre overflow-auto tab-4 ${
            isDark
              ? "bg-slate-950 text-slate-200 selection:bg-indigo-900/60 selection:text-white placeholder:text-slate-600"
              : "bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-950 caret-indigo-600 placeholder:text-slate-400"
          }`}
          placeholder="// Write your C# solution here..."
        />
      </div>

      {/* Bento Editor Footer Bar */}
      <div className={`h-11 border-t px-4 flex items-center justify-between text-xs shrink-0 select-none ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className={`flex items-center gap-3 font-mono text-[11px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
          <span>Spaces: 4</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            <kbd className={`px-1 py-0.5 rounded text-[10px] border ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-200 border-slate-300 text-slate-700"
            }`}>Ctrl + Enter</kbd> to run
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetCode}
            className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
              isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Reset Code
          </button>
          <button
            onClick={onRunCode}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              isDark 
                ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700" 
                : "bg-slate-200 text-slate-800 border-slate-300 hover:bg-slate-300"
            }`}
          >
            <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
            <span>Run Tests</span>
          </button>
        </div>
      </div>
    </div>
  );
};
