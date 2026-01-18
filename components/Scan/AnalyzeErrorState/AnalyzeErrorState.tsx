import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorType } from '../constants/error-config';
import AnalyzeErrorHeader from './AnalyzeErrorHeader';
import AnalyzeErrorTips from './AnalyzeErrorTips';
import AnalyzeErrorActions from './AnalyzeErrorActions';
import AnalyzeErrorContactSupport from './AnalyzeErrorContactSupport';

import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import Background from '@/components/Background';

type AnalyzeErrorStateProps = {
  errorType: ErrorType;
  onGoHome: () => void;
  onRetry: () => Promise<void>;
  onGoToScan: () => void;
};

export default function AnalyzeErrorState({
  errorType,
  onGoHome,
  onRetry,
  onGoToScan,
}: AnalyzeErrorStateProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <Background>
      <SafeAreaView style={styles.safeAreaViewWrapper}>
        <View style={styles.container}>
          <AnalyzeErrorHeader errorType={errorType} />
          <AnalyzeErrorTips errorType={errorType} />
          <AnalyzeErrorActions
            errorType={errorType}
            onGoHome={onGoHome}
            onRetry={onRetry}
            onGoToScan={onGoToScan}
          />
          <AnalyzeErrorContactSupport />
        </View>
      </SafeAreaView>
    </Background>
  );
}

const createStyles = (_theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    safeAreaViewWrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 20,
    },
  });
};
