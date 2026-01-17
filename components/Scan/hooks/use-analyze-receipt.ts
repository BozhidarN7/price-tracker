import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { extractProductsFromReceipt } from '../api/ai-extracted-products-api';

export default function useAnalyzeReceipt() {
  return useMutation({
    mutationFn: async (photoUri: string) =>
      extractProductsFromReceipt(photoUri),
    onError: (error: unknown) => {
      Alert.alert(
        '❌ Something went wrong',
        error instanceof Error ? error.message : 'Please try again.',
      );
    },
  });
}
