// app/(officer)/edit-profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
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
import { updateProfile } from '../services/api';

// Type definitions matching your Django backend
interface OfficerProfile {
  name: string;
  employee_id: string;
  department: string;
}

interface User {
  id: number;
  phone_number: string;
  role: 'farmer' | 'buyer' | 'officer';
  is_verified: boolean;
  created_at: string;
  officer_profile?: OfficerProfile;
  farmer_profile?: any;
  buyer_profile?: any;
}

export default function EditProfile() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Form state - ONLY editable fields from OfficerProfileSerializer
  const [formData, setFormData] = useState({
    name: '',
    department: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Populate form with existing user data
    if (user) {
      setFormData({
        name: user.officer_profile?.name || '',
        department: user.officer_profile?.department || '',
      });
    }

    // Animate entrance
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = `${t.common.pleaseEnter} ${t.auth.fullName}`;
    }

    // Department is required
    if (!formData.department.trim()) {
      newErrors.department = `${t.common.pleaseEnter} ${t.auth.department}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Updating profile with data:', {
        officer_profile: {
          name: formData.name.trim(),
          department: formData.department.trim(),
        },
      });

      // Use the updateProfile function from api.ts
      const updatedUserData = await updateProfile({
        officer_profile: {
          name: formData.name.trim(),
          department: formData.department.trim(),
        },
      });

      console.log('Profile updated successfully:', updatedUserData);

      // Update user context with new data
      const updatedUser: User = {
        ...(user as User),
        ...updatedUserData,
      };

      // Update AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      // Update auth context
      if (updateUser) {
        updateUser(updatedUser);
      }

      Alert.alert(
        t.common.success,
        t.auth.profileUpdateSuccess,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert(
        t.common.error,
        error instanceof Error ? error.message : t.auth.failedToUpdateProfile
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.settings.editProfile}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Avatar Section - Display only */}
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={50} color="#FFF" />
              </View>
              <Text style={styles.avatarName}>{user?.officer_profile?.name || t.auth.officer}</Text>
            </View>

            {/* Read-only Information */}
            <View style={styles.readOnlySection}>
              {/* Employee ID (Read-only) */}
              {user?.officer_profile?.employee_id && (
                <View style={styles.readOnlyCard}>
                  <View style={styles.readOnlyHeader}>
                    <Ionicons name="id-card-outline" size={20} color="#3B82F6" />
                    <Text style={styles.readOnlyLabel}>{t.auth.employeeId}</Text>
                  </View>
                  <Text style={styles.readOnlyValue}>{user.officer_profile.employee_id}</Text>
                </View>
              )}

              {/* Phone Number (Read-only) */}
              <View style={[styles.readOnlyCard, { marginTop: 12 }]}>
                <View style={styles.readOnlyHeader}>
                  <Ionicons name="call-outline" size={20} color="#3B82F6" />
                  <Text style={styles.readOnlyLabel}>{t.auth.phoneNumber}</Text>
                </View>
                <Text style={styles.readOnlyValue}>{user?.phone_number}</Text>
              </View>
            </View>

            {/* Editable Form Fields - ONLY from serializer */}
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>{t.auth.personalInformation}</Text>

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.auth.fullName} *</Text>
                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => {
                      setFormData({ ...formData, name: text });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder={t.auth.fullNamePlaceholder}
                    placeholderTextColor="#94A3B8"
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Department */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t.auth.department} *</Text>
                <View style={[styles.inputWrapper, errors.department && styles.inputError]}>
                  <Ionicons name="business-outline" size={20} color="#64748B" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={formData.department}
                    onChangeText={(text) => {
                      setFormData({ ...formData, department: text });
                      if (errors.department) setErrors({ ...errors, department: '' });
                    }}
                    placeholder={t.auth.departmentPlaceholder}
                    placeholderTextColor="#94A3B8"
                  />
                </View>
                {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                  <Text style={styles.saveButtonText}>{t.common.save}</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.bottomPadding} />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  avatarName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  readOnlySection: {
    marginBottom: 24,
  },
  readOnlyCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  readOnlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  readOnlyLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 8,
  },
  readOnlyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  formContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    minHeight: 52,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 20,
  },
});
