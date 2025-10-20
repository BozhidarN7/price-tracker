import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/api/auth-api';
import { USER_QUERY_KEYS } from '@/constants';
import { clearTokens, storeTokens } from '@/utils/manage-tokens';

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: async (data) => {
      await storeTokens(data.tokens);

      // Re-fetch user info now that we have tokens
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS });
    },
    onError: async () => {
      await clearTokens();
      queryClient.removeQueries({ queryKey: USER_QUERY_KEYS });
    },
  });
}
