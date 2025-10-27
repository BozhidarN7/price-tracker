import { useQuery } from '@tanstack/react-query';
import { getProductKeys } from '@/constants/query-keys';
import { getProductById } from '@/api/products-api';

export default function useGetProductById(productId: string) {
  return useQuery({
    queryKey: getProductKeys(productId),
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes freshness window
    gcTime: 10 * 60 * 1000, // keep cache 10 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true, // refetch if offline then online
  });
}
