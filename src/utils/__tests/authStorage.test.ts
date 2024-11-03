import { AuthStorage } from '../authStorage';
import { AUTH_CONSTANTS } from '@/constants/auth';
import { AuthResponse } from '@/types/auth';

describe('AuthStorage', () => {
    const mockToken = 'test-token';
    const mockUser: AuthResponse['user'] = { username: 'testuser' };

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem');
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'removeItem');
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('setToken stores token in localStorage', () => {
        AuthStorage.setToken(mockToken);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.TOKEN,
            mockToken
        );
    });

    test('getToken retrieves token from localStorage', () => {
        localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, mockToken);
        const token = AuthStorage.getToken();
        expect(token).toBe(mockToken);
        expect(localStorage.getItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.TOKEN
        );
    });

    test('setUser stores user in localStorage', () => {
        AuthStorage.setUser(mockUser);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.USER,
            JSON.stringify(mockUser)
        );
    });

    test('getUser retrieves user from localStorage', () => {
        localStorage.setItem(
            AUTH_CONSTANTS.STORAGE_KEYS.USER,
            JSON.stringify(mockUser)
        );
        const user = AuthStorage.getUser();
        expect(user).toEqual(mockUser);
        expect(localStorage.getItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.USER
        );
    });

    test('getUser returns null if user data is not in localStorage', () => {
        const user = AuthStorage.getUser();
        expect(user).toBeNull();
        expect(localStorage.getItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.USER
        );
    });

    test('clear removes token and user from localStorage', () => {
        localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, mockToken);
        localStorage.setItem(
            AUTH_CONSTANTS.STORAGE_KEYS.USER,
            JSON.stringify(mockUser)
        );

        AuthStorage.clear();

        expect(localStorage.removeItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.TOKEN
        );
        expect(localStorage.removeItem).toHaveBeenCalledWith(
            AUTH_CONSTANTS.STORAGE_KEYS.USER
        );
        expect(localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN)).toBeNull();
        expect(localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER)).toBeNull();
    });
});
