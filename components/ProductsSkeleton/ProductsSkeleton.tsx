import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { useSkeleton } from '@/hooks';

type ProductsSkeletonProps = {
  count: number;
};

export default function ProductsSkeleton({ count }: ProductsSkeletonProps) {
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  const opacity = useSkeleton();

  const SkeletonItem = () => (
    <View style={styles.skeletonCard}>
      <Animated.View style={[styles.skeletonImage, { opacity }]} />
      <View style={styles.skeletonContent}>
        <Animated.View style={[styles.skeletonTitle, { opacity }]} />
        <Animated.View style={[styles.skeletonBrand, { opacity }]} />
        <Animated.View style={[styles.skeletonDate, { opacity }]} />
      </View>
      <View style={styles.skeletonPriceContainer}>
        <Animated.View style={[styles.skeletonPrice, { opacity }]} />
        <Animated.View style={[styles.skeletonBadge, { opacity }]} />
      </View>
    </View>
  );

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  const skeletonColor = isDark
    ? theme.tertiaryButtonBackground
    : theme.senaryButtonBackground;

  return StyleSheet.create({
    skeletonCard: {
      backgroundColor: theme.secondaryButtonBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    skeletonImage: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: skeletonColor,
      marginRight: 12,
    },
    skeletonContent: {
      flex: 1,
      marginRight: 12,
    },
    skeletonTitle: {
      height: 16,
      backgroundColor: skeletonColor,
      borderRadius: 8,
      marginBottom: 6,
      width: '80%',
    },
    skeletonBrand: {
      height: 14,
      backgroundColor: skeletonColor,
      borderRadius: 7,
      marginBottom: 6,
      width: '60%',
    },
    skeletonDate: {
      height: 12,
      backgroundColor: skeletonColor,
      borderRadius: 6,
      width: '40%',
    },
    skeletonPriceContainer: {
      alignItems: 'flex-end',
    },
    skeletonPrice: {
      height: 18,
      width: 60,
      backgroundColor: skeletonColor,
      borderRadius: 9,
      marginBottom: 6,
    },
    skeletonBadge: {
      height: 24,
      width: 50,
      backgroundColor: skeletonColor,
      borderRadius: 12,
    },
  });
};
