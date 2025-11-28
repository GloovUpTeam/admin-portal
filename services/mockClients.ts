import { Client } from '../types';

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Sarah Connor',
    company: 'Skynet Systems',
    email: 'sarah@skynet.com',
    phone: '+1 (555) 123-4567',
    managerId: 'u1',
    projectsCount: 3,
    totalBilled: 150000,
    paymentStatus: 'Paid',
    status: 'Active',
    lastActive: '2023-10-25T10:00:00Z',
    notes: 'Key account for Q4. Interested in AI upgrades.',
    files: [
      { name: 'SLA_Agreement_2023.pdf', size: '2.4 MB', type: 'PDF' },
      { name: 'Billing_Report_Oct.xlsx', size: '1.1 MB', type: 'XLSX' }
    ]
  },
  {
    id: 'c2',
    name: 'James Bond',
    company: 'MI6 Operations',
    email: '007@mi6.gov.uk',
    phone: '+44 20 7946 0007',
    managerId: 'u2',
    projectsCount: 1,
    totalBilled: 50000,
    paymentStatus: 'Pending',
    status: 'Active',
    lastActive: '2023-10-24T14:30:00Z',
    notes: 'Requires high security clearance for all team members.',
    files: []
  },
  {
    id: 'c3',
    name: 'Bruce Wayne',
    company: 'Wayne Enterprises',
    email: 'bruce@wayne.com',
    phone: '+1 (555) 999-8888',
    managerId: 'u1',
    projectsCount: 5,
    totalBilled: 500000,
    paymentStatus: 'Overdue',
    status: 'Active',
    lastActive: '2023-10-20T09:15:00Z',
    notes: 'Payment overdue by 15 days. Accounting team notified.',
    files: [
      { name: 'Invoice_INV-2023-001.pdf', size: '500 KB', type: 'PDF' }
    ]
  },
  {
    id: 'c4',
    name: 'Tony Stark',
    company: 'Stark Industries',
    email: 'tony@stark.com',
    phone: '+1 (555) 300-3000',
    managerId: 'u3',
    projectsCount: 12,
    totalBilled: 1200000,
    paymentStatus: 'Paid',
    status: 'Inactive',
    lastActive: '2023-09-15T10:00:00Z',
    notes: 'Contract paused pending renegotiation.',
    files: []
  },
  {
    id: 'c5',
    name: 'Ellen Ripley',
    company: 'Weyland-Yutani',
    email: 'ripley@weyland.com',
    phone: '+1 (555) 426-1979',
    managerId: 'u2',
    projectsCount: 2,
    totalBilled: 75000,
    paymentStatus: 'Paid',
    status: 'Archived',
    lastActive: '2023-01-01T00:00:00Z',
    notes: 'Client account archived after project completion.',
    files: []
  }
];