import base64 from 'react-native-base64';
import { getStoredTokens, storeTokens } from './manage-tokens';
import { refreshTokens } from '@/api/auth-api';

export async function isAuthenticated() {
  const tokens = await getStoredTokens();
  if (!tokens) {
    return false;
  }

  const { accessToken, refreshToken } = tokens;
  if (!accessToken) {
    return false;
  }

  try {
    // Check if access token is expired
    const payload = JSON.parse(base64.decode(accessToken.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp > currentTime) {
      return true;
    }

    if (!refreshToken) {
      return false;
    }

    // Try to refresh tokens if access token is expired
    const data = await refreshTokens(refreshToken);
    const { tokens } = data || {};

    if (!tokens || !tokens.accessToken) {
      return false;
    }
    await storeTokens(tokens);
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}
