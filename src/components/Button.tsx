import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  style,
  textStyle
}: ButtonProps) {
  const { colors, radii, typography, spacing } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.surfaceAlt;
    if (variant === 'primary') return colors.brand; // Crimson
    if (variant === 'secondary') return colors.text; // Black
    return 'transparent'; // Outline
  };

  const getTextColor = () => {
    if (disabled) return colors.textSubtle;
    if (variant === 'primary' || variant === 'secondary') return '#FFFFFF';
    return colors.text; // Black text for outline
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: radii.pill,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: typography.bodyLarge,
              fontWeight: '600',
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});