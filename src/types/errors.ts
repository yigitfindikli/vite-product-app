export class AuthError extends Error {
    constructor(
        message: string,
        public code: string,
        public status?: number
    ) {
        super(message);
        this.name = 'AuthError';
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

export class InvalidCredentialsError extends AuthError {
    constructor() {
        super(
            'Invalid credentials provided',
            'INVALID_CREDENTIALS',
            401
        );
        this.name = 'InvalidCredentialsError';
        Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
    }
}

export class UnauthorizedError extends AuthError {
    constructor() {
        super(
            'Unauthorized access',
            'UNAUTHORIZED',
            401
        );
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class LogoutError extends AuthError {
    constructor(originalError?: Error) {
        super(
            `Logout failed: ${originalError?.message || 'Unknown error occurred'}`,
            'LOGOUT_FAILED',
            500
        );
        this.name = 'LogoutError';
        Object.setPrototypeOf(this, LogoutError.prototype);
    }
}

export class NetworkError extends AuthError {
    constructor(originalError?: Error) {
        super(
            `Network error: ${originalError?.message || 'Connection failed'}`,
            'NETWORK_ERROR',
            503
        );
        this.name = 'NetworkError';
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}