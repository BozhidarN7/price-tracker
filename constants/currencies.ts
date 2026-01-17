const CURRENCIES_SYMBOLS_MAP = {
  EUR: '€',
  USD: '$',
  BGN: 'лв',
  GBP: '£',
};

export const CURRENCiES = {
  EUR: 'EUR',
  USD: 'USD',
  BGN: 'BGN',
  GBP: 'GBP',
} as const;

export type CURRENCIES = keyof typeof CURRENCiES;
export default CURRENCIES_SYMBOLS_MAP;
