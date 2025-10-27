import { PriceEntry } from '@/types/product';

export default function getPriceChangeInfo(priceHistory: PriceEntry[]) {
  if (priceHistory.length < 2) {
    return { change: 0, percentage: 0, trend: 'stable' as const };
  }

  const latest = priceHistory[0].price;
  const previous = priceHistory[1].price;
  const change = latest - previous;
  const percentage = (change / previous) * 100;

  return {
    change,
    percentage: Math.abs(percentage),
    trend:
      change > 0
        ? ('up' as const)
        : change < 0
          ? ('down' as const)
          : ('stable' as const),
  };
}
