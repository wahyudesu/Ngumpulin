"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [currentSystemTheme, setCurrentSystemTheme] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
    if (!systemTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setCurrentSystemTheme(mediaQuery.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) => {
        setCurrentSystemTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", listener);

      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [systemTheme]);

  if (!mounted) return null;

  const effectiveTheme =
    theme === "system" ? (currentSystemTheme ?? systemTheme) : theme;

  return (
    <div className="flex items-center space-x-2">
      <button
        className="px-1"
        onClick={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
      >
        <div className="p-2">
          {effectiveTheme === "dark" ? <Moon /> : <Sun />}
        </div>
      </button>
    </div>
  );
}

