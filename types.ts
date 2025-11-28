
export type Status = 'Active' | 'Completed' | 'Delayed' | 'Pending';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'High' | 'Medium' | 'Low';

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: Status;
  deadline: string;
  teamMembers: string[];
}

export interface Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo: string;
  createdAt: string;
  resolutionETA: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  checkIn?: string;
  checkOut?: string;
}

export interface PayrollInfo {
  month: string;
  baseSalary: number;
  deductions: number;
  bonuses: number;
  netPay: number;
  status: 'Paid' | 'Processing' | 'Pending';
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  attendance: AttendanceRecord[];
  payroll: PayrollInfo[];
}

export interface NotificationPreference {
  id: string;
  type: 'Email' | 'WhatsApp' | 'Push';
  label: string;
  enabled: boolean;
}

export interface Payment {
  id: string;
  client: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

export interface Domain {
  id: string;
  domain: string;
  renewalDate: string;
  daysLeft: number;
  severity: 'critical' | 'warning' | 'good';
  reminded?: boolean;
  remindedAt?: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  managerId: string;
  projectsCount: number;
  totalBilled: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  status: 'Active' | 'Inactive' | 'Archived';
  lastActive: string;
  notes?: string;
  files?: Array<{ name: string; size: string; type: string }>;
}

// --- Dashboard Types ---
export type WidgetID = 
  | 'stats_projects' 
  | 'stats_tickets' 
  | 'tasks' 
  | 'attendance' 
  | 'payroll' 
  | 'payments' 
  | 'domains';

export interface WidgetConfig {
  id: WidgetID;
  label: string;
  enabled: boolean;
  order: number;
  area: 'main' | 'sidebar';
}
