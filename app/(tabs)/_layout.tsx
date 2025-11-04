import { Tabs } from 'expo-router';
import { House, Scan, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabsLayout() {
  const { theme, isDark } = useTheme();

  return (
    <Tabs>
      <Tabs.Screen
        name="(products)"
        options={{
          title: 'Home',
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: isDark
              ? theme.buttonSecondary
              : theme.buttonQuaternary,
            borderTopWidth: 1,
          },
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <House size={28} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => (
            <Scan size={28} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <User size={28} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
