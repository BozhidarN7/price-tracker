import { StyleSheet, Text, View } from 'react-native';
import FilterMenu from './FilterMenu';
import SortMenu from './SortMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

export default function FilterSortMenu() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <FilterMenu />
      <SortMenu />
      <View>
        <Text style={styles.filterSummaryText}>
          Sorted by Recently Updated - 0 products
        </Text>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderColor: theme.border,
      marginBottom: 24,
      gap: 10,
    },
    filterSummaryText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: theme.textTertiary,
    },
  });
};
