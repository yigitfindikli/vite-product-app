import type { Meta, StoryObj } from '@storybook/react';
import TextInput from '@/components/TextInput/TextInput';

const meta = {
    title: 'Components/TextInput',
    component: TextInput,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A simple text input component with consistent styling.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'tel', 'url'],
            description: 'Type of the input',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input is disabled',
        },
        value: {
            control: 'text',
            description: 'Input value',
        },
    },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
        type: 'text',
    },
};

export const WithValue: Story = {
    args: {
        value: 'Pre-filled value',
        type: 'text',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password...',
    },
};

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter email...',
    },
};

export const Disabled: Story = {
    args: {
        value: 'Disabled input',
        disabled: true,
    },
};