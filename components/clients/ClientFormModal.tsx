import React, { useState } from 'react';
import { Client } from '../../types';
import { X, Save, AlertCircle } from 'lucide-react';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: Client) => void;
  existingEmails: string[];
}

const ClientFormModal: React.FC<ClientFormModalProps> = ({ isOpen, onClose, onSubmit, existingEmails }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    managerId: 'u1' // Default to current user or first manager
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (existingEmails.includes(formData.email)) {
      setError('A client with this email already exists.');
      return;
    }
    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    // Create new client object
    const newClient: Client = {
      id: `c-${Date.now()}`,
      ...formData,
      projectsCount: 0,
      totalBilled: 0,
      paymentStatus: 'Pending',
      status: 'Active',
      lastActive: new Date().toISOString(),
      notes: 'Created via Portal',
      files: []
    };

    onSubmit(newClient);
    onClose();
    setFormData({ name: '', company: '', email: '', phone: '', managerId: 'u1' });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="bg-gloov-card border border-gloov-border rounded-xl w-full max-w-lg shadow-2xl animate-scale-in"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-gloov-border">
          <h3 id="modal-title" className="text-xl font-bold text-white">Add New Client</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Contact Name *</label>
              <input 
                required 
                className="w-full bg-black/20 border border-gloov-border rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Company Name *</label>
              <input 
                required 
                className="w-full bg-black/20 border border-gloov-border rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none"
                placeholder="e.g. Acme Inc"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address *</label>
            <input 
              required 
              type="email"
              className="w-full bg-black/20 border border-gloov-border rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none"
              placeholder="jane@company.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number *</label>
            <input 
              required 
              type="tel"
              className="w-full bg-black/20 border border-gloov-border rounded-lg p-2.5 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 border border-gloov-border rounded-lg text-gray-400 hover:text-white hover:bg-gloov-hover transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2.5 bg-gloov-teal text-black font-semibold rounded-lg hover:bg-gloov-tealDark transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Client
            </button>
          </div>
          <p className="text-xs text-center text-gray-600">Simulated — Data saves to Local Storage only</p>
        </form>
      </div>
    </div>
  );
};

export default ClientFormModal;