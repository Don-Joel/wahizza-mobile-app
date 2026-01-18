import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { mockProducts } from '../../src/data/mockData';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found!</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = parseFloat(selectedVariant.price) * quantity;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant.id}-${Date.now()}`,
      product: {
        id: product.id,
        title: product.title,
        imageURL: product.imageURL,
      },
      variant: selectedVariant,
      quantity,
      customizations: {},
    });
    Alert.alert(
      'Added to Cart',
      `${quantity}x ${product.title} (${selectedVariant.title}) added to your cart.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageURL || '' }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Size Selection */}
          {product.variants.length > 1 && (
            <>
              <Text style={styles.sectionTitle}>SELECT SIZE</Text>
              <View style={styles.sizeOptions}>
                {product.variants.map((variant) => (
                  <TouchableOpacity
                    key={variant.id}
                    style={[styles.sizeBtn, selectedVariant.id === variant.id && styles.sizeBtnActive]}
                    onPress={() => setSelectedVariant(variant)}
                  >
                    <Text style={[styles.sizeName, selectedVariant.id === variant.id && styles.sizeNameActive]}>
                      {variant.title}
                    </Text>
                    <Text style={[styles.sizePrice, selectedVariant.id === variant.id && styles.sizePriceActive]}>
                      ${parseFloat(variant.price).toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Quantity */}
          <Text style={styles.sectionTitle}>QUANTITY</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={[styles.qtyBtn, quantity <= 1 && styles.qtyBtnDisabled]}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Ionicons name="remove" size={24} color={quantity <= 1 ? '#333333' : '#FFFFFF'} />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerLabel}>TOTAL</Text>
          <Text style={styles.footerValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: width * 0.8,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: '#000000',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  sizeBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#111111',
  },
  sizeBtnActive: {
    borderColor: '#C9A227',
    backgroundColor: 'rgba(201,162,39,0.1)',
  },
  sizeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sizeNameActive: {
    color: '#C9A227',
  },
  sizePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#888888',
  },
  sizePriceActive: {
    color: '#FFFFFF',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 100,
  },
  qtyBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnDisabled: {
    opacity: 0.5,
  },
  qtyValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    minWidth: 50,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  footerPrice: {},
  footerLabel: {
    fontSize: 12,
    color: '#888888',
  },
  footerValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#C9A227',
  },
  addToCartBtn: {
    backgroundColor: '#9B2335',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});
