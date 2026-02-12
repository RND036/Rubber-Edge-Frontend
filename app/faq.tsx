// app/faq.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: FAQItem[];
};

const FAQScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('general');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const faqCategories: FAQCategory[] = [
    {
      id: 'general',
      title: t.faq.general,
      icon: 'help-circle-outline',
      color: '#3498DB',
      items: [
        {
          question: t.faq.whatIsRubberEdge,
          answer: t.faq.whatIsRubberEdgeAns,
        },
        {
          question: t.faq.whoCanUse,
          answer: t.faq.whoCanUseAns,
        },
        {
          question: t.faq.isFree,
          answer: t.faq.isFreeAns,
        },
        {
          question: t.faq.offlineUsage,
          answer: t.faq.offlineUsageAns,
        },
      ],
    },
    {
      id: 'disease',
      title: t.faq.disease,
      icon: 'leaf-circle-outline',
      color: '#E74C3C',
      items: [
        {
          question: t.faq.diseaseAccuracy,
          answer: t.faq.diseaseAccuracyAns,
        },
        {
          question: t.faq.detectedDisease,
          answer: t.faq.detectedDiseaseAns,
        },
        {
          question: t.faq.whichDiseases,
          answer: t.faq.whichDiseasesAns,
        },
      ],
    },
    {
      id: 'quality',
      title: t.faq.quality,
      icon: 'water-check-outline',
      color: '#2ECC71',
      items: [
        {
          question: t.faq.qualityMeasured,
          answer: t.faq.qualityMeasuredAns,
        },
        {
          question: t.faq.qualityAccuracy,
          answer: t.faq.qualityAccuracyAns,
        },
        {
          question: t.faq.viewHistory,
          answer: t.faq.viewHistoryAns,
        },
      ],
    },
    {
      id: 'market',
      title: t.faq.market,
      icon: 'chart-line',
      color: '#9B59B6',
      items: [
        {
          question: t.faq.pricesDetermined,
          answer: t.faq.pricesDeterminedAns,
        },
        {
          question: t.faq.sellDirectly,
          answer: t.faq.sellDirectlyAns,
        },
        {
          question: t.faq.blockchainTraceability,
          answer: t.faq.blockchainTraceabilityAns,
        },
      ],
    },
    {
      id: 'account',
      title: t.faq.account,
      icon: 'account-cog-outline',
      color: '#F39C12',
      items: [
        {
          question: t.faq.updateProfile,
          answer: t.faq.updateProfileAns,
        },
        {
          question: t.faq.changePassword,
          answer: t.faq.changePasswordAns,
        },
        {
          question: t.faq.multiplePlantations,
          answer: t.faq.multiplePlantationsAns,
        },
      ],
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null);
  };

  const handleQuestionPress = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
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
        <Text style={styles.headerTitle}>{t.faq.title}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="frequently-asked-questions" size={40} color="#3498DB" />
          <Text style={styles.infoTitle}>{t.faq.title}</Text>
          <Text style={styles.infoSubtitle}>
            {t.faq.subtitle}
          </Text>
        </View>

        {/* FAQ Categories */}
        {faqCategories.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}15` }]}>
                <MaterialCommunityIcons
                  name={category.icon as any}
                  size={24}
                  color={category.color}
                />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <MaterialCommunityIcons
                name={expandedCategory === category.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#95A5A6"
              />
            </TouchableOpacity>

            {expandedCategory === category.id && (
              <View style={styles.questionsContainer}>
                {category.items.map((item, index) => (
                  <View key={index} style={styles.questionItem}>
                    <TouchableOpacity
                      style={styles.questionHeader}
                      onPress={() => handleQuestionPress(index)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.questionText}>{item.question}</Text>
                      <MaterialCommunityIcons
                        name={expandedQuestion === index ? 'minus-circle-outline' : 'plus-circle-outline'}
                        size={22}
                        color={expandedQuestion === index ? '#00822C' : '#95A5A6'}
                      />
                    </TouchableOpacity>
                    {expandedQuestion === index && (
                      <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Still Need Help Section */}
        <View style={styles.helpCard}>
          <MaterialCommunityIcons name="headset" size={32} color="#9B59B6" />
          <Text style={styles.helpTitle}>{t.faq.stillNeedHelp}</Text>
          <Text style={styles.helpSubtitle}>
            {t.faq.stillNeedHelpDesc}
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => router.push('/contact-us')}
            activeOpacity={0.7}
          >
            <Text style={styles.contactButtonText}>{t.faq.contactSupport}</Text>
          </TouchableOpacity>
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
  categoryContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  questionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  questionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingLeft: 74,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#34495E',
    marginRight: 12,
    lineHeight: 20,
  },
  answerContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    paddingLeft: 74,
    paddingTop: 0,
  },
  answerText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  helpCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
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
    marginBottom: 6,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#00822C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FAQScreen;
