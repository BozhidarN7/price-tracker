export const BASE_PRICE_TRACKER_API_URL =
  process.env.EXPO_PUBLIC_BASE_PRICE_TRACKER_API_URL || '';

export const LOGIN_URL = `${BASE_PRICE_TRACKER_API_URL}/sign-in`;
export const GET_URLS_URL = `${BASE_PRICE_TRACKER_API_URL}/get-user`;
export const REFRESH_TOKEN_URL = `${BASE_PRICE_TRACKER_API_URL}/refresh-token`;
