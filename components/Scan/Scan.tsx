import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AlertCircle, Camera, Sparkles, Upload } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';
import { useRef, useState } from 'react';
import PermissionModal from './PermissionModal';
import PreviewImage from './PreviewImage';
import CameraModal from './CameraModal';

const tips = [
  'Ensure good lighting',
  'Keep the receipt centered',
  'Avoid blurry images',
  'Ensure everything is visible',
];

export default function ScanScreen() {
  const { theme, isDark } = useTheme();

  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisisble, setCameraVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const styles = createStyles(theme, isDark);
  console.log('tracker:photoUri', photoUri);

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

  const requestAndOpenCamera = async () => {
    const result = await requestPermission();
    setPermissionModalVisible(false);

    if (result.granted) {
      setCameraVisible(true);
    }
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

  const screenFeatures = [
    {
      mainText: 'Open Camera',
      secondaryText: 'Take a photo of the receipt',
      type: 'camera',
      featureStyles: {
        buttonSectionCustom: 'buttonSectionCamera',
        buttonMainTextCustom: 'buttonMainTextCamera',
        buttonSecondaryTextCustom: 'buttonSecondaryTextCamera',
        buttonIconContainerCustom: 'buttonIconContainerCamera',
      },
      icon: (color: string) => (
        <Camera size={44} strokeWidth={2} color={color} />
      ),
      onPress: openCamera,
    },

    {
      mainText: 'Upload from Gallery',
      secondaryText: 'Choose an existing photo',
      type: 'upload',
      featureStyles: {
        buttonSectionCustom: 'buttonSectionUpload',
        buttonMainTextCustom: 'buttonMainTextUpload',
        buttonSecondaryTextCustom: 'buttonSecondaryTextUpload',
        buttonIconContainerCustom: 'buttonIconContainerUpload',
      },
      icon: (color: string) => (
        <Upload size={44} strokeWidth={2} color={color} />
      ),
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreViewContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.purposeSection}>
            <Sparkles width={24} strokeWidth={2} color={theme.textSecondary} />
            <View style={styles.purposeTextContainer}>
              <Text style={styles.purposeMainText}>
                Smart products price recognition powerd by AI
              </Text>
              <Text style={styles.purposeSecondadryText}>
                Automatically extract product details from receipt images
              </Text>
            </View>
          </View>
          {screenFeatures.map((feat) => (
            <TouchableOpacity
              key={feat.type}
              style={[
                styles.buttonSection,
                styles[
                  feat.featureStyles.buttonSectionCustom as keyof typeof styles
                ] as ViewStyle,
              ]}
              onPress={feat.onPress}
            >
              <View
                style={[
                  styles.buttonIconContainer,
                  styles[
                    feat.featureStyles
                      .buttonIconContainerCustom as keyof typeof styles
                  ] as ViewStyle,
                ]}
              >
                {feat.icon(theme.white)}
              </View>
              <View style={[styles.buttonTextContainer]}>
                <Text
                  style={[
                    styles.buttonMainText,
                    styles[
                      feat.featureStyles
                        .buttonMainTextCustom as keyof typeof styles
                    ],
                  ]}
                >
                  {feat.mainText}
                </Text>
                <Text
                  style={[
                    styles.buttonSecondaryText,
                    styles[
                      feat.featureStyles
                        .buttonSecondaryTextCustom as keyof typeof styles
                    ],
                  ]}
                >
                  {feat.secondaryText}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.tipsSection}>
            <AlertCircle size={20} strokeWidth={2} color={theme.error} />
            <View style={styles.tipsTextSection}>
              <Text style={styles.tipsTitleText}>Tips for better results</Text>
              {tips.map((tip) => (
                <View key={tip} style={styles.bulletContainer}>
                  <Text style={styles.bullet}>{'\u2022'}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          <PreviewImage
            photoUri={photoUri}
            previewVisible={previewVisible}
            discardPhoto={discardPhoto}
            openCamera={openCamera}
          />

          <CameraModal
            cameraVisisble={cameraVisisble}
            takePicture={takePicture}
            cameraRef={cameraRef}
          />

          {/* <PermissionModal */}
          {/*   permissionModalVisible={permissionModalVisible} */}
          {/*   setPermissionModalVisible={setPermissionModalVisible} */}
          {/*   requestAndOpenCamera={requestAndOpenCamera} */}
          {/* /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    safeAreViewContainer: {
      flex: 1,
      backgroundColor: isDark ? theme.background : theme.buttonTertiary,
    },
    scrollContainer: {
      flex: 1,
    },
    contentContainer: {
      rowGap: 14,
      paddingHorizontal: 20,
      marginVertical: 16,
    },
    purposeSection: {
      width: '100%',
      flexDirection: 'row',
      gap: 10,
      padding: 16,
      backgroundColor: theme.buttonSecondary,
      borderRadius: 16,
      borderColor: theme.border,
      borderWidth: 1,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
      flexWrap: 'wrap',
    },
    purposeTextContainer: {
      gap: 4,
    },
    purposeMainText: {
      fontFamily: 'Inter_500Medium',
      color: theme.textPrimary,
    },
    purposeSecondadryText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
    },
    buttonSection: {
      alignItems: 'center',
      gap: 10,
      paddingVertical: 20,
      borderRadius: 16,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonSectionCamera: {
      backgroundColor: theme.buttonPrimary,
    },
    buttonSectionUpload: {
      backgroundColor: theme.buttonSecondary,
    },
    buttonIconContainer: {
      width: 90,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    buttonIconContainerCamera: {
      backgroundColor: PALETTE.blue[600],
    },
    buttonIconContainerUpload: {
      backgroundColor: PALETTE.purple[400],
    },
    buttonTextContainer: {
      alignItems: 'center',
      gap: 10,
    },
    buttonMainText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
    },
    buttonSecondaryText: {
      fontFamily: 'Inter_400Regular',
    },
    buttonMainTextCamera: {
      color: theme.white,
    },
    buttonSecondaryTextCamera: {
      color: PALETTE.gray[50],
    },
    buttonMainTextUpload: {
      color: theme.textPrimary,
    },
    buttonSecondaryTextUpload: {
      color: theme.textSecondary,
    },
    tipsSection: {
      flexDirection: 'row',
      gap: 10,
      backgroundColor: PALETTE.amber[50],
      borderRadius: 16,
      padding: 16,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    tipsTextSection: {
      gap: 4,
    },
    tipsTitleText: {
      color: theme.textPrimary,
      fontFamily: 'Inter_400Regular',
      marginBottom: 4,
    },
    bulletContainer: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    bullet: {
      fontSize: 12,
      fontFamily: 'Inter_500Medium',
      lineHeight: 22,
    },
    tipText: {
      color: theme.textSecondary,
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 22,
    },
  });
};
