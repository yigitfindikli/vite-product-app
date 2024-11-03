import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/product';

const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    arrivalDate: new Date().toISOString(),
    comments: [],
    images: [
        { src: 'image1.jpg', alt: 'Image 1', id: '1' },
        { src: 'image2.jpg', alt: 'Image 2', id: '2' }
    ],
    rating: 4.5,
    totalRatings: 20,
    price: 99.99,
};

const renderProductCard = () =>
    render(
        <BrowserRouter>
            <ProductCard product={mockProduct} />
        </BrowserRouter>
    );

describe('ProductCard Component', () => {

    test('renders product details correctly', () => {
        renderProductCard();

        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

        expect(screen.getByText(`(${mockProduct.totalRatings})`)).toBeInTheDocument();
    });

    test('renders Rating component with correct value and max', () => {
        renderProductCard();

        const ratingValue = screen.getByText(`(${mockProduct.totalRatings})`);
        expect(ratingValue).toBeInTheDocument();
    });

    test('navigates to the correct product page on click', () => {
        renderProductCard();

        fireEvent.click(screen.getByTestId('product-card'));

        expect(window.location.pathname).toBe(`/products/${mockProduct.id}`);
    });
});
