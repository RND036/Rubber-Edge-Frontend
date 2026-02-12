import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  notificationStore,
  listeners,
  Notification,
  NotificationType,
  loadNotifications,
  clearChatNotifications,
  clearEventNotifications,
  markAsRead,
} from '../config/notificationStore';

const NotificationsScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const updateNotifications = useCallback(() => {
    const chatNotifs = Array.from(notificationStore.values())
      .filter((n) => n.type === 'chat')
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    const eventNotifs = Array.from(notificationStore.values())
      .filter((n) => n.type === 'event')
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    const otherNotifs = Array.from(notificationStore.values())
      .filter((n) => n.type !== 'chat' && n.type !== 'event')
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    const all: Notification[] = [...eventNotifs, ...chatNotifs, ...otherNotifs];

    setNotifications(all);
  }, []);

  useEffect(() => {
    loadNotifications().then(() => {
      const listener = () => {
        updateNotifications();
      };

      listeners.add(listener);
      updateNotifications();

      return () => {
        listeners.delete(listener);
      };
    });
  }, [updateNotifications]);

  useFocusEffect(
    useCallback(() => {
      loadNotifications().then(updateNotifications);
    }, [updateNotifications])
  );

  const handlePress = async (notification: Notification) => {
    await markAsRead(notification.id);
    updateNotifications();

    if (notification.type === 'chat' && notification.data?.conversationId) {
      router.push({
        pathname: '/chat',
        params: {
          conversationId: String(notification.data.conversationId),
          farmerId: String(notification.data.farmerId || ''),
          officerId: String(notification.data.officerId || ''),
          farmerName: String(notification.data.farmerName || ''),
          officerName: String(notification.data.officerName || ''),
        },
      });
    }

    if (notification.type === 'event' && notification.data?.eventId) {
      router.push({
        pathname: '/events-list',
        params: {
          eventId: String(notification.data.eventId),
        },
      });
    }
  };

  const handleClearAll = async () => {
    await clearChatNotifications();
    await clearEventNotifications();
    updateNotifications();
  };

  const getIcon = (type: NotificationType) => {
    const map: Record<NotificationType, { name: string; color: string; bg: string }> = {
      warning: { name: 'alert', color: '#F59E0B', bg: '#FEF3C7' },
      success: { name: 'check-circle', color: '#10B981', bg: '#D1FAE5' },
      alert: { name: 'alert-circle', color: '#EF4444', bg: '#FEE2E2' },
      chat: { name: 'message-text', color: '#3B82F6', bg: '#DBEAFE' },
      info: { name: 'information', color: '#6366F1', bg: '#E0E7FF' },
      event: { name: 'calendar-star', color: '#8B5CF6', bg: '#EDE9FE' },
    };
    return map[type] || map.info;
  };

  const formatTime = (time: string) => {
    return time;
  };

  // Group notifications by read status for better organization
  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);
  const hasNotifications = notifications.length > 0;
  const unreadCount = unreadNotifications.length;

  const renderNotification = (notification: Notification) => {
    const icon = getIcon(notification.type);
    return (
      <TouchableOpacity
        key={notification.id}
        style={[
          styles.notificationCard,
          !notification.read && styles.unreadCard,
        ]}
        onPress={() => handlePress(notification)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: icon.bg }]}>
          <MaterialCommunityIcons
            name={icon.name as any}
            size={24}
            color={icon.color}
          />
        </View>

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text
              style={[
                styles.notificationTitle,
                !notification.read && styles.unreadTitle,
              ]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            {!notification.read && <View style={styles.unreadDot} />}
          </View>

          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>

          <Text style={styles.notificationTime}>
            {formatTime(notification.time)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.title}>{t.notifications.title}</Text>
        </View>

        {hasNotifications && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <MaterialCommunityIcons name="check-all" size={20} color="#00822C" />
            <Text style={styles.clearText}>{t.notifications.clearAll}</Text>
          </TouchableOpacity>
        )}
        
        {!hasNotifications && <View style={styles.clearButton} />}
      </View>

      {/* Notifications List */}
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {!hasNotifications ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={80}
                color="#D1D5DB"
              />
            </View>
            <Text style={styles.emptyTitle}>{t.notifications.noNotificationsYet}</Text>
            <Text style={styles.emptySubtitle}>
              {t.notifications.noNotificationsDesc}
            </Text>
          </View>
        ) : (
          <>
            {/* Unread Section */}
            {unreadNotifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {t.notifications.new} ({unreadNotifications.length})
                </Text>
                {unreadNotifications.map(renderNotification)}
              </View>
            )}

            {/* Read Section */}
            {readNotifications.length > 0 && (
              <View style={styles.section}>
                {unreadNotifications.length > 0 && (
                  <Text style={styles.sectionTitle}>{t.notifications.earlier}</Text>
                )}
                {readNotifications.map(renderNotification)}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00822C',
    marginLeft: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  unreadCard: {
    backgroundColor: '#FEFEFE',
    borderLeftWidth: 4,
    borderLeftColor: '#00822C',
    shadowOpacity: 0.08,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    letterSpacing: -0.3,
  },
  unreadTitle: {
    fontWeight: '700',
    color: '#111827',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00822C',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
});