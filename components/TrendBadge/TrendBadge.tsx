import { StyleSheet, Text, View } from 'react-native';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PriceEntry } from '@/types/product';
import { getPriceChangeInfo } from '@/utils';
import { TRENDS } from '@/constants';

export type TrendBadgeProps = {
  priceHistory: PriceEntry[];
};

export default function TrendBadge({ priceHistory }: TrendBadgeProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  const priceInfo = getPriceChangeInfo(priceHistory);

  return (
    <>
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
    </>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
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
  });
};
