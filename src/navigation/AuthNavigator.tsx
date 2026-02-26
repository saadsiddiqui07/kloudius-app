import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { useAuth } from '../context/AuthContext';
import { HomeScreen } from '../../screens/HomeScreen';
import { LoginScreen } from '../../screens/LoginScreen';
import { SignupScreen } from '../../screens/SignupScreen';

enableScreens(true);

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Shown while restoring session from AsyncStorage (splash/loading state). */
function SplashScreen() {
  return (
    <View style={styles.splash}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function AuthNavigator() {
  const { user, isLoading } = useAuth();

  // Splash/loading state while restoring session from AsyncStorage
  if (isLoading) {
    return (
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  }

  // User exists → Home; otherwise → Login/Signup flow
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator>
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
