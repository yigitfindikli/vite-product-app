import { AuthService } from '../authService';
import { AuthStorage } from '@/utils/authStorage';
import api from '../httpClient';
import { AuthResponse } from '@/types/auth';
import { AuthError, LogoutError, NetworkError } from '@/types/errors';
import MockAdapter from 'axios-mock-adapter';

jest.mock('@/utils/authStorage');

describe('AuthService', () => {
    const mock = new MockAdapter(api);

    const mockCredentials = { username: 'testuser', password: 'password123' };
    const mockToken = 'fake-jwt-token';
    const mockUser = { username: 'testuser' };
    const mockAuthResponse: AuthResponse = { token: mockToken, user: mockUser };

    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should login successfully and store token', async () => {
            mock.onPost('/auth/login').reply(200, mockAuthResponse);

            const response = await AuthService.login(mockCredentials);

            expect(response).toEqual(mockAuthResponse);
            expect(AuthStorage.setToken).toHaveBeenCalledWith(mockToken);
        });

        it('should throw AuthError for failed login', async () => {
            mock.onPost('/auth/login').reply(500);

            await expect(AuthService.login(mockCredentials)).rejects.toThrow(AuthError);
        });
    });

    describe('logout', () => {
        it('should logout successfully and clear token', async () => {
            mock.onPost('/auth/logout').reply(200);

            await AuthService.logout();

            expect(AuthStorage.clear).toHaveBeenCalled();
        });

        it('should throw NetworkError if there is no response', async () => {
            mock.onPost('/auth/logout').networkError();

            await expect(AuthService.logout()).rejects.toThrow(NetworkError);
            expect(AuthStorage.clear).toHaveBeenCalled();
        });

        it('should throw LogoutError for a failed logout', async () => {
            mock.onPost('/auth/logout').reply(500);

            await expect(AuthService.logout()).rejects.toThrow(LogoutError);
            expect(AuthStorage.clear).toHaveBeenCalled();
        });
    });

    describe('isAuthenticated', () => {
        it('should return true if token is present', () => {
            (AuthStorage.getToken as jest.Mock).mockReturnValue(mockToken);

            expect(AuthService.isAuthenticated()).toBe(true);
        });

        it('should return false if token is not present', () => {
            (AuthStorage.getToken as jest.Mock).mockReturnValue(null);

            expect(AuthService.isAuthenticated()).toBe(false);
        });
    });

    describe('getCurrentUser', () => {
        it('should return user if user is stored', () => {
            (AuthStorage.getUser as jest.Mock).mockReturnValue(mockUser);

            expect(AuthService.getCurrentUser()).toEqual(mockUser);
        });

        it('should return null if no user is stored', () => {
            (AuthStorage.getUser as jest.Mock).mockReturnValue(null);

            expect(AuthService.getCurrentUser()).toBeNull();
        });
    });

    it('should throw LogoutError when error is a generic Error instance', async () => {
        mock.onPost('/auth/logout').reply(() => {
            throw new Error('Generic error');
        });

        await expect(AuthService.logout()).rejects.toThrow(LogoutError);
        expect(AuthStorage.clear).toHaveBeenCalled();
    });

    it('should throw LogoutError with a new error when error is of unknown type', async () => {
        mock.onPost('/auth/logout').reply(() => {
            throw 'Unknown error type';
        });

        await expect(AuthService.logout()).rejects.toThrow(LogoutError);
        expect(AuthStorage.clear).toHaveBeenCalled();
    });
});
