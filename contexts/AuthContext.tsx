import { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { clearTokens, getStoredToken } from '@/utils/auth';
import { useLogin, useUser } from '@/hooks';
import { UserInfo } from '@/types/user';
import { USER_QUERY_KEYS } from '@/constants';

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

  useEffect(() => {
    (async () => {
      const token = await getStoredToken();
      setHasToken(!!token);
    })();
  }, [user]);

  const login = async (username: string, password: string) => {
    await loginMutation({ username, password });
  };

  const logout = async () => {
    await clearTokens();
    await queryClient.resetQueries({ queryKey: USER_QUERY_KEYS });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    hasToken,
    login,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
