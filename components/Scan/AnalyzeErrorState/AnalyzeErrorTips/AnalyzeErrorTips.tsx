import { StyleSheet, Text, View } from 'react-native';
import { Info } from 'lucide-react-native';
import { ERROR_CONFIGS, ErrorType } from '../../constants/error-config';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AnalyzeErrorTipsProps = {
  errorType: ErrorType;
};
export default function AnalyzeErrorTips({ errorType }: AnalyzeErrorTipsProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);
  const errorConfig = ERROR_CONFIGS[errorType];

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitleContainer}>
        <Info size={20} color={theme.buttonPrimary} strokeWidth={2} />
        <Text style={styles.sectionTitle}>What you can try</Text>
      </View>
      <View style={styles.tipsContainer}>
        {errorConfig.tips.map((tip) => (
          <View key={tip} style={styles.bulletContainer}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: 10,
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 16,
      padding: 16,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontFamily: 'Inter_600SemiBold',
      color: theme.textPrimary,
    },
    tipsContainer: {
      gap: 4,
    },
    bulletContainer: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    bullet: {
      fontSize: 13,
      fontFamily: 'Inter_500Medium',
      lineHeight: 22,
    },
    tipText: {
      color: theme.textSecondary,
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      lineHeight: 22,
    },
  });
};
