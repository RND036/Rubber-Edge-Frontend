import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getEvent, EventDetail, registerForEvent, unregisterFromEvent, API_BASE_URL } from '../config/eventApi';

const { width } = Dimensions.get('window');

export default function EventDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { accessToken, user } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const rawId = Array.isArray(params.eventId) 
    ? params.eventId[0] 
    : params.eventId;
  const eventId = rawId ? Number(rawId) : NaN;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const imageScale = useRef(new Animated.Value(1)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      Alert.alert(t.common.error, 'Please log in again');
      return;
    }

    if (!rawId || Number.isNaN(eventId)) {
      setLoading(false);
      return;
    }

    loadEvent();
  }, [rawId, accessToken]);

  useEffect(() => {
    if (event) {
      // Staggered entrance animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [event]);

  const loadEvent = async () => {
    if (!accessToken || !eventId || Number.isNaN(eventId)) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getEvent(eventId, accessToken);
      setEvent(data);
    } catch (error: any) {
      let errorMessage = 'Failed to load event details';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your connection.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Event not found';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (!error.response) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.alert(t.common.error, errorMessage);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const animateButton = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      })
    ]).start(callback);
  };

  const handleRegister = async () => {
    if (!event) return;
    
    animateButton(async () => {
      setActionLoading(true);
      try {
        await registerForEvent(event.id, 'interested', accessToken!);
        Alert.alert(t.common.success, t.eventDetails.registerSuccess);
        await loadEvent();
      } catch (error: any) {
        const errorMsg = error.response?.data?.error || 
                         error.response?.data?.detail || 
                         'Failed to register';
        Alert.alert(t.common.error, errorMsg);
      } finally {
        setActionLoading(false);
      }
    });
  };

  const handleUnregister = async () => {
    if (!event) return;
    
    Alert.alert(
      t.eventDetails.unregisterConfirm,
      t.eventDetails.unregisterConfirmText,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unregister',
          style: 'destructive',
          onPress: async () => {
            animateButton(async () => {
              setActionLoading(true);
              try {
                await unregisterFromEvent(event.id, accessToken!);
                Alert.alert(t.common.success, t.eventDetails.unregisterSuccess);
                await loadEvent();
              } catch (error: any) {
                Alert.alert(t.common.error, 'Failed to unregister');
              } finally {
                setActionLoading(false);
              }
            });
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" translucent />
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Details</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00822C" />
          <Text style={styles.loadingText}>{t.eventDetails.loadingEvent}</Text>
        </View>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" translucent />
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.eventDetails.title}</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={64} color="#FF6B6B" />
          <Text style={styles.errorText}>{t.eventDetails.eventNotFound}</Text>
          <Text style={styles.errorSubtext}>
            {t.eventDetails.eventNotFoundDesc}
          </Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButtonError}>
            <Text style={styles.backButtonText}>{t.common.back}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const isFarmer = user?.role === 'farmer';
  const userStatus = event.user_attendance_status;
  const isRegistered = userStatus !== null;
  
  const imageUrl = event.image 
    ? (event.image.startsWith('http') ? event.image : `${API_BASE_URL}${event.image}`)
    : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" translucent />
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.eventDetails.title}</Text>
          <View style={{ width: 44 }} />
        </Animated.View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Event Image */}
        {imageUrl && (
          <Animated.View 
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: imageScale }]
              }
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.eventDetailImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageOverlay}
            />
          </Animated.View>
        )}

        <Animated.View 
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar" size={20} color="#00822C" />
            <Text style={styles.infoText}>
              {new Date(event.event_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#00822C" />
            <Text style={styles.infoText}>
              {new Date(event.event_date).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>

          {event.location && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#00822C" />
              <Text style={styles.infoText}>{event.location}</Text>
            </View>
          )}

          {event.contact_number && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={20} color="#00822C" />
              <Text style={styles.infoText}>{event.contact_number}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="account" size={20} color="#666" />
            <Text style={styles.infoText}>
              {t.eventDetails.organizedBy} {event.created_by.full_name || event.created_by.email}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="account-group" size={20} color="#00822C" />
            <Text style={styles.infoText}>
              {event.attendance_count} {event.attendance_count === 1 ? t.eventDetails.person : t.eventDetails.people} {t.eventDetails.interested}
            </Text>
          </View>

          {event.max_participants && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="account-multiple-check" size={20} color="#666" />
              <Text style={styles.infoText}>
                {t.eventDetails.maxCapacity}: {event.max_participants}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <Text style={styles.descriptionLabel}>{t.eventDetails.description}</Text>
          <Text style={styles.description}>{event.description}</Text>

          {event.is_cancelled && (
            <View style={styles.cancelledBanner}>
              <MaterialCommunityIcons name="alert-circle" size={24} color="#f44336" />
              <Text style={styles.cancelledText}>{t.eventDetails.eventCancelled}</Text>
            </View>
          )}

          {event.is_past && !event.is_cancelled && (
            <View style={styles.pastBanner}>
              <MaterialCommunityIcons name="information" size={24} color="#666" />
              <Text style={styles.pastText}>{t.eventDetails.eventEnded}</Text>
            </View>
          )}

          {isFarmer && !event.is_past && !event.is_cancelled && (
            <View style={styles.actionContainer}>
              {isRegistered ? (
                <>
                  <View style={styles.registeredBadge}>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#00822C" />
                    <Text style={styles.registeredText}>
                      {t.eventDetails.youAre} {userStatus}
                    </Text>
                  </View>
                  <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity
                      style={[styles.button, styles.unregisterButton]}
                      onPress={handleUnregister}
                      disabled={actionLoading}
                      activeOpacity={0.8}
                    >
                      {actionLoading ? (
                        <ActivityIndicator color="#FFF" />
                      ) : (
                        <Text style={styles.buttonText}>{t.eventDetails.unregister}</Text>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                </>
              ) : (
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={handleRegister}
                    disabled={actionLoading}
                    activeOpacity={0.8}
                  >
                    {actionLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <>
                        <MaterialCommunityIcons name="hand-wave" size={20} color="#FFF" />
                        <Text style={styles.buttonText}>{t.eventDetails.registerInterest}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
          )}

          {!isFarmer && (
            <View style={styles.officerNote}>
              <MaterialCommunityIcons name="information-outline" size={20} color="#666" />
              <Text style={styles.officerNoteText}>
                {t.eventDetails.viewAttendeeList}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    bottomSafeArea: {
      backgroundColor: '#FFF',
    },
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA' 
  },
  safeArea: {
    backgroundColor: '#FFF',
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#F5F5F7', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#000' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F5F7FA' 
  },
  loadingText: { 
    marginTop: 16, 
    fontSize: 16, 
    color: '#666' 
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#F5F7FA' 
  },
  errorText: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#333', 
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center' 
  },
  errorSubtext: { 
    fontSize: 14, 
    color: '#999', 
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  backButtonError: { 
    marginTop: 20, 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    backgroundColor: '#00822C', 
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#00822C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  content: { 
    paddingBottom: 20 
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  eventDetailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  card: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 24, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 12, 
    elevation: 8 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1a1a1a', 
    marginBottom: 20,
    lineHeight: 36,
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 14,
    paddingLeft: 4,
  },
  infoText: { 
    fontSize: 16, 
    color: '#444', 
    marginLeft: 14, 
    flex: 1,
    lineHeight: 22,
    fontWeight: '500',
  },
  divider: { 
    height: 1, 
    backgroundColor: '#E8E8E8', 
    marginVertical: 24 
  },
  descriptionLabel: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 10 
  },
  description: { 
    fontSize: 16, 
    color: '#555', 
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  cancelledBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFEBEE', 
    borderRadius: 12, 
    padding: 16, 
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  cancelledText: { 
    color: '#f44336', 
    fontSize: 16, 
    fontWeight: '600', 
    marginLeft: 12,
    flex: 1,
  },
  pastBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    borderRadius: 12, 
    padding: 16, 
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#999',
  },
  pastText: { 
    color: '#666', 
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
  actionContainer: { 
    marginTop: 28 
  },
  registeredBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#E8F5E9', 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#00822C20',
  },
  registeredText: { 
    fontSize: 16, 
    color: '#00822C', 
    fontWeight: '700', 
    marginLeft: 8, 
    textTransform: 'capitalize' 
  },
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 16, 
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  registerButton: { 
    backgroundColor: '#00822C' 
  },
  unregisterButton: { 
    backgroundColor: '#f44336' 
  },
  buttonText: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#FFF', 
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  officerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  officerNoteText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
});