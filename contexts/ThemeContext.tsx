import { PropsWithChildren, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import { DARK_THEME, LIGHT_THEME, THEME } from '@/constants/colors';

type ThemeContextType = {
  theme: typeof LIGHT_THEME & typeof DARK_THEME;
  isDark: boolean;
};
const ThemeContext = createContext<ThemeContextType>({
  theme: LIGHT_THEME,
  isDark: false,
});

export default function ThemeProvider({ children }: PropsWithChildren) {
  const colorSchema = useColorScheme();
  return (
    <ThemeContext
      value={{
        theme: colorSchema === THEME.DARK ? DARK_THEME : LIGHT_THEME,
        isDark: colorSchema === THEME.DARK,
      }}
    >
      {children}
    </ThemeContext>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
