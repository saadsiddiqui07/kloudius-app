import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, fontSize, spacing } from '../theme';

type ErrorTextProps = TextProps & {
  children?: React.ReactNode;
};

export function ErrorText({ children, style, ...rest }: ErrorTextProps) {
  if (children == null || (typeof children === 'string' && children === '')) {
    return null;
  }

  return (
    <Text style={[styles.error, style]} accessibilityLiveRegion="polite" {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: fontSize.caption,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
});
