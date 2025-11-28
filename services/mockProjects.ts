
import { Project, Status } from '../types';

export interface Milestone {
  id: string;
  title: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  dueDate: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'PDF' | 'IMG' | 'DOC' | 'ZIP';
  size: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface DetailedProject extends Project {
  description: string;
  milestones: Milestone[];
  assignedTeamDetails: TeamMember[];
  files: ProjectFile[];
}

export const mockDetailedProjects: DetailedProject[] = [
  {
    id: 'P-001',
    name: 'Website Redesign',
    client: 'Acme Corp',
    progress: 75,
    status: 'Active',
    deadline: '2023-11-30',
    teamMembers: ['Alice', 'Bob'], // Legacy simple array
    description: 'Complete overhaul of the corporate website with focus on accessibility and mobile responsiveness.',
    assignedTeamDetails: [
      { id: 'u1', name: 'Alice Admin', role: 'Project Lead', avatar: 'https://i.pravatar.cc/150?u=a' },
      { id: 'u2', name: 'Bob Builder', role: 'Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=b' }
    ],
    milestones: [
      { id: 'm1', title: 'Wireframes Approval', status: 'Completed', dueDate: '2023-10-01' },
      { id: 'm2', title: 'Frontend Implementation', status: 'Completed', dueDate: '2023-10-20' },
      { id: 'm3', title: 'Content Integration', status: 'Pending', dueDate: '2023-11-10' },
      { id: 'm4', title: 'Final QA & Launch', status: 'Pending', dueDate: '2023-11-30' }
    ],
    files: [
      { id: 'f1', name: 'Design_System_v2.pdf', type: 'PDF', size: '2.4 MB' },
      { id: 'f2', name: 'Assets_Bundle.zip', type: 'ZIP', size: '15 MB' }
    ]
  },
  {
    id: 'P-002',
    name: 'Mobile App Launch',
    client: 'Globex',
    progress: 40,
    status: 'Delayed',
    deadline: '2023-12-15',
    teamMembers: ['Charlie', 'Dave', 'Eve'],
    description: 'Native iOS and Android application for the new loyalty program.',
    assignedTeamDetails: [
      { id: 'u3', name: 'Charlie Code', role: 'Mobile Dev', avatar: 'https://i.pravatar.cc/150?u=c' },
      { id: 'u4', name: 'Dave Designer', role: 'UI/UX', avatar: 'https://i.pravatar.cc/150?u=d' },
      { id: 'u5', name: 'Eve Engineer', role: 'Backend', avatar: 'https://i.pravatar.cc/150?u=e' }
    ],
    milestones: [
      { id: 'm1', title: 'API Specification', status: 'Completed', dueDate: '2023-09-15' },
      { id: 'm2', title: 'Beta Release', status: 'Overdue', dueDate: '2023-10-15' },
      { id: 'm3', title: 'Store Submission', status: 'Pending', dueDate: '2023-12-01' }
    ],
    files: [
      { id: 'f1', name: 'API_Docs.pdf', type: 'PDF', size: '1.2 MB' },
      { id: 'f2', name: 'App_Icon_Set.zip', type: 'ZIP', size: '5 MB' }
    ]
  },
  {
    id: 'P-003',
    name: 'Cloud Migration',
    client: 'Soylent Corp',
    progress: 90,
    status: 'Active',
    deadline: '2023-10-25',
    teamMembers: ['Frank'],
    description: 'Migrating legacy on-premise servers to AWS infrastructure.',
    assignedTeamDetails: [
      { id: 'u6', name: 'Frank Fixer', role: 'DevOps', avatar: 'https://i.pravatar.cc/150?u=f' }
    ],
    milestones: [
      { id: 'm1', title: 'Infrastructure Audit', status: 'Completed', dueDate: '2023-08-01' },
      { id: 'm2', title: 'Data Transfer', status: 'Completed', dueDate: '2023-09-15' },
      { id: 'm3', title: 'DNS Switchover', status: 'Pending', dueDate: '2023-10-25' }
    ],
    files: [
      { id: 'f1', name: 'Migration_Plan.docx', type: 'DOC', size: '500 KB' }
    ]
  },
  {
    id: 'P-004',
    name: 'Marketing Dashboard',
    client: 'Umbrella Inc',
    progress: 100,
    status: 'Completed',
    deadline: '2023-09-30',
    teamMembers: ['Alice', 'Eve'],
    description: 'Internal dashboard for tracking marketing campaign ROI.',
    assignedTeamDetails: [
      { id: 'u1', name: 'Alice Admin', role: 'Project Lead', avatar: 'https://i.pravatar.cc/150?u=a' },
      { id: 'u5', name: 'Eve Engineer', role: 'Backend', avatar: 'https://i.pravatar.cc/150?u=e' }
    ],
    milestones: [
      { id: 'm1', title: 'Requirements', status: 'Completed', dueDate: '2023-08-01' },
      { id: 'm2', title: 'Development', status: 'Completed', dueDate: '2023-09-01' },
      { id: 'm3', title: 'Handover', status: 'Completed', dueDate: '2023-09-30' }
    ],
    files: [
      { id: 'f1', name: 'User_Manual.pdf', type: 'PDF', size: '3.5 MB' }
    ]
  }
];
