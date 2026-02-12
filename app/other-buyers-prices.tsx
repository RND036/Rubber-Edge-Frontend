import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, RefreshControl, Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import buyerPricesApi, { FarmerViewResponse, BuyerPricesGroup } from '../services/buyerPricesApi';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function OtherBuyersPricesScreen() {
  const router = useRouter();
  const { user, accessToken } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [otherBuyers, setOtherBuyers] = useState<BuyerPricesGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchOtherBuyers = useCallback(async (isActive: { current: boolean }) => {
    setLoading(true);
    setError('');
    try {
      const response: FarmerViewResponse = await buyerPricesApi.getFarmerViewPrices();
      console.log('🔵 [OtherBuyersPrices] Full API Response:', JSON.stringify(response, null, 2));
      console.log('🔵 [OtherBuyersPrices] buyers_count from API:', response.buyers_count);
      console.log('🔵 [OtherBuyersPrices] Actual buyers array length:', response.buyers?.length);
      
      if (response.success && response.buyers) {
        // Handle both array and paginated response formats
        const buyersArray = Array.isArray(response.buyers) 
          ? response.buyers 
          : (response.buyers as any)?.results || [];
        
        console.log('🔵 [OtherBuyersPrices] Setting buyers:', buyersArray.length);
        if (isActive.current) setOtherBuyers(buyersArray);
      } else {
        if (isActive.current) {
          setOtherBuyers([]);
          setError('No data found.');
        }
      }
    } catch (err: any) {
      console.error('🔴 [OtherBuyersPrices] Error:', err);
      if (isActive.current) setError(err.message || 'Failed to load other buyers prices.');
    } finally {
      if (isActive.current) setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    const isActive = { current: true };
    setRefreshing(true);
    await fetchOtherBuyers(isActive);
    setRefreshing(false);
  }, [fetchOtherBuyers]);

  // Helper function to format date/time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  useFocusEffect(
    useCallback(() => {
      const isActive = { current: true };
      fetchOtherBuyers(isActive);
      return () => { isActive.current = false; };
    }, [fetchOtherBuyers, user?.id, accessToken])
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="people-outline" size={64} color="#cbd5e1" />
      </View>
      <Text style={styles.emptyTitle}>{t.otherBuyersPricesScreen.noBuyersAvailable}</Text>
      <Text style={styles.emptyText}>
        {t.otherBuyersPricesScreen.noBuyersDesc}
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <View style={styles.errorIconContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
      </View>
      <Text style={styles.errorTitle}>{t.otherBuyersPricesScreen.unableToLoad}</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={handleRefresh}
      >
        <Ionicons name="refresh" size={20} color="#fff" />
        <Text style={styles.retryButtonText}>{t.otherBuyersPricesScreen.tryAgain}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" translucent />
      
      {/* Header with Back Button */}
      <View style={[styles.headerContainer, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.header}>{t.otherBuyersPricesScreen.headerTitle}</Text>
          <Text style={styles.subHeader}>{t.otherBuyersPricesScreen.headerSubtitle}</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Bar */}
      {!loading && !error && otherBuyers.length > 0 && (
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={18} color="#1A237E" />
            <Text style={styles.statValue}>{otherBuyers.length}</Text>
            <Text style={styles.statLabel}>{t.otherBuyersPricesScreen.buyers}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="pricetag" size={18} color="#1A237E" />
            <Text style={styles.statValue}>
              {otherBuyers.reduce((sum, buyer) => sum + buyer.prices.length, 0)}
            </Text>
            <Text style={styles.statLabel}>{t.otherBuyersPricesScreen.prices}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="location" size={18} color="#1A237E" />
            <Text style={styles.statValue}>
              {new Set(otherBuyers.map(b => b.buyer_city).filter(Boolean)).size}
            </Text>
            <Text style={styles.statLabel}>{t.otherBuyersPricesScreen.cities}</Text>
          </View>
        </View>
      )}

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingSpinner}>
              <ActivityIndicator size="large" color="#1A237E" />
            </View>
            <Text style={styles.loadingText}>{t.otherBuyersPricesScreen.loadingPrices}</Text>
            <Text style={styles.loadingSubText}>{t.otherBuyersPricesScreen.pleaseWait}</Text>
          </View>
        ) : error ? (
          renderErrorState()
        ) : (
          <FlatList
            data={otherBuyers}
            keyExtractor={item => item.buyer_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.buyerCard}>
                {/* Buyer Header */}
                <View style={styles.buyerHeader}>
                  <View style={styles.buyerAvatarContainer}>
                    <Ionicons name="person" size={26} color="#1A237E" />
                    {item.buyer_verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                      </View>
                    )}
                  </View>
                  <View style={styles.buyerInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.buyerName}>{item.buyer_name}</Text>
                      {item.buyer_verified && (
                        <View style={styles.verifiedTag}>
                          <Ionicons name="shield-checkmark" size={12} color="#10b981" />
                          <Text style={styles.verifiedText}>{t.otherBuyersPricesScreen.verified}</Text>
                        </View>
                      )}
                    </View>
                    {item.buyer_company && (
                      <View style={styles.companyBadge}>
                        <Ionicons name="business" size={12} color="#fff" />
                        <Text style={styles.companyText}>{item.buyer_company}</Text>
                      </View>
                    )}
                    <View style={styles.metaRow}>
                      {item.buyer_city && (
                        <View style={styles.locationContainer}>
                          <Ionicons name="location" size={14} color="#64748b" />
                          <Text style={styles.buyerCity}>{item.buyer_city}</Text>
                        </View>
                      )}
                      {item.buyer_phone && (
                        <View style={styles.phoneContainer}>
                          <Ionicons name="call" size={12} color="#64748b" />
                          <Text style={styles.phoneText}>{item.buyer_phone}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.priceCountBadge}>
                    <Text style={styles.priceCountText}>{item.prices.length}</Text>
                    <Text style={styles.priceCountLabel}>{t.otherBuyersPricesScreen.pricesLabel}</Text>
                  </View>
                </View>

                {/* Last Updated Info */}
                {item.last_updated && (
                  <View style={styles.lastUpdatedContainer}>
                    <Ionicons name="time-outline" size={14} color="#64748b" />
                    <Text style={styles.lastUpdatedText}>
                      {t.otherBuyersPricesScreen.updated}: {formatDateTime(item.last_updated)}
                    </Text>
                  </View>
                )}

                {/* Notes */}
                {item.notes && item.notes.trim() !== '' && (
                  <View style={styles.notesContainer}>
                    <Ionicons name="document-text-outline" size={14} color="#64748b" />
                    <Text style={styles.notesText}>{item.notes}</Text>
                  </View>
                )}

                {/* Price List */}
                <View style={styles.pricesContainer}>
                  {item.prices.map((price, index) => (
                    <View 
                      key={price.id} 
                      style={[
                        styles.priceRow,
                        index === item.prices.length - 1 && styles.priceRowLast
                      ]}
                    >
                      <View style={styles.gradeContainer}>
                        <View style={styles.gradeBadge}>
                          <Text style={styles.gradeText}>
                            {price.grade_display || price.grade}
                          </Text>
                        </View>
                        <Text style={styles.priceDate}>
                          {formatDate(price.updated_at)}
                        </Text>
                      </View>
                      <View style={styles.priceValueContainer}>
                        <Text style={styles.currencySymbol}>{t.otherBuyersPricesScreen.lkr}</Text>
                        <Text style={styles.priceValue}>
                          {parseFloat(price.price).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#1A237E']}
                tintColor="#1A237E"
              />
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A237E',
  },
  headerContainer: {
    backgroundColor: '#1A237E',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.3,
  },
  subHeader: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerRight: {
    marginLeft: 12,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -10,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingSpinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  loadingSubText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  errorIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A237E',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  buyerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  buyerHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  buyerAvatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buyerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  buyerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10b981',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phoneText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  companyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A237E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
    gap: 4,
  },
  companyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buyerCity: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  priceCountBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 50,
  },
  priceCountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A237E',
  },
  priceCountLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 6,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fffbeb',
    borderBottomWidth: 1,
    borderBottomColor: '#fef3c7',
    gap: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: '#92400e',
    fontWeight: '500',
    lineHeight: 18,
  },
  pricesContainer: {
    backgroundColor: '#fafafa',
  },
  priceDate: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  priceRowLast: {
    borderBottomWidth: 0,
  },
  gradeContainer: {
    flex: 1,
  },
  gradeBadge: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1A237E',
    alignSelf: 'flex-start',
  },
  gradeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A237E',
    letterSpacing: 0.5,
  },
  priceValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  currencySymbol: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
});