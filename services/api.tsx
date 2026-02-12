// services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import { 
  API_BASE_URL as NETWORK_API_URL, 
  SERVER_BASE_URL,
  isPhysicalDevice,
  isEmulatorOrSimulator 
} from '../config/networkConfig';


// ============================================
// CONFIGURATION
// ============================================
// Use centralized network config
export const API_BASE_URL = NETWORK_API_URL;
export const API_TIMEOUT = 15000;
export const DISEASE_API_TIMEOUT = 30000;
export const CHATBOT_API_TIMEOUT = 30000;


// ============================================
// TYPE DEFINITIONS
// ============================================


// ========== AUTHENTICATION TYPES ==========
export interface User {
  id: number;
  name?: string;
  phone_number: string;
  role: 'farmer' | 'buyer' | 'officer';
  is_verified: boolean;
  created_at: string;
  farmer_profile?: FarmerProfile;
  buyer_profile?: BuyerProfile;
  officer_profile?: OfficerProfile;
}


export interface FarmerProfile {
  name: string;
  nic_number: string;
  farm_location: string;
  district: string;
  land_area_hectares: string;
}


export interface BuyerProfile {
  name: string;
  company_name: string;
  business_reg_number: string;
}


export interface OfficerProfile {
  name: string;
  employee_id: string;
  department: string;
}


export interface AuthTokens {
  access: string;
  refresh: string;
}


export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}


export interface RegisterResponse {
  success: boolean;
  message: string;
}


export interface OTPResponse {
  success: boolean;
  message: string;
}


// ========== FARMER MANAGEMENT TYPES ==========
export interface Farmer {
  id: number;
  phone_number: string;
  name: string;
  nic_number: string;
  farm_location: string;
  district: string;
  land_area_hectares: number;
  created_at: string;
}


export interface FarmersListResponse {
  success: boolean;
  count: number;
  farmers: Farmer[];
}


export interface FarmerDetailsResponse {
  success: boolean;
  farmer: Farmer;
}


export interface DistrictsResponse {
  success: boolean;
  districts: string[];
}


// ========== RUBBER PRICE TYPES ==========
interface PriceData {
  gradeId: string;
  price: number;
  change: number;
  unit: string;
}


interface HistoricalDataset {
  data: number[];
  color: () => string;
  strokeWidth: number;
}


interface HistoricalData {
  labels: string[];
  datasets: HistoricalDataset[];
}


interface MarketStats {
  weekHigh: number;
  weekLow: number;
  monthHigh: number;
  monthLow: number;
  avgVolume: string;
}


interface MarketData {
  lastUpdated: string;
  currency: string;
  exchangeRate: number;
  prices: PriceData[];
  historicalData?: HistoricalData;
  marketStats?: MarketStats;
}


// ========== DISEASE DETECTION TYPES ==========
export const DISEASE_LABELS = [
  'Birds-eye',
  'Colletorichum-leaf-disease',
  'Corynespora',
  'Healthy',
  'Pesta',
  'Powdery-mildew',
] as const;


export type DiseaseLabel = (typeof DISEASE_LABELS)[number];


export interface DiseasePrediction {
  label: DiseaseLabel;
  confidence: number;
}


export interface DiseaseDetectionResult {
  success: boolean;
  label: DiseaseLabel;
  confidence: number;
  allPredictions: DiseasePrediction[];
  processingTimeMs?: number;
  isValidLeaf: boolean; // Whether the image appears to be a rubber leaf
  validationMessage?: string; // Message explaining why the image was rejected
}


export interface DiseaseHealthCheck {
  status: 'healthy' | 'unhealthy';
  model_loaded: boolean;
  disease_labels: string[];
  input_shape?: number[];
  output_shape?: number[];
  error?: string;
}


// ========== CHATBOT TYPES ==========
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


export interface ChatHealthCheck {
  status: string;
  rubberbot: string;
}


export interface ChatRequest {
  message: string;
  session_id?: string;
}


// ========== DJANGO API RESPONSE TYPES ==========
interface DjangoPrice {
  grade: string;
  grade_display: string;
  price: number;
  previous_price: number | null;
  change_percentage: number;
  auction_date: string;
  unit: string;
}


interface DjangoMarketStats {
  week_high: number;
  week_low: number;
  month_high: number;
  month_low: number;
  avg_volume: string;
}


interface DjangoHistoricalPoint {
  month: string;
  price: number;
}


interface DjangoRubberPricesResponse {
  success: boolean;
  last_updated: string;
  currency: string;
  exchange_rate: number;
  prices: DjangoPrice[];
  market_stats?: DjangoMarketStats;
  historical_data?: DjangoHistoricalPoint[];
}


// ============================================
// API ERROR HANDLING
// ============================================
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}


// ============================================
// FETCH WITH TIMEOUT
// ============================================
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT,
  includeAuth: boolean = false
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);


  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };


    if (includeAuth) {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }


    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timeout - please check your connection', 408);
    }
    throw error;
  }
};


// ============================================
// GRADE ID MAPPING
// ============================================
const mapGradeToId = (grade: string): string => {
  const gradeMap: Record<string, string> = {
    'RSS1': 'rss1',
    'RSS2': 'rss2',
    'RSS3': 'rss3',
    'RSS4': 'rss4',
    'RSS5': 'rss5',
    'LATEX': 'latex',
    'LATEX_60': 'latex',
    'TSR20': 'tsr20',
    'TSR_20': 'tsr20',
    'CREPE': 'crepe',
    'PALE_CREPE': 'crepe',
  };
  
  return gradeMap[grade.toUpperCase()] || grade.toLowerCase().replace(/\s+/g, '');
};


// ============================================
// PRIMARY COLOR FOR CHARTS
// ============================================
const PRIMARY_COLOR = '#0D4F3C';


// ============================================
// SESSION MANAGEMENT
// ============================================
const SESSION_KEY = '@rubber_bot_session_id';
let cachedSessionId: string | null = null;


const getSessionId = async (): Promise<string> => {
  if (cachedSessionId) {
    return cachedSessionId;
  }


  try {
    const saved = await AsyncStorage.getItem(SESSION_KEY);
    if (saved) {
      cachedSessionId = saved;
      return saved;
    }


    const newId = uuid.v4() as string;
    await AsyncStorage.setItem(SESSION_KEY, newId);
    cachedSessionId = newId;
    return newId;
  } catch (error) {
    console.error('Error managing session:', error);
    const fallbackId = uuid.v4() as string;
    cachedSessionId = fallbackId;
    return fallbackId;
  }
};


// ============================================
// AUTHENTICATION API FUNCTIONS
// ============================================


/**
 * Send OTP to phone number
 */
export const sendOTP = async (phoneNumber: string): Promise<OTPResponse> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/send-otp/`,
      {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Failed to send OTP', response.status);
    }

    return data;
  } catch (error) {
    console.error('Send OTP error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to send OTP', 500);
  }
};


/**
 * Verify OTP
 */
export const verifyOTP = async (phoneNumber: string, otp: string): Promise<OTPResponse> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/verify-otp/`,
      {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'OTP verification failed', response.status);
    }

    return data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('OTP verification failed', 500);
  }
};


/**
 * Register new user
 */
export const register = async (
  phoneNumber: string,
  otp: string,
  role: 'farmer' | 'buyer' | 'officer',
  profileData: any
): Promise<RegisterResponse> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/register/`,
      {
        method: 'POST',
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp,
          role,
          profile_data: profileData,
        }),
      }
    );

    const data = await response.json();
    console.log('Registration response status:', response.status);
    console.log('Registration response data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      let errorMessage = 'Registration failed';
      if (data.error) {
        if (typeof data.error === 'string') {
          errorMessage = data.error;
        } else if (typeof data.error === 'object') {
          const firstKey = Object.keys(data.error)[0];
          if (firstKey) {
            const errorValue = data.error[firstKey];
            errorMessage = Array.isArray(errorValue) ? errorValue[0] : String(errorValue);
          }
        }
      } else if (data.message) {
        errorMessage = data.message;
      } else if (data.detail) {
        errorMessage = data.detail;
      }
      throw new ApiError(errorMessage, response.status);
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Registration failed', 500);
  }
};


/**
 * Login user
 */
export const login = async (phoneNumber: string, otp: string): Promise<LoginResponse> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/login/`,
      {
        method: 'POST',
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Login failed', response.status);
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Login failed', 500);
  }
};


/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken) {
      await fetchWithTimeout(
        `${API_BASE_URL}/auth/logout/`,
        {
          method: 'POST',
          body: JSON.stringify({ refresh: refreshToken }),
        },
        API_TIMEOUT,
        true
      );
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
  }
};


/**
 * Get user profile
 */
export const getProfile = async (): Promise<User> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/profile/`,
      { method: 'GET' },
      API_TIMEOUT,
      true
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Failed to get profile', response.status);
    }

    return data.data.user;
  } catch (error) {
    console.error('Get profile error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to get profile', 500);
  }
};


/**
 * Update user profile
 */
// Update user profile
export const updateProfile = async (profileData: any): Promise<User> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/profile/update/`,
      {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      },
      API_TIMEOUT,
      true
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Failed to update profile', response.status);
    }

    return data.data.user;
  } catch (error) {
    console.error('Update profile error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to update profile', 500);
  }
};


/**
 * Refresh access token
 */
export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new ApiError('No refresh token found', 401);
    }

    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/token/refresh/`,
      {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError('Token refresh failed', response.status);
    }

    await AsyncStorage.setItem('accessToken', data.access);
    return data.access;
  } catch (error) {
    console.error('Token refresh error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Token refresh failed', 500);
  }
};


// ============================================
// FARMER MANAGEMENT API FUNCTIONS
// ============================================


/**
 * Get list of farmers (Officer only)
 * @param search - Optional search query for phone, NIC, or location
 * @param district - Optional district filter
 */
export const getFarmers = async (
  search?: string,
  district?: string
): Promise<FarmersListResponse> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (district) params.append('district', district);
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/auth/farmers/${queryString ? `?${queryString}` : ''}`;

    const response = await fetchWithTimeout(
      url,
      { method: 'GET' },
      API_TIMEOUT,
      true
    );

    // Check content type before parsing JSON
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      // Try to parse error response, but handle non-JSON responses
      let errorMessage = 'Failed to fetch farmers';
      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // JSON parse failed, use default message
        }
      } else {
        // Non-JSON response (HTML error page, plain text, etc.)
        const textResponse = await response.text();
        console.error('Non-JSON error response:', textResponse.substring(0, 200));
      }
      throw new ApiError(errorMessage, response.status);
    }

    // Verify we're getting JSON before parsing
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Unexpected non-JSON response:', textResponse.substring(0, 200));
      throw new ApiError('Server returned invalid response format', 500);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get farmers error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to fetch farmers', 500);
  }
};


/**
 * Get single farmer details (Officer only)
 * @param farmerId - The farmer's user ID
 */
export const getFarmerById = async (farmerId: number): Promise<FarmerDetailsResponse> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/farmers/${farmerId}/`,
      { method: 'GET' },
      API_TIMEOUT,
      true
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'Failed to fetch farmer details',
        response.status
      );
    }

    return data;
  } catch (error) {
    console.error('Get farmer details error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to fetch farmer details', 500);
  }
};


/**
 * Get unique districts where farmers are located
 */
export const getFarmerDistricts = async (): Promise<string[]> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/farmers/districts/`,
      { method: 'GET' },
      API_TIMEOUT,
      true
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'Failed to fetch districts',
        response.status
      );
    }

    return data.districts || [];
  } catch (error) {
    console.error('Get districts error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to fetch districts', 500);
  }
};

// ✅ ADD THIS NEW FUNCTION
/**
 * Get list of officers
 */
export const getOfficers = async (): Promise<{ success: boolean; officers: User[] }> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/auth/officers/`,
      { method: 'GET' },
      API_TIMEOUT,
      true
    );

    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch officers';
      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // JSON parse failed, use default message
        }
      } else {
        const textResponse = await response.text();
        console.error('Non-JSON error response:', textResponse.substring(0, 200));
      }
      throw new ApiError(errorMessage, response.status);
    }

    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Unexpected non-JSON response:', textResponse.substring(0, 200));
      throw new ApiError('Server returned invalid response format', 500);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get officers error:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Failed to fetch officers', 500);
  }
};




// ============================================
// RUBBER PRICE API FUNCTIONS
// ============================================


export const fetchRubberPrices = async (): Promise<MarketData> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/rubber-prices/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new ApiError(`Failed to fetch prices: ${response.statusText}`, response.status);
    }

    const data: DjangoRubberPricesResponse = await response.json();

    if (!data.success) {
      throw new ApiError('Server returned unsuccessful response', 500);
    }

    const transformedPrices: PriceData[] = data.prices.map((price) => ({
      gradeId: mapGradeToId(price.grade),
      price: price.price,
      change: price.change_percentage,
      unit: price.unit || 'kg',
    }));

    let historicalData: HistoricalData | undefined;
    if (data.historical_data && data.historical_data.length > 0) {
      historicalData = {
        labels: data.historical_data.map((point) => point.month),
        datasets: [
          {
            data: data.historical_data.map((point) => point.price),
            color: () => PRIMARY_COLOR,
            strokeWidth: 3,
          },
        ],
      };
    }

    let marketStats: MarketStats | undefined;
    if (data.market_stats) {
      marketStats = {
        weekHigh: data.market_stats.week_high,
        weekLow: data.market_stats.week_low,
        monthHigh: data.market_stats.month_high,
        monthLow: data.market_stats.month_low,
        avgVolume: data.market_stats.avg_volume,
      };
    }

    return {
      lastUpdated: data.last_updated,
      currency: data.currency || 'LKR',
      exchangeRate: data.exchange_rate || 1,
      prices: transformedPrices,
      historicalData,
      marketStats,
    };
  } catch (error) {
    console.error('Error fetching rubber prices:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('Network')) {
      throw new ApiError('Network error - please check your internet connection', 0);
    }
    
    throw new ApiError('An unexpected error occurred while fetching prices', 500);
  }
};


export const fetchMarketStats = async (): Promise<MarketStats> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/market-stats/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new ApiError(`Failed to fetch market stats: ${response.statusText}`, response.status);
    }

    const data = await response.json();

    return {
      weekHigh: data.week_high,
      weekLow: data.week_low,
      monthHigh: data.month_high,
      monthLow: data.month_low,
      avgVolume: data.avg_volume,
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    throw error;
  }
};


export const fetchHistoricalPrices = async (
  gradeId: string = 'rss3',
  months: number = 6
): Promise<HistoricalData> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/historical-prices/?grade=${gradeId}&months=${months}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new ApiError(`Failed to fetch historical data: ${response.statusText}`, response.status);
    }

    const data = await response.json();

    return {
      labels: data.map((point: DjangoHistoricalPoint) => point.month),
      datasets: [
        {
          data: data.map((point: DjangoHistoricalPoint) => point.price),
          color: () => PRIMARY_COLOR,
          strokeWidth: 3,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
};


export const triggerScrape = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/trigger-scrape/`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new ApiError(`Failed to trigger scrape: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    console.error('Error triggering scrape:', error);
    throw error;
  }
};


export const fetchScrapingLogs = async (limit: number = 10): Promise<any[]> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/scraping-logs/?limit=${limit}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new ApiError(`Failed to fetch logs: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching scraping logs:', error);
    throw error;
  }
};


// ============================================
// DISEASE DETECTION API FUNCTIONS
// ============================================


export const checkDiseaseApiHealth = async (): Promise<DiseaseHealthCheck> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/disease/health/`,
      { method: 'GET' },
      API_TIMEOUT
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Disease API health check failed:', error);
    return {
      status: 'unhealthy',
      model_loaded: false,
      disease_labels: DISEASE_LABELS as unknown as string[],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};


export const fetchDiseaseLabels = async (): Promise<string[]> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/disease/labels/`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new ApiError(`Failed to fetch disease labels: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data.labels;
  } catch (error) {
    console.error('Error fetching disease labels:', error);
    return DISEASE_LABELS as unknown as string[];
  }
};


// ========== LEAF VALIDATION HELPERS ==========
// Minimum confidence threshold to consider the detection valid
// If the highest prediction is below this, we assume it's not a rubber leaf
const MIN_CONFIDENCE_THRESHOLD = 40; // percentage

// If predictions are too uniformly distributed, it's likely not a rubber leaf
const MAX_ENTROPY_THRESHOLD = 0.85; // normalized entropy (0-1)

/**
 * Calculates normalized Shannon entropy (0-1).
 * High entropy = uncertain/uniform predictions (likely not a rubber leaf)
 * Low entropy = confident prediction
 */
const calculateNormalizedEntropy = (probabilities: number[]): number => {
  const n = probabilities.length;
  if (n <= 1) return 0;

  // Normalize probabilities to sum to 1
  const sum = probabilities.reduce((a, b) => a + b, 0);
  if (sum === 0) return 1; // Maximum entropy if all zeros

  const normalized = probabilities.map((p) => p / sum);

  // Calculate Shannon entropy
  let entropy = 0;
  for (const p of normalized) {
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  }

  // Normalize by maximum possible entropy (log2(n))
  const maxEntropy = Math.log2(n);
  return entropy / maxEntropy;
};

/**
 * Validates predictions to determine if the image is actually a rubber leaf.
 * Uses confidence threshold and entropy analysis.
 */
const validateLeafPredictions = (
  topConfidence: number,
  allPredictions: DiseasePrediction[]
): { isValid: boolean; message?: string } => {
  // Check 1: Is the top prediction confident enough?
  if (topConfidence < MIN_CONFIDENCE_THRESHOLD) {
    return {
      isValid: false,
      message: `Unable to identify a rubber leaf. Please capture a clear image of a rubber leaf.`,
    };
  }

  // Check 2: Calculate normalized entropy to detect uniform/uncertain predictions
  const confidences = allPredictions.map((p) => p.confidence / 100);
  const entropy = calculateNormalizedEntropy(confidences);

  if (entropy > MAX_ENTROPY_THRESHOLD) {
    return {
      isValid: false,
      message:
        'The image does not appear to be a rubber leaf. Please try again with a proper rubber leaf image.',
    };
  }

  return { isValid: true };
};


export const detectDisease = async (imageUri: string): Promise<DiseaseDetectionResult> => {
  try {
    const processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 224, height: 224 } }],
      { format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    if (!processedImage.base64) {
      throw new Error('Failed to process image');
    }

    console.log('Sending image to disease detection API...');

    const response = await fetchWithTimeout(
      `${API_BASE_URL}/disease/detect/`,
      {
        method: 'POST',
        body: JSON.stringify({ image: processedImage.base64 }),
      },
      DISEASE_API_TIMEOUT
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(result.error || 'Detection failed', response.status);
    }

    console.log('Detection result:', result.label, `${result.confidence}%`);

    // Validate if this is actually a rubber leaf
    const validation = validateLeafPredictions(
      result.confidence,
      result.allPredictions
    );

    return {
      success: true,
      label: result.label as DiseaseLabel,
      confidence: result.confidence,
      allPredictions: result.allPredictions,
      processingTimeMs: result.processingTimeMs,
      isValidLeaf: validation.isValid,
      validationMessage: validation.message,
    };
  } catch (error) {
    console.error('Disease detection failed:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.', 408);
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Disease detection failed',
      500
    );
  }
};


// ============================================
// CHATBOT API FUNCTIONS
// ============================================


export const checkChatbotHealth = async (): Promise<ChatHealthCheck> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/chatbot/health/`,
      { method: 'GET' },
      API_TIMEOUT
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Chatbot health check failed:', error);
    return {
      status: 'unhealthy',
      rubberbot: 'offline',
    };
  }
};


export const sendChatMessage = async (message: string, language: string = 'en'): Promise<ChatResponse> => {
  try {
    const sessionId = await getSessionId();

    console.log('Sending message to chatbot:', message.substring(0, 50));
    console.log('Chatbot URL:', `${API_BASE_URL}/chatbot/chat/`);
    console.log('Language:', language);

    const response = await fetchWithTimeout(
      `${API_BASE_URL}/chatbot/chat/`,
      {
        method: 'POST',
        body: JSON.stringify({
          message,
          session_id: sessionId,
          language: language,
        }),
      },
      CHATBOT_API_TIMEOUT,
      true // Include authentication token
    );

    console.log('Chatbot response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Chatbot error response:', errorData);
      throw new ApiError(
        errorData.error || `Chat request failed: ${response.statusText}`,
        response.status
      );
    }

    const result: ChatResponse = await response.json();
    console.log('Chatbot response received');

    return result;
  } catch (error) {
    console.error('Chat message failed:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timed out. The chatbot may be processing. Please try again.', 408);
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Failed to send message',
      500
    );
  }
};


export const clearChatSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
    cachedSessionId = null;
    console.log('Chat session cleared');
  } catch (error) {
    console.error('Error clearing chat session:', error);
  }
};


export const getCurrentSessionId = async (): Promise<string> => {
  return getSessionId();
};


// ============================================
// GROUPED EXPORTS
// ============================================


// Authentication & User Management APIs (grouped for easy import)
export const authAPI = {
  sendOTP,
  verifyOTP,
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  refreshAccessToken,
  // Farmer management
  getFarmers,
  getFarmerById,
  getFarmerDistricts,
  //officer managment
  getOfficers,
};


// Export types
export type {
  HistoricalData,
  HistoricalDataset,
  MarketData,
  MarketStats,
  PriceData
};


  export { ApiError };

