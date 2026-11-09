import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { useAuth } from './src/hooks/useAuth';

import './src/lib/firebase';

export default function App() {
  // 1. Get the loading state from your hook
  const { loading } = useAuth();

  // 2. While Firebase checks if the user is logged in, show a loading spinner
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#02040A', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  // 3. Once loading is false, show the app
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}