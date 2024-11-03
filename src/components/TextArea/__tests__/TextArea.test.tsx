import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '@/components/TextArea/TextArea';

describe('TextArea Component', () => {
    test('renders with placeholder and value', () => {
        render(<TextArea placeholder="Enter text" value="Hello" readOnly />);

        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toHaveValue('Hello');
    });

    test('calls onChange with new value when textarea changes', () => {
        const handleChange = jest.fn();
        render(<TextArea placeholder="Enter text" value="" onChange={(e) => handleChange(e.target.value)} />);

        const textarea = screen.getByPlaceholderText('Enter text');
        fireEvent.change(textarea, { target: { value: 'New Value' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('New Value');
    });

    test('applies additional props correctly', () => {
        render(<TextArea placeholder="Enter text" rows={5} maxLength={50} disabled />);

        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toHaveAttribute('rows', '5');
        expect(textarea).toHaveAttribute('maxlength', '50');
        expect(textarea).toBeDisabled();
    });
});
