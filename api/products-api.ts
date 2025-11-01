import { PRODUCTS_URL, getProductByIdUrl } from '@/constants/urls';
import { ModifiedProduct, NewProduct, Product } from '@/types/product';
import { getIdToken } from '@/utils/manage-tokens';

export const getProducts = async (): Promise<Product[]> => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(PRODUCTS_URL, {
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

  const res = await fetch(PRODUCTS_URL, {
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

export const getProductById = async (productId: string): Promise<Product> => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(getProductByIdUrl(productId), {
    method: 'GET',
    headers: {
      Authorization: idToken,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product details');
  }

  return res.json();
};

export const editProductById = async (
  productId: string,
  modifiedProduct: ModifiedProduct,
): Promise<Product> => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(getProductByIdUrl(productId), {
    method: 'PATCH',
    headers: {
      Authorization: idToken,
    },
    body: JSON.stringify(modifiedProduct),
  });

  if (!res.ok) {
    throw new Error('Failed to edit product');
  }

  return res.json();
};

export const deleteProductById = async (
  productId: string,
): Promise<{ message: string }> => {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(getProductByIdUrl(productId), {
    method: 'DELETE',
    headers: {
      Authorization: idToken,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete product');
  }

  return res.json();
};
