import { Button, View } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
