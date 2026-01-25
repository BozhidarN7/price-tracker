import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type SortOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { value: 'recently_updated', label: 'Recently Updated' },
  { value: 'latest_price', label: 'Latest Price' },
  { value: 'biggest_increase', label: 'Biggest Price Increase' },
  { value: 'biggest_decrease', label: 'Biggest Price Decrease' },
  { value: 'name', label: 'Name (A–Z)' },
];

export default function SortMenu() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const currentSort = SORT_OPTIONS.find((o) => o.value === sortBy);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Dropdown Trigger */}
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setDropdownOpen(true)}
        >
          <Text style={styles.dropdownText}>
            {currentSort?.label || 'Sort by'}
          </Text>
          <ChevronDown size={14} strokeWidth={2} color={theme.textPrimary} />
        </TouchableOpacity>

        {/* Direction Toggle */}
        <TouchableOpacity style={styles.directionButton}>
          {true ? (
            <ArrowUp size={14} strokeWidth={2} color={theme.textPrimary} />
          ) : (
            <ArrowDown size={14} strokeWidth={2} color={theme.textPrimary} />
          )}
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={SORT_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const selected = item.value === sortBy;
                return (
                  <TouchableOpacity
                    style={[
                      styles.optionRow,
                      selected && styles.optionRowSelected,
                    ]}
                    onPress={() => {
                      setSortBy(item.value);
                      setDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                    {selected && <View style={styles.selectedDot} />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: isDark ? theme.black : theme.white,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    dropdownTrigger: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      backgroundColor: isDark ? theme.buttonSecondary : theme.white,
    },
    dropdownText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: theme.textPrimary,
    },
    directionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      backgroundColor: isDark ? theme.buttonSecondary : theme.white,
    },

    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    modalContent: {
      backgroundColor: isDark ? theme.black : theme.white,
      borderRadius: 8,
      overflow: 'hidden',
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    optionRowSelected: {
      backgroundColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,
    },
    optionText: {
      flex: 1,
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: theme.textPrimary,
    },
    selectedDot: {
      width: 6,
      height: 6,
      borderRadius: 9999,
      backgroundColor: isDark ? theme.white : theme.black,
    },
  });
};
