import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';

const PEXELS_KEY = process.env.EXPO_PUBLIC_PEXELS_KEY ?? '';
const SEARCH_QUERY = 'city night young adults friends';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('screen');

// Fallback images — used if Pexels API fails
const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1400',
  'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1400',
  'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1400',
];

interface PexelsPhoto {
  id: number;
  src: { portrait: string };
}

export default function WelcomeScreen() {
  const { colors, spacing, radii, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Hide Android navigation bar (full-screen cinematic)
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden').catch(() => {});
    }
    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible').catch(() => {});
      }
    };
  }, []);

  // Fetch images from Pexels
  useEffect(() => {
    if (!PEXELS_KEY) return;
    const url =
      `https://api.pexels.com/v1/search` +
      `?query=${encodeURIComponent(SEARCH_QUERY)}` +
      `&orientation=portrait&per_page=10`;

    fetch(url, { headers: { Authorization: PEXELS_KEY } })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (data?.photos?.length) {
          setImages(data.photos.map((p: PexelsPhoto) => p.src.portrait));
        }
      })
      .catch((err) => console.warn('[Welcome] Pexels failed:', err));
  }, []);

  // Crossfade cycle every 5 seconds
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
      <StatusBar style="light" />

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
        />
      )}

      {/* Current image (crossfading on top) */}
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(2, 4, 10, 0.55)',
        }}
      />
      {/* Crimson tint */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
        }}
      />

      {/* Content layer */}
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom + spacing.lg,
          paddingHorizontal: spacing.xl,
          justifyContent: 'space-between',
        }}
      >
        {/* Top: Logo */}
        <View style={{ alignItems: 'center', marginTop: spacing.xxl }}>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: colors.base,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md,
              shadowColor: colors.base,
              shadowOpacity: 0.5,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 8 },
              elevation: 12,
            }}
          >
            <MessageCircle
              size={54}
              color="#FFFFFF"
              strokeWidth={2.2}
              fill="#FFFFFF"
            />
          </View>
          <Text
            style={{
              fontSize: 38,
              fontWeight: '900',
              letterSpacing: -1.5,
              color: colors.text,
            }}
          >
            INK<Text style={{ color: colors.base }}>.</Text>
          </Text>
        </View>

        {/* Bottom: Buttons + footer */}
        <View>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
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
            onPress={() => navigation.navigate('Login')}
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

          <View style={{ marginTop: spacing.lg, alignItems: 'center' }}>
            <Pressable
              onPress={() =>
                console.log('[Welcome] Terms screen opens after Batch 5')
              }
            >
              <Text
                style={{
                  color: 'rgba(250, 250, 250, 0.65)',
                  fontSize: 12,
                  textDecorationLine: 'underline',
                }}
              >
                Terms and Conditions
              </Text>
            </Pressable>
            <Text
              style={{
                color: 'rgba(250, 250, 250, 0.35)',
                fontSize: 10,
                marginTop: 6,
                letterSpacing: 0.3,
              }}
            >
              © 2026 Ink by InkSocial
            </Text>
            <Text
              style={{
                color: 'rgba(250, 250, 250, 0.25)',
                fontSize: 9,
                marginTop: 4,
              }}
              onPress={() => Linking.openURL('https://www.pexels.com')}
            >
              Photos provided by Pexels
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}