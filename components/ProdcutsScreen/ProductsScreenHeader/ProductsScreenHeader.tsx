import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Package } from 'lucide-react-native';
import SearchBar from '../SearchBar';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type ProductsScreenHeaderProps = {
  productsCount?: number;
};

export default function ProductsScreenHeader({
  productsCount = 0,
}: ProductsScreenHeaderProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

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

      <SearchBar />
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
  });
};
