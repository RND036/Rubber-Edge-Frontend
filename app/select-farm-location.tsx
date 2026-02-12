import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  StatusBar, 
  Platform,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Keyboard
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { updateProfile } from '../services/api';

const INITIAL_REGION = {
  latitude: 7.8731,
  longitude: 80.7718,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
};

type LatLng = {
  latitude: number;
  longitude: number;
};

type SearchResult = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

const SelectFarmLocationScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [region, setRegion] = useState(INITIAL_REGION);
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState(false);

  // Load existing farm location on mount
  useEffect(() => {
    loadExistingLocation();
  }, []);

  const loadExistingLocation = async () => {
    try {
      setInitialLoading(true);
      const userDataString = await AsyncStorage.getItem('user');
      
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        
        // Check if farm_location exists and is valid
        if (userData.farmer_profile?.farm_location) {
          const location = userData.farmer_profile.farm_location;
          
          // Handle both string and object formats
          let locationData: LatLng | null = null;
          
          if (typeof location === 'string') {
            // Try parsing if it's a JSON string
            try {
              locationData = JSON.parse(location);
            } catch {
              // If parsing fails, it might be a coordinate string like "7.8731,80.7718"
              const parts = location.split(',').map(s => parseFloat(s.trim()));
              if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                locationData = { latitude: parts[0], longitude: parts[1] };
              }
            }
          } else if (location.latitude && location.longitude) {
            // Already in correct format
            locationData = {
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude)
            };
          }

          if (locationData && !isNaN(locationData.latitude) && !isNaN(locationData.longitude)) {
            setMarker(locationData);
            
            const newRegion = {
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            };
            setRegion(newRegion);
            
            // Animate to the saved location after a short delay
            setTimeout(() => {
              mapRef.current?.animateToRegion(newRegion, 1000);
            }, 500);
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing location:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  // Debounced search with proper error handling
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.length > 2) {
        setSearchLoading(true);
        setSearchError(false);
        
        fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `format=json&` +
          `q=${encodeURIComponent(query)}&` +
          `countrycodes=lk&` +
          `limit=8&` +
          `addressdetails=1`,
          {
            headers: {
              'User-Agent': 'FarmApp/1.0'
            }
          }
        )
          .then(res => {
            if (!res.ok) throw new Error('Search failed');
            return res.json();
          })
          .then(data => {
            setResults(data || []);
            setSearchLoading(false);
          })
          .catch((error) => {
            console.error('Search error:', error);
            setResults([]);
            setSearchLoading(false);
            setSearchError(true);
          });
      } else {
        setResults([]);
        setSearchLoading(false);
      }
    }, 600); // Debounce delay

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSelect = (item: SearchResult) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    
    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert('Error', 'Invalid location coordinates');
      return;
    }

    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    
    setRegion(newRegion);
    setMarker({ latitude: lat, longitude: lng });
    mapRef.current?.animateToRegion(newRegion, 1000);
    setQuery(item.display_name);
    setShowResults(false);
    Keyboard.dismiss();
  };

  const handleMapPress = (e: MapPressEvent) => {
    setMarker(e.nativeEvent.coordinate);
    setShowResults(false);
  };

  const handleSave = async () => {
    if (!marker) {
      Alert.alert(t.farmLocation?.locationRequired, t.farmLocation?.selectLocationMessage);
      return;
    }

    setLoading(true);
    try {
      // Send farm_location to backend
      const profileData = {
        farmer_profile: {
          farm_location: query
        }
      };
      const updatedUser = await updateProfile(profileData);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      await updateUser(updatedUser);
      Alert.alert(
        t.common.success,
        t.farmLocation?.updateSuccess,
        [{ text: t.common.ok, onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert(t.common.error, t.farmLocation?.updateError);
      console.error('Save location error:', error);
    } finally {
      setLoading(false);
    }
  };

  const zoomIn = () => {
    if (region.latitudeDelta > 0.01) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 300);
    }
  };

  const zoomOut = () => {
    if (region.latitudeDelta < 10) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 300);
    }
  };

  const resetToCurrentLocation = () => {
    if (marker) {
      const newRegion = {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  // Show loading screen while fetching initial location
  if (initialLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
        <View style={[styles.loadingContainer, { paddingTop: insets.top + 16 }]}>
          <ActivityIndicator size="large" color="#00822C" />
          <Text style={styles.loadingText}>{t.farmLocation?.loading || 'Loading farm location...'}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{t.auth.farmLocation}</Text>
          <Text style={styles.subtitle}>
            {marker ? t.farmLocation?.updateYourLocation : t.farmLocation?.pinOnMap}
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              setShowResults(true);
            }}
            placeholder={t.farmLocation?.searchPlaceholder}
            placeholderTextColor="#999"
            onFocus={() => setShowResults(true)}
            returnKeyType="search"
          />
          {searchLoading && (
            <ActivityIndicator size="small" color="#00822C" />
          )}
          {query.length > 0 && !searchLoading && (
            <TouchableOpacity 
              onPress={() => {
                setQuery('');
                setResults([]);
                setShowResults(false);
              }}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search Results */}
        {showResults && results.length > 0 && (
          <ScrollView 
            style={styles.resultsContainer}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            {results.map((item) => (
              <TouchableOpacity
                key={item.place_id}
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.resultIcon}>📍</Text>
                <Text style={styles.resultText} numberOfLines={2}>
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {showResults && query.length > 2 && results.length === 0 && !searchLoading && (
          <View style={styles.resultsContainer}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {searchError ? t.farmLocation?.searchUnavailable : t.farmLocation?.noLocationsFound}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {searchError ? t.farmLocation?.checkInternet : t.farmLocation?.tryDifferentTerm}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Instructions */}
      {!marker && (
        <View style={styles.instructionBanner}>
          <Text style={styles.instructionText}>
            {t.farmLocation?.instruction}
          </Text>
        </View>
      )}

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={INITIAL_REGION}
          region={region}
          onPress={handleMapPress}
          provider={Platform.OS === 'android' ? 'google' : undefined}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass
        >
          {marker && (
            <Marker 
              coordinate={marker}
              title="Your Farm"
              description="Farm Location"
              pinColor="#00822C"
            />
          )}
        </MapView>

        {/* Zoom Controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Text style={styles.zoomButtonText}>−</Text>
          </TouchableOpacity>
        </View>

        {/* Recenter Button */}
        {marker && (
          <TouchableOpacity 
            style={styles.recenterButton} 
            onPress={resetToCurrentLocation}
          >
            <Text style={styles.recenterIcon}>🎯</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Selected Location Info */}
      {marker && (
        <View style={styles.locationInfo}>
          <View style={styles.locationInfoHeader}>
            <Text style={styles.locationInfoIcon}>✓</Text>
            <Text style={styles.locationInfoTitle}>{t.farmLocation?.locationSelected}</Text>
          </View>
          <Text style={styles.locationInfoCoords}>
            Lat: {marker.latitude.toFixed(6)}, Lng: {marker.longitude.toFixed(6)}
          </Text>
        </View>
      )}

      {/* Save Button */}
      <TouchableOpacity 
        style={[styles.saveButton, !marker && styles.saveButtonDisabled]} 
        onPress={handleSave} 
        disabled={loading || !marker}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.saveButtonText}>{t.farmLocation?.saveButton}</Text>
            {marker && <Text style={styles.saveButtonIcon}>→</Text>}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 28,
    color: '#00822C',
    fontWeight: '300',
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    paddingVertical: 0,
  },
  clearButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  resultsContainer: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  resultText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  instructionBanner: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#00822C',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  map: {
    flex: 1,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  zoomButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButtonText: {
    fontSize: 24,
    color: '#374151',
    fontWeight: '400',
  },
  zoomDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  recenterButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  recenterIcon: {
    fontSize: 20,
  },
  locationInfo: {
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  locationInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationInfoIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#059669',
  },
  locationInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
  },
  locationInfoCoords: {
    fontSize: 12,
    color: '#047857',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  saveButton: {
    backgroundColor: '#00822C',
    paddingVertical: 16,
    margin: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00822C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  saveButtonIcon: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 8,
    fontWeight: '300',
  },
});

export default SelectFarmLocationScreen;