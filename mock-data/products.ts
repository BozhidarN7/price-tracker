import { TRENDS } from '@/constants';
import { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Coca-Cola Classic',
    brand: 'Coca-Cola',
    category: 'Beverages',
    imageUrl:
      'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400',
    latestPrice: 1.89,
    latestCurrency: 'EUR',
    priceHistory: [
      { date: '2024-01-15', store: 'Walmart', price: 1.89, currency: 'EUR' },
      { date: '2024-01-10', store: 'Target', price: 1.99, currency: 'EUR' },
    ],
    trend: TRENDS.DOWN,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Nutella Hazelnut Spread',
    brand: 'Ferrero',
    category: 'Food',
    imageUrl:
      'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400',
    latestPrice: 4.99,
    latestCurrency: 'EUR',
    priceHistory: [
      { date: '2024-01-14', store: 'Target', price: 4.99, currency: 'EUR' },
      { date: '2024-01-08', store: 'Kroger', price: 4.49, currency: 'EUR' },
    ],
    trend: TRENDS.UP,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-14',
  },
  {
    id: '3',
    userId: 'user1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Electronics',
    latestPrice: 999.0,
    latestCurrency: 'EUR',
    priceHistory: [
      { date: '2024-01-13', store: 'Best Buy', price: 999.0, currency: 'EUR' },
      {
        date: '2024-01-05',
        store: 'Apple Store',
        price: 999.0,
        currency: 'EUR',
      },
    ],
    trend: TRENDS.STABLE,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-13',
  },
  {
    id: '4',
    userId: 'user1',
    name: 'Organic Bananas',
    brand: 'Whole Foods',
    category: 'Groceries',
    imageUrl:
      'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    latestPrice: 2.49,
    latestCurrency: 'EUR',
    priceHistory: [
      {
        date: '2024-01-12',
        store: 'Whole Foods',
        price: 2.49,
        currency: 'EUR',
      },
      {
        date: '2024-01-07',
        store: 'Whole Foods',
        price: 2.79,
        currency: 'EUR',
      },
    ],
    trend: TRENDS.DOWN,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-12',
  },
];

export default mockProducts;
