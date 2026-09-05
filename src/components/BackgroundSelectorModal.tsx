import React, { useState } from "react";
import { 
  X, 
  Palette, 
  Sparkles, 
  Check, 
  Shuffle, 
  Grid, 
  CircleDot, 
  CloudSun, 
  Square, 
  RotateCcw,
  Sun,
  Moon
} from "lucide-react";
import { BackgroundThemeId, BackgroundPatternId } from "../types";
import { BACKGROUND_THEMES, BACKGROUND_PATTERNS } from "../data/backgroundThemes";

interface BackgroundSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: BackgroundThemeId;
  currentPattern: BackgroundPatternId;
  onSelectTheme: (themeId: BackgroundThemeId) => void;
  onSelectPattern: (patternId: BackgroundPatternId) => void;
  onRandomizeTheme: () => void;
  onResetDefault: () => void;
  isDark?: boolean;
}

export const BackgroundSelectorModal: React.FC<BackgroundSelectorModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  currentPattern,
  onSelectTheme,
  onSelectPattern,
  onRandomizeTheme,
  onResetDefault,
  isDark = true,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  if (!isOpen) return null;

  const currentTheme = BACKGROUND_THEMES.find((t) => t.id === currentThemeId) || BACKGROUND_THEMES[0];

  const getPatternIcon = (id: BackgroundPatternId) => {
    switch (id) {
      case "grid":
        return <Grid className="w-4 h-4" />;
      case "dots":
        return <CircleDot className="w-4 h-4" />;
      case "aurora":
        return <CloudSun className="w-4 h-4" />;
      case "clean":
        return <Square className="w-4 h-4" />;
    }
  };

  const filteredThemes = categoryFilter === "All" 
    ? BACKGROUND_THEMES 
    : BACKGROUND_THEMES.filter(t => t.category === categoryFilter || (categoryFilter === "Light" && !t.isDark) || (categoryFilter === "Dark" && t.isDark));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="background-selector-modal"
        className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${
          isDark 
            ? "bg-slate-900 border-slate-800 text-slate-200" 
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        {/* Modal Header */}
        <div className={`px-6 py-4 flex items-center justify-between shrink-0 border-b ${
          isDark ? "bg-slate-950/70 border-slate-800/80" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
              isDark ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-400" : "bg-indigo-50 border-indigo-200 text-indigo-600"
            }`}>
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-semibold tracking-tight flex items-center gap-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Background & Theme Studio
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-200 text-slate-700 border-slate-300"
                }`}>
                  {BACKGROUND_THEMES.length} Themes
                </span>
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Switch between Light & Dark modes, ambient hues, and texture patterns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRandomizeTheme}
              id="btn-shuffle-theme"
              title="Shuffle / Randomize Background"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                isDark 
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" 
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
              }`}
            >
              <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
              <span>Shuffle</span>
            </button>

            <button
              onClick={onClose}
              id="btn-close-bg-modal"
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 pb-1 overflow-x-auto">
            {["All", "Light", "Dark", "Atmospheric"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  categoryFilter === cat
                    ? isDark 
                      ? "bg-indigo-600 text-white border-indigo-500" 
                      : "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : isDark 
                    ? "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200" 
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "Light" && <Sun className="w-3 h-3" />}
                {cat === "Dark" && <Moon className="w-3 h-3" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Section 1: Themes Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Atmospheric Themes
              </label>
              <span className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                Active: <span className="text-indigo-600 font-semibold">{currentTheme.name}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredThemes.map((theme) => {
                const isSelected = theme.id === currentThemeId;
                return (
                  <button
                    key={theme.id}
                    id={`btn-theme-${theme.id}`}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`relative text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                      isSelected
                        ? isDark 
                          ? "bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg"
                          : "bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-sm"
                        : isDark
                        ? "bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700"
                        : "bg-slate-50 hover:bg-slate-100/90 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {/* Swatch circle with accent border */}
                    <div 
                      className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border shadow-inner relative overflow-hidden mt-0.5"
                      style={{ 
                        backgroundColor: theme.previewColor,
                        borderColor: theme.accentColor + "66"
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-40"
                        style={{
                          background: `radial-gradient(circle at top right, ${theme.accentColor}, transparent 70%)`
                        }}
                      />
                      {isSelected && (
                        <Check className={`w-4 h-4 z-10 ${theme.isDark ? "text-white" : "text-indigo-900"}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-semibold truncate transition-colors ${
                          isDark 
                            ? "text-white group-hover:text-indigo-300" 
                            : "text-slate-900 group-hover:text-indigo-700"
                        }`}>
                          {theme.name}
                        </span>
                        <span 
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase font-medium"
                          style={{
                            color: theme.accentColor,
                            borderColor: theme.accentColor + "40",
                            backgroundColor: theme.accentColor + "15"
                          }}
                        >
                          {theme.category}
                        </span>
                      </div>
                      <p className={`text-[11px] line-clamp-2 mt-1 leading-snug ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {theme.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Pattern Overlay Style */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Pattern & Texture Overlay
              </label>
              <span className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Changes background visual texture
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BACKGROUND_PATTERNS.map((pattern) => {
                const isSelected = pattern.id === currentPattern;
                return (
                  <button
                    key={pattern.id}
                    id={`btn-pattern-${pattern.id}`}
                    onClick={() => onSelectPattern(pattern.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? isDark 
                          ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/30"
                          : "bg-indigo-50 border-indigo-400 text-indigo-900 ring-1 ring-indigo-500/30 font-semibold"
                        : isDark
                        ? "bg-slate-950/50 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <div className={`p-2 rounded-lg mb-1.5 ${
                      isSelected 
                        ? isDark ? "bg-indigo-500 text-white" : "bg-indigo-600 text-white" 
                        : isDark ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-700"
                    }`}>
                      {getPatternIcon(pattern.id)}
                    </div>
                    <span className="text-xs font-semibold">{pattern.name}</span>
                    <span className={`text-[10px] leading-tight mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{pattern.description.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Keyboard Shortcut Helper */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
            isDark 
              ? "bg-slate-950/60 border-slate-800/80 text-slate-400" 
              : "bg-slate-50 border-slate-200 text-slate-600"
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Pro Tip: Press <kbd className={`px-1.5 py-0.5 rounded font-mono text-[10px] border ${
                isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"
              }`}>B</kbd> outside the editor to instantly cycle backgrounds!</span>
            </div>
            <button
              onClick={onResetDefault}
              id="btn-reset-default-theme"
              className={`flex items-center gap-1 text-[11px] underline underline-offset-4 ${
                isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              Reset Default
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-3 border-t flex items-center justify-between shrink-0 ${
          isDark ? "bg-slate-950/80 border-slate-800/80" : "bg-slate-50 border-slate-200"
        }`}>
          <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            Saved automatically to browser storage
          </span>
          <button
            onClick={onClose}
            id="btn-apply-bg"
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl shadow-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
