import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react-native';
import ProductsSkeleton from '../ProductsSkeleton';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { Product } from '@/types/product';
import { CURRENCIES_SYMBOLS_MAP, TRENDS } from '@/constants';
import { useGetProducts } from '@/hooks';

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

  const getPriceChangeInfo = (product: Product) => {
    if (product.priceHistory.length < 2) {
      return { change: 0, percentage: 0, trend: 'stable' as const };
    }

    const latest = product.priceHistory[0].price;
    const previous = product.priceHistory[1].price;
    const change = latest - previous;
    const percentage = (change / previous) * 100;

    return {
      change,
      percentage: Math.abs(percentage),
      trend:
        change > 0
          ? ('up' as const)
          : change < 0
            ? ('down' as const)
            : ('stable' as const),
    };
  };

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
    const priceInfo = getPriceChangeInfo(item);

    return (
      <TouchableOpacity style={styles.productCard}>
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

          {priceInfo.trend !== TRENDS.STABLE && (
            <View
              style={[
                styles.trendBadge,
                {
                  backgroundColor:
                    priceInfo.trend === TRENDS.UP
                      ? theme.upTrendRed
                      : theme.downTrendGreen,
                },
              ]}
            >
              {priceInfo.trend === TRENDS.UP ? (
                <TrendingUp size={12} color={theme.white} strokeWidth={2} />
              ) : (
                <TrendingDown size={12} color={theme.white} strokeWidth={2} />
              )}
              <Text style={styles.trendText}>
                {priceInfo.percentage.toFixed(1)}%
              </Text>
            </View>
          )}

          {priceInfo.trend === TRENDS.STABLE && (
            <View
              style={[
                styles.trendBadge,
                {
                  backgroundColor: isDark
                    ? theme.tertiaryButtonBackground
                    : theme.quaternaryButtonBackground,
                },
              ]}
            >
              <Minus size={12} color={theme.white} strokeWidth={2} />
              <Text style={styles.trendText}>Stable</Text>
            </View>
          )}
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
      backgroundColor: theme.secondaryButtonBackground,
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
      backgroundColor: theme.tertiaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImageText: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
      color: theme.primaryFont,
    },
    productInfo: {
      flex: 1,
      marginRight: 12,
    },
    productName: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: theme.primaryFont,
      marginBottom: 2,
    },
    productBrand: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
      marginBottom: 4,
    },
    lastUpdated: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: 18,
      fontFamily: 'Inter_700Bold',
      color: theme.primaryFont,
      marginBottom: 4,
    },
    trendBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    trendText: {
      fontSize: 12,
      fontFamily: 'Inter_600SemiBold',
      color: theme.white,
      marginLeft: 4,
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
      backgroundColor: theme.primaryButtonBackground,
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
