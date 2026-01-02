import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';

export default function useCamera(
  setPhotoUri: React.Dispatch<React.SetStateAction<string | null>>,
) {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisisble, setCameraVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const openCamera = async () => {
    if (!permission || permission.status === 'undetermined') {
      const result = await requestPermission();

      if (!result.granted) {
        return;
      }
    }

    if (permission?.status === 'denied') {
      Alert.alert(
        'Camera Access Needed',
        'Please enable camera access in system settings to take photos.',
      );

      return;
    }

    setPreviewVisible(false);
    setCameraVisible(true);
    setPhotoUri(null);
  };

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
      skipProcessing: false,
    });

    setPhotoUri(photo.uri);
    setCameraVisible(false);
    setPreviewVisible(true);
  };

  const discardPhoto = () => {
    setPhotoUri(null);
    setPreviewVisible(false);
  };

  return {
    cameraRef,
    cameraVisisble,
    previewVisible,
    setCameraVisible,
    takePicture,
    discardPhoto,
    openCamera,
  };
}
