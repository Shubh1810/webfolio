// components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/app/lib/utils';
import styles from './button.module.css';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
}

const buttonVariants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  default: 'px-4 py-2',
  lg: 'px-5 py-3 text-lg',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          buttonVariants[variant],
          sizeVariants[size],
          className || ''
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;