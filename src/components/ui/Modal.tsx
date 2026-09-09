'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-haven-primary/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={clsx(
          'relative w-full bg-haven-surface rounded-haven-lg border border-haven-border shadow-haven-lg overflow-hidden z-10 transition-haven transform',
          maxWidthClasses[maxWidth]
        )}
      >
        {(title || description) && (
          <div className="px-6 py-4 border-b border-haven-border flex items-start justify-between bg-haven-bg/50">
            <div>
              {title && <h3 className="text-base font-bold text-haven-primary">{title}</h3>}
              {description && <p className="text-xs text-haven-text-muted mt-0.5">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-haven-text-muted hover:text-haven-primary p-1 rounded-haven-sm hover:bg-haven-muted transition-haven"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
