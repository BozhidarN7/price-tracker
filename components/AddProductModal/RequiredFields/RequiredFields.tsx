import { FileText, Package, Tag } from 'lucide-react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Dropdown from '@/components/Dropdown';
import FormField from '@/components/FormField';
import categories from '@/constants/categories';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductModalFormData, Theme } from '@/types';

type RequiredFieldsProps = {
  formData: ProductModalFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductModalFormData>>;
  showCategoryDropdown: boolean;
  setShowCategoryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RequiredFields({
  formData,
  setFormData,
  showCategoryDropdown,
  setShowCategoryDropdown,
}: RequiredFieldsProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Product Details</Text>
      <FormField
        label="Product Name"
        icon={<Package size={18} color={theme.buttonPrimary} strokeWidth={2} />}
        required
      >
        <TextInput
          style={styles.textInput}
          value={formData.name}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
          placeholder="e.g. Coca-Cola 500ml"
          placeholderTextColor={
            isDark ? theme.textTertiary : theme.textQuaternary
          }
        />
      </FormField>
      <FormField
        label="Brand"
        icon={<Tag size={18} color={theme.buttonPrimary} strokeWidth={2} />}
      >
        <TextInput
          style={styles.textInput}
          value={formData.brand}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, brand: text }))
          }
          placeholder="e.g., Coca-Cola Company"
          placeholderTextColor={
            isDark ? theme.textTertiary : theme.textQuaternary
          }
        />
      </FormField>

      <FormField
        label="Category"
        icon={
          <FileText size={18} color={theme.buttonPrimary} strokeWidth={2} />
        }
        required
      >
        <Dropdown
          value={formData.category}
          options={categories}
          onSelect={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
          placeholder="Select category"
          isOpen={showCategoryDropdown}
          onToggle={() => setShowCategoryDropdown(!showCategoryDropdown)}
        />
      </FormField>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    section: {
      marginVertical: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter_600SemiBold',
      color: theme.textPrimary,
      marginBottom: 16,
    },
    textInput: {
      backgroundColor: isDark ? theme.buttonSecondary : theme.buttonQuinary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
      borderWidth: 1,
      borderColor: isDark ? theme.buttonTertiary : theme.buttonSenary,
    },
  });
};
