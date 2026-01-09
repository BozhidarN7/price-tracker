import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';

type AIExtractedProductsStickyActionBarProps = {
  numberOfItemsSelected: number;
};

export default function AIExtractedProductsStickyActionBar({
  numberOfItemsSelected,
}: AIExtractedProductsStickyActionBarProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);
  {
    return (
      <View>
        <View style={styles.selectedItemsContainer}>
          <Text style={styles.selectedItemsText}>
            {numberOfItemsSelected} items selected
          </Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
            <Text style={[styles.actionButtonText, styles.confirmButtonText]}>
              Confirm & Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    selectedItemsContainer: {
      backgroundColor: PALETTE.gray[isDark ? 800 : 50],
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    selectedItemsText: {
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
    actionButtonContainer: {
      backgroundColor: isDark ? theme.black : theme.white,
      flexDirection: 'row',
      gap: 10,
      padding: 16,
    },
    actionButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      borderRadius: 16,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cancelButton: {
      backgroundColor: theme.buttonSecondary,
    },
    confirmButton: {
      backgroundColor: theme.buttonPrimary,
    },
    actionButtonText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
    },
    cancelButtonText: {
      color: theme.textPrimary,
    },
    confirmButtonText: {
      color: theme.white,
    },
  });
};
