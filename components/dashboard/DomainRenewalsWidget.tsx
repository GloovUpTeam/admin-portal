
import React, { useState, useEffect, useMemo } from 'react';
import { mockDomainRenewals, DomainRenewal } from '../../services/mockDomains';
import { DomainRenewalRow } from './DomainRenewalRow';
import { ConfirmModal } from '../ui/ConfirmModal';
import { getReminders, saveReminders } from '../../utils/localStorageHelpers';
import { exportToCSV } from '../../utils/exportHelpers';
import { Search, Filter, Download, BellRing, Globe } from 'lucide-react';

export const DomainRenewalsWidget: React.FC = () => {
  const [items, setItems] = useState<DomainRenewal[]>(mockDomainRenewals);
  const [reminders, setReminders] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Load persistence
  useEffect(() => {
    setReminders(getReminders());
  }, []);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.daysLeft - b.daysLeft); // Default sort by urgency
  }, [items, searchTerm]);

  // Actions
  const handleRemind = (id: string) => {
    const newReminders = { ...reminders };
    if (newReminders[id]) {
      delete newReminders[id];
      setToast('Reminder removed');
    } else {
      newReminders[id] = new Date().toISOString();
      setToast('Reminder set locally');
    }
    setReminders(newReminders);
    saveReminders(newReminders);
    
    // Clear toast
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelect = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedIds);
    if (selected) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedIds(newSelected);
  };

  const handleBulkRemind = () => {
    const newReminders = { ...reminders };
    selectedIds.forEach(id => {
      if (!newReminders[id]) newReminders[id] = new Date().toISOString();
    });
    setReminders(newReminders);
    saveReminders(newReminders);
    setSelectedIds(new Set());
    setIsConfirmOpen(false);
    setToast(`${selectedIds.size} items marked as reminded`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = () => {
    exportToCSV(filteredItems, `domains_export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="bg-gloov-card border border-gloov-border rounded-xl shadow-md flex flex-col h-[520px] relative overflow-hidden">
      
      {/* Toast */}
      {toast && (
        <div role="alert" aria-live="polite" className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gloov-teal text-black px-4 py-2 rounded-lg text-sm font-bold shadow-xl animate-fade-in-down">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b border-gloov-border bg-black/20 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold flex items-center gap-2">
                <Globe size={18} className="text-gloov-teal" />
                Renewals & Hosting
            </h3>
            <div className="flex gap-2">
                {selectedIds.size > 0 && (
                    <button 
                        onClick={() => setIsConfirmOpen(true)}
                        className="text-xs flex items-center gap-1 bg-gloov-teal text-black px-3 py-1.5 rounded-lg font-bold hover:bg-gloov-tealDark transition-colors"
                    >
                        <BellRing size={12} /> Remind ({selectedIds.size})
                    </button>
                )}
                <button 
                    onClick={handleExport}
                    className="text-xs flex items-center gap-1 bg-black/40 text-gray-400 border border-gray-700 px-3 py-1.5 rounded-lg hover:text-white hover:border-gray-500 transition-colors"
                >
                    <Download size={12} /> Export
                </button>
            </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
            <input 
                type="text" 
                placeholder="Search domains..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/40 border border-gloov-border rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-gloov-teal"
            />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" role="region" aria-label="Domain Renewals List">
        {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                <p>No renewals found matching your search.</p>
            </div>
        ) : (
            filteredItems.map(item => (
                <DomainRenewalRow
                    key={item.id}
                    item={item}
                    isReminded={!!reminders[item.id]}
                    isSelected={selectedIds.has(item.id)}
                    onRemind={handleRemind}
                    onSelect={handleSelect}
                />
            ))
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Bulk Remind"
        message={`Mark ${selectedIds.size} items as reminded? This saves locally.`}
        onConfirm={handleBulkRemind}
        onClose={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};
