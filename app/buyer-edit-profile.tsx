import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { updateProfile, ApiError } from '../services/api';

const BuyerEditProfileScreen = () => {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessRegNumber, setBusinessRegNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (user) {
      // Phone number from top level
      setPhoneNumber(user.phone_number || '');

      // Try to get name from AsyncStorage (stored during signup)
      try {
        const userDataString = await AsyncStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          // buyer_profile may have name from signup
          const buyerName = userData?.buyer_profile?.name || userData?.name || '';
          setName(buyerName);
          setCompanyName(userData?.buyer_profile?.company_name || '');
          setBusinessRegNumber(userData?.buyer_profile?.business_reg_number || '');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to user object
        if (user.buyer_profile) {
          setCompanyName(user.buyer_profile.company_name || '');
          setBusinessRegNumber(user.buyer_profile.business_reg_number || '');
        }
      }
    }
  };

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert(t.common.error, t.auth.enterFullName);
      return false;
    }
    if (!companyName.trim()) {
      Alert.alert(t.common.error, t.auth.enterFullName);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      // Backend expects 'buyer_profile' key with snake_case fields
      const profileData = {
        buyer_profile: {
          name: name.trim(),
          company_name: companyName.trim(),
        },
      };

      console.log('Updating buyer profile with data:', JSON.stringify(profileData, null, 2));

      const updatedUser = await updateProfile(profileData);

      console.log('Profile updated successfully:', JSON.stringify(updatedUser, null, 2));

      // Save updated user to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      // Update context
      await updateUser(updatedUser);

      Alert.alert(t.common.success, t.auth.profileUpdateSuccess, [
        { text: t.common.ok, onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      let errorMessage = t.auth.failedToUpdateProfile;

      if (error instanceof ApiError) {
        if (error.status === 401) {
          errorMessage = t.auth.sessionExpired;
          router.push('/(auth)/signin' as any);
        } else if (error.status === 400) {
          errorMessage = error.message || t.auth.invalidData;
        } else if (error.status === 404) {
          errorMessage = t.auth.profileNotFound;
        } else if (error.status === 500) {
          errorMessage = t.auth.serverError;
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert(t.common.error, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(t.auth.discardChanges, t.auth.discardChangesMessage, [
      { text: t.auth.continueEditing, style: 'cancel' },
      { text: t.common.discard, style: 'destructive', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <MaterialCommunityIcons name="close" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.settings.editProfile}</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#1565C0" />
          ) : (
            <MaterialCommunityIcons name="check" size={24} color="#1565C0" />
          )}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons name="account-circle" size={100} color="#1565C0" />
              <TouchableOpacity style={styles.editAvatarButton}>
                <MaterialCommunityIcons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>{t.auth.changePhoto}</Text>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.auth.personalInformation}</Text>

            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {t.auth.fullName} <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="#7F8C8D"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder={t.auth.fullNamePlaceholder}
                  placeholderTextColor="#BDC3C7"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Phone Number (Read-only) */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.auth.phoneNumber}</Text>
              <View style={[styles.inputWrapper, styles.disabledInput]}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={20}
                  color="#BDC3C7"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.disabledText]}
                  value={phoneNumber}
                  editable={false}
                  placeholderTextColor="#BDC3C7"
                />
              </View>
              <Text style={styles.helperText}>{t.auth.phoneNumberCannotBeChanged}</Text>
            </View>
          </View>

          {/* Business Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.auth.farmInformation}</Text>

            {/* Company Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {t.auth.companyName} <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="office-building-outline"
                  size={20}
                  color="#7F8C8D"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={companyName}
                  onChangeText={setCompanyName}
                  placeholder={t.auth.companyNamePlaceholder}
                  placeholderTextColor="#BDC3C7"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Business Registration Number (Read-only) */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.auth.businessRegNumber}</Text>
              <View style={[styles.inputWrapper, styles.disabledInput]}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={20}
                  color="#BDC3C7"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.disabledText]}
                  value={businessRegNumber}
                  editable={false}
                  placeholderTextColor="#BDC3C7"
                />
              </View>
              <Text style={styles.helperText}>{t.auth.phoneNumberCannotBeChanged}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.footerNote}>
              <Text style={styles.required}>*</Text> {t.auth.requiredFields}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerButton: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1565C0',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F5F7FA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#1565C0',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  required: {
    color: '#E74C3C',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50',
    paddingVertical: 14,
    letterSpacing: 0.2,
  },
  disabledInput: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E0E0E0',
  },
  disabledText: {
    color: '#95A5A6',
  },
  helperText: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 6,
    marginLeft: 4,
    fontStyle: 'italic',
  },
  footerNote: {
    fontSize: 13,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 0.2,
  },
});

export default BuyerEditProfileScreen;
