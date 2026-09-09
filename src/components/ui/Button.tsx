import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-haven-md transition-haven focus:outline-none focus:ring-2 focus:ring-haven-accent focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-haven-primary text-white hover:bg-haven-primary-dark shadow-haven-sm active:scale-[0.98]',
    secondary: 'bg-haven-muted text-haven-text hover:bg-haven-border/60 border border-haven-border',
    accent: 'bg-haven-accent text-white hover:bg-haven-accent-hover shadow-haven-sm active:scale-[0.98]',
    outline: 'bg-transparent text-haven-primary border border-haven-border hover:bg-haven-muted hover:border-haven-primary/30',
    ghost: 'bg-transparent text-haven-text hover:bg-haven-muted',
    danger: 'bg-haven-error text-white hover:bg-red-700 shadow-haven-sm',
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
