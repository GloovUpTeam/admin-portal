
import React from 'react';
import { 
  mockProjects, 
  mockTickets, 
  mockEmployees, 
  mockPayments, 
  mockTasks, 
} from '../services/mockData';
import {
  TotalProjectsCard,
  TicketsSummary,
  EmployeeTaskSummary,
  AttendanceOverview,
  PayrollViewer,
  ClientPaymentStatus,
} from '../components/DashboardWidgets';
import { DomainRenewalsWidget } from '../components/dashboard/DomainRenewalsWidget';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Overview Monitoring</h1>
        <p className="text-gray-500 text-sm">Real-time status of all Gloov Up systems.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Row: Stats & Tickets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TotalProjectsCard projects={mockProjects} />
            <TicketsSummary tickets={mockTickets} />
          </div>

          {/* Middle Row: Tasks */}
          <EmployeeTaskSummary tasks={mockTasks} />

          {/* Bottom Row: Attendance, Payroll, Payments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AttendanceOverview employees={mockEmployees} />
            <div className="space-y-6">
               <PayrollViewer employees={mockEmployees} />
               <ClientPaymentStatus payments={mockPayments} />
            </div>
          </div>

        </div>

        {/* Right Rail (Span 1) - Sticky or Tall content */}
        <div className="lg:col-span-1">
          <DomainRenewalsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
