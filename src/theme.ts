/**
 * Design tokens: spacing, typography, radius, shadows.
 * Color palettes are in ThemeContext (light/dark).
 */

import { Platform } from 'react-native';

/** Consistent spacing scale (4px base) */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screen: 24,
} as const;

/** Font size hierarchy */
export const fontSize = {
  caption: 12,
  footnote: 14,
  body: 16,
  subhead: 17,
  title3: 18,
  title2: 20,
  headline: 20,
  title1: 24,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

/** Rounded corners for inputs, buttons, cards */
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type ColorPalette = {
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  borderFocus: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryPressed: string;
  error: string;
  errorMuted: string;
  disabled: string;
  placeholder: string;
  shadow: string;
  inverse: string;
  inverseSecondary: string;
};

/** Soft light palette – warm neutrals, gentle primary */
export const lightColors: ColorPalette = {
  background: '#F5F5F7',
  backgroundSecondary: '#EBEBED',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E2E2E6',
  borderFocus: '#8E8E93',
  text: '#1C1C1E',
  textSecondary: '#636366',
  textTertiary: '#8E8E93',
  primary: '#0A84FF',
  primaryPressed: '#0066CC',
  error: '#FF3B30',
  errorMuted: '#FFE5E3',
  disabled: '#AEAEB2',
  placeholder: '#8E8E93',
  shadow: 'rgba(0,0,0,0.08)',
  inverse: '#FFFFFF',
  inverseSecondary: 'rgba(255,255,255,0.85)',
};

/** Soft dark palette – true black avoided for OLED comfort */
export const darkColors: ColorPalette = {
  background: '#1C1C1E',
  backgroundSecondary: '#2C2C2E',
  surface: '#2C2C2E',
  surfaceElevated: '#3A3A3C',
  border: '#48484A',
  borderFocus: '#636366',
  text: '#FFFFFF',
  textSecondary: '#EBEBED',
  textTertiary: '#8E8E93',
  primary: '#0A84FF',
  primaryPressed: '#409CFF',
  error: '#FF453A',
  errorMuted: '#3D231F',
  disabled: '#636366',
  placeholder: '#636366',
  shadow: 'rgba(0,0,0,0.4)',
  inverse: '#1C1C1E',
  inverseSecondary: 'rgba(28,28,30,0.85)',
};

/** Tasteful elevation: use for inputs, buttons, cards */
export function getShadows(colors: ColorPalette) {
  const shadowColor = colors.shadow;
  return {
    sm:
      Platform.OS === 'ios'
        ? {
            shadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 2,
          }
        : { elevation: 2 },
    md:
      Platform.OS === 'ios'
        ? {
            shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 4,
          }
        : { elevation: 4 },
  };
}
