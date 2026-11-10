import React from 'react';
import { TextInput, TextInputProps, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
  const { colors, radii, typography, spacing } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text, fontSize: typography.body }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surfaceAlt,
            color: colors.text,
            borderRadius: radii.md,
            borderColor: error ? colors.danger : colors.border,
            padding: spacing.md,
            fontSize: typography.bodyLarge,
          },
          style,
        ]}
        placeholderTextColor={colors.textSubtle}
        {...props}
      />
      {error && (
        <Text style={[styles.error, { color: colors.danger, fontSize: typography.caption }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
  },
});