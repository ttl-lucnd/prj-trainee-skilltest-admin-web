import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { LoadingCircleIcon } from '../icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-body-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary-2 text-white hover:bg-main-secondary-2 disabled:bg-primary-3',
        secondary: 'bg-primary-4 text-primary-2 hover:bg-grey-1 disabled:text-primary-3',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-textDefaultColor bg-white hover:bg-accent hover:text-accent-foreground',
        primary:
          'bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary/80',
        ghost: 'hover:bg-primary-4',
        link: 'text-primary underline-offset-4 hover:underline',
        tertiary:
          'bg-secondary-2 text-primary-2 hover:bg-secondary-3 disabled:text-primary-4',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sx: 'px-[8px] py-[5px]',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-12 rounded-md px-10 text-base font-semibold',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {props.children}
        {loading && <LoadingCircleIcon className="animate-spin" />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
