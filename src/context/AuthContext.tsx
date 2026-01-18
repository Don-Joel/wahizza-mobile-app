import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, UserData } from '../services/auth';
import { User } from '../types';
import { loyaltyService } from '../services/loyalty';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phone: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userId = await authService.getCurrentUserId();
      if (userId) {
        const userData = await loyaltyService.getUser(userId);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    await authService.signInWithEmail(email, password);
    await loadUser();
  };

  const signInWithPhone = async (phone: string) => {
    await authService.signInWithPhone(phone);
    await loadUser();
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in - creates a demo user
    const mockUserData = await authService.signInWithEmail('demo@wahizza.com', 'demo');
    if (mockUserData) {
      const userData = await loyaltyService.getUser(mockUserData.id);
      setUser(userData);
    }
  };

  const signUp = async (email: string, password: string, phone?: string) => {
    await authService.signUp(email, password, phone);
    await loadUser();
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signInWithPhone,
        signInWithGoogle,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
