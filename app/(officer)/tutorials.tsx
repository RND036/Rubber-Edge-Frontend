// Rubber Officer Tutorial System - Complete with Official Sri Lankan Resources
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { 
  Animated, Dimensions, ScrollView, StyleSheet, Text, 
  TouchableOpacity, View, Modal, Linking, Alert 
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';


const { width, height } = Dimensions.get('window');


interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  videoUrl: string;
  duration: string;
  content: string[];
}


const getTutorials = (t: any): Tutorial[] => [
  {
    id: '1',
    title: t.officer.tutorial1Title,
    description: t.officer.tutorial1Desc,
    icon: 'play-circle',
    color: '#3B82F6',
    videoUrl: 'https://www.youtube.com/watch?v=YOUR_GETTING_STARTED_VIDEO',
    duration: '10 min',
    content: t.officer.tutorial1Content
  },
  {
    id: '2',
    title: t.officer.tutorial2Title,
    description: t.officer.tutorial2Desc,
    icon: 'cut',
    color: '#10B981',
    videoUrl: 'https://youtu.be/j-gpYFBktuc?si=aSc9L6I1AQcz7jsU',
    duration: '10 min',
    content: t.officer.tutorial2Content
  },
  {
    id: '3',
    title: t.officer.tutorial3Title,
    description: t.officer.tutorial3Desc,
    icon: 'bug',
    color: '#F59E0B',
    videoUrl: 'https://youtu.be/2Ltjc6MJFSY?si=a7tKWk-54X8KmnPb',
    duration: '12 min',
    content: t.officer.tutorial3Content
  },
  {
    id: '4',
    title: t.officer.tutorial4Title,
    description: t.officer.tutorial4Desc,
    icon: 'leaf',
    color: '#8B5CF6',
    videoUrl: 'https://youtu.be/uyIuhsV7YQQ?si=c90IzRoayi91I3XO',
    duration: '16 min',
    content: t.officer.tutorial4Content
  },
  {
    id: '5',
    title: t.officer.tutorial5Title,
    description: t.officer.tutorial5Desc,
    icon: 'flask',
    color: '#EC4899',
    videoUrl: 'https://youtu.be/cZXQ4CfgRZ8?si=KeY1VcjMZ2OitEqf',
    duration: '14 min',
    content: t.officer.tutorial5Content
  },
  {
    id: '6',
    title: t.officer.tutorial6Title,
    description: t.officer.tutorial6Desc,
    icon: 'trending-up',
    color: '#06B6D4',
    videoUrl: 'https://youtu.be/vUBVylJu2So?si=LnsTRry5gggn4B-B',
    duration: '30 min',
    content: t.officer.tutorial6Content
  },
  {
    id: '7',
    title: t.officer.tutorial7Title,
    description: t.officer.tutorial7Desc,
    icon: 'book',
    color: '#EF4444',
    videoUrl: 'http://www.rrisl.gov.lk',
    duration: t.officer.reference,
    content: t.officer.tutorial7Content
  },
  {
    id: '8',
    title: t.officer.tutorial8Title,
    description: t.officer.tutorial8Desc,
    icon: 'globe',
    color: '#8B5CF6',
    videoUrl: 'https://www.rubberdev.gov.lk',
    duration: t.officer.reference,
    content: t.officer.tutorial8Content
  }
];


const TutorialCard = ({ item, index, onPress, t }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const isReference = item.duration === t.officer.reference;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, delay: index * 100, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, delay: index * 100, tension: 45, friction: 8, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, delay: index * 100, tension: 45, friction: 8, useNativeDriver: true }),
    ]).start();


    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 2500, useNativeDriver: true }),
      ])
    ).start();
  }, [index]);


  const handlePressIn = () => Animated.spring(pressAnim, { toValue: 0.95, useNativeDriver: true, tension: 150, friction: 4 }).start();
  const handlePressOut = () => Animated.spring(pressAnim, { toValue: 1, tension: 150, friction: 6, useNativeDriver: true }).start();
  const shimmerTranslate = shimmerAnim.interpolate({ inputRange: [0, 1], outputRange: [-200, 200] });


  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: Animated.multiply(scaleAnim, pressAnim) }] }}>
      <TouchableOpacity style={styles.tutorialCard} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} activeOpacity={1}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '15', borderColor: item.color + '30' }]}>
          <View style={[styles.iconGlow, { backgroundColor: item.color + '25' }]} />
          <Ionicons name={item.icon} size={32} color={item.color} />
          <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX: shimmerTranslate }] }]} />
        </View>
        <View style={styles.tutorialContent}>
          <Text style={styles.tutorialTitle}>{item.title}</Text>
          <Text style={styles.tutorialDesc}>{item.description}</Text>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={14} color="#64748B" />
            <Text style={styles.durationText}>{item.duration}</Text>
            {!isReference && (
              <View style={styles.videoBadge}>
                <Ionicons name="logo-youtube" size={10} color="#FFF" />
                <Text style={styles.videoBadgeText}>{t.officer.video}</Text>
              </View>
            )}
            {isReference && (
              <View style={[styles.videoBadge, { backgroundColor: '#10B981' }]}>
                <Ionicons name="document-text" size={10} color="#FFF" />
                <Text style={styles.videoBadgeText}>{t.officer.docs}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={[styles.arrowContainer, { backgroundColor: item.color }]}>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </View>
        <View style={[styles.cardAccent, { backgroundColor: item.color + '20' }]} />
      </TouchableOpacity>
    </Animated.View>
  );
};


const TutorialDetailModal = ({ visible, tutorial, onClose, onWatchVideo, t }: any) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);


  if (!tutorial) return null;

  const isReference = tutorial.duration === t.officer.reference;


  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.modalOverlayTouchable} activeOpacity={1} onPress={onClose} />
      </Animated.View>
      <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.modalHandle} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.modalHeader, { backgroundColor: tutorial.color + '15' }]}>
            <View style={[styles.modalIconContainer, { backgroundColor: tutorial.color + '20' }]}>
              <Ionicons name={tutorial.icon} size={40} color={tutorial.color} />
            </View>
            <Text style={styles.modalTitle}>{tutorial.title}</Text>
            <Text style={styles.modalSubtitle}>{tutorial.description}</Text>
            <View style={styles.modalMetaContainer}>
              <View style={styles.modalMetaItem}>
                <Ionicons name={isReference ? "document-text" : "time"} size={16} color="#64748B" />
                <Text style={styles.modalMetaText}>{tutorial.duration}</Text>
              </View>
              <View style={styles.modalMetaItem}>
                <Ionicons name="list" size={16} color="#64748B" />
                <Text style={styles.modalMetaText}>{tutorial.content.length} {t.officer.topics}</Text>
              </View>
            </View>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.sectionTitle}>{isReference ? t.officer.availableResources : t.officer.whatYoullLearn}</Text>
            {tutorial.content.map((item: string, index: number) => (
              <View key={index} style={styles.contentItem}>
                <View style={[styles.contentBullet, { backgroundColor: tutorial.color }]}>
                  {isReference ? (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  ) : (
                    <Text style={styles.contentBulletText}>{index + 1}</Text>
                  )}
                </View>
                <Text style={styles.contentText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.watchButton, { backgroundColor: tutorial.color }]} 
              onPress={onWatchVideo} 
              activeOpacity={0.8}
            >
              <Ionicons name={isReference ? "globe" : "logo-youtube"} size={20} color="#FFF" />
              <Text style={styles.watchButtonText}>
                {isReference ? t.officer.visitOfficialWebsite : t.officer.watchOnYoutube}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.closeButtonText}>{t.officer.close}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};


export default function Tutorials() {
  const { t } = useLanguage();
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const tutorials = getTutorials(t);


  const handleWatchVideo = () => {
    if (selectedTutorial) {
      Linking.openURL(selectedTutorial.videoUrl).catch((err) => {
        Alert.alert(
          t.officer.unableToOpenLink, 
          t.officer.checkInternetConnection,
          [{ text: t.common.ok }]
        );
      });
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient}>
        <View style={[styles.gradientCircle1, { opacity: 0.2 }]} />
        <View style={[styles.gradientCircle2, { opacity: 0.15 }]} />
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBadge}>
          <Ionicons name="school-outline" size={16} color="#10B981" />
          <Text style={styles.headerBadgeText}>{tutorials.length} {t.officer.learningModulesAvailable}</Text>
        </View>
        <View style={styles.listContent}>
          {tutorials.map((tutorial, index) => (
            <TutorialCard 
              key={tutorial.id} 
              item={tutorial} 
              index={index} 
              onPress={() => { 
                setSelectedTutorial(tutorial); 
                setModalVisible(true); 
              }}
              t={t}
            />
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>
      <TutorialDetailModal 
        visible={modalVisible} 
        tutorial={selectedTutorial} 
        onClose={() => setModalVisible(false)} 
        onWatchVideo={handleWatchVideo}
        t={t}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backgroundGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  gradientCircle1: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: '#3B82F6', top: -200, right: -150 },
  gradientCircle2: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: '#10B981', bottom: -100, left: -100 },
  scrollContent: { paddingTop: 20 },
  headerBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#10B98115', 
    alignSelf: 'center',
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginBottom: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#10B98130'
  },
  headerBadgeText: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#10B981',
    letterSpacing: 0.3
  },
  listContent: { paddingHorizontal: 20, gap: 14 },
  tutorialCard: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 18, 
    flexDirection: 'row', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 4, 
    borderWidth: 1, 
    borderColor: '#F1F5F9', 
    overflow: 'hidden', 
    position: 'relative' 
  },
  iconContainer: { 
    width: 64, 
    height: 64, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16, 
    borderWidth: 2, 
    position: 'relative', 
    overflow: 'hidden' 
  },
  iconGlow: { position: 'absolute', width: 64, height: 64, borderRadius: 18, opacity: 0.5 },
  shimmerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: 100, backgroundColor: 'rgba(255, 255, 255, 0.4)' },
  tutorialContent: { flex: 1 },
  tutorialTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 5, letterSpacing: -0.3 },
  tutorialDesc: { fontSize: 13, color: '#64748B', lineHeight: 18, fontWeight: '500', marginBottom: 8 },
  durationContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  durationText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  videoBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#EF4444', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 6, 
    marginLeft: 6, 
    gap: 3 
  },
  videoBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFF', letterSpacing: 0.5 },
  arrowContainer: { 
    width: 38, 
    height: 38, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 4, 
    elevation: 2 
  },
  cardAccent: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalOverlayTouchable: { flex: 1 },
  modalContent: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    maxHeight: height * 0.9, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 16, 
    elevation: 10 
  },
  modalHandle: { 
    width: 40, 
    height: 5, 
    backgroundColor: '#CBD5E1', 
    borderRadius: 3, 
    alignSelf: 'center', 
    marginTop: 12, 
    marginBottom: 20 
  },
  modalHeader: { padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  modalIconContainer: { 
    width: 80, 
    height: 80, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#0F172A', 
    marginBottom: 8, 
    textAlign: 'center', 
    letterSpacing: -0.5 
  },
  modalSubtitle: { 
    fontSize: 14, 
    color: '#64748B', 
    textAlign: 'center', 
    lineHeight: 20, 
    marginBottom: 16 
  },
  modalMetaContainer: { flexDirection: 'row', gap: 20 },
  modalMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  modalMetaText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  modalBody: { padding: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 16, letterSpacing: -0.3 },
  contentItem: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  contentBullet: { 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12, 
    marginTop: 2 
  },
  contentBulletText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  contentText: { flex: 1, fontSize: 14, color: '#475569', lineHeight: 22, fontWeight: '500' },
  modalFooter: { padding: 24, paddingTop: 8, gap: 12 },
  watchButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 18, 
    borderRadius: 16, 
    gap: 10 
  },
  watchButtonText: { fontSize: 16, fontWeight: '700', color: '#FFF', letterSpacing: 0.5 },
  closeButton: { padding: 18, borderRadius: 16, backgroundColor: '#F1F5F9', alignItems: 'center' },
  closeButtonText: { fontSize: 16, fontWeight: '600', color: '#64748B' },
  bottomPadding: { height: 30 },
});
