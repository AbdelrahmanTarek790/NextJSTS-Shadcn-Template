import { AxiosResponse } from 'axios';
import { apiClient } from './axios';
import type { ApiResponse, RequestConfig, PaginatedResponse } from './types/api';

class ApiClientService {
  /**
   * Generic GET request
   */
  async get<T = unknown>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, { params });
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(url, data, config);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T = unknown>(
    url: string,
    config?: Omit<RequestConfig, 'url' | 'method'>
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(url, config);
    return response.data;
  }

  /**
   * Upload file(s)
   */
  async upload<T = unknown>(
    url: string,
    files: File | File[],
    additionalData?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
    } else {
      formData.append('file', files);
    }

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  /**
   * Download file
   */
  async download(url: string, filename?: string): Promise<void> {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });

    // Create blob link to download
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename || 'download';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(link.href);
  }

  /**
   * Paginated GET request
   */
  async getPaginated<T = unknown>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<PaginatedResponse<T>> {
    const response: AxiosResponse<PaginatedResponse<T>> = await apiClient.get(url, { params });
    return response.data;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.get<{ status: string; timestamp: string }>('/health');
    return response.data;
  }
}

// Create and export singleton instance
export const apiClientService = new ApiClientService();