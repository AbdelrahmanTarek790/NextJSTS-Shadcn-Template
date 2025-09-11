/**
 * Authentication utility functions for token management
 */

const AUTH_TOKEN_KEY = 'auth-token';

/**
 * Get the authentication token from localStorage
 * @returns The auth token or null if not found
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Set the authentication token in localStorage
 * @param token - The token to store
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Clear the authentication state from localStorage
 */
export function clearAuthState(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Check if user is authenticated
 * @returns True if user has a valid token
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}