import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { User } from '../types';

interface RewardsCardProps {
  user: User;
}

export const RewardsCard: React.FC<RewardsCardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/(tabs)/rewards')}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#EB4221', '#FF8C00']}
        className="rounded-3xl p-6 shadow-lg"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-sm font-semibold opacity-90 mb-1">
              Pizza Points
            </Text>
            <Text className="text-white text-4xl font-bold">
              {user.pizzaPoints.toLocaleString()}
            </Text>
          </View>
          <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="trophy" size={32} color="#FFFFFF" />
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-xs opacity-75">
              Total Spent
            </Text>
            <Text className="text-white text-lg font-semibold">
              ${user.totalSpent.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-white text-sm font-semibold mr-2">
              View Rewards
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
