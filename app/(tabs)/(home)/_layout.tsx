import { Redirect, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeLayout() {
  const { theme } = useTheme();

  if (true) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.primaryFont,
        }}
      />
    </Stack>
  );
}
