import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const { colors, spacing, radii, typography } = useTheme();

  const isDisabled = disabled || loading;

  const containerStyle = (pressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md + 2,
      borderRadius: radii.pill,
      opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
    };

    if (variant === 'primary') {
      return { ...base, backgroundColor: colors.base };
    }
    if (variant === 'outline') {
      return {
        ...base,
        borderWidth: 1.5,
        borderColor: 'rgba(250, 250, 250, 0.35)',
      };
    }
    return base; // ghost
  };

  const textColor =
    variant === 'primary' ? '#FFFFFF' : colors.text;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={({ pressed }) => [containerStyle(pressed), style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text
            style={{
              color: textColor,
              fontSize: typography.bodyLarge,
              fontWeight: variant === 'primary' ? '700' : '600',
              marginLeft: icon ? 10 : 0,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}