import { useState, useCallback } from 'react';
import { apiClientService } from '@/lib/api-client';
import type { ApiResponse, PaginatedResponse } from '@/lib/types/api';

// Hook state interface
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Helper function to extract error message
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    if ('response' in error && error.response && typeof error.response === 'object') {
      if ('data' in error.response && error.response.data && typeof error.response.data === 'object') {
        if ('message' in error.response.data) {
          return String(error.response.data.message);
        }
      }
    }
    if ('message' in error) {
      return String(error.message);
    }
  }
  return 'An error occurred';
}

// Hook for GET requests
export function useApi<T = unknown>(url?: string) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (requestUrl?: string, params?: Record<string, unknown>): Promise<T | null> => {
      const targetUrl = requestUrl || url;
      if (!targetUrl) {
        throw new Error('URL is required');
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response: ApiResponse<T> = await apiClientService.get(targetUrl, params);
        setState(prev => ({ ...prev, data: response.data, loading: false }));
        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        return null;
      }
    },
    [url]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for POST requests
export function useApiPost<T = unknown, D = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (url: string, data?: D): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response: ApiResponse<T> = await apiClientService.post(url, data);
        setState(prev => ({ ...prev, data: response.data, loading: false }));
        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for PUT requests
export function useApiPut<T = unknown, D = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (url: string, data?: D): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response: ApiResponse<T> = await apiClientService.put(url, data);
        setState(prev => ({ ...prev, data: response.data, loading: false }));
        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for DELETE requests
export function useApiDelete<T = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (url: string): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response: ApiResponse<T> = await apiClientService.delete(url);
        setState(prev => ({ ...prev, data: response.data, loading: false }));
        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for paginated requests
export function useApiPaginated<T = unknown>(url?: string, initialPage = 1, initialLimit = 10) {
  const [state, setState] = useState<{
    data: T[];
    loading: boolean;
    error: string | null;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>({
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: initialPage,
      limit: initialLimit,
      total: 0,
      totalPages: 0,
    },
  });

  const execute = useCallback(
    async (
      requestUrl?: string,
      page?: number,
      limit?: number,
      params?: Record<string, unknown>
    ): Promise<T[] | null> => {
      const targetUrl = requestUrl || url;
      if (!targetUrl) {
        throw new Error('URL is required');
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const queryParams = {
          page: page || state.pagination.page,
          limit: limit || state.pagination.limit,
          ...params,
        };

        const response: PaginatedResponse<T> = await apiClientService.getPaginated(targetUrl, queryParams);
        
        setState(prev => ({
          ...prev,
          data: response.data,
          loading: false,
          pagination: response.pagination,
        }));

        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        return null;
      }
    },
    [url, state.pagination.page, state.pagination.limit]
  );

  const reset = useCallback(() => {
    setState(prev => ({
      data: [],
      loading: false,
      error: null,
      pagination: {
        ...prev.pagination,
        page: initialPage,
        total: 0,
        totalPages: 0,
      },
    }));
  }, [initialPage]);

  const nextPage = useCallback(() => {
    if (state.pagination.page < state.pagination.totalPages) {
      execute(undefined, state.pagination.page + 1);
    }
  }, [execute, state.pagination.page, state.pagination.totalPages]);

  const previousPage = useCallback(() => {
    if (state.pagination.page > 1) {
      execute(undefined, state.pagination.page - 1);
    }
  }, [execute, state.pagination.page]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= state.pagination.totalPages) {
        execute(undefined, page);
      }
    },
    [execute, state.pagination.totalPages]
  );

  return {
    ...state,
    execute,
    reset,
    nextPage,
    previousPage,
    goToPage,
  };
}

// Hook for file upload
export function useApiUpload<T = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (
      url: string,
      files: File | File[],
      additionalData?: Record<string, unknown>
    ): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response: ApiResponse<T> = await apiClientService.upload(url, files, additionalData);
        setState(prev => ({ ...prev, data: response.data, loading: false }));
        return response.data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}