import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          pizza_points: number;
          total_spent: number;
          created_at: string;
        };
      };
      loyalty_transactions: {
        Row: {
          id: string;
          user_id: string;
          points: number;
          type: 'earned' | 'redeemed';
          order_id: string | null;
          description: string;
          created_at: string;
        };
      };
    };
  };
}
