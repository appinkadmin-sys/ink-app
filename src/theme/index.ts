export const colors = {
  // Ink brand
  base: '#DC2626',        // crimson
  baseDark: '#991B1B',
  baseLight: '#F87171',

  // Surfaces
  background: '#02040A',  // obsidian
  surface: '#0F1117',
  surfaceAlt: '#1A1D24',
  border: '#1F232B',

  // Text
  text: '#FAFAFA',        // chalk
  textMuted: '#8A8F98',
  textSubtle: '#4B5563',

  // Semantic
  danger: '#DC2626',
  success: '#22C55E',
  warning: '#F59E0B',

  // Light mode (later)
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#02040A',
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

export const theme = { colors, spacing, radii, typography };
export type Theme = typeof theme;

export function useTheme(): Theme {
  return theme;
}