# Wahizza Mobile App

🍕 Modern mobile app for Wahizza pizzeria built with React Native & Expo SDK 54. Features menu browsing, online ordering, Google SSO authentication, and a Pizza Points loyalty system. Dark mode UI with premium black & gold design.

A high-performance React Native mobile app for Wahizza pizza shop with Shopify integration and Supabase-powered loyalty system.

## Features

- 🍕 **Menu & Ordering**: Fetch products from Shopify Storefront API
- 🎁 **Loyalty System**: Pizza Points - earn 1 point per $1 spent
- 🎨 **Dark Mode Design**: Urban-modern aesthetic with vibrant orange/red accents
- 📱 **Authentication**: Google SSO login
- 🛒 **Shopping Cart**: Persistent cart with AsyncStorage
- 📊 **Rewards Dashboard**: Track points and spending

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS)
- **Backend**: Shopify Storefront API + Supabase
- **State Management**: React Query + Context API

## Setup

1. **Install dependencies:**
```bash
yarn install
```

2. **Configure environment variables:**
Create a `.env` file:
```
EXPO_PUBLIC_SHOPIFY_SHOP_URL=yourstore.myshopify.com
EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

3. **Start the app:**
```bash
yarn start
```

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
