import React from 'react';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './src/screens/WelcomeScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <WelcomeScreen
        onCreateAccount={() => console.log('[Welcome] Create account tapped')}
        onLogin={() => console.log('[Welcome] Log in tapped')}
      />
    </>
  );
}