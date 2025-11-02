import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../ModalHeader';
import ModalFooter from '../AddProductModal/ModalFooter';
import PriceFields from '../AddProductModal/PriceFields';

import { useTheme } from '@/contexts/ThemeContext';
import { ProductModalFormData, Theme } from '@/types';
import { ModifiedProduct, PriceEntry } from '@/types/product';
import { useEditProduct, useGetProductById } from '@/hooks';
import { CURRENCiES } from '@/constants/currencies';
import { formatDate } from '@/utils/convert-dates';

type EditPriceEntryModalProps = {
  visible: boolean;
  onClose: () => void;
  priceEntry: PriceEntry;
};

export default function EditPriceEntryModal({
  visible,
  onClose,
  priceEntry,
}: EditPriceEntryModalProps) {
  const { theme, isDark } = useTheme();
  const { productId } = useLocalSearchParams();
  const { data: productInfo } = useGetProductById(productId as string);
  const [formData, setFormData] = useState<ProductModalFormData>({
    name: '',
    brand: '',
    category: '',
    description: '',
    imageUrl: '',
    tags: [],
    currency: priceEntry.currency || CURRENCiES.EUR,
    store: priceEntry.store || '',
    price: String(priceEntry.price) || '',
    date: formatDate(priceEntry.date),
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

    const modfiedPriceEntry = {
      price: Number(formData.price),
      currency: formData.currency,
      date: formData.date || new Date().toISOString(),
      store: formData.store,
    };
    const updatedPriceEntries = productInfo?.priceHistory.map((entry) => {
      if (entry.priceEntryId === priceEntry.priceEntryId) {
        return {
          ...entry,
          ...modfiedPriceEntry,
        };
      }
      return entry;
    });

    const modifiedProduct: ModifiedProduct = {
      priceHistory: updatedPriceEntries,
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
        <ModalHeader onClose={onClose} text="Edit Price Entry" />

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
          text="Edit Entry"
          textProcessing="Editting..."
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
