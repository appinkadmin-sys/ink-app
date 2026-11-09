import { useColorScheme } from 'react-native';

export const colors = {
  // Ink brand
  base: '#DC2626',        // crimson
  baseDark: '#991B1B',
  baseLight: '#F87171',

  // Surfaces (Dark mode defaults)
  background: '#02040A',  // obsidian
  surface: '#0F1117',
  surfaceAlt: '#1A1D24',
  border: '#1F232B',

  // Text (Dark mode defaults)
  text: '#FAFAFA',        // chalk
  textMuted: '#8A8F98',
  textSubtle: '#4B5563',

  // Semantic
  danger: '#DC2626',
  success: '#22C55E',
  warning: '#F59E0B',

  // Light mode overrides
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F4F4F5',
    border: '#E4E4E7',
    text: '#02040A',
    textMuted: '#52525B',
    textSubtle: '#A1A1AA',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const typography = {
  body: 15,
  bodyLarge: 17,
  h3: 20,
  h2: 28,
  h1: 36,
  display: 44,
};

// Define the shape of our Theme
export type Theme = {
  colors: Omit<typeof colors, 'light'> & typeof colors.light;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  isDark: boolean;
};

export function useTheme(): Theme {
  // Automatically checks if the phone is in Dark or Light mode
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  // If it's light mode, we merge the light overrides into the main colors
  const activeColors = isDark 
    ? colors 
    : { ...colors, ...colors.light };

  return {
    // We remove the 'light' object from the final return so it stays clean
    colors: activeColors as any, 
    spacing,
    radii,
    typography,
    isDark,
  };
}