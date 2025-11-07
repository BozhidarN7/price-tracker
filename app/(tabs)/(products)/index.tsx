import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdddProductModal from '@/components/AddProductModal';
import ProductsList from '@/components/ProductsList';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { ProductsScreenHeader } from '@/components/ProdcutsScreen';

export default function ProductsScreen() {
  const { theme, isDark } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const styles = createStyles(theme, isDark);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ProductsScreenHeader />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Products</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus
            size={20}
            color={theme.buttonPrimary}
            strokeWidth={2}
            onPress={() => setShowAddModal(true)}
          />
        </TouchableOpacity>
      </View>

      <ProductsList />
      <AdddProductModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </SafeAreaView>
  );
}

function createStyles(theme: Theme, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surface,
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter_600SemiBold',
      color: theme.textPrimary,
    },
    addButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.buttonSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  });
}
