import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export default function usePickImage(
  setPhotoUri: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setModule: React.Dispatch<React.SetStateAction<'camera' | 'upload' | null>>,
) {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.',
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setPreviewVisible(true);
      setModule('upload');
    }
  };

  return { pickImage };
}
