import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import type { BackgroundVariant } from '@/constants/colors';

type BackgroundProps = {
  variant?: BackgroundVariant;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};
export default function Background({
  variant = 'surfaceSoft',
  style,
  children,
}: BackgroundProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);
  const config = theme.backgroundGradients[variant];

  return (
    <LinearGradient
      colors={[...config.colors]}
      locations={config.locations}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.gradientContainer, style]}
    >
      {children}
    </LinearGradient>
  );
}

const createStyles = (_theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    gradientContainer: {
      flex: 1,
    },
  });
};
