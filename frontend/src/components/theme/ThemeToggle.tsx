import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tastevia_theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const applyTheme = (next: "light" | "dark", persist = true) => {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    if (persist) {
      localStorage.setItem(STORAGE_KEY, next);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");

    applyTheme(initial, Boolean(stored));

    const listener = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      applyTheme(event.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={theme === "dark"}
      className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-orange-300 hover:text-orange-500 dark:bg-white/5"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
