import { StyleSheet } from 'react-native';

import type { ColorPalette, getShadows } from '../../theme';
import { fontSize, fontWeight, radius, spacing } from '../../theme';

type Shadows = ReturnType<typeof getShadows>;

export function createAppButtonStyles(colors: ColorPalette, shadows: Shadows) {
  const base = {
    minHeight: 52,
    borderRadius: radius.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    ...shadows.sm,
  };

  return StyleSheet.create({
    base: base as any,
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.text,
    },
    outline: {
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    pressed_primary: { opacity: 0.92 },
    pressed_secondary: { opacity: 0.92 },
    pressed_outline: {
      borderColor: colors.borderFocus,
      backgroundColor: colors.backgroundSecondary,
    },
    text: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.semibold,
    },
    text_primary: {
      color: colors.inverse,
    },
    text_secondary: {
      color: colors.inverse,
    },
    text_outline: {
      color: colors.text,
    },
    disabled: { opacity: 0.5 },
  });
}
