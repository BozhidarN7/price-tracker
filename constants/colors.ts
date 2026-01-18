export const PALETTE = {
  gray: {
    50: '#f8f9fa',
    100: '#f0f0f0',
    200: '#e0e0e0',
    300: '#d1d1d1',
    400: '#999999',
    500: '#888888',
    600: '#666666',
    700: '#333333',
    800: '#1a1a1a',
    900: '#000000',
    950: '#030712',
  },

  blue: {
    50: '#e0f2ff',
    100: '#b3e0ff',
    200: '#80ccff',
    300: '#4db8ff',
    400: '#1aa3ff',
    500: '#007aff',
    600: '#0066cc',
    700: '#0052a3',
    800: '#003d7a',
    900: '#002952',
  },

  cyan: {
    50: '#e0fcff',
    100: '#b3f8ff',
    200: '#80f4ff',
    300: '#4df0ff',
    400: '#1aeaff',
    500: '#00d4ff',
    600: '#00b3e0',
    700: '#0094c2',
    800: '#0076a3',
    900: '#005a85',
  },

  green: {
    50: '#eafff3',
    100: '#b3ffd6',
    200: '#80ffbb',
    300: '#4dffa0',
    400: '#1aff85',
    500: '#34C759',
    600: '#28a745',
    700: '#1f7a33',
    800: '#145a24',
    900: '#0a3b16',
    950: '#052e16',
  },

  red: {
    50: '#fee2e2',
    100: '#fca5a5',
    200: '#f87171',
    300: '#ef4444',
    400: '#dc2626',
    500: '#b91c1c',
    700: '#7f1d1d',
    900: '#450a0a',
  },

  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    400: '#f59e0b',
    700: '#92400e',
    800: '#6b2b0a',
    900: '#5c2308',
  },

  purple: {
    50: '#faf5ff',
    100: '#e3e0f3',
    400: '#c27aff',
    500: '#ad46ff',
    600: '#9810fa',
    950: '#3c0366',
  },
  indigo: {
    50: '#eef2ff',
    400: '#7c86ff',
  },

  slate: {
    800: '#1e293b',
    900: '#0f172a',
  },

  trend: {
    up: '#00ff88',
    down: '#FF3B30',
    altDown: '#ff4757',
  },

  neutral: {
    quaternaryButton: '#8E8E93',
    quinaryButton: '#f8f8f8',
  },

  white: '#ffffff',
  black: '#000000',
};

export const LIGHT_THEME = {
  // Base
  white: PALETTE.white,
  black: PALETTE.black,

  // background
  surface: PALETTE.gray[50],
  backgroundPrimary: PALETTE.gray[100],
  backgroundGradients: {
    surfaceSoft: {
      colors: [PALETTE.gray[100], PALETTE.gray[50], PALETTE.gray[100]],
      locations: [0, 0.5, 1],
    },
    surfaceSoftColorful: {
      colors: [PALETTE.purple[50], PALETTE.blue[50], PALETTE.indigo[50]],
      locations: [0, 0.5, 1],
    },
  },

  // Text
  textPrimary: PALETTE.gray[900],
  textSecondary: PALETTE.gray[600],
  textTertiary: PALETTE.gray[500],
  textQuaternary: PALETTE.gray[400],

  // Buttons
  buttonPrimary: PALETTE.blue[500],
  buttonSecondary: PALETTE.white,
  buttonTertiary: PALETTE.gray[100],
  buttonQuaternary: PALETTE.neutral.quaternaryButton,
  buttonQuinary: PALETTE.neutral.quinaryButton,
  buttonSenary: PALETTE.gray[200],

  // States
  error: PALETTE.red[400],
  errorBackground: PALETTE.red[50],
  success: PALETTE.green[500],

  // Shadows & borders
  shadow: PALETTE.blue[500],
  border: PALETTE.gray[200],

  // Trends
  trendUp: PALETTE.green[500],
  trendDown: PALETTE.trend.down,
} as const;

export const DARK_THEME = {
  // Base
  white: PALETTE.white,
  black: PALETTE.black,

  // background
  backgroundPrimary: PALETTE.black,
  surface: PALETTE.gray[800],
  backgroundGradients: {
    surfaceSoft: {
      colors: [PALETTE.gray[950], `${PALETTE.slate[900]}`, PALETTE.gray[950]],
      locations: [0, 0.5, 1],
    },
    surfaceSoftColorful: {
      colors: [PALETTE.gray[950], `${PALETTE.slate[900]}`, PALETTE.gray[950]],
      locations: [0, 0.5, 1],
    },
  },

  // Text
  textPrimary: PALETTE.gray[50],
  textSecondary: PALETTE.gray[500],
  textTertiary: PALETTE.gray[600],
  textQuaternary: PALETTE.gray[700],

  // Buttons
  buttonPrimary: PALETTE.cyan[500],
  buttonSecondary: PALETTE.gray[800],
  buttonTertiary: PALETTE.gray[700],
  buttonQuaternary: PALETTE.neutral.quaternaryButton,
  buttonQuinary: PALETTE.neutral.quinaryButton,
  buttonSenary: PALETTE.gray[600],

  // States
  error: PALETTE.red[400],
  errorBackground: PALETTE.red[50],
  success: PALETTE.trend.up,

  // Shadows & borders
  shadow: PALETTE.cyan[500],
  border: PALETTE.gray[700],

  // Trends
  trendUp: PALETTE.trend.up,
  trendDown: PALETTE.trend.altDown,
} as const;

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

export type BackgroundVariant = keyof typeof LIGHT_THEME.backgroundGradients;
