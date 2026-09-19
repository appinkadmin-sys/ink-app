import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle, User, Settings as SettingsIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../theme';

export default function HomeScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom,
          paddingHorizontal: spacing.xl,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing.xxl,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '900',
              letterSpacing: -1,
              color: colors.text,
            }}
          >
            INK<Text style={{ color: colors.base }}>.</Text>
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              hitSlop={10}
            >
              <SettingsIcon size={24} color={colors.text} strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: 'rgba(220, 38, 38, 0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.lg,
            }}
          >
            <MessageCircle size={44} color={colors.base} strokeWidth={2} />
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: colors.text,
              textAlign: 'center',
            }}
          >
            No chats yet
          </Text>
          <Text
            style={{
              fontSize: typography.bodyLarge,
              color: colors.textMuted,
              textAlign: 'center',
              marginTop: spacing.sm,
              maxWidth: 280,
              lineHeight: 22,
            }}
          >
            Find someone to talk to and start your first conversation.
          </Text>
          <Text
            style={{
              color: 'rgba(250, 250, 250, 0.35)',
              fontSize: 12,
              marginTop: spacing.xxl,
              textAlign: 'center',
            }}
          >
            Signed in as{'\n'}
            <Text style={{ color: colors.text, fontWeight: '700' }}>
              {user?.email ?? 'no user'}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}