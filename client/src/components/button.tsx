import React, { Ref, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('button', {
  variants: {
    variant: {
      primary: [
        'ring',
        'border',
        'border-gray-200',
        'ring-gray-50',
        'rounded-md',
        'border-gray-400',
      ],
      send: ['bg-black', 'text-white', 'rounded-md', 'hover:text-gray-100'],
      submit: ['rounded-md', 'bg-black', 'hover:bg-gray-700', 'text-white'],
    },
    size: {
      small: ['text-xs', 'p-1'],
      medium: ['text-sm', 'p-1.5'],
    },
  },
  compoundVariants: [
    { variant: 'primary', size: 'medium', class: 'uppercase' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = forwardRef(function Button(
  { className, variant, size, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={button({ variant, size, className })}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
