import React, { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { ErrorText } from './ErrorText';
import { fontSize, fontWeight, radius, spacing } from '../theme';

const TOGGLE_ICON_SIZE = 22;
const INPUT_RIGHT_PADDING_WITH_TOGGLE = 48;

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
};

export function AppInput({
  label,
  error,
  containerStyle,
  // style,
  onFocus,
  onBlur,
  secureTextEntry,
  ...rest
}: AppInputProps) {
  const { colors, shadows } = useTheme();
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showPasswordToggle = Boolean(secureTextEntry);
  const isPasswordHidden = showPasswordToggle && !passwordVisible;

  const dynamicStyles = useMemo(() => {
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
  }, [colors, shadows.sm]);

  const handleFocus = (e: any) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((v) => !v);
  };

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {label != null && <Text style={dynamicStyles.label}>{label}</Text>}
      <View style={dynamicStyles.inputWrapper}>
        <TextInput
          style={[
            dynamicStyles.input,
            focused && dynamicStyles.inputFocused,
            error != null && error !== '' && dynamicStyles.inputError,
            showPasswordToggle && dynamicStyles.inputWithToggle,
          ]}
          placeholderTextColor={colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPasswordHidden}
          {...rest}
        />
        {showPasswordToggle && (
          <Pressable
            onPress={togglePasswordVisibility}
            style={({ pressed }) => [
              dynamicStyles.toggle,
              pressed && dynamicStyles.togglePressed,
            ]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordHidden ? 'Show password' : 'Hide password'
            }
          >
            {isPasswordHidden ? (
              <EyeOffIcon
                size={TOGGLE_ICON_SIZE}
                color={colors.textSecondary}
              />
            ) : (
              <EyeIcon size={TOGGLE_ICON_SIZE} color={colors.textSecondary} />
            )}
          </Pressable>
        )}
      </View>
      <ErrorText>{error}</ErrorText>
    </View>
  );
}
