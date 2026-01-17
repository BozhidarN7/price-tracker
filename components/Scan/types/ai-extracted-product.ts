import { CONFIDENCE_LEVELS } from '../constants';
import { CURRENCIES } from '@/constants/currencies';

export type AIExtractedProduct = {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  confidence: CONFIDENCE_LEVELS;
};

export type AIExtractedProductExtended = AIExtractedProduct & {
  selected: boolean;
  originalName: string;
  originalBrand: string | null;
  originalPrice: number;
};

export type AIAnalyzedReceipt = {
  store: string;
  purchaseDate: string;
  currency: CURRENCIES;
  products: AIExtractedProduct[];
};
