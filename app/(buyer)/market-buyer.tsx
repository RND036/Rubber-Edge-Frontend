import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, Modal, Platform, Pressable, StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import buyerPricesApi, { BuyerPrice, BuyerPricesGroup, FarmerViewResponse } from '../../services/buyerPricesApi';



export default function MarketScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [prices, setPrices] = useState<BuyerPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');

  // Other buyers modal state
  const [otherBuyersVisible, setOtherBuyersVisible] = useState(false);
  const [otherBuyers, setOtherBuyers] = useState<BuyerPricesGroup[]>([]);
  const [otherBuyersLoading, setOtherBuyersLoading] = useState(false);
  const [otherBuyersError, setOtherBuyersError] = useState('');

  const openOtherBuyers = async () => {
    setOtherBuyersVisible(true);
    setOtherBuyersLoading(true);
    setOtherBuyersError('');
    try {
      const response: FarmerViewResponse = await buyerPricesApi.getFarmerViewPrices();
      if (response.success && response.buyers) {
        setOtherBuyers(response.buyers);
      } else {
        setOtherBuyers([]);
        setOtherBuyersError('No data found.');
      }
    } catch (err) {
      setOtherBuyersError('Failed to load other buyers prices.');
      setOtherBuyers([]);
    } finally {
      setOtherBuyersLoading(false);
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await buyerPricesApi.getMyLatestPrices();
        if (response.success && response.prices) {
          setPrices(response.prices);
          if (response.prices.length > 0 && response.prices[0].notes) {
            setNotes(response.prices[0].notes);
          }
        } else {
          setPrices([]);
        }
      } catch (err) {
        setError('Failed to load your market rates.');
        setPrices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent, 
          { 
            paddingTop: 16, 
            paddingBottom: insets.bottom + 80 
          }
        ]}
      >
        {/* Market Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusLeft}>
            <View style={styles.liveDot} />
            <Text style={styles.statusText}>{t.buyer.marketOpen}</Text>
            <Text style={styles.statusTime}>• {t.buyer.updatedJustNow}</Text>
          </View>
          <View style={styles.dateChip}>
            <Ionicons name="calendar-outline" size={14} color="#1A237E" />
            <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Today's Rates Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.buyer.myMarketRates}</Text>
          <Text style={styles.sectionSubtitle}>{t.buyer.ratesSetByYou}</Text>
        </View>

        {/* Price Cards Grid */}
        <View style={styles.priceGrid}>
          {loading ? (
            <Text>{t.buyer.loadingRates}</Text>
          ) : error ? (
            <Text style={{ color: 'red' }}>{error}</Text>
          ) : prices.length === 0 ? (
            <Text>{t.buyer.noRatesSet} {t.buyer.useUpdateRates}</Text>
          ) : (
            prices.map((item) => (
              <View style={styles.priceCard} key={item.id}>
                <View style={styles.priceHeader}>
                  <Text style={styles.priceLabel}>{item.grade_display || item.grade}</Text>
                </View>
                <Text style={styles.priceAmount}>LKR {item.price}</Text>
                <Text style={styles.priceUnit}>{t.buyer.perKg}</Text>
                <View style={styles.priceFooter}>
                  <Text style={styles.prevPrice}>Updated: {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '-'}</Text>
                </View>
              </View>
            ))
          )}
        </View>



        {/* Action Section */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}> 
          <Text style={styles.sectionTitle}>{t.buyer.marketActions}</Text>
        </View>

        {/* Primary Action Cards */}
        <TouchableOpacity 
          style={styles.actionCard}
          activeOpacity={0.7}
          onPress={() => router.push('/market')}
        >
          <LinearGradient
            colors={['#1A237E', '#283593']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="stats-chart" size={28} color="#1A237E" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{t.buyer.viewMarketTrends}</Text>
              <Text style={styles.actionDescription}>
                {t.buyer.viewMarketTrendsDesc}
              </Text>
            </View>
            <View style={styles.actionArrow}>
              <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.8)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* New Tile: View Other Buyers' Prices */}
        <TouchableOpacity 
          style={styles.actionCard}
          activeOpacity={0.7}
          onPress={() => router.push('/other-buyers-prices')}
        >
          <LinearGradient
            colors={['#f59e42', '#fbbf24']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="people" size={28} color="#b45309" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{t.buyer.viewOtherBuyers}</Text>
              <Text style={styles.actionDescription}>
                {t.buyer.viewOtherBuyersDesc}
              </Text>
            </View>
            <View style={styles.actionArrow}>
              <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.8)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          activeOpacity={0.7}
          onPress={() => router.replace('/update-rates' )}
        >
          <LinearGradient
            colors={['#059669', '#10b981']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="create" size={28} color="#059669" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{t.buyer.updateMyRates}</Text>
              <Text style={styles.actionDescription}>
                {t.buyer.updateMyRatesDesc}
              </Text>
            </View>
            <View style={styles.actionArrow}>
              <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.8)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Modal for Other Buyers' Prices */}
        <Modal
          visible={otherBuyersVisible}
          animationType="slide"
          onRequestClose={() => setOtherBuyersVisible(false)}
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, width: '90%', maxHeight: '80%' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>{t.buyer.otherBuyersPrices}</Text>
              {otherBuyersLoading ? (
                <Text>{t.common.loading}</Text>
              ) : otherBuyersError ? (
                <Text style={{ color: 'red' }}>{otherBuyersError}</Text>
              ) : (
                <FlatList
                  data={otherBuyers}
                  keyExtractor={item => item.buyer_id.toString()}
                  renderItem={({ item }) => (
                    <View style={{ marginBottom: 16, borderBottomWidth: 1, borderColor: '#e5e7eb', paddingBottom: 8 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.buyer_name} {item.buyer_company ? `(${item.buyer_company})` : ''}</Text>
                      <Text style={{ color: '#64748b', fontSize: 13 }}>{item.buyer_city || ''}</Text>
                      {item.prices.map(price => (
                        <Text key={price.id} style={{ marginLeft: 8, fontSize: 15 }}>
                          {price.grade_display || price.grade}: LKR {price.price}
                        </Text>
                      ))}
                    </View>
                  )}
                  ListEmptyComponent={<Text>No other buyers found.</Text>}
                />
              )}
              <Pressable
                style={{ marginTop: 16, alignSelf: 'center', backgroundColor: '#1A237E', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10 }}
                onPress={() => setOtherBuyersVisible(false)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{t.buyer.close}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Quick Links removed: Analytics, Market News, Reports */}

        {/* Info Footer */}
        <View style={styles.infoFooter}>
          <Ionicons name="information-circle-outline" size={18} color="#64748b" />
          <Text style={styles.infoText}>
            {notes ? notes : t.buyer.ratesProvidedBy}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  statusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginRight: 8,
  },
  statusTime: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A237E',
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  priceCard: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: {
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  changePositive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 2,
  },
  changeNegative: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 2,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  changeTextNeg: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626',
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  priceUnit: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 12,
  },
  priceFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
  },
  prevPrice: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  actionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    minHeight: 100,
  },
  actionIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  actionDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
    fontWeight: '500',
  },
  actionArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinks: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  quickLinkCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickLinkIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  infoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});