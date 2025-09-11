import axios from "axios"
import { toast } from "sonner"
import { getAuthToken, clearAuthState } from "@/lib/auth"

// Create instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const { response } = error

        // Handle different error scenarios
        if (response) {
            // Handle token expiration
            if (response.status === 401) {
                clearAuthState()
                window.location.href = "/login"
                toast.error("Session expired. Please log in again.")
            }

            // Handle forbidden access
            else if (response.status === 403) {
                toast.error("You do not have permission to perform this action")
            }

            // Handle not found
            else if (response.status === 404) {
                toast.error("Resource not found")
            }

            // Handle validation errors
            else if (response.status === 422) {
                const validationErrors = response.data?.errors || {}
                Object.values(validationErrors).forEach((errorArray) => {
                    if (Array.isArray(errorArray)) {
                        errorArray.forEach((error) => toast.error(String(error)))
                    } else {
                        toast.error(String(errorArray))
                    }
                })
            }

            // Handle server errors
            else if (response.status >= 500) {
                toast.error("Server error. Please try again later.")
            }

            // Handle other errors
            else {
                const errorMessage = response.data?.message || "An error occurred"
                toast.error(errorMessage)
            }
        }
        // Handle network errors
        else if (error.request) {
            toast.error("Network error. Please check your connection.")
        }
        // Handle other errors
        else {
            toast.error("An unexpected error occurred")
        }

        return Promise.reject(error)
    }
)

export default api

// Named export for convenience
export { api }