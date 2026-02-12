import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import buyerPricesApi, { BuyerPricesGroup } from '../services/buyerPricesApi';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

// Professional Buyer Card Component
const BuyerCard = ({ item, index, onCall, t }: { 
  item: BuyerPricesGroup; 
  index: number;
  onCall: (phone: string) => void;
  t: any;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const highestPrice = Math.max(...item.prices.map(p => parseFloat(p.price)));

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.buyerMainInfo}>
          <View style={styles.buyerInitials}>
            <Text style={styles.initialsText}>
              {item.buyer_name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.buyerTextInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.buyerName} numberOfLines={1}>
                {item.buyer_name}
              </Text>
              {item.buyer_verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#059669" />
                </View>
              )}
            </View>
            {item.buyer_company && (
              <Text style={styles.buyerCompany} numberOfLines={1}>
                {item.buyer_company}
              </Text>
            )}
            {item.buyer_city && (
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text style={styles.locationText}>{item.buyer_city}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Prices Section */}
      <View style={styles.pricesSection}>
        <Text style={styles.sectionLabel}>{t.buyersScreen.currentPrices}</Text>
        <View style={styles.pricesGrid}>
          {item.prices.map((price, idx) => {
            const isHighest = parseFloat(price.price) === highestPrice && item.prices.length > 1;
            return (
              <View
                key={idx}
                style={[styles.priceCard, isHighest && styles.priceCardHighest]}
              >
                <View style={styles.priceCardHeader}>
                  <Text style={[styles.gradeText, isHighest && styles.gradeTextHighest]}>
                    {price.grade_display}
                  </Text>
                  {isHighest && (
                    <View style={styles.highestTag}>
                      <Text style={styles.highestTagText}>{t.buyersScreen.best}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.priceRow}>
                  <Text style={[styles.currency, isHighest && styles.currencyHighest]}>
                    {t.buyersScreen.lkr}
                  </Text>
                  <Text style={[styles.priceAmount, isHighest && styles.priceAmountHighest]}>
                    {parseFloat(price.price).toFixed(2)}
                  </Text>
                </View>
                <Text style={[styles.perUnit, isHighest && styles.perUnitHighest]}>
                  {t.buyersScreen.perKg}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Notes Section */}
      {item.notes && (
        <>
          <View style={styles.divider} />
          <View style={styles.notesSection}>
            <View style={styles.notesHeader}>
              <Ionicons name="information-circle-outline" size={16} color="#059669" />
              <Text style={styles.notesLabel}>{t.buyersScreen.additionalInfo}</Text>
            </View>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        </>
      )}

      {/* Contact Button */}
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => onCall(item.buyer_phone ?? '')}
          activeOpacity={0.7}
          disabled={!item.buyer_phone}
        >
          <LinearGradient
            colors={['#059669', '#047857']}
            style={styles.contactButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="call-outline" size={18} color="#fff" />
            <Text style={styles.contactButtonText}>{t.buyersScreen.contactBuyer}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Filter Chip Component
const FilterChip = ({ item, isSelected, onPress }: any) => (
  <TouchableOpacity
    style={[styles.filterChip, isSelected && styles.filterChipActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

export default function BuyersPricesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [buyers, setBuyers] = useState<BuyerPricesGroup[]>([]);
  const [filteredBuyers, setFilteredBuyers] = useState<BuyerPricesGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const GRADE_FILTERS = [
    { id: 'all', label: t.buyersScreen.filterAll },
    { id: 'rss1', label: 'RSS1' },
    { id: 'rss3', label: 'RSS3' },
    { id: 'latex', label: 'Latex' },
    { id: 'tsr20', label: 'TSR20' },
    { id: 'crepe', label: 'Crepe' },
  ];

  const fetchPrices = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await buyerPricesApi.getFarmerViewPrices();
      setBuyers(response.buyers);
      setFilteredBuyers(response.buyers);
    } catch (error: any) {
      Alert.alert(t.buyersScreen.error, error.message || t.buyersScreen.failedToLoadPrices);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrices(false);
  }, []);

  useEffect(() => {
    let result = buyers;

    if (selectedGrade && selectedGrade !== 'all') {
      result = result.map(buyer => ({
        ...buyer,
        prices: buyer.prices.filter(p => p.grade === selectedGrade),
      })).filter(buyer => buyer.prices.length > 0);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(buyer =>
        buyer.buyer_name.toLowerCase().includes(query) ||
        buyer.buyer_company?.toLowerCase().includes(query) ||
        buyer.buyer_city?.toLowerCase().includes(query)
      );
    }

    setFilteredBuyers(result);
  }, [searchQuery, selectedGrade, buyers]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleCall = (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      Alert.alert(t.buyersScreen.error, t.buyersScreen.noPhoneAvailable);
      return;
    }
    const phone = phoneNumber.replace(/\s/g, '');
    const url = Platform.OS === 'ios' ? `telprompt:${phone}` : `tel:${phone}`;
    Linking.openURL(url).catch((err) => {
      console.error('Error:', err);
      Alert.alert(t.buyersScreen.error, t.buyersScreen.callError);
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/diagnose')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#065F46" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{t.buyersScreen.headerTitle}</Text>
          <Text style={styles.headerSubtitle}>{t.buyersScreen.headerSubtitle}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#059669" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t.buyersScreen.searchPlaceholder}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={GRADE_FILTERS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FilterChip
            item={item}
            isSelected={selectedGrade === item.id || (!selectedGrade && item.id === 'all')}
            onPress={() => setSelectedGrade(item.id === 'all' ? null : item.id)}
          />
        )}
        contentContainerStyle={styles.filtersContainer}
      />

      {/* Stats */}
      <LinearGradient
        colors={['#059669', '#047857']}
        style={styles.statsContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{filteredBuyers.length}</Text>
          <Text style={styles.statLabel}>{t.buyersScreen.buyers}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {filteredBuyers.reduce((sum, b) => sum + b.prices.length, 0)}
          </Text>
          <Text style={styles.statLabel}>{t.buyersScreen.listings}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {filteredBuyers.filter(b => b.buyer_verified).length}
          </Text>
          <Text style={styles.statLabel}>{t.buyersScreen.verified}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="file-tray-outline" size={48} color="#D1FAE5" />
      </View>
      <Text style={styles.emptyTitle}>{t.buyersScreen.noPricesAvailable}</Text>
      <Text style={styles.emptyText}>
        {searchQuery || selectedGrade
          ? t.buyersScreen.tryAdjustingFilters
          : t.buyersScreen.noBuyersPosted}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" translucent />
        <View style={[styles.loadingContainer, { paddingTop: insets.top + 16 }]}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={styles.loadingText}>{t.buyersScreen.loadingPrices}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" translucent />
      <FlatList
        data={filteredBuyers}
        keyExtractor={item => item.buyer_id.toString()}
        renderItem={({ item, index }) => (
          <BuyerCard item={item} index={index} onCall={handleCall} t={t} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#059669']}
            tintColor="#059669"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: '#059669',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 24,
  },

  // Header Styles
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065F46',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#065F46',
  },
  clearButton: {
    padding: 4,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  filterChipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },

  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
  },
  buyerMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyerInitials: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  buyerTextInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  buyerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#065F46',
    marginRight: 6,
  },
  verifiedBadge: {
    marginLeft: 2,
  },
  buyerCompany: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECFDF5',
  },

  // Prices Section
  pricesSection: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  pricesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  priceCard: {
    width: (CARD_WIDTH - 48) / 2,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  priceCardHighest: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  priceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gradeTextHighest: {
    color: '#D1FAE5',
  },
  highestTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  highestTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  currency: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginRight: 4,
  },
  currencyHighest: {
    color: '#D1FAE5',
  },
  priceAmount: {
    fontSize: 26,
    fontWeight: '700',
    color: '#065F46',
    letterSpacing: -0.5,
  },
  priceAmountHighest: {
    color: '#FFFFFF',
  },
  perUnit: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  perUnitHighest: {
    color: '#D1FAE5',
  },

  // Notes Section
  notesSection: {
    padding: 16,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Card Footer
  cardFooter: {
    padding: 16,
    paddingTop: 12,
  },
  contactButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});
