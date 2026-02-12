import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  checkDiseaseApiHealth,
  detectDisease,
  DiseaseDetectionResult,
  DiseaseLabel,
} from '../services/api';


interface DiseaseInfo {
  color: string;
  icon: string;
  description: string;
  treatment: string;
}

// Disease info mapped to backend disease labels
const DISEASE_INFO: Record<DiseaseLabel, DiseaseInfo> = {
  Healthy: {
    color: '#10B981',
    icon: 'leaf',
    description: 'The leaf appears healthy with no visible signs of disease. Leaves show normal green coloration and proper development.',
    treatment: 'Maintain regular care with proper watering, balanced fertilization, and good drainage. Continue monitoring for any disease symptoms.',
  },
  'Birds-eye': {
    color: '#EF4444',
    icon: 'eye-circle',
    description: 'Fungal disease caused by Helminthosporium heveae. Characterized by small circular lesions (3-6mm) with dark brown centers and lighter borders, resembling a bird\'s eye. Spots often have raised appearance with concentric rings.',
    treatment: 'Apply copper oxychloride (0.2%) fungicide monthly during favorable weather. Improve air circulation through proper pruning. Use carbamate fungicides like thiram or mancozeb. Remove and destroy infected leaves.',
  },
  'Colletorichum-leaf-disease': {
    color: '#DC2626',
    icon: 'virus',
    description: 'Anthracnose disease caused by Colletotrichum species (C. siamense, C. fructicola). Creates dark, sunken lesions with pink/orange gelatinous spore masses. Causes circular brown spots, papery lesions, and severe defoliation in susceptible varieties.',
    treatment: 'Apply systemic fungicides like propiconazole or chlorothalonil every 10-14 days. Use copper-based fungicides for prevention. Improve drainage and remove infected plant material. Avoid overhead watering.',
  },
  'Corynespora': {
    color: '#B91C1C',
    icon: 'bacteria',
    description: 'Severe fungal disease caused by Corynespora cassiicola. Creates characteristic brown spots with yellow halos (2-10mm diameter), fishbone or railway track-shaped lesions. Can cause up to 45% yield loss and massive defoliation.',
    treatment: 'Apply mancozeb (3g/L) or carbendazim + mancozeb mixture at 7-14 day intervals. Improve plantation drainage and avoid nitrogen over-fertilization. Use Bordeaux mixture and rotate fungicides to prevent resistance.',
  },
  'Pesta': {
    color: '#F59E0B',
    icon: 'alert-circle',
    description: 'Emerging devastating disease caused by Pestalotiopsis and Neopestalotiopsis species. Dark to light brown circular spots on mature leaves. Can cause up to 100% defoliation three times per year, reducing yields by approximately 30%.',
    treatment: 'Apply mancozeb 80% (3.2g/L) with adjuvant at 10-14 day intervals. Eliminate overhead irrigation, improve air circulation through wide plant spacing. Remove and burn infected leaves. Maintain proper nutrition and water management.',
  },
  'Powdery-mildew': {
    color: '#8B5CF6',
    icon: 'blur',
    description: 'Caused by Erysiphe quercicola (formerly Oidium heveae). White to gray powdery coating on young leaves, buds, and immature tissues. Thrives at 25-28°C with 97-100% humidity. Can reduce latex yields by up to 45%.',
    treatment: 'Apply sulfur fungicides weekly (9 kg/ha per rotation). Use thermal fogging pre-monsoon for complete protection. Apply fungicides like tebuconazole or hexaconazole. Improve air circulation and avoid dense canopy.',
  },
};

const FALLBACK_INFO: DiseaseInfo = {
  color: '#6B7280',
  icon: 'alert-circle-outline',
  description:
    'No detailed information is available for this condition in the app.',
  treatment:
    'Consult an agronomist or extension officer for specific recommendations.',
};

type ScreenState = 'camera' | 'preview' | 'result';

// Disease Info Display Component
interface DiseaseInfoDisplayProps {
  diseaseInfo: DiseaseInfo;
  diseaseName: string;
  onChatPress: () => void;
}

const DiseaseInfoDisplay: React.FC<DiseaseInfoDisplayProps> = ({
  diseaseInfo,
  diseaseName,
  onChatPress,
}) => {
  return (
    <View style={styles.diseaseInfoContainer}>
      <View style={styles.diseaseInfoCard}>
        <View style={styles.diseaseInfoHeader}>
          <MaterialCommunityIcons
            name={diseaseInfo.icon as any}
            size={28}
            color={diseaseInfo.color}
          />
          <Text style={styles.diseaseInfoTitle}>{diseaseName}</Text>
        </View>
        
        <View style={styles.diseaseInfoSection}>
          <View style={styles.sectionLabelContainer}>
            <MaterialCommunityIcons name="information" size={18} color="#10B981" />
            <Text style={styles.sectionLabel}>About This Disease</Text>
          </View>
          <Text style={styles.sectionText}>{diseaseInfo.description}</Text>
        </View>

        <View style={styles.diseaseInfoSection}>
          <View style={styles.sectionLabelContainer}>
            <MaterialCommunityIcons name="medical-bag" size={18} color="#10B981" />
            <Text style={styles.sectionLabel}>Recommended Treatment</Text>
          </View>
          <Text style={styles.sectionText}>{diseaseInfo.treatment}</Text>
        </View>

        <TouchableOpacity 
          style={styles.chatWithAIButton} 
          onPress={onChatPress}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="robot" size={22} color="#FFF" />
          <Text style={styles.chatWithAIButtonText}>Chat with AI Assistant</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DiseaseDetectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [screenState, setScreenState] = useState<ScreenState>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  const cameraRef = useRef<CameraView>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkApiStatus();
  }, []);

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isAnalyzing) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      scanLineAnim.setValue(0);
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [isAnalyzing, scanLineAnim]);

  const checkApiStatus = async () => {
    try {
      const health = await checkDiseaseApiHealth();
      setApiReady(health.status === 'healthy');
      if (health.status !== 'healthy') {
        console.warn('Disease API not healthy:', health.error);
      }
    } catch (error) {
      console.log('API check error:', error);
      setApiReady(false);
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo?.uri) {
        setCapturedImage(photo.uri);
        setScreenState('preview');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!pickerResult.canceled && pickerResult.assets[0]) {
      setCapturedImage(pickerResult.assets[0].uri);
      setScreenState('preview');
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    try {
      const detectionResult = await detectDisease(capturedImage);
      setResult(detectionResult);
      setScreenState('result');
    } catch (error: any) {
      console.log('Analysis error:', error);
      Alert.alert(
        'Analysis Error',
        error.message || 'Failed to analyze the image. Make sure the server is running.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setResult(null);
    setScreenState('camera');
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const handleChatPress = () => {
    if (!result) return;
    
    const diseaseInfo = DISEASE_INFO[result.label as DiseaseLabel] ?? FALLBACK_INFO;
    
    router.push({
      pathname: '/rubber-chat' as any,
      params: {
        diseaseName: result.label,
        diseaseDescription: diseaseInfo.description,
        treatment: diseaseInfo.treatment,
        confidence: result.confidence.toString(),
      },
    });
  };

  // Loading permission
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialCommunityIcons name="camera-off" size={64} color="#6B7280" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          We need camera access to analyze rubber leaf diseases
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera Screen
  if (screenState === 'camera') {
    return (
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        <View style={styles.cameraOverlay}>
          <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 12 : (Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 60) }]}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/diagnose')}>
              <Ionicons name="arrow-back" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Disease Detection</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>
          {!apiReady && (
            <View style={styles.warningBadgeContainer}>
              <View style={styles.warningBadge}>
                <Ionicons name="warning" size={14} color="#FFF" />
                <Text style={styles.warningBadgeText}>Server Offline</Text>
              </View>
            </View>
          )}

          <View style={styles.frameContainer}>
            <View style={styles.frameGuide}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <Text style={styles.guideText}>Position the leaf within the frame</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
              <Ionicons name="images" size={28} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Preview Screen
  if (screenState === 'preview' && capturedImage) {
    const translateY = scanLineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    });

    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />

        {isAnalyzing && (
          <View style={styles.scanOverlay}>
            <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
            <View style={styles.scanningTextContainer}>
              <ActivityIndicator size="small" color="#10B981" />
              <Text style={styles.scanningText}>Analyzing leaf...</Text>
            </View>
          </View>
        )}

        {!isAnalyzing && (
          <View style={styles.previewActions}>
            <TouchableOpacity style={styles.previewButton} onPress={resetCapture}>
              <Ionicons name="close" size={24} color="#FFF" />
              <Text style={styles.previewButtonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.previewButton, styles.analyzeButton]}
              onPress={analyzeImage}
            >
              <MaterialCommunityIcons name="leaf-circle" size={24} color="#FFF" />
              <Text style={styles.previewButtonText}>Analyze</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // Result Screen
  if (screenState === 'result' && result && capturedImage) {
    // Check if the image is a valid rubber leaf
    if (!result.isValidLeaf) {
      return (
        <View style={styles.container}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          <View style={styles.invalidLeafOverlay}>
            <View style={styles.invalidLeafCard}>
              <MaterialCommunityIcons name="leaf-off" size={64} color="#EF4444" />
              <Text style={styles.invalidLeafTitle}>Not a Rubber Leaf</Text>
              <Text style={styles.invalidLeafMessage}>
                {result.validationMessage || 'The image does not appear to be a rubber leaf. Please capture a clear image of a rubber leaf for accurate disease detection.'}
              </Text>
              <View style={styles.invalidLeafTips}>
                <Text style={styles.invalidLeafTipsTitle}>Tips for better results:</Text>
                <Text style={styles.invalidLeafTipItem}>• Capture a single rubber leaf</Text>
                <Text style={styles.invalidLeafTipItem}>• Ensure good lighting</Text>
                <Text style={styles.invalidLeafTipItem}>• Hold the camera steady</Text>
                <Text style={styles.invalidLeafTipItem}>• Fill the frame with the leaf</Text>
              </View>
              <TouchableOpacity style={styles.tryAgainButton} onPress={resetCapture}>
                <Ionicons name="camera" size={20} color="#FFF" />
                <Text style={styles.tryAgainButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    const diseaseInfo =
      DISEASE_INFO[result.label as DiseaseLabel] ?? FALLBACK_INFO;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Image source={{ uri: capturedImage }} style={styles.resultImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.resultImageOverlay}
          />
          <View style={styles.resultBadge}>
            <MaterialCommunityIcons
              name={diseaseInfo.icon as any}
              size={32}
              color={diseaseInfo.color}
            />
            <Text style={[styles.resultLabel, { color: diseaseInfo.color }]}>
              {result.label}
            </Text>
            <Text style={styles.confidenceText}>
              {result.confidence.toFixed(1)}% Confidence
            </Text>
          </View>
        </View>

        {/* Disease Info Display Component */}
        <DiseaseInfoDisplay
          diseaseInfo={diseaseInfo}
          diseaseName={result.label}
          onChatPress={handleChatPress}
        />

        <View style={styles.predictionsCard}>
          <Text style={styles.predictionsTitle}>All Predictions</Text>
          {result.allPredictions.map((pred) => {
            const info =
              DISEASE_INFO[pred.label as DiseaseLabel] ?? FALLBACK_INFO;

            return (
              <View key={pred.label} style={styles.predictionRow}>
                <View style={styles.predictionLabelContainer}>
                  <MaterialCommunityIcons
                    name={info.icon as any}
                    size={16}
                    color={info.color}
                  />
                  <Text style={styles.predictionLabel}>{pred.label}</Text>
                </View>
                <View style={styles.predictionBarContainer}>
                  <View
                    style={[
                      styles.predictionBar,
                      {
                        width: `${Math.min(pred.confidence, 100)}%`,
                        backgroundColor: info.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.predictionConfidence}>
                  {pred.confidence.toFixed(1)}%
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.resultActions}>
          <TouchableOpacity style={styles.resultButton} onPress={resetCapture}>
            <Ionicons name="camera" size={20} color="#FFF" />
            <Text style={styles.resultButtonText}>Scan Another</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#10B981" />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerRightPlaceholder: {
    width: 44,
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9CA3AF',
    marginTop: 12,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
  warningBadgeContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  warningBadgeText: {
    color: '#FFF',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  frameContainer: {
    alignItems: 'center',
  },
  frameGuide: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#10B981',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 12,
  },
  guideText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 16,
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 40,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 20,
  },
  permissionText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
  permissionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  permissionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    width: '80%',
    height: 3,
    backgroundColor: '#10B981',
  },
  scanningTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scanningText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  previewActions: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
  },
  analyzeButton: {
    backgroundColor: '#10B981',
  },
  previewButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContent: {
    paddingBottom: 40,
  },
  resultHeader: {
    height: 300,
    position: 'relative',
  },
  resultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  resultImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  resultBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  confidenceText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  // Disease Info Display Styles
  diseaseInfoContainer: {
    padding: 16,
  },
  diseaseInfoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diseaseInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  diseaseInfoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 12,
    flex: 1,
  },
  diseaseInfoSection: {
    marginBottom: 20,
  },
  sectionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 22,
  },
  chatWithAIButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  chatWithAIButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  predictionsCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
  },
  predictionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  predictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
  },
  predictionLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 6,
  },
  predictionBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  predictionBar: {
    height: '100%',
    borderRadius: 4,
  },
  predictionConfidence: {
    fontSize: 12,
    color: '#9CA3AF',
    width: 45,
    textAlign: 'right',
  },
  resultActions: {
    padding: 16,
    alignItems: 'center',
  },
  resultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  resultButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Invalid Leaf Styles
  invalidLeafOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  invalidLeafCard: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    maxWidth: 340,
    width: '100%',
    borderWidth: 1,
    borderColor: '#374151',
  },
  invalidLeafTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
  },
  invalidLeafMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  invalidLeafTips: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  invalidLeafTipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 10,
  },
  invalidLeafTipItem: {
    fontSize: 13,
    color: '#D1D5DB',
    marginBottom: 6,
    lineHeight: 20,
  },
  tryAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
  },
  tryAgainButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});