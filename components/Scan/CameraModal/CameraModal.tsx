import { CameraView } from 'expo-camera';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type CameraModalProps = {
  cameraVisisble: boolean;
  cameraRef: React.RefObject<CameraView | null>;
  takePicture: () => Promise<void>;
};
export default function CameraModal({
  cameraVisisble,
  cameraRef,
  takePicture,
}: CameraModalProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <Modal visible={cameraVisisble} animationType="slide">
      <CameraView style={styles.camera} ref={cameraRef}></CameraView>
      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
      </View>
    </Modal>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    camera: {
      flex: 1,
      backgroundColor: theme.black,
    },
    cameraControls: {
      position: 'absolute',
      bottom: 40,
      alignSelf: 'center',
    },
    captureButton: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: theme.white,
    },
  });
};
