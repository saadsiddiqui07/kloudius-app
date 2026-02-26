import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { ScreenContainer } from '../src/components/ScreenContainer';
import { useAuth } from '../src/context/AuthContext';
import { colors, fontSize, fontWeight, spacing } from '../src/theme';

export function HomeScreen() {
  const { user, logout, isAuthenticating } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  if (user == null) {
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome, {user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <AppButton
          title="Log out"
          onPress={handleLogout}
          variant="outline"
          loading={isAuthenticating}
          disabled={isAuthenticating}
          style={styles.logoutButton}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  welcome: {
    fontSize: fontSize.headline,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  email: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  logoutButton: {
    minWidth: 160,
  },
});
