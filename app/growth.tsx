import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  Animated,
  Platform,
  GestureResponderEvent,
  Easing,
  StatusBar,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useLanguage } from '../context/LanguageContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Reference card dimensions (standard credit card size in cm)
const REFERENCE_CARD_WIDTH_CM = 8.56;

// Standard tappable girth for rubber trees
const TAPPABLE_GIRTH_CM = 50;

// Storage key
const MEASUREMENTS_STORAGE_KEY = '@rubberedge_measurements';

// Type definitions
interface Point {
  x: number;
  y: number;
}

interface Measurement {
  id: string;
  treeId: string;
  girth: number;
  height?: number;
  location: string;
  notes: string;
  createdAt: string;
  date: string;
  method: 'camera' | 'manual';
}

interface MeasurementFormData {
  treeId: string;
  location: string;
  notes: string;
}

interface GrowthStatus {
  status: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface GrowthMeasurementScreenProps {
  // Props if needed
}

const GrowthMeasurementScreen: React.FC<GrowthMeasurementScreenProps> = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [measurementStep, setMeasurementStep] = useState<'reference' | 'trunk' | 'complete'>('reference');
  const [referencePoints, setReferencePoints] = useState<Point[]>([]);
  const [trunkPoints, setTrunkPoints] = useState<Point[]>([]);
  const [calculatedGirth, setCalculatedGirth] = useState<number | null>(null);
  const [pixelsPerCm, setPixelsPerCm] = useState<number | null>(null);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [measurementData, setMeasurementData] = useState<MeasurementFormData>({
    treeId: '',
    location: '',
    notes: '',
  });
  const [showManualEntry, setShowManualEntry] = useState<boolean>(false);
  const [manualGirth, setManualGirth] = useState<string>('');
  const [manualHeight, setManualHeight] = useState<string>('');
  const [manualTreeId, setManualTreeId] = useState<string>('');
  const [manualLocation, setManualLocation] = useState<string>('');
  const [manualNotes, setManualNotes] = useState<string>('');

  const cameraRef = useRef<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const cardSlideAnims = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    loadMeasurements();
  }, []);

  useEffect(() => {
    // Main entrance animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for the measure icon
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Continuous rotation for decorative elements
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, []);

  // Animate progress bar when latest measurement changes (uses JS driver for width)
  useEffect(() => {
    if (measurements.length > 0) {
      const latestGirth = measurements[0].girth;
      const progress = Math.min((latestGirth / TAPPABLE_GIRTH_CM) * 100, 100);
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // width doesn't support native driver
      }).start();
    }
  }, [measurements]);

  // Initialize card slide animations when measurements change
  useEffect(() => {
    // Reset and create new animation values for new items
    measurements.forEach((_, index) => {
      if (!cardSlideAnims[index]) {
        cardSlideAnims[index] = new Animated.Value(50);
      }
    });
    
    // Stagger animate cards
    const animations = measurements.map((_, index) => {
      if (cardSlideAnims[index]) {
        cardSlideAnims[index].setValue(50);
        return Animated.spring(cardSlideAnims[index], {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        });
      }
      return null;
    }).filter((anim): anim is Animated.CompositeAnimation => anim !== null);

    if (animations.length > 0) {
      Animated.stagger(80, animations).start();
    }
  }, [measurements.length]);

  const animateButtonPress = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => callback());
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const loadMeasurements = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(MEASUREMENTS_STORAGE_KEY);
      if (stored) {
        setMeasurements(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load measurements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMeasurementsToStorage = async (newMeasurements: Measurement[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(MEASUREMENTS_STORAGE_KEY, JSON.stringify(newMeasurements));
      setMeasurements(newMeasurements);
    } catch (error) {
      console.error('Failed to save measurements:', error);
      Alert.alert(t.common.error, t.growthScreen.failedToSaveMeasurement);
    }
  };

  const handleCameraTouch = (event: GestureResponderEvent): void => {
    const { locationX, locationY } = event.nativeEvent;
    const point: Point = { x: locationX, y: locationY };

    if (measurementStep === 'reference') {
      if (referencePoints.length < 2) {
        const newPoints: Point[] = [...referencePoints, point];
        setReferencePoints(newPoints);

        if (newPoints.length === 2) {
          const refPixelDistance = Math.sqrt(
            Math.pow(newPoints[1].x - newPoints[0].x, 2) +
            Math.pow(newPoints[1].y - newPoints[0].y, 2)
          );
          const pxPerCm = refPixelDistance / REFERENCE_CARD_WIDTH_CM;
          setPixelsPerCm(pxPerCm);
          setTimeout(() => setMeasurementStep('trunk'), 600);
        }
      }
    } else if (measurementStep === 'trunk') {
      if (trunkPoints.length < 2) {
        const newPoints: Point[] = [...trunkPoints, point];
        setTrunkPoints(newPoints);

        if (newPoints.length === 2 && pixelsPerCm) {
          const trunkPixelDistance = Math.sqrt(
            Math.pow(newPoints[1].x - newPoints[0].x, 2) +
            Math.pow(newPoints[1].y - newPoints[0].y, 2)
          );
          const trunkDiameterCm = trunkPixelDistance / pixelsPerCm;
          const girthCm = Math.round(trunkDiameterCm * Math.PI * 10) / 10;
          setCalculatedGirth(girthCm);
          setMeasurementStep('complete');
        }
      }
    }
  };

  const resetMeasurement = (): void => {
    setReferencePoints([]);
    setTrunkPoints([]);
    setMeasurementStep('reference');
    setCalculatedGirth(null);
    setPixelsPerCm(null);
  };

  const openSaveModal = (): void => {
    if (calculatedGirth) {
      setShowSaveModal(true);
    }
  };

  const confirmSaveMeasurement = async (): Promise<void> => {
    if (!measurementData.treeId.trim()) {
      Alert.alert('Required Field', 'Please enter a Tree ID');
      return;
    }

    if (calculatedGirth === null) return;

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      treeId: measurementData.treeId.trim(),
      girth: calculatedGirth,
      location: measurementData.location.trim(),
      notes: measurementData.notes.trim(),
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-CA'),
      method: 'camera',
    };

    const updatedMeasurements = [newMeasurement, ...measurements];
    await saveMeasurementsToStorage(updatedMeasurements);

    setShowSaveModal(false);
    setShowCamera(false);
    resetMeasurement();
    setMeasurementData({ treeId: '', location: '', notes: '' });

    Alert.alert(t.common.success, `${t.growthScreen.measurementSaved}\nTree: ${newMeasurement.treeId}\nGirth: ${calculatedGirth} cm`);
  };

  const resetManualEntry = (): void => {
    setManualGirth('');
    setManualHeight('');
    setManualTreeId('');
    setManualLocation('');
    setManualNotes('');
  };

  const confirmManualEntry = async (): Promise<void> => {
    if (!manualTreeId.trim()) {
      Alert.alert(t.growthScreen.requiredField, t.growthScreen.pleaseEnterTreeId);
      return;
    }

    if (!manualGirth.trim()) {
      Alert.alert(t.growthScreen.requiredField, t.growthScreen.pleaseEnterGirth);
      return;
    }

    const girthValue = parseFloat(manualGirth);
    if (isNaN(girthValue) || girthValue <= 0) {
      Alert.alert(t.growthScreen.invalidValue, t.growthScreen.pleaseEnterValidGirth);
      return;
    }

    const heightValue = manualHeight.trim() ? parseFloat(manualHeight) : undefined;
    if (manualHeight.trim() && (isNaN(heightValue!) || heightValue! <= 0)) {
      Alert.alert(t.growthScreen.invalidValue, t.growthScreen.pleaseEnterValidHeight);
      return;
    }

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      treeId: manualTreeId.trim(),
      girth: girthValue,
      height: heightValue,
      location: manualLocation.trim(),
      notes: manualNotes.trim(),
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-CA'),
      method: 'manual',
    };

    const updatedMeasurements = [newMeasurement, ...measurements];
    await saveMeasurementsToStorage(updatedMeasurements);

    setShowManualEntry(false);
    resetManualEntry();

    Alert.alert(t.common.success, `${t.growthScreen.measurementSaved}\nTree: ${newMeasurement.treeId}\nGirth: ${girthValue} cm`);
  };

  const deleteMeasurement = async (id: string): Promise<void> => {
    Alert.alert(
      t.growthScreen.deleteMeasurement,
      t.growthScreen.deleteConfirmation,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.growthScreen.deleteRecord,
          style: 'destructive',
          onPress: async () => {
            const updatedMeasurements = measurements.filter(m => m.id !== id);
            await saveMeasurementsToStorage(updatedMeasurements);
          },
        },
      ]
    );
  };

  const getGrowthStatus = (girth: number): GrowthStatus => {
    const percentage = (girth / TAPPABLE_GIRTH_CM) * 100;
    if (percentage >= 100) return { status: t.growthScreen.readyForTapping, color: '#10B981', icon: 'checkmark-circle' };
    if (percentage >= 80) return { status: t.growthScreen.almostReady, color: '#F59E0B', icon: 'time' };
    if (percentage >= 50) return { status: t.growthScreen.growingWell, color: '#3B82F6', icon: 'trending-up' };
    return { status: t.growthScreen.earlyStage, color: '#8B5CF6', icon: 'leaf' };
  };

  const getLatestMeasurement = (): Measurement | null => {
    return measurements.length > 0 ? measurements[0] : null;
  };

  const renderMeasurementOverlay = () => {
    const getInstructionText = (): string => {
      switch (measurementStep) {
        case 'reference':
          return `${t.growthScreen.tapCardPoints} (${referencePoints.length}/2)`;
        case 'trunk':
          return `${t.growthScreen.tapTrunkPoints} (${trunkPoints.length}/2)`;
        case 'complete':
          return t.growthScreen.measurementComplete;
        default:
          return '';
      }
    };

    const getStepColor = (): string => {
      switch (measurementStep) {
        case 'reference': return '#F59E0B';
        case 'trunk': return '#10B981';
        case 'complete': return '#3B82F6';
        default: return '#fff';
      }
    };

    return (
      <View style={styles.measurementOverlay} pointerEvents="box-none">
        <View style={[styles.cameraHeader, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.cameraHeaderButton}
            onPress={() => {
              setShowCamera(false);
              resetMeasurement();
            }}
          >
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>

          <View style={styles.stepIndicator}>
            <View style={[
              styles.stepDot,
              { backgroundColor: referencePoints.length === 2 ? '#10B981' : (measurementStep === 'reference' ? '#F59E0B' : '#666') },
              measurementStep === 'reference' && styles.stepDotActive
            ]} />
            <View style={[styles.stepLine, { backgroundColor: referencePoints.length === 2 ? '#10B981' : '#666' }]} />
            <View style={[
              styles.stepDot,
              { backgroundColor: trunkPoints.length === 2 ? '#10B981' : (measurementStep === 'trunk' ? '#F59E0B' : '#666') },
              measurementStep === 'trunk' && styles.stepDotActive
            ]} />
            <View style={[styles.stepLine, { backgroundColor: trunkPoints.length === 2 ? '#10B981' : '#666' }]} />
            <View style={[
              styles.stepDot,
              { backgroundColor: measurementStep === 'complete' ? '#3B82F6' : '#666' },
              measurementStep === 'complete' && styles.stepDotActive
            ]} />
          </View>

          <TouchableOpacity
            style={styles.cameraHeaderButton}
            onPress={() => setShowGuide(true)}
          >
            <Ionicons name="help-circle" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Reference Points */}
        {referencePoints.map((point, index) => (
          <View
            key={`ref-${index}`}
            style={[
              styles.measurePoint,
              styles.referencePointStyle,
              { left: point.x - 15, top: point.y - 15 },
            ]}
          >
            <Text style={styles.pointLabelText}>R{index + 1}</Text>
          </View>
        ))}

        {/* Reference Line */}
        {referencePoints.length === 2 && (
          <View
            style={[
              styles.measureLine,
              styles.referenceLineStyle,
              {
                left: referencePoints[0].x,
                top: referencePoints[0].y - 2,
                width: Math.sqrt(
                  Math.pow(referencePoints[1].x - referencePoints[0].x, 2) +
                  Math.pow(referencePoints[1].y - referencePoints[0].y, 2)
                ),
                transform: [{
                  rotate: `${Math.atan2(
                    referencePoints[1].y - referencePoints[0].y,
                    referencePoints[1].x - referencePoints[0].x
                  )}rad`
                }],
              },
            ]}
          />
        )}

        {/* Trunk Points */}
        {trunkPoints.map((point, index) => (
          <View
            key={`trunk-${index}`}
            style={[
              styles.measurePoint,
              styles.trunkPointStyle,
              { left: point.x - 15, top: point.y - 15 },
            ]}
          >
            <Text style={styles.pointLabelText}>T{index + 1}</Text>
          </View>
        ))}

        {/* Trunk Line */}
        {trunkPoints.length === 2 && (
          <View
            style={[
              styles.measureLine,
              styles.trunkLineStyle,
              {
                left: trunkPoints[0].x,
                top: trunkPoints[0].y - 2,
                width: Math.sqrt(
                  Math.pow(trunkPoints[1].x - trunkPoints[0].x, 2) +
                  Math.pow(trunkPoints[1].y - trunkPoints[0].y, 2)
                ),
                transform: [{
                  rotate: `${Math.atan2(
                    trunkPoints[1].y - trunkPoints[0].y,
                    trunkPoints[1].x - trunkPoints[0].x
                  )}rad`
                }],
              },
            ]}
          />
        )}

        {/* Result Display */}
        {calculatedGirth !== null && (
          <View style={styles.resultOverlay}>
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.95)', 'rgba(5, 150, 105, 0.95)']}
              style={styles.resultCard}
            >
              <MaterialCommunityIcons name="tape-measure" size={28} color="#fff" />
              <View style={styles.resultInfo}>
                <Text style={styles.resultLabel}>Calculated Girth</Text>
                <Text style={styles.resultValue}>{calculatedGirth} cm</Text>
              </View>
              <View style={styles.resultStatusBadge}>
                <Ionicons name={getGrowthStatus(calculatedGirth).icon} size={16} color="#fff" />
                <Text style={styles.resultStatusText}>{getGrowthStatus(calculatedGirth).status}</Text>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Instruction Bar */}
        <View style={styles.instructionBar}>
          <View style={[styles.instructionDot, { backgroundColor: getStepColor() }]} />
          <Text style={styles.instructionText}>{getInstructionText()}</Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.cameraControls}>
          <TouchableOpacity
            style={[styles.controlButton, styles.resetButton]}
            onPress={resetMeasurement}
          >
            <Ionicons name="refresh" size={22} color="#fff" />
            <Text style={styles.controlButtonText}>{t.growthScreen.reset}</Text>
          </TouchableOpacity>

          {measurementStep === 'complete' && calculatedGirth && (
            <TouchableOpacity
              style={[styles.controlButton, styles.saveButtonCamera]}
              onPress={openSaveModal}
            >
              <Ionicons name="save" size={22} color="#fff" />
              <Text style={styles.controlButtonText}>{t.common.save}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderCamera = () => (
    <Modal visible={showCamera} animationType="slide">
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onTouchEnd={handleCameraTouch}
        >
          {renderMeasurementOverlay()}
        </CameraView>
      </View>
    </Modal>
  );

  const renderSaveModal = () => (
    <Modal visible={showSaveModal} animationType="slide" transparent>
      <View style={styles.saveModalOverlay}>
        <View style={styles.saveModalContent}>
          <View style={styles.saveModalHeader}>
            <Text style={styles.saveModalTitle}>{t.growthScreen.saveMeasurement}</Text>
            <TouchableOpacity onPress={() => setShowSaveModal(false)}>
              <Ionicons name="close-circle" size={28} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.measurementPreview}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.measurementPreviewGradient}
            >
              <MaterialCommunityIcons name="tree" size={32} color="#fff" />
              <View style={styles.measurementPreviewInfo}>
                <Text style={styles.measurementPreviewLabel}>Girth Measurement</Text>
                <Text style={styles.measurementPreviewValue}>{calculatedGirth} cm</Text>
              </View>
              {calculatedGirth && (
                <View style={styles.previewStatusBadge}>
                  <Text style={styles.previewStatusText}>
                    {getGrowthStatus(calculatedGirth).status}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </View>

          <View style={styles.saveForm}>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Tree ID *</Text>
              <TextInput
                style={styles.formInput}
                value={measurementData.treeId}
                onChangeText={(text) => setMeasurementData(prev => ({ ...prev, treeId: text }))}
                placeholder="e.g., T-001, Block-A-15"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.formLabel}>Location</Text>
              <TextInput
                style={styles.formInput}
                value={measurementData.location}
                onChangeText={(text) => setMeasurementData(prev => ({ ...prev, location: text }))}
                placeholder="e.g., Block A, Row 5"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.formLabel}>Notes</Text>
              <TextInput
                style={[styles.formInput, styles.formTextArea]}
                value={measurementData.notes}
                onChangeText={(text) => setMeasurementData(prev => ({ ...prev, notes: text }))}
                placeholder="Any observations..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <View style={styles.saveModalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSaveModal(false)}
            >
              <Text style={styles.cancelButtonText}>{t.common.cancel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmSaveButton}
              onPress={confirmSaveMeasurement}
            >
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.confirmSaveGradient}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
                <Text style={styles.confirmSaveText}>{t.common.save}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderGuideModal = () => (
    <Modal visible={showGuide} animationType="fade" transparent>
      <View style={styles.guideModalOverlay}>
        <View style={styles.guideModalContent}>
          <View style={styles.guideModalHeader}>
            <Text style={styles.guideModalTitle}>{t.growthScreen.howToMeasure}</Text>
            <TouchableOpacity onPress={() => setShowGuide(false)}>
              <Ionicons name="close-circle" size={28} color="#064E3B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.guideStep}>
              <View style={[styles.guideStepNumber, { backgroundColor: '#F59E0B' }]}>
                <Text style={styles.guideStepNumberText}>1</Text>
              </View>
              <View style={styles.guideStepContent}>
                <Text style={styles.guideStepTitle}>{t.growthScreen.positionReferenceCard}</Text>
                <Text style={styles.guideStepDesc}>
                  {t.growthScreen.holdCard}
                </Text>
              </View>
            </View>

            <View style={styles.guideStep}>
              <View style={[styles.guideStepNumber, { backgroundColor: '#F59E0B' }]}>
                <Text style={styles.guideStepNumberText}>2</Text>
              </View>
              <View style={styles.guideStepContent}>
                <Text style={styles.guideStepTitle}>{t.growthScreen.markCardWidth}</Text>
                <Text style={styles.guideStepDesc}>
                  {t.growthScreen.tapLeftRight}
                </Text>
              </View>
            </View>

            <View style={styles.guideStep}>
              <View style={[styles.guideStepNumber, { backgroundColor: '#10B981' }]}>
                <Text style={styles.guideStepNumberText}>3</Text>
              </View>
              <View style={styles.guideStepContent}>
                <Text style={styles.guideStepTitle}>{t.growthScreen.markTrunkDiameter}</Text>
                <Text style={styles.guideStepDesc}>
                  {t.growthScreen.tapTwoPoints}
                </Text>
              </View>
            </View>

            <View style={styles.guideStep}>
              <View style={[styles.guideStepNumber, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.guideStepNumberText}>4</Text>
              </View>
              <View style={styles.guideStepContent}>
                <Text style={styles.guideStepTitle}>{t.growthScreen.saveMeasurement}</Text>
                <Text style={styles.guideStepDesc}>
                  {t.growthScreen.onceCalculated}
                </Text>
              </View>
            </View>

            <View style={styles.guideInfo}>
              <Ionicons name="information-circle" size={24} color="#059669" />
              <Text style={styles.guideInfoText}>
                {t.growthScreen.treeReadyForTapping} {t.growthScreen.typicallyYears}
              </Text>
            </View>

            <View style={styles.guideTip}>
              <Ionicons name="bulb" size={24} color="#F59E0B" />
              <Text style={styles.guideTipText}>
                {t.growthScreen.bestAccuracy}
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.guideCloseButton}
            onPress={() => setShowGuide(false)}
          >
            <Text style={styles.guideCloseButtonText}>{t.growthScreen.gotIt}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderManualEntryModal = () => (
    <Modal visible={showManualEntry} animationType="slide" transparent>
      <View style={styles.saveModalOverlay}>
        <View style={styles.manualEntryContent}>
          <View style={styles.saveModalHeader}>
            <Text style={styles.saveModalTitle}>{t.growthScreen.manualEntry}</Text>
            <TouchableOpacity onPress={() => {
              setShowManualEntry(false);
              resetManualEntry();
            }}>
              <Ionicons name="close-circle" size={28} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Manual Entry Header */}
            <View style={styles.manualEntryHeader}>
              <View style={styles.manualEntryIconContainer}>
                <MaterialCommunityIcons name="pencil-ruler" size={32} color="#3B82F6" />
              </View>
              <Text style={styles.manualEntrySubtitle}>
                {t.growthScreen.enterMeasurements}
              </Text>
            </View>

            <View style={styles.saveForm}>
              {/* Tree ID */}
              <View style={styles.formField}>
                <Text style={styles.formLabel}>{t.growthScreen.treeId} *</Text>
                <TextInput
                  style={styles.formInput}
                  value={manualTreeId}
                  onChangeText={setManualTreeId}
                  placeholder={t.growthScreen.eg}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Measurements Row */}
              <View style={styles.measurementRow}>
                <View style={styles.measurementField}>
                  <Text style={styles.formLabel}>{t.growthScreen.girthCm} *</Text>
                  <View style={styles.measurementInputContainer}>
                    <TextInput
                      style={styles.measurementInput}
                      value={manualGirth}
                      onChangeText={setManualGirth}
                      placeholder="50"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="decimal-pad"
                    />
                    <View style={styles.measurementUnit}>
                      <Text style={styles.measurementUnitText}>cm</Text>
                    </View>
                  </View>
                  <Text style={styles.measurementHint}>{t.growthScreen.circumference}</Text>
                </View>

                <View style={styles.measurementField}>
                  <Text style={styles.formLabel}>{t.growthScreen.heightCm}</Text>
                  <View style={styles.measurementInputContainer}>
                    <TextInput
                      style={styles.measurementInput}
                      value={manualHeight}
                      onChangeText={setManualHeight}
                      placeholder="500"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="decimal-pad"
                    />
                    <View style={styles.measurementUnit}>
                      <Text style={styles.measurementUnitText}>cm</Text>
                    </View>
                  </View>
                  <Text style={styles.measurementHint}>{t.growthScreen.optional}</Text>
                </View>
              </View>

              {/* Location */}
              <View style={styles.formField}>
                <Text style={styles.formLabel}>{t.growthScreen.location}</Text>
                <TextInput
                  style={styles.formInput}
                  value={manualLocation}
                  onChangeText={setManualLocation}
                  placeholder={t.growthScreen.egBlockA}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Notes */}
              <View style={styles.formField}>
                <Text style={styles.formLabel}>{t.growthScreen.notes}</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextArea]}
                  value={manualNotes}
                  onChangeText={setManualNotes}
                  placeholder={t.growthScreen.observations}
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Quick Status Preview */}
              {manualGirth && !isNaN(parseFloat(manualGirth)) && parseFloat(manualGirth) > 0 && (
                <View style={styles.quickStatusPreview}>
                  <View style={[
                    styles.quickStatusBadge,
                    { backgroundColor: getGrowthStatus(parseFloat(manualGirth)).color + '15' }
                  ]}>
                    <Ionicons
                      name={getGrowthStatus(parseFloat(manualGirth)).icon}
                      size={18}
                      color={getGrowthStatus(parseFloat(manualGirth)).color}
                    />
                    <Text style={[
                      styles.quickStatusText,
                      { color: getGrowthStatus(parseFloat(manualGirth)).color }
                    ]}>
                      {getGrowthStatus(parseFloat(manualGirth)).status}
                    </Text>
                  </View>
                  <Text style={styles.quickStatusProgress}>
                    {Math.round((parseFloat(manualGirth) / TAPPABLE_GIRTH_CM) * 100)}% to tapping readiness
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.saveModalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowManualEntry(false);
                resetManualEntry();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmSaveButton}
              onPress={confirmManualEntry}
            >
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.confirmSaveGradient}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
                <Text style={styles.confirmSaveText}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name="tree-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyStateTitle}>{t.growthScreen.noMeasurements}</Text>
      <Text style={styles.emptyStateDesc}>
        {t.growthScreen.startMeasuringTrees}
      </Text>
    </View>
  );

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t.growthScreen.requestingCamera}</Text>
      </View>
    );
  }

  const latestMeasurement = getLatestMeasurement();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#064E3B" translucent />
      <LinearGradient colors={['#064E3B', '#065F46', '#047857']} style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/diagnose')}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{t.growthScreen.headerTitle}</Text>
          <Text style={styles.headerSubtitle}>{t.growthScreen.headerSubtitle}</Text>
        </View>
        <TouchableOpacity style={styles.infoButton} onPress={() => setShowGuide(true)}>
          <Ionicons name="information-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.measureCard,
            { 
              opacity: fadeAnim, 
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ] 
            },
          ]}
        >
          <LinearGradient
            colors={['#ECFDF5', '#D1FAE5']}
            style={styles.measureCardGradient}
          >
            {/* Animated decorative circles */}
            <Animated.View 
              style={[
                styles.decorativeCircle,
                styles.decorativeCircle1,
                { transform: [{ rotate: spin }] }
              ]} 
            />
            <Animated.View 
              style={[
                styles.decorativeCircle,
                styles.decorativeCircle2,
                { transform: [{ rotate: spin }, { scale: pulseAnim }] }
              ]} 
            />

            <Animated.View style={[styles.measureCardIcon, { transform: [{ scale: pulseAnim }] }]}>
              <MaterialCommunityIcons name="tape-measure" size={40} color="#059669" />
            </Animated.View>
            <Text style={styles.measureCardTitle}>{t.growthScreen.measureTreeGrowth}</Text>
            <Text style={styles.measureCardDesc}>
              {t.growthScreen.useCameraOrManual}
            </Text>

            <View style={styles.measureButtonsContainer}>
              <Animated.View style={[styles.cameraMeasureButton, { transform: [{ scale: buttonScaleAnim }] }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => animateButtonPress(async () => {
                    if (!permission.granted) {
                      const result = await requestPermission();
                      if (!result.granted) {
                        Alert.alert(t.growthScreen.permissionRequired, t.growthScreen.cameraAccessNeeded);
                        return;
                      }
                    }
                    setShowCamera(true);
                  })}
                >
                  <LinearGradient
                    colors={['#059669', '#047857']}
                    style={styles.measureButtonGradient}
                  >
                    <Ionicons name="camera" size={22} color="#fff" />
                    <Text style={styles.measureButtonText}>{t.growthScreen.camera}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={[styles.manualMeasureButton, { transform: [{ scale: buttonScaleAnim }] }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => animateButtonPress(() => setShowManualEntry(true))}
                >
                  <LinearGradient
                    colors={['#3B82F6', '#2563EB']}
                    style={styles.measureButtonGradient}
                  >
                    <Ionicons name="create" size={22} color="#fff" />
                    <Text style={styles.measureButtonText}>{t.growthScreen.manual}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </LinearGradient>
        </Animated.View>

        {latestMeasurement && (
          <Animated.View
            style={[
              styles.progressCard,
              { 
                opacity: fadeAnim, 
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ] 
              },
            ]}
          >
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>{t.growthScreen.latestMeasurement}</Text>
              <View style={styles.dateBadge}>
                <Ionicons name="calendar-outline" size={12} color="#6B7280" />
                <Text style={styles.progressDate}>{latestMeasurement.date}</Text>
              </View>
            </View>

            <View style={styles.latestInfo}>
              <View style={styles.latestTreeInfo}>
                <Text style={styles.latestTreeId}>{latestMeasurement.treeId}</Text>
                {latestMeasurement.location ? (
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color="#6B7280" />
                    <Text style={styles.latestLocation}>{latestMeasurement.location}</Text>
                  </View>
                ) : null}
              </View>
              <Animated.View style={[styles.latestGirthContainer, { transform: [{ scale: pulseAnim }] }]}>
                <Text style={styles.latestGirthValue}>{latestMeasurement.girth}</Text>
                <Text style={styles.latestGirthUnit}>cm</Text>
              </Animated.View>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <Animated.View
                  style={[
                    styles.progressBarFillAnimated,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                >
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.progressBarGradient}
                  />
                </Animated.View>
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabelStart}>0 cm</Text>
                <View style={styles.targetLabel}>
                  <Ionicons name="flag" size={10} color="#059669" />
                  <Text style={styles.progressLabelTarget}>{TAPPABLE_GIRTH_CM} cm</Text>
                </View>
              </View>
            </View>

            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: getGrowthStatus(latestMeasurement.girth).color + '15' }
              ]}
            >
              <Ionicons name={getGrowthStatus(latestMeasurement.girth).icon} size={18} color={getGrowthStatus(latestMeasurement.girth).color} />
              <Text style={[styles.statusBadgeText, { color: getGrowthStatus(latestMeasurement.girth).color }]}>
                {getGrowthStatus(latestMeasurement.girth).status}
              </Text>
              <Text style={styles.statusPercentage}>
                ({Math.round((latestMeasurement.girth / TAPPABLE_GIRTH_CM) * 100)}%)
              </Text>
            </View>
          </Animated.View>
        )}

        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>{t.growthScreen.allMeasurements}</Text>
            <Text style={styles.historyCount}>{measurements.length} {t.growthScreen.records}</Text>
          </View>

          {isLoading ? (
            <View style={styles.loadingState}>
              <Text>{t.growthScreen.loading}</Text>
            </View>
          ) : measurements.length === 0 ? (
            renderEmptyState()
          ) : (
            measurements.map((item, index) => {
              const status = getGrowthStatus(item.girth);
              const cardAnim = cardSlideAnims[index];
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    { 
                      opacity: fadeAnim,
                      transform: cardAnim ? [{ translateX: cardAnim }] : []
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={styles.historyItem}
                    onLongPress={() => deleteMeasurement(item.id)}
                    activeOpacity={0.7}
                  >
                    <View 
                      style={[
                        styles.historyItemIcon, 
                        { backgroundColor: status.color + '20' }
                      ]}
                    >
                      <Ionicons name={status.icon} size={20} color={status.color} />
                    </View>
                    <View style={styles.historyItemContent}>
                      <View style={styles.historyItemTop}>
                        <View style={styles.historyItemTitleRow}>
                          <Text style={styles.historyItemTreeId}>{item.treeId}</Text>
                          <View style={[
                            styles.methodBadge,
                            { backgroundColor: item.method === 'camera' ? '#059669' + '20' : '#3B82F6' + '20' }
                          ]}>
                            <Ionicons
                              name={item.method === 'camera' ? 'camera' : 'create'}
                              size={10}
                              color={item.method === 'camera' ? '#059669' : '#3B82F6'}
                            />
                          </View>
                        </View>
                        <Text style={styles.historyItemDate}>{item.date}</Text>
                      </View>
                      <View style={styles.historyItemMiddle}>
                        <View style={styles.measurementTag}>
                          <MaterialCommunityIcons name="tape-measure" size={12} color="#4B5563" />
                          <Text style={styles.historyItemGirth}>{item.girth} cm</Text>
                        </View>
                        {item.height ? (
                          <View style={styles.measurementTag}>
                            <Ionicons name="resize-outline" size={12} color="#4B5563" />
                            <Text style={styles.historyItemHeight}>{item.height} cm</Text>
                          </View>
                        ) : null}
                        {item.location ? (
                          <View style={styles.measurementTag}>
                            <Ionicons name="location-outline" size={12} color="#6B7280" />
                            <Text style={styles.historyItemLocation}>{item.location}</Text>
                          </View>
                        ) : null}
                      </View>
                      <View style={[styles.historyItemStatus, { backgroundColor: status.color + '10' }]}>
                        <Text style={[styles.historyItemStatusText, { color: status.color }]}>
                          {status.status}
                        </Text>
                        <Text style={[styles.historyItemPercent, { color: status.color }]}>
                          {Math.round((item.girth / TAPPABLE_GIRTH_CM) * 100)}%
                        </Text>
                      </View>
                    </View>
                    <View style={styles.historyItemArrow}>
                      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })
          )}

          {measurements.length > 0 && (
            <Text style={styles.deleteHint}>{t.growthScreen.longPressDelete}</Text>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {renderCamera()}
      {renderSaveModal()}
      {renderGuideModal()}
      {renderManualEntryModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitleContainer: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  infoButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, padding: 16 },
  measureCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  measureCardGradient: { padding: 24, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  decorativeCircle: { position: 'absolute', borderRadius: 100, borderWidth: 2, borderColor: 'rgba(5, 150, 105, 0.1)' },
  decorativeCircle1: { width: 150, height: 150, top: -50, right: -50 },
  decorativeCircle2: { width: 100, height: 100, bottom: -30, left: -30 },
  measureCardIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 16, elevation: 4, shadowColor: '#059669', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  measureCardTitle: { fontSize: 20, fontWeight: '700', color: '#064E3B', marginBottom: 8 },
  measureCardDesc: { fontSize: 14, color: '#047857', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  measureButtonsContainer: { flexDirection: 'row', width: '100%', gap: 12 },
  cameraMeasureButton: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  manualMeasureButton: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  measureButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  measureButtonText: { fontSize: 15, fontWeight: '600', color: '#fff' },
  startMeasureButton: { width: '100%', borderRadius: 12, overflow: 'hidden' },
  startMeasureGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  startMeasureText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  progressCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, overflow: 'hidden' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  dateBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, gap: 4 },
  progressDate: { fontSize: 12, color: '#6B7280' },
  latestInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  latestTreeInfo: { flex: 1 },
  latestTreeId: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  latestLocation: { fontSize: 13, color: '#6B7280' },
  latestGirthContainer: { flexDirection: 'row', alignItems: 'baseline', backgroundColor: '#ECFDF5', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16 },
  latestGirthValue: { fontSize: 36, fontWeight: '700', color: '#059669' },
  latestGirthUnit: { fontSize: 16, fontWeight: '500', color: '#059669', marginLeft: 4 },
  progressBarContainer: { marginBottom: 16 },
  progressBarBg: { height: 12, backgroundColor: '#E5E7EB', borderRadius: 6, overflow: 'hidden', position: 'relative' },
  progressBarFill: { height: '100%', borderRadius: 6 },
  progressBarFillAnimated: { height: '100%', borderRadius: 6, overflow: 'hidden' },
  progressBarGradient: { flex: 1, height: '100%' },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  progressLabelStart: { fontSize: 11, color: '#9CA3AF' },
  targetLabel: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  progressLabelTarget: { fontSize: 11, color: '#059669', fontWeight: '600' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 },
  statusBadgeText: { fontSize: 13, fontWeight: '600' },
  statusPercentage: { fontSize: 12, color: '#6B7280' },
  historySection: { marginBottom: 16 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  historyTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  historyCount: { fontSize: 13, color: '#6B7280', backgroundColor: '#E5E7EB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  historyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  historyItemIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  historyItemContent: { flex: 1 },
  historyItemTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  historyItemTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  historyItemTreeId: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  historyItemDate: { fontSize: 11, color: '#9CA3AF', backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  historyItemMiddle: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  measurementTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F9FAFB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  historyItemGirth: { fontSize: 12, color: '#4B5563', fontWeight: '600' },
  historyItemHeight: { fontSize: 12, color: '#4B5563' },
  historyItemLocation: { fontSize: 12, color: '#6B7280' },
  historyItemStatus: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, gap: 6 },
  historyItemStatusText: { fontSize: 11, fontWeight: '600' },
  historyItemPercent: { fontSize: 10, fontWeight: '500' },
  historyItemArrow: { marginLeft: 8 },
  methodBadge: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  deleteHint: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 8, fontStyle: 'italic' },
  emptyState: { alignItems: 'center', paddingVertical: 50, backgroundColor: '#fff', borderRadius: 20, borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed' },
  emptyStateTitle: { fontSize: 17, fontWeight: '600', color: '#6B7280', marginTop: 16 },
  emptyStateDesc: { fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 8, paddingHorizontal: 40, lineHeight: 20 },
  loadingState: { alignItems: 'center', paddingVertical: 40 },
  bottomPadding: { height: 40 },
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  measurementOverlay: { ...StyleSheet.absoluteFillObject },
  cameraHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 40 : 8 },
  cameraHeaderButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  stepIndicator: { flexDirection: 'row', alignItems: 'center' },
  stepDot: { width: 12, height: 12, borderRadius: 6 },
  stepDotActive: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#fff' },
  stepLine: { width: 24, height: 2, marginHorizontal: 4 },
  measurePoint: { position: 'absolute', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  referencePointStyle: { backgroundColor: '#F59E0B' },
  trunkPointStyle: { backgroundColor: '#10B981' },
  pointLabelText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  measureLine: { position: 'absolute', height: 4 },
  referenceLineStyle: { backgroundColor: '#F59E0B' },
  trunkLineStyle: { backgroundColor: '#10B981' },
  resultOverlay: { position: 'absolute', top: 100, left: 16, right: 16 },
  resultCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 12 },
  resultInfo: { flex: 1 },
  resultLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  resultValue: { fontSize: 28, fontWeight: '700', color: '#fff' },
  resultStatusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, gap: 4 },
  resultStatusText: { fontSize: 11, fontWeight: '600', color: '#fff' },
  instructionBar: { position: 'absolute', bottom: 120, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 10 },
  instructionDot: { width: 10, height: 10, borderRadius: 5 },
  instructionText: { flex: 1, fontSize: 14, color: '#fff', fontWeight: '500' },
  cameraControls: { position: 'absolute', bottom: 40, left: 16, right: 16, flexDirection: 'row', justifyContent: 'center', gap: 16 },
  controlButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 30, gap: 8 },
  resetButton: { backgroundColor: 'rgba(255,255,255,0.2)' },
  saveButtonCamera: { backgroundColor: '#10B981' },
  controlButtonText: { fontSize: 15, fontWeight: '600', color: '#fff' },
  saveModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  saveModalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  saveModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  saveModalTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  measurementPreview: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  measurementPreviewGradient: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  measurementPreviewInfo: { flex: 1 },
  measurementPreviewLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  measurementPreviewValue: { fontSize: 24, fontWeight: '700', color: '#fff' },
  previewStatusBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  previewStatusText: { fontSize: 11, fontWeight: '600', color: '#fff' },
  saveForm: { marginBottom: 20 },
  formField: { marginBottom: 14 },
  formLabel: { fontSize: 13, fontWeight: '600', color: '#4B5563', marginBottom: 6 },
  formInput: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#1F2937' },
  formTextArea: { height: 80, textAlignVertical: 'top' },
  saveModalActions: { flexDirection: 'row', gap: 12 },
  cancelButton: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: '#E5E7EB', alignItems: 'center' },
  cancelButtonText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  confirmSaveButton: { flex: 2, borderRadius: 12, overflow: 'hidden' },
  confirmSaveGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  confirmSaveText: { fontSize: 15, fontWeight: '600', color: '#fff' },
  guideModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  guideModalContent: { backgroundColor: '#fff', borderRadius: 24, padding: 24, width: '100%', maxHeight: '85%' },
  guideModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  guideModalTitle: { fontSize: 22, fontWeight: '700', color: '#064E3B' },
  guideStep: { flexDirection: 'row', marginBottom: 18 },
  guideStepNumber: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  guideStepNumberText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  guideStepContent: { flex: 1 },
  guideStepTitle: { fontSize: 15, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  guideStepDesc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  guideInfo: { flexDirection: 'row', backgroundColor: '#ECFDF5', borderRadius: 12, padding: 14, marginTop: 8, gap: 10 },
  guideInfoText: { flex: 1, fontSize: 13, color: '#047857', lineHeight: 18 },
  guideTip: { flexDirection: 'row', backgroundColor: '#FFFBEB', borderRadius: 12, padding: 14, marginTop: 10, gap: 10 },
  guideTipText: { flex: 1, fontSize: 13, color: '#B45309', lineHeight: 18 },
  guideCloseButton: { backgroundColor: '#059669', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  guideCloseButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  // Manual Entry Styles
  manualEntryContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  manualEntryHeader: { alignItems: 'center', marginBottom: 20 },
  manualEntryIconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  manualEntrySubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  measurementRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  measurementField: { flex: 1 },
  measurementInputContainer: { flexDirection: 'row', alignItems: 'center' },
  measurementInput: { flex: 1, backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 18, fontWeight: '600', color: '#1F2937' },
  measurementUnit: { backgroundColor: '#E5E7EB', paddingHorizontal: 12, paddingVertical: 12, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderWidth: 1, borderLeftWidth: 0, borderColor: '#E5E7EB' },
  measurementUnitText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  measurementHint: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  quickStatusPreview: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 6 },
  quickStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6, marginBottom: 6 },
  quickStatusText: { fontSize: 13, fontWeight: '600' },
  quickStatusProgress: { fontSize: 12, color: '#6B7280' },
});

export default GrowthMeasurementScreen;