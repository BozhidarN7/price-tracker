import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ChevronUp, Package, X } from 'lucide-react-native';
import * as Crypto from 'expo-crypto';

import AdvancedFields from './AdvancedFields';
import PriceFields from './PriceFields';
import RequiredFields from './RequiredFields/RequiredFields';

import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { CURRENCIES_SYMBOLS_MAP, TRENDS } from '@/constants';
import { NewProduct } from '@/types/product';
import { CURRENCiES } from '@/constants/currencies';
import useAddProduct from '@/hooks/use-add-product';

type AddProductModalProps = {
  visible: boolean;
  onClose: () => void;
};

export type FormData = {
  name: string;
  brand: string;
  category: string;
  price: string;
  currency: keyof typeof CURRENCIES_SYMBOLS_MAP;
  store: string;
  date: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export default function AdddProductModal({
  visible,
  onClose,
}: AddProductModalProps) {
  const { theme, isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
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
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Package size={24} color={theme.white} strokeWidth={2} />
            </View>
            <Text style={styles.headerTitle}>Add Product</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={theme.primaryFont} strokeWidth={2} />
          </TouchableOpacity>
        </View>

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
                color={theme.primaryButtonBackground}
                strokeWidth={2}
              />
            ) : (
              <ChevronDown
                color={theme.primaryButtonBackground}
                size={20}
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>

          {showAdvanced && (
            <AdvancedFields formData={formData} setFormData={setFormData} />
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isAddingProduct && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {isAddingProduct ? 'Adding...' : 'Add Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark
        ? theme.secondaryButtonBackground
        : theme.tertiaryButtonBackground,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.primaryShadow,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
      color: theme.primaryFont,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.tertiaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
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
      color: theme.primaryButtonBackground,
      marginRight: 8,
    },
    footer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: isDark
        ? theme.secondaryButtonBackground
        : theme.tertiaryButtonBackground,
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      borderTopColor: isDark
        ? theme.secondaryButtonBackground
        : theme.tertiaryButtonBackground,

      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: theme.primaryFont,
    },
    submitButton: {
      flex: 1,
      backgroundColor: theme.primaryButtonBackground,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: theme.white,
    },
  });
};
