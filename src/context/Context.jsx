import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Context create karo
const ThemeContext = createContext();

// 2️⃣ Provider component
export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3️⃣ Custom hook for easy use
export const useTheme = () => useContext(ThemeContext);