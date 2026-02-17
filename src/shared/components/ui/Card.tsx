
import React, { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

// Inline styles for simplicity for specialized unique component like Card which is mostly structural
// Using CSS modules is better, but doing inline for speed on this one unless requested otherwise? 
// No, I should stick to consistency. I'll use a module.
// Actually, let's just use a simple robust inline style set for the card base or create a module.
// I will create a module.
import styles from './Card.module.css';

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(styles.card, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
