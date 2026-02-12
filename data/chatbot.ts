// types/chatbot.ts
export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  time: string;
  toolsUsed?: string[];
}

export interface ChatResponse {
  response: string;
  session_id: string;
  timestamp: string;
  tools_used?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface HealthCheckResponse {
  status: string;
  rubberbot: string;
}
