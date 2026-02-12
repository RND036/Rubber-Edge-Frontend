import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../context/translations';

export default function BuyerSettings() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const insets = useSafeAreaInsets();

  // Profile state
  const [profileName, setProfileName] = useState(t.settings.buyer);
  const [profilePhone, setProfilePhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, [user]);

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [user])
  );

  const loadUserData = async () => {
    try {
      // First try from AuthContext user
      if (user) {
        // Check buyer_profile for name (stored during signup)
        const userDataString = await AsyncStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          // buyer_profile may have name from signup
          const buyerName = userData?.buyer_profile?.name || userData?.name || user?.phone_number || t.settings.buyer;
          setProfileName(buyerName);
          setCompanyName(userData?.buyer_profile?.company_name || '');
        } else {
          setProfileName(user?.name || user?.phone_number || t.settings.buyer);
          setCompanyName(user?.buyer_profile?.company_name || '');
        }
        setProfilePhone(user?.phone_number || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(t.settings.logoutTitle, t.settings.logoutConfirm, [
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
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t.settings.deleteAccount,
      t.settings.deleteAccountConfirm,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.common.delete,
          style: 'destructive',
          onPress: () => {
            console.log('Account deleted');
            // Add your delete account logic here
          },
        },
      ]
    );
  };

  const handleLanguageChange = async (lang: Language) => {
    await setLanguage(lang);
    setShowLanguageSelector(false);
    const langName = lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்';
    Alert.alert('Success', `Language changed to ${langName}`);
  };

  const SettingItem = ({
    icon,
    iconColor,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
  }: {
    icon: string;
    iconColor: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress && !rightComponent}
    >
      <View style={[styles.settingIconContainer, { backgroundColor: `${iconColor}15` }]}>
        <MaterialCommunityIcons name={icon as any} size={22} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent
        ? rightComponent
        : showArrow && <MaterialCommunityIcons name="chevron-right" size={24} color="#BDC3C7" />}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

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
                  <Text style={styles.languageSubtitle}>English</Text>
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
                  <Text style={styles.languageSubtitle}>Sinhala</Text>
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
                  <Text style={styles.languageSubtitle}>Tamil</Text>
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account-circle" size={60} color="#1565C0" />
          </View>
          <View style={styles.profileInfo}>
            {companyName ? (
              <Text style={styles.profileName}>{companyName}</Text>
            ) : null}
            <View style={styles.profileRow}>
              <MaterialCommunityIcons name="account" size={16} color="#7F8C8D" />
              <Text style={styles.profileSubtext}>{profileName}</Text>
            </View>
            {profilePhone ? (
              <View style={styles.profileRow}>
                <MaterialCommunityIcons name="phone" size={16} color="#7F8C8D" />
                <Text style={styles.profileSubtext}>{profilePhone}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Account Settings */}
        <SectionHeader title={t.settings.account} />
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="account-outline"
            iconColor="#1565C0"
            title={t.settings.editProfile}
            subtitle={t.settings.editProfileSubtitle}
            onPress={() => router.push('/buyer-edit-profile')}
          />
        </View>

        {/* App Settings */}
        <SectionHeader title={t.settings.preferences} />
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="translate"
            iconColor="#1ABC9C"
            title={t.settings.language}
            subtitle={language === 'en' ? 'English' : language === 'si' ? 'සිංහල' : 'தமிழ்'}
            onPress={() => setShowLanguageSelector(true)}
          />
        </View>

        {/* Blockchain Section */}
        <SectionHeader title={t.settings.blockchain} />
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="wallet-outline"
            iconColor="#8B5CF6"
            title={t.settings.walletSettings}
            subtitle={t.settings.walletSettingsSubtitle}
            onPress={() => router.push('/wallet-settings')}
          />
          <SettingItem
            icon="history"
            iconColor="#3B82F6"
            title={t.settings.blockchainHistory}
            subtitle={t.settings.blockchainHistorySubtitle}
            onPress={() => router.push('/blockchain-history')}
          />
          <SettingItem
            icon="shield-check"
            iconColor="#10B981"
            title={t.settings.verifyTransaction}
            subtitle={t.settings.verifyTransactionSubtitle}
            onPress={() => router.push('/verify-transaction')}
          />
        </View>

        {/* Support & About */}
        <SectionHeader title={t.settings.supportAndAbout} />
        <View style={styles.settingsGroup}>
          <SettingItem
            icon="help-circle-outline"
            iconColor="#9B59B6"
            title={t.settings.helpCenter}
            subtitle={t.settings.helpCenterSubtitle}
            onPress={() => router.push('/help&support')}
          />
          <SettingItem
            icon="file-document-outline"
            iconColor="#7F8C8D"
            title={t.settings.termsOfService}
            onPress={() => router.push('/terms&serivces')}
          />
          <SettingItem
            icon="shield-check-outline"
            iconColor="#1ABC9C"
            title={t.settings.privacyPolicy}
            onPress={() => router.push('/privacypolicy')}
          />
          <SettingItem
            icon="information-outline"
            iconColor="#3498DB"
            title={t.settings.aboutApp}
            subtitle={t.settings.aboutAppSubtitle}
            onPress={() => router.push('/aboutapp')}
          />
        </View>

        {/* Danger Zone */}
        <SectionHeader title={t.settings.dangerZone} />
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={22} color="#E74C3C" />
            <Text style={styles.logoutText}>{t.common.logout}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <MaterialCommunityIcons name="delete-outline" size={22} color="#E74C3C" />
            <Text style={styles.deleteText}>{t.settings.deleteAccount}</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>RubberEdge v1.0.0</Text>
          <Text style={styles.footerSubtext}>{t.settings.madeWithLoveRubber}</Text>
        </View>
      </ScrollView>

      {/* Language Selector Modal */}
      <LanguageSelectorModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  profileCompany: {
    fontSize: 14,
    color: '#1565C0',
    fontWeight: '500',
  },
  profileSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  profilePhone: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsGroup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#95A5A6',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#BDC3C7',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#BDC3C7',
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
    color: '#2C3E50',
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
    backgroundColor: '#F5F7FA',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonSelected: {
    borderColor: '#1565C0',
    backgroundColor: '#1565C0',
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
    color: '#2C3E50',
    marginBottom: 4,
  },
  languageSubtitle: {
    fontSize: 13,
    color: '#95A5A6',
  },
  closeButton: {
    backgroundColor: '#F5F7FA',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
});
