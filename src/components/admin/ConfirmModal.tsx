'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this operation? This cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center space-y-4">
        <div className={`w-12 h-12 rounded-full ${isDestructive ? 'bg-red-50 text-haven-error' : 'bg-haven-muted text-haven-primary'} flex items-center justify-center mx-auto`}>
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 className="text-base font-bold text-haven-primary">{title}</h3>
          <p className="text-xs text-haven-text-muted mt-1 leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center justify-center gap-2.5 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
