import { SafeAreaView } from 'react-native-safe-area-context';
import {
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
    icon: (color: string) => <Camera size={44} strokeWidth={2} color={color} />,
  },

  {
    mainText: 'Upload from Gallery',
    secondaryText: 'Choose an existing photo',
    type: 'upload',
    featureStyles: {
      buttonSectionCustom: 'buttonSectionUpload',
      buttonMainTextCustom: 'buttonSectionUpload',
      buttonSecondaryTextCustom: 'buttonSecondaryTextUpload',
      buttonIconContainerCustom: 'buttonIconContainerUpload',
    },
    icon: (color: string) => <Upload size={44} strokeWidth={2} color={color} />,
  },
];

const tips = [
  'Ensure good lighting',
  'Keep the receipt centered',
  'Avoid blurry images',
  'Ensure everything is visible',
];

export default function ScanScreen() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <SafeAreaView style={styles.container}>
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
                  feat.featureStyles.buttonMainTextCustom as keyof typeof styles
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
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 14,
    },
    purposeSection: {
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
