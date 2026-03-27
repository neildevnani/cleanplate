import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300',
          variant === 'glass' && [
            'bg-glass-gradient backdrop-blur-xl',
            'border border-white/10',
            'shadow-glass',
          ],
          hover && 'hover:bg-glass-hover hover:shadow-glass hover:scale-[1.02]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
