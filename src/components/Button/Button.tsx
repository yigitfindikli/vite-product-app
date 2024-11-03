import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.css';

/** Defines the color variant of the button */
type ButtonVariant = 'primary' | 'secondary' | 'danger';

/** Defines the button's layout style */
type ButtonLayout = 'solid' | 'outlined' | 'plain';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Sets the color variant of the button */
    variant?: ButtonVariant;
    /** Disables the button */
    disabled?: boolean;
    /** Adds an optional icon before the button label */
    icon?: React.ReactNode;
    /** If true, makes the button a circular icon-only button */
    circle?: boolean;
    /** Sets the button's layout style */
    layout?: ButtonLayout;
}

/**
 * `Button` is a versatile component used for triggering actions. It supports various styles and layouts, with optional icons.
 */
const Button: FC<ButtonProps> = ({
    children,
    variant = 'primary',
    disabled = false,
    icon,
    circle = false,
    layout = 'solid',
    ...props
}) => {
    const isIconOnly = icon && !children;

    return (
        <button
            type="button"
            {...props}
            className={`${styles.button} ${styles[`button--${layout}`]} ${styles[`button--${variant}`]} ${isIconOnly ? styles['button--icon-only'] : styles['button--text']} ${circle && isIconOnly ? styles['button--circle'] : ''} ${props.className}`}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {icon}
            {children}
        </button>
    );
};

export default Button;
