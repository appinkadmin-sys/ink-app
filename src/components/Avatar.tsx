import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
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
          borderRadius: radii.pill,
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
        },
      ]}
    >
      {uri ? (
        <Image 
          source={{ uri }} 
          style={styles.image} 
          contentFit="cover" 
          transition={200}
        />
      ) : (
        <Text style={[styles.initials, { color: colors.text, fontSize: size * 0.4 }]}>
          {initials.slice(0, 2).toUpperCase()}
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