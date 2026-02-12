// hooks/useNotificationWebSocket.ts
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { addEventNotification } from '../config/notificationStore';
import { WS_BASE_URL } from '../config/networkConfig';

export const useNotificationWebSocket = () => {
  const { user } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);  // Fixed type

  useEffect(() => {
    console.log('🔍 WebSocket Hook Effect Running:', {
      hasUser: !!user,
      userId: user?.id,
      role: user?.role
    });

    if (!user?.id) {
      console.log('⏭️ No user, skipping WebSocket');
      return;
    }

    console.log('🎯 Initializing WebSocket for user:', user.id, 'role:', user.role);

    const wsUrl = `${WS_BASE_URL}/notifications/${user.id}/`;
    
    console.log('🔌 WebSocket URL:', wsUrl);

    const connectWebSocket = () => {
      try {
        console.log('🔄 Creating WebSocket connection...');
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('✅ WebSocket CONNECTED for user:', user.id);
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
          }
        };

        ws.onmessage = (event) => {
          console.log('📨 WebSocket message received:', event.data);
          
          try {
            const data = JSON.parse(event.data);
            console.log('📦 Parsed notification data:', data);

            if (data.type === 'notification' && data.data) {
              const { eventId, eventTitle, eventDescription, eventDate, officerName } = data.data;
              
              console.log('🎉 Adding event notification:', {
                eventId,
                eventTitle,
                officerName
              });
              
              addEventNotification(
                eventId,
                eventTitle,
                eventDescription,
                eventDate,
                officerName
              );
              
              console.log('✅ Notification added to store');
            } else {
              console.log('⚠️ Unknown notification format:', data);
            }
          } catch (error) {
            console.error('❌ Error processing notification:', error);
            console.error('Raw data was:', event.data);
          }
        };

        ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
        };

        ws.onclose = (event) => {
          console.log('🔌 WebSocket closed:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          });
          console.log('🔄 Reconnecting in 3 seconds...');
          reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
        };
      } catch (error) {
        console.error('❌ Error creating WebSocket:', error);
      }
    };

    connectWebSocket();

    return () => {
      console.log('🧹 Cleaning up WebSocket');
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user?.id]);

  return wsRef;
};
