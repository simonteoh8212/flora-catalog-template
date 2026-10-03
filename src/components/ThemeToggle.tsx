"use client";

import React, { useEffect, useState } from "react";
import siteConfig from "@/config/site";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // If theme toggle is disabled in siteConfig, don't render anything
  if (siteConfig.enableThemeToggle === false) {
    return null;
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-zinc-300 bg-gray-100/80 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 rotate-0 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-600 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
