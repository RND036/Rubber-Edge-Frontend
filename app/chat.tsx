import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
  AppState,
  StatusBar,
  useWindowDimensions,
  PixelRatio,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from "expo-router";

// Base dimensions for scaling (iPhone 14 as reference)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive scaling utilities
const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const isMediumDevice = width >= 375 && width < 414;
  const isLargeDevice = width >= 414 && width < 768;
  const isTablet = width >= 768;
  
  // Scale based on width
  const horizontalScale = (size: number) => (width / BASE_WIDTH) * size;
  // Scale based on height
  const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;
  // Moderate scale for fonts and spacing (balanced approach)
  const moderateScale = (size: number, factor = 0.5) =>
    size + (horizontalScale(size) - size) * factor;
  
  // Font scaling with limits to prevent extremely large/small fonts
  const fontScale = (size: number) => {
    const scaledSize = moderateScale(size, 0.4);
    const maxScale = size * 1.3;
    const minScale = size * 0.8;
    return Math.min(Math.max(scaledSize, minScale), maxScale);
  };
  
  return {
    width,
    height,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    hp: horizontalScale,
    vp: verticalScale,
    mp: moderateScale,
    fp: fontScale,
  };
};
import {
  getConversationMessages,
  buildChatWebSocketUrl,
  getClientId,
} from "../config/chatApi";
import { addChatNotification } from "../config/notificationStore";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

type Message = {
  id: number;
  sender_id?: number;
  sender?: number;
  text: string;
  created_at: string;
};

const MessageBubble = ({ item, isMine, responsive }: { item: Message; isMine: boolean; responsive: ReturnType<typeof useResponsive> }) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { hp, vp, fp, isTablet } = responsive;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          marginVertical: vp(4),
          maxWidth: isTablet ? "60%" : "80%",
          alignSelf: isMine ? "flex-end" : "flex-start",
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View
        style={[
          {
            borderRadius: hp(20),
            paddingHorizontal: hp(16),
            paddingVertical: vp(10),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          },
          isMine
            ? { backgroundColor: "#007AFF", borderBottomRightRadius: hp(4) }
            : { backgroundColor: "#FFFFFF", borderBottomLeftRadius: hp(4) },
        ]}
      >
        <Text
          style={{
            fontSize: fp(16),
            color: isMine ? "#FFFFFF" : "#333",
            lineHeight: fp(22),
          }}
        >
          {item.text}
        </Text>
        <Text
          style={{
            fontSize: fp(11),
            color: isMine ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
            marginTop: vp(4),
            alignSelf: "flex-end",
          }}
        >
          {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    </Animated.View>
  );
};

export default function RubberChatScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { accessToken, user } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const responsive = useResponsive();
  const { hp, vp, fp, isTablet, isSmallDevice } = responsive;
  const conversationId = Number(params.conversationId);

  const farmerId = Number(params.farmerId);
  const officerId = Number(params.officerId);
  const farmerName = String(params.farmerName || "Farmer");
  const officerName = String(params.officerName || "Officer");

  console.log(`🔍 ROLE CHECK: userId=${user?.id}, farmerId=${farmerId}, officerId=${officerId}`);

  const myRole = user?.id === farmerId ? 'Farmer' : user?.id === officerId ? 'Officer' : 'Unknown';
  const otherPersonRole = myRole === 'Farmer' ? 'Officer' : 'Farmer';
  const otherPersonName = myRole === 'Farmer' ? officerName : farmerName;

  console.log(`✅ ROLES: I am ${myRole}, talking to ${otherPersonRole} (${otherPersonName})`);

  const loadedMessageIdsRef = useRef<Set<number>>(new Set());
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const inputScaleAnim = useRef(new Animated.Value(1)).current;
  const reconnectTimerRef = useRef<number | null>(null);

  // ✅ MAIN EFFECT - Load history and open WebSocket
  useEffect(() => {
    if (!accessToken || !conversationId || !user?.id) return;

    let isCancelled = false;

    const initChat = async () => {
      console.log(`⏳ LOADING convo #${conversationId} for user ${user.id}`);
      try {
        const res = await getConversationMessages(conversationId);
        console.log(`📜 History: ${res.data.length} msgs for convo #${conversationId}`);

        if (!isCancelled) {
          const msgIds = res.data.map((msg: Message) => msg.id);
          loadedMessageIdsRef.current = new Set(msgIds);
          setMessages(res.data);
        }
      } catch (e) {
        console.log("❌ History error:", e);
      }

      if (!isCancelled) {
        openSocket();
      }
    };

    initChat();

    // ✅✅✅ CRITICAL FIX: DO NOT CLOSE WEBSOCKET ON UNMOUNT
    return () => {
      isCancelled = true;
      
      // ✅ Keep WebSocket alive for background notifications
      console.log('🔒 Component unmounting, keeping WS alive for notifications');
      
      // ❌ DO NOT UNCOMMENT THIS LINE:
      // if (wsRef.current) wsRef.current.close();
      
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };
  }, [conversationId, accessToken, user?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  const openSocket = useCallback(() => {
    // ✅ Close existing connection only if we're reconnecting
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('🔄 Closing existing WebSocket before reconnect');
      wsRef.current.close();
    }

    const userId = user?.id;
    if (!userId) return;

    const role = userId === farmerId ? 'farmer' : 'officer';
    const clientId = getClientId(Number(userId), role);
    console.log(`🆔 user=${userId} role=${role} client=${clientId}`);

    const url = buildChatWebSocketUrl(conversationId, accessToken!, clientId);
    console.log(`🔗 WS convo=#${conversationId}: ${url.slice(-50)}`);

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`✅ WS CONNECTED convo=#${conversationId}`);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(`📨 RECV convo=#${conversationId}:`, data);

        if (data.id && !loadedMessageIdsRef.current.has(data.id)) {
          loadedMessageIdsRef.current.add(data.id);

          const messageSenderId = data.sender_id ?? data.sender;

          // ✅ CREATE NOTIFICATION FOR OTHER USER'S MESSAGES
          if (messageSenderId !== user?.id) {
            console.log(`🔔 === CREATING NOTIFICATION ===`);
            console.log(`  Sender: ${messageSenderId} ≠ Me: ${user?.id}`);

            addChatNotification(
              conversationId,
              farmerId,
              officerId,
              farmerName,
              officerName,
              data.text,
              user!.id,
              messageSenderId
            );
          } else {
            console.log(`⏭️ Skipping notification: sender ${messageSenderId} === me ${user?.id}`);
          }

          setMessages(prev => [...prev, data as Message]);
        }
      } catch (e) {
        console.log("❌ WS parse error", e);
      }
    };

    ws.onerror = (e) => {
      console.log("❌ WS error", e);
      setIsConnected(false);
    };

    ws.onclose = (event) => {
      console.log(`🔌 WS CLOSED convo=#${conversationId}`, { code: event.code });
      setIsConnected(false);

      // Only reconnect if closed abnormally (not manual close)
      if (event.code !== 1000 && !reconnectTimerRef.current) {
        reconnectTimerRef.current = setTimeout(() => {
          console.log("🔄 Reconnecting...");
          reconnectTimerRef.current = null;
          openSocket();
        }, 2000) as unknown as number;
      }
    };
  }, [conversationId, accessToken, user?.id, farmerId, officerId, farmerName, officerName]);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(inputScaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(inputScaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const sendMessage = () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !text.trim()) return;

    const messageData = { text: text.trim() };
    console.log(`📤 SEND convo=#${conversationId}:`, messageData);

    animateButton();
    ws.send(JSON.stringify(messageData));
    setText("");
  };

  const renderItem = ({ item }: { item: Message }) => {
    const senderId = item.sender_id ?? item.sender;
    const isMine = senderId === user?.id;
    return <MessageBubble item={item} isMine={isMine} responsive={responsive} />;
  };

  if (!conversationId || !user?.id) {
    return (
      <View style={[styles.errorContainer, { padding: hp(24) }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent />
        <Text style={[styles.errorText, { fontSize: fp(18), marginBottom: vp(12) }]}>
          {t.chatScreen.noConversationSelected}
        </Text>
        <TouchableOpacity
          style={[
            styles.backButtonError,
            {
              paddingHorizontal: hp(24),
              paddingVertical: vp(12),
              borderRadius: hp(8),
            },
          ]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { fontSize: fp(16) }]}>
            {t.chatScreen.goBack}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (myRole === 'Unknown') {
    return (
      <View style={[styles.errorContainer, { padding: hp(24) }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent />
        <Text style={[styles.errorText, { fontSize: fp(18), marginBottom: vp(12) }]}>
          {t.chatScreen.roleMismatch}
        </Text>
        <Text style={[styles.errorSubtext, { fontSize: fp(14), marginBottom: vp(20) }]}>
          User ID {user?.id} is neither farmer ({farmerId}) nor officer ({officerId})
        </Text>
        <TouchableOpacity
          style={[
            styles.backButtonError,
            {
              paddingHorizontal: hp(24),
              paddingVertical: vp(12),
              borderRadius: hp(8),
            },
          ]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { fontSize: fp(16) }]}>
            {t.chatScreen.goBack}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View
          style={[
            styles.statusBar,
            {
              paddingHorizontal: hp(16),
              paddingVertical: vp(12),
              maxWidth: isTablet ? 800 : "100%",
              alignSelf: isTablet ? "center" : "stretch",
              width: isTablet ? "100%" : undefined,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { marginRight: hp(12), padding: hp(4) }]}
          >
            <Text style={[styles.backText, { fontSize: fp(28) }]}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text
              style={[
                styles.chatWithText,
                { fontSize: fp(18), marginBottom: vp(4) },
              ]}
              numberOfLines={1}
            >
              {otherPersonName}
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  {
                    width: hp(8),
                    height: hp(8),
                    borderRadius: hp(4),
                    marginRight: hp(8),
                    backgroundColor: isConnected ? "#4CAF50" : "#FF5252",
                  },
                ]}
              />
              <Text style={[styles.statusText, { fontSize: fp(12) }]}>
                {otherPersonRole} •{" "}
                {isConnected ? t.chatScreen.online : t.chatScreen.connecting}
              </Text>
            </View>
          </View>
        </View>

        {/* Debug Bar */}
        <View
          style={[
            styles.debugBar,
            {
              paddingHorizontal: hp(16),
              paddingVertical: vp(6),
              maxWidth: isTablet ? 800 : "100%",
              alignSelf: isTablet ? "center" : "stretch",
              width: isTablet ? "100%" : undefined,
            },
          ]}
        >
          <Text style={[styles.debugText, { fontSize: fp(10) }]}>
            You: {myRole} (ID: {user?.id}) | Convo: #{conversationId} | WS:{" "}
            {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
          </Text>
        </View>

        {/* Message List */}
        <FlatList
          ref={flatListRef}
          style={[
            styles.messageList,
            {
              maxWidth: isTablet ? 800 : "100%",
              alignSelf: isTablet ? "center" : "stretch",
              width: isTablet ? "100%" : undefined,
            },
          ]}
          contentContainerStyle={[
            styles.messageListContent,
            {
              padding: hp(16),
              paddingBottom: vp(8),
            },
          ]}
          data={messages}
          keyExtractor={(item, index) => String(item.id || index)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={[
                styles.emptyContainer,
                { paddingVertical: vp(60) },
              ]}
            >
              <Text style={[styles.emptyText, { fontSize: fp(18), marginBottom: vp(8) }]}>
                {t.chatScreen.noMessagesYet}
              </Text>
              <Text style={[styles.emptySubtext, { fontSize: fp(14) }]}>
                {t.chatScreen.startConversation.replace("{name}", otherPersonName)}
              </Text>
            </View>
          }
        />

        {/* Input Container */}
        <View
          style={[
            styles.inputContainer,
            {
              paddingHorizontal: hp(16),
              paddingVertical: vp(12),
              maxWidth: isTablet ? 800 : "100%",
              alignSelf: isTablet ? "center" : "stretch",
              width: isTablet ? "100%" : undefined,
            },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  borderRadius: hp(24),
                  paddingHorizontal: hp(16),
                  paddingVertical: vp(10),
                  fontSize: fp(16),
                  maxHeight: vp(100),
                  marginRight: hp(8),
                  minHeight: vp(44),
                },
              ]}
              value={text}
              onChangeText={setText}
              placeholder={t.chatScreen.messagePlaceholder.replace(
                "{name}",
                otherPersonName
              )}
              placeholderTextColor="#999"
              multiline
              maxLength={1000}
            />
            <Animated.View style={{ transform: [{ scale: inputScaleAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    width: hp(44),
                    height: hp(44),
                    borderRadius: hp(22),
                  },
                  (!text.trim() || !isConnected) && styles.sendButtonDisabled,
                ]}
                onPress={sendMessage}
                disabled={!text.trim() || !isConnected}
              >
                <Text style={[styles.sendButtonText, { fontSize: fp(20) }]}>➤</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {},
  backText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  headerInfo: {
    flex: 1,
  },
  chatWithText: {
    fontWeight: "700",
    color: "#333",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {},
  statusText: {
    color: "#666",
    fontWeight: "500",
  },
  debugBar: {
    backgroundColor: "#FFF3CD",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE69C",
  },
  debugText: {
    color: "#856404",
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontWeight: "600",
    color: "#666",
  },
  emptySubtext: {
    color: "#999",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    color: "#333",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#CCCCCC",
    shadowOpacity: 0,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  errorText: {
    color: "#666",
    textAlign: "center",
    fontWeight: "600",
  },
  errorSubtext: {
    color: "#999",
    textAlign: "center",
  },
  backButtonError: {
    backgroundColor: "#007AFF",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
