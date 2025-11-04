import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Package, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type ModalHeaderProps = {
  onClose: () => void;
  text: string;
};

export default function ModalHeader({ onClose, text }: ModalHeaderProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerIcon}>
          <Package size={24} color={theme.white} strokeWidth={2} />
        </View>
        <Text style={styles.headerTitle}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={24} color={theme.textPrimary} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.shadow,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
      color: theme.textPrimary,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? theme.buttonSecondary : theme.buttonTertiary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
