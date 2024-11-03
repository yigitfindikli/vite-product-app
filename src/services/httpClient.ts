import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthStorage } from '../utils/authStorage';
import { UnauthorizedError } from '../types/errors';

const SECRET_KEY = 'do-not-tell-anyone';
const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Initialize the mock adapter
const mock = new MockAdapter(api);

// Request interceptor to automatically add token to requests
api.interceptors.request.use((config) => {
    const token = AuthStorage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Utility function to create a signature
function createSignature(payload: string): string {
    return btoa(payload + SECRET_KEY);
}

// Mock login endpoint - generates a token with a signature
mock.onPost('/auth/login').reply((config) => {
    const { username, password } = JSON.parse(config.data);
    if (username === 'user' && password === 'user123') {
        // Create a mock JWT-like token with header, payload, and signature
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({ username }));
        const signature = createSignature(`${header}.${payload}`);
        const token = `${header}.${payload}.${signature}`;

        // Store token directly in AuthStorage
        AuthStorage.setToken(token);
        AuthStorage.setUser({ username });

        return [200, { user: { username } }];
    } else {
        return [401, new UnauthorizedError];
    }
});

// Mock logout endpoint - clears the token
mock.onPost('/auth/logout').reply(() => {
    AuthStorage.clear();
    return [200, { message: 'Logout successful' }];
});

// Mock validate-token endpoint - verifies token signature
mock.onGet('/auth/validate-token').reply((config) => {
    const authHeader = config.headers?.Authorization;
    if (!authHeader) return [401, { message: 'No token provided' }];

    const token = authHeader.split(' ')[1];
    const storedToken = AuthStorage.getToken();

    if (token !== storedToken) {
        AuthStorage.clear();
        return [401, { message: 'Token is invalid' }];
    }

    const [header, payload, signature] = token.split('.');
    const expectedSignature = createSignature(`${header}.${payload}`);
    if (signature !== expectedSignature) {
        AuthStorage.clear();
        return [401, { message: 'Token signature is invalid' }];
    }

    const decodedPayload = JSON.parse(atob(payload));
    return [200, { message: 'Token is valid', user: decodedPayload }];
});

export default api;
