import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AIExtractedProductsModalHeader from './AIExtractedProductsModalHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import AIExtractedProductsList from './AIExtractedProductsList';
import AIExtractedProductsListFilters from './AIExtractedProductsListFilters';

const mockData = {
  store: 'Лидл България',
  currency: 'BGN',
  purchaseDate: '02.09.2025',
  products: [
    {
      name: 'КИС. Мляко 2,9%',
      brand: 'ВЕРЕЯ',
      price: 1.75,
      confidence: { name: 0.9, price: 0.95, brand: 0.7 },
    },
    {
      name: 'ПИЛ.БУТЧЕ C ПОДПРАВК',
      brand: null,
      price: 5.49,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'СВИНСКА КАЙМА',
      brand: null,
      price: 5.49,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'КАЙМА OT Мл. ТЕЛЕШКО',
      brand: null,
      price: 8.99,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'КАРТОФИ 2,5 KΓ',
      brand: null,
      price: 4.69,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'ПРЕСНИ ЯЙЦА PA3M.L',
      brand: null,
      price: 4.99,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'КИСЕЛО МлЯКО 2,2%',
      brand: null,
      price: 3.58,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'ХлЯБ CEMEHA',
      brand: null,
      price: 2.99,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'МАКС ВАФЛА',
      brand: 'МОРЕНИ',
      price: 1.09,
      confidence: { name: 0.9, price: 0.95, brand: 0.7 },
    },
    {
      name: 'ОВЕСЕНИ ЯДКИ ФИНИ',
      brand: null,
      price: 1.89,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'КАШКАВАЛ',
      brand: null,
      price: 14.99,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'ЛУК HA KΓ',
      brand: null,
      price: 0.14,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'АВОКАДО XAC 3A БР.',
      brand: null,
      price: 1.99,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'БИО БАНАНИ HA KΓ',
      brand: null,
      price: 1.84,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'MAHΓO BA БР.',
      brand: null,
      price: 1.99,
      confidence: { name: 0.9, price: 0.95, brand: 0.3 },
    },
    {
      name: 'КЪРПИЧКИ',
      brand: 'TRI DY',
      price: 0.9,
      confidence: { name: 0.9, price: 0.95, brand: 0.7 },
    },
  ],
};

export type MockDataType = typeof mockData;
export type MockDataProductsType = typeof mockData.products;

export default function AIExtractedProductsModal() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <Modal visible={true} animationType="slide" style={styles.modalContainer}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <AIExtractedProductsModalHeader
          store={mockData.store}
          purchaseDate={mockData.purchaseDate}
          currency={mockData.currency}
        />

        <View style={styles.modalContent}>
          <AIExtractedProductsListFilters />
          <AIExtractedProductsList products={mockData.products} />
        </View>
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
