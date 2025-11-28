
import React from 'react';
import { DetailedProject } from '../../services/mockProjects';
import StatusBadge from '../StatusBadge';
import { ProgressBar, TeamAvatars, MilestonesList, FilesList } from './ProjectComponents';
import { X, Calendar, Flag, Folder, Users } from 'lucide-react';

interface ProjectDrawerProps {
  project: DetailedProject | null;
  onClose: () => void;
  isMobile: boolean;
}

const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose, isMobile }) => {
  if (!project) {
    if (isMobile) return null;
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-gloov-card border border-gloov-border rounded-xl text-center p-8">
        <div>
          <Folder size={48} className="mx-auto text-gray-700 mb-4" />
          <h3 className="text-gray-400 font-medium">Select a project</h3>
          <p className="text-sm text-gray-600">Click on a row to view details</p>
        </div>
      </div>
    );
  }

  const Content = (
    <div className="h-full flex flex-col bg-gloov-card border border-gloov-border lg:rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gloov-border flex justify-between items-start bg-gradient-to-r from-gloov-card to-black/40">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-gloov-teal uppercase tracking-wider">{project.client}</span>
            <StatusBadge status={project.status} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{project.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
             <Calendar size={14} />
             <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Close details"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* Description */}
        <div>
          <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Progress */}
        <div className="bg-black/20 p-4 rounded-xl border border-gloov-border">
          <ProgressBar progress={project.progress} />
        </div>

        {/* Team */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users size={16} className="text-gloov-teal" /> Team
          </h3>
          <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-gloov-border">
             <TeamAvatars members={project.assignedTeamDetails} limit={10} />
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Flag size={16} className="text-gloov-teal" /> Milestones
          </h3>
          <MilestonesList milestones={project.milestones} />
        </div>

        {/* Files */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Folder size={16} className="text-gloov-teal" /> Files
          </h3>
          <FilesList files={project.files} />
        </div>

      </div>
    </div>
  );

  // Mobile Drawer (Fixed Overlay)
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        <div className="relative w-full max-w-md h-full bg-gloov-card shadow-2xl animate-slide-in-right">
          {Content}
        </div>
      </div>
    );
  }

  // Desktop Panel (Sticky/Embedded)
  return <div className="h-[calc(100vh-8rem)] sticky top-6">{Content}</div>;
};

export default ProjectDrawer;
