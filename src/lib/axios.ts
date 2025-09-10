import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';
import type { ApiResponse, ApiError } from '@/lib/types/api';

// Create axios instance with default configuration
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // Add auth token if available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth-token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Log request in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }

      return config;
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // Log response in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
      }

      return response;
    },
    (error: AxiosError<ApiError>) => {
      // Handle different error scenarios
      const errorMessage = handleApiError(error);
      
      // Show error toast notification
      if (errorMessage && typeof window !== 'undefined') {
        toast.error(errorMessage);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Error handler function
const handleApiError = (error: AxiosError<ApiError>): string => {
  // Network error
  if (!error.response) {
    return 'Network error. Please check your connection.';
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return data?.message || 'Bad request. Please check your input.';
    case 401:
      // Handle unauthorized - redirect to login if needed
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
      return 'Unauthorized. Please log in again.';
    case 403:
      return 'Forbidden. You do not have permission to perform this action.';
    case 404:
      return 'Resource not found.';
    case 422:
      // Handle validation errors
      if (data?.errors) {
        const errorMessages = Object.values(data.errors).flat();
        return errorMessages.join(', ');
      }
      return data?.message || 'Validation error.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Internal server error. Please try again later.';
    case 502:
      return 'Bad gateway. Please try again later.';
    case 503:
      return 'Service unavailable. Please try again later.';
    default:
      return data?.message || `An error occurred (${status}).`;
  }
};

// Create and export the API client instance
export const apiClient = createApiClient();

// Export the error handler for external use
export { handleApiError };