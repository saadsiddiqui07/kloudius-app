import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import  HomeScreen  from '../screens/HomeScreen/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen/SignupScreen';
import { styles } from './styles';

enableScreens(true);

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Shown while restoring session from AsyncStorage (splash/loading state). */
function SplashScreen() {
  const { colors } = useTheme();
  const splashStyle = useMemo(
    () => [
      styles.splash,
      { backgroundColor: colors.background },
    ],
    [colors.background],
  );
  return (
    <View style={splashStyle}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

export function AuthNavigator() {
  const { user, isLoading } = useAuth();
  const { colors, isDark } = useTheme();

  const navTheme = React.useMemo(
    () => ({
      ...DefaultTheme,
      dark: isDark,
      colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.background,
        text: colors.text,
        border: colors.border,
        notification: colors.primary,
      },
    }),
    [isDark, colors],
  );

  // Splash/loading state while restoring session from AsyncStorage
  if (isLoading) {
    return (
      <NavigationContainer theme={navTheme}>
        <SplashScreen />
      </NavigationContainer>
    );
  }

  // User exists → Home; otherwise → Login/Signup flow
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        {user != null ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
