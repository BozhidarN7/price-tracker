import mockProducts from '@/mock-data/products';
import type { Product } from '@/types/product';

export default function handleAddProduct(
  newProductData: Omit<Product, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
) {
  const now = new Date().toISOString();
  const newProduct: Product = {
    ...newProductData,
    id: Date.now().toString(),
    userId: 'user1',
    createdAt: now,
    updatedAt: now,
  };

  mockProducts.unshift(newProduct);
}
