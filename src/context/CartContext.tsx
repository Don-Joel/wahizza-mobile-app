import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types';

const CART_STORAGE_KEY = '@wahizza_cart';

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCart = useCallback(async (newItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      const existingIndex = items.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          i.variant.id === item.variant.id &&
          JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = [...items];
        newItems[existingIndex].quantity += item.quantity;
      } else {
        newItems = [...items, item];
      }

      saveCart(newItems);
    },
    [items, saveCart]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      const newItems = items.filter((i) => i.id !== itemId);
      saveCart(newItems);
    },
    [items, saveCart]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(itemId);
        return;
      }

      const newItems = items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCart(newItems);
    },
    [items, removeItem, saveCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.variant.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
