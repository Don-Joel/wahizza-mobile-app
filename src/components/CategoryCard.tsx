import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-4 w-32 rounded-2xl bg-dark-lighter overflow-hidden"
      activeOpacity={0.8}
    >
      {category.imageURL ? (
        <Image
          source={{ uri: category.imageURL }}
          className="w-full h-24"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-24 bg-primary/20" />
      )}
      <View className="p-3">
        <Text className="text-white font-semibold text-center" numberOfLines={1}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
