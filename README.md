# Wahizza Mobile App

🍕 Modern mobile app for Wahizza pizzeria built with React Native & Expo SDK 54. Features menu browsing, online ordering, Google SSO authentication, and a Pizza Points loyalty system. Dark mode UI with premium black & gold design.

A frontend-only React Native mobile app for Wahizza pizzeria. Features menu browsing, online ordering, and a Pizza Points loyalty system with local storage.

**Home**

<img width="356" height="763" alt="Screenshot 2026-01-27 at 9 49 53 PM" src="https://github.com/user-attachments/assets/a86c593c-d913-4d2a-ba41-d4c41e652bb2" />

**Menu**

<img width="356" height="763" alt="Screenshot 2026-01-27 at 9 50 08 PM" src="https://github.com/user-attachments/assets/ea0b909f-1c19-40a0-88fa-7513f96797c7" />

**Cart**

<img width="356" height="763" alt="Screenshot 2026-01-27 at 9 50 28 PM" src="https://github.com/user-attachments/assets/9832db71-9529-4c69-a424-74896deae434" />

**Orders**

<img width="356" height="763" alt="Screenshot 2026-01-27 at 9 50 45 PM" src="https://github.com/user-attachments/assets/d08c460e-a211-46f1-ba44-9323421930a0" />

**Rewards**
<img width="356" height="763" alt="Screenshot 2026-01-27 at 9 51 15 PM" src="https://github.com/user-attachments/assets/5bb4093e-0162-4f1c-b66b-15abc67eb5a7" />




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
