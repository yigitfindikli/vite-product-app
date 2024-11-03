import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabView, Tab } from '@/components/TabView/TabView';

describe('TabView Component', () => {

    const renderTabs = (props = {}) => {
        return render(
            <TabView {...props}>
                <Tab id="tab1" label="Tab 1">
                    <div>Content 1</div>
                </Tab>
                <Tab id="tab2" label="Tab 2">
                    <div>Content 2</div>
                </Tab>
                <Tab id="tab3" label="Tab 3" disabled>
                    <div>Content 3</div>
                </Tab>
            </TabView>
        );
    };

    test('renders TabView component with provided tabs', () => {
        renderTabs();
        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
        expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    test('sets the first enabled tab as active by default if activeTabId is not provided', () => {
        renderTabs();
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
    });

    test('updates internal active tab when clicking on a tab in uncontrolled mode', () => {
        renderTabs();
        const tab2 = screen.getByText('Tab 2');
        fireEvent.click(tab2);
        expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    test('calls onActiveTabChange with correct tabId in controlled mode', () => {
        const onActiveTabChange = jest.fn();
        renderTabs({ activeTabId: 'tab1', onActiveTabChange });
        const tab2 = screen.getByText('Tab 2');
        fireEvent.click(tab2);
        expect(onActiveTabChange).toHaveBeenCalledWith('tab2');
    });

    test('calls onActiveTabChange when clicking a tab in uncontrolled mode', () => {
        const onActiveTabChange = jest.fn();
        renderTabs({ onActiveTabChange });
        const tab2 = screen.getByText('Tab 2');
        fireEvent.click(tab2);
        expect(onActiveTabChange).toHaveBeenCalledWith('tab2');
    });

    test('renders disabled tab correctly and does not trigger onActiveTabChange when clicked', () => {
        const onActiveTabChange = jest.fn();
        renderTabs({ onActiveTabChange });
        const disabledTab = screen.getByText('Tab 3');
        expect(disabledTab).toBeDisabled();
        fireEvent.click(disabledTab);
        expect(onActiveTabChange).not.toHaveBeenCalled();
    });

    test('renders correctly when controlled prop changes dynamically', () => {
        const { rerender } = renderTabs({ activeTabId: 'tab1' });

        rerender(
            <TabView activeTabId="tab2">
                <Tab id="tab1" label="Tab 1">
                    <div>Content 1</div>
                </Tab>
                <Tab id="tab2" label="Tab 2">
                    <div>Content 2</div>
                </Tab>
                <Tab id="tab3" label="Tab 3" disabled>
                    <div>Content 3</div>
                </Tab>
            </TabView>
        );

        expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    test('ignores non-Tab children elements', () => {
        render(
            <TabView>
                <Tab id="tab1" label="Tab 1">
                    <div>Content 1</div>
                </Tab>
                <div>Invalid Child</div>
            </TabView>
        );

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.queryByText('Invalid Child')).not.toBeInTheDocument();
    });

    test('should not work without TabView', () => {
        render(
            <Tab id="tab1" label="Tab 1">
                <div>Content 1</div>
            </Tab>
        );

        const content = screen.queryByText('Content 1');
        expect(content).toBeFalsy();
    });
});
