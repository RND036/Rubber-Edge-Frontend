import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl,
  Alert,
  Image,
  Animated,
  useWindowDimensions,
  StatusBar,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getEvents, Event, API_BASE_URL } from '../config/eventApi';

export default function EventsListScreen() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(headerScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [loading]);

  const loadEvents = async () => {
    if (!accessToken) {
      Alert.alert(t.common.error, 'No access token found');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await getEvents(accessToken);
      setEvents(data);
    } catch (error: any) {
      Alert.alert(t.common.error, 'Failed to load events. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const handleEventPress = (eventId: number) => {
    router.push({
      pathname: '/event-details',
      params: { eventId: eventId.toString() }
    });
  };

  const AnimatedEventCard = ({ item, index }: { item: Event; index: number }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const pressAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 400,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          delay: index * 80,
          useNativeDriver: true,
        })
      ]).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(pressAnim, {
        toValue: 0.96,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(pressAnim, {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }).start();
    };

    const eventDate = new Date(item.event_date);
    const isPast = item.is_past;
    const isCancelled = item.is_cancelled;
    
    const imageUrl = item.image 
      ? (item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`)
      : null;

    return (
      <Animated.View
        style={[
          {
            opacity: cardAnim,
            transform: [
              { scale: Animated.multiply(scaleAnim, pressAnim) },
              {
                translateY: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                })
              }
            ]
          }
        ]}
      >
        <TouchableOpacity 
          style={[
            styles.eventCard,
            (isPast || isCancelled) && styles.eventCardMuted
          ]}
          onPress={() => handleEventPress(item.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          {/* Event Image with gradient overlay */}
          {imageUrl && (
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: imageUrl }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.4)']}
                style={styles.imageGradient}
              />
              
              {/* Status badge overlay */}
              <View style={styles.imageBadgeContainer}>
                {isCancelled ? (
                  <View style={[styles.imageBadge, styles.cancelledImageBadge]}>
                    <MaterialCommunityIcons name="cancel" size={16} color="#f44336" />
                    <Text style={styles.imageBadgeText}>Cancelled</Text>
                  </View>
                ) : isPast ? (
                  <View style={[styles.imageBadge, styles.pastImageBadge]}>
                    <MaterialCommunityIcons name="check" size={16} color="#666" />
                    <Text style={styles.imageBadgeText}>Past</Text>
                  </View>
                ) : null}
              </View>
            </View>
          )}
          
          <View style={styles.eventContent}>
            {/* Icon Badge */}
            <View style={styles.eventLeft}>
              <View style={[
                styles.iconBadge, 
                { 
                  backgroundColor: isCancelled 
                    ? '#FFEBEE' 
                    : isPast 
                      ? '#F5F5F5' 
                      : '#E8F5E9' 
                }
              ]}>
                <MaterialCommunityIcons 
                  name={
                    isCancelled 
                      ? "cancel" 
                      : isPast 
                        ? "calendar-check" 
                        : "calendar-star"
                  } 
                  size={28} 
                  color={
                    isCancelled 
                      ? '#f44336' 
                      : isPast 
                        ? '#999' 
                        : '#00822C'
                  } 
                />
              </View>
            </View>

            {/* Content */}
            <View style={styles.eventMiddle}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {item.title}
              </Text>
              
              <Text style={styles.eventDescription} numberOfLines={2}>
                {item.description}
              </Text>
              
              {/* Meta Info */}
              <View style={styles.eventMeta}>
                <View style={styles.metaItem}>
                  <View style={styles.metaIconCircle}>
                    <MaterialCommunityIcons name="calendar" size={14} color="#00822C" />
                  </View>
                  <Text style={styles.metaText}>
                    {eventDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
                
                <View style={styles.metaItem}>
                  <View style={styles.metaIconCircle}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#00822C" />
                  </View>
                  <Text style={styles.metaText}>
                    {eventDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </View>
              </View>

              {item.location && (
                <View style={styles.locationRow}>
                  <MaterialCommunityIcons name="map-marker" size={16} color="#00822C" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>
              )}

              {/* Footer Badges */}
              <View style={styles.eventFooter}>
                <View style={styles.attendanceTag}>
                  <MaterialCommunityIcons name="account-group" size={14} color="#00822C" />
                  <Text style={styles.attendanceText}>
                    {item.attendance_count}
                  </Text>
                </View>

                {item.user_attendance_status && (
                  <View style={styles.registeredBadge}>
                    <MaterialCommunityIcons name="check-circle" size={14} color="#1976D2" />
                    <Text style={styles.registeredText}>Registered</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Arrow */}
            <View style={styles.eventRight}>
              <View style={styles.arrowCircle}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#00822C" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" translucent />
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{t.buyer.upcomingEvents}</Text>
          </View>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#00822C" />
          <Text style={styles.loadingText}>{t.common.loading}...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" translucent />
      
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            paddingTop: insets.top + 12,
            opacity: fadeAnim,
            transform: [{ scale: headerScale }]
          }
        ]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t.buyer.upcomingEvents}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <MaterialCommunityIcons 
              name="refresh" 
              size={24} 
              color="#00822C" 
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Events Count */}
      {events.length > 0 && (
        <Animated.View 
          style={[
            styles.countContainer,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.countBadge}>
            <MaterialCommunityIcons name="calendar-multiple" size={18} color="#00822C" />
          </View>
          <Text style={styles.countText}>
            {events.length} {events.length === 1 ? 'Event' : 'Events'} Available
          </Text>
        </Animated.View>
      )}

      {/* Events List */}
      <FlatList
        data={events}
        renderItem={({ item, index }) => (
          <AnimatedEventCard item={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#00822C']}
            tintColor="#00822C"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="calendar-blank" size={80} color="#CCC" />
            <Text style={styles.emptyText}>{t.home.noEvents}</Text>
            <Text style={styles.emptySubtext}>
              {t.buyer.checkBackLater}
            </Text>
            <TouchableOpacity 
              style={styles.createEventButton}
              onPress={() => router.push('/createevent')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus-circle" size={20} color="#FFF" />
              <Text style={styles.createEventText}>{t.home.createEvent}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 10,
  },
  countBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  eventCardMuted: {
    opacity: 0.65,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  imageBadgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  imageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  cancelledImageBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  pastImageBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  imageBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  eventContent: {
    flexDirection: 'row',
    padding: 16,
  },
  eventLeft: {
    marginRight: 14,
    justifyContent: 'flex-start',
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventMiddle: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  eventMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
    fontWeight: '500',
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  attendanceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00822C20',
  },
  attendanceText: {
    fontSize: 12,
    color: '#00822C',
    fontWeight: '700',
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1976D220',
  },
  registeredText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '700',
  },
  eventRight: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#999',
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#BBB',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  createEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00822C',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#00822C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createEventText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
