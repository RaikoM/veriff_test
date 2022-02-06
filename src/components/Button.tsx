import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { joinClassNames } from '../utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  // Add styles if button is selected in form
  selected?: boolean;
}

const Button = ({ children, selected, type, className = '', ...rest }: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={joinClassNames(
        'font-medium text-button tracking-button min-w-20 text-center select-none border border-solid border-primary rounded relative h-10 py-0 px-4 cursor-pointer',
        'disabled:bg-white disabled:text-lightblue disabled:cursor-not-allowed disabled:border-lightblue',
        'enabled:focus:brightness-110 enabled:hover:brightness-110',
        selected ? 'bg-primary text-white disabled:bg-lightgrey' : 'bg-white text-primary',
        // Add classname to be able to add/override styles if needed
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
