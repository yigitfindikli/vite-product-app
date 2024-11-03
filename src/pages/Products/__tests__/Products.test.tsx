import { render, screen, waitFor } from '@testing-library/react';
import Products from '../Products';
import { getProducts } from '@/services/productService';
import { useNavigate } from 'react-router-dom';

jest.mock('@/services/productService');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockProducts = [
    {
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
        totalRatings: 2
    },
    {
        id: 'test-air-max-1',
        name: 'Test Air Max 1',
        price: 200,
        rating: 3.5,
        images: [
            { id: 'test-air-max-1-img-1', src: '/images/products/test-3.png', alt: 'Test Image 3' },
            { id: 'test-air-max-1-img-2', src: '/images/products/test-4.png', alt: 'Test Image 4' }
        ],
        description: 'Test description for Air Max 1',
        arrivalDate: '2024-10-15',
        comments: [
            { id: 'test-comment-3', username: 'TestUser3', comment: 'Good!', rating: 4 },
            { id: 'test-comment-4', username: 'TestUser4', comment: 'Okay', rating: 3 }
        ],
        totalRatings: 2
    }
];

describe('Products Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (getProducts as jest.Mock).mockResolvedValue(mockProducts);
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders products from API', async () => {
        render(<Products />);

        await waitFor(() => {
            expect(getProducts).toHaveBeenCalled();
        });

        const productCards = screen.getAllByTestId('product-card');
        expect(productCards).toHaveLength(mockProducts.length);
    });

    test('renders product details correctly', async () => {
        render(<Products />);

        await waitFor(() => {
            expect(getProducts).toHaveBeenCalled();
        });

        mockProducts.forEach((product) => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        });
    });

    test('navigates to product detail page on click', async () => {
        render(<Products />);

        await waitFor(() => {
            expect(getProducts).toHaveBeenCalled();
        });

        const firstProductCard = screen.getAllByTestId('product-card')[0];
        firstProductCard.click();

        expect(mockNavigate).toHaveBeenCalledWith(`/products/${mockProducts[0].id}`);
    });
});
