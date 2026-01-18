import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    title: 'Chimi Pizza',
    size: 'Large (14")',
    price: 26.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
  },
  {
    id: '2',
    title: 'Jamaican Pizza',
    size: 'Medium (12")',
    price: 23.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setCheckoutModalVisible(true);
  };

  const handleGuestCheckout = () => {
    setCheckoutModalVisible(false);
    Alert.alert('Guest Checkout', 'Proceeding with guest checkout!');
  };

  const handleLoginForCheckout = async () => {
    setCheckoutModalVisible(false);
    await signInWithGoogle();
    Alert.alert('Logged In', 'You are now logged in. Proceeding to checkout!');
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>YOUR CART</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#333333" />
          <Text style={styles.emptyTitle}>YOUR CART IS EMPTY</Text>
          <Text style={styles.emptySubtitle}>ADD SOME DELICIOUS ITEMS TO GET STARTED</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.push('/(tabs)/menu')}
          >
            <Text style={styles.browseBtnText}>BROWSE MENU</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YOUR CART</Text>
        <Text style={styles.headerSubtitle}>{cartItems.length} ITEMS</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSize}>{item.size}</Text>
              <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Ionicons name="remove" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>SUBTOTAL</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>TAX (8%)</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>CHECKOUT</Text>
          <Text style={styles.checkoutPrice}>${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      {/* Checkout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCheckoutModalVisible}
        onRequestClose={() => setCheckoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setCheckoutModalVisible(false)}>
              <Ionicons name="close" size={24} color="#888888" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>ALMOST THERE!</Text>
            <Text style={styles.modalSubtitle}>SIGN IN TO EARN REWARDS OR CONTINUE AS GUEST.</Text>

            {!user ? (
              <>
                <TouchableOpacity style={styles.modalSignInBtn} onPress={handleLoginForCheckout}>
                  <Ionicons name="logo-google" size={20} color="#FFFFFF" style={styles.googleIcon} />
                  <Text style={styles.modalSignInBtnText}>SIGN IN WITH GOOGLE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalGuestBtn} onPress={handleGuestCheckout}>
                  <Text style={styles.modalGuestBtnText}>CONTINUE AS GUEST</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.loggedInMessage}>
                <Ionicons name="checkmark-circle" size={32} color="#C9A227" />
                <Text style={styles.loggedInText}>YOU ARE LOGGED IN AS {user.email?.toUpperCase().split('@')[0] || 'USER'}</Text>
                <TouchableOpacity style={styles.modalSignInBtn} onPress={() => Alert.alert('Proceeding', 'Proceeding to payment!')}>
                  <Text style={styles.modalSignInBtnText}>PROCEED TO PAYMENT</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemSize: {
    fontSize: 13,
    color: '#888888',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#C9A227',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#888888',
  },
  summaryValue: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#C9A227',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#111111',
  },
  checkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9B2335',
    borderRadius: 16,
    padding: 18,
  },
  checkoutBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  checkoutPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 1,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    marginTop: 8,
  },
  browseBtn: {
    marginTop: 24,
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C9A227',
  },
  browseBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C9A227',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#111111',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 1,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 30,
  },
  modalSignInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9B2335',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 10,
  },
  modalSignInBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  modalGuestBtn: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9A227',
  },
  modalGuestBtnText: {
    color: '#C9A227',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  loggedInMessage: {
    alignItems: 'center',
    marginTop: 20,
  },
  loggedInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});
