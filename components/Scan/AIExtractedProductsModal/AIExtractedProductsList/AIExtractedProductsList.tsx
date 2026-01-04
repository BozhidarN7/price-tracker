import { StyleSheet, Text, View } from 'react-native';
import type { MockDataProductsType } from '../AIExtractedProductsModal';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AIExtractedProductsListProps = {
  products: MockDataProductsType;
};

export default function AIExtractedProductsList({
  products,
}: AIExtractedProductsListProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View>
      <Text>Sign in</Text>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({});
};
