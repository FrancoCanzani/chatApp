import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, Ref } from 'react';

const button = cva('button', {
  variants: {
    variant: {
      primary: [
        'ring',
        'border',
        'border-gray-200200',
        'ring-gray-50',
        'rounded-md',
        'border-gray-200400',
      ],
      send: ['bg-black', 'text-white', 'rounded-md', 'hover:text-gray-100'],
      submit: ['bg-black', 'hover:bg-gray-900', 'text-white', 'min-w-[4rem]'],
    },
    size: {
      small: ['text-xs', 'p-1'],
      medium: ['text-sm', 'p-2'],
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
