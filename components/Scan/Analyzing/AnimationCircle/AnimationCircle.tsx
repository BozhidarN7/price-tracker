import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Sparkle } from 'lucide-react-native';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ANALYSIS_STEPS } from '../constants/analyze-steps';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';

const SIZE = 128;
const CENTER = SIZE / 2;

export default function AnimationCircle() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  const rotateOuter = useSharedValue(0);
  const rotateMiddle = useSharedValue(0);
  const scaleCenter = useSharedValue(1);

  useEffect(() => {
    rotateOuter.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
    );

    rotateMiddle.value = withRepeat(
      withTiming(-360, { duration: 4000, easing: Easing.linear }),
      -1,
    );

    scaleCenter.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [rotateMiddle, rotateOuter, scaleCenter]);

  const outerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateOuter.value}deg` }],
  }));

  const middleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateMiddle.value}deg` }],
  }));

  const centerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleCenter.value }],
  }));

  const CurrentIcon = ANALYSIS_STEPS.receipt[4].icon;

  return (
    <View style={styles.wrapper}>
      {/* Outer rotating ring */}
      <Animated.View style={[styles.outerRing, outerStyle]} />

      {/* Middle rotating ring */}
      <Animated.View style={[styles.middleRing, middleStyle]} />

      {/* Center pulse */}
      <Animated.View style={[styles.centerWrapper, centerStyle]}>
        <LinearGradient
          colors={
            isDark
              ? [PALETTE.purple[600], PALETTE.blue[600]]
              : [PALETTE.purple[500], PALETTE.blue[500]]
          }
          style={styles.centerGlow}
        />
        <LinearGradient
          colors={
            isDark
              ? [PALETTE.purple[600], PALETTE.blue[600]]
              : [PALETTE.purple[500], PALETTE.blue[500]]
          }
          style={styles.centerCircle}
        >
          {<CurrentIcon size={40} strokeWidth={2} color={theme.white} />}
        </LinearGradient>
      </Animated.View>

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </View>
  );
}

function FloatingParticle({ index }: { index: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [progress]);

  const angle = (index * Math.PI * 2) / 6;
  const radius = 50;

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: CENTER + radius * Math.cos(angle),
    top: CENTER + radius * Math.sin(angle),
    transform: [
      { translateY: -20 * progress.value },
      { scale: 1 + 0.2 * progress.value },
    ],
    opacity: 0.3 + 0.7 * progress.value,
  }));

  return (
    <Animated.View style={style}>
      <Sparkle size={14} strokeWidth={2} color={PALETTE.purple[400]} />
    </Animated.View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    wrapper: {
      width: SIZE,
      height: SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outerRing: {
      position: 'absolute',
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      borderWidth: 4,
      borderTopColor: PALETTE.purple[500],
      borderRightColor: PALETTE.blue[500],
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    middleRing: {
      position: 'absolute',
      width: SIZE - 16,
      height: SIZE - 16,
      borderRadius: (SIZE - 16) / 2,
      borderWidth: 4,
      borderBottomColor: PALETTE.indigo[400],
      borderLeftColor: PALETTE.purple[400],
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
    },
    centerWrapper: {
      width: SIZE,
      height: SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerGlow: {
      position: 'absolute',
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      opacity: 0.2,
    },
    centerCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
