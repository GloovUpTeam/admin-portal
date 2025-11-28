import React, { useState, useEffect } from 'react';
import { mockDetailedProjects, DetailedProject } from '../services/mockProjects';
import StatusBadge from '../components/StatusBadge';
import { ProgressBar, TeamAvatars } from '../components/project/ProjectComponents';
import ProjectDrawer from '../components/project/ProjectDrawer';
import { Search, Filter, Download, ChevronRight, SlidersHorizontal, Folder, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<DetailedProject[]>(mockDetailedProjects);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Responsive Check
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter Logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Selected Project Data
  const selectedProject = projects.find(p => p.id === selectedId) || null;

  // Export CSV
  const handleExport = () => {
    const headers = ['ID,Name,Client,Status,Deadline,Progress'];
    const rows = filteredProjects.map(p => 
      `${p.id},"${p.name}","${p.client}",${p.status},${p.deadline},${p.progress}%`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `projects_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'Active').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    delayed: projects.filter(p => p.status === 'Delayed').length
  };

  return (
    <div className="space-y-6 h-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor active development and deliverables.</p>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={handleExport}
             className="flex items-center gap-2 bg-gloov-card border border-gloov-border text-gray-200 px-4 py-2 rounded-lg hover:bg-gloov-hover transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Projects" 
          value={stats.total} 
          icon={<Folder size={20} />} 
        />
        <StatCard 
          title="Active Projects" 
          value={stats.active} 
          trend="up" 
          change="1 new"
          icon={<Clock size={20} />} 
        />
        <StatCard 
          title="Completed" 
          value={stats.completed} 
          icon={<CheckCircle2 size={20} />} 
        />
        <StatCard 
          title="Delayed" 
          value={stats.delayed} 
          trend="down" 
          change="Needs attention"
          icon={<AlertCircle size={20} />} 
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
        
        {/* Left Column: Project List */}
        <div className={`lg:col-span-${selectedId ? '8' : '12'} transition-all duration-300 space-y-4`}>
          
          {/* Controls Bar */}
          <div className="bg-gloov-card p-4 rounded-xl border border-gloov-border shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search projects or clients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-gloov-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gloov-teal text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Active', 'Delayed', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${
                    statusFilter === status 
                      ? 'bg-gloov-teal/10 border-gloov-teal text-gloov-teal' 
                      : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="hidden sm:flex items-center justify-center p-2 text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:bg-gloov-hover">
               <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* Table / List */}
          <div className="bg-gloov-card rounded-xl shadow-md border border-gloov-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 text-gray-400 font-medium border-b border-gloov-border">
                  <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Team</th>
                    <th className="px-6 py-4 hidden md:table-cell">Deadline</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 w-1/4 hidden lg:table-cell">Progress</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      onClick={() => setSelectedId(project.id)}
                      className={`cursor-pointer transition-colors group ${
                        selectedId === project.id 
                          ? 'bg-gloov-teal/5 border-l-2 border-gloov-teal' 
                          : 'hover:bg-gloov-hover border-l-2 border-transparent'
                      }`}
                      role="row"
                      aria-selected={selectedId === project.id}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedId(project.id);
                        }
                      }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className={`font-semibold transition-colors ${selectedId === project.id ? 'text-gloov-teal' : 'text-gray-200 group-hover:text-white'}`}>
                            {project.name}
                          </p>
                          <p className="text-xs text-gray-500">{project.client}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <TeamAvatars members={project.assignedTeamDetails} limit={3} />
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-400">
                        {new Date(project.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="w-full max-w-[140px]">
                           <ProgressBar progress={project.progress} />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        <ChevronRight size={18} className={`transition-transform duration-200 ${selectedId === project.id ? 'text-gloov-teal translate-x-1' : 'group-hover:text-gray-400'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProjects.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                   No projects found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detail View (Panel or Drawer) */}
        {(selectedId || !isMobile) && (
            <div className={`lg:col-span-4 ${!selectedId ? 'hidden lg:block' : ''}`}>
               <ProjectDrawer 
                  project={selectedProject} 
                  onClose={() => setSelectedId(null)} 
                  isMobile={isMobile}
               />
            </div>
        )}

      </div>
    </div>
  );
};

export default Projects;