import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from '../theme';

export default function ProfileSetupScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const cleanUsername = username.trim().toLowerCase();
  const usernameValid =
    cleanUsername.length >= 3 &&
    cleanUsername.length <= 15 &&
    /^[a-z0-9_]+$/.test(cleanUsername);
  const nameValid = displayName.trim().length >= 2;
  const canContinue = nameValid && usernameValid;

  const handleUsernameChange = (text: string) => {
    const clean = text.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(clean);
    if (clean.length > 0 && clean.length < 3) {
      setUsernameError('At least 3 characters');
    } else if (clean.length > 15) {
      setUsernameError('Maximum 15 characters');
    } else {
      setUsernameError(null);
    }
  };

  const handleContinue = () => {
    console.log('[ProfileSetup]', { displayName, username: cleanUsername });
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
        <View
          style={{
            paddingHorizontal: spacing.xl,
            marginTop: spacing.xl,
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
            Set up your{'\n'}profile
          </Text>
          <Text
            style={{
              fontSize: typography.bodyLarge,
              color: colors.textMuted,
              marginTop: spacing.md,
              lineHeight: 24,
            }}
          >
            This is how people will find you on Ink.
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: spacing.xxl }}>
          <Pressable
            onPress={() => console.log('[ProfileSetup] Pick avatar')}
            style={({ pressed }) => ({
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: colors.surfaceAlt,
              borderWidth: 2,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Camera size={32} color={colors.textMuted} strokeWidth={2} />
          </Pressable>
          <Text
            style={{
              color: 'rgba(250, 250, 250, 0.5)',
              fontSize: 12,
              marginTop: spacing.sm,
            }}
          >
            Tap to add a photo (optional)
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: spacing.xl,
            marginTop: spacing.xxl,
            justifyContent: 'flex-end',
          }}
        >
          <Input
            label="DISPLAY NAME"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="John Doe"
            autoCapitalize="words"
            maxLength={30}
          />
          <Input
            label="USERNAME"
            value={username}
            onChangeText={handleUsernameChange}
            placeholder="johndoe"
            autoCapitalize="none"
            error={usernameError}
            maxLength={15}
          />
          <Text
            style={{
              color: 'rgba(250, 250, 250, 0.4)',
              fontSize: 12,
              marginTop: -spacing.sm,
              marginBottom: spacing.lg,
            }}
          >
            Letters, numbers, and underscores only.
          </Text>
          <Button
            label="Continue"
            onPress={handleContinue}
            disabled={!canContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
}