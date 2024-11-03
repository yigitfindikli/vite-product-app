import React, { FC } from 'react';
import styles from './TextInput.module.css';

/**
 * TextInput component provides a single-line text input field.
 * It extends the native input element with consistent styling.
 */

const TextInput: FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return <input {...props} className={styles.input} />;
};

export default TextInput; 