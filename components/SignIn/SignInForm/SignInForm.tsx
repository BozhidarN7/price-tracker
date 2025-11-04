import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type SignInFormProps = {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignInForm({ isSignUp, setIsSignUp }: SignInFormProps) {
  const { theme, isDark } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styles = createStyles(theme, isDark);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isSignUp && !name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    try {
      setIsLoading(true);
      if (isSignUp) {
        // await signUp(email.trim(), password, name.trim());
      } else {
        await login(email.trim(), password);
      }
    } catch (_error) {
      Alert.alert(
        'Error',
        isSignUp ? 'Failed to create account' : 'Failed to sign in',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <>
      <View style={styles.form}>
        {isSignUp && (
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail
                size={20}
                color={isDark ? theme.textSecondary : theme.textTertiary}
                strokeWidth={2}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={
                isDark ? theme.textTertiary : theme.textQuaternary
              }
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Mail
              size={20}
              color={isDark ? theme.textSecondary : theme.textTertiary}
              strokeWidth={2}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={
              isDark ? theme.textTertiary : theme.textQuaternary
            }
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Lock size={20} color={theme.textSecondary} strokeWidth={2} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={
              isDark ? theme.textTertiary : theme.textQuaternary
            }
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color={theme.textSecondary} strokeWidth={2} />
            ) : (
              <Eye size={20} color={theme.textSecondary} strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>

        {!isSignUp && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading
              ? 'Please wait...'
              : isSignUp
                ? 'Create Account'
                : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toggle Mode */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        </Text>
        <TouchableOpacity onPress={toggleMode}>
          <Text style={styles.toggleButton}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    form: {
      marginBottom: 32,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? theme.buttonSecondary : theme.buttonQuinary,
      borderRadius: 16,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: isDark ? theme.textTertiary : theme.buttonSenary,
    },
    inputIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.textPrimary,
      paddingVertical: 16,
    },
    eyeIcon: {
      padding: 4,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    forgotPasswordText: {
      fontSize: 14,
      fontFamily: 'Inter_600SemiBold',
      color: theme.buttonPrimary,
    },
    submitButton: {
      backgroundColor: theme.buttonPrimary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      fontSize: 18,
      fontFamily: 'Inter_700Bold',
      color: theme.white,
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
    },
    toggleText: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.textSecondary,
      marginRight: 8,
    },
    toggleButton: {
      fontSize: 16,
      fontFamily: 'Inter_700Bold',
      color: theme.buttonPrimary,
    },
  });
};
