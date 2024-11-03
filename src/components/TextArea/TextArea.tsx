import React, { FC } from 'react';
import styles from './TextArea.module.css';
/**
 * TextArea component provides a multi-line text input field.
 * It extends the native textarea element with consistent styling.
 */

const TextArea: FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
    return <textarea {...props} className={styles.textarea} />;
};

export default TextArea; 