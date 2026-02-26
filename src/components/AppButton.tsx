import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { fontSize, fontWeight, radius, spacing } from '../theme';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
};

export function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}: AppButtonProps) {
  const { colors, shadows } = useTheme();
  const isDisabled = disabled || loading;

  const dynamicStyles = useMemo(() => {
    const base = {
      minHeight: 52,
      borderRadius: radius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      ...shadows.sm,
    };
    const variantStyles = {
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
    };
    const pressedStyles = {
      primary: { opacity: 0.92 },
      secondary: { opacity: 0.92 },
      outline: {
        borderColor: colors.borderFocus,
        backgroundColor: colors.backgroundSecondary,
      },
    };
    const textStyles = {
      primary: { color: colors.inverse },
      secondary: { color: colors.inverse },
      outline: { color: colors.text },
    };
    return StyleSheet.create({
      base: base as any,
      primary: variantStyles.primary,
      secondary: variantStyles.secondary,
      outline: variantStyles.outline,
      pressed: pressedStyles,
      text: {
        fontSize: fontSize.body,
        fontWeight: fontWeight.semibold,
      },
      text_primary: textStyles.primary,
      text_secondary: textStyles.secondary,
      text_outline: textStyles.outline,
      disabled: { opacity: 0.5 },
    });
  }, [colors, shadows.sm]);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        dynamicStyles.base,
        dynamicStyles[variant],
        pressed && !isDisabled && dynamicStyles.pressed[variant],
        isDisabled && dynamicStyles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' || variant === 'secondary'
              ? colors.inverse
              : colors.primary
          }
        />
      ) : (
        <Text style={[dynamicStyles.text, dynamicStyles[`text_${variant}`]]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
