
import React from 'react';
import { Milestone, TeamMember, ProjectFile } from '../../services/mockProjects';
import { CheckCircle2, Circle, Clock, AlertCircle, FileText, Download, User as UserIcon } from 'lucide-react';

// --- Progress Bar ---
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-gray-400 font-medium">Progress</span>
      <span className="text-white font-bold">{progress}%</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${
          progress === 100 ? 'bg-functional-success' : 'bg-gradient-to-r from-gloov-teal to-gloov-tealDark'
        }`}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  </div>
);

// --- Team Avatars ---
export const TeamAvatars: React.FC<{ members: TeamMember[]; limit?: number }> = ({ members, limit = 4 }) => {
  const showMembers = members.slice(0, limit);
  const remainder = members.length - limit;

  return (
    <div className="flex items-center -space-x-2">
      {showMembers.map((m) => (
        <div key={m.id} className="group relative">
          <img 
            src={m.avatar} 
            alt={m.name} 
            className="w-8 h-8 rounded-full border-2 border-gloov-card bg-gray-700 object-cover"
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max px-2 py-1 bg-black text-xs text-white rounded shadow-lg z-10 pointer-events-none">
            {m.name} ({m.role})
          </div>
        </div>
      ))}
      {remainder > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-gloov-card bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 z-0">
          +{remainder}
        </div>
      )}
      {members.length === 0 && (
        <span className="text-xs text-gray-500 italic">Unassigned</span>
      )}
    </div>
  );
};

// --- Milestones List ---
export const MilestonesList: React.FC<{ milestones: Milestone[] }> = ({ milestones }) => {
  const getIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={16} className="text-functional-success" />;
      case 'Overdue': return <AlertCircle size={16} className="text-functional-error" />;
      default: return <Circle size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {milestones.map((m) => (
        <div key={m.id} className="flex gap-3">
          <div className="mt-0.5">{getIcon(m.status)}</div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${m.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
              {m.title}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <Clock size={12} />
              <span className={m.status === 'Overdue' ? 'text-functional-error font-medium' : ''}>
                Due: {new Date(m.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
      {milestones.length === 0 && <p className="text-sm text-gray-500">No milestones set.</p>}
    </div>
  );
};

// --- Files List ---
export const FilesList: React.FC<{ files: ProjectFile[] }> = ({ files }) => {
  const handleDownload = (fileName: string) => {
    // Simulation
    const blob = new Blob([`Content for ${fileName}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2">
      {files.map((f) => (
        <div key={f.id} className="flex items-center justify-between p-3 bg-black/20 border border-gloov-border rounded-lg hover:bg-gloov-hover transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-800 rounded text-gloov-teal">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">{f.name}</p>
              <p className="text-xs text-gray-500">{f.type} • {f.size}</p>
            </div>
          </div>
          <button 
            onClick={() => handleDownload(f.name)}
            className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            aria-label={`Download ${f.name}`}
          >
            <Download size={16} />
          </button>
        </div>
      ))}
      {files.length === 0 && <p className="text-sm text-gray-500 italic">No files shared.</p>}
    </div>
  );
};
