import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/Button/Button';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile button component that supports various styles, layouts, and states.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger'],
            description: 'The color variant of the button',
            table: {
                defaultValue: { summary: 'primary' },
            },
        },
        layout: {
            control: 'select',
            options: ['solid', 'outlined', 'plain'],
            description: 'The visual style of the button',
            table: {
                defaultValue: { summary: 'solid' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
        icon: {
            control: false,
            description: 'Icon element to display before the button text',
        },
        circle: {
            control: 'boolean',
            description: 'Whether to render the button in a circular shape (only applies to icon-only buttons)',
        },
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimarySolid: Story = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
        layout: 'solid',
    },
};

export const SecondarySolid: Story = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
        layout: 'solid',
    },
};

export const DangerSolid: Story = {
    args: {
        children: 'Danger Button',
        variant: 'danger',
        layout: 'solid',
    },
};

export const PrimaryOutlined: Story = {
    args: {
        children: 'Primary Outlined',
        variant: 'primary',
        layout: 'outlined',
    },
};

export const SecondaryOutlined: Story = {
    args: {
        children: 'Secondary Outlined',
        variant: 'secondary',
        layout: 'outlined',
    },
};

export const DangerOutlined: Story = {
    args: {
        children: 'Danger Outlined',
        variant: 'danger',
        layout: 'outlined',
    },
};

// Variants with Plain Layout
export const PrimaryPlain: Story = {
    args: {
        children: 'Primary Plain',
        variant: 'primary',
        layout: 'plain',
    },
};

export const SecondaryPlain: Story = {
    args: {
        children: 'Secondary Plain',
        variant: 'secondary',
        layout: 'plain',
    },
};

export const DangerPlain: Story = {
    args: {
        children: 'Danger Plain',
        variant: 'danger',
        layout: 'plain',
    },
};

export const WithLeadingIcon: Story = {
    args: {
        children: 'With Icon',
        variant: 'primary',
        icon: <CheckIcon style={{ width: '1rem', height: '1rem' }} />,
    },
};

export const IconOnlyCircular: Story = {
    args: {
        icon: <CheckIcon style={{ width: '1rem', height: '1rem' }} />,
        circle: true,
        variant: 'primary',
    },
};

export const IconOnlySquare: Story = {
    args: {
        icon: <CheckIcon style={{ width: '1rem', height: '1rem' }} />,
        variant: 'primary',
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
};

export const DisabledWithIcon: Story = {
    args: {
        children: 'Disabled with Icon',
        disabled: true,
        style: { minWidth: '8rem' },
        icon: <CheckIcon style={{ width: '1rem', height: '1rem' }} />,
    },
};

export const SubmitButton: Story = {
    args: {
        children: 'Submit',
        variant: 'primary',
        icon: <CheckIcon style={{ width: '1rem', height: '1rem' }} />,
        type: 'submit',
    },
};

export const CancelButton: Story = {
    args: {
        children: 'Cancel',
        variant: 'secondary',
        layout: 'outlined',
    },
};

export const DeleteButton: Story = {
    args: {
        children: 'Delete',
        variant: 'danger',
        icon: <XMarkIcon style={{ width: '1rem', height: '1rem' }} />,
    },
};

export const ButtonGroupExample: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="primary">Save</Button>
            <Button variant="secondary" layout="outlined">Cancel</Button>
        </div>
    ),
};

export const CustomClassName: Story = {
    args: {
        children: 'Custom Style',
        className: 'custom-button-class',
    },
};

export const IconWithChildren: Story = {
    args: {
        children: (
            <>
                <CheckIcon style={{ width: '1rem', height: '1rem' }} />
                <strong>Save</strong>
            </>
        ),
    },
};