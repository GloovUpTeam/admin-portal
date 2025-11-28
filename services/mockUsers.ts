
export type Role = 'Admin' | 'Manager' | 'Employee' | 'Client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  isArchived: boolean;
  department?: string;
  lastLogin: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  targetUser: string;
  details: string;
}

export const initialUsers: User[] = [
  { id: 'u1', name: 'Alice Admin', email: 'alice@gloovup.com', role: 'Admin', isActive: true, isArchived: false, department: 'IT', lastLogin: '2023-10-25T08:30:00Z', createdAt: '2023-01-15' },
  { id: 'u2', name: 'Bob Builder', email: 'bob@gloovup.com', role: 'Manager', isActive: true, isArchived: false, department: 'Engineering', lastLogin: '2023-10-24T17:00:00Z', createdAt: '2023-02-10' },
  { id: 'u3', name: 'Charlie Client', email: 'charlie@acme.com', role: 'Client', isActive: true, isArchived: false, department: 'External', lastLogin: '2023-10-20T09:15:00Z', createdAt: '2023-03-05' },
  { id: 'u4', name: 'Dave Designer', email: 'dave@gloovup.com', role: 'Employee', isActive: false, isArchived: false, department: 'Design', lastLogin: '2023-09-15T10:00:00Z', createdAt: '2023-04-20' },
  { id: 'u5', name: 'Eve Engineer', email: 'eve@gloovup.com', role: 'Employee', isActive: true, isArchived: false, department: 'Engineering', lastLogin: '2023-10-25T09:00:00Z', createdAt: '2023-05-12' },
  { id: 'u6', name: 'Frank Former', email: 'frank@gloovup.com', role: 'Employee', isActive: false, isArchived: true, department: 'Sales', lastLogin: '2023-01-01T00:00:00Z', createdAt: '2022-11-30' },
  { id: 'u7', name: 'Grace Guest', email: 'grace@partner.com', role: 'Client', isActive: true, isArchived: false, department: 'External', lastLogin: '2023-10-21T11:00:00Z', createdAt: '2023-06-15' },
  { id: 'u8', name: 'Harry HR', email: 'harry@gloovup.com', role: 'Manager', isActive: true, isArchived: false, department: 'HR', lastLogin: '2023-10-25T08:00:00Z', createdAt: '2023-02-28' },
];

export const initialAuditLogs: AuditLogEntry[] = [
  { id: 'log1', timestamp: new Date(Date.now() - 3600000).toISOString(), action: 'LOGIN', targetUser: 'Alice Admin', details: 'Successful login' },
  { id: 'log2', timestamp: new Date(Date.now() - 86400000).toISOString(), action: 'ROLE_CHANGE', targetUser: 'Bob Builder', details: 'Promoted to Manager' }
];
