import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, getShadows, lightColors } from '../theme';
import type { ColorPalette } from '../theme';

type ThemeContextValue = {
  isDark: boolean;
  colors: ColorPalette;
  shadows: ReturnType<typeof getShadows>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? darkColors : lightColors;
  const shadows = useMemo(() => getShadows(colors), [colors]);

  const value = useMemo<ThemeContextValue>(
    () => ({ isDark, colors, shadows }),
    [isDark, colors, shadows],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context == null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
