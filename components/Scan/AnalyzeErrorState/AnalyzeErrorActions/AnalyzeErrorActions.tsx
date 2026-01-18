import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, Home, RefreshCw } from 'lucide-react-native';

import { ERROR_CONFIGS, ErrorType } from '../../constants/error-config';

import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AnalyzeErrorActionsProps = {
  errorType: ErrorType;
  onGoHome: () => void;
  onRetry: () => Promise<void>;
  onGoToScan: () => void;
};
export default function AnalyzeErrorActions({
  errorType,
  onGoHome,
  onRetry,
  onGoToScan,
}: AnalyzeErrorActionsProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);
  const errorConfig = ERROR_CONFIGS[errorType];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.actionButton, styles.primaryAction]}
        onPress={onGoToScan}
      >
        <Camera size={14} strokeWidth={2} color={theme.white} />
        <Text style={styles.primarActionText}>{errorConfig.primaryAction}</Text>
      </TouchableOpacity>
      <View style={styles.secondaryActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryAction]}
          onPress={onRetry}
        >
          <RefreshCw size={14} strokeWidth={2} color={theme.textPrimary} />
          <Text style={styles.secondaryActionText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryAction]}
          onPress={onGoHome}
        >
          <Home size={14} strokeWidth={2} color={theme.textPrimary} />
          <Text style={styles.secondaryActionText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: 10,
    },
    secondaryActions: {
      flexDirection: 'row',
      gap: 10,
    },
    actionButton: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      columnGap: 10,
    },
    primaryAction: {
      backgroundColor: theme.buttonPrimary,
    },
    primarActionText: {
      color: theme.white,
      fontFamily: 'Inter_500Medium',
      fontSize: 14,
    },
    secondaryAction: {
      flex: 1,
      backgroundColor: theme.buttonSecondary,
    },
    secondaryActionText: {
      color: theme.textPrimary,
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
    },
  });
};
