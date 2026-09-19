import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, ArrowLeft } from 'lucide-react-native';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Button from '../components/Button';
import { useTheme } from '../theme';

type CheckEmailRoute = RouteProp<RootStackParamList, 'CheckEmail'>;

export default function CheckEmailScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CheckEmailRoute>();
  const email = route.params?.email ?? 'your email';

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resentOnce, setResentOnce] = useState(false);

  const handleResend = () => {
    console.log('[CheckEmail] Resend to', email);
    setResendDisabled(true);
    setResentOnce(true);
    setTimeout(() => setResendDisabled(false), 60000);
  };

  const handleVerified = () => {
    console.log('[CheckEmail] Checking verification');
    navigation.navigate('ProfileSetup');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + spacing.sm,
          paddingBottom: insets.bottom + spacing.lg,
        }}
      >
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(250, 250, 250, 0.08)',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <ArrowLeft size={20} color={colors.text} strokeWidth={2.5} />
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: colors.base,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.lg,
            }}
          >
            <Mail size={44} color="#FFFFFF" strokeWidth={2} />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: '900',
              letterSpacing: -1,
              color: colors.text,
              textAlign: 'center',
            }}
          >
            Check your inbox
          </Text>

          <Text
            style={{
              fontSize: typography.bodyLarge,
              color: colors.textMuted,
              marginTop: spacing.md,
              textAlign: 'center',
              lineHeight: 24,
            }}
          >
            We sent a verification link to{'\n'}
            <Text style={{ color: colors.text, fontWeight: '700' }}>
              {email}
            </Text>
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: 'rgba(250, 250, 250, 0.4)',
              marginTop: spacing.lg,
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Tap the link, then return and tap the button below.
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing.xl }}>
          <Button
            label="I've verified my email"
            onPress={handleVerified}
            style={{ marginBottom: spacing.md }}
          />

          <Pressable
            onPress={handleResend}
            disabled={resendDisabled}
            style={({ pressed }) => ({
              paddingVertical: spacing.md,
              alignItems: 'center',
              opacity: resendDisabled ? 0.4 : pressed ? 0.6 : 1,
            })}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 14,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}
            >
              {resentOnce
                ? 'Email resent — check again in 60s'
                : 'Resend verification email'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}