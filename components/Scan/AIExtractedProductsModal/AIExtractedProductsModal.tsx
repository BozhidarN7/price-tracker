import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import {
  AIAnalyzedReceipt,
  AIExtractedProductExtended,
} from '../types/ai-extracted-product';
import { CONFIDENCE_LEVELS } from '../constants';
import AIExtractedProductsModalHeader from './AIExtractedProductsModalHeader';
import AIExtractedProductsList from './AIExtractedProductsList';
import AIExtractedProductsListSelectionControls from './AIExtractedProductsListSelectionControls';
import AIExtractedProductsStickyActionBar from './AIExtractedProductsStickyActionBar';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { NewProduct, Product } from '@/types/product';

const _mockData = {
  store: 'Лидл България',
  currency: 'BGN',
  purchaseDate: '02.09.2025',
  products: [
    {
      id: 1,
      name: 'КИС. Мляко 2,9%',
      brand: 'ВЕРЕЯ',
      price: 1.75,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 2,
      name: 'ПИЛ.БУТЧЕ C ПОДПРАВК',
      brand: null,
      price: 5.49,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 3,
      name: 'СВИНСКА КАЙМА',
      brand: null,
      price: 5.49,
      confidence: CONFIDENCE_LEVELS.MEDIUM,
    },
    {
      id: 4,
      name: 'КАЙМА OT Мл. ТЕЛЕШКО',
      brand: null,
      price: 8.99,
      confidence: CONFIDENCE_LEVELS.LOW,
    },
    {
      id: 5,
      name: 'КАРТОФИ 2,5 KΓ',
      brand: null,
      price: 4.69,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 6,
      name: 'ПРЕСНИ ЯЙЦА PA3M.L',
      brand: null,
      price: 4.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 7,
      name: 'КИСЕЛО МлЯКО 2,2%',
      brand: null,
      price: 3.58,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 8,
      name: 'ХлЯБ CEMEHA',
      brand: null,
      price: 2.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 9,
      name: 'МАКС ВАФЛА',
      brand: 'МОРЕНИ',
      price: 1.09,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 10,
      name: 'ОВЕСЕНИ ЯДКИ ФИНИ',
      brand: null,
      price: 1.89,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 11,
      name: 'КАШКАВАЛ',
      brand: null,
      price: 14.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 12,
      name: 'ЛУК HA KΓ',
      brand: null,
      price: 0.14,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 13,
      name: 'АВОКАДО XAC 3A БР.',
      brand: null,
      price: 1.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 14,
      name: 'БИО БАНАНИ HA KΓ',
      brand: null,
      price: 1.84,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 15,
      name: 'MAHΓO BA БР.',
      brand: null,
      price: 1.99,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
    {
      id: 16,
      name: 'КЪРПИЧКИ',
      brand: 'TRI DY',
      price: 0.9,
      confidence: CONFIDENCE_LEVELS.HIGH,
    },
  ],
};

type AIExtractedProductsModalProps = {
  aiAnalyzedReceipt: AIAnalyzedReceipt;
  isAnalyzeSuccess?: boolean;
  addProductAsync: UseMutateAsyncFunction<
    Product,
    unknown,
    NewProduct[],
    unknown
  >;
  resetAddProduct: () => void;
  resetAnalyzeReceipt: () => void;
};

export default function AIExtractedProductsModal({
  aiAnalyzedReceipt,
  isAnalyzeSuccess,
  addProductAsync,
  resetAddProduct,
  resetAnalyzeReceipt,
}: AIExtractedProductsModalProps) {
  const { theme, isDark } = useTheme();
  const [products, setProducts] = useState<AIExtractedProductExtended[]>(
    aiAnalyzedReceipt.products.map((product) => ({
      ...product,
      selected: true,
      originalName: product.name,
      originalBrand: product.brand,
      originalPrice: product.price,
    })),
  );
  const [showModal, setShowModal] = useState(
    isAnalyzeSuccess && products.length > 0,
  );

  const onClose = () => {
    setShowModal(false);
    resetAddProduct();
    resetAnalyzeReceipt();
  };

  const styles = createStyles(theme, isDark);
  const numberOfSelectedItems = products.filter((prod) => prod.selected).length;

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <AIExtractedProductsModalHeader
          store={aiAnalyzedReceipt.store}
          purchaseDate={aiAnalyzedReceipt.purchaseDate}
          currency={aiAnalyzedReceipt.currency}
          onClose={onClose}
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
          addProductAsync={addProductAsync}
          products={products}
          store={aiAnalyzedReceipt.store}
          purchaseDate={aiAnalyzedReceipt.purchaseDate}
          currency={aiAnalyzedReceipt.currency}
          onClose={onClose}
        />
      </SafeAreaView>
    </Modal>
  );
}

const createStyles = (_theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    safeAreaViewContainer: {
      flex: 1,
    },
    modalContent: {
      flex: 1,
      padding: 16,
      backgroundColor: _theme.backgroundPrimary,
      rowGap: 16,
    },
  });
};
