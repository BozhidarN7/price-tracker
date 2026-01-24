import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Edit3,
} from 'lucide-react-native';
import { Checkbox } from 'expo-checkbox';
import { CONFIDENCE_LEVELS } from '../../constants';
import { AIExtractedProductExtended } from '../../types/ai-extracted-product';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import FormField from '@/components/FormField';
import { PALETTE } from '@/constants/colors';
import { Tag } from '@/components/Tag';
import Dropdown from '@/components/Dropdown';
import categories from '@/constants/categories';

type AIExtractedProductCardProps = {
  item: AIExtractedProductExtended;
  index: number;
  setProducts: React.Dispatch<
    React.SetStateAction<AIExtractedProductExtended[]>
  >;
  isEdited: boolean;
};
export default function AIExtractedProductCard({
  item,
  index,
  setProducts,
  isEdited,
}: AIExtractedProductCardProps) {
  const { theme, isDark } = useTheme();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const styles = createStyles(theme, isDark);

  const confidenceConfig = {
    high: {
      label: 'High confidence',
      icon: (
        <CheckCircle
          size={18}
          strokeWidth={2}
          color={isDark ? PALETTE.green[400] : PALETTE.green[700]}
        />
      ),
      background: styles.confidenceHigh,
      text: styles.confidenceHighText,
    },
    medium: {
      label: 'Medium confidence',
      icon: (
        <AlertCircle
          size={18}
          strokeWidth={2}
          color={isDark ? PALETTE.amber[400] : PALETTE.gray[700]}
        />
      ),
      background: styles.confidenceMedium,
      text: styles.confidenceMediumText,
    },
    low: {
      label: 'Low confidence',
      icon: (
        <AlertTriangle
          size={18}
          strokeWidth={2}
          color={isDark ? PALETTE.red[200] : PALETTE.red[500]}
        />
      ),
      background: styles.confidenceLow,
      text: styles.confidenceLowText,
    },
  };

  const confidence = confidenceConfig[item.confidence];

  return (
    <View style={[styles.cardContainer, !item.selected && { opacity: 0.4 }]}>
      <Checkbox
        value={item.selected}
        onValueChange={(newValue: boolean) => {
          setProducts((prev) =>
            prev.map((prod, currentIndex) =>
              currentIndex === index ? { ...prod, selected: newValue } : prod,
            ),
          );
        }}
        color={
          item.selected
            ? isDark
              ? theme.buttonTertiary
              : theme.black
            : undefined
        }
      />
      <View style={styles.fieldsContainer}>
        <FormField label="Product name" labelStyle={styles.labelStyle} required>
          <TextInput
            style={styles.textInput}
            value={item.name}
            onChangeText={(text) =>
              setProducts((prev) =>
                prev.map((prod, currentIndex) =>
                  currentIndex === index ? { ...prod, name: text } : prod,
                ),
              )
            }
            placeholder="e.g., Coca-Cola"
            placeholderTextColor={
              isDark ? theme.textTertiary : theme.textQuaternary
            }
            editable={item.selected}
          />
        </FormField>
        <FormField label="Brand" labelStyle={styles.labelStyle}>
          <TextInput
            style={styles.textInput}
            value={item.brand || ''}
            onChangeText={(text) =>
              setProducts((prev) =>
                prev.map((prod, currentIndex) =>
                  currentIndex === index ? { ...prod, brand: text } : prod,
                ),
              )
            }
            placeholder="e.g., Coca-Cola Company"
            placeholderTextColor={
              isDark ? theme.textTertiary : theme.textQuaternary
            }
            editable={item.selected}
          />
        </FormField>
        <FormField label="Category" labelStyle={styles.labelStyle} required>
          <Dropdown
            value={item.category}
            options={categories}
            onSelect={(value) =>
              setProducts((prev) =>
                prev.map((prod, currentIndex) =>
                  currentIndex === index ? { ...prod, category: value } : prod,
                ),
              )
            }
            placeholder="Select category"
            isOpen={showCategoryDropdown}
            onToggle={() => setShowCategoryDropdown(!showCategoryDropdown)}
            disabled={!item.selected}
            dropDownButtonStyles={{
              backgroundColor: isDark
                ? theme.buttonTertiary
                : theme.buttonQuinary,
            }}
            dropDownOptionsStyles={{
              backgroundColor: isDark
                ? theme.buttonTertiary
                : theme.buttonQuinary,
            }}
          />
        </FormField>
        <FormField label="Price" labelStyle={styles.labelStyle} required>
          <TextInput
            style={styles.textInput}
            value={String(item.price)}
            onChangeText={(newPrice) =>
              setProducts((prev) =>
                prev.map((prod, currentIndex) =>
                  currentIndex === index
                    ? { ...prod, price: Number(newPrice) }
                    : prod,
                ),
              )
            }
            placeholderTextColor={
              isDark ? theme.textTertiary : theme.textQuaternary
            }
            keyboardType="numeric"
            editable={item.selected}
          />
        </FormField>
        <View style={styles.flexRowStyle}>
          <View
            style={[
              styles.flexRowStyle,
              styles.confidenceScore,
              confidence.background,
            ]}
          >
            {confidence.icon}
            <Text style={[styles.scoreLabelText, confidence.text]}>
              {confidence.label}
            </Text>
          </View>
          {item.confidence === CONFIDENCE_LEVELS.LOW && item.selected && (
            <Text style={styles.reviewText}>Please review</Text>
          )}
        </View>
      </View>
      {isEdited && (
        <Tag
          text="Edited"
          customStylesContainer={styles.editedTagContainer}
          customStylesText={styles.editedTagText}
          icon={<Edit3 size={12} strokeWidth={2} color={PALETTE.blue[700]} />}
        />
      )}
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      gap: 10,
      backgroundColor: isDark ? theme.buttonSecondary : theme.white,
      padding: 16,
      borderRadius: 16,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: 'hidden',
    },
    fieldsContainer: {
      flex: 1,
    },
    editedTagContainer: {
      position: 'absolute',
      right: 16,
      top: 16,
      paddingHorizontal: 10,
      paddingVertical: 0,
      backgroundColor: PALETTE.blue[50],
    },
    editedTagText: {
      fontFamily: 'Inter_500SemiBold',
      color: PALETTE.blue[700],
      fontSize: 12,
    },
    labelStyle: {
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
    },
    textInput: {
      backgroundColor: isDark ? theme.buttonTertiary : theme.buttonQuinary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
      borderWidth: 1,
      borderColor: isDark ? theme.buttonTertiary : theme.buttonSenary,
    },
    confidenceScore: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 16,
    },
    flexRowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    scoreLabelText: {
      fontFamily: 'Inter_500SemiBold',
      fontSize: 12,
      color: theme.textPrimary,
    },
    reviewText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: isDark ? PALETTE.red[200] : PALETTE.red[500],
    },
    confidenceHigh: {
      backgroundColor: isDark ? PALETTE.green[900] : PALETTE.green[50],
    },
    confidenceMedium: {
      backgroundColor: isDark ? PALETTE.amber[900] : PALETTE.amber[100],
    },
    confidenceLow: {
      backgroundColor: isDark ? PALETTE.red[900] : PALETTE.red[50],
    },
    confidenceHighText: {
      color: isDark ? PALETTE.green[400] : PALETTE.green[700],
    },
    confidenceMediumText: {
      color: isDark ? PALETTE.amber[400] : PALETTE.gray[700],
    },
    confidenceLowText: {
      color: isDark ? PALETTE.red[200] : PALETTE.red[500],
    },
  });
};
