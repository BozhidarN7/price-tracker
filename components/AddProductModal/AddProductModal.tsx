import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import * as Crypto from 'expo-crypto';

import ModalHeader from '../ModalHeader';
import AdvancedFields from './AdvancedFields';
import ModalFooter from './ModalFooter';
import PriceFields from './PriceFields';
import RequiredFields from './RequiredFields/RequiredFields';

import { useTheme } from '@/contexts/ThemeContext';
import { ProductModalFormData, Theme } from '@/types';
import { TRENDS } from '@/constants';
import { NewProduct } from '@/types/product';
import { CURRENCiES } from '@/constants/currencies';
import useAddProduct from '@/hooks/use-add-product';

type AddProductModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddProductModal({
  visible,
  onClose,
}: AddProductModalProps) {
  const { theme, isDark } = useTheme();
  const [formData, setFormData] = useState<ProductModalFormData>({
    name: '',
    brand: '',
    category: '',
    price: '',
    currency: CURRENCiES.EUR,
    store: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    imageUrl: '',
    tags: [],
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const { mutateAsync: addProductAsync, isPending: isAddingProduct } =
    useAddProduct();

  const styles = createStyles(theme, isDark);

  const handleSubmit = async () => {
    // Validation

    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required.');
      return;
    }
    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      Alert.alert('Error', 'Valid price is required.');
      return;
    }
    if (!formData.category.trim()) {
      Alert.alert('Error', 'Category is required.');
      return;
    }

    const priceEntry = {
      priceEntryId: Crypto.randomUUID(),
      date: formData.date,
      store: formData.store || undefined,
      currency: formData.currency,
      price: Number(formData.price),
    };

    const newProduct: NewProduct = {
      name: formData.name.trim(),
      brand: formData.brand || undefined,
      category: formData.category,
      description: formData.description.trim() || undefined,
      imageUrl: formData.imageUrl.trim() || undefined,
      latestPrice: Number(formData.price),
      latestCurrency: formData.currency,
      priceHistory: [priceEntry],
      tags: formData.tags.length > 0 ? formData.tags : undefined,
      trend: TRENDS.STABLE,
    };

    try {
      await addProductAsync(newProduct);

      // Reset form
      if (!isAddingProduct) {
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
        setShowAdvanced(false);
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
        <ModalHeader onClose={onClose} text="Add Product" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <RequiredFields
            formData={formData}
            setFormData={setFormData}
            showCategoryDropdown={showCategoryDropdown}
            setShowCategoryDropdown={setShowCategoryDropdown}
          />

          {/* Price Section */}
          <PriceFields
            formData={formData}
            setFormData={setFormData}
            showCurrencyDropdown={showCurrencyDropdown}
            setShowCurrencyDropdown={setShowCurrencyDropdown}
          />

          {/* Advanced Fields Toggle */}

          <TouchableOpacity
            style={styles.advancedToggle}
            onPress={() => setShowAdvanced(!showAdvanced)}
          >
            <Text style={styles.advancedToggleText}>More Details</Text>
            {showAdvanced ? (
              <ChevronUp
                size={20}
                color={theme.buttonPrimary}
                strokeWidth={2}
              />
            ) : (
              <ChevronDown
                color={theme.buttonPrimary}
                size={20}
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>

          {showAdvanced && (
            <AdvancedFields formData={formData} setFormData={setFormData} />
          )}
        </ScrollView>
        <ModalFooter
          text="Add Product"
          textProcessing="Adding..."
          isProcessing={isAddingProduct}
          handleSubmit={handleSubmit}
          onClose={onClose}
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

    advancedToggle: {
      flexDirection: 'row',
      justifyContent: 'center',

      paddingVertical: 16,
      marginVertical: 8,
    },
    advancedToggleText: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: theme.buttonPrimary,
      marginRight: 8,
    },
  });
};
