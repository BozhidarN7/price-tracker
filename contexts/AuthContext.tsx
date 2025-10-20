import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLogin, useUser } from '@/hooks';
import { UserInfo } from '@/types/user';
import { USER_QUERY_KEYS } from '@/constants';
import { isAuthenticated } from '@/utils/auth';
import { clearTokens } from '@/utils/manage-tokens';

interface AuthContextType {
  user?: UserInfo;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasToken: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [hasToken, setHasToken] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: loginMutation } = useLogin();
  const { data: user, isLoading } = useUser();

  const login = useCallback(
    async (username: string, password: string) => {
      await loginMutation({ username, password });
    },
    [loginMutation],
  );

  const logout = useCallback(async () => {
    await clearTokens();
    await queryClient.resetQueries({ queryKey: USER_QUERY_KEYS });
  }, [queryClient]);

  useEffect(() => {
    (async () => {
      const isSignedIn = await isAuthenticated();
      if (isSignedIn) {
        setHasToken(isSignedIn);
      } else {
        await logout();
      }
    })();
  }, [user, logout]);

  const value = {
    user,
    isAuthenticated: !!user && hasToken,
    isLoading,
    hasToken,
    login,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
