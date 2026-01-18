import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'wahizza_user_id';
const USER_DATA_KEY = 'wahizza_user_data';

export interface UserData {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
}

export const authService = {
  async signInWithEmail(email: string, password: string) {
    // Mock authentication - in a real app, this would call an API
    const userData: UserData = {
      id: `user_${Date.now()}`,
      email,
    };
    await AsyncStorage.setItem(USER_KEY, userData.id);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return userData;
  },

  async signInWithPhone(phone: string) {
    // Mock authentication
    const userData: UserData = {
      id: `user_${Date.now()}`,
      phone,
    };
    await AsyncStorage.setItem(USER_KEY, userData.id);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return userData;
  },

  async verifyPhoneOTP(phone: string, token: string) {
    // Mock OTP verification
    const userData: UserData = {
      id: `user_${Date.now()}`,
      phone,
    };
    await AsyncStorage.setItem(USER_KEY, userData.id);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return userData;
  },

  async signUp(email: string, password: string, phone?: string) {
    // Mock signup
    const userData: UserData = {
      id: `user_${Date.now()}`,
      email,
      phone,
    };
    await AsyncStorage.setItem(USER_KEY, userData.id);
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return userData;
  },

  async signOut() {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
  },

  async getCurrentUserId(): Promise<string | null> {
    try {
      const userId = await AsyncStorage.getItem(USER_KEY);
      return userId;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async getCurrentUser(): Promise<UserData | null> {
    try {
      const userDataStr = await AsyncStorage.getItem(USER_DATA_KEY);
      if (userDataStr) {
        return JSON.parse(userDataStr);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
};
