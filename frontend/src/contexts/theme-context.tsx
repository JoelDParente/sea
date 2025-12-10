'use client';

import * as React from 'react';

export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps): React.JSX.Element {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    // recupera preferência do localStorage ou detecta do sistema
    const stored = localStorage.getItem('theme-mode');
    if (stored === 'dark' || stored === 'light') {
      setMode(stored);
      document.documentElement.setAttribute('data-mui-color-scheme', stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialMode = prefersDark ? 'dark' : 'light';
      setMode(initialMode);
      document.documentElement.setAttribute('data-mui-color-scheme', initialMode);
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      document.documentElement.setAttribute('data-mui-color-scheme', newMode);
      return newMode;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext deve ser usado dentro de ThemeContextProvider');
  }
  return context;
}
