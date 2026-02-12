import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { 
  Animated, 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEvents, getEventStatistics } from '../../config/eventApi';
import { authAPI, Farmer } from '@/services/api';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

interface TileData {
  id: number;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
  stats?: string;
  onPress: () => void;
}

interface AnimatedTileProps {
  tile: TileData;
  index: number;
}

interface DashboardStats {
  totalFarmers: number;
  activeFarmers: number;
  pendingFarmers: number;
  upcomingEvents: number;
  totalEvents: number;
}

const AnimatedTile = ({ tile, index }: AnimatedTileProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 120,
        tension: 45,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 120,
        tension: 45,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();

    // Shimmer effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [index]);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 150,
      friction: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 150,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: Animated.multiply(scaleAnim, pressAnim) },
        ],
        marginBottom: 16,
      }}
    >
      <TouchableOpacity
        style={styles.tile}
        onPress={tile.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.tileContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: tile.gradient[0] + '15' },
            ]}
          >
            <View style={[styles.iconGlow, { backgroundColor: tile.gradient[0] + '25' }]} />
            <Ionicons name={tile.icon} size={32} color={tile.gradient[0]} />
            
            {/* Shimmer overlay */}
            <Animated.View
              style={[
                styles.shimmerOverlay,
                {
                  transform: [{ translateX: shimmerTranslate }],
                },
              ]}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.tileTitle}>{tile.title}</Text>
            <Text style={styles.tileSubtitle}>{tile.subtitle}</Text>
            {tile.stats && (
              <View style={styles.statsContainer}>
                <View style={[styles.statsDot, { backgroundColor: tile.gradient[0] }]} />
                <Text style={[styles.statsText, { color: tile.gradient[0] }]}>{tile.stats}</Text>
              </View>
            )}
          </View>

          <View
            style={[
              styles.arrowContainer,
              { backgroundColor: tile.gradient[0] },
            ]}
          >
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </View>
        </View>

        <View style={[styles.tileAccent, { backgroundColor: tile.gradient[0] + '15' }]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const QuickStatCard = ({ icon, label, value, color, index, isLoading }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 100,
        tension: 55,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate icon subtly
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [index]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  return (
    <Animated.View
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: pulseAnim },
          ],
        },
      ]}
    >
      <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
        <View style={[styles.statIconGlow, { backgroundColor: color + '20' }]} />
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name={icon} size={24} color={color} />
        </Animated.View>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={color} />
        </View>
      ) : (
        <Animated.View>
          <Text style={styles.statValue}>{value}</Text>
        </Animated.View>
      )}
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
};

const HeaderGradient = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.headerGradientContainer}>
      <Animated.View
        style={[
          styles.headerGradientCircle1,
          {
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.6],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.headerGradientCircle2,
          {
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 0.4],
            }),
          },
        ]}
      />
    </View>
  );
};

export default function OfficerFarmers() {
  const router = useRouter();
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    activeFarmers: 0,
    pendingFarmers: 0,
    upcomingEvents: 0,
    totalEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(headerSlideAnim, {
        toValue: 0,
        tension: 55,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Try multiple token keys that might be used in your app
      let token = await AsyncStorage.getItem('access_token');
      
      if (!token) {
        token = await AsyncStorage.getItem('accessToken');
      }
      
      if (!token) {
        token = await AsyncStorage.getItem('token');
      }
      
      if (!token) {
        console.log('⚠️ No access token found in AsyncStorage');
        console.log('🔍 Checking all AsyncStorage keys...');
        const allKeys = await AsyncStorage.getAllKeys();
        console.log('📦 Available keys:', allKeys);
        setHasToken(false);
        setIsLoading(false);
        return;
      }

      console.log('✅ Token found, fetching dashboard data...');
      setHasToken(true);

      // Fetch events data
      let eventsData: any[] = [];
      try {
        eventsData = await getEvents(token);
        console.log('✅ Events fetched:', eventsData.length);
      } catch (error: any) {
        console.error('❌ Error fetching events:', error.message);
      }

      // Fetch statistics data
      let statisticsData: any = { total_events: 0, upcoming_events: 0, total_attendees: 0 };
      try {
        statisticsData = await getEventStatistics(token);
        console.log('✅ Statistics fetched:', statisticsData);
      } catch (error: any) {
        console.error('❌ Error fetching statistics:', error.message);
      }

      // Fetch farmers data
      let farmersResponse: any = { farmers: [] };
      try {
        farmersResponse = await authAPI.getFarmers();
        console.log('✅ Farmers fetched:', farmersResponse.farmers?.length || 0);
      } catch (error: any) {
        console.error('❌ Error fetching farmers:', error.message);
      }

      // Calculate total events - prefer API stats, fallback to array length
      const totalEvents = statisticsData.total_events || eventsData.length;

      // Calculate upcoming events with better fallback logic
      let upcomingEvents = 0;
      
      // First, try to use the API statistics
      if (statisticsData.upcoming_events && statisticsData.upcoming_events > 0) {
        upcomingEvents = statisticsData.upcoming_events;
        console.log('✅ Using API upcoming events count:', upcomingEvents);
      } else if (Array.isArray(eventsData) && eventsData.length > 0) {
        // Fallback: manually filter upcoming events
        const filteredUpcoming = eventsData.filter((event: any) => {
          return !event.is_past && !event.is_cancelled && event.is_active !== false;
        });
        upcomingEvents = filteredUpcoming.length;
        console.log('🟡 Calculated upcoming events from list:', upcomingEvents);
        console.log('📋 Upcoming events:', filteredUpcoming.map((e: any) => ({
          title: e.title,
          date: e.event_date,
          is_past: e.is_past,
          is_cancelled: e.is_cancelled
        })));
      } else {
        console.log('⚠️ No events data available to calculate upcoming events');
      }

      // Calculate farmer stats
      const allFarmers = farmersResponse.farmers || [];
      const totalFarmers = allFarmers.length;
      const activeFarmers = allFarmers.filter((f: Farmer) => true).length;
      const pendingFarmers = totalFarmers - activeFarmers;

      // Update state with calculated values
      setStats({
        totalFarmers,
        activeFarmers,
        pendingFarmers,
        upcomingEvents,
        totalEvents,
      });

      console.log('✅ Final stats updated:', { 
        totalFarmers, 
        activeFarmers, 
        pendingFarmers, 
        upcomingEvents, 
        totalEvents 
      });
    } catch (error) {
      console.error('💥 Error fetching dashboard data:', error);
      Alert.alert(t.common.error, t.officer.errorLoadingData);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const tiles: TileData[] = [
    {
      id: 1,
      title: t.officer.farmerDirectory,
      subtitle: t.officer.farmerDirectoryDesc,
      icon: 'people-outline' as const,
      gradient: ['#10B981', '#059669'],
      stats: `${stats.totalFarmers} ${t.officer.totalFarmers}`,
      onPress: () => router.push('/farmer-directory' as any),
    },
    {
      id: 2,
      title: t.officer.createEvent,
      subtitle: t.officer.createEventDesc,
      icon: 'add-circle-outline' as const,
      gradient: ['#F59E0B', '#D97706'],
      stats: t.officer.newEvent,
      onPress: () => router.push('/createevent' as any),
    },
    {
      id: 3,
      title: t.officer.viewEvents,
      subtitle: t.officer.viewEventsDesc,
      icon: 'calendar-outline' as const,
      gradient: ['#8B5CF6', '#7C3AED'],
      stats: stats.upcomingEvents > 0 
        ? `${stats.upcomingEvents} ${t.officer.upcoming}` 
        : `${stats.totalEvents} ${t.officer.total} ${stats.totalEvents === 1 ? t.officer.event : t.officer.events}`,
      onPress: () => router.push('/events-list' as any),
    },
    {
      id: 4,
      title: t.officer.marketPrice,
      subtitle: t.officer.marketPriceDesc,
      icon: 'trending-up-outline' as const,
      gradient: ['#06B6D4', '#0891B2'],
      stats: t.officer.livePrices,
      onPress: () => router.push('/market' as any),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        bounces={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerFadeAnim,
              transform: [{ translateY: headerSlideAnim }],
            },
          ]}
        >
          <HeaderGradient />

          <View style={styles.statsRow}>
            <QuickStatCard 
              icon="people" 
              label={t.officer.totalFarmers} 
              value={stats.totalFarmers.toString()} 
              color="#10B981"
              index={0}
              isLoading={isLoading}
            />
            <QuickStatCard 
              icon="calendar" 
              label={t.officer.totalEvents} 
              value={stats.totalEvents.toString()} 
              color="#8B5CF6"
              index={1}
              isLoading={isLoading}
            />
          </View>
        </Animated.View>

        <View style={styles.tilesContainer}>
          {tiles.map((tile, index) => (
            <AnimatedTile key={tile.id} tile={tile} index={index} />
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  headerGradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  headerGradientCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#10B981',
    top: -150,
    right: -100,
  },
  headerGradientCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3B82F6',
    bottom: -80,
    left: -50,
  },
  headerContent: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  statIconGlow: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 16,
    opacity: 0.5,
  },
  loadingContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  tilesContainer: {
    padding: 20,
    paddingTop: 28,
  },
  tile: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  iconGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 18,
    opacity: 0.5,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  textContainer: {
    flex: 1,
  },
  tileTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 5,
    letterSpacing: -0.3,
  },
  tileSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    lineHeight: 19,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statsDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
  },
  statsText: {
    fontSize: 13,
    fontWeight: '700',
  },
  arrowContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  tileAccent: {
    height: 4,
    width: '100%',
  },
  bottomPadding: {
    height: 30,
  },
});
