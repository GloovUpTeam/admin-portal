
export type TicketStatus = 'Open' | 'In Progress' | 'Review' | 'Closed';
export type TicketPriority = 'High' | 'Medium' | 'Low';

export interface TicketUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'PDF' | 'IMG' | 'LOG' | 'ZIP';
  size: string;
  url: string;
}

export interface DetailedTicket {
  id: string;
  subject: string;
  description: string;
  client: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  resolvedAt: string | null;
  assignedTo: TicketUser | null;
  assigneeId?: string; // Added for local logic
  attachments: Attachment[];
  slaHours: number;
}

export const mockDetailedTickets: DetailedTicket[] = [
  {
    id: 'T-1001',
    subject: 'Production Server Latency',
    description: 'High latency on API.',
    client: 'Acme Corp',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2023-10-25T08:00:00Z',
    resolvedAt: null,
    assignedTo: { id: 'u1', name: 'Frank Fixer', role: 'DevOps', avatar: 'https://i.pravatar.cc/150?u=f' },
    assigneeId: 'u1',
    attachments: [],
    slaHours: 4
  },
  {
    id: 'T-1002',
    subject: 'Update Brand Colors',
    description: 'Update primary button color.',
    client: 'Globex',
    priority: 'Low',
    status: 'Open',
    createdAt: '2023-10-24T10:30:00Z',
    resolvedAt: null,
    assignedTo: null,
    assigneeId: undefined,
    attachments: [],
    slaHours: 48
  },
  {
    id: 'T-1003',
    subject: 'Database Connection Error',
    description: 'Intermittent connection failures to the read replica DB.',
    client: 'Soylent Corp',
    priority: 'High',
    status: 'Review',
    createdAt: '2023-10-23T14:15:00Z',
    resolvedAt: null,
    assignedTo: { id: 'u2', name: 'Eve Engineer', role: 'Backend', avatar: 'https://i.pravatar.cc/150?u=e' },
    assigneeId: 'u2',
    attachments: [],
    slaHours: 8
  },
  {
    id: 'T-1004',
    subject: 'Broken Link on Homepage',
    description: 'The "Contact Us" link in the footer redirects to a 404 page.',
    client: 'Umbrella Inc',
    priority: 'Medium',
    status: 'Closed',
    createdAt: '2023-10-20T09:00:00Z',
    resolvedAt: '2023-10-20T11:30:00Z',
    assignedTo: { id: 'u3', name: 'Alice Admin', role: 'Support Lead', avatar: 'https://i.pravatar.cc/150?u=a' },
    assigneeId: 'u3',
    attachments: [],
    slaHours: 24
  },
  {
    id: 'T-1005',
    subject: 'User Export Fails',
    description: 'Exporting the user list to CSV results in an empty file.',
    client: 'Cyberdyne',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2023-10-25T09:45:00Z',
    resolvedAt: null,
    assignedTo: { id: 'u2', name: 'Eve Engineer', role: 'Backend', avatar: 'https://i.pravatar.cc/150?u=e' },
    assigneeId: 'u2',
    attachments: [],
    slaHours: 24
  },
  {
    id: 'T-1006',
    subject: 'New User Onboarding',
    description: 'Need to set up accounts for 5 new employees.',
    client: 'Massive Dynamic',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2023-10-15T08:00:00Z',
    resolvedAt: '2023-10-15T10:00:00Z',
    assignedTo: { id: 'u3', name: 'Alice Admin', role: 'Support Lead', avatar: 'https://i.pravatar.cc/150?u=a' },
    assigneeId: 'u3',
    attachments: [],
    slaHours: 48
  }
];
