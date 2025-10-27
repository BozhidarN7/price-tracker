import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeLayout() {
  const { theme } = useTheme();

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
      <Stack.Screen
        name="products/[productId]"
        options={{
          title: 'Product Info',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.primaryFont,
        }}
      />
    </Stack>
  );
}
