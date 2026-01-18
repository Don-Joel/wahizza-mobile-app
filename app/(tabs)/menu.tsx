import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const menuData = {
  Pizza: [
    { id: '1', title: 'Chimi Pizza', price: '18.99', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', description: 'Dominican spices blend' },
    { id: '2', title: 'Jamaican Pizza', price: '19.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', description: 'Jerk seasoning' },
    { id: '3', title: 'Margherita', price: '16.99', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', description: 'Classic Italian' },
    { id: '4', title: 'Pepperoni', price: '17.99', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', description: 'Classic favorite' },
  ],
  Pasta: [
    { id: '5', title: 'Chicken Parm', price: '22.99', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400', description: 'Breaded chicken' },
    { id: '6', title: 'Shrimp Scampi', price: '24.99', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', description: 'Garlic butter' },
  ],
  Appetizers: [
    { id: '7', title: 'Fried Calamari', price: '15.88', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', description: 'Crispy rings' },
    { id: '8', title: 'Chicken Fingers', price: '13.88', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', description: 'With fries' },
  ],
  Salads: [
    { id: '9', title: 'Caesar Salad', price: '10.88', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', description: 'Romaine, croutons' },
    { id: '10', title: 'Wahizza Salad', price: '12.88', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', description: 'House special' },
  ],
};

export default function MenuScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/wahizza-banner-logo.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>OUR MENU</Text>
        <Text style={styles.headerSubtitle}>FRESH INGREDIENTS, BOLD FLAVORS</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="SEARCH MENU..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(menuData).map(([category, items]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsScroll}
            >
              {items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuCard}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <Image source={{ uri: item.image }} style={styles.menuImage} />
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.menuDesc} numberOfLines={1}>{item.description}</Text>
                    <Text style={styles.menuPrice}>${item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  headerLogo: {
    width: 120,
    height: 43,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
    letterSpacing: 1,
  },
  itemsScroll: {
    paddingHorizontal: 20,
  },
  menuCard: {
    width: 180,
    backgroundColor: '#111111',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  menuImage: {
    width: '100%',
    height: 120,
  },
  menuContent: {
    padding: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C9A227',
  },
});
