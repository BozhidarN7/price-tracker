import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { editProductById } from '@/api/products-api';
import { ModifiedProduct } from '@/types/product';
import { PRODUCTS_KEYS, getProductKeys } from '@/constants/query-keys';

export default function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      modifiedProduct,
    }: {
      productId: string;
      modifiedProduct: ModifiedProduct;
    }) => editProductById(productId, modifiedProduct),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getProductKeys(data.id) }),
        queryClient.invalidateQueries({ queryKey: PRODUCTS_KEYS }),
      ]);
      Toast.show({
        type: 'success',
        text1: '✅ Product modified',
        text2: `${data.name} was successfully modified.`,
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
