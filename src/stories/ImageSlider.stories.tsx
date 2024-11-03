import type { Meta, StoryObj } from '@storybook/react';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

/**
 * ImageSlider component provides a flexible and accessible way to display a collection of images.
 * Features include auto-play, circular navigation, hover controls, and customizable navigation modes.
 */
const meta = {
    title: 'Components/ImageSlider',
    component: ImageSlider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile image slider component with auto-play and navigation features.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        autoPlay: {
            description: 'Enables automatic sliding',
            defaultValue: true,
        },
        circular: {
            description: 'Enables infinite circular navigation',
            defaultValue: true,
        },
        autoSlideInterval: {
            description: 'Interval between auto-slides in milliseconds',
            defaultValue: 3000,
        },
        navigationMode: {
            options: ['not-visible', 'visible', 'visible-on-hover'],
            description: 'Controls navigation buttons visibility',
            defaultValue: 'visible',
        },
        autoPlayOnHover: {
            description: 'Enables auto-play only on hover',
            defaultValue: false,
        },
    },
} satisfies Meta<typeof ImageSlider>;

export default meta;
type Story = StoryObj<typeof ImageSlider>;

const mockImages = [
    { src: 'https://placehold.co/600x400/FF6B6B/FFFFFF', alt: 'Red slide', id: '1' },
    { src: 'https://placehold.co/600x400/4ECDC4/FFFFFF', alt: 'Turquoise slide', id: '2' },
    { src: 'https://placehold.co/600x400/45B7D1/FFFFFF', alt: 'Blue slide', id: '3' },
    { src: 'https://placehold.co/600x400/96CEB4/FFFFFF', alt: 'Green slide', id: '4' },
];

/**
 * Default example
 */
export const Default: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <ImageSlider
                id="image-slider"
                images={mockImages}
            />
        </div>
    ),
};

/**
 * Manual Navigation example with visible controls
 */
export const ManualNavigation: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <ImageSlider
                id="image-slider-manual-navigation"
                images={mockImages}
                autoPlay={false}
                navigationMode="visible"
            />
        </div>
    ),
};

/**
 * Manual Navigation with hover controls
 */
export const ManualNavigationWithHoverControls: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <ImageSlider
                id="image-slider-auto-play-with-hover-controls"
                images={mockImages}
                autoPlay={false}
                navigationMode="visible-on-hover"
            />
        </div>
    ),
};

/**
 * Non-circular navigation
 */
export const NonCircular: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <ImageSlider
                id="image-slider-non-circular"
                images={mockImages}
                circular={false}
                navigationMode="visible"
                autoPlay={false}
            />
        </div>
    ),
};

/**
 * Auto-play on hover only
 */
export const AutoPlayOnHoverOnly: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <ImageSlider
                id="image-slider-auto-play-on-hover-only"
                images={mockImages}
                autoPlayOnHover={true}
                autoPlay={false}
                navigationMode="not-visible"
                autoSlideInterval={1500}
            />
        </div>
    ),
};



