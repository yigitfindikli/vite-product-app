import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../PublicLayout';
import { AuthContextType } from '@/types/auth';

jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

import { useAuth } from '@/hooks/useAuth';

describe('PublicLayout', () => {
    const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

    const mockAuthContext: AuthContextType = {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        login: jest.fn().mockResolvedValue(undefined),
        logout: jest.fn().mockResolvedValue(undefined),
    };

    test('renders Outlet when user is not authenticated', () => {
        mockedUseAuth.mockReturnValue({ ...mockAuthContext, isAuthenticated: false });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<div>Public Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Public Content')).toBeInTheDocument();
    });

    test('redirects to /products when user is authenticated', () => {
        mockedUseAuth.mockReturnValue({ ...mockAuthContext, isAuthenticated: true });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<PublicLayout />} />
                    <Route path="/products" element={<div>Products Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Products Page')).toBeInTheDocument();
    });
});
