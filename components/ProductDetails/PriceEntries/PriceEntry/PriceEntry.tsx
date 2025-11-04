import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EditPriceEntryModal from '@/components/EditPriceEntryModal/EditPriceEntryModal';
import MoreOptionsMenu from '@/components/MoreOptionsMenu';
import { CURRENCIES_SYMBOLS_MAP } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { useEditProduct } from '@/hooks';
import { Theme } from '@/types';
import { ModifiedProduct, PriceEntry as PriceEntryType } from '@/types/product';
import { formatDate } from '@/utils/convert-dates';

type PriceEntryProps = {
  item: PriceEntryType;
  latestCurrency: keyof typeof CURRENCIES_SYMBOLS_MAP;
  priceHistory: PriceEntryType[];
};

export default function PriceEntry({
  item,
  latestCurrency,
  priceHistory,
}: PriceEntryProps) {
  const { theme, isDark } = useTheme();
  const { productId } = useLocalSearchParams();
  const { mutateAsync: updateProductAsync } = useEditProduct();
  const [showEditPriceEntryModal, setShowEditPriceEntryModal] = useState(false);

  const styles = createStyles(theme, isDark);

  const onDelete = async () => {
    try {
      const updatedHistory = priceHistory.filter(
        (entry) => entry.priceEntryId !== item.priceEntryId,
      );
      const modifiedProduct: ModifiedProduct = {
        priceHistory: updatedHistory,
      };
      await updateProductAsync({
        productId: productId as string,
        modifiedProduct,
      });
    } catch (_err) {}
  };

  const onEdit = () => {
    setShowEditPriceEntryModal(true);
  };

  return (
    <>
      <View style={styles.entryItemContainer}>
        <View style={styles.entryInfoContainer}>
          <Text style={[styles.entryInfoText, { fontSize: 14 }]}>
            {formatDate(item.date, { short: true })}
          </Text>
          <Text style={[styles.entryInfoText, { color: theme.textSecondary }]}>
            {item.store || 'No store specified'}
          </Text>
        </View>
        <View style={styles.entryRightContainer}>
          <Text style={styles.entryPriceText}>
            {CURRENCIES_SYMBOLS_MAP[latestCurrency]}
            {item.price}
          </Text>
          {priceHistory.length === 1 ? null : (
            <MoreOptionsMenu onDelete={onDelete} onEdit={onEdit} />
          )}
        </View>
      </View>
      <EditPriceEntryModal
        visible={showEditPriceEntryModal}
        onClose={() => setShowEditPriceEntryModal(false)}
        priceEntry={item}
      />
    </>
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
      borderBottomColor: theme.buttonSenary,
    },
    entryInfoContainer: {
      rowGap: 4,
    },
    entryInfoText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
    entryPriceText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.textPrimary,
    },
    entryRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 12,
    },
  });
};
