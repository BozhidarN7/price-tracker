import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type TagProps = {
  customStylesContainer?: any;
  customStylesText?: any;
  text: string;
};

export default function Tag({
  customStylesContainer,
  customStylesText,
  text,
}: TagProps) {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);
  return (
    <View
      style={[
        styles.tagContainer,
        customStylesContainer && customStylesContainer,
      ]}
    >
      <Text style={[styles.tagText, customStylesText && customStylesText]}>
        {text}
      </Text>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    tagContainer: {
      justifyContent: 'center',
      alignSelf: 'flex-start',
      padding: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.senaryButtonBackground,
      shadowColor: theme.primaryShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 6,
    },
    tagText: {
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
    },
  });
};
