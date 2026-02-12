import axios, { AxiosError, AxiosInstance } from "axios";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_BASE_URL, API_BASE_URL as NETWORK_API_URL } from './networkConfig';

export const API_BASE_URL = SERVER_BASE_URL;
const API_ENDPOINT = NETWORK_API_URL;

// Event List Response (matches EventListSerializer)
export interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  image: string | null;
  created_by_name: string;
  is_active: boolean;
  is_cancelled: boolean;
  created_at: string;
  contact_number: string | null;
  max_participants: number | null;
  is_past: boolean;
  attendance_count: number;
  user_attendance_status: string | null; // 'interested' | 'attending' | 'attended' | 'not_attending' | null
}

// Event Detail Response (matches EventDetailSerializer)
export interface EventDetail {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  image: string | null;
  created_by: {
    id: number;
    full_name: string;
    email: string;
  };
  is_active: boolean;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
  contact_number: string | null;
  max_participants: number | null;
  is_past: boolean;
  attendance_count: number;
  attendees: EventAttendance[];
  user_attendance_status: string | null;
}

// Create Event Request (matches EventCreateUpdateSerializer)
export interface CreateEventData {
  title: string;
  description: string;
  event_date: string; // ISO 8601 format
  location?: string;
  image?: any;
  is_active?: boolean;
  is_cancelled?: boolean;
  contact_number?: string;
  max_participants?: number;
}

// Attendance Response (matches EventAttendanceSerializer)
export interface EventAttendance {
  id: number;
  event: number;
  farmer: number;
  status: 'interested' | 'attending' | 'attended' | 'not_attending';
  registered_at: string;
  farmer_name: string;
  farmer_email: string;
  event_title: string;
}

// Statistics Response
export interface EventStatistics {
  // Officer stats
  total_events?: number;
  upcoming_events?: number;
  total_attendees?: number;
  // Farmer stats
  registered_events?: number;
  upcoming_registered?: number;
}

// Token refresh function
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('❌ No refresh token found');
      return null;
    }

    console.log('🔄 Refreshing access token...');
    const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    await AsyncStorage.setItem('accessToken', newAccessToken);
    console.log('✅ Access token refreshed successfully');
    return newAccessToken;
  } catch (error) {
    console.error('❌ Token refresh failed:', error);
    return null;
  }
};

// Create axios client with automatic token refresh
const createClient = (accessToken: string): AxiosInstance => {
  const client = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  // Response interceptor for automatic token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Check if error is 401 and we haven't already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newToken = await refreshAccessToken();
        if (newToken) {
          // Update the authorization header and retry
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return client(originalRequest);
        } else {
          // Refresh failed - user needs to login again
          console.log('⚠️ Token refresh failed, user needs to re-login');
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// ========== EVENT ENDPOINTS ==========

// GET /api/events/ - List all events
export const getEvents = async (accessToken: string): Promise<Event[]> => {
  try {
    const client = createClient(accessToken);
    console.log("📡 Fetching all events...");
    const res = await client.get<Event[]>("/events/");
    console.log(`✅ Fetched ${res.data.length} events`);
    return res.data;
  } catch (error: any) {
    console.error("❌ getEvents error:", error.response?.data || error.message);
    throw error;
  }
};

// GET /api/events/upcoming/ - Get upcoming events
export const getUpcomingEvents = async (accessToken: string): Promise<Event[]> => {
  try {
    const client = createClient(accessToken);
    console.log("📡 Fetching upcoming events...");
    const res = await client.get<Event[]>("/events/upcoming/");
    console.log(`✅ Fetched ${res.data.length} upcoming events`);
    return res.data;
  } catch (error: any) {
    console.error("❌ getUpcomingEvents error:", error.response?.data || error.message);
    throw error;
  }
};

// GET /api/events/past/ - Get past events
export const getPastEvents = async (accessToken: string): Promise<Event[]> => {
  try {
    const client = createClient(accessToken);
    console.log("📡 Fetching past events...");
    const res = await client.get<Event[]>("/events/past/");
    console.log(`✅ Fetched ${res.data.length} past events`);
    return res.data;
  } catch (error: any) {
    console.error("❌ getPastEvents error:", error.response?.data || error.message);
    throw error;
  }
};

// GET /api/events/my_events/ - Get officer's events (officer only)
export const getMyEvents = async (accessToken: string): Promise<Event[]> => {
  try {
    const client = createClient(accessToken);
    console.log("📡 Fetching my events...");
    const res = await client.get<Event[]>("/events/my_events/");
    console.log(`✅ Fetched ${res.data.length} my events`);
    return res.data;
  } catch (error: any) {
    console.error("❌ getMyEvents error:", error.response?.data || error.message);
    throw error;
  }
};

// GET /api/events/{id}/ - Get event details
export const getEvent = async (
  eventId: number,
  accessToken: string
): Promise<EventDetail> => {
  try {
    const client = createClient(accessToken);
    console.log(`📡 Fetching event ${eventId}...`);
    console.log(`🔗 URL: ${API_ENDPOINT}/events/${eventId}/`);
    
    const res = await client.get<EventDetail>(`/events/${eventId}/`);
    console.log(`✅ Fetched event: ${res.data.title}`);
    return res.data;
  } catch (error: any) {
    console.error(`❌ getEvent(${eventId}) error:`);
    if (error.code === 'ECONNABORTED') {
      console.error("⏱️ Request timeout");
    } else if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

// POST /api/events/ - Create event (officer only)
export const createEvent = async (
  data: CreateEventData,
  accessToken: string
): Promise<Event> => {
  console.log('🔄 Creating event:', data);
  
  const formData = new FormData();
  
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('event_date', data.event_date);
  
  if (data.location) formData.append('location', data.location);
  if (data.contact_number) formData.append('contact_number', data.contact_number);
  if (data.max_participants) formData.append('max_participants', data.max_participants.toString());
  if (data.is_active !== undefined) formData.append('is_active', data.is_active.toString());
  if (data.is_cancelled !== undefined) formData.append('is_cancelled', data.is_cancelled.toString());
  
  if (data.image) {
    formData.append('image', {
      uri: data.image,
      type: 'image/jpeg',
      name: 'event_image.jpg',
    } as any);
  }

  try {
    const res = await axios.post(`${API_ENDPOINT}/events/`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    
    console.log('✅ Event created:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Create event error:', error.response?.data);
    throw error;
  }
};

// PUT/PATCH /api/events/{id}/ - Update event (officer only)
export const updateEvent = async (
  eventId: number,
  data: Partial<CreateEventData>,
  accessToken: string
): Promise<Event> => {
  try {
    const client = createClient(accessToken);
    console.log(`🔄 Updating event ${eventId}:`, data);
    const res = await client.patch<Event>(`/events/${eventId}/`, data);
    console.log('✅ Event updated:', res.data);
    return res.data;
  } catch (error: any) {
    console.error(`❌ updateEvent(${eventId}) error:`, error.response?.data);
    throw error;
  }
};

// DELETE /api/events/{id}/ - Delete event (officer only)
export const deleteEvent = async (
  eventId: number,
  accessToken: string
): Promise<void> => {
  try {
    const client = createClient(accessToken);
    console.log(`🗑️ Deleting event ${eventId}...`);
    await client.delete(`/events/${eventId}/`);
    console.log('✅ Event deleted');
  } catch (error: any) {
    console.error(`❌ deleteEvent(${eventId}) error:`, error.response?.data);
    throw error;
  }
};

// ========== FARMER REGISTRATION ==========

// POST /api/events/{id}/register/ - Register for event (farmer only)
export const registerForEvent = async (
  eventId: number,
  status: 'interested' | 'attending' = 'interested',
  accessToken: string
): Promise<EventAttendance> => {
  try {
    const client = createClient(accessToken);
    console.log(`📝 Registering for event ${eventId} with status: ${status}`);
    const res = await client.post<EventAttendance>(
      `/events/${eventId}/register/`,
      { status }
    );
    console.log('✅ Registration successful:', res.data);
    return res.data;
  } catch (error: any) {
    console.error(`❌ registerForEvent(${eventId}) error:`, error.response?.data);
    throw error;
  }
};

// DELETE /api/events/{id}/unregister/ - Unregister from event (farmer only)
export const unregisterFromEvent = async (
  eventId: number,
  accessToken: string
): Promise<{ message: string }> => {
  try {
    const client = createClient(accessToken);
    console.log(`🗑️ Unregistering from event ${eventId}...`);
    const res = await client.delete<{ message: string }>(
      `/events/${eventId}/unregister/`
    );
    console.log('✅ Unregistration successful:', res.data.message);
    return res.data;
  } catch (error: any) {
    console.error(`❌ unregisterFromEvent(${eventId}) error:`, error.response?.data);
    throw error;
  }
};

// ========== OFFICER - ATTENDEE MANAGEMENT ==========

// GET /api/events/{id}/attendees/ - Get event attendees (officer only)
export const getEventAttendees = async (
  eventId: number,
  accessToken: string
): Promise<EventAttendance[]> => {
  try {
    const client = createClient(accessToken);
    console.log(`📡 Fetching attendees for event ${eventId}...`);
    const res = await client.get<EventAttendance[]>(
      `/events/${eventId}/attendees/`
    );
    console.log(`✅ Fetched ${res.data.length} attendees`);
    return res.data;
  } catch (error: any) {
    console.error(`❌ getEventAttendees(${eventId}) error:`, error.response?.data);
    throw error;
  }
};

// ========== STATISTICS ==========

// GET /api/events/statistics/ - Get event statistics
export const getEventStatistics = async (
  accessToken: string
): Promise<EventStatistics> => {
  try {
    const client = createClient(accessToken);
    console.log("📡 Fetching event statistics...");
    const res = await client.get<EventStatistics>(`/events/statistics/`);
    console.log('✅ Statistics fetched:', res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ getEventStatistics error:", error.response?.data);
    throw error;
  }
};
