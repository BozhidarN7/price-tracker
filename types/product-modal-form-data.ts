import { CURRENCIES_SYMBOLS_MAP } from '@/constants';
import type { Category } from '@/constants/categories';

type ProductModalFormData = {
  name: string;
  brand: string;
  category: Category;
  price: string;
  currency: keyof typeof CURRENCIES_SYMBOLS_MAP;
  store: string;
  date: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export default ProductModalFormData;
