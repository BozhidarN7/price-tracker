import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { Checkbox } from 'expo-checkbox';
import { AIExtractedProductExtended } from '../../types/ai-extracted-product';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AIExtractedProductsListSelectionControlsProps = {
  setProducts: React.Dispatch<
    React.SetStateAction<AIExtractedProductExtended[]>
  >;
};

export default function AIExtractedProductsListSelectionControls({
  setProducts,
}: AIExtractedProductsListSelectionControlsProps) {
  const { theme, isDark } = useTheme();
  const [allSelected, setAllSelected] = useState(true);

  const styles = createStyles(theme, isDark);

  const selectAllItems = (newValue: boolean) => {
    setAllSelected(newValue);
    setProducts((prev) =>
      prev.map((prod) => ({ ...prod, selected: newValue })),
    );
  };

  return (
    <View style={styles.selectionControlsContainer}>
      <View style={styles.flexRowStyles}>
        <Checkbox
          value={allSelected}
          onValueChange={(newValue: boolean) => selectAllItems(newValue)}
          color={
            allSelected
              ? isDark
                ? theme.buttonTertiary
                : theme.black
              : undefined
          }
          style={styles.checkbox}
        />
        <Text style={styles.controlText}>Select all (6)</Text>
      </View>
      <TouchableOpacity
        style={[styles.flexRowStyles, { marginLeft: 'auto', marginRight: 16 }]}
        onPress={() => selectAllItems(true)}
      >
        <Check
          size={18}
          strokeWidth={2}
          color={allSelected ? theme.textPrimary : theme.textSecondary}
        />
        <Text
          style={[styles.controlText, !allSelected && styles.deSelectedText]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.flexRowStyles]}
        onPress={() => selectAllItems(false)}
      >
        <X
          size={18}
          strokeWidth={2}
          color={allSelected ? theme.textSecondary : theme.textPrimary}
        />
        <Text
          style={[styles.controlText, allSelected && styles.deSelectedText]}
        >
          None
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    selectionControlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexRowStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    controlText: {
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
    deSelectedText: {
      color: theme.textSecondary,
    },
    checkbox: {
      width: 18,
      height: 18,
    },
  });
};
