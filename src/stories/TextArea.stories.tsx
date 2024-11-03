import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '@/components/TextArea/TextArea';

const meta = {
    title: 'Components/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A simple textarea component with consistent styling.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the textarea is disabled',
        },
        rows: {
            control: { type: 'number', min: 1 },
            description: 'Number of visible text lines',
        },
        value: {
            control: 'text',
            description: 'Textarea content',
        },
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        placeholder: 'Enter your message here...',
        rows: 4,
    },
};

export const WithValue: Story = {
    args: {
        value: 'This is a pre-filled textarea',
        rows: 4,
    },
};

export const Disabled: Story = {
    args: {
        value: 'This textarea is disabled',
        disabled: true,
        rows: 4,
    },
};