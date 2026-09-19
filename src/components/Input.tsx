import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  error?: string | null;
  maxLength?: number;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  error,
  maxLength,
}: InputProps) {
  const { colors, spacing, radii, typography } = useTheme();
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={{ marginBottom: spacing.md }}>
      {label && (
        <Text
          style={{
            color: colors.textMuted,
            fontSize: 13,
            fontWeight: '600',
            marginBottom: spacing.xs + 2,
            letterSpacing: 0.3,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surfaceAlt,
          borderWidth: error ? 1.5 : 1,
          borderColor: error ? colors.danger : colors.border,
          borderRadius: radii.md,
          paddingHorizontal: spacing.md,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSubtle}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          style={{
            flex: 1,
            color: colors.text,
            fontSize: typography.bodyLarge,
            paddingVertical: spacing.md,
          }}
        />

        {secureTextEntry && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            {hidden ? (
              <EyeOff size={20} color={colors.textMuted} />
            ) : (
              <Eye size={20} color={colors.textMuted} />
            )}
          </Pressable>
        )}
      </View>

      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
            marginTop: spacing.xs + 2,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
