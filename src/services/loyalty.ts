import { supabase } from '../config/supabase';
import { User, LoyaltyTransaction } from '../types';

export const loyaltyService = {
  async getUserPoints(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('pizza_points')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data?.pizza_points || 0;
    } catch (error) {
      console.error('Error fetching user points:', error);
      return 0;
    }
  },

  async getUser(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      return data ? {
        id: data.id,
        email: data.email,
        phone: data.phone,
        pizzaPoints: data.pizza_points,
        totalSpent: data.total_spent,
        createdAt: new Date(data.created_at),
      } : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  async earnPoints(userId: string, amount: number, orderId?: string): Promise<void> {
    try {
      const points = Math.floor(amount); // 1 point per $1

      // Update user points
      const { error: updateError } = await supabase.rpc('increment_points', {
        user_id: userId,
        points_to_add: points,
        amount_to_add: amount,
      });

      if (updateError) throw updateError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('loyalty_transactions')
        .insert({
          user_id: userId,
          points,
          type: 'earned',
          order_id: orderId,
          description: `Earned ${points} points from $${amount.toFixed(2)} purchase`,
        });

      if (transactionError) throw transactionError;
    } catch (error) {
      console.error('Error earning points:', error);
      throw error;
    }
  },

  async getTransactionHistory(userId: string): Promise<LoyaltyTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      return data?.map((t: any) => ({
        id: t.id,
        userId: t.user_id,
        points: t.points,
        type: t.type,
        orderId: t.order_id,
        description: t.description,
        createdAt: new Date(t.created_at),
      })) || [];
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  },
};
