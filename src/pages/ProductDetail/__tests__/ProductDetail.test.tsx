import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getProductById } from '@/services/productService';
import ProductDetail from '../ProductDetail';
import { Product } from '@/types/product';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('@/hooks/useAuth');
jest.mock('@/services/productService');

describe('ProductDetail Component', () => {
    const mockNavigate = jest.fn();
    const mockProduct: Product = {
        id: 'test-air-force-1',
        name: 'Test Air Force 1',
        price: 100,
        rating: 4.0,
        images: [
            { id: 'test-air-force-1-img-1', src: '/images/products/test-1.png', alt: 'Test Image 1' },
            { id: 'test-air-force-1-img-2', src: '/images/products/test-2.png', alt: 'Test Image 2' }
        ],
        description: 'Test description for Air Force 1',
        arrivalDate: '2024-10-01',
        comments: [
            { id: 'test-comment-1', username: 'TestUser1', comment: 'Great!', rating: 4 },
            { id: 'test-comment-2', username: 'TestUser2', comment: 'Nice!', rating: 3 }
        ],
        totalRatings: 2,
    };

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: mockProduct.id });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useAuth as jest.Mock).mockReturnValue({ user: { username: 'CurrentUser' } });
        (getProductById as jest.Mock).mockResolvedValue(mockProduct);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders product details from API', async () => {
        render(<ProductDetail />);

        await waitFor(() => {
            expect(getProductById).toHaveBeenCalledWith(mockProduct.id);
        });

        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
        });

    });

    test('redirects to /products if product not found', async () => {
        (getProductById as jest.Mock).mockResolvedValueOnce(null);

        render(<ProductDetail />);

        await waitFor(() => {
            expect(getProductById).toHaveBeenCalledWith(mockProduct.id);
        });

        expect(mockNavigate).toHaveBeenCalledWith('/products');
    });

    test('adds a new comment', async () => {
        render(<ProductDetail />);

        await waitFor(() => {
            expect(getProductById).toHaveBeenCalledWith(mockProduct.id);
            expect(screen.getByText('Comments & Ratings')).toBeInTheDocument();
        });

        const commentsButton = screen.getByText('Comments & Ratings');
        fireEvent.click(commentsButton);

        fireEvent.change(screen.getByPlaceholderText('Write your comment'), {
            target: { value: 'OMG!' },
        });


        const star2 = screen.getByTestId('new-comment-rating-star-2');
        fireEvent.mouseMove(star2, { clientX: 20 });
        fireEvent.click(star2);

        await waitFor(() => {
            const submitButton = screen.getByText('Submit');
            expect(submitButton).not.toBeDisabled();
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText('OMG!')).toBeInTheDocument();
        });
    });

    test('navigates back to products when back button is clicked', async () => {
        render(<ProductDetail />);

        await waitFor(() => {
            expect(getProductById).toHaveBeenCalledWith(mockProduct.id);
        });

        const backButton = screen.getByTestId('back-to-products-button');
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith('/products');
    });
});
