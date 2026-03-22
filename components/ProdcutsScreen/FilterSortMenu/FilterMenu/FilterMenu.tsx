import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useProductsFilter } from '../../contexts/products-filter-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import categories, { Category } from '@/constants/categories';

export default function FilterMenu() {
  const { theme, isDark } = useTheme();
  const { selectedCategories, setSelectedCategories } = useProductsFilter();

  const styles = createStyles(theme, isDark);

  const renderCategory = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategories.includes(item) && {
            backgroundColor: isDark ? theme.white : theme.black,
          },
        ]}
        onPress={() =>
          setSelectedCategories((prev) => {
            if (prev.includes(item)) {
              return prev.toSpliced(prev.indexOf(item));
            }
            return [...prev, item];
          })
        }
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategories.includes(item) && {
              color: isDark ? theme.black : theme.white,
            },
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
