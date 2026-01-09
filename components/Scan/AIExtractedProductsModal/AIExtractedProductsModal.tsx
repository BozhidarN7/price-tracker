import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CONFIDENCE_LEVELS } from '../constants';
import AIExtractedProductsModalHeader from './AIExtractedProductsModalHeader';
import AIExtractedProductsList from './AIExtractedProductsList';
import AIExtractedProductsListSelectionControls from './AIExtractedProductsListSelectionControls';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import AIExtractedProductsStickyActionBar from './AIExtractedProductsStickyActionBar';

const mockData = {
  store: 'Лидл България',
  currency: 'BGN',
  purchaseDate: '02.09.2025',
  products: [
    {
      name: 'КИС. Мляко 2,9%',
      brand: 'ВЕРЕЯ',
      price: 1.75,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'ПИЛ.БУТЧЕ C ПОДПРАВК',
      brand: null,
      price: 5.49,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'СВИНСКА КАЙМА',
      brand: null,
      price: 5.49,
      confidence: CONFIDENCE_LEVELS.MEDIUM,
    },
    {
      name: 'КАЙМА OT Мл. ТЕЛЕШКО',
      brand: null,
      price: 8.99,
      confidence: CONFIDENCE_LEVELS.LOW,
    },
    {
      name: 'КАРТОФИ 2,5 KΓ',
      brand: null,
      price: 4.69,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'ПРЕСНИ ЯЙЦА PA3M.L',
      brand: null,
      price: 4.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'КИСЕЛО МлЯКО 2,2%',
      brand: null,
      price: 3.58,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'ХлЯБ CEMEHA',
      brand: null,
      price: 2.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'МАКС ВАФЛА',
      brand: 'МОРЕНИ',
      price: 1.09,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'ОВЕСЕНИ ЯДКИ ФИНИ',
      brand: null,
      price: 1.89,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'КАШКАВАЛ',
      brand: null,
      price: 14.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'ЛУК HA KΓ',
      brand: null,
      price: 0.14,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'АВОКАДО XAC 3A БР.',
      brand: null,
      price: 1.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'БИО БАНАНИ HA KΓ',
      brand: null,
      price: 1.84,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'MAHΓO BA БР.',
      brand: null,
      price: 1.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      name: 'КЪРПИЧКИ',
      brand: 'TRI DY',
      price: 0.9,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
  ],
};

export type MockDataType = typeof mockData;
export type MockDataProductsType = (typeof mockData.products)[0];

export default function AIExtractedProductsModal() {
  const { theme, isDark } = useTheme();
  const [products, setProducts] = useState<
    (MockDataProductsType & {
      selected: boolean;
      originalName: string;
      originalBrand: string | null;
      originalPrice: number;
    })[]
  >(
    mockData.products.map((product) => ({
      ...product,
      selected: true,
      originalName: product.name,
      originalBrand: product.brand,
      originalPrice: product.price,
    })),
  );

  const styles = createStyles(theme, isDark);
  const numberOfSelectedItems = products.filter((prod) => prod.selected).length;

  return (
    <Modal visible={true} animationType="slide" style={styles.modalContainer}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <AIExtractedProductsModalHeader
          store={mockData.store}
          purchaseDate={mockData.purchaseDate}
          currency={mockData.currency}
        />

        <View style={styles.modalContent}>
          <AIExtractedProductsListSelectionControls setProducts={setProducts} />
          <AIExtractedProductsList
            products={products}
            setProducts={setProducts}
          />
        </View>

        <AIExtractedProductsStickyActionBar
          numberOfItemsSelected={numberOfSelectedItems}
        />
      </SafeAreaView>
    </Modal>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
    },
    safeAreaViewContainer: {
      flex: 1,
    },
    modalContent: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.backgroundPrimary,
      rowGap: 16,
    },
  });
};
