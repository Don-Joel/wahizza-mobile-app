import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { shopifyService } from '../../src/services/shopify';
import { CategoryCard } from '../../src/components/CategoryCard';
import { RewardsCard } from '../../src/components/RewardsCard';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: categories = ['Pizza', 'Pasta', 'Wings'] } = useQuery({
    queryKey: ['categories'],
    queryFn: shopifyService.fetchCategories,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => shopifyService.fetchProducts(selectedCategory === 'All' ? undefined : selectedCategory),
  });

  return (
    <View className="flex-1 bg-dark">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={['#1A1A1A', '#2A2A2A']}
          className="pt-16 pb-6 px-6"
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-3xl font-bold">Wahizza</Text>
              <Text className="text-gray-400 text-sm">Order your favorite dishes</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/auth/login')}
              className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center"
            >
              <Ionicons name="person" size={24} color="#EB4221" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Rewards Card */}
        {user && (
          <View className="px-6 mb-6">
            <RewardsCard user={user} />
          </View>
        )}

        {/* Category Menu */}
        <View className="mb-6">
          <Text className="text-white text-xl font-bold px-6 mb-4">Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory('All')}
              className={`mr-3 px-6 py-3 rounded-full ${
                selectedCategory === 'All' 
                  ? 'bg-primary' 
                  : 'bg-dark-lighter'
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedCategory === 'All' 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
              >
                All
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`mr-3 px-6 py-3 rounded-full ${
                  selectedCategory === category 
                    ? 'bg-primary' 
                    : 'bg-dark-lighter'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedCategory === category 
                      ? 'text-white' 
                      : 'text-gray-400'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">
              {selectedCategory === 'All' ? 'Featured' : selectedCategory}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
              <Text className="text-primary text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {products.slice(0, 5).map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => router.push(`/product/${product.id}`)}
                className="mr-4 w-64 rounded-2xl bg-dark-lighter overflow-hidden"
              >
                {product.imageURL && (
                  <Image
                    source={{ uri: product.imageURL }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                )}
                <View className="p-4">
                  <Text className="text-white text-lg font-bold mb-1" numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text className="text-gray-400 text-sm mb-2" numberOfLines={2}>
                    {product.description}
                  </Text>
                  <Text className="text-primary text-lg font-bold">
                    From ${product.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
