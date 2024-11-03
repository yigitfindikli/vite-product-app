import { render, screen } from '@testing-library/react';
import Star from '@/components/Star/Star';

describe('Star Component', () => {
    test('renders without crashing', () => {
        render(<Star id="test-star" filledPercentage={50} />);
        const svgElement = screen.getByTestId('test-star');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders correct gradient with given filled percentage', () => {
        render(<Star id="test-star" filledPercentage={50} />);

        const gradient = screen.getByTestId('starGradient-test-star');
        const stops = gradient.querySelectorAll('stop');

        expect(stops[0]).toHaveAttribute('offset', '50%');
        expect(stops[0]).toHaveAttribute('stop-color', 'var(--star-filled-color)');
        expect(stops[1]).toHaveAttribute('stop-color', 'var(--star-empty-color)');
    });

    test('clamps filledPercentage between 0 and 100', () => {
        render(<Star id="test-star-overflow" filledPercentage={150} />);
        const gradientOverflow = screen.getByTestId('starGradient-test-star-overflow');
        const stopsOverflow = gradientOverflow.querySelectorAll('stop');
        expect(stopsOverflow[0]).toHaveAttribute('offset', '100%');

        render(<Star id="test-star-underflow" filledPercentage={-50} />);
        const gradientUnderflow = screen.getByTestId('starGradient-test-star-underflow');
        const stopsUnderflow = gradientUnderflow.querySelectorAll('stop');
        expect(stopsUnderflow[0]).toHaveAttribute('offset', '0%');
    });
});
