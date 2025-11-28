
export interface Employee {
  id: string;
  name: string;
  role: string;
  team: string;
  avatar: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  checkIn?: string;
  checkOut?: string;
  hoursWorked?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'Sick' | 'Vacation' | 'Personal';
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Processing' | 'Pending';
  generatedAt: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actorId: string;
  action: string;
  targetId?: string;
  details?: string;
}

export const mockEmployees: Employee[] = [
  { id: 'e1', name: 'Alice Admin', role: 'Manager', team: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'e2', name: 'Bob Builder', role: 'Developer', team: 'Product', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'e3', name: 'Charlie Code', role: 'Developer', team: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 'e4', name: 'Dave Designer', role: 'Designer', team: 'Design', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 'e5', name: 'Eve Engineer', role: 'QA', team: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=5' },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', employeeId: 'e1', date: '2023-10-25', status: 'Present', checkIn: '09:00', checkOut: '17:00', hoursWorked: 8 },
  { id: 'a2', employeeId: 'e2', date: '2023-10-25', status: 'Late', checkIn: '09:45', checkOut: '17:00', hoursWorked: 7.25 },
  { id: 'a3', employeeId: 'e3', date: '2023-10-25', status: 'Present', checkIn: '08:55', checkOut: '17:15', hoursWorked: 8.3 },
  { id: 'a4', employeeId: 'e4', date: '2023-10-25', status: 'Absent' },
  { id: 'a5', employeeId: 'e1', date: '2023-10-24', status: 'Present', checkIn: '09:00', checkOut: '17:00', hoursWorked: 8 },
  { id: 'a6', employeeId: 'e2', date: '2023-10-24', status: 'Present', checkIn: '09:00', checkOut: '17:00', hoursWorked: 8 },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: 'lr1', employeeId: 'e4', type: 'Sick', fromDate: '2023-10-25', toDate: '2023-10-26', reason: 'Flu symptoms', status: 'Pending', submittedAt: '2023-10-24T08:00:00Z' },
  { id: 'lr2', employeeId: 'e2', type: 'Vacation', fromDate: '2023-11-20', toDate: '2023-11-25', reason: 'Family trip', status: 'Approved', submittedAt: '2023-10-10T09:00:00Z' },
  { id: 'lr3', employeeId: 'e3', type: 'Personal', fromDate: '2023-10-30', toDate: '2023-10-30', reason: 'Doctor appointment', status: 'Pending', submittedAt: '2023-10-25T10:00:00Z' },
];

export const mockPayroll: PayrollRecord[] = [
  { id: 'pr1', employeeId: 'e1', month: 'October', year: 2023, baseSalary: 6000, bonuses: 500, deductions: 1200, netPay: 5300, status: 'Processing', generatedAt: '2023-10-20' },
  { id: 'pr2', employeeId: 'e2', month: 'October', year: 2023, baseSalary: 5500, bonuses: 0, deductions: 1100, netPay: 4400, status: 'Processing', generatedAt: '2023-10-20' },
  { id: 'pr3', employeeId: 'e3', month: 'October', year: 2023, baseSalary: 5500, bonuses: 200, deductions: 1100, netPay: 4600, status: 'Processing', generatedAt: '2023-10-20' },
  { id: 'pr4', employeeId: 'e4', month: 'October', year: 2023, baseSalary: 5200, bonuses: 0, deductions: 1000, netPay: 4200, status: 'Processing', generatedAt: '2023-10-20' },
];
