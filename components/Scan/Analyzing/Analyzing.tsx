import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimationCircle from './AnimationCircle';
import AnimationSubtleText from './AnimationSubtleText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import Background from '@/components/Background';

export default function Analyzing() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <Background variant="surfaceSoftColorful">
      <SafeAreaView style={styles.safeAreaViewWrapper}>
        <View style={styles.container}>
          <AnimationCircle />
          <AnimationSubtleText />
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
      gap: 10,
    },
  });
};
