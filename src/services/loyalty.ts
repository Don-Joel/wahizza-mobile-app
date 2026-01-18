import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoyaltyTransaction } from '../types';

const POINTS_KEY = (userId: string) => `wahizza_points_${userId}`;
const TRANSACTIONS_KEY = (userId: string) => `wahizza_transactions_${userId}`;
const USER_DATA_KEY = (userId: string) => `wahizza_user_${userId}`;

export const loyaltyService = {
  async getUserPoints(userId: string): Promise<number> {
    try {
      const pointsStr = await AsyncStorage.getItem(POINTS_KEY(userId));
      return pointsStr ? parseInt(pointsStr, 10) : 0;
    } catch (error) {
      console.error('Error fetching user points:', error);
      return 0;
    }
  },

  async getUser(userId: string): Promise<User | null> {
    try {
      const userDataStr = await AsyncStorage.getItem(USER_DATA_KEY(userId));
      if (userDataStr) {
        const data = JSON.parse(userDataStr);
        return {
          id: data.id || userId,
          email: data.email || null,
          phone: data.phone || null,
          pizzaPoints: data.pizzaPoints || 0,
          totalSpent: data.totalSpent || 0,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        };
      }
      
      // Return default user if not found
      const points = await this.getUserPoints(userId);
      return {
        id: userId,
        email: null,
        phone: null,
        pizzaPoints: points,
        totalSpent: 0,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  async earnPoints(userId: string, amount: number, orderId?: string): Promise<void> {
    try {
      const points = Math.floor(amount); // 1 point per $1
      const currentPoints = await this.getUserPoints(userId);
      const newPoints = currentPoints + points;

      await AsyncStorage.setItem(POINTS_KEY(userId), newPoints.toString());

      // Update total spent
      const userDataStr = await AsyncStorage.getItem(USER_DATA_KEY(userId));
      const userData = userDataStr ? JSON.parse(userDataStr) : { totalSpent: 0 };
      userData.totalSpent = (userData.totalSpent || 0) + amount;
      userData.pizzaPoints = newPoints;
      await AsyncStorage.setItem(USER_DATA_KEY(userId), JSON.stringify(userData));

      // Add transaction
      const transactionsStr = await AsyncStorage.getItem(TRANSACTIONS_KEY(userId));
      const transactions: LoyaltyTransaction[] = transactionsStr ? JSON.parse(transactionsStr) : [];
      transactions.unshift({
        id: `tx_${Date.now()}`,
        userId,
        points,
        type: 'earned',
        orderId: orderId || undefined,
        description: `Earned ${points} points from $${amount.toFixed(2)} purchase`,
        createdAt: new Date(),
      });
      await AsyncStorage.setItem(TRANSACTIONS_KEY(userId), JSON.stringify(transactions));
    } catch (error) {
      console.error('Error earning points:', error);
    }
  },

  async getTransactionHistory(userId: string): Promise<LoyaltyTransaction[]> {
    try {
      const transactionsStr = await AsyncStorage.getItem(TRANSACTIONS_KEY(userId));
      if (transactionsStr) {
        const transactions = JSON.parse(transactionsStr);
        return transactions.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  },
};
