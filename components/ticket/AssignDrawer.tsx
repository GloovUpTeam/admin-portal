
import React, { useState, useMemo } from 'react';
import { DetailedTicket, TicketUser } from '../../services/mockTickets';
import { mockEmployees } from '../../services/mockData'; 
import { X, Search, Check, UserPlus } from 'lucide-react';

interface AssignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: DetailedTicket | null;
  onAssign: (ticketId: string, user: TicketUser) => void;
}

// Convert Employee to TicketUser format for consistency
const availableUsers: TicketUser[] = mockEmployees.map(e => ({
  id: e.id,
  name: e.name,
  role: e.role,
  avatar: `https://ui-avatars.com/api/?name=${e.name}&background=random` // Fallback avatar logic
}));

const AssignDrawer: React.FC<AssignDrawerProps> = ({ isOpen, onClose, ticket, onAssign }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(ticket?.assignedTo?.id || null);

  // Sync selection when ticket changes
  React.useEffect(() => {
    setSelectedUserId(ticket?.assignedTo?.id || null);
  }, [ticket]);

  const filteredUsers = useMemo(() => {
    return availableUsers.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleConfirm = () => {
    if (!ticket || !selectedUserId) return;
    const user = availableUsers.find(u => u.id === selectedUserId);
    if (user) {
      onAssign(ticket.id, user);
      onClose();
    }
  };

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      
      <div 
        className="relative w-full max-w-md h-full bg-gloov-card border-l border-gloov-border shadow-2xl flex flex-col animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-drawer-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-gloov-border flex justify-between items-center bg-black/20">
          <div>
            <h3 id="assign-drawer-title" className="text-xl font-bold text-white flex items-center gap-2">
              <UserPlus size={20} className="text-gloov-teal" /> Assign Ticket
            </h3>
            <p className="text-xs text-gray-500 mt-1">Select a developer for {ticket.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gloov-border bg-black/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search developers..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-black/20 border border-gloov-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar" role="listbox">
          {filteredUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              role="option"
              aria-selected={selectedUserId === user.id}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                selectedUserId === user.id 
                  ? 'bg-gloov-teal/10 border-gloov-teal' 
                  : 'bg-transparent border-transparent hover:bg-gloov-hover'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-700" />
                <div className="text-left">
                  <p className={`font-medium ${selectedUserId === user.id ? 'text-white' : 'text-gray-300'}`}>{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              {selectedUserId === user.id && <Check size={18} className="text-gloov-teal" />}
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-8">No developers found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gloov-border bg-black/20">
          <button 
            onClick={handleConfirm}
            disabled={!selectedUserId}
            className="w-full py-3 bg-gloov-teal text-black font-bold rounded-xl hover:bg-gloov-tealDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gloov-teal/20"
          >
            Assign Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDrawer;
