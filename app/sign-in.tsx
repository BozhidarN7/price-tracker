import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingCart } from 'lucide-react-native';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { SignInForm } from '@/components/SignIn/SignInForm';

export default function SignInScreen() {
  const navigation = useNavigation();

  const { theme, isDark } = useTheme();
  const styles = createSTyles(theme, isDark);

  const [isSignUp, setIsSignUp] = useState(false);

  const fadeAnimRef = useRef(new Animated.Value(0));
  const slideAnimRef = useRef(new Animated.Value(50));
  const fadeAnim = useMemo(() => fadeAnimRef.current, []);
  const slideAnim = useMemo(() => slideAnimRef.current, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <ShoppingCart size={32} color={theme.white} strokeWidth={2} />
                </View>
                <Text style={styles.appName}>PriceTracker</Text>
                <Text style={styles.tagline}>
                  Smart shopping, smarter savings
                </Text>
              </View>
            </View>

            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {isSignUp
                  ? 'Start tracking prices and save money on your favorite products'
                  : 'Sign in to continue tracking your product prices'}
              </Text>
            </View>

            <SignInForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

            {/* Features Preview */}
            <View style={styles.featuresContainer}>
              <View style={styles.feature}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>📊</Text>
                </View>
                <Text style={styles.featureText}>Track price changes</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>💰</Text>
                </View>
                <Text style={styles.featureText}>Save money</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>📱</Text>
                </View>
                <Text style={styles.featureText}>Scan products</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createSTyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    content: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logoContainer: {
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.primaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: theme.primaryShadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
    },
    appName: {
      fontSize: 32,
      fontFamily: 'Inter_700Bold',
      color: theme.primaryFont,
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
      marginBottom: 8,
    },
    welcomeContainer: {
      marginBottom: 32,
    },
    welcomeTitle: {
      fontSize: 28,
      fontFamily: 'Inter_700Bold',
      color: theme.primaryFont,
      textAlign: 'center',
      marginBottom: 8,
    },
    welcomeSubtitle: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.secondaryFont,
      textAlign: 'center',
      lineHeight: 24,
    },

    featuresContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    feature: {
      alignItems: 'center',
      flex: 1,
    },
    featureIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureEmoji: {
      fontSize: 20,
    },
    featureText: {
      fontSize: 12,
      fontFamily: 'Inter_600SemiBold',
      color: theme.secondaryFont,
    },
  });
};
