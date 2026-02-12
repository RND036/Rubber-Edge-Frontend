import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Platform,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';

const { width, height } = Dimensions.get('window');

// Weather code to condition mapping based on WMO codes
const getWeatherInfo = (code: number, isDay: number = 1, t?: any): { condition: string; icon: string; gradient: string[] } => {
  const weatherMap: { [key: number]: { conditionKey: string; condition: string; icon: string; gradient: string[] } } = {
    0: { conditionKey: 'clearSky', condition: 'Clear Sky', icon: 'weather-sunny', gradient: isDay ? ['#56CCF2', '#2F80ED'] : ['#2C3E50', '#4CA1AF'] },
    1: { conditionKey: 'mainlyClear', condition: 'Mainly Clear', icon: 'weather-sunny', gradient: isDay ? ['#56CCF2', '#2F80ED'] : ['#2C3E50', '#4CA1AF'] },
    2: { conditionKey: 'partlyCloudy', condition: 'Partly Cloudy', icon: 'weather-partly-cloudy', gradient: ['#74b9ff', '#a29bfe'] },
    3: { conditionKey: 'overcast', condition: 'Overcast', icon: 'weather-cloudy', gradient: ['#636e72', '#b2bec3'] },
    45: { conditionKey: 'foggy', condition: 'Foggy', icon: 'weather-fog', gradient: ['#636e72', '#dfe6e9'] },
    48: { conditionKey: 'rimeFog', condition: 'Rime Fog', icon: 'weather-fog', gradient: ['#636e72', '#dfe6e9'] },
    51: { conditionKey: 'lightDrizzle', condition: 'Light Drizzle', icon: 'weather-rainy', gradient: ['#74b9ff', '#0984e3'] },
    53: { conditionKey: 'drizzle', condition: 'Drizzle', icon: 'weather-rainy', gradient: ['#74b9ff', '#0984e3'] },
    55: { conditionKey: 'denseDrizzle', condition: 'Dense Drizzle', icon: 'weather-pouring', gradient: ['#636e72', '#2d3436'] },
    61: { conditionKey: 'lightRain', condition: 'Light Rain', icon: 'weather-rainy', gradient: ['#74b9ff', '#0984e3'] },
    63: { conditionKey: 'rain', condition: 'Rain', icon: 'weather-rainy', gradient: ['#636e72', '#2d3436'] },
    65: { conditionKey: 'heavyRain', condition: 'Heavy Rain', icon: 'weather-pouring', gradient: ['#2d3436', '#000000'] },
    71: { conditionKey: 'lightSnow', condition: 'Light Snow', icon: 'weather-snowy', gradient: ['#dfe6e9', '#b2bec3'] },
    73: { conditionKey: 'snow', condition: 'Snow', icon: 'weather-snowy', gradient: ['#dfe6e9', '#b2bec3'] },
    75: { conditionKey: 'heavySnow', condition: 'Heavy Snow', icon: 'weather-snowy-heavy', gradient: ['#b2bec3', '#636e72'] },
    80: { conditionKey: 'rainShowers', condition: 'Rain Showers', icon: 'weather-rainy', gradient: ['#74b9ff', '#0984e3'] },
    81: { conditionKey: 'moderateShowers', condition: 'Moderate Showers', icon: 'weather-rainy', gradient: ['#636e72', '#2d3436'] },
    82: { conditionKey: 'heavyShowers', condition: 'Heavy Showers', icon: 'weather-pouring', gradient: ['#2d3436', '#000000'] },
    95: { conditionKey: 'thunderstorm', condition: 'Thunderstorm', icon: 'weather-lightning', gradient: ['#2d3436', '#6c5ce7'] },
    96: { conditionKey: 'thunderstorm', condition: 'Thunderstorm', icon: 'weather-lightning-rainy', gradient: ['#2d3436', '#6c5ce7'] },
    99: { conditionKey: 'severeStorm', condition: 'Severe Storm', icon: 'weather-hail', gradient: ['#2d3436', '#6c5ce7'] },
  };
  const weatherData = weatherMap[code] || { conditionKey: 'unknown', condition: 'Unknown', icon: 'weather-cloudy', gradient: ['#636e72', '#b2bec3'] };
  const condition = t?.weatherScreen?.[weatherData.conditionKey] || weatherData.condition;
  return { condition, icon: weatherData.icon, gradient: weatherData.gradient };
};

// Calculate Tapping Score (0-100)
const calculateTappingScore = (
  temp: number,
  humidity: number,
  rainProb: number,
  windSpeed: number,
  weatherCode: number,
  t?: any
): { score: number; status: string; color: string; recommendation: string } => {
  let score = 100;
  
  // Temperature factor (ideal: 20-28°C)
  if (temp < 15) score -= 40;
  else if (temp < 20) score -= 20;
  else if (temp > 32) score -= 30;
  else if (temp > 28) score -= 10;
  
  // Humidity factor (ideal: 70-85%)
  if (humidity < 60) score -= 15;
  else if (humidity > 90) score -= 20;
  else if (humidity > 85) score -= 5;
  
  // Rain probability
  if (rainProb > 80) score -= 40;
  else if (rainProb > 60) score -= 25;
  else if (rainProb > 40) score -= 15;
  else if (rainProb > 20) score -= 5;
  
  // Wind speed (ideal: < 15 km/h)
  if (windSpeed > 30) score -= 20;
  else if (windSpeed > 20) score -= 10;
  else if (windSpeed > 15) score -= 5;
  
  // Weather condition
  if (weatherCode >= 51 && weatherCode <= 82) score -= 20; // Rain
  if (weatherCode >= 95) score -= 30; // Thunderstorm
  
  score = Math.max(0, Math.min(100, score));
  
  let status, color, recommendation;
  if (score >= 80) {
    status = t?.weatherScreen?.excellent || 'Excellent';
    color = '#00b894';
    recommendation = t?.weatherScreen?.excellentRecommendation || 'Perfect conditions for rubber tapping. Expect high quality latex yield.';
  } else if (score >= 60) {
    status = t?.weatherScreen?.good || 'Good';
    color = '#00cec9';
    recommendation = t?.weatherScreen?.goodRecommendation || 'Good conditions for tapping. Proceed with normal operations.';
  } else if (score >= 40) {
    status = t?.weatherScreen?.fair || 'Fair';
    color = '#fdcb6e';
    recommendation = t?.weatherScreen?.fairRecommendation || 'Moderate conditions. Consider delaying if possible for better yield.';
  } else if (score >= 20) {
    status = t?.weatherScreen?.poor || 'Poor';
    color = '#e17055';
    recommendation = t?.weatherScreen?.poorRecommendation || 'Unfavorable conditions. Tapping may result in lower quality latex.';
  } else {
    status = t?.weatherScreen?.notRecommended || 'Not Recommended';
    color = '#d63031';
    recommendation = t?.weatherScreen?.notRecommendedRecommendation || 'Do not tap today. Weather conditions will significantly affect latex quality.';
  }
  
  return { score, status, color, recommendation };
};

// Animated Weather Icon
const AnimatedWeatherIcon = ({ icon, size = 120 }: { icon: string; size?: number }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation for sun
    if (icon.includes('sunny')) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 30000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [icon]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={{ 
        transform: [
          { scale: pulseAnim },
          { rotate: icon.includes('sunny') ? rotation : '0deg' }
        ] 
      }}
    >
      <MaterialCommunityIcons name={icon as any} size={size} color="#fff" />
    </Animated.View>
  );
};

// Circular Progress for Tapping Score
const TappingScoreCircle = ({ score, status, color }: { score: number; status: string; color: string }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [score]);

  return (
    <View style={styles.scoreCircleContainer}>
      <View style={[styles.scoreCircleOuter, { borderColor: color }]}>
        <View style={styles.scoreCircleInner}>
          <Text style={[styles.scoreValue, { color }]}>{score}</Text>
          <Text style={styles.scoreLabel}>/ 100</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: color }]}>
        <MaterialCommunityIcons name="leaf" size={16} color="#fff" />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
};

// Latex Quality Indicator
const LatexQualityCard = ({ humidity, temp, t }: { humidity: number; temp: number; t?: any }) => {
  let quality = t?.weatherScreen?.good || 'Good';
  let qualityColor = '#00b894';
  let drcEstimate = '32-35%';
  
  if (humidity > 85 || temp > 30) {
    quality = t?.weatherScreen?.moderate || 'Moderate';
    qualityColor = '#fdcb6e';
    drcEstimate = '28-32%';
  }
  if (humidity > 90 || temp > 33 || temp < 18) {
    quality = t?.weatherScreen?.low || 'Low';
    qualityColor = '#e17055';
    drcEstimate = '25-28%';
  }

  return (
    <View style={styles.latexCard}>
      <View style={styles.latexHeader}>
        <MaterialCommunityIcons name="water-opacity" size={24} color="#fff" />
        <Text style={styles.latexTitle}>{t?.weatherScreen?.expectedLatexQuality || 'Expected Latex Quality'}</Text>
      </View>
      <View style={styles.latexContent}>
        <View style={styles.latexItem}>
          <Text style={styles.latexItemLabel}>{t?.weatherScreen?.qualityGrade || 'Quality Grade'}</Text>
          <View style={[styles.qualityBadge, { backgroundColor: qualityColor }]}>
            <Text style={styles.qualityText}>{quality}</Text>
          </View>
        </View>
        <View style={styles.latexDivider} />
        <View style={styles.latexItem}>
          <Text style={styles.latexItemLabel}>{t?.weatherScreen?.estDrc || 'Est. DRC'}</Text>
          <Text style={styles.drcValue}>{drcEstimate}</Text>
        </View>
      </View>
    </View>
  );
};

// Best Tapping Time Card
const BestTappingTimeCard = ({ sunrise, t }: { sunrise: string; t?: any }) => {
  const sunriseDate = new Date(sunrise);
  const bestStart = new Date(sunriseDate.getTime() - 30 * 60000); // 30 min before sunrise
  const bestEnd = new Date(sunriseDate.getTime() + 2 * 60 * 60000); // 2 hours after sunrise

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <View style={styles.tappingTimeCard}>
      <LinearGradient
        colors={['#00b894', '#00cec9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tappingTimeGradient}
      >
        <View style={styles.tappingTimeIcon}>
          <MaterialCommunityIcons name="clock-check-outline" size={32} color="#fff" />
        </View>
        <View style={styles.tappingTimeContent}>
          <Text style={styles.tappingTimeLabel}>{t?.weatherScreen?.bestTappingWindow || 'Best Tapping Window'}</Text>
          <Text style={styles.tappingTimeValue}>
            {formatTime(bestStart)} - {formatTime(bestEnd)}
          </Text>
          <Text style={styles.tappingTimeHint}>
            {t?.weatherScreen?.optimalLatexFlow || 'Optimal latex flow during this period'}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

// Weather Stat Card
const WeatherStatCard = ({ icon, label, value, unit, color, subtitle }: { 
  icon: string; 
  label: string; 
  value: string | number; 
  unit?: string;
  color: string;
  subtitle?: string;
}) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
      <MaterialCommunityIcons name={icon as any} size={24} color={color} />
    </View>
    <Text style={styles.statCardLabel}>{label}</Text>
    <View style={styles.statCardValueRow}>
      <Text style={styles.statCardValue}>{value}</Text>
      {unit && <Text style={styles.statCardUnit}>{unit}</Text>}
    </View>
    {subtitle && <Text style={[styles.statCardSubtitle, { color }]}>{subtitle}</Text>}
  </View>
);

// Hourly Forecast Item
const HourlyItem = ({ time, temp, icon, rainProb, isNow, t }: {
  time: string;
  temp: number;
  icon: string;
  rainProb: number;
  isNow: boolean;
  t?: any;
}) => {
  const weatherInfo = getWeatherInfo(parseInt(icon) || 0, 1, t);
  
  return (
    <View style={[styles.hourlyItem, isNow && styles.hourlyItemActive]}>
      <Text style={[styles.hourlyTime, isNow && styles.hourlyTextActive]}>{time}</Text>
      <MaterialCommunityIcons 
        name={weatherInfo.icon as any} 
        size={28} 
        color={isNow ? '#00b894' : '#636e72'} 
      />
      <Text style={[styles.hourlyTemp, isNow && styles.hourlyTextActive]}>{Math.round(temp)}°</Text>
      {rainProb > 0 && (
        <View style={styles.hourlyRain}>
          <MaterialCommunityIcons name="water" size={12} color="#0984e3" />
          <Text style={styles.hourlyRainText}>{rainProb}%</Text>
        </View>
      )}
    </View>
  );
};

// Daily Forecast Item
const DailyItem = ({ day, weatherCode, high, low, rainProb, tappingScore, t }: {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  rainProb: number;
  tappingScore: number;
  t?: any;
}) => {
  const weatherInfo = getWeatherInfo(weatherCode, 1, t);
  const scoreColor = tappingScore >= 60 ? '#00b894' : tappingScore >= 40 ? '#fdcb6e' : '#e17055';
  
  return (
    <View style={styles.dailyItem}>
      <Text style={styles.dailyDay}>{day}</Text>
      <View style={styles.dailyWeather}>
        <MaterialCommunityIcons name={weatherInfo.icon as any} size={24} color="#636e72" />
        {rainProb > 20 && (
          <Text style={styles.dailyRain}>{rainProb}%</Text>
        )}
      </View>
      <View style={styles.dailyTemps}>
        <Text style={styles.dailyHigh}>{Math.round(high)}°</Text>
        <View style={styles.dailyTempBar}>
          <View style={[styles.dailyTempFill, { width: `${((high - low) / 15) * 100}%` }]} />
        </View>
        <Text style={styles.dailyLow}>{Math.round(low)}°</Text>
      </View>
      <View style={[styles.dailyScore, { backgroundColor: `${scoreColor}20` }]}>
        <MaterialCommunityIcons name="leaf" size={14} color={scoreColor} />
        <Text style={[styles.dailyScoreText, { color: scoreColor }]}>{tappingScore}</Text>
      </View>
    </View>
  );
};

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    surface_pressure: number;
    uv_index: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
    relative_humidity_2m: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
}

const WeatherScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState('Loading...');
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationName('Colombo, Sri Lanka');
        return { latitude: 6.9271, longitude: 79.8612 };
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address) {
        setLocationName(`${address.city || address.district || ''}, ${address.country || ''}`);
      }

      return { latitude, longitude };
    } catch (err) {
      setLocationName('Colombo, Sri Lanka');
      return { latitude: 6.9271, longitude: 79.8612 };
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,uv_index,is_day&hourly=temperature_2m,weather_code,precipitation_probability,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`;
      
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load weather data');
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoading(true);
    const coords = await getLocation();
    await fetchWeatherData(coords.latitude, coords.longitude);
    setLoading(false);
    setRefreshing(false);
  };

  const formatHour = (dateStr: string, index: number, t?: any) => {
    if (index === new Date().getHours()) return t?.weatherScreen?.now || 'Now';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  const getDayName = (dateStr: string, index: number, t?: any) => {
    if (index === 0) return t?.weatherScreen?.today || 'Today';
    if (index === 1) return t?.weatherScreen?.tomorrow || 'Tomorrow';
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#00b894" translucent />
        <LinearGradient colors={['#00b894', '#00cec9']} style={styles.loadingGradient}>
          <AnimatedWeatherIcon icon="weather-sunny" size={80} />
          <Text style={styles.loadingText}>{t.weatherScreen.loadingWeather}</Text>
          <Text style={styles.loadingSubtext}>{locationName}</Text>
        </LinearGradient>
      </View>
    );
  }

  const weatherInfo = weatherData ? getWeatherInfo(weatherData.current.weather_code, weatherData.current.is_day, t) : null;
  const tappingInfo = weatherData ? calculateTappingScore(
    weatherData.current.temperature_2m,
    weatherData.current.relative_humidity_2m,
    weatherData.daily.precipitation_probability_max[0],
    weatherData.current.wind_speed_10m,
    weatherData.current.weather_code,
    t
  ) : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={weatherInfo?.gradient?.[0] || '#56CCF2'} translucent />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => { setRefreshing(true); loadWeather(); }}
            tintColor="#fff"
          />
        }
      >
        {/* Main Weather Card with Gradient Background */}
        <LinearGradient
          colors={weatherInfo?.gradient as any || ['#56CCF2', '#2F80ED']}
          style={[styles.mainCard, { paddingTop: insets.top + 16 }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons name="map-marker" size={18} color="#fff" />
              <Text style={styles.locationText}>{locationName}</Text>
            </View>
            <TouchableOpacity onPress={() => { setRefreshing(true); loadWeather(); }} style={styles.refreshBtn}>
              <MaterialCommunityIcons name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Current Weather */}
          {weatherData && (
            <View style={styles.currentWeather}>
              <AnimatedWeatherIcon icon={weatherInfo?.icon || 'weather-cloudy'} />
              <Text style={styles.temperature}>{Math.round(weatherData.current.temperature_2m)}°</Text>
              <Text style={styles.condition}>{weatherInfo?.condition}</Text>
              <Text style={styles.feelsLike}>
                {t.weatherScreen.feelsLike} {Math.round(weatherData.current.apparent_temperature)}°
              </Text>
            </View>
          )}

          {/* Tapping Score */}
          {tappingInfo && (
            <View style={styles.tappingSection}>
              <Text style={styles.tappingSectionTitle}>{t.weatherScreen.todaysTappingConditions}</Text>
              <TappingScoreCircle 
                score={tappingInfo.score} 
                status={tappingInfo.status} 
                color={tappingInfo.color} 
              />
              <Text style={styles.tappingRecommendation}>{tappingInfo.recommendation}</Text>
            </View>
          )}
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          {/* Best Tapping Time */}
          {weatherData?.daily.sunrise[0] && (
            <BestTappingTimeCard sunrise={weatherData.daily.sunrise[0]} t={t} />
          )}

          {/* Latex Quality */}
          {weatherData && (
            <LatexQualityCard 
              humidity={weatherData.current.relative_humidity_2m}
              temp={weatherData.current.temperature_2m}
              t={t}
            />
          )}

          {/* Weather Stats Grid */}
          <View style={styles.statsGrid}>
            <WeatherStatCard
              icon="water-percent"
              label={t.weatherScreen.humidity}
              value={weatherData?.current.relative_humidity_2m || 0}
              unit="%"
              color="#0984e3"
              subtitle={weatherData && weatherData.current.relative_humidity_2m > 85 ? t.weatherScreen.high : t.weatherScreen.normal}
            />
            <WeatherStatCard
              icon="weather-windy"
              label={t.weatherScreen.wind}
              value={Math.round(weatherData?.current.wind_speed_10m || 0)}
              unit="km/h"
              color="#00cec9"
            />
            <WeatherStatCard
              icon="white-balance-sunny"
              label={t.weatherScreen.uvIndex}
              value={Math.round(weatherData?.current.uv_index || 0)}
              color="#fdcb6e"
              subtitle={weatherData && weatherData.current.uv_index > 6 ? t.weatherScreen.high : t.weatherScreen.normal}
            />
            <WeatherStatCard
              icon="gauge"
              label={t.weatherScreen.pressure}
              value={Math.round(weatherData?.current.surface_pressure || 0)}
              unit="hPa"
              color="#a29bfe"
            />
          </View>

          {/* Hourly Forecast */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.weatherScreen.hourlyForecast}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.hourlyContainer}>
                {weatherData?.hourly.time.slice(0, 24).map((time, index) => (
                  <HourlyItem
                    key={index}
                    time={formatHour(time, index, t)}
                    temp={weatherData.hourly.temperature_2m[index]}
                    icon={String(weatherData.hourly.weather_code[index])}
                    rainProb={weatherData.hourly.precipitation_probability[index]}
                    isNow={index === new Date().getHours()}
                    t={t}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* 7-Day Forecast */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t.weatherScreen.sevenDayForecast}</Text>
              <View style={styles.legendItem}>
                <MaterialCommunityIcons name="leaf" size={14} color="#00b894" />
                <Text style={styles.legendText}>{t.weatherScreen.tappingScore}</Text>
              </View>
            </View>
            {weatherData?.daily.time.map((day, index) => {
              const dayScore = calculateTappingScore(
                (weatherData.daily.temperature_2m_max[index] + weatherData.daily.temperature_2m_min[index]) / 2,
                70, // average humidity estimate
                weatherData.daily.precipitation_probability_max[index],
                10, // average wind estimate
                weatherData.daily.weather_code[index],
                t
              );
              return (
                <DailyItem
                  key={index}
                  day={getDayName(day, index, t)}
                  weatherCode={weatherData.daily.weather_code[index]}
                  high={weatherData.daily.temperature_2m_max[index]}
                  low={weatherData.daily.temperature_2m_min[index]}
                  rainProb={weatherData.daily.precipitation_probability_max[index]}
                  tappingScore={dayScore.score}
                  t={t}
                />
              );
            })}
          </View>

          {/* Rubber Farming Tips */}
          <View style={styles.tipsSection}>
            <View style={styles.tipsHeader}>
              <MaterialCommunityIcons name="lightbulb-on" size={24} color="#fdcb6e" />
              <Text style={styles.tipsTitle}>{t.weatherScreen.rubberFarmingTips}</Text>
            </View>
            <View style={styles.tipsList}>
              {weatherData && weatherData.daily.precipitation_probability_max[0] > 60 && (
                <View style={styles.tipItem}>
                  <MaterialCommunityIcons name="alert-circle" size={20} color="#e17055" />
                  <Text style={styles.tipText}>
                    {t.weatherScreen.highRainProbability}. {t.weatherScreen.avoidTappingRain}
                  </Text>
                </View>
              )}
              {weatherData && weatherData.current.relative_humidity_2m > 85 && (
                <View style={styles.tipItem}>
                  <MaterialCommunityIcons name="water-alert" size={20} color="#0984e3" />
                  <Text style={styles.tipText}>
                    {t.weatherScreen.highHumidity} - {t.weatherScreen.highHumidityDesc}
                  </Text>
                </View>
              )}
              {weatherData && weatherData.current.temperature_2m > 30 && (
                <View style={styles.tipItem}>
                  <MaterialCommunityIcons name="thermometer-high" size={20} color="#e17055" />
                  <Text style={styles.tipText}>
                    {t.weatherScreen.highTemperature} - {t.weatherScreen.highTemperatureDesc}
                  </Text>
                </View>
              )}
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name="clock-outline" size={20} color="#00b894" />
                <Text style={styles.tipText}>
                  {t.weatherScreen.optimalTappingTime} - {t.weatherScreen.optimalTappingDesc}
                </Text>
              </View>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name="leaf" size={20} color="#00b894" />
                <Text style={styles.tipText}>
                  {t.weatherScreen.checkTrees} - {t.weatherScreen.checkTreesDesc}
                </Text>
              </View>
            </View>
          </View>

          {/* Attribution */}
          <Text style={styles.attribution}>{t.weatherScreen.weatherDataBy}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  loadingSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 8,
  },
  mainCard: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  currentWeather: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    color: '#fff',
    marginTop: 10,
  },
  condition: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '500',
  },
  feelsLike: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  tappingSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tappingSectionTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
  },
  scoreCircleContainer: {
    alignItems: 'center',
  },
  scoreCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  scoreCircleInner: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
    gap: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tappingRecommendation: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  content: {
    padding: 20,
  },
  tappingTimeCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00b894',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  tappingTimeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  tappingTimeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tappingTimeContent: {
    flex: 1,
  },
  tappingTimeLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tappingTimeValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  tappingTimeHint: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  latexCard: {
    backgroundColor: '#2d3436',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  latexHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  latexTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  latexContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  latexItem: {
    flex: 1,
    alignItems: 'center',
  },
  latexItemLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 8,
  },
  qualityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  qualityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  latexDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  drcValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardLabel: {
    fontSize: 13,
    color: '#636e72',
  },
  statCardValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
  },
  statCardUnit: {
    fontSize: 14,
    color: '#636e72',
    marginLeft: 4,
  },
  statCardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#636e72',
  },
  hourlyContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  hourlyItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#f5f6fa',
    minWidth: 70,
  },
  hourlyItemActive: {
    backgroundColor: '#e8f5e9',
  },
  hourlyTime: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 8,
  },
  hourlyTextActive: {
    color: '#00b894',
    fontWeight: '600',
  },
  hourlyTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginTop: 8,
  },
  hourlyRain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 2,
  },
  hourlyRainText: {
    fontSize: 11,
    color: '#0984e3',
  },
  dailyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f6fa',
  },
  dailyDay: {
    width: 70,
    fontSize: 15,
    fontWeight: '500',
    color: '#2d3436',
  },
  dailyWeather: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dailyRain: {
    fontSize: 11,
    color: '#0984e3',
  },
  dailyTemps: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dailyHigh: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3436',
    width: 30,
    textAlign: 'right',
  },
  dailyLow: {
    fontSize: 15,
    color: '#b2bec3',
    width: 30,
  },
  dailyTempBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#dfe6e9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  dailyTempFill: {
    height: '100%',
    backgroundColor: '#fdcb6e',
    borderRadius: 2,
  },
  dailyScore: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    marginLeft: 10,
  },
  dailyScoreText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: '#fff8e1',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f57f17',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#5d4037',
    lineHeight: 20,
  },
  attribution: {
    textAlign: 'center',
    fontSize: 12,
    color: '#b2bec3',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default WeatherScreen;