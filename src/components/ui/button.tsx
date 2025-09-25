import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center disabled:pointer-events-none disabled:opacity-50 outline-none transition-all duration-300 ease-in-out cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'rounded-[100px] p-2 gap-2 bg-primary-300 hover:bg-primary-300/90 font-bold text-sm md:text-md text-neutral-25',
        delete:
          'rounded-[100px] p-2 gap-2 bg-accent-red hover:bg-accent-red/90 font-bold text-sm md:text-md text-neutral-25',
      },
      size: {
        default: 'h-11 md:h-12 w-full',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
