import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedLayout from '../ProtectedLayout';
import { AuthContextType } from '@/types/auth';

jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

import { useAuth } from '@/hooks/useAuth';

describe('ProtectedLayout', () => {
    const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

    const mockAuthContext: AuthContextType = {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        login: jest.fn().mockResolvedValue(undefined),
        logout: jest.fn().mockResolvedValue(undefined),
    };

    test('redirects to /login when user is not authenticated', () => {
        mockedUseAuth.mockReturnValue({ ...mockAuthContext, isAuthenticated: false });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/protected" element={<ProtectedLayout />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    test('renders Header and Outlet when user is authenticated', () => {
        mockedUseAuth.mockReturnValue({ ...mockAuthContext, isAuthenticated: true });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route element={<ProtectedLayout />}>
                        <Route path="/protected" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.getByTestId('protected-layout')).toBeInTheDocument();
    });
});
