import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

import { useTheme } from '@/contexts/ThemeContext';

import { Theme } from '@/types';
import { CURRENCIES_SYMBOLS_MAP } from '@/constants';

type DropdownProps = {
  value: string;
  options: string[];
  onSelect: (value: keyof typeof CURRENCIES_SYMBOLS_MAP) => void;
  placeholder: string;
  isOpen: boolean;
  onToggle: () => void;
};

export default function Dropdown({
  value,
  options,
  onSelect,
  placeholder,
  isOpen,
  onToggle,
}: DropdownProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={onToggle}>
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        {isOpen ? (
          <ChevronUp size={20} color={theme.secondaryFont} strokeWidth={2} />
        ) : (
          <ChevronDown size={20} color={theme.secondaryFont} strokeWidth={2} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdownOptions} nestedScrollEnabled={true}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                onSelect(option as keyof typeof CURRENCIES_SYMBOLS_MAP);
                onToggle();
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    dropdownContainer: {
      position: 'relative',
    },
    dropdownButton: {
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark
        ? theme.tertiaryButtonBackground
        : theme.senaryButtonBackground,
    },
    dropdownText: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
    },
    placeholderText: {
      color: isDark ? theme.tertiaryFont : theme.quaternaryFont,
    },
    dropdownOptions: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: theme.secondaryButtonBackground,
      borderRadius: 12,
      marginTop: 4,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 12,
      elevation: 8,
      zIndex: 1000,
      maxHeight: 200,
    },
    dropdownOption: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.tertiaryButtonBackground,
    },
    dropdownOptionText: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
    },
  });
};
