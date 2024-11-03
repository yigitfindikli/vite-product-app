import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header/Header';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

jest.mock('@/hooks/useAuth');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Header Component', () => {
    const mockLogout = jest.fn().mockResolvedValueOnce(undefined);
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    test('renders Header component with welcome message and logout button', () => {
        render(<Header />);

        expect(screen.getByText('Welcome')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    test('calls logout and navigates to /login on logout button click', async () => {
        render(<Header />);

        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        await expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
