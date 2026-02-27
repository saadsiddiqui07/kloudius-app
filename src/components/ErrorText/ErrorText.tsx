import React, { useMemo } from 'react';
import {  Text, type TextProps } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { createErrorTextStyle } from './styles';

type ErrorTextProps = TextProps & {
  children?: React.ReactNode;
};

export function ErrorText({ children, style, ...rest }: ErrorTextProps) {
  const { colors } = useTheme();

  const errorStyle = useMemo(() => createErrorTextStyle(colors), [colors]);

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
