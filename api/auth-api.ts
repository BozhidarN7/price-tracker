import { GET_URLS_URL, LOGIN_URL } from '@/constants/urls';
import { User } from '@/types/user';
import { getStoredToken } from '@/utils/auth';

export const fetchUser = async () => {
  const token = await getStoredToken();

  if (!token) {
    throw new Error('No token found');
  }

  const res = await fetch(GET_URLS_URL, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
};

export async function login(username: string, password: string): Promise<User> {
  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  return res.json();
}
