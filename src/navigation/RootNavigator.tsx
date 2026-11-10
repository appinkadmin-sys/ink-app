

warning: Bundler cache is empty, rebuilding (this may take a minute)
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀ █▀▀▄█▀▄█▀▄██ ▄▄▄▄▄ █
█ █   █ █▀ ▄ █▀  ▄▀ ▀▀█ █   █ █
█ █▄▄▄█ █▀█ █▄ ▀▀ ▄▀▄██ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄█▄█ █▄▀▄█ ▀▄█▄▄▄▄▄▄▄█
█    ▄█▄ ▄ ▄█▄▄▄▄▀▄▄ ▄▄▀▄▀▄█▄▀█
█▀▀ █ ▄▄▀█ ▀ ▄▄ ▄ █▄▀ ▀▀▄ ██▀██
█▀██ ██▄█ ▄▀▄▀▀██▀  ▀▄▄▀▄▀▄ █▀█
█▀▄ ▀██▄▄█  █▀ ▄ ▀▄██▄ ▄▀██▄▀██
█ ▄▀▄▄▄▄▄▄▄██▄█▄█▀▀█▀▄ ▀█▀▀ █▀█
█ █  ▀█▄██▄█ ▄█▀▄ ▄██▄▀ █▀▄▄▀██
█▄█▄▄▄▄▄▄   ▄▀▀▀██▄▀▀ ▄▄▄ ▀   █
█ ▄▄▄▄▄ █▄  █▀ ▄▄ ██▄ █▄█ ▄▄█▀█
█ █   █ █ ▄██▄█▄█▀ ██  ▄ ▄▄▄▀▀█
█ █▄▄▄█ █    ▄█▀ ██ ▄ ▀▄▀ ▄█ ██
█▄▄▄▄▄▄▄█▄█▄▄███▄▄▄███▄███▄▄███

› Scan the QR code above to open in Expo Go.
› Choose an app to open your project at
http://192.168.0.117:8081/_expo/loading
› Metro: exp://192.168.0.117:8081

› Using Expo Go (Press s to switch to development build)
› Press ? │ show all commands

2 packages may need updating. Run npx expo install --check for details.
Logs for your project will appear below. Press Ctrl+C to exit.
Android Bundling failed 64841ms index.ts (872 modules)
Unable to resolve "../screens/SettingsScreen" from "src/navigation/RootNavigator.tsx"
  17 | // If you have these screens created, keep these imports.
  18 | // If not, remove these imports and the <Stack.Screen> lines below.
> 19 | import SettingsScreen from '../screens/SettingsScreen';
     |                             ^
  20 | import AccountSummaryScreen from '../screens/AccountSummaryScreen';
  21 | import PopiaRightsScreen from '../screens/PopiaRightsScreen';
  22 |

Import stack:

 src/navigation/RootNavigator.tsx
 | import "../screens/SettingsScreen"

 App.tsx
 | import "./src/navigation/RootNavigator"

 index.ts
 | import "./App"


 | import "./index.ts"
