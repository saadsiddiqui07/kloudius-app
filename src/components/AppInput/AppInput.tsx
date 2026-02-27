import React, { useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { EyeIcon } from '../icons/EyeIcon';
import { EyeOffIcon } from '../icons/EyeOffIcon';
import { ErrorText } from '../ErrorText/ErrorText';
import {
  createAppInputStyles,
  TOGGLE_ICON_SIZE,
} from './styles';

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

  const dynamicStyles = useMemo(
    () => createAppInputStyles(colors, shadows),
    [colors, shadows],
  );

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
