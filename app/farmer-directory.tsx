// app/farmer-directory.tsx
import { ApiError, authAPI, Farmer } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function FarmerDirectory() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simple fade animation for initial load
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await authAPI.getFarmers(searchQuery || undefined);
      setFarmers(response.farmers);
    } catch (error) {
      console.error('Error fetching farmers:', error);
      if (error instanceof ApiError) {
        if (error.status === 401) {
          Alert.alert('Session Expired', 'Please login again', [
            { text: 'OK', onPress: () => router.replace('/login' as any) }
          ]);
        } else if (error.status === 403) {
          Alert.alert('Access Denied', 'Only officers can view farmer directory', [
            { text: 'OK', onPress: () => router.back() }
          ]);
        } else {
          Alert.alert('Error', error.message);
        }
      } else {
        Alert.alert('Error', 'Failed to fetch farmers. Please check your connection.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchQuery === '') {
      setLoading(true);
      fetchFarmers();
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetchFarmers();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFarmers();
  }, [searchQuery]);

  const renderFarmerCard = ({ item, index }: { item: Farmer; index: number }) => (
    <TouchableOpacity
      style={styles.farmerCard}
      onPress={() => router.push({ pathname: '/farmer-detail', params: { ...item } })}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={24} color="#10B981" />
        </View>
        <View style={styles.farmerInfo}>
          <Text style={styles.farmerName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={13} color="#64748B" />
            <Text style={styles.farmerPhone} numberOfLines={1}>
              {item.phone_number}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={13} color="#64748B" />
            <Text style={styles.farmerLocation} numberOfLines={1}>
              {item.district}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder={t.farmerDirectory.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {farmers.length} {farmers.length === 1 ? t.farmerDirectory.farmer : t.farmerDirectory.farmers}
        </Text>
      </View>
    </>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
        
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.farmerDirectory.headerTitle}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>{t.farmerDirectory.loadingFarmers}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.farmerDirectory.headerTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Animated List */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={farmers}
          renderItem={renderFarmerCard}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={['#10B981']}
              tintColor="#10B981"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="people-outline" size={64} color="#CBD5E1" />
              </View>
              <Text style={styles.emptyText}>{t.farmerDirectory.noFarmersFound}</Text>
              <Text style={styles.emptySubtext}>
                {searchQuery ? t.farmerDirectory.tryAdjustingSearch : t.farmerDirectory.noFarmersDesc}
              </Text>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
  },
  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  listContainer: {
    paddingBottom: 20,
  },
  farmerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#10B98115',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  farmerInfo: {
    flex: 1,
    gap: 3,
  },
  farmerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  farmerPhone: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  farmerLocation: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});