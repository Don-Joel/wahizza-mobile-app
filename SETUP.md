# Quick Setup Guide

## Installation Steps

1. **Navigate to the project:**
   ```bash
   cd /Users/joeltavarez/Desktop/WahizzaApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device/simulator:**
   - Press `i` for iOS Simulator (Mac only)
   - Press `a` for Android Emulator
   - Scan the QR code with Expo Go app on your phone

## What's Included

✅ Complete UI with 5 main screens:
- Menu/Home screen with categories
- Product detail with customization
- Shopping cart
- Checkout flow
- Order history

✅ Features:
- Modern gradient design
- Smooth animations
- Persistent cart storage
- Category filtering
- Product customization (sizes, toppings)
- Order management

✅ Performance optimizations:
- FlashList for fast scrolling
- Optimized image loading
- Efficient state management

## Mock Data

The app uses mock data from `src/data/mockData.ts`. You can customize:
- Products and prices
- Categories
- Available toppings
- Order history

## Next Steps for Production

1. Replace mock data with Shopify API integration
2. Add real product images
3. Configure push notifications
4. Set up analytics
5. Add payment processing
6. Implement user authentication

## Troubleshooting

**"Module not found" errors:**
- Run `npm install` again
- Clear cache: `npx expo start -c`

**iOS Simulator not opening:**
- Make sure Xcode is installed
- Run `xcode-select --install` if needed

**Android Emulator not opening:**
- Make sure Android Studio is installed
- Start an emulator from Android Studio first
