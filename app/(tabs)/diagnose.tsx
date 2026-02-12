import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Href } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';

const DiagnoseScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { t } = useLanguage();
  
  // Responsive calculations
  const isSmallScreen = width < 375;
  const isTablet = width >= 768;
  const cardWidth = isTablet ? (width - 80) / 3 : (width - 50) / 2;
  const horizontalPadding = isTablet ? 30 : 20;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingTop: 16, paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          
          {/* Card 1: Detect Disease */}
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            onPress={() => router.push('/disease' as Href)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="bacteria-outline" size={28} color="#FF4D4D" />
            </View>
            <Text style={styles.cardTitle}>{t.diagnose?.detectDisease || 'Detect Disease'}</Text>
            <Text style={styles.cardSubtitle}>{t.diagnose?.detectDiseaseDesc || "Check your plant's diseases"}</Text>
          </TouchableOpacity>

          {/* Card 2: Quality Check */}
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            onPress={() => router.push('/latexquality' as Href)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="beaker-check-outline" size={28} color="#2ECC71" />
            </View>
            <Text style={styles.cardTitle}>{t.diagnose?.qualityCheck || 'Quality Check'}</Text>
            <Text style={styles.cardSubtitle}>{t.diagnose?.qualityCheckDesc || 'Check your latex quality'}</Text>
          </TouchableOpacity>

          {/* Card 3: Weather Forecast */}
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            onPress={() => router.push('/weather' as Href)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="weather-partly-rainy" size={28} color="#3498DB" />
            </View>
            <Text style={styles.cardTitle}>{t.diagnose?.weatherForecast || 'Weather Forecast'}</Text>
            <Text style={styles.cardSubtitle}>{t.diagnose?.weatherForecastDesc || 'Check weather status of your area'}</Text>
          </TouchableOpacity>

          {/* Card 4: Growth Forecast */}
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            onPress={() => router.push('/growth' as Href)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="chart-line-variant" size={28} color="#9B59B6" />
            </View>
            <Text style={styles.cardTitle}>{t.diagnose?.growthForecast || 'Growth Forecast'}</Text>
            <Text style={styles.cardSubtitle}>{t.diagnose?.growthForecastDesc || 'Forecast your plant growth'}</Text>
          </TouchableOpacity>

          {/* Card 5: Market Price */}
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            onPress={() => router.push('/market' as Href)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="chart-areaspline" size={28} color="#E67E22" />
            </View>
            <Text style={styles.cardTitle}>{t.diagnose?.marketPrice || 'Market Price'}</Text>
            <Text style={styles.cardSubtitle}>{t.diagnose?.marketPriceDesc || 'Check daily market prices'}</Text>
          </TouchableOpacity>

          {/* Card 6: Buyers Prices */}
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            onPress={() => router.push('/buyers' as Href)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="cash-multiple" size={28} color="#16A085" />
            </View>
            <Text style={styles.cardTitle}>{t.diagnose?.buyersPrices || 'Buyers Prices'}</Text>
            <Text style={styles.cardSubtitle}>{t.diagnose?.buyersPricesDesc || 'Check buyers prices'}</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    minHeight: 160,
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 16,
  },
});

export default DiagnoseScreen;
