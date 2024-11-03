import { isAxiosError } from 'axios';
import { AuthStorage } from '../utils/authStorage';
import { AUTH_CONSTANTS } from '../constants/auth';
import {
    AuthError,
    LogoutError,
    NetworkError,
} from '../types/errors';
import { AuthResponse, LoginCredentials } from '../types/auth';
import api from './httpClient';

export class AuthService {

    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>(
                '/auth/login',
                credentials
            );

            AuthStorage.setToken(response.data.token);

            return response.data;
        } catch {
            throw new AuthError(
                'Authentication failed',
                'AUTH_FAILED'
            );
        }
    }

    static async logout(): Promise<void> {
        try {
            await api.post(AUTH_CONSTANTS.ENDPOINTS.LOGOUT);
            AuthStorage.clear();
        } catch (error: unknown) {
            AuthStorage.clear();

            if (isAxiosError(error)) {
                if (!error.response) {
                    throw new NetworkError(error);
                }
                throw new LogoutError(error);
            }

            if (error instanceof Error) {
                throw new LogoutError(error);
            }

            throw new LogoutError(
                new Error('An unexpected error occurred during logout')
            );
        }
    }

    static isAuthenticated(): boolean {
        const token = AuthStorage.getToken();
        return !!token;
    }

    static getCurrentUser(): AuthResponse['user'] | null {
        return AuthStorage.getUser();
    }
}