import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '../Login';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

jest.mock('@/hooks/useAuth');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Login Component', () => {
    const mockLogin = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form', () => {
        render(<Login />);

        expect(screen.getByTestId('login-page')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('updates username and password fields', () => {
        render(<Login />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });

        expect(usernameInput).toHaveValue('testuser');
        expect(passwordInput).toHaveValue('testpass');
    });

    test('calls login and navigates on successful login', async () => {
        mockLogin.mockResolvedValueOnce(undefined);

        render(<Login />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
            expect(mockNavigate).toHaveBeenCalledWith('/products');
        });
    });

    test('shows error message on login failure', async () => {
        mockLogin.mockRejectedValueOnce(new Error('Login failed'));

        render(<Login />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'wrongpass' });
            expect(screen.getByText('Login failed. Please check your username and password.')).toBeInTheDocument();
        });
    });
});
