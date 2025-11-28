
import React from 'react';
import { DetailedTicket } from '../../services/mockTickets';
import { StatusFlow, AssigneeBadge, ResolutionTime } from './TicketComponents';
import StatusBadge from '../StatusBadge';
import { X, Calendar, Download, FileText, AlertTriangle, Clock } from 'lucide-react';

interface TicketDrawerProps {
  ticket: DetailedTicket | null;
  onClose: () => void;
  isMobile: boolean;
}

const TicketDrawer: React.FC<TicketDrawerProps> = ({ ticket, onClose, isMobile }) => {
  if (!ticket) {
    if (isMobile) return null;
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-gloov-card border border-gloov-border rounded-xl text-center p-8">
        <div>
          <FileText size={48} className="mx-auto text-gray-700 mb-4" />
          <h3 className="text-gray-400 font-medium">Select a ticket</h3>
          <p className="text-sm text-gray-600">View detailed timeline and resolution stats</p>
        </div>
      </div>
    );
  }

  // Calculate SLA status
  const createdAt = new Date(ticket.createdAt);
  const slaDeadline = new Date(createdAt.getTime() + ticket.slaHours * 60 * 60 * 1000);
  const now = new Date();
  const isOverdue = ticket.status !== 'Closed' && now > slaDeadline;

  const Content = (
    <div className="h-full flex flex-col bg-gloov-card border border-gloov-border lg:rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gloov-border flex justify-between items-start bg-gradient-to-r from-gloov-card to-black/40">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-2">
             <span className="font-mono text-xs text-gray-500">{ticket.id}</span>
             <StatusBadge status={ticket.status} />
             {isOverdue && (
               <span className="flex items-center gap-1 text-xs text-functional-error font-bold bg-red-900/20 px-2 py-0.5 rounded border border-red-900/50">
                 <AlertTriangle size={12} /> Overdue
               </span>
             )}
          </div>
          <h2 className="text-lg font-bold text-white mb-2 leading-tight">{ticket.subject}</h2>
          <div className="flex items-center gap-4 text-xs text-gray-400">
             <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(ticket.createdAt).toLocaleString()}</span>
             <span className="flex items-center gap-1 text-gloov-teal font-medium uppercase">{ticket.client}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Close details"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* Status Flow */}
        <div className="py-2">
           <StatusFlow currentStatus={ticket.status} />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-gloov-border">
           <div>
              <p className="text-xs text-gray-500 mb-1">Assignee</p>
              <AssigneeBadge user={ticket.assignedTo} />
           </div>
           <div>
              <p className="text-xs text-gray-500 mb-1">Resolution Time</p>
              <ResolutionTime start={ticket.createdAt} end={ticket.resolvedAt} />
           </div>
           <div>
              <p className="text-xs text-gray-500 mb-1">Priority</p>
              <span className={`text-xs font-medium ${
                  ticket.priority === 'High' ? 'text-functional-error' : 
                  ticket.priority === 'Medium' ? 'text-functional-warning' : 'text-functional-success'
              }`}>
                  {ticket.priority}
              </span>
           </div>
           <div>
              <p className="text-xs text-gray-500 mb-1">SLA Limit</p>
              <span className="text-xs text-gray-300 flex items-center gap-1">
                 <Clock size={12} /> {ticket.slaHours} Hours
              </span>
           </div>
        </div>

        {/* Description */}
        <div>
           <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Description</h3>
           <div className="text-sm text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-gloov-border/50">
              {ticket.description}
           </div>
        </div>

        {/* Attachments */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            Attachments <span className="text-xs font-normal text-gray-600">({ticket.attachments.length})</span>
          </h3>
          <div className="space-y-2">
             {ticket.attachments.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-black/20 border border-gloov-border rounded-lg hover:bg-gloov-hover transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded text-gloov-teal"><FileText size={16} /></div>
                      <div>
                         <p className="text-sm font-medium text-gray-200">{file.name}</p>
                         <p className="text-xs text-gray-500">{file.size} • {file.type}</p>
                      </div>
                   </div>
                   <button className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-gray-700">
                      <Download size={16} />
                   </button>
                </div>
             ))}
             {ticket.attachments.length === 0 && <p className="text-xs text-gray-500 italic">No attachments found.</p>}
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

export default TicketDrawer;
