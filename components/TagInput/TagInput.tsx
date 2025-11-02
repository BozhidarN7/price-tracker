import { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

export default function TagInput({
  value,
  onChange,
  placeholder = 'Add a tag...',
}: TagInputProps) {
  const { theme, isDark } = useTheme();
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const styles = createStyles(theme, isDark);

  const addTag = (newTag: string) => {
    const cleaned = newTag.trim();
    if (cleaned && !value.includes(cleaned)) {
      onChange([...value, cleaned]);
    }
    setText('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Backspace' && text === '' && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const handleChangeText = (newText: string) => {
    if (/[,\s]$/.test(newText)) {
      addTag(newText.slice(0, -1));
    } else {
      setText(newText);
    }
  };

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      style={styles.container}
      accessible
      accessibilityLabel="Tag input field"
    >
      <FlatList
        horizontal
        data={value}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn.springify()}
            exiting={FadeOut.springify()}
            layout={LinearTransition.springify()}
            style={styles.tag}
            accessible
            accessibilityLabel={`Tag: ${item}`}
          >
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity
              onPress={() => removeTag(item)}
              style={styles.removeBtn}
              accessible
              accessibilityLabel={`Remove tag ${item}`}
            >
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListFooterComponent={
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={handleChangeText}
            onKeyPress={handleKeyPress}
            onSubmitEditing={(e) => addTag(e.nativeEvent.text)}
            placeholder={placeholder}
            placeholderTextColor={
              isDark ? theme.tertiaryFont : theme.quaternaryFont
            }
            style={styles.input}
            returnKeyType="done"
            accessibilityLabel="Add new tag"
          />
        }
      />
    </Animated.View>
  );
}

const createStyles = (theme: Theme, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: theme.primaryFont,
      borderWidth: 1,
      borderColor: isDark
        ? theme.tertiaryButtonBackground
        : theme.senaryButtonBackground,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginRight: 6,
      backgroundColor: isDark
        ? theme.secondaryButtonBackground
        : theme.quinaryButtonBackground,
    },
    tagText: {
      color: theme.primaryFont,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
    },
    removeBtn: {
      marginLeft: 6,
      borderRadius: 12,
      paddingHorizontal: 4,
      paddingVertical: 2,
      backgroundColor: theme.secondaryButtonBackground,
    },
    removeText: {
      fontSize: 12,
      fontFamily: 'Inter400Regular',
      color: theme.secondaryFont,
    },
    input: {
      flexGrow: 1,
      fontSize: 16,
      minWidth: 80,
      color: theme.primaryFont,
    },
  });
};
