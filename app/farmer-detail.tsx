import { Farmer } from '@/services/api';
import { createOrGetConversation } from '@/config/chatApi';
import { useAuth } from '@/context/AuthContext'; // <-- ADDED: Get current officer info
import { useLanguage } from '@/context/LanguageContext'; // <-- ADDED: Get language context
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function FarmerDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const farmer = params as unknown as Farmer;
  const { user } = useAuth(); // <-- ADDED: Get logged-in officer
  const { t } = useLanguage(); // <-- ADDED: Get translations

  // Simple fade and slide animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
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
  }, []);

  const handleCall = () => {
    Linking.openURL(`tel:${farmer.phone_number}`);
  };

  // ✅ UPDATED: Pass all necessary chat params
  const handleChat = async () => {
    try {
      const res = await createOrGetConversation(farmer.id);
      console.log('CONVERSATION RES (officer->farmer)', res.data);
      const conversationId = res.data.id;
      
      // Navigate with full context
      router.push({
        pathname: '/chat',
        params: {
          conversationId: String(conversationId),
          farmerId: String(farmer.id),
          farmerName: farmer.name,
          officerId: String(user?.id || ''),
          officerName: user?.name || user?.phone_number || 'Officer',
        },
      });
    } catch (e: any) {
      console.log('Error starting chat', e?.response?.data || e);
    }
  };

  const infoItems = [
    { icon: 'call-outline', label: t.auth.phoneNumber, value: farmer.phone_number },
    { icon: 'card-outline', label: t.auth.nicNumber, value: farmer.nic_number },
    { icon: 'location-outline', label: t.auth.farmLocation, value: farmer.farm_location },
    { icon: 'navigate-outline', label: t.auth.district, value: farmer.district },
    {
      icon: 'resize-outline',
      label: t.auth.landArea,
      value: `${farmer.land_area_hectares} hectares`,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.officerDetail.headerTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
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
              <Ionicons name="person" size={48} color="#10B981" />
            </View>
            <Text style={styles.farmerName}>{farmer.name}</Text>
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
                  <Ionicons name={item.icon as any} size={20} color="#10B981" />
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
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.buttonText}>{t.officerDetail.callOfficer}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatButton}
              onPress={handleChat}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubble-ellipses" size={20} color="#10B981" />
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
    backgroundColor: '#10B98115',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#10B98130',
  },
  farmerName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.5,
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
    backgroundColor: '#10B98110',
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
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#10B981',
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
    borderColor: '#10B981',
  },
  chatButtonText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.2,
  },
});