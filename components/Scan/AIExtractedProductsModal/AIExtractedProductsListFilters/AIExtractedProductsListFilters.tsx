import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { Check, X } from 'lucide-react-native';

export default function AIExtractedProductsListFilters() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View>
      <View>
        <Text>Select all (6)</Text>
      </View>
      <View>
        <Check size={18} strokeWidth={2} color={theme.textPrimary} />
        <Text>All</Text>
      </View>
      <View>
        <X size={18} strokeWidth={2} color={theme.textPrimary} />
        <Text>None</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({});
};
