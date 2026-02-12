// app/config/api.ts
// Re-export from centralized network config for backward compatibility
import { API_BASE_URL as NETWORK_API_URL, getHttpBaseUrl } from './networkConfig';

export const API_BASE_URL = NETWORK_API_URL;
export const API_TIMEOUT = 15000;
