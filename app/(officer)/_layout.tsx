import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Custom Header Component for Officer screens
const OfficerHeader = ({ 
  title, 
  icon, 
  showNotification = true 
}: { 
  title: string; 
  icon: keyof typeof Ionicons.glyphMap; 
  showNotification?: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
      <View style={styles.headerContent}>
        {/* Left icon */}
        <View style={styles.headerSide}>
          <View style={styles.iconWrapper}>
            <Ionicons name={icon} size={24} color="#fff" />
          </View>
        </View>
        
        {/* Centered title */}
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        </View>
        
        {/* Right notification button */}
        <View style={styles.headerSide}>
          {showNotification && (
            <TouchableOpacity 
              style={styles.notificationBtn}
              onPress={() => router.push('/notifications' as any)}
            >
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default function OfficerLayout() {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  
  return (
    <Tabs 
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#F57C00',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.officer.officerDashboard,
          tabBarLabel: t.officer.dashboard,
          header: () => <OfficerHeader title={t.officer.officerDashboard} icon="grid-outline" />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="farmers"
        options={{
          title: t.officer.farmerManagement,
          tabBarLabel: t.officer.farmers,
          header: () => <OfficerHeader title={t.officer.farmerManagement} icon="people-outline" />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tutorials"
        options={{
          title: t.officer.tutorialsGuides,
          tabBarLabel: t.officer.tutorials,
          header: () => <OfficerHeader title={t.officer.tutorialsGuides} icon="book-outline" />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.officer.profileSettings,
          tabBarLabel: t.officer.settings,
          header: () => <OfficerHeader title={t.officer.profileSettings} icon="settings-outline" />,
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#F57C00',
    paddingBottom: 15,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: SCREEN_WIDTH,
  },
  headerSide: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});
