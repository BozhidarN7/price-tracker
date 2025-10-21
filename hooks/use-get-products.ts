import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEYS } from '@/constants/query-keys';
import { getProducts } from '@/api/products-api';

export default function useGetProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEYS,
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes freshness window
    gcTime: 10 * 60 * 1000, // keep cache 10 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true, // refetch if offline then online
  });
}
