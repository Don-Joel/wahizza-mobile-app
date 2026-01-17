import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme/colors';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const itemPrice = parseFloat(item.variant.price) * item.quantity;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.product.imageURL || '' }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.title}>{item.product.title}</Text>
            <Text style={styles.variant}>{item.variant.title}</Text>
            {item.customizations?.toppings && item.customizations.toppings.length > 0 && (
              <Text style={styles.toppings} numberOfLines={1}>
                {item.customizations.toppings.join(', ')}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
              style={[styles.quantityButton, item.quantity === 1 && styles.quantityButtonDisabled]}
              disabled={item.quantity === 1}
            >
              <Ionicons
                name="remove-circle"
                size={24}
                color={item.quantity === 1 ? colors.textLight : colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${itemPrice.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: 2,
  },
  variant: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  toppings: {
    ...typography.small,
    color: colors.textLight,
    marginTop: 2,
  },
  removeButton: {
    padding: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: spacing.xs,
  },
  quantityButtonDisabled: {
    opacity: 0.3,
  },
  quantity: {
    ...typography.bodyBold,
    color: colors.text,
    marginHorizontal: spacing.sm,
    minWidth: 30,
    textAlign: 'center',
  },
  price: {
    ...typography.h3,
    color: colors.primary,
  },
});
