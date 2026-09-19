import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';

export default function TermsScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const sections = [
    { title: '1. Acceptance of Terms', body: `By creating an account or using Ink, you agree to these Terms and Conditions. If you do not agree, you must not use the app.` },
    { title: '2. Your Account', body: `You must be at least 13 years old to use Ink. You are responsible for maintaining the security of your account and password.` },
    { title: '3. Acceptable Use', body: `You agree not to use Ink to harass, threaten, or harm others; post illegal, hateful, or sexually explicit content; impersonate others; spam or distribute malware; or violate any applicable laws.` },
    { title: '4. Content You Post', body: `You retain ownership of content you post. By posting, you grant Ink a worldwide, non-exclusive, royalty-free license to host, display, and distribute your content within the app.` },
    { title: '5. Privacy', body: `Our Privacy Policy explains how we collect, use, and protect your information. By using Ink, you consent to our data practices as described in the Privacy Policy.` },
    { title: '6. Termination', body: `You may delete your account at any time through Settings. We may suspend or terminate your account if you violate these terms or if we discontinue the service.` },
    { title: '7. Disclaimers', body: `Ink is provided "as is" without warranties of any kind. We do not guarantee the app will be error-free, secure, or available at all times.` },
    { title: '8. Limitation of Liability', body: `To the maximum extent permitted by law, Ink and InkSocial are not liable for any indirect, incidental, or consequential damages.` },
    { title: '9. Changes to Terms', body: `We may update these Terms from time to time. Continued use of Ink after changes constitutes acceptance of the new terms.` },
    { title: '10. Governing Law', body: `These Terms are governed by the laws of the Republic of South Africa.` },
    { title: '11. Contact', body: `hello@inksocial.app\n\nInk by InkSocial\n© 2026 InkSocial. All rights reserved.` },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <View
        style={{
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.md,
        }}
      >
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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingBottom: insets.bottom + spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: '900',
            letterSpacing: -1,
            color: colors.text,
            marginTop: spacing.md,
          }}
        >
          Terms and{'\n'}Conditions
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: spacing.sm,
            marginBottom: spacing.xl,
          }}
        >
          Last updated: 19 September 2026
        </Text>
        {sections.map((s) => (
          <View key={s.title} style={{ marginBottom: spacing.xl }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: colors.text,
                marginBottom: spacing.sm,
              }}
            >
              {s.title}
            </Text>
            <Text
              style={{
                fontSize: typography.body,
                color: 'rgba(250, 250, 250, 0.7)',
                lineHeight: 22,
              }}
            >
              {s.body}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}