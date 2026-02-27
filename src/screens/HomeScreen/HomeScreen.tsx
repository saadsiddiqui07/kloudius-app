import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '../../components';
import { ScreenContainer } from '../../components/ScreenContainer/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { createHomeScreenStyles } from './styles';

const HomeScreen = () => {
  const { colors } = useTheme();
  const { user, logout, isAuthenticating } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const styles = useMemo(() => createHomeScreenStyles(colors), [colors]);

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
};

export default HomeScreen;
