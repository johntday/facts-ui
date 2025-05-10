import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if darkMode is set in localStorage or use user's system preference
  useEffect(() => {
    // Check for localStorage first
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Check for system preference if nothing in localStorage
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Update DOM
    document.documentElement.classList.toggle("dark", newDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}