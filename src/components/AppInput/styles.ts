import { StyleSheet } from 'react-native';

import type { ColorPalette, getShadows } from '../../theme';
import { fontSize, fontWeight, radius, spacing } from '../../theme';

type Shadows = ReturnType<typeof getShadows>;

export const TOGGLE_ICON_SIZE = 22;
export const INPUT_RIGHT_PADDING_WITH_TOGGLE = 48;

export function createAppInputStyles(colors: ColorPalette, shadows: Shadows) {
  return StyleSheet.create({
    container: { marginBottom: spacing.lg },
    label: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.medium,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    inputWrapper: { position: 'relative' as const },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: radius.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      fontSize: fontSize.body,
      color: colors.text,
      minHeight: 52,
      ...shadows.sm,
    },
    inputFocused: {
      borderColor: colors.borderFocus,
    },
    inputError: {
      borderColor: colors.error,
    },
    inputWithToggle: {
      paddingRight: INPUT_RIGHT_PADDING_WITH_TOGGLE,
    },
    toggle: {
      position: 'absolute' as const,
      right: spacing.md,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      minWidth: TOGGLE_ICON_SIZE + 16,
      alignItems: 'flex-end',
    },
    togglePressed: { opacity: 0.7 },
  });
}
