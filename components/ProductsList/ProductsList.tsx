import { router } from 'expo-router';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductsSkeleton from '../ProductsSkeleton';
import TrendBadge from '@/components/TrendBadge';
import { CURRENCIES_SYMBOLS_MAP } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { useGetProducts } from '@/hooks';
import { Theme } from '@/types';
import { Product } from '@/types/product';

export default function ProductsList() {
  const { theme, isDark } = useTheme();
  const {
    data: productsData,
    isLoading: areProductsLoading,
    error: productsError,
    refetch: refetchProducts,
    isRefetching: isRefetchingProducts,
  } = useGetProducts();

  const styles = createStyles(theme, isDark);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => router.navigate(`/products/${item.id}`)}
      >
        <View style={styles.productImageContainer}>
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productImage}
            />
          ) : (
            <View style={styles.productImagePlaceholder}>
              <Text style={styles.productImageText}>
                {item.brand ? item.brand.charAt(0) : item.name.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.brand && (
            <Text style={styles.productBrand} numberOfLines={1}>
              {item.brand}
            </Text>
          )}
          <Text style={styles.lastUpdated}>
            Updated {formatDate(item.updatedAt)}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {CURRENCIES_SYMBOLS_MAP[item.latestCurrency]}
            {item.latestPrice.toFixed(2)}
          </Text>
          <TrendBadge priceHistory={item.priceHistory} />
        </View>
      </TouchableOpacity>
    );
  };

  if (areProductsLoading) {
    return (
      <View style={styles.productsList}>
        <ProductsSkeleton count={6} />
      </View>
    );
  }

  if (productsError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load products</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => refetchProducts()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={productsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.productsList}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingProducts}
          onRefresh={refetchProducts}
        />
      }
      ListEmptyComponent={
        <Text style={styles.productsListEmptyText}>No items found</Text>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

function createStyles(theme: Theme, isDark: boolean) {
  return StyleSheet.create({
    productsList: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    productsListEmptyText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
    productCard: {
      backgroundColor: theme.buttonSecondary,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    productImageContainer: {
      marginRight: 12,
    },
    productImage: {
      width: 56,
      height: 56,
      borderRadius: 12,
    },
    productImagePlaceholder: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: theme.buttonTertiary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImageText: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
      color: theme.textPrimary,
    },
    productInfo: {
      flex: 1,
      marginRight: 12,
    },
    productName: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: theme.textPrimary,
      marginBottom: 2,
    },
    productBrand: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
      marginBottom: 4,
    },
    lastUpdated: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: 18,
      fontFamily: 'Inter_700Bold',
      color: theme.textPrimary,
      marginBottom: 4,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    errorText: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: isDark ? '#ff4757' : '#FF3B30',
      textAlign: 'center',
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: theme.buttonPrimary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 20,
    },
    retryButtonText: {
      fontSize: 14,
      fontFamily: 'Inter_600SemiBold',
      color: theme.white,
    },
  });
}
