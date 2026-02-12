import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useLanguage } from '../../context/LanguageContext';

const { width, height } = Dimensions.get('window');

// Type definitions
type CategoryId = 'all' | 'buying' | 'quality' | 'market' | 'processing';
type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface Category {
  id: CategoryId;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface Tutorial {
  id: number;
  title: string;
  description: string;
  category: Exclude<CategoryId, 'all'>;
  duration: string;
  steps: string[];
  difficulty: DifficultyLevel;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
}

// Animated Tutorial Card Component
const TutorialCard = ({ 
  tutorial, 
  isExpanded, 
  onToggle, 
  getDifficultyColor,
  getDifficultyText,
  t,
  index 
}: { 
  tutorial: Tutorial; 
  isExpanded: boolean; 
  onToggle: () => void;
  getDifficultyColor: (d: DifficultyLevel) => { bg: string; text: string };
  getDifficultyText: (d: DifficultyLevel) => string;
  t: any;
  index: number;
}) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animatedHeight, {
        toValue: isExpanded ? 1 : 0,
        useNativeDriver: false,
        tension: 50,
        friction: 8,
      }),
      Animated.spring(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
    ]).start();
  }, [isExpanded]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const difficultyColors = getDifficultyColor(tutorial.difficulty);

  return (
    <Animated.View
      style={[
        styles.tutorialCard,
        {
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.tutorialHeader}
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={tutorial.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tutorialIconContainer}
        >
          <Ionicons name={tutorial.icon} size={22} color="#fff" />
        </LinearGradient>
        <View style={styles.tutorialInfo}>
          <Text style={styles.tutorialTitle} numberOfLines={2}>{tutorial.title}</Text>
          <View style={styles.tutorialMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color="#8E8E93" />
              <Text style={styles.metaText}>{tutorial.duration}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Ionicons name="list-outline" size={13} color="#8E8E93" />
              <Text style={styles.metaText}>{tutorial.steps.length} {t.buyer.steps}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightSection}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColors.bg },
            ]}
          >
            <Text style={[styles.difficultyText, { color: difficultyColors.text }]}>
              {getDifficultyText(tutorial.difficulty)}
            </Text>
          </View>
          <Animated.View style={{ transform: [{ rotate: rotation }], marginTop: 8 }}>
            <Ionicons name="chevron-down" size={20} color="#8E8E93" />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View style={styles.tutorialContent}>
          <View style={styles.descriptionBox}>
            <Ionicons name="information-circle" size={18} color="#007AFF" style={{ marginRight: 8 }} />
            <Text style={styles.tutorialDescription}>{tutorial.description}</Text>
          </View>
          <View style={styles.stepsContainer}>
            <View style={styles.stepsTitleRow}>
              <MaterialCommunityIcons name="format-list-numbered" size={18} color="#1A237E" />
              <Text style={styles.stepsTitle}>{t.buyer.steps}</Text>
            </View>
            {tutorial.steps.map((step, stepIndex) => (
              <View key={stepIndex} style={styles.stepItem}>
                <LinearGradient
                  colors={tutorial.gradient as [string, string]}
                  style={styles.stepNumber}
                >
                  <Text style={styles.stepNumberText}>{stepIndex + 1}</Text>
                </LinearGradient>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step}</Text>
                  {stepIndex < tutorial.steps.length - 1 && (
                    <View style={styles.stepConnector} />
                  )}
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.markCompleteBtn}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#007AFF" />
            <Text style={styles.markCompleteText}>{t.buyer.markAsComplete}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default function BuyerTutorialsScreen() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const categories: Category[] = [
    { id: 'all', name: t.buyer.allTutorials, icon: 'apps-outline', color: '#6366F1' },
    { id: 'buying', name: t.buyer.buying, icon: 'cart-outline', color: '#10B981' },
    { id: 'quality', name: t.buyer.quality, icon: 'shield-checkmark-outline', color: '#F59E0B' },
    { id: 'market', name: t.buyer.market, icon: 'trending-up-outline', color: '#EF4444' },
    { id: 'processing', name: t.buyer.processing, icon: 'construct-outline', color: '#8B5CF6' },
  ];

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: t.buyer.tutorials.tutorial1.title,
      description: t.buyer.tutorials.tutorial1.description,
      category: 'buying',
      duration: '5 min',
      difficulty: 'Beginner',
      icon: 'rocket-outline',
      gradient: ['#10B981', '#059669'],
      steps: t.buyer.tutorials.tutorial1.steps,
    },
    {
      id: 2,
      title: t.buyer.tutorials.tutorial2.title,
      description: t.buyer.tutorials.tutorial2.description,
      category: 'market',
      duration: '8 min',
      difficulty: 'Intermediate',
      icon: 'cash-outline',
      gradient: ['#F59E0B', '#D97706'],
      steps: t.buyer.tutorials.tutorial2.steps,
    },
    {
      id: 3,
      title: t.buyer.tutorials.tutorial3.title,
      description: t.buyer.tutorials.tutorial3.description,
      category: 'quality',
      duration: '10 min',
      difficulty: 'Beginner',
      icon: 'layers-outline',
      gradient: ['#6366F1', '#4F46E5'],
      steps: t.buyer.tutorials.tutorial3.steps,
    },
    {
      id: 4,
      title: t.buyer.tutorials.tutorial4.title,
      description: t.buyer.tutorials.tutorial4.description,
      category: 'quality',
      duration: '12 min',
      difficulty: 'Intermediate',
      icon: 'search-outline',
      gradient: ['#EC4899', '#DB2777'],
      steps: t.buyer.tutorials.tutorial4.steps,
    },
    {
      id: 5,
      title: t.buyer.tutorials.tutorial5.title,
      description: t.buyer.tutorials.tutorial5.description,
      category: 'market',
      duration: '7 min',
      difficulty: 'Advanced',
      icon: 'analytics-outline',
      gradient: ['#EF4444', '#DC2626'],
      steps: t.buyer.tutorials.tutorial5.steps,
    },
    {
      id: 6,
      title: t.buyer.tutorials.tutorial6.title,
      description: t.buyer.tutorials.tutorial6.description,
      category: 'buying',
      duration: '6 min',
      difficulty: 'Beginner',
      icon: 'people-outline',
      gradient: ['#14B8A6', '#0D9488'],
      steps: t.buyer.tutorials.tutorial6.steps,
    },
    {
      id: 7,
      title: t.buyer.tutorials.tutorial7.title,
      description: t.buyer.tutorials.tutorial7.description,
      category: 'processing',
      duration: '15 min',
      difficulty: 'Intermediate',
      icon: 'flask-outline',
      gradient: ['#8B5CF6', '#7C3AED'],
      steps: t.buyer.tutorials.tutorial7.steps,
    },
    {
      id: 8,
      title: t.buyer.tutorials.tutorial8.title,
      description: t.buyer.tutorials.tutorial8.description,
      category: 'processing',
      duration: '8 min',
      difficulty: 'Intermediate',
      icon: 'car-outline',
      gradient: ['#0EA5E9', '#0284C7'],
      steps: t.buyer.tutorials.tutorial8.steps,
    },
  ];

  const filteredTutorials = activeCategory === 'all'
    ? tutorials
    : tutorials.filter(t => t.category === activeCategory);

  const getDifficultyColor = (difficulty: DifficultyLevel): { bg: string; text: string } => {
    switch (difficulty) {
      case 'Beginner': return { bg: '#DCFCE7', text: '#166534' };
      case 'Intermediate': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Advanced': return { bg: '#FEE2E2', text: '#991B1B' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getDifficultyText = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case 'Beginner': return t.buyer.beginner;
      case 'Intermediate': return t.buyer.intermediate;
      case 'Advanced': return t.buyer.advanced;
      default: return difficulty;
    }
  };

  const toggleTutorial = (id: number) => {
    setExpandedTutorial(expandedTutorial === id ? null : id);
  };



  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor="transparent" />
      
      {/* Animated Header */}
      <Animated.View style={{ opacity: headerOpacity }}>
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6', '#60A5FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.headerLabel}>{t.buyer.learningCenter.toUpperCase()}</Text>
                <Text style={styles.headerTitle}>{t.buyer.buyerTutorials}</Text>
              </View>
              <View style={styles.headerIcon}>
                <MaterialCommunityIcons name="school" size={28} color="#fff" />
              </View>
            </View>
            <Text style={styles.headerSubtitle}>
              {t.buyer.masterBuyerSkills}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Category Pills */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  isActive && { backgroundColor: category.color },
                ]}
                onPress={() => setActiveCategory(category.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={category.icon}
                  size={16}
                  color={isActive ? '#fff' : category.color}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isActive ? styles.activeCategoryText : { color: category.color },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          {filteredTutorials.length} {t.buyer.results}
        </Text>
        <View style={styles.sortBtn}>
          <Ionicons name="funnel-outline" size={16} color="#6B7280" />
          <Text style={styles.sortText}>{t.common.search}</Text>
        </View>
      </View>

      {/* Tutorials List */}
      <Animated.ScrollView
        style={styles.tutorialsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.tutorialsContent,
          { paddingBottom: insets.bottom + 80 }
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {filteredTutorials.length === 0 ? (
          <View style={styles.emptyState}>
            <LinearGradient
              colors={['#E0E7FF', '#C7D2FE']}
              style={styles.emptyIconBg}
            >
              <Ionicons name="school-outline" size={48} color="#6366F1" />
            </LinearGradient>
            <Text style={styles.emptyTitle}>{t.buyer.noTutorialsFound}</Text>
            <Text style={styles.emptyText}>
              {t.buyer.tryDifferentCategory}
            </Text>
            <TouchableOpacity 
              style={styles.emptyBtn}
              onPress={() => setActiveCategory('all')}
            >
              <Text style={styles.emptyBtnText}>{t.buyer.showAll}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredTutorials.map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              isExpanded={expandedTutorial === tutorial.id}
              onToggle={() => toggleTutorial(tutorial.id)}
              getDifficultyColor={getDifficultyColor}
              getDifficultyText={getDifficultyText}
              t={t}
              index={index}
            />
          ))
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
    marginTop: 4,
  },

  categorySection: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryText: {
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#fff',
  },
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
  },
  resultsText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sortText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  tutorialsList: {
    flex: 1,
  },
  tutorialsContent: {
    padding: 16,
    paddingTop: 8,
  },
  tutorialCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tutorialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tutorialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  tutorialInfo: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    lineHeight: 20,
  },
  tutorialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tutorialContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FAFBFC',
  },
  descriptionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  tutorialDescription: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 20,
  },
  stepsContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stepsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
    paddingBottom: 12,
  },
  stepText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    fontWeight: '500',
  },
  stepConnector: {
    position: 'absolute',
    left: -25,
    top: 30,
    width: 2,
    height: 24,
    backgroundColor: '#E2E8F0',
    borderRadius: 1,
  },
  markCompleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  markCompleteText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  emptyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
