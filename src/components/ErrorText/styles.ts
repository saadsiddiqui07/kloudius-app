import type { ColorPalette } from '../../theme';
import { fontSize, spacing } from '../../theme';

export function createErrorTextStyle(colors: ColorPalette) {
  return {
    color: colors.error,
    fontSize: fontSize.caption,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  };
}
