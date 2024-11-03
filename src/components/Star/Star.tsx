import { FC, useMemo } from 'react';

interface StarProps {
    /** Percentage of the star to be filled (0-100) */
    filledPercentage: number;
    /** Unique identifier for the star */
    id: string;
}


/**
 * Star component displays a star shape that can be partially or fully filled.
 * It uses CSS variables for colors:
 * - --star-filled-color: Color of the filled portion
 * - --star-empty-color: Color of the empty portion
 * 
 */
const Star: FC<StarProps> = ({ filledPercentage, id }) => {
    const clampedPercentage = useMemo(() => Math.min(100, Math.max(0, filledPercentage)), [filledPercentage]);

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id={id}
            data-testid={id}
        >
            <defs>
                <linearGradient id={`starGradient-${id}`} data-testid={`starGradient-${id}`}>
                    <stop offset={`${clampedPercentage}%`} stopColor="var(--star-filled-color)" />
                    <stop stopColor="var(--star-empty-color)" />
                </linearGradient>
            </defs>
            <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={`url(#starGradient-${id})`}
            />
        </svg>
    );
};

export default Star;
