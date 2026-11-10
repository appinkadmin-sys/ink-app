import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import EmailAuthScreen from '../screens/EmailAuthScreen';
import LoginAuthScreen from '../screens/LoginAuthScreen';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import HomeScreen from '../screens/HomeScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

// If you have these screens created, keep these imports.
// If not, remove these imports and the <Stack.Screen> lines below.
import SettingsScreen from '../screens/SettingsScreen';
import AccountSummaryScreen from '../screens/AccountSummaryScreen';
import PopiaRightsScreen from '../screens/PopiaRightsScreen';

export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  EmailAuth: undefined;
  LoginAuth: undefined;
  CheckEmail: { email: string };
  ProfileSetup: undefined;
  Home: undefined;
  Terms: undefined;
  Privacy: undefined;
  Settings: undefined;
  AccountSummary: undefined;
  PopiaRights: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#02040A', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#02040A' },
      }}
    >
      {user ? (
        // User is logged in
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="AccountSummary" component={AccountSummaryScreen} />
          <Stack.Screen name="PopiaRights" component={PopiaRightsScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
        </>
      ) : (
        // User is NOT logged in
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="EmailAuth"
            component={EmailAuthScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="LoginAuth"
            component={LoginAuthScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}