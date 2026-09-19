ARCHITECTURE.md# 📘 INK — Complete Developer Handoff Document

**Last updated:** 19 September 2026
**Version:** 0.1.0 (Pre-MVP)
**Repo:** `appinkadmin-sys/ink-app`
**Prepared for:** Future developers, co-founders, or new team members

---

## 1. 🎯 What Is Ink?

**Ink** is a social media application for **16+ users**, built for **South Africa first, global later**. It combines:

- **Feed** (Instagram-style posts)
- **Inks** (short vertical videos — reels)
- **Stories** (24-hour ephemeral content with privacy controls)
- **Chat** (1:1, group chat, public/private chatrooms)
- **Discovery** (find people by username/email, suggested users)

**Positioning:** "Find your social apps in one." Not a dating app. A complete social platform.

**Compliance:**
- POPIA (South Africa)
- GDPR (EU) — later
- Play Store / App Store policies
- Age gate: 16+

---

## 2. 🏢 Brand

| Field | Value |
|-------|-------|
| **Name** | Ink |
| **Company** | Ink by InkSocial |
| **Copyright** | © 2026 InkSocial |
| **Logo** | Pen inside a chat icon (design TBD) |
| **Primary color** | Crimson `#DC2626` |
| **Background** | Obsidian `#02040A` |
| **Text** | Chalk `#FAFAFA` |
| **Muted text** | `#8A8F98` |
| **Success** | `#22C55E` |
| **Warning** | `#F59E0B` |
| **Admin account** | Username: `Ink` · Handle: `support@admin.ink` |
| **Contact** | `hello@inksocial.app` |

---

## 3. 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Expo SDK | 57 |
| **Language** | TypeScript | 6.0.3 |
| **UI Framework** | React Native | 0.86.3 |
| **React** | React | 19.2.3 |
| **Auth + DB** | Firebase (Auth + Firestore) | Web SDK 12.x |
| **Media** | Cloudinary | Free tier |
| **Icons** | Lucide React Native | 1.47.0 |
| **Navigation** | React Navigation | 7.x |
| **Dev environment** | GitHub Codespaces (Ubuntu 24.04) | — |
| **Tunnel** | ngrok via `@expo/ngrok` | 4.1.0 |

---

## 4. 🔑 Project IDs & Keys

| Service | Identifier | Where stored |
|---------|-----------|--------------|
| GitHub repo | `appinkadmin-sys/ink-app` | — |
| Firebase project | `ink-app-f8f0b` | Firebase Console |
| Firebase project number | `425944087496` | Firebase Console |
| Firebase region | `europe-west1` (Belgium) | Firestore location |
| Android package | `com.inksocial.app` | `app.json` |
| iOS bundle | `com.inksocial.app` | `app.json` |
| Cloudinary cloud | `iryuects` | Cloudinary Console |
| Cloudinary API key | `561249973369511` | `.env` (public, safe) |
| Pexels API key | *(rotate before launch)* | `.env` |

**⚠️ Never commit:**
- Cloudinary **API secret** (not in app)
- Firebase **service account JSON** (backend only)
- **Passwords**, OAuth tokens, private URLs

---

## 5. 📁 Repository Structure

```
ink-app/
├── App.tsx                       # Root: Firebase init + NavigationContainer
├── app.json                      # Expo config
├── package.json
├── tsconfig.json
├── .env                          # Secrets (gitignored)
├── .gitignore
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
└── src/
    ├── components/
    │   ├── Avatar.tsx            # Circular avatar with initials fallback
    │   ├── Button.tsx            # Primary / outline / ghost pill button
    │   ├── GoogleLogo.tsx        # Official 4-color Google G (SVG)
    │   └── Input.tsx             # TextInput with label, error, pw toggle
    ├── hooks/
    │   └── useAuth.ts            # Firebase auth state listener
    ├── lib/
    │   ├── cloudinary.ts         # Media upload + folder routing
    │   ├── firebase.ts           # Firebase init + Firestore cache
    │   └── hashing.ts            # SHA-256 for PII (phone, etc.)
    ├── navigation/
    │   └── RootNavigator.tsx     # 13 routes (native stack)
    ├── screens/                  # 13 screens — see §7
    ├── theme/
    │   └── index.ts              # Colors, spacing, radii, typography
    └── types/
        └── index.ts              # User, Chat, Message, AuthMode
```

---

## 6. 🧭 Navigation Map

```
Welcome
├── SignUp (Google / Email choice)
│   └── EmailAuth ──▶ CheckEmail ──▶ ProfileSetup ──▶ Home
│
├── Login (Google / Email choice)
│   └── LoginAuth ──▶ Home
│
├── Terms
└── Privacy

Home
├── Settings
│   ├── AccountSummary
│   ├── PopiaRights
│   ├── Terms
│   └── Privacy
└── (Chat / Contacts / Inks — future)
```

**13 routes registered in `RootStackParamList`.**

---

## 7. 📱 Screens — Current Status

| # | Screen | File | Status |
|---|--------|------|--------|
| 1 | Welcome | `WelcomeScreen.tsx` | ✅ Full UI, animated images |
| 2 | Sign Up (choice) | `SignUpScreen.tsx` | ✅ UI only |
| 3 | Login (choice) | `LoginScreen.tsx` | ✅ UI only |
| 4 | Email Auth | `EmailAuthScreen.tsx` | ✅ UI only — buttons log |
| 5 | Login Auth | `LoginAuthScreen.tsx` | ✅ UI only — buttons log |
| 6 | Check Email | `CheckEmailScreen.tsx` | ✅ UI only |
| 7 | Profile Setup | `ProfileSetupScreen.tsx` | ✅ UI only |
| 8 | Home | `HomeScreen.tsx` | ✅ Empty state |
| 9 | Terms | `TermsScreen.tsx` | ✅ Placeholder legal text |
| 10 | Privacy | `PrivacyScreen.tsx` | ✅ Placeholder legal text |
| 11 | Settings | `SettingsScreen.tsx` | ✅ UI only |
| 12 | Account Summary | `AccountSummaryScreen.tsx` | ✅ UI only (POPIA) |
| 13 | POPIA Rights | `PopiaRightsScreen.tsx` | ✅ Full content |

**Not yet built:** Chat, Contacts, Inks (reels), Stories, Explore/Discover, Feed composer, Story viewer, Chat list.

---

## 8. 🔥 Firebase Setup

### Enabled services
- ✅ **Authentication → Email/Password** (Enabled)
- ⚠️ **Authentication → Google** (Not yet — requires SHA-1 + OAuth setup)
- ✅ **Firestore** (Created in `europe-west1`)
- ⏳ **Storage** (Not needed — using Cloudinary)
- ⏳ **Cloud Messaging** (Not yet)
- ⏳ **Cloud Functions** (Not yet)

### Firestore data model (planned)

```
users/{uid}
  ├── uid              string
  ├── email            string
  ├── username         string (lowercase, unique)
  ├── displayName      string
  ├── photoURL         string | null
  ├── emailVerified    boolean
  ├── consentContacts  boolean
  ├── createdAt        Timestamp
  └── lastSeen         Timestamp

usernames/{username}
  └── uid              string

chats/{chatId}
  ├── members          [uid1, uid2]  (sorted)
  ├── lastMessage      string
  ├── lastMessageAt    Timestamp
  ├── lastMessageBy    string
  └── messages/{msgId}
       ├── senderId    string
       ├── text        string
       ├── mediaUrl    string | null
       ├── createdAt   Timestamp
       └── readBy      string[]
```

### Security rules (deployed)
Only authenticated users can read/write. Users can only write their own doc. Username claims verified. Details in Firebase Console → Firestore → Rules.

---

## 9. ☁️ Cloudinary Setup

### Presets (all **Unsigned**)

| Preset | Purpose | Notes |
|--------|---------|-------|
| `ink_profile` | Profile photos | Square crop, WebP, 400×400 |
| `ink_post` | Feed posts | Max 1440px, WebP |
| `ink_ink` | Inks (reels) | Video, max 90s |
| `ink_story` | Stories | Image or 30s video |
| `ink_chat_media` | Chat attachments | Auto-detect |
| `ink_album` | Album images | Moderation off for now |

**All presets:** Signing mode = **Unsigned**, Asset folder = **BLANK** (folder sent dynamically by app).

### Folder structure (per-user, auto-created)

```
ink/users/{username}/
├── profile/avatar.jpg
├── posts/{postId}/image_1.jpg
├── inks/{inkId}/video.mp4
├── stories/{storyId}/media.jpg
├── albums/{albumId}/image_1.jpg
├── chats/{chatId}/
│   ├── images/
│   ├── videos/
│   ├── audio/
│   └── documents/
└── exports/data-{date}.json    ← POPIA data export
```

**Folder routing logic:** `src/lib/cloudinary.ts` → `buildFolder()`. Username is sanitized (lowercase, alphanumeric + underscore only).

---

## 10. 📦 Installed Packages

### Core
```
expo@57.0.24
expo-status-bar@57.0.1
expo-image@57.0.5
expo-linear-gradient@57.0.2
expo-navigation-bar@57.0.2
expo-av@16.0.8                    (installed, unused)
expo-file-system@19.x
react@19.2.3
react-native@0.86.3
```

### Navigation
```
@react-navigation/native@7.4.1
@react-navigation/native-stack@7.19.2
react-native-screens@4.26.2
react-native-safe-area-context@5.7.0
```

### UI & Animation
```
lucide-react-native@1.47.0
react-native-svg@15.15.4
@expo-google-fonts/inter@0.4.2
react-native-reanimated@4.5.1
react-native-gesture-handler@2.32.0
```

### Backend
```
firebase@12.x
@react-native-async-storage/async-storage@2.x
```

---

## 11. 🔐 Environment Variables

### `.env` (gitignored, in Codespace only)

```
# Pexels (image backgrounds)
EXPO_PUBLIC_PEXELS_KEY=<redacted>

# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCn3RgE60I3UURYqDFzP9C-s84qKOUNnh0
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=ink-app-f8f0b.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=ink-app-f8f0b
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=ink-app-f8f0b.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=425944087496
EXPO_PUBLIC_FIREBASE_APP_ID=1:425944087496:android:219fb8ba7603b5db675efd

# Cloudinary
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=iryuects
EXPO_PUBLIC_CLOUDINARY_API_KEY=561249973369511
EXPO_PUBLIC_CLOUDINARY_PRESET_PROFILE=ink_profile
EXPO_PUBLIC_CLOUDINARY_PRESET_POST=ink_post
EXPO_PUBLIC_CLOUDINARY_PRESET_INK=ink_ink
EXPO_PUBLIC_CLOUDINARY_PRESET_STORY=ink_story
EXPO_PUBLIC_CLOUDINARY_PRESET_CHAT=ink_chat_media
EXPO_PUBLIC_CLOUDINARY_PRESET_ALBUM=ink_album
```

**Firebase + Cloudinary API keys are public by design.** Protection comes from Firestore rules + Cloudinary presets.

---

## 12. 🐛 Known Issues & Workarounds

| Issue | Workaround |
|-------|-----------|
| `libatk-1.0.so.0` / `libgtk-3.so.0` DevTools error | Fake dotslash binary at `node_modules/@react-native/debugger-shell/bin/react-native-devtools` |
| Port 8081 conflict on Metro restart | `pkill -9 -f expo ; pkill -9 -f metro ; pkill -9 -f ngrok` |
| `.env` changes need restart | `npx expo start --tunnel --clear` |
| `SIGKILL` / exit 137 on start | `--max-workers=1` flag |
| `npm audit fix --force` breaks Expo | Never run it |
| Google Sign-In doesn't work in Expo Go | Requires dev client (EAS build) |
| Copy-paste adds `$` prefix | Never copy prompt character |

---

## 13. 🎨 Design System

### Theme (`src/theme/index.ts`)

```ts
colors = {
  base:        '#DC2626',  baseDark: '#991B1B',  baseLight: '#F87171',
  background:  '#02040A',  surface: '#0F1117',   surfaceAlt: '#1A1D24',
  border:      '#1F232B',
  text:        '#FAFAFA',  textMuted: '#8A8F98', textSubtle: '#4B5563',
  danger:      '#DC2626',  success: '#22C55E',   warning: '#F59E0B',
}
spacing    = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 }
radii      = { sm: 8, md: 12, lg: 18, xl: 24, pill: 999 }
typography = { body: 15, bodyLarge: 17, h3: 20, h2: 28, h1: 36, display: 44 }
```

### Component library
- `Button` — primary (crimson pill) / outline / ghost
- `Input` — with label, error, password toggle
- `Avatar` — image or initials fallback
- `GoogleLogo` — official multicolor G

---

## 14. 🚀 Development Workflow

### Start a dev session

```bash
# In Codespace terminal
pkill -9 -f expo ; pkill -9 -f metro ; pkill -9 -f ngrok
npx expo start --tunnel --clear --max-workers=1
```

Scan QR with **Expo Go** on phone.

### Test on phone
1. Force-close Expo Go
2. Reopen → Scan QR
3. Wait 30–90 sec for bundle

### When screens look stale
- Metro terminal: press **`r`** to reload
- Or force-close and reopen Expo Go

### Commit work

```bash
git add .
git commit -m "feat: <description>"
git push
```

If push rejected: `git pull --rebase` then `git push`.

---

## 15. ⚖️ Legal & Compliance

### POPIA compliance (built)
- ✅ Terms & Conditions screen (in-app)
- ✅ Privacy Policy screen (in-app)
- ✅ Account Summary (right to access)
- ✅ POPIA Rights screen (7 rights explained)
- ✅ Data retention policy stated
- ✅ Right to erasure button (Settings → Delete)

### POPIA compliance (pending)
- ⏳ Actual data export (JSON download)
- ⏳ Actual account deletion (Cloud Function)
- ⏳ Information Officer registration
- ⏳ Lawyer-reviewed legal text

### Age gate
- **16+ only.** Enforced in signup flow (TBD — add gate).

### Content moderation
- ⏳ NSFW filter on albums (paid Cloudinary addon)
- ⏳ Username change rate limit (5×/week)
- ⏳ Block code injection in all text inputs

---

## 16. 📅 Roadmap — Next Sessions

| Session | Focus | Est. Time |
|---------|-------|-----------|
| **2 (next)** | Firebase auth wiring — signup/login actually work | 90 min |
| 3 | Firestore user profiles + username claim | 60 min |
| 4 | Cloudinary avatar upload (glass UI) | 60 min |
| 5 | Main tabs — bottom nav with 5 icons | 90 min |
| 6 | Feed (For You tab) — posts skeleton | 2 hr |
| 7 | Stories — create, view, ring colors | 2 hr |
| 8 | Chat — 1:1 Firestore messages | 3 hr |
| 9 | Group chat + media uploads | 2 hr |
| 10 | Explore + Suggested users | 2 hr |
| 11 | Inks (reels) | 2 hr |
| 12 | Notifications + push (FCM) | 2 hr |
| 13 | Moderation + admin account | 3 hr |
| 14 | Settings + POPIA exports | 2 hr |
| 15+ | Agora video calls (dev client build) | 3 hr |
| 16+ | Polish, store listing, closed beta | — |

**Estimated time to MVP: ~30 hours of focused work.**

---

## 17. 📊 Current Progress: ~25% of MVP

| Category | Progress |
|----------|----------|
| Environment & tooling | 🟢 100% |
| Firebase backend | 🟢 95% |
| Cloudinary backend | 🟢 90% |
| Navigation | 🟢 95% |
| Screens (UI) | 🟢 85% |
| Components | 🟢 80% |
| Auth logic (Firebase calls) | 🔴 0% |
| Data model (writes) | 🔴 0% |
| Chat functionality | 🔴 0% |
| Feed / Stories / Inks | 🔴 0% |
| Store readiness | 🔴 0% |
| POPIA (full compliance) | 🟡 60% |

---

## 18. 🛑 Anti-Patterns

**Never do these:**

- ❌ Run `npm audit fix --force` (downgrades Expo)
- ❌ Hardcode colors — use `useTheme()`
- ❌ Use `any` in TypeScript
- ❌ Put secrets in client code (except Firebase/Cloudinary public keys)
- ❌ Filter images or content by race/gender/etc. (legal + ethical violation)
- ❌ Promise features you haven't built (false advertising)
- ❌ Navigate to routes not in `RootStackParamList`
- ❌ Commit `.env`

---

## 19. 🎯 Testing Checklist Before Launch

- [ ] Sign up works end-to-end (Firebase creates user)
- [ ] Email verification works
- [ ] Login works (email + username)
- [ ] Password reset works
- [ ] Profile setup writes to Firestore
- [ ] Avatar upload to Cloudinary works
- [ ] Username uniqueness check works
- [ ] Feed loads posts
- [ ] Story create/view works
- [ ] Chat 1:1 works (send + receive)
- [ ] Group chat works
- [ ] Media upload in chat works
- [ ] Search users works
- [ ] Account deletion works (POPIA)
- [ ] Data export works (POPIA)
- [ ] Logout works
- [ ] Airplane mode — offline caching works
- [ ] Test on 3+ different Android devices
- [ ] Test on 2 iOS devices
- [ ] Test with slow network throttling
- [ ] Terms/Privacy reviewed by lawyer

---

## 20. 👤 Admin Account

**Username:** `Ink`
**Handle:** `support@admin.ink`
**Purpose:** Receive user reports (no media), auto-share warnings, moderate content

**To be built in Session 13.**

---

## 21. 📞 Contacts

| Role | Contact |
|------|---------|
| Developer | `appink.admin@gmail.com` |
| GitHub | `github.com/appinkadmin-sys` |
| Firebase | `console.firebase.google.com/project/ink-app-f8f0b` |
| Cloudinary | `console.cloudinary.com` |
| Agora | `console.agora.io` (project: `ink-app-agora`) |

---

## 22. 📚 Key Decisions & Why

| Decision | Reason |
|----------|--------|
| **Expo over bare RN** | Fast iteration, OTA updates, EAS build |
| **Firebase over custom backend** | Serverless, free tier, scales, no DevOps |
| **Cloudinary over Firebase Storage** | Auto-transformation, CDN, folder routing |
| **No Render server (yet)** | Firebase handles all needs for 12+ months |
| **Unsigned Cloudinary presets** | Client uploads, no backend signature needed |
| **16+ age gate** | Legal, App Store category |
| **POPIA-first design** | South African compliance is non-negotiable |
| **No hidden app purpose** | Legal, ethical, and business necessity |

---

## 23. ✅ What's Working Right Now

**The app is fully operational for the current stage:**

1. Runs on physical phone via Expo Go
2. Firebase connected (`[Firebase] initialized: ink-app-f8f0b`)
3. Firestore database created and secured
4. Cloudinary configured with 6 presets
5. 13 screens navigate end-to-end
6. TypeScript: zero errors
7. All POPIA compliance screens built
8. Media upload function ready to wire

**Not yet operational:**
- Actual authentication (buttons log only)
- Actual database writes
- Actual media uploads (function exists, not called yet)
- Chat, feed, stories (not built)

---

## 24. 🎯 What a New Developer Should Do First

1. Read this document
2. Clone repo: `git clone https://github.com/appinkadmin-sys/ink-app`
3. Open in Codespace
4. Ask existing dev for `.env` file (contains API keys)
5. Run `npx expo start --tunnel --clear --max-workers=1`
6. Scan QR with Expo Go on their phone
7. Pick a session from §16 and start building
8. **Don't touch Firebase/Cloudinary config unless necessary**

---

## 25. 📝 Living Document

**This document will be updated each session.** When you complete work, update the relevant section:

- §7 — mark screens as built
- §16 — check off completed sessions
- §17 — update progress %
- §23 — update what's working

**Save this file as `ARCHITECTURE.md` in the repo root. Commit it. Keep it current.**

---

**For questions:** `hello@inksocial.app`
**© 2026 InkSocial. All rights reserved.**