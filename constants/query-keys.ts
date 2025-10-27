const USER_QUERY_KEYS = ['user', 'auth'];

export const PRODUCTS_KEYS = ['products'];
export const PRODUCT_KEYS = ['productInfo'];

export default USER_QUERY_KEYS;

export const getProductKeys = (productId: string) => {
  return [...PRODUCT_KEYS, productId];
};
