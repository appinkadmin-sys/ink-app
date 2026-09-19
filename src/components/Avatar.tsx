import React from 'react';
import { View, Text, Image, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function Avatar({
  uri,
  name,
  size = 44,
  onPress,
  style,
}: AvatarProps) {
  const { colors } = useTheme();

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('')
    : '?';

  const content = uri ? (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  ) : (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.base,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: size * 0.4,
          fontWeight: '800',
        }}
      >
        {initials}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }

  return <View style={style}>{content}</View>;
}