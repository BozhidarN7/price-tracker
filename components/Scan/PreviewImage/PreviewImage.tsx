import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type PreviewImageProps = {
  photoUri: string | null;
  previewVisible: boolean;
  discardPhoto: () => void;
  openCamera: () => void;
};

export default function PreviewImage({
  photoUri,
  previewVisible,
  discardPhoto,
  openCamera,
}: PreviewImageProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <Modal
      visible={previewVisible}
      animationType="slide"
      onRequestClose={discardPhoto}
    >
      <View style={styles.previewContainer}>
        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={styles.previewImage}
            resizeMode="contain"
          />
        )}

        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={openCamera}>
            <Text style={styles.secondaryButtonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={discardPhoto}>
            <Text style={styles.closeText}>Discard</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.analyzeButton} onPress={() => {}}>
          <Text style={styles.primaryButtonText}>Analyze</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const createStyles = (theme: Theme, _isDark: boolean) => {
  return StyleSheet.create({
    previewContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
    },
    previewImage: {
      width: '100%',
      height: '70%',
    },
    previewActions: {
      flexDirection: 'row',
      gap: 12,
      padding: 16,
    },
    closeButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
      backgroundColor: theme.trendDown,
      paddingVertical: 14,
    },
    closeText: {
      color: theme.white,
      fontFamily: 'Inter_500Medium',
      fontSize: 14,
    },
    primaryButtonText: {
      color: theme.white,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
    },
    secondaryButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.buttonTertiary,
      borderRadius: 14,
    },
    secondaryButtonText: {
      color: theme.textPrimary,
      fontFamily: 'Inter_500Medium',
      fontSize: 14,
    },
    analyzeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.buttonPrimary,
      paddingVertical: 14,
      marginHorizontal: 14,
      borderRadius: 14,
    },
  });
};
