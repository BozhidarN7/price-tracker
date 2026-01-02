import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { PALETTE } from '@/constants/colors';

export type FeatureButton = {
  mainText: string;
  secondaryText: string;
  type: string;
  featureStyles: { [key: string]: string };
  icon: (color: string) => React.JSX.Element;
  onPress: () => Promise<void>;
};

type ScanFeatureButtonProps = {
  featureButton: FeatureButton;
};

export default function ScanFeatureButton({
  featureButton,
}: ScanFeatureButtonProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <TouchableOpacity
      style={[
        styles.buttonSection,
        styles[
          featureButton.featureStyles.buttonSectionCustom as keyof typeof styles
        ] as ViewStyle,
      ]}
      onPress={featureButton.onPress}
    >
      <View
        style={[
          styles.buttonIconContainer,
          styles[
            featureButton.featureStyles
              .buttonIconContainerCustom as keyof typeof styles
          ] as ViewStyle,
        ]}
      >
        {featureButton.icon(theme.white)}
      </View>
      <View style={[styles.buttonTextContainer]}>
        <Text
          style={[
            styles.buttonMainText,
            styles[
              featureButton.featureStyles
                .buttonMainTextCustom as keyof typeof styles
            ],
          ]}
        >
          {featureButton.mainText}
        </Text>
        <Text
          style={[
            styles.buttonSecondaryText,
            styles[
              featureButton.featureStyles
                .buttonSecondaryTextCustom as keyof typeof styles
            ],
          ]}
        >
          {featureButton.secondaryText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
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
  });
};
