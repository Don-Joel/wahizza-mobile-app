import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { mockOrders } from '../../src/data/mockData';
import { Order, OrderStatus } from '../../src/types';
import { colors, spacing, borderRadius, typography } from '../../src/theme/colors';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
    case OrderStatus.CONFIRMED:
      return colors.info;
    case OrderStatus.PREPARING:
      return colors.warning;
    case OrderStatus.READY:
      return colors.success;
    case OrderStatus.COMPLETED:
      return colors.textSecondary;
    case OrderStatus.CANCELLED:
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'time-outline';
    case OrderStatus.CONFIRMED:
      return 'checkmark-circle-outline';
    case OrderStatus.PREPARING:
      return 'restaurant-outline';
    case OrderStatus.READY:
      return 'checkmark-done-circle-outline';
    case OrderStatus.COMPLETED:
      return 'checkmark-circle';
    case OrderStatus.CANCELLED:
      return 'close-circle-outline';
    default:
      return 'help-circle-outline';
  }
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const statusColor = getStatusColor(order.status);
  const statusIcon = getStatusIcon(order.status);

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <Ionicons name={statusIcon as any} size={24} color={statusColor} />
          <View style={styles.orderHeaderText}>
            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            <Text style={styles.orderDate}>
              {order.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.orderDetailRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.orderDetailText}>
            {order.customerInfo.address.street}, {order.customerInfo.address.city}
          </Text>
        </View>
        {order.estimatedDelivery && (
          <View style={styles.orderDetailRow}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.orderDetailText}>
              Est. delivery: {order.estimatedDelivery.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.orderItems}>
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.orderTotal}>${order.totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default function OrdersScreen() {
  const orders = mockOrders;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Order History</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </Text>
      </LinearGradient>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>
            Your order history will appear here
          </Text>
        </View>
      ) : (
        <FlashList
          data={orders}
          renderItem={({ item }) => <OrderCard order={item} />}
          estimatedItemSize={180}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.9,
  },
  list: {
    padding: spacing.md,
  },
  orderCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderHeaderText: {
    marginLeft: spacing.sm,
  },
  orderNumber: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 2,
  },
  orderDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...typography.small,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  orderDetails: {
    marginBottom: spacing.md,
    paddingLeft: 32,
  },
  orderDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  orderDetailText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  orderItems: {
    ...typography.body,
    color: colors.textSecondary,
  },
  orderTotal: {
    ...typography.h3,
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
