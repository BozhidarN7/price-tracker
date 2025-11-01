import { CURRENCIES_SYMBOLS_MAP } from '@/constants';

type ProductModalFormData = {
  name: string;
  brand: string;
  category: string;
  price: string;
  currency: keyof typeof CURRENCIES_SYMBOLS_MAP;
  store: string;
  date: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export default ProductModalFormData;
