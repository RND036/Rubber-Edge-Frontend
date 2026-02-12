// app/support.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';

type SupportOption = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action?: 'chat' | 'learning' | 'faq' | 'contact' | 'guide' | 'officer';
};

const SupportScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const supportOptions: SupportOption[] = [
    {
      id: '1',
      title: t.support?.chatWithAI || 'Chat with AI',
      subtitle: t.support?.chatWithAIDesc || 'Get instant answers from our AI assistant',
      icon: 'robot-outline',
      color: '#8E44AD',
      action: 'chat',
    },
    {
      id: '2',
      title: t.support?.faqs || 'FAQs',
      subtitle: t.support?.faqsDesc || 'Find answers to common questions',
      icon: 'frequently-asked-questions',
      color: '#3498DB',
      action: 'faq',
    },
    {
      id: '3',
      title: t.support?.contactUs || 'Contact Us',
      subtitle: t.support?.contactUsDesc || 'Get in touch with our support team',
      icon: 'headset',
      color: '#9B59B6',
      action: 'contact',
    },
    {
      id: '4',
      title: t.support?.contactOfficer || 'Contact Officer',
      subtitle: t.support?.contactOfficerDesc || 'Reach out to your assigned support officer',
      icon: 'account-tie-outline',
      color: '#E74C3C',
      action: 'officer',
    },
    {
      id: '5',
      title: t.support?.userGuide || 'User Guide',
      subtitle: t.support?.userGuideDesc || 'Learn how to use the app effectively',
      icon: 'book-open-variant',
      color: '#2ECC71',
      action: 'guide',
    },
    {
      id: '6',
      title: t.support?.learningCenter || 'Learning Center',
      subtitle: t.support?.learningCenterDesc || 'Educational resources for rubber farming',
      icon: 'school-outline',
      color: '#1ABC9C',
      action: 'learning',
    },
  ];

  const handlePress = (option: SupportOption) => {
    if (option.action === 'chat') {
      router.push('/rubber-chat');
      return;
    }
    if (option.action === 'faq') {
      router.push('/faq');
      return;
    }
    if (option.action === 'contact') {
      router.push('/contact-us');
      return;
    }
    if (option.action === 'learning') {
      router.push('/learning-center');
      return;
    }
    if (option.action === 'guide') {
      router.push('/user-guide');
      return;
    }
    if (option.action === 'officer') {
      router.push('/officer-directory');
      return;
    }
    // TODO: wire other options later
    console.log('Pressed:', option.title);
  };

  const handleCall = () => {
    Linking.openURL('tel:+94771234567');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@rubberedge.com');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="hand-wave" size={32} color="#00822C" />
          <Text style={styles.infoTitle}>{t.support?.howCanWeHelp || 'How can we help you?'}</Text>
          <Text style={styles.infoSubtitle}>
            {t.support?.chooseOption || 'Choose from the options below or contact us directly'}
          </Text>
        </View>

        {/* Support Options Grid */}
        <View style={styles.gridContainer}>
          {supportOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handlePress(option)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${option.color}15` }]}>
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={28}
                  color={option.color}
                />
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>{t.support?.quickContact || 'Quick Contact'}</Text>
          
          <TouchableOpacity style={styles.contactCard} onPress={handleCall} activeOpacity={0.7}>
            <View style={[styles.contactIconContainer, { backgroundColor: '#E8F5E9' }]}>
              <MaterialCommunityIcons name="phone" size={24} color="#00822C" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t.support?.callUs || 'Call Us'}</Text>
              <Text style={styles.contactValue}>+94 77 123 4567</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#BDC3C7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmail} activeOpacity={0.7}>
            <View style={[styles.contactIconContainer, { backgroundColor: '#E3F2FD' }]}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#3498DB" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t.support?.emailUs || 'Email Us'}</Text>
              <Text style={styles.contactValue}>support@rubberedge.com</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#BDC3C7" />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>RubberEdge v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#95A5A6',
    lineHeight: 16,
  },
  contactSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  versionContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#BDC3C7',
  },
});

export default SupportScreen;
