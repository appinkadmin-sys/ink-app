import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from '../theme';

export default function LoginAuthScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValid = identifier.trim().length >= 3 && password.length >= 6;

  const handleLogin = () => {
    setError(null);
    console.log('[LoginAuth] Would log in:', { identifier, password });
    // TODO: Firestore username lookup + signInWithEmailAndPassword
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.sm,
          paddingBottom: insets.bottom + spacing.lg,
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
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
            Log in
          </Text>
          <Text
            style={{
              fontSize: typography.bodyLarge,
              color: colors.textMuted,
              marginTop: spacing.md,
              lineHeight: 24,
            }}
          >
            Use your username or email.
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: spacing.xl,
            marginTop: spacing.xxl,
          }}
        >
          <Input
            label="USERNAME OR EMAIL"
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="johndoe or you@example.com"
          />

          <Input
            label="PASSWORD"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry
            error={error}
          />

          <Button
            label="Log in"
            onPress={handleLogin}
            disabled={!isValid}
            style={{ marginTop: spacing.md }}
          />

          <Pressable
            onPress={() => console.log('[LoginAuth] Forgot password tapped')}
            style={{ marginTop: spacing.md, alignItems: 'center' }}
          >
            <Text
              style={{
                color: 'rgba(250, 250, 250, 0.6)',
                fontSize: 13,
                textDecorationLine: 'underline',
              }}
            >
              Forgot your password?
            </Text>
          </Pressable>

          <View style={{ marginTop: spacing.lg, alignItems: 'center' }}>
            <Text
              style={{
                color: 'rgba(250, 250, 250, 0.5)',
                fontSize: 13,
              }}
            >
              New to Ink?{' '}
              <Text
                style={{ color: colors.base, fontWeight: '700' }}
                onPress={() => navigation.navigate('SignUp')}
              >
                Create account
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}