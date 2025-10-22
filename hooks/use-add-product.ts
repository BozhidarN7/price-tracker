import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { addProduct } from '@/api/products-api';
import { NewProduct, Product } from '@/types/product';
import { PRODUCTS_KEYS } from '@/constants/query-keys';

export default function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: NewProduct) => addProduct(newProduct),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: PRODUCTS_KEYS });
      Toast.show({
        type: 'success',
        text1: '✅ Product added',
        text2: `${data.name} was successfully created.`,
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
