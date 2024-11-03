import React, { useState, useEffect, useCallback, isValidElement, Children } from 'react';
import styles from './TabView.module.css';
import Button from '../Button/Button';

export type TabSize = 'small' | 'medium' | 'large';

interface TabProps {
    /** Unique identifier for the tab */
    id: string;
    /** Text to display in the tab button */
    label: string;
    /** Content to display when tab is active */
    children: React.ReactNode;
    /** Whether the tab is disabled */
    disabled?: boolean;
}

export interface TabViewProps {
    /** Tab components to be rendered */
    children: React.ReactElement<TabProps>[];
    /** ID of the active tab (for controlled usage) */
    activeTabId?: string;
    /** Called when active tab changes */
    onActiveTabChange?: (activeTabId: string) => void;
    /** Additional CSS class name */
    className?: string;
}

export const Tab: React.FC<TabProps> = () => null;


/**
 * TabView provides a way to switch between different views within the same context.
 * It supports both controlled and uncontrolled usage.
 */
export const TabView: React.FC<TabViewProps> = ({
    children,
    activeTabId,
    onActiveTabChange,
    className = '',
}) => {
    const [internalActiveTabId, setInternalActiveTabId] = useState<string | null>(activeTabId || null);

    useEffect(() => {
        if (activeTabId !== undefined) {
            setInternalActiveTabId(activeTabId);
        } else if (internalActiveTabId === null) {
            const firstEnabledTab = React.Children.toArray(children).find(
                (child) => React.isValidElement(child) && !child.props.disabled
            ) as React.ReactElement<TabProps> | undefined;

            if (firstEnabledTab) {
                setInternalActiveTabId(firstEnabledTab.props.id);
            }
        }
    }, [activeTabId, children, internalActiveTabId]);

    const handleTabClick = useCallback(
        (tabId: string) => {
            if (activeTabId !== undefined) {
                onActiveTabChange?.(tabId);
            } else {
                setInternalActiveTabId(tabId);
                onActiveTabChange?.(tabId);
            }
        },
        [activeTabId, onActiveTabChange]
    );

    const currentActiveTabId = activeTabId !== undefined ? activeTabId : internalActiveTabId;

    const tabs = Children.map(children, (child) => {
        if (isValidElement(child) && child.type === Tab) {
            return child as React.ReactElement<TabProps>;
        }
    });

    return (
        <div className={`${styles['tabs-container']} ${className}`}>
            <div role="tablist" aria-label="Tabs" className={styles['tabs__list']}>
                {tabs.map((tab) => (
                    <Button
                        key={tab.props.id}
                        role="tab"
                        className={`${styles['tabs__button']} ${tab.props.id === currentActiveTabId ? styles['active'] : ''}`}
                        aria-selected={tab.props.id === currentActiveTabId}
                        onClick={() => !tab.props.disabled && handleTabClick(tab.props.id)}
                        disabled={tab.props.disabled}
                        layout='plain'
                        type="button"
                        data-active={tab.props.id === currentActiveTabId}
                    >
                        {tab.props.label}
                    </Button>
                ))}
            </div>
            <div role="tabpanel" className={styles['tabs__content']}>
                {tabs.find((tab) => tab.props.id === currentActiveTabId)?.props.children}
            </div>
        </div>
    );
};
