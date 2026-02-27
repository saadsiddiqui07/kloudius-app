import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { createAppButtonStyles } from './styles';

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

  const dynamicStyles = useMemo(
    () => createAppButtonStyles(colors, shadows),
    [colors, shadows],
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        dynamicStyles.base,
        dynamicStyles[variant],
        pressed && !isDisabled && dynamicStyles[`pressed_${variant}`],
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
