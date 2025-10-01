import { StyleSheet, TextInput, View } from 'react-native';
import { FileText, ImageIcon } from 'lucide-react-native';
import type { FormData } from '../AddProductModal';
import FormField from '@/components/FormField';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type AdvancedFieldsProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function AdvancedFields({
  formData,
  setFormData,
}: AdvancedFieldsProps) {
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.section}>
      <FormField
        label="Description"
        icon={
          <FileText
            size={18}
            color={theme.primaryButtonBackground}
            strokeWidth={2}
          />
        }
      >
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={formData.description}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, description: text }))
          }
          placeholder="Additional product details..."
          placeholderTextColor={
            isDark ? theme.tertiaryFont : theme.quaternaryFont
          }
          multiline
          numberOfLines={3}
        />
      </FormField>

      <FormField
        label="Image URL"
        icon={
          <ImageIcon
            size={18}
            color={theme.primaryButtonBackground}
            strokeWidth={2}
          />
        }
      >
        <TextInput
          style={styles.textInput}
          value={formData.imageUrl}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, imageUrl: text }));
          }}
          placeholder="https://example.com/image.jpg"
          placeholderTextColor={
            isDark ? theme.tertiaryFont : theme.quaternaryFont
          }
          autoCapitalize="none"
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
    textInput: {
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
      borderWidth: 1,
      borderColor: isDark
        ? theme.tertiaryButtonBackground
        : theme.senaryButtonBackground,
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
  });
};
