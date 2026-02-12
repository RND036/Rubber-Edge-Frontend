// config/notificationStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotificationType =
  'info'
  | 'warning'
  | 'success'
  | 'alert'
  | 'chat'
  | 'event';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
  data?: {
    conversationId?: number;
    farmerId?: number;
    officerId?: number;
    farmerName?: string;
    officerName?: string;

    // event fields
    eventId?: number;
    eventTitle?: string;
    eventDate?: string;
    eventOfficerName?: string;
  };
  createdAt?: number;
}

const STORAGE_KEY = '@rubberedge_notifications';

export const notificationStore: Map<string, Notification> = new Map();
export const listeners: Set<() => void> = new Set();

// ✅ LOAD from AsyncStorage
export const loadNotifications = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: [string, Notification][] = JSON.parse(stored);
      parsed.forEach(([key, value]) => {
        notificationStore.set(key, value);
      });
      console.log('📂 Loaded notifications from storage:', notificationStore.size);
    }
  } catch (e) {
    console.error('❌ Load error:', e);
  }
};

// ✅ SAVE to AsyncStorage
const saveNotifications = async () => {
  try {
    const data = Array.from(notificationStore.entries());
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('💾 Saved notifications to storage:', notificationStore.size);
  } catch (e) {
    console.error('❌ Save error:', e);
  }
};

export const triggerNotificationRefresh = () => {
  console.log('🚀 TRIGGERING REFRESH | Listeners:', listeners.size);
  listeners.forEach(listener => {
    try {
      listener();
    } catch (e) {
      console.error('❌ Listener error:', e);
    }
  });
};

// ========= CHAT NOTIFICATIONS (existing) =========

export const addChatNotification = (
  conversationId: number,
  farmerId: number,
  officerId: number,
  farmerName: string,
  officerName: string,
  messagePreview: string,
  currentUserId: number,
  messageSenderId: number
): string => {
  if (messageSenderId === currentUserId) {
    console.log('⏭️ Skipping own message');
    return '';
  }

  const notificationId = `chat-${conversationId}-${Date.now()}`;

  // Clear old unread for same conversation
  notificationStore.forEach((notif, key) => {
    if (
      notif.type === 'chat' &&
      notif.data?.conversationId === conversationId &&
      !notif.read
    ) {
      notificationStore.delete(key);
    }
  });

  const senderName = messageSenderId === farmerId ? farmerName : officerName;
  const newNotification: Notification = {
    id: notificationId,
    title: `New message from ${senderName}`,
    message:
      messagePreview.length > 50
        ? `${messagePreview.slice(0, 50)}...`
        : messagePreview,
    time: 'Just now',
    read: false,
    type: 'chat',
    data: { conversationId, farmerId, officerId, farmerName, officerName },
    createdAt: Date.now(),
  };

  notificationStore.set(notificationId, newNotification);
  console.log('✅ Chat notification added:', notificationId, '| Store:', notificationStore.size);

  saveNotifications();
  triggerNotificationRefresh();
  return notificationId;
};

export const clearChatNotifications = async () => {
  notificationStore.forEach((n, k) => {
    if (n.type === 'chat') notificationStore.delete(k);
  });
  await saveNotifications();
  triggerNotificationRefresh();
};

// ========= EVENT NOTIFICATIONS (new) =========

export const addEventNotification = (
  eventId: number,
  eventTitle: string,
  eventDescription: string,
  eventDate: string,
  officerName: string
): string => {
  const notificationId = `event-${eventId}-${Date.now()}`;

  const newNotification: Notification = {
    id: notificationId,
    title: `New Event: ${eventTitle}`,
    message:
      eventDescription.length > 80
        ? `${eventDescription.slice(0, 80)}...`
        : eventDescription,
    time: 'Just now',
    read: false,
    type: 'event',
    data: {
      eventId,
      eventTitle,
      eventDate,
      eventOfficerName: officerName,
    },
    createdAt: Date.now(),
  };

  notificationStore.set(notificationId, newNotification);
  console.log('✅ Event notification added:', notificationId, '| Store:', notificationStore.size);

  saveNotifications();
  triggerNotificationRefresh();
  return notificationId;
};

export const clearEventNotifications = async () => {
  notificationStore.forEach((n, k) => {
    if (n.type === 'event') notificationStore.delete(k);
  });
  await saveNotifications();
  triggerNotificationRefresh();
};

// ========= COMMON =========

export const markAsRead = async (id: string) => {
  const notif = notificationStore.get(id);
  if (notif) {
    notificationStore.set(id, { ...notif, read: true });
    await saveNotifications();
  }
};

// Auto-load on import
loadNotifications();
