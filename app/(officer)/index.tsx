// app/(officer)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';

// Import your API functions
import { API_BASE_URL, Event, getEvents } from '../../config/eventApi';

const { width } = Dimensions.get('window');

// ========== INTERFACES ==========
interface CarouselItem {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  image_url?: string;
  color: string;
  icon: string;
  order: number;
}

interface NewsUpdate {
  id: number;
  title: string;
  time: string;
  category: 'Policy' | 'Logistics' | 'Weather' | 'Market';
  url?: string;
  imageUrl?: string;
}

// ========== BACKUP CAROUSEL DATA ==========
const BACKUP_CAROUSEL: CarouselItem[] = [
  { 
    id: 1, 
    title: 'Rubber Market Price', 
    value: 'RSS-1: LKR 885.00', 
    subtitle: '+2.5% from yesterday', 
    color: '#1B5E20', 
    icon: 'trending-up',
    order: 1
  },
  { 
    id: 2, 
    title: 'Disease Alert', 
    value: 'Circular Leaf Spot', 
    subtitle: 'High risk in Wet Zone', 
    color: '#C62828', 
    icon: 'warning-outline',
    order: 2
  },
  { 
    id: 3, 
    title: 'Daily Collection', 
    value: '12,450 Liters', 
    subtitle: 'Latex collected today', 
    color: '#F57F17', 
    icon: 'water-outline',
    order: 3
  },
];

// ========== BACKUP NEWS DATA ==========
const BACKUP_NEWS: NewsUpdate[] = [
  { 
    id: 901, 
    title: 'Natural rubber prices reach 13-year high amid supply constraints', 
    time: '2h ago', 
    category: 'Market',
    url: 'https://tradingeconomics.com/commodity/rubber',
    imageUrl: 'https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=400&h=250&fit=crop'
  },
  { 
    id: 902, 
    title: 'ANRPC forecasts 1.3% production increase for 2025', 
    time: '5h ago', 
    category: 'Policy',
    url: 'https://www.anrpc.org',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'
  },
  { 
    id: 903, 
    title: 'Sri Lanka rubber exports grow 7.66% to USD 1 billion', 
    time: '1d ago', 
    category: 'Market',
    url: 'https://lankanewsweb.net',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=250&fit=crop'
  },
  { 
    id: 904, 
    title: 'Weather Warning: Monsoon affects rubber tapping in Western Province', 
    time: '1d ago', 
    category: 'Weather',
    url: 'https://weather.lk',
    imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=250&fit=crop'
  },
  { 
    id: 905, 
    title: 'Global natural rubber demand expected to rise 0.8% to 15.5 million tonnes', 
    time: '2d ago', 
    category: 'Market',
    url: 'https://www.tradingeconomics.com',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop'
  },
];

// RSS Feed URLs
const RSS_FEEDS = [
  'https://feeds.bbci.co.uk/news/business/rss.xml',
  'https://www.theguardian.com/business/rss',
  'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  'https://feeds.finance.yahoo.com/rss/2.0/headline',
];

export default function OfficerDashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useLanguage();
  
  // ========== STATE ==========
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [updates, setUpdates] = useState<NewsUpdate[]>([]);
  const [carouselData, setCarouselData] = useState<CarouselItem[]>(BACKUP_CAROUSEL);
  
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef<ScrollView>(null);

  // ========== EFFECTS ==========
  useEffect(() => {
    console.log("🔄 OfficerDashboard mounted");
    loadUserAndData();
  }, []);

  useEffect(() => {
    const cleanup = startAutoScroll();
    return cleanup;
  }, [carouselData.length]);

  // ========== AUTO SCROLL ==========
  const startAutoScroll = () => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % carouselData.length;
        carouselRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  };

  // ========== LOAD USER AND DATA ==========
  const loadUserAndData = async () => {
    console.log("📥 Starting loadUserAndData...");
    setLoadingEvents(true);
    setLoadingUpdates(true);
    setLoadingCarousel(true);
    
    try {
      // Load User
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log("✅ User loaded:", parsedUser.phone_number);
      } else {
        console.log("ℹ️ No user data - showing public dashboard");
      }

      // Load Token
      const token = await AsyncStorage.getItem('accessToken');
      console.log("🔐 Token exists:", !!token);
      
      // Fetch all data
      await Promise.allSettled([
        fetchCarouselItems(),
        fetchDashboardEvents(token),
        fetchNewsUpdates()
      ]);

    } catch (error) {
      console.error("❌ Load error:", error);
    } finally {
      setLoadingEvents(false);
      setLoadingUpdates(false);
      setLoadingCarousel(false);
      console.log("✅ loadUserAndData completed");
    }
  };

  // ========== FETCH CAROUSEL ITEMS ==========
  const fetchCarouselItems = async () => {
    try {
      console.log("🎠 Fetching carousel items from backend...");
      
      // Try carousel API endpoint (note: /api prefix is required)
      const response = await fetch(`${API_BASE_URL}/api/carousel/items/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const items = await response.json();
        console.log("📡 API Response:", items);
        
        if (items && Array.isArray(items) && items.length > 0) {
          setCarouselData(items);
          console.log(`✅ Loaded ${items.length} carousel items from backend`);
          return;
        } else {
          console.log("⚠️ API returned empty array");
        }
      } else {
        console.log(`⚠️ API returned status: ${response.status}`);
      }
      
      console.log("ℹ️ Using backup carousel data");
      setCarouselData(BACKUP_CAROUSEL);

    } catch (error: any) {
      console.error("❌ Fetch carousel error:", error.message);
      console.log("📋 Using backup carousel data");
      setCarouselData(BACKUP_CAROUSEL);
    }
  };

  // ========== FETCH EVENTS ==========
  const fetchDashboardEvents = async (token: string | null) => {
    try {
      console.log("📡 Fetching events...");
      
      if (token) {
        try {
          const allEvents = await getEvents(token);
          if (allEvents && Array.isArray(allEvents) && allEvents.length > 0) {
            const sortedEvents = allEvents.sort((a, b) => b.id - a.id);
            const topThree = sortedEvents.slice(0, 3);
            setEvents(topThree);
            console.log(`✅ Loaded ${topThree.length} events with auth`);
            return;
          }
        } catch (error) {
          console.log("⚠️ Authenticated fetch failed, trying public endpoint...");
        }
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/events/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const allEvents = await response.json();
          if (allEvents && Array.isArray(allEvents) && allEvents.length > 0) {
            const sortedEvents = allEvents.sort((a, b) => b.id - a.id);
            const topThree = sortedEvents.slice(0, 3);
            setEvents(topThree);
            console.log(`✅ Loaded ${topThree.length} events without auth`);
            return;
          }
        }
      } catch (publicError) {
        console.log("⚠️ Public endpoint fetch failed");
      }
      
      console.log("ℹ️ No events available");
      setEvents([]);

    } catch (error: any) {
      console.error("❌ Fetch events error:", error.message);
      setEvents([]);
    }
  };

  // ========== FETCH NEWS ==========
  const fetchNewsUpdates = async () => {
    try {
      console.log("📰 Fetching rubber news...");
      const news = await fetchFromRSS();
      
      if (news && news.length > 0) {
        console.log(`✅ Fetched ${news.length} news articles`);
        setUpdates(news);
        return;
      }
    } catch (error) {
      console.log("⚠️ RSS fetch failed:", error);
    }

    console.log("📋 Using backup news data");
    setUpdates(BACKUP_NEWS);
  };

  const isRubberRelated = (title: string): boolean => {
    const t = title.toLowerCase();
    const primaryKeywords = ['rubber', 'latex', 'natural rubber', 'synthetic rubber'];
    const secondaryKeywords = ['plantation', 'tapping', 'tire', 'tyre'];
    const regionalKeywords = ['sri lanka', 'thailand', 'malaysia', 'indonesia'];
    
    return primaryKeywords.some(k => t.includes(k)) || 
           (secondaryKeywords.some(k => t.includes(k)) && regionalKeywords.some(k => t.includes(k)));
  };

  const fetchFromRSS = async (): Promise<NewsUpdate[]> => {
    const allArticles: NewsUpdate[] = [];
    
    for (const feedUrl of RSS_FEEDS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(feedUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/xml, text/xml, application/rss+xml, */*',
            'User-Agent': 'RubberEdge/1.0',
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) continue;

        const xmlText = await response.text();
        const articles = parseRSS(xmlText);
        const relevant = articles.filter(article => isRubberRelated(article.title));
        allArticles.push(...relevant);
        
        if (allArticles.length >= 5) break;
      } catch (error: any) {
        continue;
      }
    }

    return allArticles.length > 0 ? allArticles.slice(0, 5) : [];
  };

  const parseRSS = (xmlText: string): NewsUpdate[] => {
    const articles: NewsUpdate[] = [];
    
    try {
      const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
      const items = xmlText.match(itemRegex) || [];
      
      items.forEach((item, index) => {
        const titleMatch = item.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/i) || 
                          item.match(/<title[^>]*>(.*?)<\/title>/i);
        const linkMatch = item.match(/<link[^>]*>(.*?)<\/link>/i);
        const pubDateMatch = item.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i);
        
        if (titleMatch && titleMatch[1] && titleMatch[1].length > 5) {
          const title = titleMatch[1].replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim();
          
          articles.push({
            id: 100 + index,
            title: title,
            time: getTimeDifference(pubDateMatch ? pubDateMatch[1] : new Date().toISOString()),
            category: categorizeNews(title),
            url: linkMatch ? linkMatch[1].trim() : undefined,
          });
        }
      });
    } catch (error) {
      console.log("❌ RSS parsing error:", error);
    }
    
    return articles;
  };

  // ========== REFRESH ==========
  const onRefresh = useCallback(async () => {
    console.log("🔄 Pull to refresh triggered");
    setRefreshing(true);
    await loadUserAndData();
    setRefreshing(false);
  }, []);

  // ========== HELPER FUNCTIONS ==========
  const getTimeDifference = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const diff = new Date().getTime() - date.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      
      if (hours < 1) return 'Just now';
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}d ago`;
      return `${Math.floor(days / 7)}w ago`;
    } catch (e) { 
      return 'Recently'; 
    }
  };

  const categorizeNews = (title: string): 'Policy' | 'Logistics' | 'Weather' | 'Market' => {
    const t = (title || '').toLowerCase();
    
    if (t.includes('price') || t.includes('market') || t.includes('trading')) {
      return 'Market';
    }
    if (t.includes('weather') || t.includes('rain') || t.includes('monsoon')) {
      return 'Weather';
    }
    if (t.includes('transport') || t.includes('logistics')) {
      return 'Logistics';
    }
    return 'Policy';
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return { day: '--', month: '---', time: '--:--' };
    const date = new Date(isoDate);
    return { 
      day: date.getDate(), 
      month: date.toLocaleString('default', { month: 'short' }), 
      time: date.toLocaleString('default', { hour: '2-digit', minute: '2-digit', hour12: true }) 
    };
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // ========== RENDER ==========
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F4" />

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1B5E20']} />
        }
      >
        
        {/* ========== CAROUSEL WITH BACKEND IMAGES ========== */}
        <View style={styles.carouselSection}>
          {loadingCarousel ? (
            <View style={styles.carouselLoader}>
              <ActivityIndicator size="large" color="#1B5E20" />
              <Text style={styles.loadingText}>{t.officer.loadingCarousel}</Text>
            </View>
          ) : (
            <>
              <ScrollView
                ref={carouselRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={width}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => {
                  const slide = Math.round(e.nativeEvent.contentOffset.x / width);
                  setActiveSlide(slide);
                }}
              >
                {carouselData.map((item) => (
                  <View key={item.id} style={{ width: width, alignItems: 'center' }}>
                    <View style={[styles.card, { backgroundColor: item.color }]}>
                      {/* Background Image from Backend */}
                      {item.image_url && (
                        <Image 
                          source={{ uri: item.image_url }}
                          style={styles.cardBackgroundImage}
                          resizeMode="cover"
                          onError={(error) => {
                            console.log("❌ Image load error:", error.nativeEvent.error);
                          }}
                          onLoad={() => {
                            console.log("✅ Image loaded successfully:", item.image_url);
                          }}
                        />
                      )}
                      
                      {/* Overlay for text readability */}
                      <View style={styles.cardOverlay} />
                      
                      {/* Content */}
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                          <View style={styles.iconCircle}>
                            <Ionicons name={item.icon as any} size={24} color={item.color} />
                          </View>
                          <Text style={styles.cardTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.cardValue}>{item.value}</Text>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                      </View>
                      
                      {/* Decorative icon if no image */}
                      {!item.image_url && (
                        <Ionicons 
                          name="leaf" 
                          size={120} 
                          color="rgba(255,255,255,0.1)" 
                          style={styles.bgIcon} 
                        />
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
              
              {/* Pagination Dots */}
              <View style={styles.pagination}>
                {carouselData.map((_, i) => (
                  <View 
                    key={i} 
                    style={[
                      styles.dot, 
                      activeSlide === i ? styles.activeDot : null
                    ]} 
                  />
                ))}
              </View>
            </>
          )}
        </View>

        {/* ========== EVENTS SECTION ========== */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.officer.recentEvents}</Text>
            <TouchableOpacity onPress={() => router.push('/events-list')}>
              <Text style={styles.seeAllText}>{t.officer.viewAll}</Text>
            </TouchableOpacity>
          </View>

          {loadingEvents ? (
            <ActivityIndicator size="small" color="#1B5E20" style={{ marginVertical: 20 }} />
          ) : events.length === 0 ? (
            <View style={styles.emptyStateContainer}>
               <Ionicons name="calendar-outline" size={32} color="#CCC" />
               <Text style={styles.emptyStateText}>{t.officer.noEventsFound}</Text>
               <Text style={styles.emptyStateSubtext}>{t.officer.createFirstEvent}</Text>
            </View>
          ) : (
            events.map((event) => {
              const { day, month, time } = formatDate(event.event_date);
              const isPast = new Date(event.event_date) < new Date();
              
              return (
                <TouchableOpacity 
                  key={event.id} 
                  style={styles.eventCard}
                  onPress={() => router.push({ 
                    pathname: '/event-details', 
                    params: { eventId: event.id.toString() } 
                  })}
                  activeOpacity={0.7}
                >
                  <View style={styles.dateBox}>
                    <Text style={styles.dateText}>{day}</Text>
                    <Text style={styles.monthText}>{month}</Text>
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                    <View style={styles.eventMeta}>
                      <Ionicons name="time-outline" size={14} color="#666" />
                      <Text style={styles.metaText}>{time}</Text>
                      <Text style={styles.metaSeparator}>|</Text>
                      <Text style={styles.metaText} numberOfLines={1}>
                        {event.location || 'No Location'}
                      </Text>
                    </View>
                  </View>
                  {(event.is_cancelled || isPast) && (
                    <View style={[
                      styles.statusBadge, 
                      { backgroundColor: event.is_cancelled ? '#FFEBEE' : '#EEEEEE' }
                    ]}>
                      <Text style={[
                        styles.statusText, 
                        { color: event.is_cancelled ? '#C62828' : '#757575' }
                      ]}>
                        {event.is_cancelled ? t.officer.cancelled : t.officer.ended}
                      </Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={20} color="#1B5E20" />
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* ========== LATEST RUBBER NEWS ========== */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.officer.latestRubberNews}</Text>
            {loadingUpdates && <ActivityIndicator size="small" color="#1B5E20" />}
          </View>
          
          {updates.length === 0 && !loadingUpdates ? (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="newspaper-outline" size={32} color="#CCC" />
              <Text style={styles.emptyStateText}>{t.officer.noRubberNewsAvailable}</Text>
            </View>
          ) : (
            updates.map((update) => (
              <TouchableOpacity 
                key={update.id} 
                style={styles.updateCard}
                activeOpacity={0.7}
                onPress={() => update.url ? Linking.openURL(update.url) : null}
              >
                {update.imageUrl ? (
                  <Image 
                    source={{ uri: update.imageUrl }}
                    style={styles.updateImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.updateImagePlaceholder, {
                    backgroundColor: update.category === 'Policy' ? '#E8F5E9' : 
                                   update.category === 'Market' ? '#FFF8E1' : 
                                   update.category === 'Weather' ? '#E3F2FD' : '#F5F5F5'
                  }]}>
                    <Ionicons 
                      name={
                        update.category === 'Policy' ? 'document-text' : 
                        update.category === 'Market' ? 'trending-up' : 
                        update.category === 'Weather' ? 'rainy' : 'cube'
                      } 
                      size={32} 
                      color={
                        update.category === 'Policy' ? '#1B5E20' : 
                        update.category === 'Market' ? '#F57F17' : 
                        update.category === 'Weather' ? '#1976D2' : '#757575'
                      }
                    />
                  </View>
                )}
                <View style={styles.updateTextContainer}>
                  <View style={styles.updateHeader}>
                    <View style={[styles.categoryBadge, { 
                      backgroundColor: update.category === 'Policy' ? '#1B5E20' : 
                                     update.category === 'Market' ? '#F57F17' : 
                                     update.category === 'Weather' ? '#1976D2' : '#757575' 
                    }]}>
                      <Text style={styles.updateCategory}>{update.category}</Text>
                    </View>
                    <Text style={styles.updateTime}>{update.time}</Text>
                  </View>
                  <Text style={styles.updateTitle} numberOfLines={3}>{update.title}</Text>
                  {update.url && (
                    <View style={styles.readMoreContainer}>
                      <Text style={styles.readMoreText}>{t.officer.readMore}</Text>
                      <Ionicons name="arrow-forward" size={14} color="#1B5E20" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
    </View>
  );
}

function getTimeOfDay(t: any) {
  const h = new Date().getHours();
  return h < 12 ? t.officer.goodMorning : h < 17 ? t.officer.goodAfternoon : t.officer.goodEvening;
}

// ========== STYLES ==========
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F4' },
  headerContainer: { 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    backgroundColor: '#F4F6F4' 
  },
  headerContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  headerGreeting: { 
    color: '#666', 
    fontSize: 14, 
    fontWeight: '600', 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 4 
  },
  headerName: { 
    color: '#1B5E20', 
    fontSize: 26, 
    fontWeight: 'bold' 
  },
  
  // Carousel Styles
  carouselSection: { marginTop: 15, marginBottom: 10 },
  carouselLoader: { 
    width: width - 40, 
    height: 180, 
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 20
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666'
  },
  card: { 
    width: width - 40, 
    height: 180, 
    borderRadius: 16, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 4,
    position: 'relative'
  },
  cardBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  cardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    top: 0,
    left: 0,
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  cardTitle: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  cardValue: { 
    color: '#FFF', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  cardSubtitle: { 
    color: 'rgba(255,255,255,0.95)', 
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  },
  bgIcon: { 
    position: 'absolute', 
    right: -20, 
    bottom: -20, 
    opacity: 0.2 
  },
  pagination: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 15 
  },
  dot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#CCC', 
    marginHorizontal: 4 
  },
  activeDot: { 
    backgroundColor: '#1B5E20', 
    width: 24 
  },

  // Section Styles
  sectionContainer: { 
    paddingHorizontal: 20, 
    marginTop: 25 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#222' 
  },
  seeAllText: { 
    color: '#1B5E20', 
    fontWeight: '600', 
    fontSize: 14 
  },

  // Event Card Styles
  eventCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 4, 
    elevation: 3, 
    borderLeftWidth: 4, 
    borderLeftColor: '#1B5E20' 
  },
  dateBox: { 
    backgroundColor: '#F1F8E9', 
    borderRadius: 8, 
    padding: 10, 
    alignItems: 'center', 
    minWidth: 60 
  },
  dateText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1B5E20' 
  },
  monthText: { 
    fontSize: 12, 
    color: '#558B2F', 
    textTransform: 'uppercase' 
  },
  eventInfo: { 
    flex: 1, 
    marginLeft: 15 
  },
  eventTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: 4 
  },
  eventMeta: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  metaText: { 
    fontSize: 12, 
    color: '#666', 
    marginLeft: 4, 
    flexShrink: 1 
  },
  metaSeparator: { 
    marginHorizontal: 8, 
    color: '#CCC' 
  },
  statusBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4, 
    marginLeft: 8 
  },
  statusText: { 
    fontSize: 10, 
    fontWeight: '700' 
  },

  // News Card Styles
  updateCard: { 
    flexDirection: 'column', 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    marginBottom: 15, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 4, 
    elevation: 3 
  },
  updateImage: { 
    width: '100%', 
    height: 180, 
    backgroundColor: '#F5F5F5' 
  },
  updateImagePlaceholder: { 
    width: '100%', 
    height: 180, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  updateTextContainer: { 
    padding: 15 
  },
  updateHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  categoryBadge: { 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  updateCategory: { 
    fontSize: 10, 
    color: '#FFF', 
    fontWeight: '700', 
    textTransform: 'uppercase' 
  },
  updateTitle: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: 8, 
    lineHeight: 22 
  },
  updateTime: { 
    fontSize: 11, 
    color: '#999', 
    fontWeight: '500' 
  },
  readMoreContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 4 
  },
  readMoreText: { 
    fontSize: 13, 
    color: '#1B5E20', 
    fontWeight: '600', 
    marginRight: 4 
  },
  
  // Empty State
  emptyStateContainer: { 
    alignItems: 'center', 
    padding: 20, 
    opacity: 0.6 
  },
  emptyStateText: { 
    marginTop: 8, 
    fontSize: 14, 
    color: '#666', 
    fontWeight: '600' 
  },
  emptyStateSubtext: { 
    marginTop: 4, 
    fontSize: 11, 
    color: '#999' 
  },

  scrollView: { 
    flex: 1 
  },
  scrollContent: { 
    paddingBottom: 40 
  },
});
