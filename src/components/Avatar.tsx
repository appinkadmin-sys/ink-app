import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface AvatarProps {
  uri?: string;
  size?: number;
  initials?: string;
}

export default function Avatar({ uri, size = 48, initials = '?' }: AvatarProps) {
  const { colors, radii } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radii.pill, // Makes it a perfect circle
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
        },
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <Text style={[styles.initials, { color: colors.text, fontSize: size * 0.4 }]}>
          {initials.toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontWeight: 'bold',
  },
});