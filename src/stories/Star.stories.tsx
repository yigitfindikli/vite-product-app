import type { Meta, StoryObj } from '@storybook/react';
import Star from '@/components/Star/Star';

/**
 * Star component displays a star shape that can be partially or fully filled.
 * It's commonly used in rating systems to represent scores or ratings.
 */
const meta = {
    title: 'Components/Star',
    component: Star,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable star component that can be partially filled to represent ratings or scores.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        filledPercentage: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'Percentage of the star to be filled (0-100)',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
            },
        },
        id: {
            control: 'text',
            description: 'Unique identifier for the star',
            table: {
                type: { summary: 'string' },
            },
        },
    },
} satisfies Meta<typeof Star>;

export default meta;
type Story = StoryObj<typeof Star>;

/**
 * Empty star (0% filled)
 */
export const Empty: Story = {
    args: {
        filledPercentage: 0,
        id: 'empty-star',
    },
};

/**
 * Fully filled star (100% filled)
 */
export const Full: Story = {
    args: {
        filledPercentage: 100,
        id: 'full-star',
    },
};

/**
 * Half filled star (50% filled)
 */
export const Half: Story = {
    args: {
        filledPercentage: 50,
        id: 'half-star',
    },
};

/**
 * Quarter filled star (25% filled)
 */
export const Quarter: Story = {
    args: {
        filledPercentage: 25,
        id: 'quarter-star',
    },
};

/**
 * Three quarters filled star (75% filled)
 */
export const ThreeQuarters: Story = {
    args: {
        filledPercentage: 75,
        id: 'three-quarters-star',
    },
};

/**
 * Shows how the star handles values outside the valid range
 */
export const InvalidPercentage: Story = {
    args: {
        filledPercentage: 150, // Will be clamped to 100
        id: 'invalid-star',
    },
};

/**
 * Multiple stars with different fill percentages
 */
export const MultipleStars: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '4px' }}>
            <Star filledPercentage={0} id="star-1" />
            <Star filledPercentage={25} id="star-2" />
            <Star filledPercentage={50} id="star-3" />
            <Star filledPercentage={75} id="star-4" />
            <Star filledPercentage={100} id="star-5" />
        </div>
    ),
};

/**
 * Shows stars with different sizes
 */
export const DifferentSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ transform: 'scale(0.75)' }}>
                <Star filledPercentage={100} id="small-star" />
            </div>
            <Star filledPercentage={100} id="medium-star" />
            <div style={{ transform: 'scale(1.5)' }}>
                <Star filledPercentage={100} id="large-star" />
            </div>
        </div>
    ),
};

/**
 * Shows stars with different colors using CSS variables
 */
export const CustomColors: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            gap: '8px',
            '--star-filled-color': '#FF6B6B',
            '--star-empty-color': '#FFE3E3'
        } as React.CSSProperties}>
            <Star filledPercentage={25} id="custom-star-1" />
            <Star filledPercentage={50} id="custom-star-2" />
            <Star filledPercentage={75} id="custom-star-3" />
        </div>
    ),
};