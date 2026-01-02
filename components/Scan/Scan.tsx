import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AlertCircle, Camera, Sparkles, Upload } from 'lucide-react-native';
import PreviewImage from './PreviewImage';
import CameraModal from './CameraModal';
import ScanFeatureButton from './ScanFeatureButton';
import { useCamera, usePickImage } from './hooks';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';

const tips = [
  'Ensure good lighting',
  'Keep the receipt centered',
  'Avoid blurry images',
  'Ensure everything is visible',
];

export default function ScanScreen() {
  const { theme, isDark } = useTheme();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const {
    cameraRef,
    cameraVisisble,
    previewVisible,
    setCameraVisible,
    openCamera,
    discardPhoto,
    takePicture,
  } = useCamera(setPhotoUri);
  const { pickImage } = usePickImage(setPhotoUri);

  const styles = createStyles(theme, isDark);
  console.log('tracker:photoUri', photoUri);

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
      onPress: pickImage,
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
            <ScanFeatureButton featureButton={feat} key={feat.type} />
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
            setCameraVisible={setCameraVisible}
            cameraRef={cameraRef}
            takePicture={takePicture}
          />
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
