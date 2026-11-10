import { useColorScheme } from 'react-native';

export const colors = {
  // 10% Accent (Crimson)
  brand: '#DC2626',
  brandDark: '#991B1B',
  brandLight: '#F87171',

  // 60% Dominant (Strict White)
  background: '#FFFFFF', 
  surface: '#FFFFFF',      
  surfaceAlt: '#F9FAFB',   

  // 30% Secondary (Black & Greys)
  text: '#000000',         
  textMuted: '#4B5563',    
  textSubtle: '#9CA3AF',   
  border: '#E5E7EB',       

  // Semantic
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

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export function useTheme(): Theme {
  // Strictly enforcing Light mode for the new White background design.
  return {
    colors,
    spacing,
    radii,
    typography,
  };
}