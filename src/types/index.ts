import type { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  username: string;         // lowercase, unique
  displayName: string;
  photoURL: string | null;
  emailVerified: boolean;
  consentContacts: boolean;
  createdAt: Timestamp;
  lastSeen: Timestamp;
}

export interface Chat {
  id: string;
  members: [string, string];  // sorted uids
  lastMessage: string;
  lastMessageAt: Timestamp;
  lastMessageBy: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  mediaUrl: string | null;
  createdAt: Timestamp;
  readBy: string[];
}

export type AuthMode = 'signup' | 'login';