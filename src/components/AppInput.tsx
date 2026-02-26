import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';
import { ErrorText } from './ErrorText';

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
  style,
  onFocus,
  onBlur,
  secureTextEntry,
  ...rest
}: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showPasswordToggle = Boolean(secureTextEntry);
  const isPasswordHidden = showPasswordToggle && !passwordVisible;

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
    <View style={[styles.container, containerStyle]}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocused,
            error != null && error !== '' && styles.inputError,
            showPasswordToggle && styles.inputWithToggle,
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
              styles.toggle,
              pressed && styles.togglePressed,
            ]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
          >
            {isPasswordHidden ? (
              <EyeOffIcon size={TOGGLE_ICON_SIZE} color={colors.textSecondary} />
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

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.body,
    color: colors.text,
    minHeight: 48,
  },
  inputWithToggle: {
    paddingRight: INPUT_RIGHT_PADDING_WITH_TOGGLE,
  },
  inputFocused: {
    borderColor: colors.borderFocus,
  },
  inputError: {
    borderColor: colors.error,
  },
  toggle: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    minWidth: TOGGLE_ICON_SIZE + 16,
    alignItems: 'flex-end',
  },
  togglePressed: {
    opacity: 0.7,
  },
});
