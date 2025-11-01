import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Calendar, DollarSign, Store } from 'lucide-react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { ProductModalFormData, Theme } from '@/types';
import FormField from '@/components/FormField';
import Dropdown from '@/components/Dropdown';
import { CURRENCIES_SYMBOLS_MAP } from '@/constants';

type PriceFieldsProps = {
  formData: ProductModalFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductModalFormData>>;
  showCurrencyDropdown: boolean;
  setShowCurrencyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PriceFields({
  formData,
  setFormData,
  showCurrencyDropdown,
  setShowCurrencyDropdown,
}: PriceFieldsProps) {
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Price Information</Text>

      <View style={styles.priceRow}>
        <View style={styles.priceField}>
          <FormField
            label="Price"
            icon={
              <DollarSign
                size={18}
                color={theme.primaryButtonBackground}
                strokeWidth={2}
              />
            }
            required
          >
            <TextInput
              style={styles.textInput}
              value={formData.price}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, price: text }))
              }
              placeholder="0.00"
              placeholderTextColor={
                isDark ? theme.tertiaryFont : theme.quaternaryFont
              }
              keyboardType="decimal-pad"
            />
          </FormField>
        </View>
        <View style={styles.currencyField}>
          <FormField
            label="Currency"
            icon={
              <DollarSign
                size={18}
                color={theme.primaryButtonBackground}
                strokeWidth={2}
              />
            }
            required
          >
            <Dropdown
              value={formData.currency}
              options={Object.keys(CURRENCIES_SYMBOLS_MAP)}
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, currency: value }))
              }
              placeholder="EUR"
              isOpen={showCurrencyDropdown}
              onToggle={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            />
          </FormField>
        </View>
      </View>

      <FormField
        label="Store"
        icon={
          <Store
            size={18}
            color={theme.primaryButtonBackground}
            strokeWidth={2}
          />
        }
      >
        <TextInput
          style={styles.textInput}
          value={formData.store}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, store: text }))
          }
          placeholder="e.g., Lidl, Carrefour"
          placeholderTextColor={
            isDark ? theme.tertiaryFont : theme.quaternaryFont
          }
        />
      </FormField>

      <FormField
        label="Date of Purchase"
        icon={
          <Calendar
            size={18}
            color={theme.primaryButtonBackground}
            strokeWidth={2}
          />
        }
      >
        <TextInput
          style={styles.textInput}
          value={formData.date}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, date: text }))
          }
          placeholder="YYYY-MM-DD"
          placeholderTextColor={
            isDark ? theme.tertiaryFont : theme.quaternaryFont
          }
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
      color: theme.primaryFont,
      marginBottom: 16,
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
    priceRow: {
      flexDirection: 'row',
      gap: 12,
    },
    priceField: {
      flex: 2,
    },
    currencyField: {
      flex: 1,
    },
  });
};
