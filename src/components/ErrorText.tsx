import React, { useMemo } from 'react';
import {  Text, type TextProps } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { fontSize, spacing } from '../theme';

type ErrorTextProps = TextProps & {
  children?: React.ReactNode;
};

export function ErrorText({ children, style, ...rest }: ErrorTextProps) {
  const { colors } = useTheme();

  const errorStyle = useMemo(
    () => ({
      color: colors.error,
      fontSize: fontSize.caption,
      marginTop: spacing.xs,
      paddingHorizontal: spacing.xs,
    }),
    [colors.error],
  );

  if (children == null || (typeof children === 'string' && children === '')) {
    return null;
  }

  return (
    <Text
      style={[errorStyle, style]}
      accessibilityLiveRegion="polite"
      {...rest}
    >
      {children}
    </Text>
  );
}
