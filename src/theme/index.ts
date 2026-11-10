import { useColorScheme } from 'react-native';

export const colors = {
  // 10% Accent (Crimson)
  brand: '#DC2626',
  brandDark: '#991B1B',
  brandLight: '#F87171',

  // 60% Dominant (Strict White)
  background: '#FFFFFF', 
  surface: '#FFFFFF',      // Keeps cards clean and borderless
  surfaceAlt: '#F9FAFB',   // Very subtle grey for input fields or active tabs

  // 30% Secondary (Black & Greys)
  text: '#000000',         // Pure black for maximum contrast
  textMuted: '#4B5563',    // Dark grey for secondary text
  textSubtle: '#9CA3AF',   // Light grey for placeholders
  border: '#E5E7EB',       // Subtle border for separation

  // Semantic (Keep these standard)
  danger: '#DC2626',
  success: '#22C55E',
  warning: '#F59E0B',
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
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export function useTheme(): Theme {
  // We are strictly enforcing Light mode for now based on the new design direction.
  // You can add the dark mode switch back later if you want, but the UI is built for White.
  return {
    colors,
    spacing,
    radii,
    typography,
  };
}