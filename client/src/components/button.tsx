import React, { Ref, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('button', {
  variants: {
    variant: {
      primary: [
        'bg-gray-200',
        'text-black',
        'rounded-lg',
        'border-transparent',
        'hover:bg-gray-300',
      ],
      secondary: [
        'bg-white',
        'text-gray-800',
        'border-gray-400',
        'hover:bg-gray-100',
      ],
      submit: ['rounded-lg', 'bg-slate-900', 'hover:bg-gray-700', 'text-white'],
    },
    size: {
      small: ['text-sm', 'p-2'],
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
