# Wahizza App - Build Guide

## Types of Builds

### 1. Development Build (For Testing)
Run the app in development mode with hot reloading.

```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
yarn start
```

Then choose:
- Press `i` for iOS simulator
- Press `a` for Android emulator  
- Press `w` for web browser
- Scan QR code for physical device

### 2. Web Build (For Web Deployment)

#### Development Web Build
```bash
yarn start --web
```

#### Production Web Build
```bash
# Install EAS CLI if not already installed
npm install -g eas-cli

# Build for web
npx expo export:web
```

Output will be in `web-build/` folder. You can deploy this to any static hosting.

### 3. Native App Builds (For App Stores)

#### Option A: EAS Build (Recommended - Cloud Build)

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Configure EAS:**
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
eas build:configure
```

4. **Build for iOS:**
```bash
eas build --platform ios
```

5. **Build for Android:**
```bash
eas build --platform android
```

6. **Build for both:**
```bash
eas build --platform all
```

#### Option B: Local Build (Requires Xcode/Android Studio)

**For iOS (Mac only):**
```bash
# Install pods (if using any native modules)
cd ios && pod install && cd ..

# Build
npx expo run:ios
```

**For Android:**
```bash
npx expo run:android
```

### 4. Production Build with EAS

1. **Create app.json production config:**
Update `app.json` with production settings.

2. **Build production version:**
```bash
eas build --platform ios --profile production
eas build --platform android --profile production
```

3. **Submit to stores:**
```bash
eas submit --platform ios
eas build --platform android --profile production
```

## Build Profiles

Create `eas.json` for different build configurations:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

## Pre-Build Checklist

Before building for production:

- [ ] Update version in `app.json`
- [ ] Add app icons (`assets/icon.png`)
- [ ] Add splash screen (`assets/splash.png`)
- [ ] Configure app store metadata
- [ ] Test on physical devices
- [ ] Remove console.logs and debug code
- [ ] Update bundle identifiers
- [ ] Configure signing certificates (iOS)
- [ ] Configure keystore (Android)

## Quick Commands Reference

```bash
# Development
yarn start                    # Start dev server
yarn start --web             # Web dev server
yarn start --ios             # iOS simulator
yarn start --android        # Android emulator

# Web Build
npx expo export:web         # Production web build

# Native Builds (EAS)
eas build --platform ios    # iOS build
eas build --platform android # Android build
eas build --platform all   # Both platforms

# Local Native Builds
npx expo run:ios            # Local iOS build
npx expo run:android       # Local Android build
```

## Troubleshooting

### "EAS CLI not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### Build fails
- Check `eas.json` configuration
- Verify app.json settings
- Check Expo documentation for latest requirements

## For Your Proposal

For a **proposal/demo**, you probably want:

1. **Web build** - Easiest to share:
   ```bash
   npx expo export:web
   ```
   Then host the `web-build/` folder

2. **Development build** - Show live:
   ```bash
   yarn start
   ```
   Share QR code or run on simulator

3. **Preview build** - Test on real device:
   ```bash
   eas build --platform ios --profile preview
   ```
