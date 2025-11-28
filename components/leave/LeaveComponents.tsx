
import React, { useState } from 'react';
import { LeaveRequest, Employee } from '../../services/mockAttendanceData';
import { X, Check, AlertCircle, Calendar, User } from 'lucide-react';
import StatusBadge from '../StatusBadge';

// --- Confirm Action Modal ---
interface ConfirmActionModalProps {
  isOpen: boolean;
  action: 'Approve' | 'Reject';
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({ isOpen, action, onConfirm, onClose }) => {
  if (!isOpen) return null;
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
      <div className="bg-gloov-card border border-gloov-border rounded-xl w-full max-w-sm shadow-2xl p-6">
        <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${action === 'Reject' ? 'text-red-400' : 'text-gloov-teal'}`}>
          {action === 'Reject' ? <AlertCircle size={20} /> : <Check size={20} />}
          Confirm {action}
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to <strong>{action.toLowerCase()}</strong> this request? 
          This action will be logged.
        </p>
        
        <div className="flex gap-3">
          <button 
             onClick={onClose}
             className="flex-1 py-2 border border-gloov-border rounded-lg text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button 
             onClick={onConfirm}
             className={`flex-1 py-2 rounded-lg font-semibold text-white ${action === 'Reject' ? 'bg-red-600 hover:bg-red-700' : 'bg-gloov-teal hover:bg-gloov-tealDark text-black'}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Leave List Item ---
export const LeaveRequestRow: React.FC<{ 
    request: LeaveRequest; 
    employee?: Employee; 
    onClick: () => void 
}> = ({ request, employee, onClick }) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-4 bg-gloov-card border border-gloov-border rounded-lg hover:border-gloov-teal/50 cursor-pointer transition-all group"
    >
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                request.type === 'Sick' ? 'bg-red-900/20 text-red-400' : 
                request.type === 'Vacation' ? 'bg-blue-900/20 text-blue-400' : 'bg-purple-900/20 text-purple-400'
            }`}>
                {request.type.charAt(0)}
            </div>
            <div>
                <p className="text-sm font-medium text-white group-hover:text-gloov-teal transition-colors">
                    {employee?.name || 'Unknown'}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{request.type}</span>
                    <span>•</span>
                    <span>{new Date(request.fromDate).toLocaleDateString()} - {new Date(request.toDate).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
        <StatusBadge status={request.status} />
    </div>
);

// --- Leave Request Drawer ---
interface LeaveRequestDrawerProps {
    request: LeaveRequest | null;
    employee: Employee | undefined;
    onClose: () => void;
    onAction: (action: 'Approve' | 'Reject') => void;
}

export const LeaveRequestDrawer: React.FC<LeaveRequestDrawerProps> = ({ request, employee, onClose, onAction }) => {
    if (!request) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md h-full bg-gloov-card border-l border-gloov-border shadow-2xl p-6 flex flex-col animate-slide-in-right">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Leave Request</span>
                        <h2 className="text-2xl font-bold text-white mt-1">{request.type} Leave</h2>
                    </div>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-800">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl border border-gloov-border">
                        <img src={employee?.avatar} alt="" className="w-12 h-12 rounded-full border border-gray-700" />
                        <div>
                            <p className="text-lg font-medium text-white">{employee?.name}</p>
                            <p className="text-sm text-gray-500">{employee?.role} • {employee?.team}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Duration</label>
                            <div className="flex items-center gap-2 mt-1 text-gray-200">
                                <Calendar size={16} className="text-gloov-teal" />
                                <span>{new Date(request.fromDate).toLocaleDateString()}</span>
                                <span className="text-gray-600">to</span>
                                <span>{new Date(request.toDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Reason</label>
                            <p className="mt-1 text-gray-300 text-sm leading-relaxed bg-black/20 p-3 rounded-lg border border-gloov-border/50">
                                {request.reason}
                            </p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Submitted</label>
                            <p className="mt-1 text-gray-400 text-sm">{new Date(request.submittedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                {request.status === 'Pending' && (
                    <div className="pt-6 mt-6 border-t border-gloov-border grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => onAction('Reject')}
                            className="flex items-center justify-center gap-2 py-3 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded-xl font-medium transition-colors"
                        >
                            <X size={18} /> Reject
                        </button>
                        <button 
                            onClick={() => onAction('Approve')}
                            className="flex items-center justify-center gap-2 py-3 bg-gloov-teal text-black hover:bg-gloov-tealDark rounded-xl font-bold transition-colors shadow-lg shadow-gloov-teal/20"
                        >
                            <Check size={18} /> Approve
                        </button>
                    </div>
                )}
                
                {request.status !== 'Pending' && (
                    <div className="pt-6 mt-6 border-t border-gloov-border text-center">
                        <StatusBadge status={request.status} />
                        <p className="text-xs text-gray-500 mt-2">Processed on {new Date().toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
