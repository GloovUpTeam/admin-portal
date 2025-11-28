
import { Project, Ticket, Employee, Payment, Task, Domain } from '../types';

export const mockProjects: Project[] = [
  { id: 'P-001', name: 'Website Redesign', client: 'Acme Corp', progress: 75, status: 'Active', deadline: '2023-11-30', teamMembers: ['Alice', 'Bob'] },
  { id: 'P-002', name: 'Mobile App Launch', client: 'Globex', progress: 40, "status": "Active", deadline: '2023-12-15', teamMembers: ['Charlie', 'Dave', 'Eve'] },
  { id: 'P-003', name: 'Cloud Migration', client: 'Soylent Corp', progress: 90, status: 'Active', deadline: '2023-10-25', teamMembers: ['Frank'] },
  { id: 'P-004', name: 'Marketing Dashboard', client: 'Umbrella Inc', progress: 100, status: 'Completed', deadline: '2023-09-30', teamMembers: ['Alice', 'Eve'] },
  { id: 'P-005', name: 'E-commerce Platform', client: 'Cyberdyne', progress: 15, status: 'Active', deadline: '2024-02-28', teamMembers: ['Bob', 'Charlie'] },
  { id: 'P-006', name: 'Internal Audit Tool', client: 'Initech', progress: 60, status: 'Active', deadline: '2023-12-01', teamMembers: ['Dave'] },
  { id: 'P-007', name: 'Social Media Bot', client: 'Massive Dynamic', progress: 5, status: 'Pending', deadline: '2024-03-15', teamMembers: [] },
  { id: 'P-008', name: 'Legacy System Update', client: 'Wayne Ent', progress: 85, status: 'Active', deadline: '2023-11-10', teamMembers: ['Frank', 'Alice'] },
];

export const mockTickets: Ticket[] = [
  { id: 'T-101', title: 'Login API Timeout', status: 'Open', priority: 'High', assignedTo: 'Alice', createdAt: '2023-10-20', resolutionETA: '2023-10-22' },
  { id: 'T-102', title: 'Update Color Palette', status: 'In Progress', priority: 'Low', assignedTo: 'Bob', createdAt: '2023-10-18', resolutionETA: '2023-10-25' },
  { id: 'T-103', title: 'Database Optimization', status: 'Open', priority: 'High', assignedTo: 'Charlie', createdAt: '2023-10-21', resolutionETA: '2023-10-23' },
  { id: 'T-104', title: 'Fix Mobile Layout', status: 'Resolved', priority: 'Medium', assignedTo: 'Eve', createdAt: '2023-10-15', resolutionETA: '2023-10-16' },
  { id: 'T-105', title: 'Broken Link on Home', status: 'Closed', priority: 'Low', assignedTo: 'Dave', createdAt: '2023-10-10', resolutionETA: '2023-10-11' },
  { id: 'T-106', title: 'Payment Gateway Error', status: 'Open', priority: 'High', assignedTo: 'Frank', createdAt: '2023-10-22', resolutionETA: '2023-10-22' },
  { id: 'T-107', title: 'User Profile Image Upload', status: 'In Progress', priority: 'Medium', assignedTo: 'Alice', createdAt: '2023-10-19', resolutionETA: '2023-10-26' },
  { id: 'T-108', title: 'Export to CSV Failure', status: 'Open', priority: 'Medium', assignedTo: 'Bob', createdAt: '2023-10-21', resolutionETA: '2023-10-24' },
  { id: 'T-109', title: 'Add Dark Mode', status: 'In Progress', priority: 'Low', assignedTo: 'Eve', createdAt: '2023-10-01', resolutionETA: '2023-11-01' },
  { id: 'T-110', title: 'Security Patch v2', status: 'Resolved', priority: 'High', assignedTo: 'Charlie', createdAt: '2023-10-12', resolutionETA: '2023-10-14' },
  { id: 'T-112', title: 'Server Memory Leak', status: 'Open', priority: 'High', assignedTo: 'Frank', createdAt: '2023-10-22', resolutionETA: '2023-10-23' },
];

export const mockEmployees: Employee[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `E-${100 + i}`,
  name: `Employee ${i + 1}`,
  role: i % 3 === 0 ? 'Manager' : i % 3 === 1 ? 'Developer' : 'Designer',
  department: i % 2 === 0 ? 'Engineering' : 'Product',
  attendance: [
    { date: '2023-10-20', status: 'Present', checkIn: '09:00', checkOut: '17:00' },
    { date: '2023-10-19', status: i % 5 === 0 ? 'Absent' : 'Present', checkIn: '09:05', checkOut: '17:10' },
    { date: '2023-10-18', status: 'Present', checkIn: '08:55', checkOut: '17:05' },
  ],
  payroll: [
    { month: 'September 2023', baseSalary: 5000, deductions: 500, bonuses: i % 4 === 0 ? 1000 : 0, netPay: 4500 + (i % 4 === 0 ? 1000 : 0), status: 'Paid' },
    { month: 'October 2023', baseSalary: 5000, deductions: 500, bonuses: 0, netPay: 4500, status: 'Processing' },
  ]
}));

export const mockPayments: Payment[] = [
  { id: 'PAY-001', client: 'Acme Corp', amount: 5000, status: 'Paid', date: '2023-10-15' },
  { id: 'PAY-002', client: 'Globex', amount: 3200, status: 'Pending', date: '2023-10-20' },
  { id: 'PAY-003', client: 'Soylent Corp', amount: 1500, status: 'Overdue', date: '2023-10-01' },
  { id: 'PAY-004', client: 'Umbrella Inc', amount: 8000, status: 'Paid', date: '2023-09-25' },
  { id: 'PAY-005', client: 'Cyberdyne', amount: 4500, status: 'Pending', date: '2023-10-22' },
  { id: 'PAY-006', client: 'Wayne Ent', amount: 12000, status: 'Paid', date: '2023-10-05' },
];

export const mockTasks: Task[] = [
  { id: 'TSK-101', title: 'Design System Update', assignee: 'Alice', status: 'In Progress', dueDate: '2023-10-28' },
  { id: 'TSK-102', title: 'API Integration', assignee: 'Bob', status: 'Pending', dueDate: '2023-10-30' },
  { id: 'TSK-103', title: 'Unit Testing', assignee: 'Charlie', status: 'Completed', dueDate: '2023-10-25' },
  { id: 'TSK-104', title: 'Client Meeting Prep', assignee: 'Eve', status: 'In Progress', dueDate: '2023-10-27' },
  { id: 'TSK-105', title: 'Security Audit', assignee: 'Frank', status: 'Pending', dueDate: '2023-11-05' },
];

export const mockDomains: Domain[] = [
  { id: 'D-001', domain: 'gloovup.com', renewalDate: '2023-11-15', daysLeft: 20, severity: 'warning', reminded: false },
  { id: 'D-002', domain: 'gloov-app.io', renewalDate: '2024-01-20', daysLeft: 85, severity: 'good', reminded: false },
  { id: 'D-003', domain: 'legacy-portal.net', renewalDate: '2023-10-30', daysLeft: 5, severity: 'critical', reminded: true, remindedAt: '2023-10-20T10:00:00Z' },
  { id: 'D-004', domain: 'staging.gloovup.com', renewalDate: '2023-12-05', daysLeft: 40, severity: 'good', reminded: false },
];
