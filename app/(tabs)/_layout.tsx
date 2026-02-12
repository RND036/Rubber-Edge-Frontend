// app/(tabs)/farmer/_layout.tsx
import { Tabs, useRouter } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Platform, StatusBar } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';
import { notificationStore, listeners, loadNotifications } from '../../config/notificationStore';
import '../global.css';


// ========== INTERFACES ==========
interface User {
  id: number;
  phone_number: string;
  role: string;
  farmer_profile?: {
    name: string;
    nic_number: string;
    district: string;
  };
}


// ========== CUSTOM HEADER FOR HOME SCREEN ==========
const HomeHeader = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  
  // Calculate responsive values
  const isSmallScreen = width < 375;
  const isTablet = width >= 768;
  
  const updateUnreadCount = () => {
    const unread = Array.from(notificationStore.values()).filter(n => !n.read).length;
    setUnreadCount(unread);
  };


  useEffect(() => {
    loadNotifications().then(updateUnreadCount);
    listeners.add(updateUnreadCount);
    return () => {
      listeners.delete(updateUnreadCount);
    };
  }, []);
  
  return (
    <View style={[
      styles.headerContainer,
      { 
        paddingTop: insets.top > 0 ? insets.top : (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20),
        paddingHorizontal: isTablet ? 40 : (isSmallScreen ? 16 : 20)
      }
    ]}>
      <View style={[styles.headerLeft, { maxWidth: width - 100 }]}>
        <Text style={[
          styles.welcomeText,
          { fontSize: isSmallScreen ? 12 : (isTablet ? 16 : 14) }
        ]}>
          {t.tabs.welcome}
        </Text>
        <View style={styles.userRow}>
          <MaterialCommunityIcons 
            name="account-circle" 
            size={isTablet ? 28 : 24} 
            color="#00822C" 
          />
          <Text 
            style={[
              styles.userName,
              { fontSize: isSmallScreen ? 16 : (isTablet ? 22 : 18) }
            ]} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {userName || 'Farmer'}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.notificationBtn,
          { 
            width: isTablet ? 52 : 44,
            height: isTablet ? 52 : 44,
          }
        ]}
        onPress={() => router.push('/notifications' as any)}
      >
        <MaterialCommunityIcons 
          name="bell-outline" 
          size={isTablet ? 28 : 24} 
          color="#000" 
        />
        {unreadCount > 0 && (
          <View style={[
            styles.badge,
            { 
              minWidth: isTablet ? 24 : 20,
              height: isTablet ? 24 : 20,
            }
          ]}>
            <Text style={[
              styles.badgeText,
              { fontSize: isTablet ? 12 : 11 }
            ]}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};


// ========== CUSTOM HEADER FOR OTHER SCREENS ==========
const ScreenHeader = ({ title, icon }: { title: string; icon: string }) => {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const isSmallScreen = width < 375;
  const isTablet = width >= 768;
  
  const updateUnreadCount = () => {
    const unread = Array.from(notificationStore.values()).filter(n => !n.read).length;
    setUnreadCount(unread);
  };


  useEffect(() => {
    loadNotifications().then(updateUnreadCount);
    listeners.add(updateUnreadCount);
    return () => {
      listeners.delete(updateUnreadCount);
    };
  }, []);
  
  return (
    <View style={[
      styles.headerContainer,
      { 
        paddingTop: insets.top > 0 ? insets.top : (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20),
        paddingHorizontal: isTablet ? 40 : (isSmallScreen ? 16 : 20)
      }
    ]}>
      <View style={styles.screenTitleRow}>
        <MaterialCommunityIcons 
          name={icon as any} 
          size={isTablet ? 28 : 24} 
          color="#000" 
        />
        <Text style={[
          styles.screenTitle,
          { fontSize: isSmallScreen ? 18 : (isTablet ? 24 : 20) }
        ]}>
          {title}
        </Text>
      </View>
      <TouchableOpacity 
        style={[
          styles.notificationBtn,
          { 
            width: isTablet ? 52 : 44,
            height: isTablet ? 52 : 44,
          }
        ]}
        onPress={() => router.push('/notifications' as any)}
      >
        <MaterialCommunityIcons 
          name="bell-outline" 
          size={isTablet ? 28 : 24} 
          color="#000" 
        />
        {unreadCount > 0 && (
          <View style={[
            styles.badge,
            { 
              minWidth: isTablet ? 24 : 20,
              height: isTablet ? 24 : 20,
            }
          ]}>
            <Text style={[
              styles.badgeText,
              { fontSize: isTablet ? 12 : 11 }
            ]}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};


// ========== MAIN LAYOUT COMPONENT ==========
export default function TabsLayout() {
  const [loggedInUserName, setLoggedInUserName] = useState<string>('Farmer');
  const { width } = useWindowDimensions();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const isTablet = width >= 768;


  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Reload user data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );


  const loadUserData = async () => {
    try {
      console.log('🔄 Loading user data from AsyncStorage...');
      const userDataString = await AsyncStorage.getItem('user');
      
      if (userDataString) {
        const userData: User = JSON.parse(userDataString);
        console.log('📱 Loaded user data:', JSON.stringify(userData, null, 2));
        
        // Check if farmer_profile exists and has a name
        if (userData.farmer_profile?.name) {
          setLoggedInUserName(userData.farmer_profile.name);
          console.log('✅ Farmer name set:', userData.farmer_profile.name);
        } 
        // Fallback to phone number if farmer profile doesn't exist
        else if (userData.phone_number) {
          setLoggedInUserName(userData.phone_number);
          console.log('⚠️ Using phone number as fallback:', userData.phone_number);
        } 
        // Final fallback
        else {
          setLoggedInUserName('Farmer');
          console.log('⚠️ Using default name: Farmer');
        }
      } else {
        console.log('⚠️ No user data found in AsyncStorage');
        setLoggedInUserName('Farmer');
      }
    } catch (error) {
      console.error('❌ Error loading user data:', error);
      setLoggedInUserName('Farmer');
    }
  };


  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#00822C',
        tabBarIconStyle: { 
          marginTop: isTablet ? 8 : 4 
        },
        tabBarLabelStyle: { 
          fontSize: isTablet ? 14 : 12 
        },
        tabBarStyle: {
          height: (isTablet ? 80 : 60) + (insets.bottom > 0 ? insets.bottom : 0),
          paddingBottom: (isTablet ? 15 : 8) + (insets.bottom > 0 ? insets.bottom : 0),
          paddingTop: isTablet ? 10 : 5,
          paddingHorizontal: isTablet ? 20 : 10,
        }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: t.tabs?.home || "Home",
          header: () => <HomeHeader userName={loggedInUserName} />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "home" : "home-outline"} 
              size={isTablet ? 28 : 24} 
              color={color} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="diagnose" 
        options={{ 
          title: t.tabs?.diagnose || "Diagnose",
          header: () => <ScreenHeader title={t.tabs?.diagnose || "Diagnose"} icon="heart-pulse" />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name="heart-pulse"
              size={isTablet ? 28 : 24} 
              color={color} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="support" 
        options={{ 
          title: t.tabs?.support || "Support",
          header: () => <ScreenHeader title={t.tabs?.support || "Support"} icon="lifebuoy" />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name="lifebuoy"
              size={isTablet ? 28 : 24} 
              color={color} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: t.tabs?.settings || "Settings",
          header: () => <ScreenHeader title={t.tabs?.settings || "Settings"} icon="cog" />,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "cog" : "cog-outline"} 
              size={isTablet ? 28 : 24} 
              color={color} 
            />
          )
        }} 
      />
    </Tabs>
  );
}


// ========== STYLES ==========
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flex: 1,
    marginRight: 10,
  },
  welcomeText: {
    color: '#757575',
    marginBottom: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontWeight: '600',
    color: '#000',
    flexShrink: 1,
  },
  screenTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  screenTitle: {
    fontWeight: '700',
    color: '#000',
  },
  notificationBtn: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
});
