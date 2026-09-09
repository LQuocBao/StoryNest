import React from 'react';
import clsx from 'clsx';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-haven-sm tracking-wide select-none';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantStyles = {
    default: 'bg-haven-muted text-haven-text-muted border border-haven-border/60',
    primary: 'bg-haven-primary/10 text-haven-primary font-semibold',
    accent: 'bg-haven-accent/15 text-amber-800 font-semibold border border-haven-accent/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-red-50 text-haven-error border border-red-200',
    outline: 'bg-transparent text-haven-text-muted border border-haven-border',
  };

  return (
    <span className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {children}
    </span>
  );
};
