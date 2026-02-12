import { authAPI, User } from '@/services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';

export default function OfficerDirectory() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [officers, setOfficers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simple fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const fetchOfficers = async () => {
    try {
      const response = await authAPI.getOfficers();
      console.log('Officers fetched:', response.officers.length);
      setOfficers(response.officers || []);
    } catch (error: any) {
      console.error('Failed to load officers:', error);
      Alert.alert(
        t.common.error,
        error?.message || t.officerDirectory.failedToLoadOfficers,
        [{ text: t.common.ok }]
      );
      setOfficers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOfficers();
  };

  const handleOfficerPress = (officer: User) => {
    const officerName =
      officer.officer_profile?.name ||
      officer.name ||
      officer.officer_profile?.employee_id ||
      officer.phone_number ||
      'Officer';
    const department = officer.officer_profile?.department || 'Support Team';
    const phone = officer.phone_number || '';
    router.push({
      pathname: '/officer-detail',
      params: {
        userId: officer.id.toString(),
        name: officerName,
        department,
        phone,
      },
    });
  };

  const renderOfficerCard = ({ item }: { item: User }) => {
    const officerName =
      item.officer_profile?.name ||
      item.name ||
      item.officer_profile?.employee_id ||
      item.phone_number ||
      'Officer';
    const department = item.officer_profile?.department || 'Support Team';
    
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleOfficerPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="account-tie" size={26} color="#E74C3C" />
          </View>
          <View style={styles.officerInfo}>
            <Text style={styles.name} numberOfLines={1}>
              {officerName}
            </Text>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="office-building-outline" size={13} color="#64748B" />
              <Text style={styles.department} numberOfLines={1}>
                {department}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="phone-outline" size={13} color="#64748B" />
              <Text style={styles.phone} numberOfLines={1}>
                {item.phone_number}
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
        
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.officerDirectory.headerTitle}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E74C3C" />
          <Text style={styles.loadingText}>{t.officerDirectory.loadingOfficers}</Text>
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
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.officerDirectory.headerTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Info Banner */}
      {officers.length > 0 && (
        <View style={styles.infoBanner}>
          <MaterialCommunityIcons name="information-outline" size={20} color="#E74C3C" />
          <Text style={styles.infoBannerText}>
            {officers.length} {officers.length === 1 ? t.officerDirectory.officer : t.officerDirectory.officers} • {t.officerDirectory.tapToViewDetails}
          </Text>
        </View>
      )}

      {/* Animated List */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={officers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOfficerCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#E74C3C']}
              tintColor="#E74C3C"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <MaterialCommunityIcons
                  name="account-off-outline"
                  size={64}
                  color="#CBD5E1"
                />
              </View>
              <Text style={styles.emptyTitle}>{t.officerDirectory.noOfficersAvailable}</Text>
              <Text style={styles.emptyText}>
                {t.officerDirectory.noOfficersDesc}
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={onRefresh}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
                <Text style={styles.retryButtonText}>{t.officerDirectory.retry}</Text>
              </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  infoBannerText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
    flex: 1,
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  officerInfo: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  department: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
  },
  phone: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 20,
    gap: 8,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});