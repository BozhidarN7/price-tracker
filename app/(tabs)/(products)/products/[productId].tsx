import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { useGetProductById } from '@/hooks';
import { Product } from '@/types/product';
import { ProductDetails } from '@/components/ProductDetails';

export default function ProductInfoScreen() {
  const { productId } = useLocalSearchParams();
  const { theme, isDark } = useTheme();
  const {
    data: productInfo = {} as Product,
    isLoading: isProductInfoLoading,
    error: productInfoError,
  } = useGetProductById(productId as string);

  const styles = createStyles(theme, isDark);

  if (isProductInfoLoading) {
    return null;
  }

  if (productInfoError) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <ProductDetails productInfo={productInfo} />
    </ScrollView>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
    },
  });
};
