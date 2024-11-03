import { render, screen, fireEvent } from '@testing-library/react';
import Rating from '@/components/Rating/Rating';

jest.mock('@/components/Star/Star', () => {
    return ({ filledPercentage, id }: { filledPercentage: number; id: string }) => (
        <div data-testid={id} data-filled-percentage={filledPercentage}></div>
    );
});

const mockGetBoundingClientRect = (width: number) => ({
    width,
    height: 24,
    top: 0,
    left: 0,
    right: width,
    bottom: 24,
    x: 0,
    y: 0,
    toJSON: () => { },
});

describe('Rating Component', () => {
    const onChangeMock = jest.fn();

    afterEach(() => {
        onChangeMock.mockClear();
    });

    test('renders the correct number of stars', () => {
        render(<Rating id="test-rating" value={3} max={5} />);

        const stars = screen.getAllByLabelText(/Rate \d star/);
        expect(stars.length).toBe(5);
    });

    test('uses default max value when max is not provided', () => {
        render(<Rating id="test-rating" value={3} />);

        const stars = screen.getAllByLabelText(/Rate \d star/);
        expect(stars.length).toBe(5);
    });

    test('renders stars with correct filled percentage based on value', () => {
        render(<Rating id="test-rating" value={3.5} max={5} />);

        const stars = screen.getAllByLabelText(/Rate \d star/);

        expect(stars[0]).toHaveAttribute('aria-label', 'Rate 1 star');
        expect(stars[1]).toHaveAttribute('aria-label', 'Rate 2 star');
        expect(stars[2]).toHaveAttribute('aria-label', 'Rate 3 star');
        expect(screen.getByTestId('test-rating-star-3')).toHaveAttribute('data-filled-percentage', '50');
        expect(screen.getByTestId('test-rating-star-4')).toHaveAttribute('data-filled-percentage', '0');
    });

    test('updates hover value based on mouse position respecting step', () => {
        render(<Rating id="test-rating" value={1} max={5} step={0.5} interactive />);

        const stars = screen.getAllByLabelText(/Rate \d star/);

        stars.forEach(star => {
            star.getBoundingClientRect = jest.fn(() => mockGetBoundingClientRect(24));
        });

        fireEvent.mouseMove(stars[2], { clientX: 12 });
        expect(screen.getByTestId('test-rating-star-2')).toHaveAttribute('data-filled-percentage', '50');

        fireEvent.mouseMove(stars[2], { clientX: 40 });
        expect(screen.getByTestId('test-rating-star-2')).toHaveAttribute('data-filled-percentage', '100');
        fireEvent.mouseLeave(stars[2]);
        expect(screen.getByTestId('test-rating-star-2')).toHaveAttribute('data-filled-percentage', '0');
    });

    test('calls onChange with correct value on click respecting step', () => {
        render(
            <Rating
                id="test-rating"
                value={2.5}
                max={5}
                step={0.5}
                interactive
                onChange={onChangeMock}
            />
        );

        const stars = screen.getAllByLabelText(/Rate \d star/);

        fireEvent.mouseMove(stars[2], { clientX: 20 });
        fireEvent.click(stars[2]);

        expect(onChangeMock).toHaveBeenCalledWith(3);
    });

    test('does not update value on hover or click when interactive is false', () => {
        render(<Rating id="test-rating" value={3} max={5} interactive={false} onChange={onChangeMock} />);

        const stars = screen.getAllByLabelText(/Rate \d star/);

        fireEvent.mouseMove(stars[2], { clientX: 20 });
        fireEvent.click(stars[2]);

        expect(onChangeMock).not.toHaveBeenCalled();
    });

    test('renders stars with correct percentage based on fractional steps', () => {
        render(<Rating id="test-rating" value={3.75} max={5} step={0.25} />);

        expect(screen.getByTestId('test-rating-star-3')).toHaveAttribute('data-filled-percentage', '75');
    });

    test('handles boundary conditions for the step value', () => {
        render(<Rating id="test-rating" value={3} max={5} step={0.5} interactive />);

        const stars = screen.getAllByLabelText(/Rate \d star/);

        stars.forEach(star => {
            star.getBoundingClientRect = jest.fn(() => mockGetBoundingClientRect(24));
        });

        fireEvent.mouseMove(stars[2], { clientX: 12 });
        expect(screen.getByTestId('test-rating-star-2')).toHaveAttribute('data-filled-percentage', '50');

        fireEvent.mouseMove(stars[2], { clientX: 24 });
        expect(screen.getByTestId('test-rating-star-2')).toHaveAttribute('data-filled-percentage', '100');

    });

    test('calls onChange with correct value on Enter key press', () => {
        render(
            <Rating
                id="test-rating"
                value={2.5}
                max={5}
                interactive
                onChange={onChangeMock}
            />
        );

        const stars = screen.getAllByLabelText(/Rate \d star/);

        fireEvent.keyDown(stars[2], { key: 'Enter' });

        expect(onChangeMock).toHaveBeenCalledWith(3);
    });

    test('calls onChange with correct value on Space key press', () => {
        render(
            <Rating
                id="test-rating"
                value={2.5}
                max={5}
                interactive
                onChange={onChangeMock}
            />
        );

        const stars = screen.getAllByLabelText(/Rate \d star/);

        fireEvent.keyDown(stars[2], { key: ' ' });

        expect(onChangeMock).toHaveBeenCalledWith(3);
    });

    test('tab navigates through stars when interactive', () => {
        render(
            <Rating
                id="test-rating"
                value={2.5}
                max={5}
                interactive
                onChange={onChangeMock}
            />
        );

        const stars = screen.getAllByLabelText(/Rate \d star/);

        stars.forEach((star) => {
            expect(star).toHaveAttribute('tabIndex', '0');
        });
    });

    test('does not call onChange on keyboard interaction when interactive is false', () => {
        render(
            <Rating
                id="test-rating"
                value={2.5}
                max={5}
                interactive={false}
                onChange={onChangeMock}
            />
        );

        const stars = screen.getAllByLabelText(/Rate \d star/);

        fireEvent.keyDown(stars[2], { key: 'Enter' });
        fireEvent.keyDown(stars[2], { key: ' ' });

        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
