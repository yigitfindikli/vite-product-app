import React, { FC, useState, useMemo, useCallback } from 'react';
import styles from './Rating.module.css';
import Star from '@/components/Star/Star';

interface RatingProps {
    id: string;
    value: number;
    max?: number;
    interactive?: boolean;
    step?: number;
    onChange?: (newRating: number) => void;
}

const Rating: FC<RatingProps> = ({
    id,
    value,
    max = 5,
    interactive = false,
    step = 0.5,
    onChange,
}) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const normalizedStep = useMemo(() => Math.min(Math.max(step, 0.01), 1), [step]);

    const getFilledPercentage = useCallback((index: number): number => {
        const rating = hoverValue !== null ? hoverValue : value;
        if (index + 1 <= rating) return 100;
        if (index < rating && index + 1 > rating) return (rating - index) * 100;
        return 0;
    }, [hoverValue, value]);

    const roundToStep = useCallback((rating: number): number => {
        return Math.round(rating / normalizedStep) * normalizedStep;
    }, [normalizedStep]);

    const handleMouseMove = useCallback((index: number) => (e: React.MouseEvent) => {
        if (!interactive) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const filledPercentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        const rawHoverValue = index + filledPercentage / 100;

        setHoverValue(roundToStep(rawHoverValue));
    }, [interactive, roundToStep]);

    const handleMouseLeave = useCallback(() => {
        if (interactive) setHoverValue(null);
    }, [interactive]);

    const handleClick = useCallback(() => {
        if (interactive && hoverValue !== null && onChange) {
            onChange(parseFloat(roundToStep(hoverValue).toFixed(2)));
        }
    }, [interactive, roundToStep, hoverValue, onChange]);

    const handleKeyDown = useCallback((index: number) => (e: React.KeyboardEvent) => {
        if (!interactive) return;

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setHoverValue(roundToStep(index + 1));
            onChange?.(index + 1);
        }
    }, [interactive, roundToStep, onChange]);

    const stars = useMemo(() => {
        return Array.from({ length: max }, (_, index) => {
            const filledPercentage = getFilledPercentage(index);
            const starId = `${id}-star-${index}`;

            return (
                <span
                    key={index}
                    onMouseMove={handleMouseMove(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown(index)}
                    tabIndex={interactive ? 0 : -1}
                    role={interactive ? 'button' : 'presentation'}
                    aria-pressed={interactive && hoverValue === index + 1}
                    className={`${styles['rating-star']} ${interactive ? styles['rating-star--interactive'] : ''}`}
                    style={{
                        cursor: interactive ? 'pointer' : 'default',
                    }}
                    aria-label={`Rate ${index + 1} star`}
                >
                    <Star id={starId} filledPercentage={filledPercentage} />
                </span>
            );
        });
    }, [max, id, getFilledPercentage, handleMouseMove, handleMouseLeave, interactive, handleClick, handleKeyDown, hoverValue]);

    return (
        <div
            role="img"
            aria-label={`Rating: ${value} out of ${max}`}
            aria-live='polite'
            className={styles['rating-container']}
            id={`${id}-rating`}
            data-testid={`${id}-rating`}
        >
            {stars}
        </div>
    );
};

export default Rating;
