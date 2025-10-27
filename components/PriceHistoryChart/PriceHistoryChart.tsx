import { useFont } from '@shopify/react-native-skia';
import { StyleSheet, View } from 'react-native';
import { CartesianChart, Line, Scatter } from 'victory-native';

import inter from '@/assets/fonts/Inter_18pt-Medium.ttf';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PriceEntry } from '@/types/product';
import { formatDate } from '@/utils/convert-dates';

type PriceHistoryChartProps = {
  priceHistory: PriceEntry[];
};

export default function PriceHistoryChart({
  priceHistory,
}: PriceHistoryChartProps) {
  const { theme, isDark } = useTheme();
  const font = useFont(inter, 12);

  const _styles = createStyles(theme, isDark);

  if (!priceHistory?.length) {
    return null;
  }

  const sortedData = [...priceHistory].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <View style={{ height: 200 }}>
      <CartesianChart
        data={sortedData}
        xKey="date"
        yKeys={['price']}
        axisOptions={{
          font,
          formatXLabel: (value) =>
            `${formatDate(value.toString(), { short: true })}`,
          formatYLabel: (value) => `€${value.toFixed(2)}`,
          labelColor: theme.primaryFont,
        }}
        frame={{
          lineColor: theme.primaryFont,
        }}
      >
        {({ points }) => (
          <>
            <Line
              points={points.price}
              color={theme.primaryButtonBackground}
              strokeWidth={3}
            />
            <Scatter
              points={points.price}
              radius={5}
              style="fill"
              color={theme.primaryButtonBackground}
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
}

const createStyles = (_theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({});
};
