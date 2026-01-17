import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCartContext } from '../../src/context/CartContext';
import { mockProducts, availableToppings } from '../../src/data/mockData';
import { CartItem } from '../../src/types';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';
import { Button } from '../../src/components/Button';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCartContext();

  const product = mockProducts.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0] || null
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!product || !selectedVariant) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${selectedVariant.id}-${Date.now()}`,
      product,
      variant: selectedVariant,
      quantity,
      customizations: {
        toppings: selectedToppings.length > 0 ? selectedToppings : undefined,
        specialInstructions: specialInstructions || undefined,
      },
    };

    addItem(cartItem);
    router.back();
  };

  const price = parseFloat(selectedVariant.price);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <Image
            source={{ uri: product.imageURL || '' }}
            style={styles.image}
            contentFit="cover"
          />

          <View style={styles.content}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{product.title}</Text>
                {product.tags?.includes('popular') && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Popular</Text>
                  </View>
                )}
              </View>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>

            <Text style={styles.description}>{product.description}</Text>

            {product.variants.length > 1 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Size</Text>
                <View style={styles.variantGrid}>
                  {product.variants.map((variant) => (
                    <TouchableOpacity
                      key={variant.id}
                      style={[
                        styles.variantButton,
                        selectedVariant.id === variant.id &&
                          styles.variantButtonActive,
                      ]}
                      onPress={() => setSelectedVariant(variant)}
                    >
                      <Text
                        style={[
                          styles.variantText,
                          selectedVariant.id === variant.id &&
                            styles.variantTextActive,
                        ]}
                      >
                        {variant.size || variant.title}
                      </Text>
                      <Text
                        style={[
                          styles.variantPrice,
                          selectedVariant.id === variant.id &&
                            styles.variantPriceActive,
                        ]}
                      >
                        ${parseFloat(variant.price).toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {product.category === 'Pizza' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Toppings</Text>
                <View style={styles.toppingsGrid}>
                  {availableToppings.map((topping) => (
                    <TouchableOpacity
                      key={topping}
                      style={[
                        styles.toppingButton,
                        selectedToppings.includes(topping) &&
                          styles.toppingButtonActive,
                      ]}
                      onPress={() => toggleTopping(topping)}
                    >
                      <Ionicons
                        name={
                          selectedToppings.includes(topping)
                            ? 'checkmark-circle'
                            : 'ellipse-outline'
                        }
                        size={20}
                        color={
                          selectedToppings.includes(topping)
                            ? colors.primary
                            : colors.textSecondary
                        }
                      />
                      <Text
                        style={[
                          styles.toppingText,
                          selectedToppings.includes(topping) &&
                            styles.toppingTextActive,
                        ]}
                      >
                        {topping}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    quantity === 1 && styles.quantityButtonDisabled,
                  ]}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  <Ionicons
                    name="remove-circle"
                    size={32}
                    color={quantity === 1 ? colors.textLight : colors.primary}
                  />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Ionicons name="add-circle" size={32} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View>
              <Text style={styles.footerLabel}>Total</Text>
              <Text style={styles.footerPrice}>
                ${(price * quantity).toFixed(2)}
              </Text>
            </View>
            <Button
              title="Add to Cart"
              onPress={handleAddToCart}
              size="large"
              style={styles.addButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: spacing.md,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.md,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  badgeText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
  },
  price: {
    ...typography.h2,
    color: colors.primary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  variantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  variantButton: {
    flex: 1,
    minWidth: '30%',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  variantButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20',
  },
  variantText: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: 4,
  },
  variantTextActive: {
    color: colors.primary,
  },
  variantPrice: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  variantPriceActive: {
    color: colors.primary,
  },
  toppingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  toppingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
  },
  toppingButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20',
  },
  toppingText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  toppingTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    padding: spacing.xs,
  },
  quantityButtonDisabled: {
    opacity: 0.3,
  },
  quantity: {
    ...typography.h2,
    color: colors.text,
    marginHorizontal: spacing.lg,
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footerPrice: {
    ...typography.h2,
    color: colors.primary,
  },
  addButton: {
    flex: 1,
    marginLeft: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
