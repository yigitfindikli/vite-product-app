import type { Meta, StoryObj } from '@storybook/react';
import Rating from '@/components/Rating/Rating';
import { useState } from 'react';

/**
 * Rating component provides a star-based rating system that can be 
 * either interactive or display-only.
 */
const meta = {
    title: 'Components/Rating',
    component: Rating,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile rating component that displays star ratings and optionally allows user interaction.
It supports fractional ratings, custom step sizes, and keyboard navigation.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the rating component',
            table: {
                type: { summary: 'string' },
            },
        },
        value: {
            control: { type: 'number', min: 0, max: 5, step: 0.1 },
            description: 'Current rating value',
        },
        max: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Maximum rating value',
            table: {
                defaultValue: { summary: '5' },
            },
        },
        interactive: {
            control: 'boolean',
            description: 'Whether the rating can be changed by user interaction',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        step: {
            control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
            description: 'Step size for rating changes',
            table: {
                defaultValue: { summary: '0.5' },
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback function when rating changes',
        },
    },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof Rating>;

/**
 * Basic read-only rating display
 */
export const ReadOnly: Story = {
    args: {
        id: 'readonly-rating',
        value: 3.5,
        interactive: false,
    },
};

/**
 * Rating with custom step size
 */
export const CustomStep: Story = {
    args: {
        id: 'custom-step-rating',
        value: 3.3,
        step: 0.1,
    },
};

/**
 * Shows different rating values
 */
export const RatingValues: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Rating id="rating-0" value={0} />
            <Rating id="rating-1" value={1} />
            <Rating id="rating-2.5" value={2.5} />
            <Rating id="rating-3.7" value={3.7} />
            <Rating id="rating-5" value={5} />
        </div>
    ),
};

/**
 * Interactive example
 */
export const Interactive: Story = {
    render: function ControlledRatingExample() {
        const [value, setValue] = useState(2.5);
        return (
            <div>
                <Rating
                    id="interactive-rating"
                    value={value}
                    interactive
                    onChange={setValue}
                />
                <div style={{ marginTop: '1rem' }}>
                    Current value: {value}
                </div>
            </div>
        );
    },
};

/**
 * Interactive example
 */
export const InteractiveWithStep: Story = {
    render: function ControlledRatingExample() {
        const [value, setValue] = useState(2.79);
        return (
            <div>
                <Rating
                    id="interactive-rating-step"
                    value={value}
                    interactive
                    step={0.01}
                    onChange={setValue}
                />
                <div style={{ marginTop: '1rem' }}>
                    Current value: {value}
                </div>
            </div>
        );
    },
};


/**
 * Shows custom styling using CSS variables
 */
export const CustomStyling: Story = {
    render: () => (
        <div style={{
            '--star-filled-color': '#FF6B6B',
            '--star-empty-color': '#FFE3E3',
        } as React.CSSProperties}>
            <Rating id="custom-styled-rating" value={3.5} />
        </div>
    ),
};

/**
 * Shows different sizes of rating
 */
export const DifferentSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ transform: 'scale(0.75)' }}>
                <Rating id="small-rating" value={4} />
            </div>
            <Rating id="medium-rating" value={4} />
            <div style={{ transform: 'scale(1.5)' }}>
                <Rating id="large-rating" value={4} />
            </div>
        </div>
    ),
};