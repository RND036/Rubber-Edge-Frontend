// app/learning-center.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Linking,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useLanguage } from '../context/LanguageContext';

type LearningCategory = {
  id: string;
  title: string;
  icon: string;
  color: string;
  itemCount: number;
};

type LearningItem = {
  id: string;
  title: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  category: string;
  duration: string;
  thumbnail?: string;
  type: 'video' | 'article' | 'guide';
  youtubeUrl: string;
};

const LearningCenterScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<LearningItem | null>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const { t } = useLanguage();

  const categories: LearningCategory[] = [
    {
      id: 'all',
      title: t.learningCenter.all,
      icon: 'apps',
      color: '#00822C',
      itemCount: 12,
    },
    {
      id: 'planting',
      title: t.learningCenter.planting,
      icon: 'sprout',
      color: '#27AE60',
      itemCount: 4,
    },
    {
      id: 'tapping',
      title: t.learningCenter.tapping,
      icon: 'water-outline',
      color: '#3498DB',
      itemCount: 3,
    },
    {
      id: 'disease',
      title: t.learningCenter.diseaseControl,
      icon: 'shield-bug-outline',
      color: '#E74C3C',
      itemCount: 3,
    },
    {
      id: 'fertilizer',
      title: t.learningCenter.fertilizers,
      icon: 'leaf',
      color: '#9B59B6',
      itemCount: 2,
    },
  ];

  const learningItems: LearningItem[] = [
  {
    id: "1",
    title: t.learningCenter.item1.title,
    description: t.learningCenter.item1.description,
    category: "planting",
    duration: "10 min",
    type: "article",
    youtubeUrl: "https://youtu.be/hCbc9k4jcsY?si=_7CXyI64y5Vc20aU",
    longDescription: t.learningCenter.item1.longDescription,
  },

  {
    id: "2",
    title: t.learningCenter.item2.title,
    description: t.learningCenter.item2.description,
    category: "tapping",
    duration: "15 min",
    type: "video",
    youtubeUrl: "https://youtu.be/j-gpYFBktuc?si=PQ1jJ4S7DDeZRb2m",
    longDescription: t.learningCenter.item2.longDescription,
  },

  {
    id: "3",
    title: t.learningCenter.item3.title,
    description: t.learningCenter.item3.description,
    category: "disease",
    duration: "12 min",
    type: "article",
    youtubeUrl: "https://youtu.be/2Ltjc6MJFSY?si=Mbo1CYj0AA6z5SwV",
    longDescription: t.learningCenter.item3.longDescription,
  },

  {
    id: "4",
    title: t.learningCenter.item4.title,
    description: t.learningCenter.item4.description,
    category: "planting",
    duration: "8 min",
    type: "guide",
    youtubeUrl: "https://youtu.be/WMYJOCxd924?si=t_2Xdbc_AsA0AYyL",
    longDescription: t.learningCenter.item4.longDescription,
  },

  {
    id: "5",
    title: t.learningCenter.item5.title,
    description: t.learningCenter.item5.description,
    category: "fertilizer",
    duration: "10 min",
    type: "guide",
    youtubeUrl: "https://youtu.be/s1mVxcnatdc?si=VVhyvK1Drhmndyku",
    longDescription: t.learningCenter.item5.longDescription,
  },

  {
    id: "6",
    title: t.learningCenter.item6.title,
    description: t.learningCenter.item6.description,
    category: "tapping",
    duration: "20 min",
    type: "video",
    youtubeUrl: "https://youtu.be/Dy0muVzHddo?si=SSIbq8VyJiPtGN7f",
    longDescription: t.learningCenter.item6.longDescription,
  },

  {
    id: "7",
    title: t.learningCenter.item7.title,
    description: t.learningCenter.item7.description,
    category: "disease",
    duration: "15 min",
    type: "article",
    youtubeUrl: "https://youtu.be/INBVV1xuqng?si=eBqtccw1irAWBLYi",
    longDescription: t.learningCenter.item7.longDescription,
  },

  {
    id: "8",
    title: t.learningCenter.item8.title,
    description: t.learningCenter.item8.description,
    category: "planting",
    duration: "12 min",
    type: "guide",
    youtubeUrl: "https://youtu.be/zs9JUoa32N4?si=SPf42rImbphL-k9x",
    longDescription: t.learningCenter.item8.longDescription,
  },

  {
    id: "9",
    title: t.learningCenter.item9.title,
    description: t.learningCenter.item9.description,
    category: "tapping",
    duration: "8 min",
    type: "video",
    youtubeUrl: "https://youtu.be/uBqkBF6n_d0?si=XbCaIiacFg6SC_Oc",
    longDescription: t.learningCenter.item9.longDescription,
  },

  {
    id: "10",
    title: t.learningCenter.item10.title,
    description: t.learningCenter.item10.description,
    category: "fertilizer",
    duration: "10 min",
    type: "article",
    youtubeUrl: "https://youtu.be/lffomP_RLEI?si=YGHoyex0ehxQ5_cj",
    longDescription: t.learningCenter.item10.longDescription,
  },

  {
    id: "11",
    title: t.learningCenter.item11.title,
    description: t.learningCenter.item11.description,
    category: "disease",
    duration: "14 min",
    type: "article",
    youtubeUrl: "https://youtu.be/EIhR2WQvGq0?si=2ikafOyLaVRpgr3G",
    longDescription: t.learningCenter.item11.longDescription,
  },

  {
    id: "12",
    title: t.learningCenter.item12.title,
    description: t.learningCenter.item12.description,
    category: "planting",
    duration: "18 min",
    type: "video",
    youtubeUrl: "https://youtu.be/yGOfDRAe0fs?si=tscUcN3h1Dl_jewH",
    longDescription: t.learningCenter.item12.longDescription,
  },
];


  // Calculate responsive sizes
  const thumbnailHeight = Math.min(width * 0.56, 200); // 16:9 aspect ratio
  const responsiveHeaderFontSize = Math.min(18, width * 0.05);
  const responsiveTitleFontSize = Math.min(20, width * 0.06);
  const responsiveDescFontSize = Math.min(15, width * 0.04);

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const openVideoModal = (item: LearningItem) => {
    setSelectedVideo(item);
    setIsVideoModalVisible(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setSelectedVideo(null);
  };

  const openInYouTube = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  const filteredItems = selectedCategory && selectedCategory !== 'all'
    ? learningItems.filter((item: LearningItem) => item.category === selectedCategory)
    : learningItems;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'play-circle-outline';
      case 'article':
        return 'file-document-outline';
      case 'guide':
        return 'book-open-page-variant-outline';
      default:
        return 'file-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return '#E74C3C';
      case 'article':
        return '#3498DB';
      case 'guide':
        return '#27AE60';
      default:
        return '#95A5A6';
    }
  };

  const getTranslatedTypeName = (type: string) => {
    switch (type) {
      case 'video':
        return t.learningCenter.video;
      case 'article':
        return t.learningCenter.article;
      case 'guide':
        return t.learningCenter.guide;
      default:
        return type;
    }
  };

  const renderCategoryItem = ({ item }: { item: LearningCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        (selectedCategory === item.id || (!selectedCategory && item.id === 'all')) && {
          backgroundColor: item.color,
        },
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={item.icon as any}
        size={18}
        color={(selectedCategory === item.id || (!selectedCategory && item.id === 'all')) ? '#fff' : item.color}
      />
      <Text
        style={[
          styles.categoryChipText,
          (selectedCategory === item.id || (!selectedCategory && item.id === 'all')) && {
            color: '#fff',
          },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderLearningItem = ({ item }: { item: LearningItem }) => {
    const videoId = getYoutubeVideoId(item.youtubeUrl);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;

    return (
      <TouchableOpacity
        style={styles.learningCard}
        onPress={() => openVideoModal(item)}
        activeOpacity={0.7}
      >
        {/* YouTube Thumbnail */}
        {thumbnailUrl && (
          <View style={[styles.thumbnailContainer, { height: thumbnailHeight }]}>
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.playButtonOverlay}>
              <View style={styles.playButton}>
                <MaterialCommunityIcons name="play" size={30} color="#fff" />
              </View>
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationBadgeText}>{item.duration}</Text>
            </View>
          </View>
        )}
        <View style={[styles.learningCardContent, { padding: Math.max(12, width * 0.04) }]}>
          <View style={[styles.typeIndicator, { width: width * 0.12, height: width * 0.12, backgroundColor: `${getTypeColor(item.type)}15` }]}>
            <MaterialCommunityIcons
              name={getTypeIcon(item.type) as any}
              size={Math.min(24, width * 0.06)}
              color={getTypeColor(item.type)}
            />
          </View>
          <View style={styles.learningCardText}>
            <Text style={[styles.learningTitle, { fontSize: Math.min(15, width * 0.04) }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.learningDescription, { fontSize: Math.min(13, width * 0.035) }]} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.learningMeta}>
              <MaterialCommunityIcons name="youtube" size={Math.min(16, width * 0.04)} color="#FF0000" />
              <Text style={[styles.watchOnYoutube, { fontSize: Math.min(12, width * 0.03) }]}>{t.learningCenter.watchVideo}</Text>
              <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor(item.type)}15` }]}>
                <Text style={[styles.typeBadgeText, { color: getTypeColor(item.type) }]}>
                  {getTranslatedTypeName(item.type)}
                </Text>
              </View>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#BDC3C7" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.learningCenter.title}</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Grow Your Knowledge 🌱</Text>
          <Text style={styles.welcomeSubtitle}>
            Explore articles, videos, and guides to improve your rubber farming skills
          </Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Learning Items */}
      <FlatList
        data={filteredItems}
        renderItem={renderLearningItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.learningList, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="book-open-variant" size={64} color="#BDC3C7" />
            <Text style={styles.emptyText}>{t.learningCenter.noMaterialsFound}</Text>
          </View>
        }
      />

      {/* Video Modal */}
      <Modal
        visible={isVideoModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={closeVideoModal}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeVideoModal}>
              <MaterialCommunityIcons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { fontSize: Math.min(16, width * 0.045) }]} numberOfLines={1}>
              {selectedVideo?.title}
            </Text>
            <TouchableOpacity
              style={styles.openYoutubeButton}
              onPress={() => selectedVideo && openInYouTube(selectedVideo.youtubeUrl)}
            >
              <MaterialCommunityIcons name="youtube" size={Math.min(24, width * 0.06)} color="#FF0000" />
            </TouchableOpacity>
          </View>

          {/* YouTube WebView */}
          {selectedVideo && (
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${getYoutubeVideoId(selectedVideo.youtubeUrl)}?autoplay=1&rel=0`,
                }}
                style={styles.webview}
                allowsFullscreenVideo
                javaScriptEnabled
                domStorageEnabled
                mediaPlaybackRequiresUserAction={false}
              />
            </View>
          )}

          {/* Video Info */}
          {selectedVideo && (
            <View style={{ flex: 1 }}>
              <ScrollView style={[styles.videoInfo, { paddingHorizontal: 20 }]} contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={[styles.videoTitle, { fontSize: Math.min(20, width * 0.08) }]}>{selectedVideo.title}</Text>
                <Text style={[styles.videoDescription, { fontSize: Math.min(15, width * 0.04) }]}>{selectedVideo.longDescription || selectedVideo.description}</Text>
                <View style={styles.videoMetaRow}>
                  <View style={[styles.typeBadgeLarge, { backgroundColor: `${getTypeColor(selectedVideo.type)}15` }]}>
                    <MaterialCommunityIcons
                      name={getTypeIcon(selectedVideo.type) as any}
                      size={Math.min(16, width * 0.04)}
                      color={getTypeColor(selectedVideo.type)}
                    />
                    <Text style={[styles.typeBadgeLargeText, { color: getTypeColor(selectedVideo.type), fontSize: Math.min(13, width * 0.035) }]}>
                      {getTranslatedTypeName(selectedVideo.type)}
                    </Text>
                  </View>
                  <View style={styles.durationInfo}>
                    <MaterialCommunityIcons name="clock-outline" size={Math.min(16, width * 0.04)} color="#95A5A6" />
                    <Text style={[styles.durationInfoText, { fontSize: Math.min(14, width * 0.035) }]}>{selectedVideo.duration}</Text>
                  </View>
                </View>
              </ScrollView>
              <View style={{ paddingHorizontal: 20, paddingVertical: 12, paddingBottom: insets.bottom + 12, backgroundColor: '#fff' }}>
                <TouchableOpacity
                  style={[styles.openInAppButton, { paddingVertical: Math.max(12, width * 0.035) }]}
                  onPress={() => selectedVideo && openInYouTube(selectedVideo.youtubeUrl)}
                >
                  <MaterialCommunityIcons name="youtube" size={Math.min(20, width * 0.05)} color="#fff" />
                  <Text style={[styles.openInAppButtonText, { fontSize: Math.min(16, width * 0.042) }]}>{t.learningCenter.openInYoutube}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
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
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
  welcomeSection: {
    backgroundColor: '#00822C',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoriesList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  learningList: {
    padding: 16,
    paddingTop: 20,
  },
  learningCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  learningCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  typeIndicator: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  learningCardText: {
    flex: 1,
  },
  learningTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  learningDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
    marginBottom: 8,
  },
  learningMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learningDuration: {
    fontSize: 12,
    color: '#95A5A6',
    marginLeft: 4,
    marginRight: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#95A5A6',
    marginTop: 16,
  },
  thumbnailContainer: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  watchOnYoutube: {
    fontSize: 12,
    color: '#FF0000',
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  openYoutubeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  videoInfo: {
    flex: 1,
    padding: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },
  videoDescription: {
    fontSize: 15,
    color: '#7F8C8D',
    lineHeight: 24,
    marginBottom: 20,
  },
  videoMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  typeBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  typeBadgeLargeText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  durationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationInfoText: {
    fontSize: 14,
    color: '#95A5A6',
    marginLeft: 6,
  },
  openInAppButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    borderRadius: 12,
  },
  openInAppButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default LearningCenterScreen;
