export interface LoginCredentials {
    username: string;
    password: string;
}

export interface User {
    username: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}