// app/user-guide.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';

type GuideStep = {
  title: string;
  description: string;
  icon: string;
};

type GuideSection = {
  id: string;
  title: string;
  icon: string;
  color: string;
  steps: GuideStep[];
};

const UserGuideScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  const guideSections: GuideSection[] = useMemo(() => [
    {
      id: 'getting-started',
      title: t.userGuide.gettingStarted,
      icon: 'rocket-launch-outline',
      color: '#3498DB',
      steps: [
        {
          title: t.userGuide.createAccountTitle,
          description: t.userGuide.createAccountDesc,
          icon: 'account-plus-outline',
        },
        {
          title: t.userGuide.setUpProfileTitle,
          description: t.userGuide.setUpProfileDesc,
          icon: 'account-edit-outline',
        },
        {
          title: t.userGuide.exploreDashboardTitle,
          description: t.userGuide.exploreDashboardDesc,
          icon: 'view-dashboard-outline',
        },
      ],
    },
    {
      id: 'disease-detection',
      title: t.userGuide.diseaseDetection,
      icon: 'leaf-circle-outline',
      color: '#E74C3C',
      steps: [
        {
          title: t.userGuide.takePhotoTitle,
          description: t.userGuide.takePhotoDesc,
          icon: 'camera-outline',
        },
        {
          title: t.userGuide.waitForAnalysisTitle,
          description: t.userGuide.waitForAnalysisDesc,
          icon: 'cog-sync-outline',
        },
        {
          title: t.userGuide.viewResultsTitle,
          description: t.userGuide.viewResultsDesc,
          icon: 'clipboard-check-outline',
        },
        {
          title: t.userGuide.getTreatmentTitle,
          description: t.userGuide.getTreatmentDesc,
          icon: 'medical-bag',
        },
      ],
    },
    {
      id: 'latex-quality',
      title: t.userGuide.monitoringLatexQuality,
      icon: 'water-check-outline',
      color: '#2ECC71',
      steps: [
        {
          title: t.userGuide.viewRealTimeDataTitle,
          description: t.userGuide.viewRealTimeDataDesc,
          icon: 'chart-timeline-variant',
        },
        {
          title: t.userGuide.understandMetricsTitle,
          description: t.userGuide.understandMetricsDesc,
          icon: 'information-outline',
        },
        {
          title: t.userGuide.setQualityAlertsTitle,
          description: t.userGuide.setQualityAlertsDesc,
          icon: 'bell-ring-outline',
        },
        {
          title: t.userGuide.improveQualityTitle,
          description: t.userGuide.improveQualityDesc,
          icon: 'trending-up',
        },
      ],
    },
    {
      id: 'market',
      title: t.userGuide.marketAndSelling,
      icon: 'store-outline',
      color: '#9B59B6',
      steps: [
        {
          title: t.userGuide.checkMarketPricesTitle,
          description: t.userGuide.checkMarketPricesDesc,
          icon: 'currency-usd',
        },
        {
          title: t.userGuide.compareBuyersTitle,
          description: t.userGuide.compareBuyersDesc,
          icon: 'scale-balance',
        },
        {
          title: t.userGuide.connectWithBuyersTitle,
          description: t.userGuide.connectWithBuyersDesc,
          icon: 'handshake-outline',
        },
        {
          title: t.userGuide.trackTransactionsTitle,
          description: t.userGuide.trackTransactionsDesc,
          icon: 'receipt',
        },
      ],
    },
    {
      id: 'weather',
      title: t.userGuide.weatherForecasts,
      icon: 'weather-partly-cloudy',
      color: '#F39C12',
      steps: [
        {
          title: t.userGuide.viewCurrentWeatherTitle,
          description: t.userGuide.viewCurrentWeatherDesc,
          icon: 'thermometer',
        },
        {
          title: t.userGuide.sevenDayForecastTitle,
          description: t.userGuide.sevenDayForecastDesc,
          icon: 'calendar-week',
        },
        {
          title: t.userGuide.weatherAlertsTitle,
          description: t.userGuide.weatherAlertsDesc,
          icon: 'weather-lightning-rainy',
        },
      ],
    },
    {
      id: 'support',
      title: t.userGuide.gettingHelp,
      icon: 'lifebuoy',
      color: '#1ABC9C',
      steps: [
        {
          title: t.userGuide.aiChatAssistantTitle,
          description: t.userGuide.aiChatAssistantDesc,
          icon: 'robot-outline',
        },
        {
          title: t.userGuide.contactOfficersTitle,
          description: t.userGuide.contactOfficersDesc,
          icon: 'account-tie-outline',
        },
        {
          title: t.userGuide.learningCenterTitle,
          description: t.userGuide.learningCenterDesc,
          icon: 'school-outline',
        },
        {
          title: t.userGuide.faqsTitle,
          description: t.userGuide.faqsDesc,
          icon: 'frequently-asked-questions',
        },
      ],
    },
    {
      id: 'offline',
      title: t.userGuide.usingOffline,
      icon: 'wifi-off',
      color: '#7F8C8D',
      steps: [
        {
          title: t.userGuide.offlineModeTitle,
          description: t.userGuide.offlineModeDesc,
          icon: 'database-outline',
        },
        {
          title: t.userGuide.cachedDataTitle,
          description: t.userGuide.cachedDataDesc,
          icon: 'cached',
        },
        {
          title: t.userGuide.autoSyncTitle,
          description: t.userGuide.autoSyncDesc,
          icon: 'sync',
        },
      ],
    },
  ], [t]);

  const handleSectionPress = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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
        <Text style={styles.headerTitle}>{t.userGuide.headerTitle}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIconContainer}>
            <MaterialCommunityIcons name="book-open-page-variant" size={40} color="#00822C" />
          </View>
          <Text style={styles.welcomeTitle}>{t.userGuide.welcomeTitle}</Text>
          <Text style={styles.welcomeSubtitle}>
            {t.userGuide.welcomeSubtitle}
          </Text>
        </View>

        {/* Guide Sections */}
        <Text style={styles.sectionTitle}>{t.userGuide.howToUse}</Text>
        {guideSections.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => handleSectionPress(section.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.sectionIconContainer, { backgroundColor: `${section.color}15` }]}>
                <MaterialCommunityIcons
                  name={section.icon as any}
                  size={24}
                  color={section.color}
                />
              </View>
              <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
              <MaterialCommunityIcons
                name={expandedSection === section.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#95A5A6"
              />
            </TouchableOpacity>

            {expandedSection === section.id && (
              <View style={styles.stepsContainer}>
                {section.steps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.stepNumberContainer}>
                      <View style={[styles.stepNumber, { backgroundColor: section.color }]}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      {index < section.steps.length - 1 && (
                        <View style={[styles.stepLine, { backgroundColor: `${section.color}30` }]} />
                      )}
                    </View>
                    <View style={styles.stepContent}>
                      <View style={styles.stepHeader}>
                        <MaterialCommunityIcons
                          name={step.icon as any}
                          size={20}
                          color={section.color}
                        />
                        <Text style={styles.stepTitle}>{step.title}</Text>
                      </View>
                      <Text style={styles.stepDescription}>{step.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Need More Help */}
        <View style={styles.helpCard}>
          <MaterialCommunityIcons name="headset" size={32} color="#00822C" />
          <Text style={styles.helpTitle}>{t.userGuide.needMoreHelp}</Text>
          <Text style={styles.helpSubtitle}>
            {t.userGuide.needMoreHelpSubtitle}
          </Text>
          <View style={styles.helpButtons}>
            <TouchableOpacity
              style={[styles.helpButton, { backgroundColor: '#00822C' }]}
              onPress={() => router.push('/rubber-chat')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="robot-outline" size={20} color="#fff" />
              <Text style={styles.helpButtonText}>{t.userGuide.chatWithAI}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.helpButton, { backgroundColor: '#3498DB' }]}
              onPress={() => router.push('/contact-us')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="email-outline" size={20} color="#fff" />
              <Text style={styles.helpButtonText}>{t.userGuide.contactUs}</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeCard: {
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
  welcomeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  welcomeSubtitle: {
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
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  stepsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
  },
  stepNumberContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  stepLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  stepDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
    flexWrap: 'wrap',
    flex: 1,
  },
  helpCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 12,
    marginBottom: 8,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  helpButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  helpButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default UserGuideScreen;
