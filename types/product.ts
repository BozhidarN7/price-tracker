import { CURRENCIES_SYMBOLS_MAP, TRENDS } from '@/constants';

export type PriceEntry = {
  priceEntryId: string;
  date: string;
  store?: string;
  location?: {
    lat: number;
    lng: number;
  };
  price: number;
  currency: keyof typeof CURRENCIES_SYMBOLS_MAP;
};

export type Product = {
  id: string;
  userId: string;
  name: string;
  brand?: string;
  category: string;
  description?: string;
  imageUrl?: string;

  // Price tracking
  latestPrice: number;
  latestCurrency: keyof typeof CURRENCIES_SYMBOLS_MAP;
  latestStore?: string;
  latestPurchaseDate?: string;
  priceHistory: PriceEntry[];

  // Analytics (computed fields)
  averagePrice?: number;
  lowestPrice?: number;
  highestPrice?: number;
  trend?: TRENDS;

  // Metadata
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  ocrRawText?: string; // Raw OCR output for debugging
};

export type NewProduct = Omit<
  Product,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>;

export type ModifiedProduct = Partial<Product>;
