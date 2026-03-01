// screens/RubbyScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  ListRenderItem,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import {
  ApiError,
  ChatMessage,
  checkChatbotHealth,
  clearChatSession,
  sendChatMessage,
} from '../services/api';

const { width } = Dimensions.get('window');

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation?: any;
}

// ─── Moved outside to prevent re-creation during typing ───────────────────────

const AnimatedQuickButton = React.memo(({ emoji, text, color, onPress, delay }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={[styles.quickButton, { borderColor: color }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.quickButtonEmojiText}>{emoji}</Text>
        <Text style={[styles.quickButtonText, { color }]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ─── AnimatedMessageBubble – moved outside RubbyScreen ────────────────────────

const AnimatedMessageBubble = React.memo(({ item }: { item: ChatMessage }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(item.isBot ? -30 : 30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const time = new Date(item.time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Animated.View
      style={[
        styles.messageRow,
        item.isBot ? styles.botMessageRow : styles.userMessageRow,
        {
          opacity: fadeAnim,
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      {item.isBot && (
        <View style={styles.botAvatar}>
          <Ionicons name="leaf" size={20} color="#fff" />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          item.isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isBot ? styles.botText : styles.userText,
          ]}
        >
          {item.text}
        </Text>

        <Text
          style={[
            styles.timeText,
            item.isBot ? styles.botTime : styles.userTime,
          ]}
        >
          {time}
        </Text>

        {item.toolsUsed && item.toolsUsed.length > 0 && (
          <View style={styles.toolsContainer}>
            <Ionicons name="search" size={12} color="#4CAF50" />
            <Text style={styles.toolsText}>
              Searched: {item.toolsUsed.join(', ')}
            </Text>
          </View>
        )}
      </View>

      {!item.isBot && (
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={20} color="#fff" />
        </View>
      )}
    </Animated.View>
  );
});

// ─── TypingIndicator – moved outside RubbyScreen ──────────────────────────────

const TypingIndicator = React.memo(() => {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  const containerScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(containerScale, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    const createDotAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          }),
        ])
      );
    };

    Animated.parallel([
      createDotAnimation(dot1Anim, 0),
      createDotAnimation(dot2Anim, 160),
      createDotAnimation(dot3Anim, 320),
    ]).start();
  }, []);

  const dotStyle = (animValue: Animated.Value) => ({
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
    ],
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  });

  return (
    <Animated.View
      style={[
        styles.typingRow,
        { transform: [{ scale: containerScale }] }
      ]}
    >
      <View style={styles.botAvatar}>
        <Ionicons name="leaf" size={20} color="#fff" />
      </View>
      <View style={styles.typingBubble}>
        <Text style={styles.typingLabel}>Rubby is thinking</Text>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.dot, dotStyle(dot1Anim)]} />
          <Animated.View style={[styles.dot, dotStyle(dot2Anim)]} />
          <Animated.View style={[styles.dot, dotStyle(dot3Anim)]} />
        </View>
      </View>
    </Animated.View>
  );
});

// ─── QuickActions – moved outside RubbyScreen ─────────────────────────────────

interface QuickActionsProps {
  showLanguages: boolean;
  onToggleLanguages: () => void;
  onSetInputText: (text: string) => void;
  onLanguageChange: (code: string) => void;
}

const QuickActions = React.memo(({
  showLanguages,
  onToggleLanguages,
  onSetInputText,
  onLanguageChange,
}: QuickActionsProps) => {
  const quickButtons = [
    { emoji: '🦠', text: 'Diseases', query: 'What diseases commonly affect rubber plants in Sri Lanka?', color: '#E53935' },
    { emoji: '💰', text: 'Prices', query: 'What is the current rubber price?', color: '#FFB300' },
    { emoji: '🛒', text: 'Buy Inputs', query: 'Where can I buy fungicides for rubber?', color: '#1E88E5' },
    { emoji: '🌱', text: 'Clones', query: 'Tell me about RRISL recommended rubber clones', color: '#43A047' },
    { emoji: '🌐', text: 'Language', color: '#9C27B0', action: onToggleLanguages },
  ];

  const languages = [
    { code: 'en', emoji: '🇬🇧', text: 'English', color: '#1976D2' },
    { code: 'si', emoji: '🇱🇰', text: 'Sinhala', color: '#D32F2F' },
    { code: 'ta', emoji: '🇮🇳', text: 'Tamil', color: '#F57C00' },
  ];

  const allButtons = showLanguages
    ? [
      { emoji: '🇬🇧', text: 'English', color: '#1976D2', action: () => onLanguageChange('en') },
      { emoji: '🇱🇰', text: 'Sinhala', color: '#D32F2F', action: () => onLanguageChange('si') },
      { emoji: '🇮🇳', text: 'Tamil', color: '#F57C00', action: () => onLanguageChange('ta') },
    ]
    : [
      { emoji: '🦠', text: 'Diseases', color: '#E53935', action: () => onSetInputText('What diseases commonly affect rubber plants in Sri Lanka?') },
      { emoji: '💰', text: 'Prices', color: '#FFB300', action: () => onSetInputText('What is the current rubber price?') },
      { emoji: '🛒', text: 'Buy Inputs', color: '#1E88E5', action: () => onSetInputText('Where can I buy fungicides for rubber?') },
      { emoji: '🌱', text: 'Clones', color: '#43A047', action: () => onSetInputText('Tell me about RRISL recommended rubber clones') },
      { emoji: '🌐', text: 'Language', color: '#9C27B0', action: onToggleLanguages },
    ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.quickActionsContainer}
      contentContainerStyle={styles.quickButtonsRow}
    >
      {allButtons.map((btn, index) => (
        <AnimatedQuickButton
          key={index}
          emoji={btn.emoji}
          text={btn.text}
          color={btn.color}
          onPress={btn.action}
          delay={index * 60}
        />
      ))}
    </ScrollView>
  );
});

// ─── AnimatedSendButton – moved outside RubbyScreen ───────────────────────────

interface SendButtonProps {
  inputText: string;
  isSending: boolean;
  onPress: () => void;
}

const AnimatedSendButton = React.memo(({ inputText, isSending, onPress }: SendButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.sendButton,
        (!inputText.trim() || isSending) && styles.sendButtonDisabled,
      ]}
      onPress={onPress}
      disabled={!inputText.trim() || isSending}
      activeOpacity={0.8}
    >
      {isSending ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Ionicons
          name={inputText.trim() ? "send" : "send-outline"}
          size={22}
          color="#fff"
        />
      )}
    </TouchableOpacity>
  );
});

// ─── Main Screen ───────────────────────────────────────────────────────────────

const RubbyScreen: React.FC<Props> = ({ navigation }) => {
  const { language, setLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const insets = useSafeAreaInsets();

  // Header animation
  const headerPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    initializeChat();
    startHeaderAnimation();
  }, [language]);

  const startHeaderAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(headerPulse, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(headerPulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const initializeChat = () => {
    let welcomeMessage: ChatMessage;

    if (language === 'si') {
      welcomeMessage = {
        id: 'welcome',
        text:
          "🌿 ආයුබෝවන්! මම Rubby ඔබගේ රබර් ගස් වගා සහාය AI සහකාරි.\n\n" +
          "මම විශේෂඥ:\n" +
          "🌱 රබර් වගා تقنيات\n" +
          "🦠 රෝග හඳුනාගැනීම සහ චිකිත්සා\n" +
          "🛒 ප්‍රවේශක සරසරු සහ කෘෂිරසායනවල\n" +
          "💰 වෙළඳ මිල සහ ප්‍රවණතා\n" +
          "🏛️ RRISL මාර්ගෝපදේශ සහ සම්පත්\n\n" +
          "ඔබ අද හොඳ රබර් වගා කිරීමට කෙසේ සහාය දිය හැකිද?",
        isBot: true,
        time: new Date().toISOString(),
      };
    } else if (language === 'ta') {
      welcomeMessage = {
        id: 'welcome',
        text:
          "🌿 வணக்கம்! நான் Rubby, உங்கள் கம்மாரி விவசாய AI உதவியாளர்.\n\n" +
          "நான் நிபுணம்:\n" +
          "🌱 கம்மாரி சாகுபடி நுட்பங்கள்\n" +
          "🦠 நோய் நர்ணயம் மற்றும் சிகிச்சை\n" +
          "🛒 உள்ளீடு வசதிகள் மற்றும் வேளாண்மை ராசயனிக\n" +
          "💰 சந்தை விலைகள் மற்றும் போக்குகள்\n" +
          "🏛️ RRISL வழிகாட்டுதல்கள் மற்றும் வளங்கள்\n\n" +
          "நீங்கள் இன்று சிறந்த கம்மாரி சாகுபடி செய்ய எப்படி உதவ முடிகிறது?",
        isBot: true,
        time: new Date().toISOString(),
      };
    } else {
      welcomeMessage = {
        id: 'welcome',
        text:
          "🌿 Ayubowan! I'm Rubby, your AI rubber farming assistant.\n\n" +
          "I specialize in:\n" +
          "🌱 Rubber cultivation techniques\n" +
          "🦠 Disease diagnosis & treatment\n" +
          "🛒 Input suppliers & agrochemicals\n" +
          "💰 Market prices & trends\n" +
          "🏛️ RRISL guidelines & resources\n\n" +
          "How can I help you grow better rubber today?",
        isBot: true,
        time: new Date().toISOString(),
      };
    }
    setMessages([welcomeMessage]);
  };

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text: inputText.trim(),
      isBot: false,
      time: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsSending(true);
    setIsTyping(true);
    scrollToEnd();

    try {
      const result = await sendChatMessage(userMessage.text, language);

      setIsTyping(false);

      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        text: result.response,
        isBot: true,
        time: result.timestamp,
        toolsUsed: result.tools_used,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setIsTyping(false);

      const errorText = error instanceof ApiError
        ? error.message
        : 'Network error. Please check your connection and try again.';

      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        text: `❌ ${errorText}`,
        isBot: true,
        time: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
      scrollToEnd();
    }
  }, [inputText, isSending, language, scrollToEnd]);

  const handleHealthCheck = useCallback(async () => {
    const result = await checkChatbotHealth();
    Alert.alert(
      'Rubby Status',
      result.status === 'healthy'
        ? `✅ Online and ready to help!\n\nStatus: ${result.status}\nRubber Bot: ${result.rubberbot}`
        : '❌ Backend not reachable. Please check your connection.',
    );
  }, []);

  const handleClearSession = useCallback(async () => {
    Alert.alert(
      'Start Fresh?',
      'This will clear our conversation and start new. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Chat',
          style: 'destructive',
          onPress: async () => {
            await clearChatSession();
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            initializeChat();
          },
        },
      ]
    );
  }, []);

  const handleToggleLanguages = useCallback(() => {
    setShowLanguages(prev => !prev);
  }, []);

  const handleLanguageChange = useCallback(async (code: string) => {
    try {
      await setLanguage(code as 'en' | 'si' | 'ta');
      await clearChatSession();
      setShowLanguages(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to change language');
    }
  }, [setLanguage]);

  const renderMessage: ListRenderItem<ChatMessage> = useCallback(({ item }) => {
    return <AnimatedMessageBubble item={item} />;
  }, []);

  const listFooter = isTyping ? <TypingIndicator /> : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Premium Header with gradient effect */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          {navigation && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          )}

          <Animated.View
            style={[
              styles.headerCenter,
              { transform: [{ scale: headerPulse }] }
            ]}
          >
            <View style={styles.headerLogoContainer}>
              <View style={styles.headerLogo}>
                <Ionicons name="leaf" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Rubby AI 🇱🇰</Text>
                <Text style={styles.headerSubtitle}>Your Rubber Farming Expert</Text>
              </View>
            </View>
          </Animated.View>

          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleHealthCheck} style={styles.headerButton}>
              <Ionicons name="pulse" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClearSession} style={styles.headerButton}>
              <Ionicons name="refresh" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToEnd}
          ListFooterComponent={listFooter}
          showsVerticalScrollIndicator={false}
        />

        <QuickActions
          showLanguages={showLanguages}
          onToggleLanguages={handleToggleLanguages}
          onSetInputText={setInputText}
          onLanguageChange={handleLanguageChange}
        />

        <View style={styles.disclaimerContainer}>
          <Ionicons name="shield-checkmark" size={16} color="#FF6F00" />
          <Text style={styles.disclaimer}>
            Rubby AI provides guidance. Always consult RRISL for professional advice.
          </Text>
        </View>

        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 14) }]}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Rubby about rubber farming..."
            placeholderTextColor="#999"
            multiline
            maxLength={2000}
            editable={!isSending}
          />

          <AnimatedSendButton
            inputText={inputText}
            isSending={isSending}
            onPress={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B5E20',
  },
  flex: {
    flex: 1,
    backgroundColor: '#F0F4F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    paddingHorizontal: 12,
    paddingBottom: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#A5D6A7',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
    width: '100%',
  },
  messageRow: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  botMessageRow: { alignSelf: 'flex-start' },
  userMessageRow: { alignSelf: 'flex-end' },
  messageBubble: {
    maxWidth: width > 400 ? '75%' : '85%',
    padding: 14,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  userBubble: {
    backgroundColor: '#2E7D32',
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 15.5,
    lineHeight: 23,
    fontWeight: '400',
  },
  botText: { color: '#1A1A1A' },
  userText: { color: '#fff' },
  timeText: {
    fontSize: 10,
    marginTop: 8,
    fontWeight: '600',
  },
  botTime: { color: '#9E9E9E' },
  userTime: { color: '#C8E6C9' },
  botAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 4,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FF6F00',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 4,
    shadowColor: '#FF6F00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  toolsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 6,
  },
  toolsText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
    flex: 1,
  },
  typingRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  typingBubble: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  typingLabel: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E7D32',
    marginHorizontal: 4,
  },
  quickActionsContainer: {
    backgroundColor: '#F0F4F1',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    maxHeight: 44,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 4,
  },
  quickButtonEmojiText: {
    fontSize: 13,
  },
  quickButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF3E0',
    borderTopWidth: 1,
    borderTopColor: '#FFE0B2',
    gap: 8,
  },
  disclaimer: {
    fontSize: 11,
    color: '#E65100',
    flex: 1,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-end',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    marginRight: 12,
    fontSize: 15,
    color: '#212121',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  sendButtonDisabled: {
    backgroundColor: '#BDBDBD',
    elevation: 2,
  },
});

export default RubbyScreen;