import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const AUTH_STORAGE_KEY = '@auth_user';

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_DELAY_MS = 400;

function mockDelay(ms: number = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 6;
}

async function persistUser(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    __DEV__ && console.warn('AuthContext: persistUser failed', e);
    throw new Error('Failed to save session');
  }
}

async function getStoredUser(): Promise<User | null> {
  try {
    const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (raw == null) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof (parsed as User).id === 'string' &&
      typeof (parsed as User).name === 'string' &&
      typeof (parsed as User).email === 'string'
    ) {
      return parsed as User;
    }
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  } catch {
    return null;
  }
}

async function clearStoredUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    __DEV__ && console.warn('AuthContext: clearStoredUser failed', e);
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const restoreSession = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const stored = await getStoredUser();
      setUser(stored);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthError(null);
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setAuthError('Email is required');
        return;
      }
      if (!validateEmail(trimmedEmail)) {
        setAuthError('Please enter a valid email address');
        return;
      }
      if (!validatePassword(password)) {
        setAuthError('Password must be at least 6 characters');
        return;
      }

      setIsAuthenticating(true);
      try {
        await mockDelay();
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: trimmedEmail.split('@')[0],
          email: trimmedEmail,
        };
        await persistUser(mockUser);
        setUser(mockUser);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Login failed. Please try again.';
        setAuthError(message);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [],
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setAuthError(null);
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      if (!trimmedName) {
        setAuthError('Name is required');
        return;
      }
      if (!trimmedEmail) {
        setAuthError('Email is required');
        return;
      }
      if (!validateEmail(trimmedEmail)) {
        setAuthError('Please enter a valid email address');
        return;
      }
      if (!validatePassword(password)) {
        setAuthError('Password must be at least 6 characters');
        return;
      }

      setIsAuthenticating(true);
      try {
        await mockDelay();
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: trimmedName,
          email: trimmedEmail,
        };
        await persistUser(mockUser);
        setUser(mockUser);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Sign up failed. Please try again.';
        setAuthError(message);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setAuthError(null);
    setIsAuthenticating(true);
    try {
      await clearStoredUser();
      setUser(null);
    } catch {
      setUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticating,
      authError,
      login,
      signup,
      logout,
      clearAuthError,
    }),
    [
      user,
      isLoading,
      isAuthenticating,
      authError,
      login,
      signup,
      logout,
      clearAuthError,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
