import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AlertCircle, Home, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type ProductDetailsErrorProps = {
  error?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
};

export default function ProductDetailsError({
  error,
  onRetry,
  onGoHome,
}: ProductDetailsErrorProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <AlertCircle size={48} color={theme.errorRed} strokeWidth={2} />
          </View>
        </View>

        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>{error}</Text>

        <View style={styles.buttonGroup}>
          {onRetry && (
            <TouchableOpacity style={styles.primaryButton} onPress={onRetry}>
              <RefreshCw
                size={18}
                color={theme.white}
                style={styles.buttonIcon}
              />
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </TouchableOpacity>
          )}
          {onGoHome && (
            <TouchableOpacity style={styles.outlineButton} onPress={onGoHome}>
              <Home
                size={18}
                color={theme.primaryFont}
                style={styles.buttonIcon}
              />
              <Text style={styles.outlineButtonText}>Go Home</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.footerText}>
          If this problem persists, please contact support
        </Text>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? theme.tertiaryButtonBackground
        : theme.quinaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      backgroundColor: theme.secondaryButtonBackground,
      borderRadius: 12,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconBackground: {
      backgroundColor: theme.redBackground,
      borderRadius: 50,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Inter_500Medium',
      marginBottom: 24,
      color: theme.primaryFont,
    },
    message: {
      color: theme.primaryFont,
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 32,
    },
    buttonGroup: {
      width: '100%',
      gap: 12,
    },
    primaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.primaryButtonBackground,
      paddingVertical: 12,
      borderRadius: 8,
    },
    primaryButtonText: {
      color: theme.white,
      fontFamily: 'Inter_500Medium',
    },
    outlineButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: isDark
        ? theme.tertiaryButtonBackground
        : theme.senaryButtonBackground,
      borderWidth: 1,
      paddingVertical: 12,
      borderRadius: 8,
    },
    outlineButtonText: {
      color: theme.primaryFont,
      fontFamily: 'Inter_500Medium',
    },
    buttonIcon: {
      marginRight: 8,
    },
    footerText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
      textAlign: 'center',
      marginTop: 24,
    },
  });
};
