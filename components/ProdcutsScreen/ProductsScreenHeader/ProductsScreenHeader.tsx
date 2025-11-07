import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Filter,
  Minus,
  Package,
  Search,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { TRENDS } from '@/constants';

type FilterType = 'all' | TRENDS.UP | TRENDS.DOWN | TRENDS.STABLE;

type ProductsScreenHeaderProps = {
  productsCount?: number;
};

export default function ProductsScreenHeader({
  productsCount = 0,
}: ProductsScreenHeaderProps) {
  const { theme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const styles = createStyles(theme, isDark);
  const getFilterIcon = () => {
    switch (filterType) {
      case TRENDS.UP:
        return <TrendingUp color={theme.trendUp} size={16} />;
      case TRENDS.DOWN:
        return <TrendingDown color={theme.trendDown} size={16} />;
      case TRENDS.STABLE:
        return <Minus color={theme.textSecondary} size={16} />;
      default:
        return <Filter color={theme.textSecondary} size={16} />;
    }
  };

  const getFilterLabel = () => {
    switch (filterType) {
      case TRENDS.UP:
        return 'Increasing';
      case TRENDS.DOWN:
        return 'Decreasing';
      case TRENDS.STABLE:
        return 'Stable';
      default:
        return 'All';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Price Tracker</Text>
          <Text style={styles.subtitle}>
            {productsCount}{' '}
            {productsCount === 1 ? 'product tracked' : 'products tracked'}
          </Text>
        </View>
        <Package color="#2563EB" size={28} />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Search
            size={16}
            color={theme.textTertiary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={theme.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <X size={14} color={theme.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          onPress={() => setDropdownVisible(!dropdownVisible)}
          style={styles.filterButton}
          activeOpacity={0.7}
        >
          {getFilterIcon()}
        </TouchableOpacity>
      </View>

      {/* Active Filter Badge */}
      {filterType !== 'all' && (
        <View style={styles.badge}>
          {getFilterIcon()}
          <Text style={styles.badgeText}>{getFilterLabel()}</Text>
          <TouchableOpacity
            onPress={() => setFilterType('all')}
            style={styles.clearFilterButton}
          >
            <X size={10} color={theme.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {[
            { label: 'All Products', type: 'all' },
            { label: 'Increasing', type: TRENDS.UP },
            { label: 'Decreasing', type: TRENDS.DOWN },
            { label: 'Stable', type: TRENDS.STABLE },
          ].map((item) => (
            <TouchableOpacity
              key={item.type}
              style={styles.dropdownItem}
              onPress={() => {
                setFilterType(item.type as TRENDS | 'all');
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownText}>{item.label}</Text>
              {filterType === item.type && (
                <Text style={styles.activeBadge}>Active</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderColor: theme.border,
      marginBottom: 24,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 8,
    },
    title: {
      fontSize: 22,
      fontFamily: 'Inter_700Bold',
      color: theme.textPrimary,
    },
    subtitle: {
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
    },
    searchContainer: {
      flex: 1,
      position: 'relative',
      justifyContent: 'center',
    },
    searchIcon: {
      position: 'absolute',
      left: 10,
      top: 12,
    },
    searchInput: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      paddingLeft: 32,
      paddingRight: 28,
      paddingVertical: 8,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    clearButton: {
      position: 'absolute',
      right: 10,
      top: 12,
    },
    filterButton: {
      backgroundColor: theme.surface,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginTop: 8,
      backgroundColor: theme.buttonPrimary,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    badgeText: {
      color: theme.white,
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      marginLeft: 4,
    },
    clearFilterButton: {
      marginLeft: 6,
      backgroundColor: theme.black,
      borderRadius: 10,
      padding: 2,
    },
    dropdown: {
      marginTop: 10,
      backgroundColor: theme.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropdownText: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
    },
    activeBadge: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.buttonPrimary,
    },
  });
};
