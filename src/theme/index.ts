import { useColorScheme, Platform } from 'react-native';

export const colors = {
  // 10% Accent (Crimson)
  brand: '#DC2626',
  brandDark: '#991B1B',
  brandLight: '#F87171',
  brandGlow: 'rgba(220, 38, 38, 0.15)', // For glowing shadows on primary buttons

  // 60% Dominant (Strict White & Off-White)
  background: '#FFFFFF', 
  surface: '#FFFFFF',      
  surfaceAlt: '#F3F4F6',   // Slightly darker to separate cards from the background

  // 30% Secondary (Silver & Greys)
  text: '#000000',         
  textMuted: '#4B5563',    
  textSubtle: '#9CA3AF',   
  border: '#E5E7EB',       
  silver: '#E5E7EB',       // Explicit silver token for borders/dividers

  // Semantic
  danger: '#DC2626',
  success: '#22C55E',
  warning: '#F59E0B',
  
  // Glassmorphism (For floating tab bars & overlays)
  glass: 'rgba(255, 255, 255, 0.85)',
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
  lg: 20,      // Increased for more modern, rounded cards
  xl: 28,      // Increased for large feature cards
  pill: 999,
};

export const typography = {
  body: 15,
  bodyLarge: 17,
  caption: 13, // Added for Input errors and metadata
  h3: 22,
  h2: 32,      // Scaled up for editorial headers
  h1: 42,
  display: 52,
};

export const shadows = {
  // Modern, soft, high-end drop shadows
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  // Crimson glow for primary buttons
  brand: {
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  }
};

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  shadows: typeof shadows;
  scheme: 'light';
};

// Defined outside to prevent new object creation on every render
const theme: Theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
  scheme: 'light',
};

export function useTheme(): Theme {
  // Strictly enforcing Light mode as per the design direction.
  return theme;
}