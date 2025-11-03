import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import PriceEntry from './PriceEntry';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { Product } from '@/types/product';
import AddPriceEntryModal from '@/components/AddPriceEntryModal';

type PriceEntriesProps = {
  productInfo: Product;
};

export default function PriceEntries({ productInfo }: PriceEntriesProps) {
  const { theme, isDark } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const styles = createStyles(theme, isDark);

  // by Date, latest first
  const sortedPriceEntires = [...productInfo.priceHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitleText}>All Entries</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus
              size={18}
              color={theme.primaryButtonBackground}
              strokeWidth={2}
              onPress={() => setShowAddModal(true)}
            />
          </TouchableOpacity>
        </View>
        {sortedPriceEntires.map((item) => (
          <PriceEntry
            key={item.priceEntryId}
            item={item}
            latestCurrency={productInfo.latestCurrency}
            priceHistory={productInfo.priceHistory}
          />
        ))}
      </View>
      <AddPriceEntryModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
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
    cardTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    addButton: {
      width: 32,
      height: 32,
      borderRadius: 18,
      backgroundColor: theme.secondaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  });
};
