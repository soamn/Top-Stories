"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="lg:p-2 p-1 rounded-full transition-colors lg:hover:bg-amber-500 cursor-pointer"
    >
      {isDark ? (
        <Moon className="h-auto w-5 transition-transform duration-500 rotate-0" />
      ) : (
        <Sun className="h-auto w-5 transition-transform duration-500 rotate-180" />
      )}
    </button>
  );
}
