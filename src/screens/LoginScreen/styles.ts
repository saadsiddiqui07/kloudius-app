import { StyleSheet } from 'react-native';

import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, spacing } from '../../theme';

export function createLoginScreenStyles(colors: ColorPalette) {
  return StyleSheet.create({
    keyboardView: { flex: 1 },
    scrollContent: {
      flexGrow: 1,
      paddingTop: spacing.xxl,
    },
    title: {
      fontSize: fontSize.title2,
      fontWeight: fontWeight.bold,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: fontSize.body,
      color: colors.textSecondary,
      marginBottom: spacing.xxl,
    },
    authError: { marginBottom: spacing.md },
    submitButton: {
      marginTop: spacing.sm,
      marginBottom: spacing.xl,
    },
    signupRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.md,
    },
    signupRowPressed: { opacity: 0.7 },
    signupPrompt: {
      fontSize: fontSize.body,
      color: colors.textSecondary,
    },
    signupLink: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.semibold,
      color: colors.primary,
    },
  });
}
