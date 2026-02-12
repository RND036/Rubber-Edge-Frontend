// OfficerSettings.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../context/translations';

const { width } = Dimensions.get('window');

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  type: 'navigation' | 'action';
  onPress?: () => void;
}

const SettingCard = ({ 
  item, 
  index 
}: { 
  item: SettingItem; 
  index: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 80,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 80,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.96,
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

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: Animated.multiply(scaleAnim, pressAnim) },
        ],
      }}
    >
      <TouchableOpacity
        style={styles.settingCard}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={item.onPress}
        activeOpacity={0.9}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
          <View style={[styles.iconGlow, { backgroundColor: item.color + '20' }]} />
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>

        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>

        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ProfileHeader = ({ t }: { t: any }) => {
  const { user } = useAuth();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
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
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [user]);

  const userName = (() => {
    if (user?.officer_profile?.name && user.officer_profile.name.trim() !== '') {
      return user.officer_profile.name;
    }
    if (user?.name && user.name.trim() !== '') {
      return user.name;
    }
    if (user?.farmer_profile?.nic_number) {
      return `Farmer ${user.farmer_profile.nic_number}`;
    }
    if (user?.buyer_profile?.company_name) {
      return user.buyer_profile.company_name;
    }
    return t.settings.officer;
  })();

  const phoneNumber = (() => {
    if (user?.phone_number && user.phone_number.trim() !== '') {
      return user.phone_number;
    }
    return t.settings.noPhoneNumber;
  })();

  const userRole = (() => {
    if (user?.role) {
      return user.role.charAt(0).toUpperCase() + user.role.slice(1);
    }
    return t.settings.officer;
  })();

  const handleEditProfile = () => {
    router.push('/edit-officer-profile');
  };

  return (
    <Animated.View
      style={[
        styles.profileHeader,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#FFF" />
        </View>
        <View style={styles.avatarBadge}>
          <Ionicons name="shield-checkmark" size={16} color="#FFF" />
        </View>
      </View>
      
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profilePhone}>{phoneNumber}</Text>
        <Text style={styles.profileRole}>{userRole}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.editButton} 
        activeOpacity={0.8}
        onPress={handleEditProfile}
      >
        <Ionicons name="create-outline" size={20} color="#3B82F6" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const BackgroundGradient = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const opacity1 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 0.25],
  });

  const opacity2 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.2],
  });

  return (
    <View style={styles.backgroundGradient}>
      <Animated.View style={[styles.gradientCircle1, { opacity: opacity1 }]} />
      <Animated.View style={[styles.gradientCircle2, { opacity: opacity2 }]} />
    </View>
  );
};

export default function OfficerSettings() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    if (user && user.role !== 'officer') {
      Alert.alert(t.settings.accessDenied, t.settings.accessDeniedMessage);
      router.back();
    }
  }, [user, t]);

  const handleLogout = () => {
    Alert.alert(
      t.settings.logoutTitle,
      t.settings.logoutConfirm,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.common.logout,
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/(auth)/signin');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert(t.common.error, 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t.settings.deleteAccount,
      t.settings.deleteAccountWarning,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.common.delete,
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              t.settings.deleteAccount,
              t.settings.deleteAccountFinal,
              [
                { text: t.common.cancel, style: 'cancel' },
                {
                  text: t.settings.deleteForever,
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await AsyncStorage.clear();
                      Alert.alert(t.common.success, t.settings.accountDeleted);
                      router.replace('/(auth)/signin');
                    } catch (error) {
                      console.error('Delete account error:', error);
                      Alert.alert(t.common.error, 'Failed to delete account. Please try again or contact support.');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleLanguageChange = async (lang: Language) => {
    await setLanguage(lang);
    setShowLanguageSelector(false);
    const langName = lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்';
    Alert.alert(t.common.success, `Language changed to ${langName}`);
  };

  const RadioButton = ({ 
    selected, 
    onPress 
  }: { 
    selected: boolean; 
    onPress: () => void 
  }) => (
    <Pressable 
      style={[
        styles.radioButton, 
        selected && styles.radioButtonSelected
      ]}
      onPress={onPress}
    >
      {selected && (
        <View style={styles.radioButtonInner} />
      )}
    </Pressable>
  );

  const LanguageSelectorModal = () => (
    <>
      {showLanguageSelector && (
        <View style={styles.modalOverlay}>
          <Pressable 
            style={styles.modalBackdrop}
            onPress={() => setShowLanguageSelector(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.settings.selectLanguage}</Text>
            
            <View style={styles.languageOptions}>
              {/* English */}
              <Pressable 
                style={styles.languageOption}
                onPress={() => handleLanguageChange('en')}
              >
                <RadioButton 
                  selected={language === 'en'}
                  onPress={() => handleLanguageChange('en')}
                />
                <View style={styles.languageLabel}>
                  <Text style={styles.languageTitle}>English</Text>
                  <Text style={styles.languageNative}>English</Text>
                </View>
              </Pressable>

              {/* Sinhala */}
              <Pressable 
                style={styles.languageOption}
                onPress={() => handleLanguageChange('si')}
              >
                <RadioButton 
                  selected={language === 'si'}
                  onPress={() => handleLanguageChange('si')}
                />
                <View style={styles.languageLabel}>
                  <Text style={styles.languageTitle}>සිංහල</Text>
                  <Text style={styles.languageNative}>Sinhala</Text>
                </View>
              </Pressable>

              {/* Tamil */}
              <Pressable 
                style={styles.languageOption}
                onPress={() => handleLanguageChange('ta')}
              >
                <RadioButton 
                  selected={language === 'ta'}
                  onPress={() => handleLanguageChange('ta')}
                />
                <View style={styles.languageLabel}>
                  <Text style={styles.languageTitle}>தமிழ்</Text>
                  <Text style={styles.languageNative}>Tamil</Text>
                </View>
              </Pressable>
            </View>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowLanguageSelector(false)}
            >
              <Text style={styles.closeButtonText}>{t.common.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );

  const accountSettings: SettingItem[] = [
    {
      id: '1',
      title: t.settings.editProfile,
      subtitle: t.settings.editProfileSubtitle,
      icon: 'person-outline',
      color: '#3B82F6',
      type: 'navigation',
      onPress: () => router.push('/edit-officer-profile'),
    },
    {
      id: '2',
      title: t.settings.language,
      subtitle: language === 'en' ? 'English' : language === 'si' ? 'සිංහල' : 'தமிழ்',
      icon: 'language-outline',
      color: '#10B981',
      type: 'navigation',
      onPress: () => setShowLanguageSelector(true),
    },
  ];

  const blockchainSettings: SettingItem[] = [
    {
      id: 'bc1',
      title: t.settings.walletSettings,
      subtitle: t.settings.walletSettingsSubtitle,
      icon: 'wallet-outline',
      color: '#8B5CF6',
      type: 'navigation',
      onPress: () => router.push('/wallet-settings'),
    },
    {
      id: 'bc2',
      title: t.settings.blockchainHistory,
      subtitle: t.settings.blockchainHistorySubtitle,
      icon: 'time-outline',
      color: '#3B82F6',
      type: 'navigation',
      onPress: () => router.push('/blockchain-history'),
    },
    {
      id: 'bc3',
      title: t.settings.verifyTransaction,
      subtitle: t.settings.verifyTransactionSubtitle,
      icon: 'shield-checkmark-outline',
      color: '#10B981',
      type: 'navigation',
      onPress: () => router.push('/verify-transaction'),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: '3',
      title: t.settings.helpCenter,
      subtitle: t.settings.helpCenterSubtitle,
      icon: 'help-circle-outline',
      color: '#06B6D4',
      type: 'navigation',
      onPress: () => router.push('/help&support'),
    },
    {
      id: '4',
      title: t.settings.aboutApp,
      subtitle: t.settings.aboutAppSubtitle,
      icon: 'information-circle-outline',
      color: '#8B5CF6',
      type: 'navigation',
      onPress: () => router.push('/aboutapp'),
    },
    {
      id: '5',
      title: t.settings.termsOfService,
      subtitle: t.settings.termsOfService,
      icon: 'document-text-outline',
      color: '#F59E0B',
      type: 'navigation',
      onPress: () => router.push('/terms&serivces'),
    },
    {
      id: '6',
      title: t.settings.privacyPolicy,
      subtitle: t.settings.privacyPolicy,
      icon: 'shield-checkmark-outline',
      color: '#64748B',
      type: 'navigation',
      onPress: () => router.push('/privacypolicy'),
    },
  ];

  const dangerSettings: SettingItem[] = [
    {
      id: '7',
      title: t.settings.deleteAccount,
      subtitle: t.settings.deleteAccountConfirm,
      icon: 'trash-outline',
      color: '#DC2626',
      type: 'action',
      onPress: handleDeleteAccount,
    },
    {
      id: '8',
      title: t.common.logout,
      subtitle: t.settings.logoutConfirm,
      icon: 'log-out-outline',
      color: '#EF4444',
      type: 'action',
      onPress: handleLogout,
    },
  ];

  if (!user || user.role !== 'officer') {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
      <BackgroundGradient />
      <LanguageSelectorModal />
      
      <ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
      >
        <ProfileHeader t={t} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.account}</Text>
          {accountSettings.map((item, index) => (
            <SettingCard key={item.id} item={item} index={index} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.blockchain}</Text>
          {blockchainSettings.map((item, index) => (
            <SettingCard key={item.id} item={item} index={index + accountSettings.length} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.supportAndAbout}</Text>
          {supportSettings.map((item, index) => (
            <SettingCard 
              key={item.id} 
              item={item} 
              index={index + accountSettings.length} 
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.dangerZone}</Text>
          {dangerSettings.map((item, index) => (
            <SettingCard 
              key={item.id} 
              item={item} 
              index={index + accountSettings.length + supportSettings.length} 
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Rubber Edge</Text>
          <Text style={styles.footerVersion}>{t.settings.aboutAppSubtitle}</Text>
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
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientCircle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#3B82F6',
    top: -200,
    right: -150,
  },
  gradientCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#10B981',
    bottom: -100,
    left: -100,
  },
  scrollContent: {
    paddingTop: 20,
  },
  profileHeader: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  profilePhone: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#3B82F615',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  settingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  iconGlow: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 14,
    opacity: 0.5,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 16,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 20,
  },
  // Language Selector Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 34,
    zIndex: 1001,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 24,
    textAlign: 'center',
  },
  languageOptions: {
    marginBottom: 24,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  languageLabel: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 13,
    color: '#64748B',
  },
  closeButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
});
