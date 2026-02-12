// services/buyerPricesApi.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT } from './api';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface BuyerPrice {
  id: number;
  buyer: number;
  buyer_name: string;
  buyer_username: string;
  buyer_company: string | null;
  buyer_phone: string | null;
  buyer_city: string | null;
  grade: string;
  custom_grade_name: string | null;
  grade_display: string;
  price: string;
  notes: string | null;
  effective_from: string;
  effective_to: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface BuyerPriceInput {
  grade: string;
  price: number;
  custom_grade_name?: string;
  effective_from?: string;
  effective_to?: string;
}

export interface BulkPriceUpdateRequest {
  prices: BuyerPriceInput[];
  notes?: string;
  effective_from?: string;
  effective_to?: string;
}

export interface BulkPriceUpdateResponse {
  success: boolean;
  message: string;
  total_count: number;
  updated_count: number;
  new_count: number;
  prices: BuyerPrice[];
}

export interface MyLatestPricesResponse {
  success: boolean;
  count: number;
  date: string;
  prices: BuyerPrice[];
}

export interface BuyerPricesGroup {
  buyer_id: number;
  buyer_name: string;
  buyer_username: string;
  buyer_company: string | null;
  buyer_phone: string | null;
  buyer_city: string | null;
  buyer_verified: boolean;
  prices: {
    id: number;
    grade: string;
    grade_display: string;
    price: string;
    created_at: string;
    updated_at: string;
  }[];
  notes: string;
  last_updated: string;
}

export interface FarmerViewResponse {
  success: boolean;
  date: string;
  buyers_count: number;
  total_prices: number;
  buyers: BuyerPricesGroup[];
}

export interface PriceHistoryItem {
  id: number;
  buyer_name: string;
  old_price: string;
  new_price: string;
  price_change: number;
  price_change_percentage: number;
  changed_at: string;
  changed_by_name: string;
  grade_display: string;
}

export interface PriceHistoryResponse {
  success: boolean;
  count: number;
  days: number;
  statistics: {
    average_change: number;
    max_increase: number;
    max_decrease: number;
  };
  history: PriceHistoryItem[];
}

export interface GradeStatistics {
  grade_name: string;
  buyer_count: number;
  min_price: number;
  max_price: number;
  avg_price: number;
  price_range: number;
}

export interface MarketOverviewResponse {
  success: boolean;
  date: string;
  active_buyers: number;
  total_active_prices: number;
  grade_statistics: Record<string, GradeStatistics>;
  last_updated: string;
}

export interface PriceAlert {
  id: number;
  farmer: number;
  farmer_name: string;
  grade: string;
  grade_display: string;
  target_price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PriceAlertsResponse {
  success: boolean;
  count: number;
  alerts: PriceAlert[];
}

export interface CreatePriceAlertRequest {
  grade: string;
  target_price: number;
  is_active?: boolean;
}

// ============================================
// API ERROR HANDLING
// ============================================

export class BuyerPriceApiError extends Error {
  status: number;
  details?: any;
  
  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = 'BuyerPriceApiError';
    this.status = status;
    this.details = details;
  }
}

// ============================================
// FETCH WITH TIMEOUT & AUTH
// ============================================

const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const token = await AsyncStorage.getItem('accessToken');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔵 Request with token:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No access token found');
    }

    console.log('🔵 API Request:', {
      url,
      method: options.method || 'GET',
      hasToken: !!token,
    });

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    console.log('🔵 API Response:', {
      url,
      status: response.status,
      ok: response.ok,
    });
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    console.error('🔴 Fetch Error:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new BuyerPriceApiError(
        'Request timeout - please check your connection',
        408
      );
    }
    
    if (error instanceof TypeError) {
      throw new BuyerPriceApiError(
        'Network error - cannot reach server',
        0
      );
    }
    
    throw error;
  }
};

// ============================================
// RESPONSE HANDLER
// ============================================

const handleResponse = async (
  response: Response,
  context: string = ''
): Promise<any> => {
  const contentType = response.headers.get('content-type');
  
  console.log(`🔵 Handling response for ${context}:`, {
    status: response.status,
    contentType,
    ok: response.ok,
  });

  // Handle 204 No Content (successful deletion)
  if (response.status === 204) {
    console.log(`✅ Success for ${context} (No Content)`);
    return { success: true };
  }

  if (!contentType || !contentType.includes('application/json')) {
    const textContent = await response.text();
    console.error('🔴 Non-JSON response:', textContent.substring(0, 500));

    if (!response.ok) {
      throw new BuyerPriceApiError(
        `Server error (${response.status})`,
        response.status
      );
    }

    throw new BuyerPriceApiError(
      'Server returned non-JSON response',
      response.status
    );
  }

  let data: any;
  try {
    data = await response.json();
    console.log(`🔵 Parsed JSON for ${context}:`, {
      hasData: !!data,
      keys: Object.keys(data || {}),
    });
  } catch (parseError) {
    console.error('🔴 JSON parse error:', parseError);
    throw new BuyerPriceApiError(
      'Invalid JSON response from server',
      response.status
    );
  }

  if (!response.ok) {
    const errorMessage = 
      data?.error || 
      data?.message || 
      data?.detail || 
      (typeof data === 'string' ? data : '') ||
      `Request failed with status ${response.status}`;
    
    console.error('🔴 API Error:', errorMessage);
    throw new BuyerPriceApiError(errorMessage, response.status, data);
  }

  console.log(`✅ Success for ${context}`);
  return data;
};

// ============================================
// BUYER PRICES API CLASS
// ============================================

class BuyerPricesService {
  private baseUrl: string;
  private alertsBaseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/buyer-prices`;
    this.alertsBaseUrl = `${API_BASE_URL}/price-alerts`;
    console.log('🔵 BuyerPricesService initialized:', {
      baseUrl: this.baseUrl,
      alertsBaseUrl: this.alertsBaseUrl,
    });
  }

  /**
   * Get buyer's latest prices for pre-filling the form
   * Endpoint: GET /buyer-prices/my-latest/
   */
  async getMyLatestPrices(): Promise<MyLatestPricesResponse> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/my-latest/`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getMyLatestPrices');
    } catch (error) {
      console.error('🔴 [getMyLatestPrices] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch prices',
        500
      );
    }
  }

  /**
   * Bulk update prices - for buyers updating multiple grades at once
   * Endpoint: POST /buyer-prices/bulk-update/
   */
  async bulkUpdatePrices(
    request: BulkPriceUpdateRequest
  ): Promise<BulkPriceUpdateResponse> {
    try {
      console.log('🔵 Updating prices:', request);
      const response = await fetchWithTimeout(
        `${this.baseUrl}/bulk-update/`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
      return await handleResponse(response, 'bulkUpdatePrices');
    } catch (error) {
      console.error('🔴 [bulkUpdatePrices] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to update prices',
        500
      );
    }
  }

  /**
   * Get all active prices grouped by buyer - for farmers panel
   * Endpoint: GET /buyer-prices/farmer-view/
   */
  async getFarmerViewPrices(): Promise<FarmerViewResponse> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/farmer-view/`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getFarmerViewPrices');
    } catch (error) {
      console.error('🔴 [getFarmerViewPrices] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch prices',
        500
      );
    }
  }

  /**
   * Get price history for analytics
   * Endpoint: GET /buyer-prices/price-history/?grade=&days=30
   */
  async getPriceHistory(
    grade?: string,
    days: number = 30
  ): Promise<PriceHistoryResponse> {
    try {
      const params = new URLSearchParams();
      if (grade) params.append('grade', grade);
      params.append('days', days.toString());

      const response = await fetchWithTimeout(
        `${this.baseUrl}/price-history/?${params.toString()}`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getPriceHistory');
    } catch (error) {
      console.error('🔴 [getPriceHistory] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch history',
        500
      );
    }
  }

  /**
   * Deactivate all buyer's current prices
   * Endpoint: DELETE /buyer-prices/deactivate-all/
   */
  async deactivateAllPrices(): Promise<{
    success: boolean;
    message: string;
    deactivated_count: number;
  }> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/deactivate-all/`,
        { method: 'DELETE' }
      );
      return await handleResponse(response, 'deactivateAllPrices');
    } catch (error) {
      console.error('🔴 [deactivateAllPrices] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to deactivate',
        500
      );
    }
  }

  /**
   * Get market overview statistics
   * Endpoint: GET /buyer-prices/market-overview/
   */
  async getMarketOverview(): Promise<MarketOverviewResponse> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/market-overview/`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getMarketOverview');
    } catch (error) {
      console.error('🔴 [getMarketOverview] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch overview',
        500
      );
    }
  }

  /**
   * Get all price alerts for farmer
   * Endpoint: GET /price-alerts/
   */
  async getPriceAlerts(): Promise<PriceAlert[]> {
    try {
      const response = await fetchWithTimeout(
        `${this.alertsBaseUrl}/`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getPriceAlerts');
    } catch (error) {
      console.error('🔴 [getPriceAlerts] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch alerts',
        500
      );
    }
  }

  /**
   * Get only active price alerts
   * Endpoint: GET /price-alerts/active-alerts/
   */
  async getActivePriceAlerts(): Promise<PriceAlertsResponse> {
    try {
      const response = await fetchWithTimeout(
        `${this.alertsBaseUrl}/active-alerts/`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getActivePriceAlerts');
    } catch (error) {
      console.error('🔴 [getActivePriceAlerts] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch alerts',
        500
      );
    }
  }

  /**
   * Create new price alert
   * Endpoint: POST /price-alerts/
   */
  async createPriceAlert(request: CreatePriceAlertRequest): Promise<PriceAlert> {
    try {
      console.log('🔵 Creating price alert:', request);
      const response = await fetchWithTimeout(
        `${this.alertsBaseUrl}/`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
      return await handleResponse(response, 'createPriceAlert');
    } catch (error) {
      console.error('🔴 [createPriceAlert] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to create alert',
        500
      );
    }
  }

  /**
   * Update existing price alert
   * Endpoint: PATCH /price-alerts/{id}/
   */
  async updatePriceAlert(
    alertId: number,
    request: Partial<CreatePriceAlertRequest>
  ): Promise<PriceAlert> {
    try {
      console.log('🔵 Updating price alert:', { alertId, request });
      const response = await fetchWithTimeout(
        `${this.alertsBaseUrl}/${alertId}/`,
        {
          method: 'PATCH',
          body: JSON.stringify(request),
        }
      );
      return await handleResponse(response, 'updatePriceAlert');
    } catch (error) {
      console.error('🔴 [updatePriceAlert] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to update alert',
        500
      );
    }
  }

  /**
   * Delete price alert
   * Endpoint: DELETE /price-alerts/{id}/
   */
  async deletePriceAlert(alertId: number): Promise<void> {
    try {
      console.log('🔵 Deleting price alert:', alertId);
      const response = await fetchWithTimeout(
        `${this.alertsBaseUrl}/${alertId}/`,
        { method: 'DELETE' }
      );

      if (!response.ok && response.status !== 204) {
        const data = await response.json().catch(() => ({}));
        throw new BuyerPriceApiError(
          data.error || 'Failed to delete alert',
          response.status
        );
      }
      
      console.log('✅ Price alert deleted successfully');
    } catch (error) {
      console.error('🔴 [deletePriceAlert] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to delete alert',
        500
      );
    }
  }

  /**
   * Get all buyer prices (with optional filters)
   * Endpoint: GET /buyer-prices/
   */
  async getAllBuyerPrices(params?: {
    grade?: string;
    is_active?: boolean;
  }): Promise<BuyerPrice[]> {
    try {
      let url = `${this.baseUrl}/`;
      
      if (params) {
        const searchParams = new URLSearchParams();
        if (params.grade) searchParams.append('grade', params.grade);
        if (params.is_active !== undefined) {
          searchParams.append('is_active', params.is_active.toString());
        }
        const queryString = searchParams.toString();
        if (queryString) url += `?${queryString}`;
      }

      const response = await fetchWithTimeout(url, { method: 'GET' });
      return await handleResponse(response, 'getAllBuyerPrices');
    } catch (error) {
      console.error('🔴 [getAllBuyerPrices] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch prices',
        500
      );
    }
  }

  /**
   * Get single price by ID
   * Endpoint: GET /buyer-prices/{id}/
   */
  async getPriceById(priceId: number): Promise<BuyerPrice> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/${priceId}/`,
        { method: 'GET' }
      );
      return await handleResponse(response, 'getPriceById');
    } catch (error) {
      console.error('🔴 [getPriceById] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to fetch price',
        500
      );
    }
  }

  /**
   * Create single buyer price
   * Endpoint: POST /buyer-prices/
   */
  async createBuyerPrice(data: BuyerPriceInput): Promise<BuyerPrice> {
    try {
      console.log('🔵 Creating buyer price:', data);
      const response = await fetchWithTimeout(
        `${this.baseUrl}/`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      return await handleResponse(response, 'createBuyerPrice');
    } catch (error) {
      console.error('🔴 [createBuyerPrice] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to create price',
        500
      );
    }
  }

  /**
   * Update single price
   * Endpoint: PATCH /buyer-prices/{id}/
   */
  async updatePrice(
    priceId: number,
    data: Partial<BuyerPriceInput>
  ): Promise<BuyerPrice> {
    try {
      console.log('🔵 Updating price:', { priceId, data });
      const response = await fetchWithTimeout(
        `${this.baseUrl}/${priceId}/`,
        {
          method: 'PATCH',
          body: JSON.stringify(data),
        }
      );
      return await handleResponse(response, 'updatePrice');
    } catch (error) {
      console.error('🔴 [updatePrice] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to update price',
        500
      );
    }
  }

  /**
   * Delete single price
   * Endpoint: DELETE /buyer-prices/{id}/
   */
  async deletePrice(priceId: number): Promise<void> {
    try {
      console.log('🔵 Deleting price:', priceId);
      const response = await fetchWithTimeout(
        `${this.baseUrl}/${priceId}/`,
        { method: 'DELETE' }
      );

      if (!response.ok && response.status !== 204) {
        const data = await response.json().catch(() => ({}));
        throw new BuyerPriceApiError(
          data.error || 'Failed to delete price',
          response.status
        );
      }
      
      console.log('✅ Price deleted successfully');
    } catch (error) {
      console.error('🔴 [deletePrice] Error:', error);
      if (error instanceof BuyerPriceApiError) throw error;
      throw new BuyerPriceApiError(
        error instanceof Error ? error.message : 'Failed to delete price',
        500
      );
    }
  }

  /**
   * Toggle price alert active status
   */
  async togglePriceAlert(alertId: number, isActive: boolean): Promise<PriceAlert> {
    return this.updatePriceAlert(alertId, { is_active: isActive });
  }

  /**
   * Get price statistics for a specific grade
   */
  async getGradeStatistics(grade: string): Promise<GradeStatistics | null> {
    try {
      const overview = await this.getMarketOverview();
      return overview.grade_statistics[grade] || null;
    } catch (error) {
      console.error('🔴 [getGradeStatistics] Error:', error);
      throw error;
    }
  }
}

// ============================================
// SINGLETON INSTANCE EXPORT
// ============================================

export const buyerPricesApi = new BuyerPricesService();
export default buyerPricesApi;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format price for display
 */
export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return numPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Get grade display name
 */
export const getGradeDisplayName = (grade: string, customName?: string): string => {
  if (grade === 'custom' && customName) return customName;
  
  const gradeNames: Record<string, string> = {
    rss1: 'RSS1',
    rss2: 'RSS2',
    rss3: 'RSS3',
    rss4: 'RSS4',
    rss5: 'RSS5',
    latex: 'Latex 60%',
    tsr20: 'TSR20',
    crepe: 'Crepe',
    custom: 'Custom Grade',
  };
  
  return gradeNames[grade] || grade.toUpperCase();
};

/**
 * Validate price input
 */
export const validatePriceInput = (price: string): boolean => {
  if (!price || price.trim() === '') return false;
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0;
};

/**
 * Calculate price change percentage
 */
export const calculatePriceChangePercentage = (
  oldPrice: number,
  newPrice: number
): number => {
  if (oldPrice === 0) return 0;
  return ((newPrice - oldPrice) / oldPrice) * 100;
};
