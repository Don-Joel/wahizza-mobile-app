import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

const { width } = Dimensions.get('window');

// Mock data
const categories = ['All', 'Pizza', 'Pasta', 'Appetizers', 'Salads', 'Drinks'];

const products = [
  {
    id: '1',
    title: 'Chimi Pizza',
    description: 'Our signature pizza with a perfect blend of Dominican spices',
    price: '18.99',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    category: 'Pizza',
    popular: true,
  },
  {
    id: '2',
    title: 'Jamaican Pizza',
    description: 'Caribbean-inspired with jerk seasoning and tropical flavors',
    price: '19.99',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    category: 'Pizza',
    popular: true,
  },
  {
    id: '3',
    title: 'Margherita Pizza',
    description: 'Classic tomato, fresh mozzarella, and basil',
    price: '16.99',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    category: 'Pizza',
    popular: false,
  },
  {
    id: '4',
    title: 'Chicken Parmigiana',
    description: 'Breaded chicken with marinara and melted mozzarella',
    price: '22.99',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400',
    category: 'Pasta',
    popular: true,
  },
  {
    id: '5',
    title: 'Shrimp Scampi',
    description: 'Garlic butter shrimp over linguine',
    price: '24.99',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400',
    category: 'Pasta',
    popular: false,
  },
  {
    id: '6',
    title: 'Fried Calamari',
    description: 'Crispy calamari with marinara sauce',
    price: '15.88',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
    category: 'Appetizers',
    popular: false,
  },
  {
    id: '7',
    title: 'Caesar Salad',
    description: 'Romaine, croutons, parmesan, caesar dressing',
    price: '10.88',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    category: 'Salads',
    popular: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = products.filter(p => p.popular);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header - Clean with banner logo */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/wahizza-banner-logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)', '#000000']}
            locations={[0, 0.3, 0.7, 1]}
            style={styles.heroGradient}
          />

          <View style={styles.heroContent}>
            <Text style={styles.heroTagline}>HOME OF THE</Text>
            <Text style={styles.heroTitle}>CHIMI PIZZA</Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.orderButton} onPress={() => router.push('/(tabs)/cart')}>
                <Text style={styles.orderButtonText}>ORDER NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/(tabs)/menu')}>
                <Text style={styles.menuButtonText}>MENU</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Rewards Card */}
        {user && (
          <View style={styles.rewardsContainer}>
            <LinearGradient
              colors={['#111111', '#000000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.rewardsCard}
            >
              <View style={styles.rewardsContent}>
                <View>
                  <Text style={styles.rewardsLabel}>PIZZA POINTS</Text>
                  <Text style={styles.rewardsPoints}>{user.pizzaPoints.toLocaleString()}</Text>
                </View>
                <View style={styles.rewardsIcon}>
                  <Ionicons name="trophy" size={36} color="#C9A227" />
                </View>
              </View>
              <View style={styles.rewardsFooter}>
                <View>
                  <Text style={styles.rewardsSubLabel}>TOTAL SPENT</Text>
                  <Text style={styles.rewardsSubValue}>${user.totalSpent.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.rewardsBtn} onPress={() => router.push('/(tabs)/rewards')}>
                  <Text style={styles.rewardsBtnText}>VIEW REWARDS</Text>
                  <Ionicons name="arrow-forward" size={16} color="#C9A227" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CATEGORIES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryBtn,
                  selectedCategory === category && styles.categoryBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Section */}
        {selectedCategory === 'All' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>FEATURED</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
                <Text style={styles.seeAll}>SEE ALL</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
            >
              {featuredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.featuredCard}
                  onPress={() => router.push(`/product/${product.id}`)}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={styles.featuredImage}
                  />
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {product.title}
                    </Text>
                    <Text style={styles.featuredDesc} numberOfLines={2}>
                      {product.description}
                    </Text>
                    <Text style={styles.featuredPrice}>
                      FROM ${product.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Menu Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'OUR MENU' : selectedCategory.toUpperCase()}
          </Text>
          <View style={styles.menuGrid}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.menuCard}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.menuImage}
                />
                {product.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>POPULAR</Text>
                  </View>
                )}
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle} numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text style={styles.menuDesc} numberOfLines={2}>
                    {product.description}
                  </Text>
                  <View style={styles.menuFooter}>
                    <Text style={styles.menuPrice}>${product.price}</Text>
                    <TouchableOpacity style={styles.addBtn}>
                      <Ionicons name="add" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 20,
    backgroundColor: '#000000',
  },
  headerLogo: {
    width: 140,
    height: 50,
    marginLeft: -20,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heroSection: {
    height: 320,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTagline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C9A227',
    letterSpacing: 3,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  orderButton: {
    backgroundColor: '#9B2335',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 8,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  menuButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C9A227',
  },
  menuButtonText: {
    color: '#C9A227',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  rewardsContainer: {
    paddingHorizontal: 20,
    marginTop: -70,
    marginBottom: 20,
  },
  rewardsCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  rewardsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardsLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    letterSpacing: 1,
  },
  rewardsPoints: {
    fontSize: 42,
    fontWeight: '800',
    color: '#C9A227',
  },
  rewardsIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(201,162,39,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardsSubLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
  },
  rewardsSubValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rewardsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#C9A227',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rewardsBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C9A227',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
    letterSpacing: 1,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C9A227',
    letterSpacing: 0.5,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#111111',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#111111',
  },
  categoryBtnActive: {
    backgroundColor: 'rgba(201,162,39,0.1)',
    borderColor: '#C9A227',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
    letterSpacing: 0.5,
  },
  categoryTextActive: {
    color: '#C9A227',
  },
  featuredScroll: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: width * 0.7,
    backgroundColor: '#111111',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  featuredDesc: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 10,
    lineHeight: 18,
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#C9A227',
  },
  menuGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  menuCard: {
    width: (width - 56) / 2,
    backgroundColor: '#111111',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuImage: {
    width: '100%',
    height: 120,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#C9A227',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
    textTransform: 'uppercase',
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
    marginBottom: 10,
    lineHeight: 16,
  },
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C9A227',
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9B2335',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
