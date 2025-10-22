import { ADD_PRODUCT_URL, GET_PRODUCTS_URL } from '@/constants/urls';
import { NewProduct, Product } from '@/types/product';
import { getIdToken } from '@/utils/manage-tokens';

export const getProducts = async (): Promise<Product[]> => {
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

export const addProduct = async (newProduct: NewProduct): Promise<Product> => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(ADD_PRODUCT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: idToken,
    },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) {
    throw new Error('Failed to add producct');
  }

  return res.json();
};
