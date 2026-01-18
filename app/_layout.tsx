import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="product/[id]"
            options={{ presentation: 'modal' }}
          />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
