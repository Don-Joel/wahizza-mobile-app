import { supabase } from '../config/supabase';
import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'wahizza_user_id';

export const authService = {
  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await SecureStore.setItemAsync(USER_KEY, data.user.id);
        return data.user;
      }

      return null;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  async signInWithPhone(phone: string) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in with phone:', error);
      throw error;
    }
  },

  async verifyPhoneOTP(phone: string, token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      });

      if (error) throw error;

      if (data.user) {
        await SecureStore.setItemAsync(USER_KEY, data.user.id);
        return data.user;
      }

      return null;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  async signUp(email: string, password: string, phone?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone,
      });

      if (error) throw error;

      if (data.user) {
        await SecureStore.setItemAsync(USER_KEY, data.user.id);
        return data.user;
      }

      return null;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      await supabase.auth.signOut();
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  async getCurrentUserId(): Promise<string | null> {
    try {
      const userId = await SecureStore.getItemAsync(USER_KEY);
      return userId;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
};
