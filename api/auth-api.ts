import { GET_URLS_URL, LOGIN_URL, REFRESH_TOKEN_URL } from '@/constants/urls';
import { Tokens, User, UserInfo } from '@/types/user';
import { getStoredTokens } from '@/utils/manage-tokens';

export const fetchUser = async (): Promise<UserInfo> => {
  const tokens = await getStoredTokens();

  if (!tokens || tokens.accessToken == null) {
    throw new Error('No token found');
  }

  const res = await fetch(GET_URLS_URL, {
    method: 'GET',
    headers: {
      Authorization: tokens.accessToken!,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
};

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  return res.json();
};

export const refreshTokens = async (
  refreshToken: string,
): Promise<{ tokens: Tokens }> => {
  const res = await fetch(REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error('failed to refresh token');
  }

  return res.json();
};
