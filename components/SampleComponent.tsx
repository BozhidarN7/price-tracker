/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

export default function SignInScreen() {
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View>
      <Text>Sign in</Text>
    </View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({});
};
