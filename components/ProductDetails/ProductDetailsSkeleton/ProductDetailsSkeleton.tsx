import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { useSkeleton } from '@/hooks';

export default function ProductDetailsSkeleton() {
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  const opacity = useSkeleton();

  return (
    <ScrollView style={[styles.container]}>
      {/* Product Image Header Skeleton */}
      <View style={styles.imageHeader}>
        <View style={styles.skeletonFull} />

        {/* Price Badge Overlay */}
        <View style={styles.priceOverlay}>
          <Animated.View
            style={[styles.skeleton, styles.skeletonSmall, { opacity }]}
          />
          <View style={styles.priceRow}>
            <Animated.View
              style={[styles.skeleton, styles.skeletonMedium, { opacity }]}
            />
            <Animated.View
              style={[styles.skeleton, styles.skeletonTiny, { opacity }]}
            />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Product Info Card */}
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Animated.View
              style={[styles.skeleton, styles.skeletonSmall, { opacity }]}
            />
            <Animated.View
              style={[styles.skeleton, styles.skeletonLarge, { opacity }]}
            />
            <Animated.View
              style={[styles.skeleton, styles.skeletonSmall, { opacity }]}
            />
            <Animated.View
              style={[styles.skeleton, styles.skeletonFullWidth, { opacity }]}
            />
            <Animated.View
              style={[styles.skeleton, styles.skeletonThreeFourth, { opacity }]}
            />
            <View style={styles.row}>
              <Animated.View
                style={[styles.skeleton, styles.skeletonTagSmall, { opacity }]}
              />
              <Animated.View
                style={[styles.skeleton, styles.skeletonTagMedium, { opacity }]}
              />
              <Animated.View
                style={[styles.skeleton, styles.skeletonTagSmall, { opacity }]}
              />
            </View>
          </View>
        </View>

        {/* Analytics Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleContainer}>
            <Animated.View
              style={[styles.skeleton, styles.iconSmall, { opacity }]}
            />
            <Animated.View
              style={[styles.skeleton, styles.skeletonMedium, { opacity }]}
            />
          </View>

          <View style={styles.analyticsRow}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.analyticsItem}>
                <Animated.View
                  style={[styles.skeleton, styles.skeletonTiny, { opacity }]}
                />
                <Animated.View
                  style={[styles.skeleton, styles.skeletonSmall, { opacity }]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Price History Chart */}
        <View style={styles.card}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.skeletonMedium,
              styles.mb4,
              { opacity },
            ]}
          />
          <Animated.View style={[styles.skeleton, styles.chart, { opacity }]} />
        </View>

        {/* Latest Entry Details */}
        <View style={styles.card}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.skeletonMedium,
              styles.mb4,
              { opacity },
            ]}
          />
          <View style={styles.detailsList}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.row}>
                <Animated.View
                  style={[styles.skeleton, styles.iconTiny, { opacity }]}
                />
                <Animated.View
                  style={[styles.skeleton, styles.detailLine, { opacity }]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.card}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.skeletonMedium,
              styles.mb4,
              { opacity },
            ]}
          />
          {[1, 2, 3].map((i) => (
            <View key={i}>
              <View style={styles.entryRow}>
                <View style={styles.entryLeft}>
                  <Animated.View
                    style={[styles.skeleton, styles.skeletonSmall, { opacity }]}
                  />
                  <Animated.View
                    style={[styles.skeleton, styles.skeletonTiny, { opacity }]}
                  />
                </View>
                <Animated.View
                  style={[
                    styles.skeleton,
                    styles.skeletonTagMedium,
                    { opacity },
                  ]}
                />
              </View>
              {i < 3 && <View style={[styles.skeleton, styles.divider]} />}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  const skeletonColor = isDark
    ? theme.tertiaryButtonBackground
    : theme.senaryButtonBackground;

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 32,
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
    },
    imageHeader: {
      width: '100%',
      height: 300,
    },
    skeletonFull: {
      flex: 1,
      backgroundColor: theme.tertiaryButtonBackground,
    },
    priceOverlay: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      columnGap: 8,
    },
    content: {
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 20,
      shadowColor: theme.black,
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
      marginBottom: 24,
    },
    cardTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
      columnGap: 10,
    },
    cardInner: {
      rowGap: 10,
    },
    skeleton: {
      backgroundColor: skeletonColor,
      borderRadius: 6,
    },
    skeletonSmall: {
      height: 16,
      width: 80,
    },
    skeletonTiny: {
      height: 12,
      width: 60,
    },
    skeletonMedium: {
      height: 24,
      width: 120,
    },
    skeletonLarge: {
      height: 32,
      width: '100%',
    },
    skeletonFullWidth: {
      height: 14,
      width: '100%',
    },
    skeletonThreeFourth: {
      height: 14,
      width: '75%',
    },
    skeletonTagSmall: {
      height: 24,
      width: 64,
    },
    skeletonTagMedium: {
      height: 24,
      width: 80,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
    },
    analyticsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    analyticsItem: {
      alignItems: 'center',
      width: '30%',
    },
    chart: {
      width: '100%',
      height: 200,
      borderRadius: 8,
    },
    mb4: {
      marginBottom: 16,
    },
    detailsList: {
      rowGap: 12,
    },
    iconSmall: {
      height: 20,
      width: 20,
    },
    iconTiny: {
      height: 16,
      width: 16,
    },
    detailLine: {
      height: 14,
      width: 140,
    },
    entryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    entryLeft: {
      rowGap: 4,
    },
    divider: {
      height: 1,
      width: '100%',
      marginVertical: 8,
    },
  });
};
