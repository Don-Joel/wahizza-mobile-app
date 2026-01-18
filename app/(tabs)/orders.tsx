import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const mockOrders = [
  {
    id: '1',
    date: '2024-01-15',
    total: 45.98,
    items: [
      { name: 'Chimi Pizza (Large)', qty: 1 },
      { name: 'Coca-Cola', qty: 2 },
    ],
    status: 'Delivered',
  },
  {
    id: '2',
    date: '2024-01-10',
    total: 22.50,
    items: [
      { name: 'Jamaican Pizza (Medium)', qty: 1 },
    ],
    status: 'Delivered',
  },
  {
    id: '3',
    date: '2024-01-05',
    total: 60.00,
    items: [
      { name: 'Chicken Parmigiana', qty: 2 },
      { name: 'Caesar Salad', qty: 1 },
    ],
    status: 'Cancelled',
  },
];

export default function OrdersScreen() {
  const renderOrderItem = ({ item }: { item: typeof mockOrders[0] }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>ORDER #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      <View style={styles.itemsList}>
        {item.items.map((foodItem, index) => (
          <Text key={index} style={styles.itemText}>
            {foodItem.qty}x {foodItem.name}
          </Text>
        ))}
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>TOTAL: ${item.total.toFixed(2)}</Text>
        <View style={[styles.statusBadge, styles[`status${item.status}`]]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.reorderButton}>
        <Text style={styles.reorderButtonText}>REORDER</Text>
        <Ionicons name="refresh" size={16} color="#C9A227" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YOUR ORDERS</Text>
        <Text style={styles.headerSubtitle}>TRACK YOUR DELICIOUS HISTORY</Text>
      </View>

      <FlatList
        data={mockOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
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
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  orderCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  orderDate: {
    fontSize: 14,
    color: '#888888',
  },
  itemsList: {
    marginBottom: 15,
  },
  itemText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 15,
    marginTop: 10,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C9A227',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: 'rgba(76,175,80,0.2)',
  },
  statusCancelled: {
    backgroundColor: 'rgba(235,66,33,0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C9A227',
    gap: 8,
  },
  reorderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C9A227',
    letterSpacing: 1,
  },
});
