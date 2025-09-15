import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabsLayout() {
  const { theme, isDark } = useTheme();

  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarStyle: {
            backgroundColor: theme.homeBackground,
            borderTopColor: isDark
              ? theme.secondaryButtonBackground
              : theme.quaternaryButtonBackground,
            borderTopWidth: 1,
          },
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => (
            <Ionicons name="scan" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
