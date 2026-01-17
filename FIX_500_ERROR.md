# Fix 500 Error - Step by Step

The 500 error means Metro bundler is failing to create the JavaScript bundle. Follow these steps:

## Step 1: Stop Current Server
Press `Ctrl+C` in the terminal to stop Expo.

## Step 2: Clean Everything
```bash
cd /Users/joeltavarez/Desktop/WahizzaApp

# Remove all caches
rm -rf node_modules/.cache
rm -rf .expo
rm -rf .expo-shared
rm -rf .metro
```

## Step 3: Reinstall Dependencies
```bash
# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

## Step 4: Check Terminal for Real Error
When you run `yarn start --web`, **look at the terminal output** (not just the browser). 
The terminal will show the actual error message that's causing the 500.

Common errors you might see:
- `Cannot find module '...'` - Missing dependency
- `SyntaxError: ...` - Code syntax error
- `TypeError: ...` - Runtime type error

## Step 5: Start Fresh
```bash
yarn start --clear --web
```

## If You See a Specific Error:

### "Cannot find module '@shopify/flash-list'"
```bash
yarn add @shopify/flash-list
```

### "Cannot find module 'react-dom'"
```bash
yarn add react-dom react-native-web
```

### Any other module error
Install the missing package:
```bash
yarn add <package-name>
```

## Alternative: Check Metro Bundler Output

The **terminal where you run `yarn start`** will show the actual error. 
The browser console only shows the symptom (500 error), but the terminal shows the cause.

**Copy the error message from the terminal and share it** - that will tell us exactly what's wrong!
