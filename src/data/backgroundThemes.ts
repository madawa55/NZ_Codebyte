import { BackgroundTheme, BackgroundThemeId, BackgroundPatternId } from "../types";

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: "studio-light",
    name: "Studio Light",
    tagline: "Crisp daylight workspace with high-contrast slate surfaces and indigo accents",
    category: "Light",
    isDark: false,
    bgClass: "bg-[#f8fafc]",
    previewColor: "#f8fafc",
    accentColor: "#4f46e5", // indigo-600
    glowClass: "from-indigo-400/20 via-blue-300/10 to-transparent",
    borderColor: "border-slate-200",
    cardBg: "bg-white",
  },
  {
    id: "arctic-frost",
    name: "Arctic Frost",
    tagline: "Glacial sky-blue daylight ambience with deep blue typography and borders",
    category: "Light",
    isDark: false,
    bgClass: "bg-[#f0f9ff]",
    previewColor: "#f0f9ff",
    accentColor: "#0284c7", // sky-600
    glowClass: "from-sky-400/20 via-blue-300/10 to-transparent",
    borderColor: "border-sky-200",
    cardBg: "bg-white",
  },
  {
    id: "warm-stone",
    name: "Warm Paper",
    tagline: "Soft warm daylight tone with amber accents, easy on the eyes for daytime coding",
    category: "Light",
    isDark: false,
    bgClass: "bg-[#fafaf9]",
    previewColor: "#fafaf9",
    accentColor: "#d97706", // amber-600
    glowClass: "from-amber-400/20 via-orange-300/10 to-transparent",
    borderColor: "border-stone-200",
    cardBg: "bg-white",
  },
  {
    id: "mint-clean",
    name: "Mint Sage",
    tagline: "Refreshing soft emerald daylight tint for focused algorithmic problem-solving",
    category: "Light",
    isDark: false,
    bgClass: "bg-[#f0fdf4]",
    previewColor: "#f0fdf4",
    accentColor: "#059669", // emerald-600
    glowClass: "from-emerald-400/20 via-teal-300/10 to-transparent",
    borderColor: "border-emerald-200",
    cardBg: "bg-white",
  },
  {
    id: "lavender-mist",
    name: "Lavender Mist",
    tagline: "Soft pastel purple twilight glow on a bright paper canvas",
    category: "Light",
    isDark: false,
    bgClass: "bg-[#faf5ff]",
    previewColor: "#faf5ff",
    accentColor: "#9333ea", // purple-600
    glowClass: "from-purple-400/20 via-indigo-300/10 to-transparent",
    borderColor: "border-purple-200",
    cardBg: "bg-white",
  },
  {
    id: "midnight-slate",
    name: "Obsidian Slate",
    tagline: "High-contrast deep navy dark mode with cool indigo accents",
    category: "Dark",
    isDark: true,
    bgClass: "bg-[#020617]",
    previewColor: "#020617",
    accentColor: "#6366f1", // indigo-500
    glowClass: "from-indigo-600/15 via-blue-600/10 to-transparent",
    borderColor: "border-slate-800",
    cardBg: "bg-slate-900/60",
  },
  {
    id: "oled-black",
    name: "OLED Pitch Black",
    tagline: "True pitch black for maximum contrast and zero distractions",
    category: "Dark",
    isDark: true,
    bgClass: "bg-[#000000]",
    previewColor: "#000000",
    accentColor: "#38bdf8", // sky-400
    glowClass: "from-sky-500/10 via-slate-700/5 to-transparent",
    borderColor: "border-neutral-800",
    cardBg: "bg-neutral-950/80",
  },
  {
    id: "cyber-matrix",
    name: "Cyber Emerald",
    tagline: "Hacker terminal green inspired by high-throughput backend services",
    category: "Cyber",
    isDark: true,
    bgClass: "bg-[#02140d]",
    previewColor: "#02140d",
    accentColor: "#10b981", // emerald-500
    glowClass: "from-emerald-500/15 via-teal-600/10 to-transparent",
    borderColor: "border-emerald-950",
    cardBg: "bg-emerald-950/40",
  },
  {
    id: "oceanic-abyss",
    name: "Pacific Oceanic",
    tagline: "Deep Auckland harbour sapphire depths with cyan luminescence",
    category: "Atmospheric",
    isDark: true,
    bgClass: "bg-[#021024]",
    previewColor: "#021024",
    accentColor: "#06b6d4", // cyan-500
    glowClass: "from-cyan-500/15 via-blue-600/10 to-transparent",
    borderColor: "border-sky-950",
    cardBg: "bg-sky-950/40",
  },
  {
    id: "twilight-velvet",
    name: "Twilight Nebula",
    tagline: "Deep Wellington dusk with subtle royal purple cosmic hues",
    category: "Atmospheric",
    isDark: true,
    bgClass: "bg-[#0c061e]",
    previewColor: "#0c061e",
    accentColor: "#a855f7", // purple-500
    glowClass: "from-purple-600/15 via-indigo-600/10 to-transparent",
    borderColor: "border-purple-950",
    cardBg: "bg-purple-950/40",
  },
  {
    id: "sunset-ember",
    name: "Volcanic Ember",
    tagline: "Warm Rangitoto volcanic charcoal with deep amber glow",
    category: "Atmospheric",
    isDark: true,
    bgClass: "bg-[#140907]",
    previewColor: "#140907",
    accentColor: "#f97316", // orange-500
    glowClass: "from-orange-600/15 via-rose-600/10 to-transparent",
    borderColor: "border-orange-950",
    cardBg: "bg-stone-950/50",
  },
];

export interface PatternConfig {
  id: BackgroundPatternId;
  name: string;
  description: string;
}

export const BACKGROUND_PATTERNS: PatternConfig[] = [
  {
    id: "grid",
    name: "Tech Grid",
    description: "Sleek geometric 32px engineering grid lines",
  },
  {
    id: "dots",
    name: "Dot Matrix",
    description: "Subtle terminal matrix dotted pattern",
  },
  {
    id: "aurora",
    name: "Aurora Glow",
    description: "Atmospheric soft radial daylight glow",
  },
  {
    id: "clean",
    name: "Clean Minimal",
    description: "Flat distraction-free solid color",
  },
];
