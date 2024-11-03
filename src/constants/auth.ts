export const AUTH_CONSTANTS = {
    STORAGE_KEYS: {
        TOKEN: 'authToken',
        USER: 'authUser'
    },
    ENDPOINTS: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout'
    },
    ERROR_MESSAGES: {
        INVALID_CREDENTIALS: 'Invalid credentials',
        LOGIN_FAILED: 'Login failed',
        LOGOUT_FAILED: 'Logout failed',
        UNAUTHORIZED: 'Unauthorized access',
        NETWORK_ERROR: 'Network error',
        UNKNOWN_ERROR: 'An unknown error occurred'
    }
} as const;