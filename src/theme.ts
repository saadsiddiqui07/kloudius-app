/**
 * Shared design tokens for spacing, typography, and colors.
 * Modern, minimal, professional.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  screen: 24,
} as const;

export const fontSize = {
  caption: 12,
  body: 15,
  bodyLarge: 16,
  subhead: 17,
  title: 18,
  headline: 20,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 12,
  full: 9999,
} as const;

export const colors = {
  // Neutrals
  background: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E5E5E7',
  borderFocus: '#A1A1AA',
  text: '#18181B',
  textSecondary: '#71717A',
  // Semantic
  primary: '#2563EB',
  primaryPressed: '#1D4ED8',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  // States
  disabled: '#A1A1AA',
  placeholder: '#A1A1AA',
} as const;
