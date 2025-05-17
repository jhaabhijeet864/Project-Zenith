import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    text: 'bg-transparent text-blue-600 hover:bg-gray-50'
  };
  
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '';

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`;

  return (
    <button 
      className={classes} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;