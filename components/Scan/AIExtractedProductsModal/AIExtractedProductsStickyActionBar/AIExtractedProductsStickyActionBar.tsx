import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AIExtractedProductExtended } from '../../types/ai-extracted-product';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';
import { NewProduct, Product } from '@/types/product';
import { CURRENCIES } from '@/constants/currencies';
import { PRODUCTS_SCREEN_URL } from '@/constants/urls';

type AIExtractedProductsStickyActionBarProps = {
  numberOfItemsSelected: number;
  products: AIExtractedProductExtended[];
  addProductAsync: UseMutateAsyncFunction<
    Product,
    unknown,
    NewProduct[],
    unknown
  >;
  store: string;
  purchaseDate: string;
  currency: CURRENCIES;
  onClose: () => void;
};

export default function AIExtractedProductsStickyActionBar({
  numberOfItemsSelected,
  products,
  addProductAsync,
  store,
  purchaseDate,
  currency,
  onClose,
}: AIExtractedProductsStickyActionBarProps) {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  const styles = createStyles(theme, isDark);

  const handleAddProducts = async () => {
    try {
      const newProducts: NewProduct[] = products.map((product) => {
        return {
          name: product.name,
          brand: product.brand || '',
          category: '',
          latestPrice: product.price,
          latestCurrency: currency,
          priceHistory: [
            {
              priceEntryId: Crypto.randomUUID(),
              store,
              date: purchaseDate,
              price: product.price,
              currency,
            },
          ],
        };
      });

      await addProductAsync(newProducts);
      router.replace(PRODUCTS_SCREEN_URL);
    } catch (_err) {}
  };

  return (
    <View>
      <View style={styles.selectedItemsContainer}>
        <Text style={styles.selectedItemsText}>
          {numberOfItemsSelected} items selected
        </Text>
      </View>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.confirmButton]}
          onPress={handleAddProducts}
        >
          <Text style={[styles.actionButtonText, styles.confirmButtonText]}>
            Confirm & Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    selectedItemsContainer: {
      backgroundColor: PALETTE.gray[isDark ? 800 : 50],
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    selectedItemsText: {
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
    actionButtonContainer: {
      backgroundColor: isDark ? theme.black : theme.white,
      flexDirection: 'row',
      gap: 10,
      padding: 16,
    },
    actionButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      borderRadius: 16,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cancelButton: {
      backgroundColor: theme.buttonSecondary,
    },
    confirmButton: {
      backgroundColor: theme.buttonPrimary,
    },
    actionButtonText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
    },
    cancelButtonText: {
      color: theme.textPrimary,
    },
    confirmButtonText: {
      color: theme.white,
    },
  });
};
