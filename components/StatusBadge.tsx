import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'default' | 'priority';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'default' }) => {
  // Default fallback
  let colors = 'bg-gray-800 text-gray-400 border border-gray-700';

  const normalizedStatus = status.toLowerCase();

  if (type === 'priority') {
    if (normalizedStatus === 'high') colors = 'bg-red-900/30 text-red-400 border border-red-900/50';
    else if (normalizedStatus === 'medium') colors = 'bg-orange-900/30 text-orange-400 border border-orange-900/50';
    else if (normalizedStatus === 'low') colors = 'bg-green-900/30 text-green-400 border border-green-900/50';
  } else {
    // General Status
    if (['active', 'open', 'present', 'paid', 'published'].includes(normalizedStatus)) {
      colors = 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50';
    } else if (['completed', 'resolved'].includes(normalizedStatus)) {
      colors = 'bg-blue-900/30 text-blue-400 border border-blue-900/50';
    } else if (['delayed', 'late', 'processing'].includes(normalizedStatus)) {
      colors = 'bg-amber-900/30 text-amber-400 border border-amber-900/50';
    } else if (['closed', 'absent', 'pending'].includes(normalizedStatus)) {
      colors = 'bg-gray-800 text-gray-400 border border-gray-700';
    } else if (['in progress'].includes(normalizedStatus)) {
      colors = 'bg-purple-900/30 text-purple-400 border border-purple-900/50';
    }
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors}`}>
      {status}
    </span>
  );
};

export default StatusBadge;