import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type PermissionModalProps = {
  permissionModalVisible: boolean;
  setPermissionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  requestAndOpenCamera: () => Promise<void>;
};
export default function PermissionModal({
  permissionModalVisible,
  setPermissionModalVisible,
  requestAndOpenCamera,
}: PermissionModalProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <Modal visible={permissionModalVisible} transparent animationType="fade">
      <View style={styles.permissionOverlay}>
        <View style={styles.permissionModal}>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            To take photos of receipts or prices, please allow camera access.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setPermissionModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={requestAndOpenCamera}
            >
              <Text style={styles.buttonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    button: {
      backgroundColor: '#2e7d32',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    secondaryButton: {
      backgroundColor: '#757575',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: '600',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    permissionOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      padding: 24,
    },
    permissionModal: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 20,
    },
    permissionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    permissionText: {
      marginBottom: 16,
      color: '#444',
    },
  });
};
