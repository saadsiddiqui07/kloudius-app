import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { AppInput } from '../src/components/AppInput';
import { ErrorText } from '../src/components/ErrorText';
import { ScreenContainer } from '../src/components/ScreenContainer';
import { useAuth } from '../src/context/AuthContext';
import { useTheme } from '../src/context/ThemeContext';
import type { RootStackParamList } from '../src/navigation/AuthNavigator';
import { fontSize, fontWeight, spacing } from '../src/theme';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

type SignupNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export function SignupScreen() {
  const navigation = useNavigation<SignupNavigationProp>();
  const { colors } = useTheme();
  const { signup, isAuthenticating, authError, clearAuthError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    clearAuthError();
    let valid = true;

    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError(null);
    }

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
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  }, [name, email, password, clearAuthError]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    await signup(name.trim(), email.trim(), password);
  }, [name, email, password, validate, signup]);

  const goToLogin = useCallback(() => {
    clearAuthError();
    navigation.navigate('Login');
  }, [navigation, clearAuthError]);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        keyboardView: { flex: 1 },
        scrollContent: {
          flexGrow: 1,
          paddingTop: spacing.xxl,
        },
        title: {
          fontSize: fontSize.title2,
          fontWeight: fontWeight.bold,
          color: colors.text,
          marginBottom: spacing.sm,
        },
        subtitle: {
          fontSize: fontSize.body,
          color: colors.textSecondary,
          marginBottom: spacing.xxl,
        },
        authError: { marginBottom: spacing.md },
        submitButton: {
          marginTop: spacing.sm,
          marginBottom: spacing.xl,
        },
        loginRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: spacing.md,
        },
        loginRowPressed: { opacity: 0.7 },
        loginPrompt: {
          fontSize: fontSize.body,
          color: colors.textSecondary,
        },
        loginLink: {
          fontSize: fontSize.body,
          fontWeight: fontWeight.semibold,
          color: colors.primary,
        },
      }),
    [colors],
  );

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
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <AppInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError) setNameError(null);
            }}
            autoCapitalize="words"
            autoComplete="name"
            error={nameError ?? undefined}
            editable={!isAuthenticating}
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError(null);
            }}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
            error={passwordError ?? undefined}
            editable={!isAuthenticating}
          />

          <ErrorText style={styles.authError}>{authError}</ErrorText>

          <AppButton
            title="Sign up"
            onPress={handleSubmit}
            loading={isAuthenticating}
            disabled={isAuthenticating}
            style={styles.submitButton}
          />

          <Pressable
            onPress={goToLogin}
            disabled={isAuthenticating}
            style={({ pressed }) => [styles.loginRow, pressed && styles.loginRowPressed]}
            accessibilityRole="button"
            accessibilityLabel="Go to log in"
          >
            <Text style={styles.loginPrompt}>Already have an account? </Text>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

