"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeSwitchToggle() {
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
  const isDark = effectiveTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
      <div className="pointer-events-none">
        <Switch checked={isDark} disabled />
      </div>
    </Button>
  );
}
