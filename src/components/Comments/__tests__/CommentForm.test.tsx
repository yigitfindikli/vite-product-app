import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentForm } from '../CommentForm';
describe('CommentForm Component', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders rating and comment input fields', () => {
        render(<CommentForm onSubmit={mockOnSubmit} />);
        expect(screen.getByText('Your Rating:')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Write your comment')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    });

    test('calls onSubmit with correct data when form is submitted', () => {
        render(<CommentForm onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByPlaceholderText('Write your comment'), {
            target: { value: 'Great product!' },
        });

        const stars = screen.getAllByLabelText(/Rate \d star/);
        fireEvent.mouseMove(stars[3], { clientX: 20 });
        fireEvent.click(stars[3]);

        const submitButton = screen.getByText('Submit');
        expect(submitButton).not.toBeDisabled();

        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            comment: 'Great product!',
            rating: 4,
        });
    });
});
