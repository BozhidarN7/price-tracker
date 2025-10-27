import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, ChartColumn, Store } from 'lucide-react-native';
import PriceEntries from './PriceEntries';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import TrendBadge from '@/components/TrendBadge';
import { Tag } from '@/components/Tag';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { formatDate } from '@/utils/convert-dates';
import { CURRENCIES_SYMBOLS_MAP } from '@/constants';
import { Product } from '@/types/product';

type ProductDetailsProps = {
  productInfo: Product;
};

export default function ProductDetails({ productInfo }: ProductDetailsProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: productInfo.imageUrl, height: 300 }}
          style={styles.heroImage}
        />

        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']} // from black/50 to transparent
          start={{ x: 0.5, y: 1 }} // gradient starts from bottom
          end={{ x: 0.5, y: 0 }} // to top
          style={StyleSheet.absoluteFill} // equivalent to absolute inset-0
        />

        <View style={styles.heroInfo}>
          <Text style={styles.priceLabelText}>Current price</Text>
          <View style={styles.heroPrice}>
            <Text style={styles.heroPriceText}>
              {CURRENCIES_SYMBOLS_MAP[productInfo.latestCurrency]}
              {productInfo.latestPrice}
            </Text>
            <TrendBadge priceHistory={productInfo.priceHistory} />
          </View>
        </View>
      </View>
      {/*Description Card */}
      <View style={styles.cardContainer}>
        <Text style={styles.brandText}>{productInfo.brand}</Text>
        <Text style={styles.nameText}>{productInfo.name}</Text>
        <Tag text={productInfo.category} />
        <Text style={styles.descriptionText}>
          {productInfo.description}
          {productInfo.description}
        </Text>
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {productInfo.tags?.map((tag) => (
            <Tag
              key={tag}
              text={tag}
              customStylesContainer={styles.tagContainerCustomStyles}
              customStylesText={styles.tagCustomStyles}
            />
          ))}
        </View>
      </View>
      {/* Price Analytics Card */}
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <ChartColumn
            strokeWidth={2}
            size={28}
            color={theme.primaryButtonBackground}
          />
          <Text style={styles.cardTitleText}>Price Analytics</Text>
        </View>
        <View style={styles.priceSectionContainer}>
          <View style={styles.priceInfo}>
            <Text style={styles.priceInfoLabelText}>Average</Text>
            <Text style={styles.priceValueText}>
              {CURRENCIES_SYMBOLS_MAP[productInfo.latestCurrency]}
              {productInfo.averagePrice}
            </Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceInfoLabelText}>Lowest</Text>
            <Text
              style={[styles.priceValueText, { color: theme.downTrendGreen }]}
            >
              {CURRENCIES_SYMBOLS_MAP[productInfo.latestCurrency]}
              {productInfo.lowestPrice}
            </Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceInfoLabelText}>Highest</Text>
            <Text style={[styles.priceValueText, { color: theme.upTrendRed }]}>
              {CURRENCIES_SYMBOLS_MAP[productInfo.latestCurrency]}
              {productInfo.highestPrice}
            </Text>
          </View>
        </View>
      </View>
      {/* Price History Chat*/}
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitleText}>Price History</Text>
        </View>
        <PriceHistoryChart priceHistory={productInfo.priceHistory} />
      </View>
      {/* Latest Enntry Card */}
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitleText}>Latest Entry</Text>
        </View>
        <View style={styles.entryContainer}>
          <Store size={20} strokeWidth={2} color={theme.secondaryFont} />
          <Text style={styles.entryText}>
            {productInfo.priceHistory[0].store || 'No store specified'}
          </Text>
        </View>
        <View style={styles.entryContainer}>
          <Calendar size={20} strokeWidth={2} color={theme.secondaryFont} />
          <Text style={styles.entryText}>
            {formatDate(productInfo.updatedAt)}
          </Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitleText}>All Entries</Text>
        </View>
        {productInfo.priceHistory.map((item) => (
          <PriceEntries
            key={item.priceEntryId}
            item={item}
            latestCurrency={productInfo.latestCurrency}
          />
        ))}
      </View>
    </>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    heroContainer: {
      width: '100%',
      height: 300,
    },
    heroImage: {
      position: 'absolute',
      width: '100%',
    },
    heroInfo: {
      marginTop: 'auto',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    priceLabelText: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: theme.white,
      marginBottom: 4,
    },
    heroPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    heroPriceText: {
      fontSize: 32,
      fontFamily: 'Inter_700Bold',
      color: theme.white,
    },
    cardContainer: {
      backgroundColor: theme.homeBackground,
      marginHorizontal: 20,
      marginBottom: 14,
      paddingHorizontal: 16,
      paddingBottom: 20,
      borderRadius: 12,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    brandText: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryButtonBackground,
      marginBottom: 6,
    },
    nameText: {
      fontSize: 20,
      fontFamily: 'Inter_600SemiBold',
      color: theme.primaryFont,
      marginBottom: 6,
    },
    descriptionText: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
      marginBottom: 6,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tagContainerCustomStyles: {
      backgroundColor: isDark
        ? theme.tertiaryButtonBackground
        : theme.senaryButtonBackground,
    },
    tagCustomStyles: {
      fontFamily: 'Inter_600SemiBold',
    },
    cardTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
      columnGap: 10,
    },
    cardTitleText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.primaryFont,
    },
    priceSectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
    },
    priceInfo: {
      alignItems: 'center',
      rowGap: 6,
    },
    priceInfoLabelText: {
      fontSize: 14,
      color: theme.secondaryFont,
    },
    priceValueText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.primaryFont,
    },
    entryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 12,
      marginBottom: 12,
    },
    entryText: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
    },
  });
};
