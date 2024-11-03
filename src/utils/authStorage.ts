import { AUTH_CONSTANTS } from '../constants/auth';
import { AuthResponse } from '../types/auth';

export class AuthStorage {
    static setToken(token: string): void {
        localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
    }

    static setUser(user: AuthResponse['user']): void {
        localStorage.setItem(
            AUTH_CONSTANTS.STORAGE_KEYS.USER,
            JSON.stringify(user)
        );
    }

    static getUser(): AuthResponse['user'] | null {
        const user = localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    }

    static clear(): void {
        localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
    }
}