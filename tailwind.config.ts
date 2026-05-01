import type { Config } from "tailwindcss";

// On utilise rgb(var(--*) / <alpha-value>) pour pouvoir combiner :
//   - les variables CSS (qui changent avec le thème light/dark)
//   - les opacity modifiers Tailwind (ex: bg-paper/85, text-ink/60).
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content.json"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: withAlpha("--paper-rgb"),
          alt: withAlpha("--paper-alt-rgb")
        },
        ink: {
          DEFAULT: withAlpha("--ink-rgb"),
          soft: withAlpha("--ink-soft-rgb"),
          line: "var(--ink-line)"
        },
        accent: {
          DEFAULT: withAlpha("--accent-rgb"),
          ink: withAlpha("--accent-ink-rgb")
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      fontSize: {
        "10xl": ["clamp(4rem, 18vw, 16rem)", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
        "9xl": ["clamp(3rem, 12vw, 11rem)", { lineHeight: "0.9", letterSpacing: "-0.035em" }]
      },
      boxShadow: {
        brut: "8px 8px 0 0 var(--ink)",
        "brut-sm": "4px 4px 0 0 var(--ink)",
        "brut-lg": "12px 12px 0 0 var(--ink)",
        "brut-accent": "8px 8px 0 0 var(--accent)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards"
      }
    }
  },
  plugins: []
};

export default config;
