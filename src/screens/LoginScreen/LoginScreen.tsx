import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
} from 'react-native';

import { AppButton } from '../../components/AppButton/AppButton';
import { AppInput } from '../../components/AppInput/AppInput';
import { ErrorText } from '../../components/ErrorText/ErrorText';
import { ScreenContainer } from '../../components/ScreenContainer/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import type { RootStackParamList } from '../../navigation/AuthNavigator';
import { createLoginScreenStyles } from './styles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigationProp>();
  const { colors } = useTheme();
  const { login, isAuthenticating, authError, clearAuthError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    clearAuthError();
    let valid = true;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Email is required');
      valid = false;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  }, [email, password, clearAuthError]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    await login(email.trim(), password);
  }, [email, password, validate, login]);

  const goToSignup = useCallback(() => {
    clearAuthError();
    navigation.navigate('Signup');
  }, [navigation, clearAuthError]);

  const styles = React.useMemo(() => createLoginScreenStyles(colors), [colors]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <AppInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError(null);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            error={emailError ?? undefined}
            editable={!isAuthenticating}
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError(null);
            }}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            error={passwordError ?? undefined}
            editable={!isAuthenticating}
          />

          <ErrorText style={styles.authError}>{authError}</ErrorText>

          <AppButton
            title="Log in"
            onPress={handleSubmit}
            loading={isAuthenticating}
            disabled={isAuthenticating}
            style={styles.submitButton}
          />

          <Pressable
            onPress={goToSignup}
            disabled={isAuthenticating}
            style={({ pressed }) => [styles.signupRow, pressed && styles.signupRowPressed]}
            accessibilityRole="button"
            accessibilityLabel="Go to sign up"
          >
            <Text style={styles.signupPrompt}>Don't have an account? </Text>
            <Text style={styles.signupLink}>Sign up</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
