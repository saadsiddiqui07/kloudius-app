import React from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme';

type ScreenContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
  /** Extra horizontal padding (default: theme spacing.screen) */
  horizontalPadding?: number;
  /** Extra top padding below safe area (default: theme spacing) */
  topPadding?: number;
  /** Extra bottom padding above safe area (default: theme spacing) */
  bottomPadding?: number;
};

export function ScreenContainer({
  children,
  style,
  horizontalPadding = spacing.screen,
  topPadding = spacing.xxl,
  bottomPadding = spacing.xxl,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + topPadding,
          paddingBottom: insets.bottom + bottomPadding,
          paddingLeft: insets.left + horizontalPadding,
          paddingRight: insets.right + horizontalPadding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
