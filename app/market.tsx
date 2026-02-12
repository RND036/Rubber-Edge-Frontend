import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Linking,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { fetchRubberPrices } from '../services/api';
import { useLanguage } from '../context/LanguageContext';



// ============================================
// TYPE DEFINITIONS
// ============================================
interface RubberGrade {
  id: string;
  name: string;
  description: string;
  icon: string;
}


interface PriceData {
  gradeId: string;
  price: number;
  change: number;
  unit: string;
}


interface HistoricalDataset {
  data: number[];
  color: () => string;
  strokeWidth: number;
}


interface HistoricalData {
  labels: string[];
  datasets: HistoricalDataset[];
}


interface MarketStats {
  weekHigh: number;
  weekLow: number;
  monthHigh: number;
  monthLow: number;
  avgVolume: string;
}


interface MarketData {
  lastUpdated: string;
  currency: string;
  exchangeRate: number;
  prices: PriceData[];
  historicalData?: HistoricalData;
  marketStats?: MarketStats;
}


interface PriceCardProps {
  grade: RubberGrade;
  priceData: PriceData;
  onPress: () => void;
  index: number;
  isSelected: boolean;
  t: any;
}


interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  index: number;
  icon: string;
}


interface AnimatedBackgroundOrbProps {
  delay: number;
  size: number;
  startPosition: { x: number; y: number };
  color: string;
}


type RootStackParamList = {
  RubberMarketPrice: undefined;
  RubberPriceDetail: { gradeId: string };
};


interface RubberMarketPriceScreenProps {
  navigation?: NativeStackNavigationProp<RootStackParamList, 'RubberMarketPrice'>;
}


// ============================================
// CONSTANTS & DATA
// ============================================
const COLORS = {
  primary: '#0D4F3C',
  primaryLight: '#1A7A5E',
  primaryDark: '#082E24',
  accent: '#F4D03F',
  accentLight: '#FCF3CF',
  success: '#27AE60',
  danger: '#E74C3C',
  background: '#F0F4F3',
  card: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.3)',
  text: '#1A1A2E',
  textSecondary: '#5C6B73',
  textLight: 'rgba(255, 255, 255, 0.9)',
  glass: 'rgba(255, 255, 255, 0.15)',
  glassBorder: 'rgba(255, 255, 255, 0.25)',
};


const RUBBER_GRADES: RubberGrade[] = [
  { id: 'rss1', name: 'RSS1', description: 'Ribbed Smoked Sheet Grade 1', icon: '🏆' },
  { id: 'rss2', name: 'RSS2', description: 'Ribbed Smoked Sheet Grade 2', icon: '🥈' },
  { id: 'rss3', name: 'RSS3', description: 'Ribbed Smoked Sheet Grade 3', icon: '🥉' },
  { id: 'rss4', name: 'RSS4', description: 'Ribbed Smoked Sheet Grade 4', icon: '📦' },
  { id: 'rss5', name: 'RSS5', description: 'Ribbed Smoked Sheet Grade 5', icon: '📦' },
  { id: 'latex', name: 'Latex 60%', description: 'Centrifuged Latex', icon: '💧' },
  { id: 'tsr20', name: 'TSR 20', description: 'Technically Specified Rubber', icon: '⚙️' },
  { id: 'crepe', name: 'Crepe', description: 'Pale Crepe Rubber', icon: '🌿' },
];




// ============================================
// ANIMATED COMPONENTS
// ============================================
const AnimatedBackgroundOrb: React.FC<AnimatedBackgroundOrbProps> = ({
  delay,
  size,
  startPosition,
  color,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 8000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);


  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });


  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 15, 0],
  });


  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });


  return (
    <Animated.View
      style={[
        styles.backgroundOrb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          left: startPosition.x,
          top: startPosition.y,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    />
  );
};


const PulsingDot: React.FC<{ color: string }> = ({ color }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;


  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);


  return (
    <View style={styles.pulsingDotContainer}>
      <Animated.View
        style={[
          styles.pulsingDotOuter,
          {
            backgroundColor: color + '30',
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <View style={[styles.pulsingDotInner, { backgroundColor: color }]} />
    </View>
  );
};


// ============================================
// PRICE CARD COMPONENT
// ============================================
const PriceCard: React.FC<PriceCardProps> = ({
  grade,
  priceData,
  onPress,
  index,
  isSelected,
  t,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  const isPositive = priceData.change >= 0;

  const getGradeDescription = (gradeId: string): string => {
    const descriptions: Record<string, string> = {
      rss1: t.marketScreen.rss1Desc,
      rss2: t.marketScreen.rss2Desc,
      rss3: t.marketScreen.rss3Desc,
      rss4: t.marketScreen.rss4Desc,
      rss5: t.marketScreen.rss5Desc,
      latex: t.marketScreen.latexDesc,
      tsr20: t.marketScreen.tsr20Desc,
      crepe: t.marketScreen.crepeDesc,
    };
    return descriptions[gradeId] || grade.description;
  };


  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 80,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);


  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };


  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };


  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };


  return (
    <Animated.View
      style={[
        styles.priceCardWrapper,
        {
          opacity: scaleAnim,
          transform: [
            { scale: Animated.multiply(scaleAnim, pressAnim) },
            {
              translateY: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[
          styles.priceCard,
          isSelected && styles.priceCardSelected,
        ]}
      >
        <LinearGradient
          colors={
            isSelected
              ? [COLORS.primaryLight, COLORS.primary]
              : ['#FFFFFF', '#F8FAF9']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.priceCardGradient}
        >
          <View style={styles.priceCardHeader}>
            <View style={styles.gradeIconContainer}>
              <Text style={styles.gradeIcon}>{grade.icon}</Text>
            </View>
            <View
              style={[
                styles.changeBadge,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              <Text
                style={[
                  styles.changeText,
                  isPositive ? styles.positiveText : styles.negativeText,
                ]}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(priceData.change).toFixed(1)}%
              </Text>
            </View>
          </View>


          <Text style={[styles.gradeName, isSelected && styles.gradeNameSelected]}>
            {grade.name}
          </Text>
          <Text
            style={[
              styles.gradeDescription,
              isSelected && styles.gradeDescriptionSelected,
            ]}
            numberOfLines={1}
          >
            {getGradeDescription(grade.id)}
          </Text>


          <View style={styles.priceRow}>
            <Text style={[styles.priceCurrency, isSelected && styles.priceCurrencySelected]}>
              Rs.
            </Text>
            <Text style={[styles.priceValue, isSelected && styles.priceValueSelected]}>
              {priceData.price.toLocaleString()}
            </Text>
            <Text style={[styles.priceUnit, isSelected && styles.priceUnitSelected]}>
              /{priceData.unit}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};


// ============================================
// STATS CARD COMPONENT
// ============================================
const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, index, icon }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 1,
      delay: 400 + index * 100,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <Animated.View
      style={[
        styles.statsCard,
        {
          opacity: slideAnim,
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [index % 2 === 0 ? -30 : 30, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.statsIconContainer}>
        <Text style={styles.statsIcon}>{icon}</Text>
      </View>
      <Text style={styles.statsTitle} numberOfLines={2}>{title}</Text>
      <Text style={styles.statsValue} numberOfLines={1}>{value}</Text>
      {subtitle && <Text style={styles.statsSubtitle} numberOfLines={1}>{subtitle}</Text>}
    </Animated.View>
  );
};


// ============================================
// SHIMMER LOADING COMPONENT
// ============================================
const ShimmerPlaceholder: React.FC<{ width: number | string; height: number; style?: any }> = ({
  width: w,
  height: h,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);


  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });


  return (
    <View style={[{ width: w, height: h, overflow: 'hidden' }, styles.shimmerContainer, style]}>
      <Animated.View
        style={[
          styles.shimmerGradient,
          { transform: [{ translateX }] },
        ]}
      />
    </View>
  );
};


const LoadingState: React.FC<{ t: any }> = ({ t }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.3)).current;


  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();


    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);


  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  return (
    <View style={styles.loadingContainer}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={styles.loadingGradient}
      >
        <View style={styles.loadingContent}>
          <Animated.View
            style={[
              styles.loadingIconContainer,
              { transform: [{ rotate: spin }], opacity: pulseAnim },
            ]}
          >
            <Text style={styles.loadingIcon}>🌿</Text>
          </Animated.View>
          <Text style={styles.loadingTitle} numberOfLines={2}>{t.marketScreen.loadingMarketData}</Text>
          <Text style={styles.loadingSubtitle} numberOfLines={3}>
            {t.marketScreen.fetchingPrices}
          </Text>
          <View style={styles.loadingDotsContainer}>
            {[0, 1, 2].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.loadingDot,
                  {
                    opacity: pulseAnim.interpolate({
                      inputRange: [0.3, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};


// ============================================
// MAIN COMPONENT
// ============================================
const RubberMarketPriceScreen: React.FC<RubberMarketPriceScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { t } = useLanguage();
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('rss3');
  const [error, setError] = useState<string | null>(null);


  const scrollY = useRef(new Animated.Value(0)).current;
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const featuredCardAnim = useRef(new Animated.Value(0)).current;
  const chartAnim = useRef(new Animated.Value(0)).current;


  const loadPrices = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchRubberPrices();
      setMarketData(data);


      // Trigger entrance animations
      Animated.stagger(150, [
        Animated.spring(headerFadeAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(featuredCardAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(chartAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      setError('Failed to load market prices. Please try again.');
      console.error('Error fetching prices:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    loadPrices();
  }, [loadPrices]);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Reset animations
    headerFadeAnim.setValue(0);
    featuredCardAnim.setValue(0);
    chartAnim.setValue(0);
    loadPrices();
  }, [loadPrices]);


  const handleGradePress = (gradeId: string): void => {
    setSelectedGrade(gradeId);
  };


  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-LK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  // Header parallax effect
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });


  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });


  if (loading) {
    return <LoadingState t={t} />;
  }


  if (error) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} translucent />
        <LinearGradient
          colors={[COLORS.background, '#E8F0EE']}
          style={[styles.errorGradient, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
        >
          <View style={styles.errorContent}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle} numberOfLines={2}>{t.marketScreen.oops}</Text>
            <Text style={styles.errorText} numberOfLines={4}>{t.marketScreen.failedToLoadPrices}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadPrices}>
              <LinearGradient
                colors={[COLORS.primaryLight, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.retryButtonGradient}
              >
                <Text style={styles.retryButtonText} numberOfLines={1}>{t.marketScreen.tryAgain}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }


  if (!marketData) {
    return null;
  }


  const selectedPriceData = marketData.prices.find(
    (p: PriceData) => p.gradeId === selectedGrade
  );
  const selectedGradeInfo = RUBBER_GRADES.find(
    (g: RubberGrade) => g.id === selectedGrade
  );


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} translucent />
      {/* Animated Background Orbs */}
      <View style={styles.backgroundContainer}>
        <AnimatedBackgroundOrb
          delay={0}
          size={300}
          startPosition={{ x: -100, y: -50 }}
          color={COLORS.primary + '15'}
        />
        <AnimatedBackgroundOrb
          delay={2000}
          size={200}
          startPosition={{ x: width - 100, y: 200 }}
          color={COLORS.accent + '20'}
        />
        <AnimatedBackgroundOrb
          delay={4000}
          size={250}
          startPosition={{ x: 50, y: height - 400 }}
          color={COLORS.primaryLight + '10'}
        />
      </View>


      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 50 }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
            progressBackgroundColor="#fff"
          />
        }
      >
        {/* Header Section */}
        <Animated.View
          style={[
            styles.header,
            {
              paddingTop: insets.top + 16,
              opacity: Animated.multiply(headerFadeAnim, headerOpacity),
              transform: [
                { translateY: headerTranslateY },
                {
                  scale: headerFadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Back Button */}
                <TouchableOpacity
                  style={{
                    marginRight: 16,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                  }}
                  onPress={() => {
                    try {
                      const { useRouter } = require('expo-router');
                      const router = useRouter();
                      router.back();
                    } catch {}
                  }}
                  activeOpacity={0.8}
                >
                  {/* Ionicons back arrow */}
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerTitleRow}>
                  <Text style={styles.headerEmoji}>🌿</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle} numberOfLines={2}>{t.marketScreen.rubberMarket}</Text>
                    <Text style={styles.headerSubtitle} numberOfLines={2}>{t.marketScreen.liveLocationPrices}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.lastUpdatedContainer}>
                <PulsingDot color={COLORS.success} />
                <Text style={styles.lastUpdated} numberOfLines={2}>
                  {t.marketScreen.updated}: {formatDate(marketData.lastUpdated)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>


        {/* Featured Price Card */}
        <Animated.View
          style={[
            styles.featuredSection,
            {
              opacity: featuredCardAnim,
              transform: [
                {
                  translateY: featuredCardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
                {
                  scale: featuredCardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.featuredCard}>
            <LinearGradient
              colors={['#FFFFFF', '#F8FAF9']}
              style={styles.featuredCardGradient}
            >
              <View style={styles.featuredHeader}>
                <View style={styles.featuredLabelContainer}>
                  <Text style={styles.featuredIcon}>
                    {selectedGradeInfo?.icon ?? '🏆'}
                  </Text>
                  <Text style={styles.featuredLabel} numberOfLines={2}>
                    {selectedGradeInfo?.name ?? 'RSS3'} {t.marketScreen.currentPrice}
                  </Text>
                </View>
                <View
                  style={[
                    styles.featuredBadge,
                    (selectedPriceData?.change ?? 0) >= 0
                      ? styles.featuredBadgePositive
                      : styles.featuredBadgeNegative,
                  ]}
                >
                  <Text
                    style={[
                      styles.featuredBadgeText,
                      (selectedPriceData?.change ?? 0) >= 0
                        ? styles.positiveText
                        : styles.negativeText,
                    ]}
                  >
                    {(selectedPriceData?.change ?? 0) >= 0 ? '↑' : '↓'}{' '}
                    {Math.abs(selectedPriceData?.change ?? 0).toFixed(2)}%
                  </Text>
                </View>
              </View>


              <View style={styles.featuredPriceContainer}>
                <Text style={styles.featuredCurrency}>Rs.</Text>
                <Text style={styles.featuredPrice}>
                  {selectedPriceData?.price.toLocaleString() ?? '0'}
                </Text>
                <Text style={styles.featuredUnit}>/kg</Text>
              </View>


              <View style={styles.featuredDivider} />


              <Text style={styles.featuredChangeLabel} numberOfLines={2}>
                {t.marketScreen.weeklyChange}
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>


        {/* Price Chart */}
        <Animated.View
          style={[
            styles.chartSection,
            {
              opacity: chartAnim,
              transform: [
                {
                  translateY: chartAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} numberOfLines={2}>📈 {t.marketScreen.sixMonthTrend}</Text>
            <Text style={styles.sectionSubtitle} numberOfLines={1}>{t.marketScreen.rss3Grade}</Text>
          </View>


          <View style={styles.chartContainer}>
            {marketData.historicalData ? (
            <LineChart
              data={marketData.historicalData}
              width={width - 48}
              height={200}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => COLORS.primary,
                labelColor: (opacity = 1) => COLORS.textSecondary,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '3',
                  stroke: COLORS.accent,
                  fill: '#FFFFFF',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '5,5',
                  stroke: '#E0E0E0',
                },
                fillShadowGradient: COLORS.primary,
                fillShadowGradientOpacity: 0.1,
              }}
              bezier
              style={styles.chart}
              yAxisLabel="Rs."
              yAxisSuffix=""
              withInnerLines={true}
              withOuterLines={false}
              withShadow={true}
            />
            ) : (
              <Text style={styles.noDataText}>{t.marketScreen.noHistoricalData}</Text>
            )}
          </View>
        </Animated.View>


        {/* Market Stats */}
        <View style={styles.statsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} numberOfLines={2}>📊 {t.marketScreen.marketStatistics}</Text>
          </View>


          <View style={styles.statsGrid}>
            {marketData.marketStats ? (
              <>
                <StatsCard
                  title={t.marketScreen.weekHigh}
                  value={`Rs. ${marketData.marketStats.weekHigh}`}
                  index={0}
                  icon="🔺"
                />
                <StatsCard
                  title={t.marketScreen.weekLow}
                  value={`Rs. ${marketData.marketStats.weekLow}`}
                  index={1}
                  icon="🔻"
                />
                <StatsCard
                  title={t.marketScreen.monthHigh}
                  value={`Rs. ${marketData.marketStats.monthHigh}`}
                  index={2}
                  icon="📈"
                />
                <StatsCard
                  title={t.marketScreen.monthLow}
                  value={`Rs. ${marketData.marketStats.monthLow}`}
                  index={3}
                  icon="📉"
                />
              </>
            ) : (
              <Text style={styles.noDataText}>{t.marketScreen.statsUnavailable}</Text>
            )}
          </View>
        </View>


        {/* All Grades Prices */}
        <View style={styles.allPricesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} numberOfLines={2}>🏷️ {t.marketScreen.allRubberGrades}</Text>
            <Text style={styles.sectionSubtitle} numberOfLines={1}>{t.marketScreen.tapToSelect}</Text>
          </View>


          <View style={styles.priceGrid}>
            {RUBBER_GRADES.map((grade: RubberGrade, index: number) => {
              const priceData = marketData.prices.find(
                (p: PriceData) => p.gradeId === grade.id
              );
              if (!priceData) return null;
              return (
                <PriceCard
                  key={grade.id}
                  grade={grade}
                  priceData={priceData}
                  onPress={() => handleGradePress(grade.id)}
                  index={index}
                  isSelected={selectedGrade === grade.id}
                  t={t}
                />
              );
            })}
          </View>
        </View>


        {/* Data Source Footer */}
        <View style={styles.sourceSection}>
          <Text style={styles.sourceText} numberOfLines={4}>
            {t.marketScreen.dataSource}
          </Text>
          <TouchableOpacity
            style={styles.sourceButton}
            onPress={() => {
              const url = 'https://www.crtasl.org';
              Linking.canOpenURL(url)
                .then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    Alert.alert(
                      t.marketScreen.cannotOpenLink,
                      t.marketScreen.unableToOpenWebsite
                    );
                  }
                })
                .catch((err) => {
                  console.error('Error opening URL:', err);
                  Alert.alert(t.common.error, t.marketScreen.failedToOpenWebsite);
                });
            }}
          >
            <Text style={styles.sourceButtonText} numberOfLines={2}>
              {t.marketScreen.viewOfficialPrices}
            </Text>
          </TouchableOpacity>
        </View>


      </Animated.ScrollView>
    </View>
  );
};


// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  backgroundOrb: {
    position: 'absolute',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },


  // Loading
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loadingIcon: {
    fontSize: 40,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },


  // Shimmer
  shimmerContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  shimmerGradient: {
    width: 200,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },


  // Error
  errorContainer: {
    flex: 1,
  },
  errorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  retryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },


  // Header
  header: {
    marginBottom: -30,
    zIndex: 1,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {},
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerEmoji: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
    fontWeight: '500',
    flexShrink: 1,
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 8,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  lastUpdated: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    flexShrink: 1,
  },


  // Pulsing Dot
  pulsingDotContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulsingDotOuter: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pulsingDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },


  // Featured Section
  featuredSection: {
    paddingHorizontal: 16,
    zIndex: 2,
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  featuredCardGradient: {
    padding: 24,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  featuredIcon: {
    fontSize: 24,
  },
  featuredLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  featuredBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredBadgePositive: {
    backgroundColor: '#E8F5E9',
  },
  featuredBadgeNegative: {
    backgroundColor: '#FFEBEE',
  },
  featuredBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  featuredPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  featuredCurrency: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 4,
  },
  featuredPrice: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -2,
  },
  featuredUnit: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  featuredDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 16,
  },
  featuredChangeLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  positiveText: {
    color: COLORS.success,
  },
  negativeText: {
    color: COLORS.danger,
  },


  // Chart Section
  chartSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    flexShrink: 1,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  chart: {
    borderRadius: 16,
  },


  // Stats Section
  statsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: '48%',
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
  statsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsIcon: {
    fontSize: 18,
  },
  statsTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    flexWrap: 'wrap',
  },
  statsSubtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },


  // All Prices Section
  allPricesSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  priceCardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  priceCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  priceCardSelected: {
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  priceCardGradient: {
    padding: 14,
  },
  priceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gradeIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeIcon: {
    fontSize: 16,
  },
  gradeName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  gradeNameSelected: {
    color: '#fff',
  },
  gradeDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  gradeDescriptionSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  changeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  positive: {
    backgroundColor: '#E8F5E9',
  },
  negative: {
    backgroundColor: '#FFEBEE',
  },
  changeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceCurrency: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 2,
  },
  priceCurrencySelected: {
    color: COLORS.accent,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  priceValueSelected: {
    color: '#fff',
  },
  priceUnit: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  priceUnitSelected: {
    color: 'rgba(255,255,255,0.8)',
  },


  // Source Section
  sourceSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  sourceButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(13, 79, 60, 0.08)',
    borderRadius: 20,
  },
  sourceButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: 16,
  },
});


export default RubberMarketPriceScreen;
