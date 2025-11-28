
import React, { useState, useEffect } from 'react';
import { mockDetailedTickets, DetailedTicket, TicketStatus, TicketUser } from '../services/mockTickets';
import StatusBadge from '../components/StatusBadge';
import TicketDrawer from '../components/ticket/TicketDrawer';
import AssignDrawer from '../components/ticket/AssignDrawer';
import { AssigneeBadge, ResolutionTime } from '../components/ticket/TicketComponents';
import { Search, Filter, Download, ChevronRight, SlidersHorizontal, AlertCircle, RefreshCw, Ticket, CheckCircle, Clock, UserPlus, Check } from 'lucide-react';
import StatCard from '../components/StatCard';
import { saveTicketsLocal, loadTicketsLocal } from '../utils/localStorageHelpers';

const Tickets: React.FC = () => {
  // Init state from local storage or mock
  const [tickets, setTickets] = useState<DetailedTicket[]>(() => {
    return loadTicketsLocal() || mockDetailedTickets;
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('All');
  
  // Assign Drawer State
  const [assignTicket, setAssignTicket] = useState<DetailedTicket | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Responsive Check
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persistence
  useEffect(() => {
    saveTicketsLocal(tickets);
  }, [tickets]);

  // Toast Timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- Handlers ---

  const handleAssign = (ticketId: string, user: TicketUser) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, assignedTo: user, assigneeId: user.id } : t
    ));
    setToast(`Ticket ${ticketId} assigned to ${user.name}`);
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicket = tickets.find(t => t.id === selectedId) || null;

  // CSV Export
  const handleExport = () => {
    const headers = ['ID,Subject,Client,Status,Priority,Created,Resolved,Assignee'];
    const rows = filteredTickets.map(t => 
      `${t.id},"${t.subject}","${t.client}",${t.status},${t.priority},${t.createdAt},${t.resolvedAt || ''},"${t.assignedTo?.name || 'Unassigned'}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `tickets_monitor_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    highPriority: tickets.filter(t => t.priority === 'High' && t.status !== 'Closed').length,
    closed: tickets.filter(t => t.status === 'Closed').length
  };

  return (
    <div className="space-y-6 h-full relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[80] bg-gloov-teal text-black px-4 py-3 rounded-lg shadow-xl font-medium animate-slide-in-right flex items-center gap-2">
           <Check size={18} strokeWidth={3} /> {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Ticket Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time monitoring of support requests.</p>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={() => setTickets([...mockDetailedTickets])} // Sim refresh
             className="p-2 text-gray-400 hover:text-white hover:bg-gloov-hover rounded-lg border border-gloov-border"
             title="Refresh Data"
          >
             <RefreshCw size={18} />
          </button>
          <button 
             onClick={handleExport}
             className="flex items-center gap-2 bg-gloov-card border border-gloov-border text-gray-200 px-4 py-2 rounded-lg hover:bg-gloov-hover transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tickets" value={stats.total} icon={<Ticket size={20} />} />
        <StatCard title="Open Tickets" value={stats.open} trend="up" change="2 new" icon={<Clock size={20} />} />
        <StatCard title="High Priority" value={stats.highPriority} trend="down" change="Critical" icon={<AlertCircle size={20} />} />
        <StatCard title="Closed Tickets" value={stats.closed} icon={<CheckCircle size={20} />} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
        
        {/* Left Column: List */}
        <div className={`lg:col-span-${selectedId ? '8' : '12'} transition-all duration-300 space-y-4`}>
          
          {/* Controls Bar */}
          <div className="bg-gloov-card p-4 rounded-xl border border-gloov-border shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search ID, subject, or client..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-gloov-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gloov-teal text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Open', 'In Progress', 'Review', 'Closed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as TicketStatus | 'All')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${
                    statusFilter === status 
                      ? 'bg-gloov-teal/10 border-gloov-teal text-gloov-teal' 
                      : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-gloov-card rounded-xl shadow-md border border-gloov-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 text-gray-400 font-medium border-b border-gloov-border">
                  <tr>
                    <th className="px-6 py-4">ID / Subject</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Client</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 hidden lg:table-cell">Assignee</th>
                    <th className="px-6 py-4 hidden xl:table-cell">Time</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredTickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      onClick={() => setSelectedId(ticket.id)}
                      className={`cursor-pointer transition-colors group ${
                        selectedId === ticket.id 
                          ? 'bg-gloov-teal/5 border-l-2 border-gloov-teal' 
                          : 'hover:bg-gloov-hover border-l-2 border-transparent'
                      }`}
                      role="row"
                      aria-selected={selectedId === ticket.id}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedId(ticket.id);
                        }
                      }}
                    >
                      <td className="px-6 py-4 max-w-xs">
                        <div>
                          <div className="flex items-center gap-2">
                             <span className="font-mono text-xs text-gray-500">{ticket.id}</span>
                             {ticket.priority === 'High' && <AlertCircle size={12} className="text-functional-error" />}
                          </div>
                          <p className={`font-medium truncate transition-colors ${selectedId === ticket.id ? 'text-gloov-teal' : 'text-gray-200 group-hover:text-white'}`}>
                            {ticket.subject}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell text-gray-400">
                        {ticket.client}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <AssigneeBadge user={ticket.assignedTo} />
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <ResolutionTime start={ticket.createdAt} end={ticket.resolvedAt} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           {/* Assign Button */}
                           <button
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setAssignTicket(ticket);
                              }}
                              className="p-1.5 text-gray-400 hover:text-gloov-teal hover:bg-gloov-teal/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gloov-teal"
                              title="Assign Ticket"
                              aria-label={`Assign ticket ${ticket.id}`}
                           >
                              <UserPlus size={16} />
                           </button>
                           <ChevronRight size={18} className={`text-gray-600 transition-transform duration-200 ${selectedId === ticket.id ? 'text-gloov-teal translate-x-1' : 'group-hover:text-gray-400'}`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTickets.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                   No tickets found matching filters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detail View */}
        {(selectedId || !isMobile) && (
            <div className={`lg:col-span-4 ${!selectedId ? 'hidden lg:block' : ''}`}>
               <TicketDrawer 
                  ticket={selectedTicket} 
                  onClose={() => setSelectedId(null)} 
                  isMobile={isMobile}
               />
            </div>
        )}

      </div>

      {/* Assign Drawer */}
      <AssignDrawer
        isOpen={!!assignTicket}
        ticket={assignTicket}
        onClose={() => setAssignTicket(null)}
        onAssign={handleAssign}
      />
    </div>
  );
};

export default Tickets;
