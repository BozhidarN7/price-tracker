import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PriceEntry } from '@/types/product';
import { CURRENCIES_SYMBOLS_MAP } from '@/constants';
import { formatDate } from '@/utils/convert-dates';

type PriceEntriesProps = {
  item: PriceEntry;
  latestCurrency: keyof typeof CURRENCIES_SYMBOLS_MAP;
};

export default function PriceEntries({
  item,
  latestCurrency,
}: PriceEntriesProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.entryItemContainer}>
      <View style={styles.entryInfoContainer}>
        <Text style={[styles.entryInfoText, { fontSize: 14 }]}>
          {formatDate(item.date, { short: true })}
        </Text>
        <Text style={[styles.entryInfoText, { color: theme.secondaryFont }]}>
          {item.store || 'No store specified'}
        </Text>
      </View>
      <Text style={styles.entryPriceText}>
        {CURRENCIES_SYMBOLS_MAP[latestCurrency]}
        {item.price}
      </Text>
    </View>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    entryItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.senaryButtonBackground,
    },
    entryInfoContainer: {
      rowGap: 4,
    },
    entryInfoText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
    },
    entryPriceText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.primaryFont,
    },
  });
};
