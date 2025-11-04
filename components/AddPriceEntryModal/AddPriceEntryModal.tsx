import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalFooter from '../AddProductModal/ModalFooter';
import PriceFields from '../AddProductModal/PriceFields';
import ModalHeader from '../ModalHeader';

import { CURRENCiES } from '@/constants/currencies';
import { useTheme } from '@/contexts/ThemeContext';
import { useEditProduct } from '@/hooks';
import { ProductModalFormData, Theme } from '@/types';
import { ModifiedProduct } from '@/types/product';

type AddPriceEntryModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddPriceEntryModal({
  visible,
  onClose,
}: AddPriceEntryModalProps) {
  const { theme, isDark } = useTheme();
  const { productId } = useLocalSearchParams();
  const [formData, setFormData] = useState<ProductModalFormData>({
    name: '',
    brand: '',
    category: '',
    description: '',
    imageUrl: '',
    tags: [],
    currency: CURRENCiES.EUR,
    store: '',
    price: '',
    date: '',
  });
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const { mutateAsync: editProductAsync, isPending: isEdditingProduct } =
    useEditProduct();

  const styles = createStyles(theme, isDark);

  const handleSubmit = async () => {
    // Validation
    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      Alert.alert('Error', 'Valid price is required.');
      return;
    }

    const modifiedProduct: ModifiedProduct = {
      latestPrice: Number(formData.price),
      latestCurrency: formData.currency,
      latestStore: formData.store,
      latestPurchaseDate: formData.date,
    };

    try {
      await editProductAsync({
        productId: productId as string,
        modifiedProduct,
      });

      // Reset form
      if (!isEdditingProduct) {
        setFormData({
          name: '',
          brand: '',
          category: '',
          price: '',
          currency: 'USD',
          store: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          imageUrl: '',
          tags: [],
        });
      }
      onClose();
    } catch (_error) {}
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <ModalHeader onClose={onClose} text="Add New Price" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <PriceFields
            formData={formData}
            setFormData={setFormData}
            showCurrencyDropdown={showCurrencyDropdown}
            setShowCurrencyDropdown={setShowCurrencyDropdown}
          />
        </ScrollView>
        <ModalFooter
          onClose={onClose}
          handleSubmit={handleSubmit}
          isProcessing={isEdditingProduct}
          text="Add Price"
          textProcessing="Adding..."
        />
      </SafeAreaView>
    </Modal>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
  });
};
