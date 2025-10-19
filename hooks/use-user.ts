import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/auth-api';
import { UserInfo } from '@/types/user';
import { USER_QUERY_KEYS } from '@/constants';

export default function useUser() {
  return useQuery<UserInfo>({
    queryKey: USER_QUERY_KEYS,
    queryFn: fetchUser,
    enabled: true,
    staleTime: Infinity,
  });
}
