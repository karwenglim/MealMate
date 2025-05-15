// Tremor Card [v1.0.0]

import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cx } from '@/lib/utils/utils';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : 'div';
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          'relative w-full p-6 text-left shadow-xl ',
          // background color
          'bg-white',
          // border color
          '',
          className
        )}
        tremor-id='tremor-raw'
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card, type CardProps };
