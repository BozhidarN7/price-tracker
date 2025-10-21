import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'accessToken';
const ID_TOKEN_KEY = 'idToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function storeTokens(data: {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
  await SecureStore.setItemAsync(ID_TOKEN_KEY, data.idToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
}

export async function getStoredTokens() {
  try {
    const tokens = Promise.all([
      SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.getItemAsync(ID_TOKEN_KEY),
      SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
    ]);

    return {
      accessToken: (await tokens)[0],
      idToken: (await tokens)[1],
      refreshToken: (await tokens)[2],
    };
  } catch (_error) {
    return null;
  }
}

export const getAccessToken = async () => {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const getIdToken = async () => {
  return SecureStore.getItemAsync(ID_TOKEN_KEY);
};

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(ID_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
