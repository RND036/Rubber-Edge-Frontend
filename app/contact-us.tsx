// app/contact-us.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';

type ContactMethod = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action: string;
};

const ContactUsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods: ContactMethod[] = [
    {
      id: '1',
      title: t.support.callUs,
      subtitle: '+94 77 123 4567',
      icon: 'phone',
      color: '#00822C',
      action: 'tel:+94771234567',
    },
    {
      id: '2',
      title: t.support.emailUs,
      subtitle: 'support@rubberedge.com',
      icon: 'email-outline',
      color: '#3498DB',
      action: 'mailto:support@rubberedge.com',
    },
    {
      id: '3',
      title: t.contactPage.quickContact,
      subtitle: '+94 77 123 4567',
      icon: 'whatsapp',
      color: '#25D366',
      action: 'whatsapp://send?phone=+94771234567',
    },
    {
      id: '4',
      title: t.contactPage.headerTitle,
      subtitle: 'Colombo, Sri Lanka',
      icon: 'map-marker-outline',
      color: '#E74C3C',
      action: 'maps',
    },
  ];

  const handleContactMethod = (method: ContactMethod) => {
    if (method.action === 'maps') {
      const address = encodeURIComponent('Rubber Research Institute, Colombo, Sri Lanka');
      const url = Platform.OS === 'ios'
        ? `maps:0,0?q=${address}`
        : `geo:0,0?q=${address}`;
      Linking.openURL(url).catch(() => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
      });
    } else {
      Linking.openURL(method.action).catch((err) => {
        console.error('Error opening link:', err);
        Alert.alert('Error', 'Unable to open this contact method');
      });
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert(t.common.error, t.contactPage.fillAllFields);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t.common.error, t.contactPage.invalidEmail);
      return;
    }

    setIsSubmitting(true);
    Keyboard.dismiss();

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        t.contactPage.messageSent,
        t.contactPage.messageSentDesc,
        [
          {
            text: t.common.ok,
            onPress: () => {
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
              router.back();
            },
          },
        ]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.contactPage.headerTitle}</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <MaterialCommunityIcons name="headset" size={40} color="#9B59B6" />
            <Text style={styles.infoTitle}>{t.contactPage.heroInfoTitle}</Text>
            <Text style={styles.infoSubtitle}>
              {t.contactPage.heroInfoSubtitle}
            </Text>
          </View>

          {/* Quick Contact Methods */}
          <Text style={styles.sectionTitle}>{t.contactPage.quickContact}</Text>
          <View style={styles.contactGrid}>
            {contactMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.contactMethodCard}
                onPress={() => handleContactMethod(method)}
                activeOpacity={0.7}
              >
                <View style={[styles.contactIconContainer, { backgroundColor: `${method.color}15` }]}>
                  <MaterialCommunityIcons
                    name={method.icon as any}
                    size={24}
                    color={method.color}
                  />
                </View>
                <Text style={styles.contactMethodTitle}>{method.title}</Text>
                <Text style={styles.contactMethodSubtitle}>{method.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Form */}
          <Text style={styles.sectionTitle}>{t.contactPage.sendUsMessage}</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t.contactPage.yourName}</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#95A5A6" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t.contactPage.yourNamePlaceholder}
                  placeholderTextColor="#BDC3C7"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t.contactPage.emailAddress}</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#95A5A6" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t.contactPage.emailAddressPlaceholder}
                  placeholderTextColor="#BDC3C7"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t.contactPage.subject}</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="text-short" size={20} color="#95A5A6" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t.contactPage.subjectPlaceholder}
                  placeholderTextColor="#BDC3C7"
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t.contactPage.message}</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder={t.contactPage.messagePlaceholder}
                  placeholderTextColor="#BDC3C7"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.7}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Text style={styles.submitButtonText}>{t.contactPage.sending}</Text>
              ) : (
                <>
                  <MaterialCommunityIcons name="send" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>{t.contactPage.sendMessage}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Office Hours */}
          <View style={styles.officeHoursCard}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#F39C12" />
            <View style={styles.officeHoursContent}>
              <Text style={styles.officeHoursTitle}>{t.contactPage.officeHours}</Text>
              <Text style={styles.officeHoursText}>{t.contactPage.mondayFriday}</Text>
              <Text style={styles.officeHoursText}>{t.contactPage.saturday}</Text>
              <Text style={styles.officeHoursText}>{t.contactPage.sunday}</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  headerRight: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 12,
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  contactMethodCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactMethodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  contactMethodSubtitle: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
  },
  formContainer: {
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  inputIcon: {
    paddingLeft: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#2C3E50',
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00822C',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  officeHoursCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  officeHoursContent: {
    marginLeft: 16,
    flex: 1,
  },
  officeHoursTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  officeHoursText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default ContactUsScreen;
