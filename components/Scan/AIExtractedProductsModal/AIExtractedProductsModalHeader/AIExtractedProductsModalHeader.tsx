import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, CheckCircle, Coins, Receipt, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';

type AIExtractedProductsModalHeaderProps = {
  store: string;
  purchaseDate: string;
  currency: string;
  onClose: () => void;
};

export default function AIExtractedProductsModalHeader({
  store,
  purchaseDate,
  currency,
  onClose,
}: AIExtractedProductsModalHeaderProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.headerSection}>
      <View style={styles.receiptIconContainer}>
        <Receipt
          size={28}
          strokeWidth={2}
          color={isDark ? PALETTE.blue[300] : theme.buttonPrimary}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>{store}</Text>
        <View style={styles.subHeaderTextContainer}>
          <View style={styles.purchaseDateContainer}>
            <Calendar size={18} strokeWidth={2} color={theme.textPrimary} />
            <Text style={[styles.subHeaderText, styles.purchaseDateText]}>
              {purchaseDate}
            </Text>
          </View>
          <View style={styles.currencyContainer}>
            <Coins size={18} strokeWidth={2} color={theme.textPrimary} />
            <Text style={[styles.subHeaderText, styles.currencyText]}>
              {currency}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={22} color={theme.textPrimary} strokeWidth={2} />
      </TouchableOpacity>
      <View style={styles.headerDescriptionContainer}>
        <CheckCircle
          size={18}
          strokeWidth={2}
          color={isDark ? PALETTE.blue[300] : PALETTE.blue[600]}
        />
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.headerDescriptionText}>
            Review and edit the extracted data. Tap any field to modify it.
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    headerSection: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: 10,
      padding: 16,
      backgroundColor: isDark ? theme.black : theme.white,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    receiptIconContainer: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? PALETTE.blue[800] : PALETTE.blue[50],
      borderRadius: 12,
    },
    headerTextContainer: {
      rowGap: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
    subHeaderTextContainer: {
      flexDirection: 'row',
      columnGap: 10,
      marginBottom: 10,
    },
    subHeaderText: {
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
    },
    purchaseDateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
    },
    purchaseDateText: {},
    currencyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
    },
    currencyText: {},
    closeButton: {
      marginLeft: 'auto',
    },
    headerDescriptionContainer: {
      flexDirection: 'row',
      flexGrow: 1,
      columnGap: 10,
      backgroundColor: isDark ? PALETTE.blue[900] : PALETTE.blue[50],
      padding: 10,
      borderRadius: 12,
    },
    headerDescriptionText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
  });
};
