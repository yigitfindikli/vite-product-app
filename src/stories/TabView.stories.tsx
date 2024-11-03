import type { Meta, StoryObj } from '@storybook/react';
import { TabView, Tab } from '@/components/TabView/TabView';
import { useState } from 'react';
import Button from '@/components/Button/Button';

/**
 * TabView component provides a way to organize content into selectable tabs.
 * It supports both controlled and uncontrolled usage.
 */
const meta = {
    title: 'Components/TabView',
    component: TabView,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A tab panel component that allows switching between different content sections.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        activeTabId: {
            control: 'text',
            description: 'ID of the currently active tab',
        },
        onActiveTabChange: {
            action: 'tab changed',
            description: 'Called when active tab changes',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
        },
    },
} satisfies Meta<typeof TabView>;

export default meta;
type Story = StoryObj<typeof TabView>;

/**
 * Default uncontrolled usage
 */
export const Default: Story = {
    render: () => (
        <TabView>
            <Tab id="tab1" label="First Tab">
                <div style={{ padding: '1rem' }}>
                    Content for first tab
                </div>
            </Tab>
            <Tab id="tab2" label="Second Tab">
                <div style={{ padding: '1rem' }}>
                    Content for second tab
                </div>
            </Tab>
            <Tab id="tab3" label="Disabled Tab" disabled>
                <div style={{ padding: '1rem' }}>
                    This content won't be accessible
                </div>
            </Tab>
        </TabView>
    ),
};

/**
 * Controlled example with custom active tab
 */
export const Controlled: Story = {
    render: function ControlledTabs() {
        const [activeTab, setActiveTab] = useState('tab2');

        return (
            <>
                <Button onClick={() => setActiveTab('tab1')}>Set tab 1</Button>
                <Button onClick={() => setActiveTab('tab2')}>Set tab 2</Button>
                <TabView
                    activeTabId={activeTab}
                    onActiveTabChange={setActiveTab}
                >
                    <Tab id="tab1" label="First Tab">
                        <div style={{ padding: '1rem' }}>
                            Content for first tab
                        </div>
                    </Tab>
                    <Tab id="tab2" label="Second Tab">
                        <div style={{ padding: '1rem' }}>
                            Content for second tab
                        </div>
                    </Tab>
                </TabView>
            </>
        );
    },
};
