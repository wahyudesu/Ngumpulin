"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Toogletheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [currentSystemTheme, setCurrentSystemTheme] = useState<string | null>(null);

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

  const effectiveTheme = theme === "system" ? (currentSystemTheme ?? systemTheme) : theme;

  return (
    <div>
      <Toggle
        variant="outline"
        className="group size-9"
        pressed={effectiveTheme === "dark"}
        onPressedChange={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
        aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} mode`}
      >
        <Moon
          size={16}
          strokeWidth={2}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <Sun
          size={16}
          strokeWidth={2}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}