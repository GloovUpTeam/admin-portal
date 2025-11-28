import React from 'react';
import { Client } from '../../types';
import { X, Building2, Mail, Phone, Calendar, DollarSign, FileText, Download, Briefcase } from 'lucide-react';
import StatusBadge from '../StatusBadge';

interface ClientDrawerProps {
  client: Client | null;
  onClose: () => void;
  isMobile: boolean;
}

const ClientDrawer: React.FC<ClientDrawerProps> = ({ client, onClose, isMobile }) => {
  if (!client) {
    if (isMobile) return null;
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-gloov-card border border-gloov-border rounded-xl text-center p-8">
        <div className="text-center">
          <Briefcase size={48} className="mx-auto text-gray-700 mb-4" />
          <h3 className="text-gray-400 font-medium">Select a client</h3>
          <p className="text-sm text-gray-600">Click a row to view account details</p>
        </div>
      </div>
    );
  }

  const Content = (
    <div className="h-full flex flex-col bg-gloov-card border border-gloov-border lg:rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gloov-border bg-gradient-to-r from-gloov-card to-black/40">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gloov-teal border border-gray-700">
               <Building2 size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold text-white leading-tight">{client.company}</h2>
               <p className="text-sm text-gray-400">{client.name}</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2">
           <StatusBadge status={client.status} />
           <span className={`text-xs px-2 py-0.5 rounded-full border ${
              client.paymentStatus === 'Paid' ? 'bg-green-900/20 border-green-900/50 text-green-400' :
              client.paymentStatus === 'Overdue' ? 'bg-red-900/20 border-red-900/50 text-red-400' :
              'bg-amber-900/20 border-amber-900/50 text-amber-400'
           }`}>
              {client.paymentStatus}
           </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        
        {/* Contact Info */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Details</h3>
           <div className="bg-black/20 rounded-xl border border-gloov-border p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-200">
                 <Mail size={16} className="text-gray-500" />
                 <a href={`mailto:${client.email}`} className="hover:text-gloov-teal transition-colors">{client.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                 <Phone size={16} className="text-gray-500" />
                 <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                 <Calendar size={16} className="text-gray-500" />
                 <span>Last Active: {new Date(client.lastActive).toLocaleDateString()}</span>
              </div>
           </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-black/20 rounded-xl border border-gloov-border p-4">
              <p className="text-xs text-gray-500 mb-1">Total Billed</p>
              <p className="text-xl font-bold text-white flex items-center gap-1">
                 <DollarSign size={16} className="text-gloov-teal" />
                 {client.totalBilled.toLocaleString()}
              </p>
           </div>
           <div className="bg-black/20 rounded-xl border border-gloov-border p-4">
              <p className="text-xs text-gray-500 mb-1">Active Projects</p>
              <p className="text-xl font-bold text-white flex items-center gap-1">
                 <Briefcase size={16} className="text-gloov-teal" />
                 {client.projectsCount}
              </p>
           </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Internal Notes</h3>
           <div className="bg-black/20 rounded-xl border border-gloov-border p-4 text-sm text-gray-300 leading-relaxed">
              {client.notes || 'No notes available.'}
           </div>
        </div>

        {/* Files */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Documents</h3>
           <div className="space-y-2">
              {client.files && client.files.length > 0 ? client.files.map((file, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 bg-black/20 border border-gloov-border rounded-lg hover:bg-gloov-hover transition-colors group">
                    <div className="flex items-center gap-3">
                       <FileText size={16} className="text-gray-500" />
                       <span className="text-sm text-gray-300">{file.name}</span>
                    </div>
                    <button className="text-gray-500 hover:text-white p-1" aria-label="Download file">
                       <Download size={14} />
                    </button>
                 </div>
              )) : (
                 <p className="text-sm text-gray-500 italic">No files attached.</p>
              )}
           </div>
        </div>

      </div>
    </div>
  );

  // Mobile Overlay
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        <div className="relative w-full max-w-md h-full bg-gloov-card shadow-2xl animate-slide-in-right">
          {Content}
        </div>
      </div>
    );
  }

  // Desktop Sticky Panel
  return <div className="h-[calc(100vh-8rem)] sticky top-6">{Content}</div>;
};

export default ClientDrawer;