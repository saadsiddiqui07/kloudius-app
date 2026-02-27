import { useMemo, type ReactNode } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme';
import { styles } from './styles';

type ScreenContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
  horizontalPadding?: number;
  topPadding?: number;
  bottomPadding?: number;
};

export function ScreenContainer({
  children,
  style,
  horizontalPadding = spacing.screen,
  topPadding = spacing.xxl,
  bottomPadding = spacing.xxl,
}: ScreenContainerProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle = useMemo(
    () => [{ backgroundColor: colors.background }, styles.container],
    [colors.background],
  );

  return (
    <View
      style={[
        containerStyle,
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
