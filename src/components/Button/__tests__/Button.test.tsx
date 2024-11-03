import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
    test('renders the button with provided text', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText(/click me/i)).toBeInTheDocument();
    });

    test('applies the correct variant', () => {
        render(<Button variant="secondary">Styled Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('button--secondary');
    });

    test('disables the button when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    test('calls onClick when clicked and not disabled or loading', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        fireEvent.click(screen.getByText(/click me/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when button is disabled or loading', () => {
        const handleClick = jest.fn();

        render(<Button disabled={true} onClick={handleClick}>Disabled Button</Button>);
        fireEvent.click(screen.getByText(/disabled button/i));
        expect(handleClick).not.toHaveBeenCalled();
    });

});
