# Fix Xcode simctl Error (Code 72)

## The Problem
`xcrun simctl help exited with non-zero code: 72` means Xcode Command Line Tools aren't properly configured.

## Solutions

### Solution 1: Accept Xcode License (Most Common)

1. **Open Xcode** (from Applications folder)
2. **Accept the license agreement** when prompted
3. If no prompt, go to: **Xcode > Settings > General** and check for license acceptance
4. Or run in terminal:
```bash
sudo xcodebuild -license accept
```

### Solution 2: Reinstall Command Line Tools

```bash
# Remove current tools
sudo rm -rf /Library/Developer/CommandLineTools

# Reinstall
xcode-select --install
```

Follow the prompts in the popup window.

### Solution 3: Point to Full Xcode (Not Just CLI Tools)

If you have full Xcode installed:

```bash
# Find Xcode path (usually /Applications/Xcode.app)
ls /Applications/ | grep -i xcode

# Set it as the active developer directory
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

# Verify
xcode-select -p
```

### Solution 4: Install Full Xcode

If you only have Command Line Tools:

1. **Install Xcode from App Store** (it's free, but large ~10GB)
2. **Open Xcode once** to complete setup
3. **Accept license** when prompted
4. Run:
```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

## Verify Fix

After applying a solution, verify:

```bash
# Check path
xcode-select -p

# Test simctl
xcrun simctl list devices

# Should show list of simulators, not an error
```

## Quick Fix Commands

Try these in order:

```bash
# 1. Accept license
sudo xcodebuild -license accept

# 2. Reset command line tools
sudo xcode-select --reset

# 3. If that doesn't work, reinstall
xcode-select --install
```

## Alternative: Use Physical Device

If simulators keep having issues, you can:
1. Use **Expo Go** app on your iPhone
2. Run `yarn start`
3. Scan QR code with Expo Go

This doesn't require Xcode simulators.
