
import React from 'react';
import { DomainRenewal } from '../../services/mockDomains';
import { AlertTriangle, Bell, Check, Globe, Server, Shield } from 'lucide-react';

interface DomainRenewalRowProps {
  item: DomainRenewal;
  isReminded: boolean;
  isSelected: boolean;
  onRemind: (id: string) => void;
  onSelect: (id: string, selected: boolean) => void;
}

const getTypeIcon = (type: DomainRenewal['type']) => {
  switch (type) {
    case 'domain': return <Globe size={16} />;
    case 'hosting': return <Server size={16} />;
    case 'certificate': return <Shield size={16} />;
  }
};

export const DomainRenewalRow: React.FC<DomainRenewalRowProps> = React.memo(({ item, isReminded, isSelected, onRemind, onSelect }) => {
  const severityColor = item.daysLeft <= 7 ? 'text-red-400 border-red-900/50 bg-red-900/20' : 
                        item.daysLeft <= 30 ? 'text-orange-400 border-orange-900/50 bg-orange-900/20' : 
                        'text-emerald-400 border-emerald-900/50 bg-emerald-900/20';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onRemind(item.id);
  };
  
  return (
    <div 
      role="row" 
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`group grid grid-cols-[auto_1fr_auto] gap-3 p-3 rounded-lg border transition-all items-center ${
        isSelected ? 'bg-gloov-teal/5 border-gloov-teal' : 'bg-black/20 border-gloov-border hover:border-gray-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={(e) => onSelect(item.id, e.target.checked)}
          className="rounded border-gray-600 bg-black/40 text-gloov-teal focus:ring-0 cursor-pointer w-4 h-4"
          aria-label={`Select ${item.domain}`}
        />
        <div className="text-gray-500 hidden sm:block">
           {getTypeIcon(item.type)}
        </div>
      </div>
      
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-medium text-gray-200 truncate">{item.domain}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${
            item.env === 'prod' ? 'border-purple-900/50 text-purple-400' : 
            item.env === 'staging' ? 'border-blue-900/50 text-blue-400' : 'border-gray-700 text-gray-500'
          }`}>
            {item.env}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
           <span className="capitalize">{item.type}</span>
           <span className="hidden sm:inline">•</span>
           <span className="hidden sm:inline">{item.provider}</span>
           <span className="sm:hidden">• {new Date(item.renewDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="text-right flex items-center gap-3">
        <div className="hidden sm:block">
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold mb-1 ${severityColor}`}>
            {item.daysLeft <= 7 && <AlertTriangle size={12} />}
            {item.daysLeft} days
            </div>
            <p className="text-[10px] text-gray-500">
            Due {new Date(item.renewDate).toLocaleDateString()}
            </p>
        </div>

        <button
            onClick={(e) => { e.stopPropagation(); onRemind(item.id); }}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
            isReminded 
                ? 'bg-gloov-teal text-black hover:bg-gloov-tealDark' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700 bg-black/40 border border-gray-700'
            }`}
            title={isReminded ? "Reminder set" : "Remind Me"}
            aria-pressed={isReminded}
            aria-label={isReminded ? `Unset reminder for ${item.domain}` : `Set reminder for ${item.domain}`}
        >
            {isReminded ? <Check size={16} strokeWidth={3} /> : <Bell size={16} />}
            <span className="hidden md:inline text-xs font-medium">{isReminded ? 'Reminded' : 'Remind'}</span>
        </button>
      </div>
    </div>
  );
});
