import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';

export default function PrivacyScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const sections = [
    { title: '1. What We Collect', body: `Account info (email, username, display name, photo), messages, device info, usage data, and technical logs. We do not collect your contacts unless you grant permission.` },
    { title: '2. How We Use Your Data', body: `To provide the service, enable messaging, verify identity, prevent fraud, send notifications, and comply with legal obligations. We do not sell your personal information.` },
    { title: '3. Sharing Your Data', body: `With users you interact with, service providers (Firebase, hosting), and law enforcement when legally required.` },
    { title: '4. Data Security', body: `We use industry-standard encryption and secure cloud storage. No system is 100% secure — keep your password private.` },
    { title: '5. Your Rights Under POPIA', body: `You have the right to access, correct, delete your data, object to processing, and lodge a complaint with the Information Regulator. Visit Settings > Account Summary.` },
    { title: '6. Data Retention', body: `Data is retained while your account is active. On deletion, we remove your info within 30 days, except where retention is required by law.` },
    { title: '7. Children', body: `Ink is not intended for children under 13. We do not knowingly collect data from children under 13.` },
    { title: '8. International Transfers', body: `Your data may be stored outside South Africa (for example, in the EU). We ensure appropriate safeguards are in place.` },
    { title: '9. Changes to This Policy', body: `We may update this policy. Significant changes will be communicated in the app.` },
    { title: '10. Contact Us', body: `hello@inksocial.app\n\nInformation Regulator of SA:\nhttps://inforeg.org.za\n\n© 2026 InkSocial. All rights reserved.` },
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
          Privacy Policy
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