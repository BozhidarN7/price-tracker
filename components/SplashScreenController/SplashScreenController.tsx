import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { useAuth } from '@/contexts/AuthContext';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
  const { isLoading } = useAuth();

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if ((loaded || error) && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isLoading]);

  return null;
}
