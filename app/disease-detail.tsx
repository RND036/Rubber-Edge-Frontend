import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
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
import { useLanguage } from '../context/LanguageContext';

interface DiseaseInfo {
  color: string;
  icon: string;
}

const DISEASE_COLORS: Record<string, string> = {
  'Healthy': '#10B981',
  'Abnormal Leaf Fall': '#F59E0B',
  'Bird Eye Spot': '#EF4444',
  'Corynespora Leaf Fall': '#DC2626',
  'Powdery Mildew': '#8B5CF6',
  'Phytophthora Leaf Fall': '#B91C1C',
};

const DISEASE_ICONS: Record<string, string> = {
  'Healthy': 'leaf',
  'Abnormal Leaf Fall': 'leaf-off',
  'Bird Eye Spot': 'eye-circle',
  'Corynespora Leaf Fall': 'virus',
  'Powdery Mildew': 'blur',
  'Phytophthora Leaf Fall': 'bacteria',
};

export default function DiseaseDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { t } = useLanguage();
  
  const diseaseName = typeof params.diseaseName === 'string' ? params.diseaseName : params.diseaseName?.[0];
  const confidence = typeof params.confidence === 'string' ? params.confidence : params.confidence?.[0];
  
  // Responsive calculations
  const isSmallScreen = width < 375;
  const isTablet = width >= 768;
  const horizontalPadding = isTablet ? 32 : (isSmallScreen ? 12 : 16);

  if (!diseaseName) {
    return (
      <View style={[styles.errorContainer, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}>
        <StatusBar barStyle="light-content" backgroundColor="#111827" translucent />
        <Text style={styles.errorText}>{t.diseaseDetail.diseaseNotFound}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>{t.diseaseDetail.goBack}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Get disease translations dynamically
  const getDiseaseData = (name: string) => {
    const diseaseKey = name
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace('abnormalleaffall', 'abnormalLeafFall')
      .replace('birdeyespot', 'birdEyeSpot')
      .replace('corynesporaleaffall', 'corynesporaLeafFall')
      .replace('powderymildew', 'powderyMildew')
      .replace('phytophthoraleaffall', 'phytophthoraLeafFall');

    if (diseaseKey === 'healthy') {
      return t.diseaseDetail.healthy;
    } else if (diseaseKey === 'abnormalleaffall') {
      return t.diseaseDetail.abnormalLeafFall;
    } else if (diseaseKey === 'birdeyespot') {
      return t.diseaseDetail.birdEyeSpot;
    } else if (diseaseKey === 'corynesporaleaffall') {
      return t.diseaseDetail.corynesporaLeafFall;
    } else if (diseaseKey === 'powderymildew') {
      return t.diseaseDetail.powderyMildew;
    } else if (diseaseKey === 'phytophthoraleaffall') {
      return t.diseaseDetail.phytophthoraLeafFall;
    }
    return null;
  };

  const diseaseData = getDiseaseData(diseaseName);

  if (!diseaseData) {
    return (
      <View style={[styles.errorContainer, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}>
        <StatusBar barStyle="light-content" backgroundColor="#111827" translucent />
        <Text style={styles.errorText}>{t.diseaseDetail.noDiseaseInfo}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>{t.diseaseDetail.goBack}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const color = DISEASE_COLORS[diseaseName] || '#10B981';
  const icon = DISEASE_ICONS[diseaseName] || 'leaf';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" translucent />
      {/* Header */}
      <LinearGradient
        colors={['rgba(31, 41, 55, 1)', 'rgba(31, 41, 55, 0.8)']}
        style={[
          styles.header,
          { 
            paddingTop: insets.top + 16,
            paddingHorizontal: horizontalPadding + 4,
          }
        ]}
      >
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View
            style={[
              styles.headerIconContainer,
              { backgroundColor: color + '20' },
            ]}
          >
            <MaterialCommunityIcons
              name={icon as any}
              size={40}
              color={color}
            />
          </View>
          <Text style={styles.headerTitle}>{diseaseName}</Text>
          {confidence && (
            <Text style={styles.confidenceText}>
              {t.diseaseDetail.confidence}: {parseFloat(confidence).toFixed(1)}%
            </Text>
          )}
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          styles.contentInner, 
          { 
            paddingHorizontal: horizontalPadding,
            paddingBottom: insets.bottom + 24,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="information"
              size={22}
              color={color}
            />
            <Text style={styles.sectionTitle}>{t.diseaseDetail.about}</Text>
          </View>
          <Text style={styles.sectionText}>{diseaseData.description}</Text>
        </View>

        {/* Treatment Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={22}
              color="#10B981"
            />
            <Text style={styles.sectionTitle}>{t.diseaseDetail.recommendation}</Text>
          </View>
          <Text style={styles.sectionText}>{diseaseData.treatment}</Text>
        </View>

        {/* Chat with AI Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.aiChatButton}
            onPress={() => {
              router.push({
                pathname: '/rubber-chat' as any,
                params: {
                  diseaseName: diseaseName,
                },
              });
            }}
          >
            <MaterialCommunityIcons name="robot" size={24} color="#FFF" />
            <Text style={styles.aiChatButtonText}>{t.diseaseDetail.chatWithAI}</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  backButtonHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 16,
  },
  headerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  confidenceText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  sectionText: {
    fontSize: 15,
    color: '#E5E7EB',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  aiChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  aiChatButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 12,
    marginTop: 6,
    flexShrink: 0,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  listText: {
    fontSize: 15,
    color: '#E5E7EB',
    flex: 1,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  actionButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
