
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
      <div className="bg-gloov-card border border-gloov-border rounded-xl w-full max-w-sm shadow-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button 
             onClick={onClose}
             className="flex-1 py-2 border border-gloov-border rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
             onClick={onConfirm}
             className="flex-1 py-2 bg-gloov-teal text-black font-semibold rounded-lg hover:bg-gloov-tealDark transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
