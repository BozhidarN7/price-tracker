import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { deleteProductById } from '@/api/products-api';
import { PRODUCTS_KEYS } from '@/constants/query-keys';

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProductById(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PRODUCTS_KEYS });
      Toast.show({
        type: 'success',
        text1: '✅ Product deleted',
        position: 'bottom',
        visibilityTime: 3000,
      });
    },
    onError: (error: unknown) => {
      Alert.alert(
        '❌ Something went wrong',
        error instanceof Error ? error.message : 'Please try again later.',
      );
    },
  });
}
