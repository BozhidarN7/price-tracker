import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

export default function AnalyzeErrorContactSupport() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View>
      <Text style={styles.supportText}>
        Need help? Contact support at help@pricetracker.com
      </Text>
    </View>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    supportText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.textTertiary,
      textAlign: 'center',
    },
  });
};
