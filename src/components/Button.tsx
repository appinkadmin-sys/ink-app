import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
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
  const { colors, radii, typography, spacing, shadows } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.surfaceAlt;
    if (variant === 'primary') return colors.brand; 
    if (variant === 'secondary') return colors.surfaceAlt; 
    return 'transparent'; 
  };

  const getTextColor = () => {
    if (disabled) return colors.textSubtle;
    if (variant === 'primary') return '#FFFFFF'; 
    return colors.text; 
  };

  const getShadow = () => {
    if (disabled || variant !== 'primary') return {};
    return shadows.brand;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: radii.pill,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
        getShadow(),
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
    </Pressable>
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