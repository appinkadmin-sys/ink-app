import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StatusBar,
  Linking,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'lucide-react-native';
import { useTheme } from '../theme';

const PEXELS_KEY = process.env.EXPO_PUBLIC_PEXELS_KEY ?? '';
const SEARCH_QUERY = 'friends laughing night out';
const SCREEN_W = Dimensions.get('window').width;
const SCREEN_H = Dimensions.get('window').height;

// Fallback images (Pexels direct URLs) — social/music/people vibe
const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1400',
  'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1400',
  'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1400',
];

interface PexelsPhoto {
  id: number;
  src: { portrait: string; large: string };
}

interface WelcomeScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

export default function WelcomeScreen({
  onCreateAccount,
  onLogin,
}: WelcomeScreenProps) {
  const { colors, spacing, radii, typography } = useTheme();

  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Fetch photos from Pexels
  useEffect(() => {
    if (!PEXELS_KEY) {
      console.warn('[Welcome] No PEXELS_KEY — using fallbacks');
      return;
    }

    const url =
      `https://api.pexels.com/v1/search` +
      `?query=${encodeURIComponent(SEARCH_QUERY)}` +
      `&orientation=portrait&per_page=8`;

    fetch(url, { headers: { Authorization: PEXELS_KEY } })
      .then((res) => {
        if (!res.ok) throw new Error(`Pexels ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.photos?.length) {
          setImages(data.photos.map((p: PexelsPhoto) => p.src.portrait));
        } else {
          throw new Error('No photos');
        }
      })
      .catch((err) => {
        console.warn('[Welcome] Pexels failed, using fallbacks:', err);
      });
  }, []);

  // Cycle images every 5 seconds with a 1.2s fade
  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setPrevIndex(null), 1200);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      {/* Previous image (underneath) */}
      {prevIndex !== null && images[prevIndex] && (
        <Image
          source={{ uri: images[prevIndex] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SCREEN_W,
            height: SCREEN_H,
          }}
          contentFit="cover"
          transition={0}
        />
      )}

      {/* Current image (on top) */}
      {images[currentIndex] && (
        <Image
          source={{ uri: images[currentIndex] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SCREEN_W,
            height: SCREEN_H,
          }}
          contentFit="cover"
          transition={1200}
        />
      )}

      {/* Dark scrim */}
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(2, 4, 10, 0.5)',
        }}
      />
      {/* Crimson tint */}
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
        }}
      />

      {/* Content */}
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: spacing.xl,
            justifyContent: 'space-between',
          }}
        >
          {/* Top: Logo */}
          <View style={{ alignItems: 'center', marginTop: spacing.xxl }}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: colors.base,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.md,
              }}
            >
              <Feather size={48} color="#FFFFFF" strokeWidth={2.2} />
            </View>
            <Text
              style={{
                fontSize: 34,
                fontWeight: '900',
                letterSpacing: -1.5,
                color: colors.text,
              }}
            >
              INK<Text style={{ color: colors.base }}>.</Text>
            </Text>
          </View>

          {/* Bottom: Buttons + legal */}
          <View style={{ paddingBottom: spacing.xxl }}>
            <Pressable
              onPress={onCreateAccount}
              style={({ pressed }) => ({
                backgroundColor: colors.base,
                paddingVertical: spacing.md + 2,
                borderRadius: radii.pill,
                alignItems: 'center',
                opacity: pressed ? 0.85 : 1,
                marginBottom: spacing.md,
              })}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: typography.bodyLarge,
                  fontWeight: '700',
                }}
              >
                Create account
              </Text>
            </Pressable>

            <Pressable
              onPress={onLogin}
              style={({ pressed }) => ({
                borderWidth: 1.5,
                borderColor: 'rgba(250, 250, 250, 0.35)',
                paddingVertical: spacing.md + 2,
                borderRadius: radii.pill,
                alignItems: 'center',
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.bodyLarge,
                  fontWeight: '600',
                }}
              >
                Log in
              </Text>
            </Pressable>

            <Text
              style={{
                color: 'rgba(250, 250, 250, 0.45)',
                fontSize: 11,
                textAlign: 'center',
                marginTop: spacing.lg,
                lineHeight: 16,
              }}
            >
              By continuing you agree to our Terms
              {'\n'}
              <Text
                style={{ textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL('https://www.pexels.com')}
              >
                Photos provided by Pexels
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}