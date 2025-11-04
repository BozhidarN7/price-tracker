import { Edit, MoreVertical, Trash } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type MoreOptionsMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const MENU_HEIGHT = 120;

export default function MoreOptionsMenu({
  onEdit,
  onDelete,
}: MoreOptionsMenuProps) {
  const [visible, setVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const buttonRef = useRef<View | null>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, [opacity, translateY]);

  const animateOut = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback?.();
    });
  };

  const measureButtonPosition = () => {
    if (!buttonRef.current) {
      return;
    }

    buttonRef.current.measure((_x, _y, _width, height, pageX, pageY) => {
      const spaceBelow = SCREEN_HEIGHT - (pageY + height);
      const shouldShowAbove = spaceBelow < MENU_HEIGHT;
      const adjustedY = shouldShowAbove ? pageY - MENU_HEIGHT : pageY + height;
      setAnchorPosition({ x: pageX, y: adjustedY });
    });
  };

  const openMenu = () => {
    measureButtonPosition();
    setVisible(true);
  };

  const closeMenu = () => {
    animateOut(() => setVisible(false));
  };

  useEffect(() => {
    if (visible) {
      animateIn();
    }
  }, [visible, animateIn]);

  return (
    <View>
      <TouchableOpacity ref={buttonRef} onPress={openMenu}>
        <MoreVertical color={theme.textPrimary} size={22} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.menuContainer,
                  {
                    top: anchorPosition.y,
                    left: anchorPosition.x - MENU_HEIGHT,
                    opacity,
                    transform: [{ translateY }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    animateOut(() => {
                      setVisible(false);
                      requestIdleCallback(() => {
                        onEdit?.();
                      });
                    });
                  }}
                >
                  <Edit size={18} color={theme.textPrimary} />
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    closeMenu();
                    onDelete?.();
                  }}
                >
                  <Trash size={18} color="#E74C3C" />
                  <Text style={[styles.menuText, { color: '#E74C3C' }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

function createStyles(theme: Theme, _isDark: boolean) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    menuContainer: {
      position: 'absolute',
      backgroundColor: theme.buttonSecondary,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 4,
      width: 140,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    menuText: {
      marginLeft: 8,
      fontSize: 16,
      color: theme.textPrimary,
    },
  });
}
