import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  Ticket, 
  CalendarCheck, 
  Bell,
  Briefcase 
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { label: 'Clients', path: '/clients', icon: <Briefcase size={20} /> },
  { label: 'Users', path: '/users', icon: <Users size={20} /> },
  { label: 'Projects', path: '/projects', icon: <FolderKanban size={20} /> },
  { label: 'Tickets', path: '/tickets', icon: <Ticket size={20} /> },
  { label: 'Attendance & Payroll', path: '/attendance', icon: <CalendarCheck size={20} /> },
  { label: 'Notifications', path: '/notifications', icon: <Bell size={20} /> },
];

export const THEME = {
  colors: {
    primaryGradientStart: '#1DCD9F', // Primary-500
    primaryGradientEnd: '#169976',   // Primary-600
    charcoal: '#222222',             // Brand Charcoal (Card BG)
    textPrimary: '#F7F7F8',          // Neutral-50
    textSecondary: '#9898A0',        // Neutral-400
    background: '#000000',           // Brand Black
    card: '#222222',
    border: '#333333',
    success: '#1DCD9F',
    warning: '#F59E0B',
    error: '#F43F5E',
    info: '#0EA5E9',
    accent1: '#8B5CF6',
    accent2: '#0EA5E9',
  }
};