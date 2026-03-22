import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Search, X } from 'lucide-react-native';
import { useProductsFilter } from '../contexts/products-filter-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';
export default function SearchBar() {
  const { theme, isDark } = useTheme();
  const { searchQuery, setSearchQuery } = useProductsFilter();
  const focus = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: interpolate(focus.value, [0, 1], [1, 2]),
      borderColor: interpolateColor(
        focus.value,
        [0, 1],
        isDark
          ? [theme.buttonSecondary, PALETTE.gray[800]]
          : [PALETTE.gray[100], PALETTE.gray[300]],
      ),
    };
  });

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.searchRow}>
      <Animated.View style={[styles.searchContainer, animatedStyle]}>
        <Search
          size={16}
          color={theme.textSecondary}
          style={styles.searchIcon}
          strokeWidth={2}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={theme.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => {
            focus.value = withTiming(1, { duration: 150 });
          }}
          onBlur={() => {
            focus.value = withTiming(0, { duration: 150 });
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <X size={16} color={theme.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      marginVertical: 12,
    },
    searchContainer: {
      flex: 1,
      position: 'relative',
      justifyContent: 'center',
      borderRadius: 12,
    },
    searchIcon: {
      position: 'absolute',
      left: 10,
      zIndex: 1,
    },
    searchInput: {
      backgroundColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,
      borderRadius: 12,
      paddingLeft: 32,
      paddingRight: 28,
      paddingVertical: 8,
      fontSize: 14,
      color: theme.textPrimary,
    },
    clearButton: {
      position: 'absolute',
      right: 10,
      zIndex: 1,
    },
  });
};
