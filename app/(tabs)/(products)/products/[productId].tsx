import { useCallback, useLayoutEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { useDeleteProduct, useGetProductById } from '@/hooks';
import { Product } from '@/types/product';
import { ProductDetails } from '@/components/ProductDetails';
import ProductDetailsSkeleton from '@/components/ProductDetails/ProductDetailsSkeleton';
import ProductDetailsError from '@/components/ProductDetails/ProductDetailsError';
import MoreOptionsMenu from '@/components/MoreOptionsMenu';
import EditProductModal from '@/components/EditProductModal';

export default function ProductInfoScreen() {
  const [showEditModal, setShowEditModal] = useState(false);
  const { productId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();
  const {
    data: productInfo = {} as Product,
    isLoading: isProductInfoLoading,
    error: productInfoError,
    refetch: refetchProductInfo,
  } = useGetProductById(productId as string);
  const { mutateAsync: deleteProductAsync } = useDeleteProduct();

  const styles = createStyles(theme, isDark);

  const onRetry = () => {
    refetchProductInfo();
  };

  const onGoHome = () => {
    router.navigate('/');
  };

  const onDelete = useCallback(async () => {
    try {
      const res = await deleteProductAsync(productId as string);
      if (res.message === 'Deleted') {
        router.navigate('/');
      }
    } catch (_err) {}
  }, [productId, deleteProductAsync]);

  const onEdit = useCallback(() => {
    setShowEditModal(true);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MoreOptionsMenu onDelete={onDelete} onEdit={onEdit} />
      ),
    });
  }, [navigation, onDelete, onEdit]);

  if (isProductInfoLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (productInfoError) {
    return (
      <ProductDetailsError
        error={productInfoError.message}
        onRetry={onRetry}
        onGoHome={onGoHome}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <ScrollView style={{ flex: 1 }}>
        <ProductDetails productInfo={productInfo} />
      </ScrollView>
      <EditProductModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </SafeAreaView>
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
