// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import StorageService from "../services/storageService";

const DefaultTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const isDarkMode = await StorageService.getThemePreference();
      setTheme(isDarkMode ? DarkTheme : DefaultTheme);
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const isDarkMode = theme === DefaultTheme;
    setTheme(isDarkMode ? DarkTheme : DefaultTheme);
    console.log("THEME -> ", isDarkMode ? DarkTheme : DefaultTheme)
    await StorageService.saveThemePreference(isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
