import { useState, ReactNode, useCallback } from 'react';
import { AuthService } from '../services/authService';
import { AUTH_CONSTANTS } from '../constants/auth';
import {
    AuthState,
    AuthContextType,
    LoginCredentials
} from '../types/auth';
import {
    InvalidCredentialsError,
    NetworkError,
    LogoutError,
    AuthError
} from '../types/errors';
import { AuthContext } from './AuthContext';

const initialState: AuthState = {
    isAuthenticated: AuthService.isAuthenticated(),
    user: AuthService.getCurrentUser(),
    loading: false,
    error: null
};


interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<AuthState>(initialState);

    const handleError = (error: unknown): string => {
        if (error instanceof InvalidCredentialsError) {
            return AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS;
        }
        if (error instanceof NetworkError) {
            return AUTH_CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
        }
        if (error instanceof LogoutError) {
            return AUTH_CONSTANTS.ERROR_MESSAGES.LOGOUT_FAILED;
        }
        if (error instanceof AuthError) {
            return error.message;
        }
        return AUTH_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;
    };

    const login = useCallback(async (credentials: LoginCredentials) => {
        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            const response = await AuthService.login(credentials);
            setState(prev => ({
                ...prev,
                isAuthenticated: true,
                user: response.user,
                loading: false
            }));
        } catch (error: unknown) {
            setState(prev => ({
                ...prev,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: handleError(error)
            }));
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true,
            error: null
        }));

        try {
            await AuthService.logout();
            setState({
                ...initialState,
                isAuthenticated: false,
                user: null,
                loading: false
            });
        } catch (error: unknown) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: handleError(error)
            }));
            throw error;
        }
    }, []);

    const value: AuthContextType = {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}