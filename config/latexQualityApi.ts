import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT } from './api';

console.log('Latex Quality API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Authorization header added');
      } else {
        console.warn('⚠️ No token found in AsyncStorage!');
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.error('❌ Unauthorized - Token may be expired or invalid');
    }
    return Promise.reject(error);
  }
);

// Latex Quality API
export const latexQualityApi = {
  /**
   * Submit new latex quality reading
   */
  submitReading: async (data: {
    ph_value: number;
    turbidity_ntu: number;
    drc_percent: number;
    temperature_celsius?: number;
    humidity_percent?: number;
    notes?: string;
  }) => {
    const response = await api.post('/latex-quality/readings/create/', data);
    return response.data;
  },

  /**
   * Get farmer's readings
   */
  getReadings: async (days: number = 7, limit: number = 50) => {
    const response = await api.get(`/latex-quality/readings/?days=${days}&limit=${limit}`);
    return response.data;
  },

  /**
   * Get dashboard statistics
   */
  getDashboard: async (days: number = 7) => {
    const response = await api.get(`/latex-quality/dashboard/?days=${days}`);
    return response.data;
  },

  /**
   * Get quality alerts
   */
  getAlerts: async (unreadOnly: boolean = false) => {
    const response = await api.get(`/latex-quality/alerts/?unread_only=${unreadOnly}`);
    return response.data;
  },

  /**
   * Mark alert as read
   */
  markAlertRead: async (alertId: string) => {
    const response = await api.post(`/latex-quality/alerts/${alertId}/read/`);
    return response.data;
  },

  /**
   * Mark all alerts as read
   */
  markAllAlertsRead: async () => {
    const response = await api.post('/latex-quality/alerts/read-all/');
    return response.data;
  },

  /**
   * Get live sensor data (optional - for Django-stored data)
   */
  getLive: async (deviceId: string = 'SENSOR_001') => {
    const response = await api.get(`/latex-quality/live/?device_id=${deviceId}`);
    return response.data;
  },
};
