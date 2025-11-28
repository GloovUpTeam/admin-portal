
import React from 'react';
import { TicketStatus, TicketUser } from '../../services/mockTickets';
import { Clock, User as UserIcon, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

// --- Resolution Time ---
interface ResolutionTimeProps {
  start: string;
  end: string | null;
}

export const ResolutionTime: React.FC<ResolutionTimeProps> = ({ start, end }) => {
  if (!end) {
    return <span className="text-gray-500 italic">Ongoing</span>;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  let text = '';
  if (days > 0) text = `${days}d ${remainingHours}h`;
  else if (hours > 0) text = `${hours}h`;
  else text = '< 1h';

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Clock size={14} className="text-gray-400" />
      <span className="text-gray-200 font-medium">{text}</span>
    </div>
  );
};

// --- Assignee Badge ---
interface AssigneeBadgeProps {
  user: TicketUser | null;
}

export const AssigneeBadge: React.FC<AssigneeBadgeProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
          <UserIcon size={12} />
        </div>
        <span className="text-xs text-gray-500 italic">Unassigned</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-gray-700 object-cover" />
      <span className="text-xs text-gray-300 font-medium">{user.name}</span>
    </div>
  );
};

// --- Status Flow ---
interface StatusFlowProps {
  currentStatus: TicketStatus;
}

export const StatusFlow: React.FC<StatusFlowProps> = ({ currentStatus }) => {
  const steps: TicketStatus[] = ['Open', 'In Progress', 'Review', 'Closed'];
  
  const getCurrentIndex = () => steps.indexOf(currentStatus);
  const currentIndex = getCurrentIndex();

  return (
    <div className="flex items-center w-full justify-between relative">
      {/* Connector Line Background */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10 transform -translate-y-1/2 rounded" />
      
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        
        return (
          <div key={step} className="flex flex-col items-center gap-2 bg-gloov-card px-2 z-0">
             <div className={`
                w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isCompleted ? 'bg-gloov-teal border-gloov-teal text-black' : ''}
                ${isCurrent ? 'bg-black border-gloov-teal text-gloov-teal shadow-[0_0_10px_rgba(29,205,159,0.3)]' : ''}
                ${!isCompleted && !isCurrent ? 'bg-gray-800 border-gray-700 text-gray-500' : ''}
             `}>
                {isCompleted ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{index + 1}</span>}
             </div>
             <span className={`text-[10px] uppercase font-bold tracking-wider ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
               {step}
             </span>
          </div>
        );
      })}
    </div>
  );
};
