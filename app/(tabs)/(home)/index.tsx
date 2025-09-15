import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ScanLine } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import ProductsList from '@/components/ProductsList';

export default function HomeScreen() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View>
            <Text style={styles.appName}>PriceTracker</Text>
            <Text style={styles.tagline}>Smart shopping, smart savings</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.scanButton}>
          <ScanLine size={24} color={theme.white} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Products</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus
            size={20}
            color={theme.primaryButtonBackground}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      <ProductsList />
    </SafeAreaView>
  );
}

function createStyles(theme: Theme, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.homeBackground,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appName: {
      fontSize: 24,
      fontFamily: 'Inter_700Bold',
      color: theme.primaryFont,
    },
    tagline: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
      marginTop: 2,
    },
    scanButton: {
      backgroundColor: theme.primaryButtonBackground,
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.primaryShadow,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 8,
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
      color: theme.primaryFont,
    },
    addButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.secondaryButtonBackground,
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
