import { StyleSheet, Text, View } from 'react-native';
import FilterRow from './FilterRow';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

export default function FilterSortBar() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <FilterRow />
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
    },
  });
};
