import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import categories from '@/constants/categories';

export default function FilterRow() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  const renderCategory = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          item === 'All' && { backgroundColor: theme.black },
        ]}
      >
        <Text
          style={[
            styles.categoryText,
            item === 'All' && { color: theme.white },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={[...categories]}
      renderItem={renderCategory}
      horizontal={true}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    listContainer: {
      gap: 16,
    },
    categoryContainer: {
      minWidth: 60,
      padding: 12,
      backgroundColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,
      borderRadius: 9999,
    },
    categoryText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: theme.textPrimary,
      textAlign: 'center',
    },
  });
};
