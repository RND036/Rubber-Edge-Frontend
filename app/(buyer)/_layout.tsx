import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';

export default function BuyerLayout() {
  const router = useRouter();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        // 1. Enable and Style the Top Bar
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1A237E', // Deep Navy Professional Blue
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        headerTitleAlign: 'left', // Professional standard for business apps
        
        // 2. Add a Global Header Right (e.g., Notifications or Profile)
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
        ),

        // 3. Tab Bar Styling with Safe Area
        tabBarActiveTintColor: '#1A237E',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          paddingHorizontal: 12,
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.buyer.buyerDashboard,
          tabBarLabel: t.buyer.dashboard,
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="market-buyer"
        options={{
          title: t.buyer.marketRates,
          tabBarLabel: t.buyer.market,
          tabBarIcon: ({ color }) => <Ionicons name="cash-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tutorials"
        options={{
          title: t.buyer.buyerTutorials,
          tabBarLabel: t.buyer.buyerTutorials,
          tabBarIcon: ({ color }) => <Ionicons name="school-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.buyer.profileAndSettings,
          tabBarLabel: t.buyer.settings,
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}