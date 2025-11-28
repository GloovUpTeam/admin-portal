
import React, { useState, useEffect } from 'react';
import { Project, Ticket, Employee, Payment, Task, Domain } from '../types';
import { Download, AlertTriangle, CheckCircle2, Clock, Globe, Bell, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

// --- Total Ongoing Projects ---
export const TotalProjectsCard: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const activeCount = projects.filter(p => p.status === 'Active').length;
  return (
    <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md h-full flex flex-col justify-between hover:border-gloov-teal/30 transition-colors">
      <div>
        <p className="text-sm text-gray-400 font-medium mb-1">Total Ongoing Projects</p>
        <h3 className="text-4xl font-bold text-white tracking-tight">{activeCount}</h3>
      </div>
      <div className="mt-4">
        <div className="text-xs text-gray-500 mb-2 flex justify-between">
           <span>Completion</span>
           <span>All Systems Operational</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
           <div className="bg-gradient-to-r from-gloov-teal to-gloov-tealDark h-1.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

// --- Tickets Summary ---
export const TicketsSummary: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
  const open = tickets.filter(t => t.status === 'Open').length;
  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const closed = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
  const total = tickets.length || 1;

  const getPct = (c: number) => Math.round((c / total) * 100);

  return (
    <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white font-semibold">Tickets Overview</h3>
        <Link to="/tickets" className="text-xs text-gloov-teal hover:text-white transition-colors">View All</Link>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Open ({open})</span>
            <span>{getPct(open)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPct(open)}%` }}></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>In Progress ({inProgress})</span>
            <span>{getPct(inProgress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPct(inProgress)}%` }}></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Closed ({closed})</span>
            <span>{getPct(closed)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPct(closed)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Employee Task Summary ---
export const EmployeeTaskSummary: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
  <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md">
    <h3 className="text-white font-semibold mb-4">Employee Task Summary</h3>
    <div className="space-y-3">
      {tasks.slice(0, 4).map(task => (
        <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gloov-border/50">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-amber-500' : 'bg-gray-500'}`}></div>
            <div>
              <p className="text-sm font-medium text-gray-200">{task.title}</p>
              <p className="text-xs text-gray-500">Assigned to {task.assignee}</p>
            </div>
          </div>
          <div className="text-right">
             <span className={`text-xs px-2 py-0.5 rounded-full ${
                task.status === 'Completed' ? 'bg-green-900/20 text-green-400' : 
                task.status === 'In Progress' ? 'bg-amber-900/20 text-amber-400' : 'bg-gray-800 text-gray-400'
             }`}>{task.status}</span>
             <p className="text-xs text-gray-600 mt-1">{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Attendance Overview ---
export const AttendanceOverview: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const total = employees.length * 3; // Assuming 3 days of history per emp
  const present = employees.reduce((acc, e) => acc + e.attendance.filter(r => r.status === 'Present').length, 0);
  const absent = employees.reduce((acc, e) => acc + e.attendance.filter(r => r.status === 'Absent').length, 0);
  const presentPct = Math.round((present / total) * 100);

  return (
    <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md flex flex-col justify-between">
      <h3 className="text-white font-semibold mb-4">Attendance</h3>
      <div className="flex items-center justify-center py-4">
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-gray-800">
           <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 32 32">
             <circle cx="16" cy="16" r="16" fill="none" className="stroke-current text-gray-800" strokeWidth="4"></circle>
             <circle cx="16" cy="16" r="16" fill="none" className="stroke-current text-gloov-teal" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - presentPct}></circle>
           </svg>
           <div className="text-center">
             <span className="text-2xl font-bold text-white">{presentPct}%</span>
             <p className="text-[10px] text-gray-500 uppercase tracking-wide">Present</p>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center mt-2">
         <div className="bg-black/20 rounded p-2">
            <span className="block text-xl font-bold text-white">{present}</span>
            <span className="text-xs text-gray-500">Present</span>
         </div>
         <div className="bg-black/20 rounded p-2">
            <span className="block text-xl font-bold text-gray-400">{absent}</span>
            <span className="text-xs text-gray-500">Absent</span>
         </div>
      </div>
    </div>
  );
};

// --- Payroll Status (View Only) ---
export const PayrollViewer: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const processed = employees.filter(e => e.payroll[1].status === 'Paid' || e.payroll[1].status === 'Processing').length;
  const total = employees.length;
  
  return (
    <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md">
       <h3 className="text-white font-semibold mb-4">Payroll Status</h3>
       <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gloov-border/50">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-green-900/20 text-green-400 rounded-lg"><CheckCircle2 size={18} /></div>
                <div>
                   <p className="text-sm font-medium text-gray-200">Processed</p>
                   <p className="text-xs text-gray-500">October 2023</p>
                </div>
             </div>
             <span className="text-xl font-bold text-white">{processed}/{total}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gloov-border/50">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-900/20 text-amber-400 rounded-lg"><Clock size={18} /></div>
                <div>
                   <p className="text-sm font-medium text-gray-200">Pending</p>
                   <p className="text-xs text-gray-500">Approvals needed</p>
                </div>
             </div>
             <span className="text-xl font-bold text-white">{total - processed}</span>
          </div>
       </div>
    </div>
  );
};

// --- Client Payment Status (Export CSV) ---
export const ClientPaymentStatus: React.FC<{ payments: Payment[] }> = ({ payments }) => {
  const handleExport = () => {
    const headers = ['ID,Client,Amount,Status,Date'];
    const rows = payments.map(p => `${p.id},${p.client},${p.amount},${p.status},${p.date}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "client_payments.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-white font-semibold">Client Payments</h3>
         <button 
           onClick={handleExport}
           className="text-xs flex items-center gap-1 bg-black/40 hover:bg-gloov-hover text-gloov-teal border border-gloov-border px-3 py-1.5 rounded transition-all"
           aria-label="Export Payments CSV"
         >
           <Download size={12} /> CSV
         </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gloov-border">
         <table className="w-full text-xs text-left">
            <thead className="bg-black/40 text-gray-400 font-medium">
               <tr>
                  <th className="px-3 py-2">Client</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2 text-right">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
               {payments.slice(0, 4).map(p => (
                  <tr key={p.id} className="hover:bg-gloov-hover">
                     <td className="px-3 py-2 text-gray-300">{p.client}</td>
                     <td className="px-3 py-2 text-right font-mono text-gray-400">${p.amount.toLocaleString()}</td>
                     <td className="px-3 py-2 text-right"><StatusBadge status={p.status} /></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

// --- Domain & Hosting Renewal Alerts ---
export const DomainRenewalAlerts: React.FC<{ domains: Domain[] }> = ({ domains }) => {
  // Initialize from localStorage to persist reminders across refreshes
  const [reminders, setReminders] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('gloov_domain_reminders');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Failed to load reminders:', e);
      return {};
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gloov_domain_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Clear toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const toggleReminder = (id: string, domainName: string) => {
    setReminders(prev => {
      const newState = { ...prev };
      // If already reminded, we toggle it OFF for this demo, 
      // or we can treat it as 'Set'. Let's toggle for full interactivity.
      if (newState[id]) {
        delete newState[id];
        setToastMessage(`Reminder removed for ${domainName}`);
      } else {
        newState[id] = true;
        setToastMessage(`Reminder set locally for ${domainName}`);
      }
      return newState;
    });
  };

  return (
    <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md h-full relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="alert" 
          aria-live="polite"
          className="absolute top-4 right-4 bg-gloov-teal text-black px-4 py-2 rounded-lg text-xs font-bold shadow-lg animate-bounce z-10 flex items-center gap-2 border border-black/20"
        >
          <Check size={14} strokeWidth={3} /> {toastMessage}
        </div>
      )}

      <div className="flex items-center gap-2 mb-6">
        <Globe size={20} className="text-gloov-teal" />
        <h3 className="text-white font-semibold">Domain Renewals</h3>
      </div>
      
      <div className="space-y-4">
        {domains.map(domain => {
          const isReminded = !!reminders[domain.id];
          return (
            <div key={domain.id} className="p-4 rounded-lg bg-black/20 border border-gloov-border hover:border-gray-600 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-200">{domain.domain}</span>
                {domain.severity === 'critical' && <AlertTriangle size={16} className="text-functional-error" />}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-2xl font-bold ${
                    domain.severity === 'critical' ? 'text-functional-error' : 
                    domain.severity === 'warning' ? 'text-functional-warning' : 'text-gray-400'
                  }`}>
                    {domain.daysLeft} <span className="text-xs font-normal text-gray-500">days left</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Renews: {new Date(domain.renewalDate).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => toggleReminder(domain.id, domain.domain)}
                  aria-pressed={isReminded}
                  aria-label={isReminded ? `Unset reminder for ${domain.domain}` : `Set reminder for ${domain.domain}`}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 border ${
                    isReminded 
                      ? 'bg-gloov-teal text-black border-gloov-teal hover:bg-gloov-teal/90' 
                      : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400 hover:text-white'
                  }`}
                >
                  {isReminded ? (
                    <>
                      <Check size={12} strokeWidth={3} /> Reminded
                    </>
                  ) : (
                    <>
                      <Bell size={12} /> Remind Me
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
