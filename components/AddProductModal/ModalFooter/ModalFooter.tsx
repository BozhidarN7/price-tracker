import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type ModalFooterProps = {
  handleSubmit: () => void;
  onClose: () => void;
  isProcessing: boolean;
  text: string;
  textProcessing: string;
};

export default function ModalFooter({
  handleSubmit,
  onClose,
  isProcessing,
  text,
  textProcessing,
}: ModalFooterProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.submitButton,
          isProcessing && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {isProcessing ? textProcessing : text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    footer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      borderTopColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,

      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      color: theme.textPrimary,
    },
    submitButton: {
      flex: 1,
      backgroundColor: theme.buttonPrimary,
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
