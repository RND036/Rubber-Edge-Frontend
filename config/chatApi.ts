import axios from "axios";
import * as Device from 'expo-device';
import { SERVER_BASE_URL, API_BASE_URL as NETWORK_API_URL, WS_BASE_URL } from './networkConfig';

const API_BASE = NETWORK_API_URL;
const WS_BASE = WS_BASE_URL;

export const chatApi = axios.create({
  baseURL: API_BASE,
});

export function setChatAuthToken(token: string | null) {
  if (token) {
    chatApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete chatApi.defaults.headers.common["Authorization"];
  }
}

export function getChatConversations() {
  return chatApi.get("/chat/conversations/");
}

export function createOrGetConversation(otherUserId: number) {
  return chatApi.post("/chat/conversations/", { other_user_id: otherUserId });
}

export function getConversationMessages(conversationId: number) {
  return chatApi.get(`/chat/conversations/${conversationId}/messages/`);
}

// ✅ FIXED: TRULY UNIQUE CLIENT IDs
export function buildChatWebSocketUrl(
  conversationId: number, 
  token: string, 
  clientId: string
) {
  const params = new URLSearchParams({ token, client: clientId });
  return `${WS_BASE}/chat/${conversationId}/?${params.toString()}`;
}

export function getClientId(userId: number, role: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 6);
  
  if (Device.deviceName && Device.osName) {
    const deviceName = Device.deviceName.replace(/\s+/g, '').slice(0, 6);
    return `${role}-${userId}-${Device.osName.toLowerCase()}-${deviceName}-${timestamp % 10000}-${random}`;
  }
  // Emulator fallback - EXTRA unique
  return `${role}-${userId}-emu${timestamp}-${random}`;
}
