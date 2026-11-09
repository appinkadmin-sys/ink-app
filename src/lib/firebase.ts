import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCn3RgE60I3UURYqDFzP9C-s84qKOUNnh0",
  authDomain: "ink-app-f8f0b.firebaseapp.com",
  projectId: "ink-app-f8f0b",
  storageBucket: "ink-app-f8f0b.firebasestorage.app",
  messagingSenderId: "425944087496",
  appId: "1:425944087496:android:219fb8ba7603b5db675efd",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

export const db = initializeFirestore(app, {
  localCache:
    Platform.OS === 'web'
      ? persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      : persistentLocalCache(),
});

console.log('[Firebase] initialized:', firebaseConfig.projectId);

export default app;