# Building Wahizza App for iOS/Android

## Prerequisites

### For iOS:
- Mac computer
- Xcode installed (from App Store)
- Xcode Command Line Tools: `xcode-select --install`
- CocoaPods: `sudo gem install cocoapods`

### For Android:
- Android Studio installed
- Android SDK configured
- Java Development Kit (JDK)

## Build Commands

### Development Build (Testing)

**iOS:**
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
yarn start
# Press 'i' for iOS simulator
```

Or directly:
```bash
yarn ios
```

**Android:**
```bash
yarn start
# Press 'a' for Android emulator
```

Or directly:
```bash
yarn android
```

### Production Build with EAS (Recommended)

1. **Install EAS CLI:**
```bash
yarn global add eas-cli
# or
npm install -g eas-cli
```

2. **Login:**
```bash
eas login
```

3. **Configure:**
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
eas build:configure
```

4. **Build:**
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Both
eas build --platform all
```

### Local Native Build

**iOS (requires Xcode):**
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
npx expo run:ios
```

**Android (requires Android Studio):**
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
npx expo run:android
```

## First Time Setup

1. **Install dependencies:**
```bash
yarn install
```

2. **For iOS, install pods:**
```bash
cd ios
pod install
cd ..
```

3. **Start development:**
```bash
yarn start
```

## Troubleshooting

### "Command not found: eas"
```bash
yarn global add eas-cli
```

### iOS build fails
- Make sure Xcode is installed and opened at least once
- Run `xcode-select --install`
- Check that you have a valid Apple Developer account (for production builds)

### Android build fails
- Make sure Android Studio is installed
- Set ANDROID_HOME environment variable
- Start an Android emulator first

### Dependencies
- All dependencies are in package.json
- FlashList is included for native performance
- No web-specific code

## Quick Start

```bash
# Install
yarn install

# Run on iOS
yarn ios

# Run on Android  
yarn android
```
