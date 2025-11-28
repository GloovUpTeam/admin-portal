import React, { useState, useEffect } from 'react';
import { Client } from '../types';
import { mockClients } from '../services/mockClients';
import ClientsTable from '../components/clients/ClientsTable';
import ClientDrawer from '../components/clients/ClientDrawer';
import ClientFormModal from '../components/clients/ClientFormModal';
import { Search, Download, Plus, Briefcase, Users, CreditCard, Activity, DollarSign } from 'lucide-react';
import StatCard from '../components/StatCard';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive' | 'Archived'>('All');
  const [toast, setToast] = useState<string | null>(null);

  // Responsive Check
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Data (Simulate fetch/localstorage)
  useEffect(() => {
    const saved = localStorage.getItem('gloov_clients');
    if (saved) {
      setClients(JSON.parse(saved));
    } else {
      setClients(mockClients);
    }
  }, []);

  // Persist Data
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem('gloov_clients', JSON.stringify(clients));
    }
  }, [clients]);

  // Toast Timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handlers
  const handleAddClient = (newClient: Client) => {
    setClients(prev => [newClient, ...prev]);
    setToast(`Simulated: ${newClient.company} saved locally.`);
  };

  const handleExport = () => {
    const headers = ['ID,Company,Contact,Email,Phone,Status,Payment,Projects,TotalBilled'];
    const rows = filteredClients.map(c => 
      `${c.id},"${c.company}","${c.name}",${c.email},${c.phone},${c.status},${c.paymentStatus},${c.projectsCount},${c.totalBilled}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `clients_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast('Simulated: Client list exported to CSV');
  };

  // Filter Logic
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedClient = clients.find(c => c.id === selectedId) || null;

  // Stats Calculation
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'Active').length,
    pendingPayment: clients.filter(c => c.paymentStatus === 'Pending').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalBilled, 0)
  };

  return (
    <div className="space-y-6 h-full relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[60] bg-gloov-teal text-black px-4 py-3 rounded-lg shadow-xl font-medium animate-slide-in-right flex items-center gap-2">
           <Briefcase size={18} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="text-gloov-teal" size={24} /> Client Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage accounts, billing status, and project links.</p>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={handleExport}
             className="flex items-center gap-2 bg-gloov-card border border-gloov-border text-gray-200 px-4 py-2 rounded-lg hover:bg-gloov-hover transition-colors text-sm font-medium"
          >
            <Download size={16} /> Export
          </button>
          <button 
             onClick={() => setIsFormOpen(true)}
             className="flex items-center gap-2 bg-gloov-teal text-black px-4 py-2 rounded-lg hover:bg-gloov-tealDark transition-colors text-sm font-bold shadow-lg shadow-gloov-teal/20"
          >
            <Plus size={16} /> Add Client
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Clients" 
          value={stats.total} 
          icon={<Users size={20} />} 
        />
        <StatCard 
          title="Active Accounts" 
          value={stats.active} 
          trend="up" 
          change="2 new"
          icon={<Activity size={20} />} 
        />
        <StatCard 
          title="Pending Payments" 
          value={stats.pendingPayment} 
          trend="down" 
          change="-1"
          icon={<CreditCard size={20} />} 
        />
        <StatCard 
          title="Total Billed" 
          value={`$${(stats.totalRevenue / 1000).toFixed(1)}k`} 
          trend="up" 
          change="12%"
          icon={<DollarSign size={20} />} 
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
        
        {/* Left Column: List */}
        <div className={`lg:col-span-${selectedId ? '8' : '12'} transition-all duration-300 space-y-4`}>
           
           {/* Filters */}
           <div className="bg-gloov-card p-4 rounded-xl border border-gloov-border shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search company, name, or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-gloov-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gloov-teal text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Active', 'Inactive', 'Archived'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
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
           <ClientsTable 
              clients={filteredClients} 
              selectedId={selectedId} 
              onSelect={setSelectedId} 
           />
        </div>

        {/* Right Column: Drawer */}
        {(selectedId || !isMobile) && (
            <div className={`lg:col-span-4 ${!selectedId ? 'hidden lg:block' : ''}`}>
               <ClientDrawer 
                  client={selectedClient} 
                  onClose={() => setSelectedId(null)} 
                  isMobile={isMobile}
               />
            </div>
        )}

      </div>

      {/* Modals */}
      <ClientFormModal 
         isOpen={isFormOpen} 
         onClose={() => setIsFormOpen(false)} 
         onSubmit={handleAddClient}
         existingEmails={clients.map(c => c.email)}
      />
    </div>
  );
};

export default Clients;