
import React, { useState, useEffect } from 'react';
import { 
  mockEmployees, 
  mockAttendance, 
  mockLeaveRequests, 
  mockPayroll, 
  LeaveRequest,
  AuditEntry 
} from '../services/mockAttendanceData';
import { Sparkline, SummaryCard, KPIRing } from '../components/attendance/AttendanceComponents';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import { LeaveRequestRow, LeaveRequestDrawer, ConfirmActionModal } from '../components/leave/LeaveComponents';
import { PayrollViewer } from '../components/payroll/PayrollComponents';
import { Calendar, Clock, Activity, FileText, User } from 'lucide-react';

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leave' | 'payroll'>('overview');
  
  // Local State for "Simulated" Write Actions
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  
  // Modal State
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; action: 'Approve' | 'Reject' }>({ isOpen: false, action: 'Approve' });

  // Load persistence
  useEffect(() => {
    const savedRequests = localStorage.getItem('gloov_leave_requests');
    if (savedRequests) setRequests(JSON.parse(savedRequests));
    
    const savedLog = localStorage.getItem('gloov_audit_log');
    if (savedLog) setAuditLog(JSON.parse(savedLog));
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem('gloov_leave_requests', JSON.stringify(requests));
    localStorage.setItem('gloov_audit_log', JSON.stringify(auditLog));
  }, [requests, auditLog]);

  // Actions
  const handleLeaveAction = (action: 'Approve' | 'Reject') => {
    setConfirmModal({ isOpen: true, action });
  };

  const confirmLeaveAction = () => {
    if (!selectedRequest) return;
    
    // Update Request Status
    const updatedRequests = requests.map(r => 
      r.id === selectedRequest.id ? { ...r, status: confirmModal.action === 'Approve' ? 'Approved' : 'Rejected' as any } : r
    );
    setRequests(updatedRequests);
    
    // Update Selected Request for UI
    setSelectedRequest({ ...selectedRequest, status: confirmModal.action === 'Approve' ? 'Approved' : 'Rejected' as any });

    // Log Action
    const newLog: AuditEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: 'admin_1',
        action: `LEAVE_${confirmModal.action.toUpperCase()}`,
        targetId: selectedRequest.id,
        details: `${confirmModal.action} leave request for ${mockEmployees.find(e => e.id === selectedRequest.employeeId)?.name}`
    };
    setAuditLog([newLog, ...auditLog]);

    // Close Modals
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  const handleExportPayroll = () => {
    const headers = ['ID,Employee,Month,Base,Net,Status'];
    const rows = mockPayroll.map(p => `${p.id},${p.employeeId},${p.month},${p.baseSalary},${p.netPay},${p.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "payroll_export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Audit
    const newLog: AuditEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: 'admin_1',
        action: 'EXPORT_PAYROLL',
        details: 'Exported payroll CSV'
    };
    setAuditLog([newLog, ...auditLog]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance & Payroll</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor workforce activity and compensation.</p>
        </div>
        
        {/* Tab Nav */}
        <div className="bg-gloov-card p-1 rounded-lg border border-gloov-border flex">
           {['overview', 'leave', 'payroll'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                 activeTab === tab ? 'bg-gloov-teal text-black shadow-sm' : 'text-gray-400 hover:bg-gloov-hover hover:text-white'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* --- OVERVIEW TAB --- */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard title="Present Today" value="24/28" subtext="85% Attendance" icon={<User size={18} />} trend="up" />
                <SummaryCard title="Late Arrivals" value="3" subtext="Avg delay 12m" icon={<Clock size={18} />} trend="down" />
                <SummaryCard title="On Leave" value="1" subtext="Sick Leave" icon={<Calendar size={18} />} />
             </div>
             
             <AttendanceTable records={mockAttendance} employees={mockEmployees} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
             {/* KPIs */}
             <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md">
                <h3 className="text-white font-semibold mb-4">Performance KPIs</h3>
                <div className="space-y-4">
                    <KPIRing percentage={92} label="On-Time Rate" />
                    <div className="p-4 bg-black/20 rounded-lg border border-gloov-border">
                        <p className="text-xs text-gray-500 uppercase">Avg Hours / Day</p>
                        <p className="text-2xl font-bold text-white mt-1">7.8h <span className="text-xs text-gray-500 font-normal">/ 8h target</span></p>
                        <div className="h-10 mt-2">
                             <Sparkline data={[7.2, 7.5, 7.8, 7.6, 7.9, 8.0, 7.8]} />
                        </div>
                    </div>
                </div>
             </div>

             {/* Recent Audit */}
             <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-gloov-teal" /> Recent Activity
                </h3>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {auditLog.length === 0 && <p className="text-xs text-gray-500 italic">No activity recorded yet.</p>}
                    {auditLog.map(log => (
                        <div key={log.id} className="relative pl-4 border-l-2 border-gray-700">
                             <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-700"></div>
                             <p className="text-xs text-gray-500 mb-0.5">{new Date(log.timestamp).toLocaleTimeString()}</p>
                             <p className="text-sm text-gray-300 font-medium">{log.action}</p>
                             <p className="text-xs text-gray-500">{log.details}</p>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* --- LEAVE TAB --- */}
      {activeTab === 'leave' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-white">Pending Requests</h3>
              {requests.map(req => (
                  <LeaveRequestRow 
                     key={req.id} 
                     request={req} 
                     employee={mockEmployees.find(e => e.id === req.employeeId)}
                     onClick={() => setSelectedRequest(req)} 
                  />
              ))}
           </div>
           <div className="lg:col-span-1">
               <div className="bg-gloov-card border border-gloov-border p-6 rounded-xl shadow-md">
                   <h3 className="text-white font-semibold mb-2">Policy Quick View</h3>
                   <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                       <li>Sick leave requires medical cert > 2 days.</li>
                       <li>Vacation requests must be submitted 2 weeks in advance.</li>
                       <li>Urgent personal leave is subject to manager approval.</li>
                   </ul>
               </div>
           </div>
        </div>
      )}

      {/* --- PAYROLL TAB --- */}
      {activeTab === 'payroll' && (
        <PayrollViewer 
            payroll={mockPayroll} 
            employees={mockEmployees} 
            onExport={handleExportPayroll} 
        />
      )}

      {/* --- MODALS --- */}
      <LeaveRequestDrawer 
         request={selectedRequest} 
         employee={mockEmployees.find(e => e.id === selectedRequest?.employeeId)} 
         onClose={() => setSelectedRequest(null)}
         onAction={handleLeaveAction}
      />
      <ConfirmActionModal 
         isOpen={confirmModal.isOpen} 
         action={confirmModal.action} 
         onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })} 
         onConfirm={confirmLeaveAction} 
      />
    </div>
  );
};

export default Attendance;
