import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

const rewards = [
  { id: '1', title: 'FREE SLICE', points: 100, description: 'GET A FREE SLICE OF ANY PIZZA' },
  { id: '2', title: '$5 OFF', points: 250, description: '$5 OFF YOUR NEXT ORDER' },
  { id: '3', title: 'FREE PIZZA', points: 500, description: 'ANY MEDIUM PIZZA FREE' },
  { id: '4', title: '$20 OFF', points: 1000, description: '$20 OFF ORDERS OVER $40' },
];

const history = [
  { id: '1', type: 'earned', points: 75, description: 'ORDER #WH-2024-001', date: 'JAN 15' },
  { id: '2', type: 'earned', points: 46, description: 'ORDER #WH-2024-002', date: 'JAN 12' },
  { id: '3', type: 'redeemed', points: -100, description: 'FREE SLICE REWARD', date: 'JAN 10' },
  { id: '4', type: 'earned', points: 63, description: 'ORDER #WH-2024-003', date: 'JAN 8' },
];

export default function RewardsScreen() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();
  const currentPoints = 1250;
  const totalSpent = 1250;

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>REWARDS</Text>
          <Text style={styles.headerSubtitle}>EARN POINTS WITH EVERY ORDER</Text>
        </View>
        <View style={styles.unauthenticatedContainer}>
          <Image
            source={require('../../assets/wahizza-logo.png')}
            style={styles.unauthLogo}
          />
          <Text style={styles.unauthTitle}>SIGN IN TO EARN PIZZA POINTS!</Text>
          <Text style={styles.unauthSubtitle}>
            TRACK YOUR ORDERS, REDEEM EXCLUSIVE REWARDS, AND GET SPECIAL OFFERS.
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={signInWithGoogle}>
            <Ionicons name="logo-google" size={20} color="#FFFFFF" style={styles.googleIcon} />
            <Text style={styles.signInButtonText}>SIGN IN WITH GOOGLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>BACK TO HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YOUR REWARDS</Text>
        <Text style={styles.headerSubtitle}>WELCOME, {user.email?.toUpperCase().split('@')[0] || 'GUEST'}!</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Points Summary */}
        <View style={styles.pointsSummaryCard}>
          <View style={styles.pointsCircle}>
            <Text style={styles.pointsValue}>{currentPoints.toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>PIZZA POINTS</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${totalSpent}</Text>
              <Text style={styles.statLabel}>TOTAL SPENT</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1PT/$1</Text>
              <Text style={styles.statLabel}>EARN RATE</Text>
            </View>
          </View>
        </View>

        {/* Available Rewards */}
        <Text style={styles.sectionTitle}>AVAILABLE REWARDS</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rewardsScroll}
        >
          {rewards.map((reward) => {
            const canRedeem = currentPoints >= reward.points;
            return (
              <View key={reward.id} style={styles.rewardCard}>
                <View style={styles.rewardIcon}>
                  <Ionicons name="gift" size={28} color="#C9A227" />
                </View>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDesc}>{reward.description}</Text>
                <Text style={styles.rewardPoints}>{reward.points} PTS</Text>
                <TouchableOpacity
                  style={[styles.redeemBtn, !canRedeem && styles.redeemBtnDisabled]}
                  disabled={!canRedeem}
                >
                  <Text style={[styles.redeemBtnText, !canRedeem && styles.redeemBtnTextDisabled]}>
                    {canRedeem ? 'REDEEM' : 'NEED MORE PTS'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Points History */}
        <Text style={styles.sectionTitle}>POINTS HISTORY</Text>
        <View style={styles.historyCard}>
          {history.map((item, index) => (
            <View
              key={item.id}
              style={[styles.historyItem, index < history.length - 1 && styles.historyItemBorder]}
            >
              <View style={styles.historyLeft}>
                <View style={[
                  styles.historyIcon,
                  { backgroundColor: item.type === 'earned' ? 'rgba(76,175,80,0.2)' : 'rgba(235,66,33,0.2)' }
                ]}>
                  <Ionicons
                    name={item.type === 'earned' ? 'arrow-up' : 'arrow-down'}
                    size={16}
                    color={item.type === 'earned' ? '#4CAF50' : '#9B2335'}
                  />
                </View>
                <View>
                  <Text style={styles.historyDesc}>{item.description}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
              </View>
              <Text style={[
                styles.historyPoints,
                { color: item.type === 'earned' ? '#4CAF50' : '#9B2335' }
              ]}>
                {item.points > 0 ? '+' : ''}{item.points}
              </Text>
            </View>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutButtonText}>SIGN OUT</Text>
        </TouchableOpacity>

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
  },
  pointsSummaryCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  pointsCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(201,162,39,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#C9A227',
  },
  pointsValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#C9A227',
  },
  pointsLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    letterSpacing: 1,
  },
  rewardsScroll: {
    paddingHorizontal: 20,
  },
  rewardCard: {
    width: 160,
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  rewardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(201,162,39,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  rewardDesc: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 8,
  },
  rewardPoints: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C9A227',
    marginBottom: 12,
  },
  redeemBtn: {
    width: '100%',
    backgroundColor: '#C9A227',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemBtnDisabled: {
    backgroundColor: '#333333',
  },
  redeemBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  redeemBtnTextDisabled: {
    color: '#666666',
  },
  historyCard: {
    backgroundColor: '#111111',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyDesc: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historyDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: '700',
  },
  signOutButton: {
    backgroundColor: '#333333',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666666',
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  unauthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  unauthLogo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  unauthTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  unauthSubtitle: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 30,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9B2335',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 10,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: '#111111',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
