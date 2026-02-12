// config/networkConfig.ts
// Centralized network configuration for all API and WebSocket connections
// Automatically detects emulator vs physical device and uses the correct URLs

import { Platform } from 'react-native';
import * as Device from 'expo-device';

// ============================================
// SERVER CONFIGURATION
// ============================================

// Your local development machine's IP address (update if your IP changes)
const LOCAL_IP = '192.168.8.189';

// Your deployed backend server IP/domain
const PRODUCTION_SERVER = '13.239.135.231';

// Port for local Django development server
const LOCAL_PORT = '8000';

// ============================================
// ENVIRONMENT DETECTION
// ============================================

/**
 * Check if running on a physical device (not emulator/simulator).
 * On physical devices, `Device.isDevice` is true.
 */
export const isPhysicalDevice: boolean = Device.isDevice;

/**
 * Check if running inside an emulator or simulator.
 */
export const isEmulatorOrSimulator: boolean = !Device.isDevice;

// ============================================
// BASE URL CONSTRUCTION
// ============================================

/**
 * Get the correct HTTP base URL depending on environment:
 * - Android Emulator: uses 10.0.2.2 (special alias for host machine's localhost)
 * - iOS Simulator: uses localhost
 * - Physical Device (dev): uses local machine IP on the same WiFi network
 * - Production: uses deployed server IP/domain
 */
export function getHttpBaseUrl(): string {
  // ---- TOGGLE THIS for production vs local development ----
  const USE_PRODUCTION = false;
  // ---------------------------------------------------------

  if (USE_PRODUCTION) {
    return `http://${PRODUCTION_SERVER}`;
  }

  // Local development
  if (isPhysicalDevice) {
    // Physical device must use the machine's LAN IP
    return `http://${LOCAL_IP}:${LOCAL_PORT}`;
  }

  // Emulator / Simulator
  if (Platform.OS === 'android') {
    // Android emulator maps 10.0.2.2 → host machine's localhost
    return `http://10.0.2.2:${LOCAL_PORT}`;
  }

  // iOS Simulator can access localhost directly
  return `http://localhost:${LOCAL_PORT}`;
}

/**
 * Get the correct WebSocket base URL depending on environment.
 */
function getWsBaseUrl(): string {
  const USE_PRODUCTION = false;

  if (USE_PRODUCTION) {
    return `ws://${PRODUCTION_SERVER}`;
  }

  if (isPhysicalDevice) {
    return `ws://${LOCAL_IP}:${LOCAL_PORT}`;
  }

  if (Platform.OS === 'android') {
    return `ws://10.0.2.2:${LOCAL_PORT}`;
  }

  return `ws://localhost:${LOCAL_PORT}`;
}

// ============================================
// EXPORTED URLs
// ============================================

/** Full base URL for API calls, e.g. http://192.168.8.189:8000/api */
export const API_BASE_URL: string = `${getHttpBaseUrl()}/api`;

/** Server root without /api path, e.g. http://192.168.8.189:8000 */
export const SERVER_BASE_URL: string = getHttpBaseUrl();

/** WebSocket base URL, e.g. ws://192.168.8.189:8000/ws */
export const WS_BASE_URL: string = `${getWsBaseUrl()}/ws`;

// Log the resolved URLs at startup for debugging
console.log('🌐 Network Config:', {
  isPhysicalDevice,
  platform: Platform.OS,
  API_BASE_URL,
  SERVER_BASE_URL,
  WS_BASE_URL,
});
