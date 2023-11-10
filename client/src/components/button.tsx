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
      send: [
        'bg-green-300',
        'text-gray-700',
        'font-semibold',
        'ring',
        'border',
        'border-gray-200',
        'ring-gray-50',
        'rounded-md',
        'border-gray-400',
        'hover:bg-green-500',
        'hover:text-gray-800',
      ],
      submit: ['rounded-md', 'bg-slate-900', 'hover:bg-gray-700', 'text-white'],
    },
    size: {
      small: ['text-sm', 'p-1'],
      medium: ['text-base', 'py-2', 'px-4'],
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
