import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../ModalHeader';
import ModalFooter from '../AddProductModal/ModalFooter';
import AdvancedFields from '@/components/AddProductModal/AdvancedFields';
import RequiredFields from '@/components/AddProductModal/RequiredFields/RequiredFields';

import { useTheme } from '@/contexts/ThemeContext';
import { ProductModalFormData, Theme } from '@/types';
import { ModifiedProduct } from '@/types/product';
import { useEditProduct, useGetProductById } from '@/hooks';
import { CURRENCiES } from '@/constants/currencies';

type EditProductModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function EditProductModal({
  visible,
  onClose,
}: EditProductModalProps) {
  const { theme, isDark } = useTheme();
  const { productId } = useLocalSearchParams();
  const { data: productInfo } = useGetProductById(productId as string);
  const [formData, setFormData] = useState<ProductModalFormData>({
    name: productInfo?.name || '',
    brand: productInfo?.brand || '',
    category: productInfo?.category || '',
    description: productInfo?.description || '',
    imageUrl: productInfo?.imageUrl || '',
    tags: productInfo?.tags || [],
    currency: CURRENCiES.EUR,
    store: '',
    price: '',
    date: '',
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const { mutateAsync: editProductAsync, isPending: isEdditingProduct } =
    useEditProduct();

  const styles = createStyles(theme, isDark);

  const handleSubmit = async () => {
    // Validation

    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required.');
      return;
    }

    if (!formData.category.trim()) {
      Alert.alert('Error', 'Category is required.');
      return;
    }

    const modifiedProduct: ModifiedProduct = {
      name: formData.name.trim(),
      brand: formData.brand || undefined,
      category: formData.category,
      description: formData.description.trim() || undefined,
      imageUrl: formData.imageUrl.trim() || undefined,
      tags: formData.tags.length > 0 ? formData.tags : undefined,
    };

    try {
      try {
        await editProductAsync({
          productId: productId as string,
          modifiedProduct,
        });
      } catch (_error) {}

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
        <ModalHeader onClose={onClose} text="Edit Product" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <RequiredFields
            formData={formData}
            setFormData={setFormData}
            showCategoryDropdown={showCategoryDropdown}
            setShowCategoryDropdown={setShowCategoryDropdown}
          />

          <AdvancedFields
            formData={formData}
            setFormData={setFormData}
            sectionTitleText="Advanced Fields"
          />
        </ScrollView>
        <ModalFooter
          onClose={onClose}
          handleSubmit={handleSubmit}
          isProcessing={isEdditingProduct}
          text="Edit"
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
  });
};
