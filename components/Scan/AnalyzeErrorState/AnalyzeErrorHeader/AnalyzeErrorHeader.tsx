import { StyleSheet, Text, View } from 'react-native';
import { ERROR_CONFIGS, ErrorType } from '../../constants/error-config';
import { CENTER, SIZE } from '../../constants/sizes';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AnalyzeErrorHeaderProps = {
  errorType: ErrorType;
};

export default function AnalyzeErrorHeader({
  errorType,
}: AnalyzeErrorHeaderProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  const errorConfig = ERROR_CONFIGS[errorType];
  const ErrorIcon = errorConfig.icon;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ErrorIcon size={CENTER} strokeWidth={2} color={theme.error} />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.title}>{errorConfig.title}</Text>
        <Text style={styles.description}>{errorConfig.description}</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    container: {
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: SIZE,
      height: SIZE,
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.errorBackground,
    },
    messageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
      color: theme.textPrimary,
    },
    description: {
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
      textAlign: 'center',
    },
  });
};
