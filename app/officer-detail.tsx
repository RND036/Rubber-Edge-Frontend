import { authAPI, User } from '@/services/api';
import { createOrGetConversation } from '@/config/chatApi';
import { useAuth } from '@/context/AuthContext'; // <-- ADDED: Get current farmer info
import { useLanguage } from '@/context/LanguageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OfficerDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userId = params.userId;
  const { user } = useAuth(); // <-- ADDED: Get logged-in farmer
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [officer, setOfficer] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simple fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const fetchOfficer = async () => {
      try {
        const response = await authAPI.getOfficers();
        const found = response.officers.find((o) => o.id.toString() === userId);
        setOfficer(found || null);
      } catch (e) {
        Alert.alert(t.common.error, t.officerDetail.failedToLoadOfficerDetails);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficer();
  }, [userId]);

  useEffect(() => {
    if (!loading && officer) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, officer]);

  const handleCall = () => {
    if (officer?.phone_number) {
      Linking.openURL(`tel:${officer.phone_number}`);
    }
  };

  // ✅ UPDATED: Pass all necessary chat params
  const handleChat = async () => {
    if (!officer) return;
    try {
      const res = await createOrGetConversation(officer.id);
      console.log('CONVERSATION RES (farmer->officer)', res.data);
      const conversationId = res.data.id;
      
      // Navigate with full context
      router.push({
        pathname: '/chat',
        params: {
          conversationId: String(conversationId),
          farmerId: String(user?.id || ''),
          farmerName: user?.name || user?.phone_number || 'Farmer',
          officerId: String(officer.id),
          officerName: officer.officer_profile?.name || officer.name || officer.phone_number || 'Officer',
        },
      });
    } catch (e: any) {
      console.log('Error starting chat', e?.response?.data || e);
      Alert.alert(t.common.error, t.officerDetail.failedToStartChat);
    }
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
          <Text style={styles.headerTitle}>{t.officerDetail.headerTitle}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E74C3C" />
          <Text style={styles.loadingText}>{t.officerDetail.loadingOfficerDetails}</Text>
        </View>
      </View>
    );
  }

  if (!officer) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.officerDetail.headerTitle}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="account-off-outline" size={64} color="#CBD5E1" />
          <Text style={styles.errorText}>{t.officerDetail.officerNotFound}</Text>
        </View>
      </View>
    );
  }

  const { officer_profile } = officer;

  const infoItems = [
    { icon: 'phone-outline', label: t.officerDetail.phone, value: officer.phone_number },
    { icon: 'badge-account-outline', label: t.officerDetail.employeeId, value: officer_profile?.employee_id || '-' },
    { icon: 'office-building-outline', label: t.officerDetail.department, value: officer_profile?.department || 'Support Team' },
    { icon: 'shield-account-outline', label: t.officerDetail.role, value: officer.role },
    { icon: 'check-circle-outline', label: t.officerDetail.verified, value: officer.is_verified ? t.officerDetail.yes : t.officerDetail.no },
    {
      icon: 'calendar-outline',
      label: t.officerDetail.joined,
      value: officer.created_at ? new Date(officer.created_at).toLocaleDateString() : '-',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.officerDetail.headerTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Content */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons name="account-tie" size={48} color="#E74C3C" />
            </View>
            <Text style={styles.officerName}>
              {officer_profile?.name || officer.name || officer.phone_number || 'Officer'}
            </Text>
            <View style={styles.departmentBadge}>
              <Text style={styles.departmentText}>
                {officer_profile?.department || 'Support Team'}
              </Text>
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.card}>
            {infoItems.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.infoItem,
                  index === infoItems.length - 1 && styles.infoItemLast,
                ]}
              >
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name={item.icon as any} size={20} color="#E74C3C" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={handleCall}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="phone" size={20} color="#fff" />
              <Text style={styles.buttonText}>{t.officerDetail.callOfficer}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatButton}
              onPress={handleChat}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="chat" size={20} color="#E74C3C" />
              <Text style={styles.chatButtonText}>{t.officerDetail.startChat}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
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
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#E74C3C',
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
    elevation: 3,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FEE2E2',
  },
  officerName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  departmentBadge: {
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  departmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E74C3C',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 12,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.2,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 8,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  chatButtonText: {
    color: '#E74C3C',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.2,
  },
});