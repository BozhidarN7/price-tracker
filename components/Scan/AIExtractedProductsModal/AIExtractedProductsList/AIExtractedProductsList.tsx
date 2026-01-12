import { FlatList, StyleSheet } from 'react-native';
import type { MockDataProductsType } from '../AIExtractedProductsModal';
import AIExtractedProductCard from '../AIExtractedProductCard';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AIExtractedProductsListProps = {
  products: (MockDataProductsType & {
    selected: boolean;
    originalName: string;
    originalBrand: string | null;
    originalPrice: number;
  })[];
  setProducts: React.Dispatch<
    React.SetStateAction<
      (MockDataProductsType & {
        selected: boolean;
        originalName: string;
        originalBrand: string | null;
        originalPrice: number;
      })[]
    >
  >;
};

export default function AIExtractedProductsList({
  products,
  setProducts,
}: AIExtractedProductsListProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  const isEdited = (
    product: MockDataProductsType & { selected: boolean },
    index: number,
  ) => {
    return (
      product.name !== products[index].originalName ||
      product.brand !== products[index].originalBrand ||
      product.price !== products[index].originalPrice
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: MockDataProductsType & { selected: boolean };
    index: number;
  }) => {
    const edited = isEdited(item, index);

    return (
      <AIExtractedProductCard
        item={item}
        index={index}
        setProducts={setProducts}
        isEdited={edited}
      />
    );
  };

  return (
    <FlatList
      data={products}
      contentContainerStyle={styles.listContainer}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const createStyles = (_theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    listContainer: {
      gap: 10,
    },
  });
};
