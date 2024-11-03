import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '@/components/TextInput/TextInput';

describe('TextInput Component', () => {
    test('renders with placeholder and value', () => {
        render(<TextInput placeholder="Enter text" value="Hello" readOnly />);

        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveValue('Hello');
    });

    test('calls onChange with new value when input changes', () => {
        const handleChange = jest.fn();
        render(<TextInput placeholder="Enter text" value="" onChange={(e) => handleChange(e.target.value)} />);

        const input = screen.getByPlaceholderText('Enter text');
        fireEvent.change(input, { target: { value: 'New Value' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('New Value');
    });

    test('applies additional props correctly', () => {
        render(<TextInput placeholder="Enter text" maxLength={10} disabled />);

        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveAttribute('maxlength', '10');
        expect(input).toBeDisabled();
    });
});
