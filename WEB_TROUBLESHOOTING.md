# Web Troubleshooting Guide

## Current Issue: 500 Error with MIME type 'application/json'

This error occurs when Metro bundler encounters an error and returns a JSON error response instead of JavaScript.

## Solution Steps:

### 1. Stop the current server
Press `Ctrl+C` in the terminal where Expo is running.

### 2. Install/Update dependencies
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp
yarn install
```

### 3. Clear all caches
```bash
# Clear Metro bundler cache
yarn start --clear

# Or manually:
rm -rf node_modules/.cache
rm -rf .expo
```

### 4. Restart with web flag
```bash
yarn start --web
```

Or:
```bash
yarn start
# Then press 'w' for web
```

## If Still Getting Errors:

### Check for missing dependencies:
```bash
yarn add react-dom react-native-web @expo/metro-runtime
```

### Verify web support in app.json:
The `web` section should exist in `app.json`.

### Check terminal for actual error:
The Metro bundler terminal output will show the real error message (not just the browser console).

## Common Issues:

1. **FlashList on web**: Fixed by using WebCompatibleList component
2. **Missing web dependencies**: Install react-dom and react-native-web
3. **Cache issues**: Clear all caches and restart
4. **Import errors**: Check for platform-specific imports

## Alternative: Use Expo Go on Phone

If web continues to have issues, use Expo Go app:
1. Install Expo Go on your phone
2. Run `yarn start`
3. Scan QR code with Expo Go app

This is often more reliable than web for development.
