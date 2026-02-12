import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { latexQualityApi } from '../config/latexQualityApi';

const { width } = Dimensions.get('window');

// ==================== INTERFACES ====================
interface DashboardStats {
  period_days: number;
  total_readings: number;
  avg_quality_score: number;
  avg_ph: number;
  avg_turbidity: number;
  avg_drc: number;
  rss1_count: number;
  rss2_count: number;
  rss3_count: number;
  rss4_count: number;
  rejected_count: number;
  rss1_percent: number;
  excellent_percent: number;
  unread_alerts: number;
}

interface Reading {
  id: string;
  ph_value: number;
  turbidity_ntu: number;
  drc_percent: number;
  rss_grade: string;
  quality_score: number;
  estimated_price_per_kg: string | number;
  timestamp: string;
  time_ago: string;
  notes?: string;
}

interface QualityAlert {
  id: string;
  alert_type_display: string;
  severity: string;
  message: string;
  recommendations: string;
  is_read: boolean;
  time_ago: string;
}

interface SensorLiveData {
  ph_value: number;
  turbidity_ntu: number;
  drc_percent: number;
  temperature_celsius?: number;
  humidity_percent?: number;
}

// ==================== MAIN COMPONENT ====================
const LatexQualityScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentReadings, setRecentReadings] = useState<Reading[]>([]);
  const [alerts, setAlerts] = useState<QualityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phValue, setPhValue] = useState('');
  const [turbidity, setTurbidity] = useState('');
  const [drc, setDrc] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [notes, setNotes] = useState('');

  const [esp32IP, setEsp32IP] = useState('');
  const [showIPModal, setShowIPModal] = useState(false);
  const [sensorConnected, setSensorConnected] = useState(false);
  const [liveData, setLiveData] = useState<SensorLiveData | null>(null);

  const [showInfoModal, setShowInfoModal] = useState(false);

  // ==================== HELPER FUNCTIONS ====================
  const formatPrice = (price: string | number | undefined): string => {
    if (!price) return '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0' : numPrice.toFixed(0);
  };

  const safeToFixed = (value: number | undefined, decimals: number = 1): string => {
    if (value === undefined || value === null || isNaN(value)) return '0';
    return Number(value).toFixed(decimals);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'RSS1': return '#10B981';
      case 'RSS2': return '#3B82F6';
      case 'RSS3': return '#F59E0B';
      case 'RSS4': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getGradeBgColor = (grade: string) => {
    switch (grade) {
      case 'RSS1': return '#D1FAE5';
      case 'RSS2': return '#DBEAFE';
      case 'RSS3': return '#FEF3C7';
      case 'RSS4': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return '#DC2626';
      case 'HIGH': return '#EF4444';
      case 'MEDIUM': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  // ==================== DATA LOADING ====================
  useEffect(() => {
    loadAllData();
  }, [selectedPeriod]);

  useEffect(() => {
    if (!esp32IP) {
      setSensorConnected(false);
      setLiveData(null);
      return;
    }
    
    let interval: ReturnType<typeof setInterval>;
    let isMounted = true;

    const fetchLiveData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`http://${esp32IP}/sensor`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        setLiveData({
          ph_value: data.ph_value || 0,
          turbidity_ntu: data.turbidity_ntu || 0,
          drc_percent: data.drc_percent || 0,
          temperature_celsius: data.temperature_celsius,
          humidity_percent: data.humidity_percent,
        });

        setPhValue(String((data.ph_value || 0).toFixed(2)));
        setTurbidity(String((data.turbidity_ntu || 0).toFixed(1)));
        setDrc(String((data.drc_percent || 0).toFixed(1)));
        
        if (data.temperature_celsius !== undefined && data.temperature_celsius !== 0) {
          setTemperature(String(data.temperature_celsius.toFixed(1)));
        }
        
        if (data.humidity_percent !== undefined && data.humidity_percent !== 0) {
          setHumidity(String(data.humidity_percent.toFixed(1)));
        }

        setSensorConnected(true);
        
      } catch (error: any) {
        if (isMounted) {
          setSensorConnected(false);
          setLiveData(null);
        }
      }
    };

    fetchLiveData();
    interval = setInterval(fetchLiveData, 2000);

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [esp32IP]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [dashboardData, readingsData, alertsData] = await Promise.all([
        latexQualityApi.getDashboard(selectedPeriod),
        latexQualityApi.getReadings(selectedPeriod, 5),
        latexQualityApi.getAlerts(true),
      ]);
      setStats(dashboardData);
      setRecentReadings(readingsData.readings || []);
      setAlerts(alertsData.alerts || []);
    } catch (error: any) {
      console.error('Failed to load data:', error);
      Alert.alert('Error', 'Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
  };

  const handleSubmit = async () => {
    if (!phValue || !turbidity || !drc) {
      Alert.alert('Missing Data', 'Please enter pH, Turbidity, and DRC values');
      return;
    }

    const ph = parseFloat(phValue);
    const turb = parseFloat(turbidity);
    const drcVal = parseFloat(drc);

    if (isNaN(ph) || ph < 0 || ph > 14) {
      Alert.alert('Invalid pH', 'pH must be between 0 and 14');
      return;
    }

    if (isNaN(turb) || turb < 0) {
      Alert.alert('Invalid Turbidity', 'Turbidity cannot be negative');
      return;
    }

    if (isNaN(drcVal) || drcVal < 0 || drcVal > 100) {
      Alert.alert('Invalid DRC', 'DRC must be between 0 and 100');
      return;
    }

    try {
      setSubmitting(true);

      const data = {
        ph_value: ph,
        turbidity_ntu: turb,
        drc_percent: drcVal,
        temperature_celsius: temperature ? parseFloat(temperature) : undefined,
        humidity_percent: humidity ? parseFloat(humidity) : undefined,
        notes: notes.trim(),
      };

      const response = await latexQualityApi.submitReading(data);

      setShowSubmitModal(false);
      setPhValue('');
      setTurbidity('');
      setDrc('');
      setTemperature('');
      setHumidity('');
      setNotes('');

      const price = formatPrice(response.reading.estimated_price_per_kg);

      Alert.alert(
        'Success! ✅',
        `Quality Grade: ${response.reading.grade_display}\nScore: ${response.reading.quality_score}/100\nEstimated Price: LKR ${price}/kg\n\n⚠️ FIELD ESTIMATION ONLY - Confirm with RRISL lab test`,
        [{ text: 'OK', onPress: () => loadAllData() }]
      );
    } catch (error: any) {
      console.error('Submit error:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to submit reading');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAlertRead = async (alertId: string) => {
    try {
      await latexQualityApi.markAlertRead(alertId);
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    } catch (error) {
      Alert.alert('Error', 'Failed to mark alert as read');
    }
  };

  const openURL = (url: string) => {
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Cannot open URL'));
  };

  if (loading && !stats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00822C" />
        <Text style={styles.loadingText}>Loading quality data...</Text>
      </View>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Latex Quality</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => setShowSubmitModal(true)}>
            <MaterialCommunityIcons name="plus-circle" size={28} color="#00822C" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setShowIPModal(true)}>
            <MaterialCommunityIcons
              name={sensorConnected ? 'wifi' : 'wifi-off'}
              size={26}
              color={sensorConnected ? '#10B981' : '#EF4444'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowInfoModal(true)}>
            <MaterialCommunityIcons name="information" size={26} color="#F59E0B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* PERIOD SELECTOR */}
        <View style={styles.periodSelector}>
          {[7, 14, 30].map((days) => (
            <TouchableOpacity
              key={days}
              style={[styles.periodButton, selectedPeriod === days && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod(days)}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === days && styles.periodButtonTextActive]}>
                {days} Days
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIVE SENSOR CARD */}
        {sensorConnected && liveData && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Live Sensor</Text>
              <MaterialCommunityIcons name="wifi" size={20} color="#10B981" />
            </View>
            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
              Real-time data from ESP32 (tap + to submit as reading)
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="water" size={20} color="#3B82F6" />
                <Text style={styles.statValue}>{safeToFixed(liveData.ph_value, 2)}</Text>
                <Text style={styles.statLabel}>pH</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="cloud" size={20} color="#8B5CF6" />
                <Text style={styles.statValue}>{safeToFixed(liveData.turbidity_ntu, 0)}</Text>
                <Text style={styles.statLabel}>Turbidity</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="water-percent" size={20} color="#10B981" />
                <Text style={styles.statValue}>{safeToFixed(liveData.drc_percent, 1)}%</Text>
                <Text style={styles.statLabel}>DRC</Text>
              </View>
              {liveData.temperature_celsius !== undefined && liveData.temperature_celsius > 0 && (
                <View style={styles.statCard}>
                  <MaterialCommunityIcons name="thermometer" size={20} color="#F59E0B" />
                  <Text style={styles.statValue}>{safeToFixed(liveData.temperature_celsius, 1)}</Text>
                  <Text style={styles.statLabel}>Temp (°C)</Text>
                </View>
              )}
              {liveData.humidity_percent !== undefined && liveData.humidity_percent > 0 && (
                <View style={styles.statCard}>
                  <MaterialCommunityIcons name="water-outline" size={20} color="#3B82F6" />
                  <Text style={styles.statValue}>{safeToFixed(liveData.humidity_percent, 1)}</Text>
                  <Text style={styles.statLabel}>Humidity (%)</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* DASHBOARD CONTENT */}
        {stats && stats.total_readings > 0 ? (
          <>
            <View style={styles.scoreCard}>
              <Text style={styles.sectionTitle}>Overall Quality Score</Text>
              <View style={styles.scoreCircle}>
                <Text style={[styles.scoreValue, { color: '#00822C' }]}>
                  {safeToFixed(stats.avg_quality_score, 1)}
                </Text>
                <Text style={styles.scoreLabel}>/ 100</Text>
              </View>
              <Text style={styles.totalReadings}>
                {stats.total_readings} readings in last {stats.period_days} days
              </Text>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="water" size={24} color="#3B82F6" />
                <Text style={styles.statValue}>{safeToFixed(stats.avg_ph, 2)}</Text>
                <Text style={styles.statLabel}>Avg pH</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="cloud" size={24} color="#8B5CF6" />
                <Text style={styles.statValue}>{safeToFixed(stats.avg_turbidity, 0)}</Text>
                <Text style={styles.statLabel}>Turbidity</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="water-percent" size={24} color="#10B981" />
                <Text style={styles.statValue}>{safeToFixed(stats.avg_drc, 1)}%</Text>
                <Text style={styles.statLabel}>Avg DRC</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="star" size={24} color="#F59E0B" />
                <Text style={styles.statValue}>{safeToFixed(stats.rss1_percent, 0)}%</Text>
                <Text style={styles.statLabel}>RSS1</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="flask-empty-outline" size={80} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Data Yet</Text>
            <Text style={styles.emptyText}>
              Submit your first latex quality reading to see statistics
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={() => setShowSubmitModal(true)}>
              <MaterialCommunityIcons name="plus" size={20} color="#fff" />
              <Text style={styles.emptyButtonText}>Submit Reading</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ALERTS */}
        {alerts.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Active Alerts ({alerts.length})</Text>
            </View>
            {alerts.slice(0, 3).map((alert) => (
              <View key={alert.id} style={styles.alertItem}>
                <View style={[styles.alertIcon, { backgroundColor: `${getSeverityColor(alert.severity)}20` }]}>
                  <MaterialCommunityIcons name="alert-circle" size={20} color={getSeverityColor(alert.severity)} />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.alert_type_display}</Text>
                  <Text style={styles.alertMessage} numberOfLines={2}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.time_ago}</Text>
                </View>
                <TouchableOpacity onPress={() => handleMarkAlertRead(alert.id)}>
                  <MaterialCommunityIcons name="check" size={24} color="#10B981" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* RECENT READINGS */}
        {recentReadings.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Recent Readings</Text>
            {recentReadings.map((reading) => (
              <View key={reading.id} style={styles.readingItem}>
                <View style={[styles.gradeBadge, { backgroundColor: getGradeBgColor(reading.rss_grade) }]}>
                  <Text style={[styles.gradeText, { color: getGradeColor(reading.rss_grade) }]}>
                    {reading.rss_grade}
                  </Text>
                </View>
                <View style={styles.readingContent}>
                  <Text style={styles.readingScore}>Score: {reading.quality_score || 0}/100</Text>
                  <Text style={styles.readingDetails}>
                    pH {safeToFixed(reading.ph_value, 1)} • {safeToFixed(reading.turbidity_ntu, 0)} NTU • {safeToFixed(reading.drc_percent, 1)}% DRC
                  </Text>
                  <Text style={styles.readingTime}>{reading.time_ago || 'Just now'}</Text>
                </View>
                <Text style={styles.readingPrice}>LKR {formatPrice(reading.estimated_price_per_kg)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* TIPS CARD */}
        <View style={styles.tipsCard}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#F59E0B" />
          <Text style={styles.tipsTitle}>Quality Tips</Text>
          <Text style={styles.tipsText}>
            • Tap early morning (5-7 AM) for best DRC{'\n'}
            • Keep collection containers clean{'\n'}
            • Add 0.7% ammonia as preservative{'\n'}
            • Filter latex before storage{'\n'}
            • Ideal pH: 6.5-7.0 for fresh latex
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ==================== INFO MODAL ==================== */}
      <Modal visible={showInfoModal} animationType="slide" transparent={true} onRequestClose={() => setShowInfoModal(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowInfoModal(false)}>
            <TouchableOpacity activeOpacity={1} style={[styles.modalContent, { maxHeight: '80%' }]} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>📊 How Quality is Calculated</Text>
                <TouchableOpacity onPress={() => setShowInfoModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* ACCURACY WARNING */}
                <View style={styles.warningBox}>
                  <MaterialCommunityIcons name="alert-circle" size={24} color="#F59E0B" />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.warningTitle}>⚠️ FIELD ESTIMATION ONLY</Text>
                    <Text style={styles.warningText}>
                      These measurements are NOT 100% lab accurate. This app provides quick field screening using IoT sensors. Always send "GOOD" samples to RRISL lab for official grading before selling.
                    </Text>
                  </View>
                </View>

                {/* QUALITY THRESHOLDS */}
                <Text style={styles.inputSectionTitle}>✅ GOOD LATEX THRESHOLDS</Text>
                <View style={styles.infoTable}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>pH Level</Text>
                    <Text style={styles.tableValue}>≥ 10.0</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Turbidity</Text>
                    <Text style={styles.tableValue}>≤ 50 NTU</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>DRC</Text>
                    <Text style={styles.tableValue}>≥ 55%</Text>
                  </View>
                </View>

                <Text style={styles.infoText}>
                  If pH ≥10.0 AND Turbidity ≤50 AND DRC ≥55% → "GOOD QUALITY" (Premium Price){'\n'}
                  Otherwise → "FAIR" or "POOR QUALITY" (Lower Price)
                </Text>

                {/* CALCULATION METHOD */}
                <Text style={[styles.inputSectionTitle, { marginTop: 20 }]}>📈 SCORE CALCULATION</Text>
                <Text style={styles.infoText}>
                  Quality Score = (pH Score × 35%) + (Turbidity Score × 30%) + (DRC Score × 35%)
                  {'\n\n'}
                  Each parameter scored 0-100 based on RRISL standards, then weighted average calculated.
                </Text>

                {/* SENSOR ACCURACY */}
                <Text style={[styles.inputSectionTitle, { marginTop: 20 }]}>🎯 SENSOR ACCURACY</Text>
                <View style={styles.infoTable}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>pH-4502C</Text>
                    <Text style={styles.tableValue}>±5%</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>SEN0189</Text>
                    <Text style={styles.tableValue}>±8%</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>TCRT5000</Text>
                    <Text style={styles.tableValue}>±10%</Text>
                  </View>
                </View>

                {/* SOURCES */}
                <Text style={[styles.inputSectionTitle, { marginTop: 20 }]}>📚 OFFICIAL SOURCES</Text>
                <TouchableOpacity style={styles.sourceItem} onPress={() => openURL('http://www.rrisl.gov.lk/depart_e.php?depid=14')}>
                  <Text style={styles.sourceTitle}>🔬 RRISL Raw Rubber Analysis Dept</Text>
                  <Text style={styles.sourceUrl}>rrisl.gov.lk/depart_e.php?depid=14</Text>
                  <Text style={styles.sourceDesc}>ISO 125 (pH), ISO 706 (Turbidity), ISO 126 (DRC)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sourceItem} onPress={() => openURL('http://www.rrisl.gov.lk/content/files/downDoc/3.%20Manufacture%20of%20Latex%20Crepe.pdf')}>
                  <Text style={styles.sourceTitle}>📄 RRISL Latex Crepe Manufacture</Text>
                  <Text style={styles.sourceUrl}>rrisl.gov.lk/.../Manufacture of Latex Crepe.pdf</Text>
                  <Text style={styles.sourceDesc}>Field latex standardization, metrolac DRC measurement</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sourceItem} onPress={() => openURL('https://cdn.standards.iteh.ai/samples/78462/0977d2c433d3436e93bebfb3472ac146/ISO-24329-2022.pdf')}>
                  <Text style={styles.sourceTitle}>🌍 ISO 24329:2022 Standards</Text>
                  <Text style={styles.sourceUrl}>standards.iteh.ai/.../ISO-24329-2022.pdf</Text>
                  <Text style={styles.sourceDesc}>International latex quality specifications</Text>
                </TouchableOpacity>

                {/* LAB TESTING */}
                <Text style={[styles.inputSectionTitle, { marginTop: 20 }]}>🏛️ OFFICIAL LAB TESTING</Text>
                <View style={styles.labCard}>
                  <Text style={styles.labTitle}>Rubber Research Institute of Sri Lanka</Text>
                  <Text style={styles.labAddress}>📍 Telawala Road, Ratmalana, Sri Lanka</Text>
                  <Text style={styles.labInfo}>
                    Official RRISL labs provide ISO-certified latex quality testing for export and premium grading.
                  </Text>
                  <TouchableOpacity style={styles.labButton} onPress={() => openURL('http://www.rrisl.gov.lk/')}>
                    <MaterialCommunityIcons name="web" size={18} color="#fff" />
                    <Text style={styles.labButtonText}>Visit RRISL Website</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.labButton, styles.callButton]} onPress={() => Linking.openURL('tel:+94112636436')}>
                    <MaterialCommunityIcons name="phone" size={18} color="#fff" />
                    <Text style={styles.labButtonText}>Contact RRISL Lab</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>
                  💡 Always confirm "GOOD" results with official RRISL lab test before selling premium latex
                </Text>
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ==================== SUBMIT READING MODAL ==================== */}
      <Modal visible={showSubmitModal} animationType="slide" transparent={true} onRequestClose={() => setShowSubmitModal(false)}>
        <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowSubmitModal(false)}>
            <TouchableOpacity activeOpacity={1} style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Submit Reading</Text>
                <TouchableOpacity onPress={() => setShowSubmitModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 450 }}>
                <Text style={styles.inputSectionTitle}>Required *</Text>

                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="water" size={20} color="#3B82F6" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="pH (0-14)"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={phValue}
                    onChangeText={setPhValue}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="cloud" size={20} color="#8B5CF6" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Turbidity (NTU)"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={turbidity}
                    onChangeText={setTurbidity}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="water-percent" size={20} color="#10B981" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="DRC (%)"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={drc}
                    onChangeText={setDrc}
                  />
                </View>

                <Text style={styles.inputSectionTitle}>Optional</Text>

                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="thermometer" size={20} color="#F59E0B" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Temperature (°C)"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={temperature}
                    onChangeText={setTemperature}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <MaterialCommunityIcons name="water-opacity" size={20} color="#06B6D4" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Humidity (%)"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="decimal-pad"
                    value={humidity}
                    onChangeText={setHumidity}
                  />
                </View>

                <TextInput
                  style={[styles.modalInput, styles.textArea]}
                  placeholder="Notes (optional)"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  value={notes}
                  onChangeText={setNotes}
                  textAlignVertical="top"
                />
              </ScrollView>

              <TouchableOpacity
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Reading</Text>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      {/* ==================== ESP32 IP MODAL ==================== */}
      <Modal visible={showIPModal} animationType="slide" transparent={true} onRequestClose={() => setShowIPModal(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowIPModal(false)}>
            <TouchableOpacity activeOpacity={1} style={[styles.modalContent, { maxHeight: 400 }]} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Connect ESP32 Sensor</Text>
                <TouchableOpacity onPress={() => setShowIPModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 12 }}>
                Enter ESP32 IP address from Serial Monitor
              </Text>

              <View style={styles.inputGroup}>
                <MaterialCommunityIcons name="ip-network" size={20} color="#3B82F6" />
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g. 192.168.1.150"
                  placeholderTextColor="#9CA3AF"
                  value={esp32IP}
                  onChangeText={setEsp32IP}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={[styles.connectionStatus, { backgroundColor: sensorConnected ? '#D1FAE5' : '#FEE2E2' }]}>
                <MaterialCommunityIcons
                  name={sensorConnected ? 'check-circle' : 'alert-circle'}
                  size={20}
                  color={sensorConnected ? '#10B981' : '#EF4444'}
                />
                <Text style={{ fontSize: 13, color: sensorConnected ? '#065F46' : '#991B1B', marginLeft: 8 }}>
                  {sensorConnected ? 'Connected to sensor' : 'Not connected'}
                </Text>
              </View>

              <Text style={styles.infoText}>
                ℹ️ Make sure your phone and ESP32 are connected to the same WiFi network
              </Text>

              <TouchableOpacity
                style={[styles.submitButton, !esp32IP && styles.submitButtonDisabled]}
                onPress={() => {
                  if (esp32IP) {
                    setShowIPModal(false);
                    setSensorConnected(false);
                  }
                }}
                disabled={!esp32IP}
              >
                <MaterialCommunityIcons name={sensorConnected ? 'reload' : 'wifi'} size={20} color="#fff" />
                <Text style={[styles.submitButtonText, { marginLeft: 8 }]}>
                  {sensorConnected ? 'Reconnect' : 'Connect to Sensor'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7F8C8D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  periodButtonActive: {
    backgroundColor: '#00822C',
    borderColor: '#00822C',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  scoreCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#E5E7EB',
    marginVertical: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: -4,
  },
  totalReadings: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  readingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  gradeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  gradeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  readingContent: {
    flex: 1,
  },
  readingScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  readingDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  readingTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  readingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  tipsCard: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginVertical: 8,
  },
  tipsText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00822C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },
  inputSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    marginTop: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalInput: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#00822C',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    padding: 12,
    borderRadius: 8,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 6,
  },
  warningText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
  infoTable: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  tableValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00822C',
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  sourceItem: {
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  sourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sourceUrl: {
    fontSize: 11,
    color: '#3B82F6',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 4,
  },
  sourceDesc: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  labCard: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  labTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 4,
  },
  labAddress: {
    fontSize: 13,
    color: '#047857',
    marginBottom: 8,
  },
  labInfo: {
    fontSize: 12,
    color: '#065F46',
    marginBottom: 12,
    lineHeight: 18,
  },
  labButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callButton: {
    backgroundColor: '#3B82F6',
  },
  labButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default LatexQualityScreen;
