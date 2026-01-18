import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
export default function AnimationSubtleText() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.subtleContainer}>
      <Animated.Text style={[styles.subtleText, animatedStyle]}>
        This may take a few moments...
      </Animated.Text>
    </View>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    subtleContainer: {},
    subtleText: {
      color: theme.textSecondary,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
    },
  });
};
