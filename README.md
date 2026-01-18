# Wahizza Mobile App

🍕 Modern mobile app for Wahizza pizzeria built with React Native & Expo SDK 54. Features menu browsing, online ordering, Google SSO authentication, and a Pizza Points loyalty system. Dark mode UI with premium black & gold design.

A frontend-only React Native mobile app for Wahizza pizzeria. Features menu browsing, online ordering, and a Pizza Points loyalty system with local storage.

## Features

- 🍕 **Menu & Ordering**: Browse menu items and add to cart
- 🎁 **Loyalty System**: Pizza Points - earn 1 point per $1 spent (stored locally)
- 🎨 **Dark Mode Design**: Premium black & gold aesthetic
- 📱 **Authentication**: Local user authentication with AsyncStorage
- 🛒 **Shopping Cart**: Persistent cart with AsyncStorage
- 📊 **Rewards Dashboard**: Track points and spending history

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS)
- **Storage**: AsyncStorage (local data persistence)
- **State Management**: React Context API

## Setup

1. **Install dependencies:**
```bash
yarn install
```

2. **Start the app:**
```bash
yarn start
```

Then press `w` for web, `i` for iOS simulator, or `a` for Android emulator.

## Project Structure

```
WahizzaApp/
├── app/              # Expo Router pages
│   ├── (tabs)/      # Tab navigation
│   └── _layout.tsx  # Root layout
├── src/
│   ├── components/  # Reusable components
│   ├── config/      # API configurations
│   ├── context/     # React Context providers
│   ├── services/    # API services
│   └── types/       # TypeScript types
└── global.css       # Tailwind CSS
```

## Next Steps

- Complete menu screen with product listings
- Implement product detail page
- Build checkout flow
- Complete rewards dashboard
- Add authentication screens
