import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import GoogleLogo from '../components/GoogleLogo';
import { useTheme } from '../theme';

export default function SignUpScreen() {
  const { colors, spacing, radii, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoogle = () => console.log('[SignUp] Google tapped');
  const handleEmail = () => navigation.navigate('EmailAuth');

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
            <X size={20} color={colors.text} strokeWidth={2.5} />
          </Pressable>
        </View>

        <View
          style={{
            paddingHorizontal: spacing.xl,
            marginTop: spacing.xxl,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: '900',
              letterSpacing: -1.2,
              color: colors.text,
              lineHeight: 40,
            }}
          >
            Create your{'\n'}account
          </Text>
          <Text
            style={{
              fontSize: typography.bodyLarge,
              color: colors.textMuted,
              marginTop: spacing.md,
              lineHeight: 24,
            }}
          >
            Join Ink and start talking to real people.
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: spacing.xl,
          }}
        >
          <Pressable
            onPress={handleGoogle}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              paddingVertical: spacing.md + 2,
              borderRadius: radii.pill,
              marginBottom: spacing.md,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <View style={{ marginRight: 10 }}>
              <GoogleLogo size={22} />
            </View>
            <Text
              style={{
                color: '#0F1117',
                fontSize: typography.bodyLarge,
                fontWeight: '700',
              }}
            >
              Continue with Google
            </Text>
          </Pressable>

          <Pressable
            onPress={handleEmail}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderColor: 'rgba(250, 250, 250, 0.2)',
              paddingVertical: spacing.md + 2,
              borderRadius: radii.pill,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Mail
              size={20}
              color={colors.text}
              strokeWidth={2}
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: typography.bodyLarge,
                fontWeight: '600',
              }}
            >
              Continue with email
            </Text>
          </Pressable>

          <View style={{ marginTop: spacing.lg, alignItems: 'center' }}>
            <Text
              style={{
                color: 'rgba(250, 250, 250, 0.5)',
                fontSize: 13,
              }}
            >
              Already have an account?{' '}
              <Text
                style={{ color: colors.base, fontWeight: '700' }}
                onPress={() => navigation.replace('Login')}
              >
                Log in
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}