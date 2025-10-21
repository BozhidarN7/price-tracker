import { GET_PRODUCTS_URL } from '@/constants/urls';
import { getIdToken } from '@/utils/manage-tokens';

export const getProducts = async () => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(GET_PRODUCTS_URL, {
    headers: {
      Authorization: idToken,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};
