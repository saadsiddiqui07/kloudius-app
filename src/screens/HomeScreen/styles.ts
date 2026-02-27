import { StyleSheet } from 'react-native';

import type { ColorPalette } from '../../theme';
import { fontSize, fontWeight, spacing } from '../../theme';

export function createHomeScreenStyles(colors: ColorPalette) {
  return StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
    },
    welcome: {
      fontSize: fontSize.title2,
      fontWeight: fontWeight.bold,
      color: colors.text,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    email: {
      fontSize: fontSize.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.xxl,
    },
    logoutButton: {
      minWidth: 180,
    },
  });
}
