import React from 'react';
import { Client } from '../../types';
import StatusBadge from '../StatusBadge';
import { ChevronRight, Building2, User } from 'lucide-react';

interface ClientsTableProps {
  clients: Client[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, selectedId, onSelect }) => {
  return (
    <div className="bg-gloov-card rounded-xl shadow-md border border-gloov-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm" role="grid">
          <thead className="bg-black/40 text-gray-400 font-medium border-b border-gloov-border">
            <tr>
              <th className="px-6 py-4">Client / Company</th>
              <th className="px-6 py-4 hidden sm:table-cell">Contact</th>
              <th className="px-6 py-4 text-center hidden md:table-cell">Projects</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 hidden lg:table-cell">Payment</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.map((client) => (
              <tr 
                key={client.id} 
                onClick={() => onSelect(client.id)}
                className={`cursor-pointer transition-colors group ${
                  selectedId === client.id 
                    ? 'bg-gloov-teal/5 border-l-2 border-gloov-teal' 
                    : 'hover:bg-gloov-hover border-l-2 border-transparent'
                }`}
                role="row"
                aria-selected={selectedId === client.id}
                tabIndex={0}
                onKeyDown={(e) => {
                   if(e.key === 'Enter' || e.key === ' ') {
                       e.preventDefault();
                       onSelect(client.id);
                   }
                }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <p className={`font-medium transition-colors ${selectedId === client.id ? 'text-gloov-teal' : 'text-gray-200 group-hover:text-white'}`}>
                        {client.company}
                      </p>
                      <p className="text-xs text-gray-500">{client.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell text-gray-400">
                  <div className="flex flex-col text-xs">
                     <span className="text-gray-300">{client.email}</span>
                     <span className="text-gray-600">{client.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center hidden md:table-cell">
                   <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-xs font-bold text-gray-300 border border-gray-700">
                     {client.projectsCount}
                   </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={client.status} />
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                   <span className={`text-xs px-2 py-0.5 rounded border ${
                      client.paymentStatus === 'Paid' ? 'border-green-900/50 text-green-400' :
                      client.paymentStatus === 'Overdue' ? 'border-red-900/50 text-red-400' :
                      'border-amber-900/50 text-amber-400'
                   }`}>
                      {client.paymentStatus}
                   </span>
                </td>
                <td className="px-6 py-4 text-right text-gray-600">
                  <ChevronRight size={18} className={`transition-transform duration-200 ${selectedId === client.id ? 'text-gloov-teal translate-x-1' : 'group-hover:text-gray-400'}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && (
            <div className="p-12 text-center text-gray-500">
                No clients found.
            </div>
        )}
      </div>
    </div>
  );
};

export default ClientsTable;