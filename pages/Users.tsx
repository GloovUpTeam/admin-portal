import React, { useState } from 'react';
import { initialUsers, initialAuditLogs, User, AuditLogEntry, Role } from '../services/mockUsers';
import { Search, Download, Plus, Filter, AlertTriangle, X, Check, Activity, Trash2, Edit2, Shield, MoreHorizontal, User as UserIcon, UserCheck, UserPlus, Users as UsersIcon } from 'lucide-react';
import StatCard from '../components/StatCard';

// --- Helper Components ---

const ToggleActiveButton: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => (
  <button 
    onClick={onClick}
    aria-pressed={isActive}
    className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gloov-teal/50 ${isActive ? 'bg-gloov-teal' : 'bg-gray-700'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
    let colors = 'bg-gray-800 text-gray-400 border-gray-700';
    if (role === 'Admin') colors = 'bg-purple-900/30 text-purple-400 border-purple-900/50';
    if (role === 'Manager') colors = 'bg-blue-900/30 text-blue-400 border-blue-900/50';
    if (role === 'Client') colors = 'bg-amber-900/30 text-amber-400 border-amber-900/50';
    if (role === 'Employee') colors = 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50';

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors}`}>
            {role}
        </span>
    );
};

// --- Modals ---

const UserFormModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (data: Partial<User>) => void 
}> = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Employee' as Role, department: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ name: '', email: '', role: 'Employee', department: '' }); // Reset
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gloov-card border border-gloov-border rounded-xl w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-gloov-border">
                    <h3 className="text-xl font-bold text-white">Add New User</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name *</label>
                        <input 
                            required 
                            minLength={2}
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-black/20 border border-gloov-border rounded-lg p-2 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none" 
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address *</label>
                        <input 
                            required 
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-black/20 border border-gloov-border rounded-lg p-2 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none" 
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Role *</label>
                        <select 
                            value={formData.role}
                            onChange={e => setFormData({...formData, role: e.target.value as Role})}
                            className="w-full bg-black/20 border border-gloov-border rounded-lg p-2 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none"
                        >
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                            <option value="Client">Client</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
                        <input 
                            value={formData.department}
                            onChange={e => setFormData({...formData, department: e.target.value})}
                            className="w-full bg-black/20 border border-gloov-border rounded-lg p-2 text-white focus:ring-1 focus:ring-gloov-teal focus:outline-none" 
                            placeholder="e.g. Engineering"
                        />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gloov-border rounded-lg text-gray-400 hover:text-white hover:bg-gloov-hover">Cancel</button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-gloov-teal text-black font-semibold rounded-lg hover:bg-gloov-tealDark transition-colors">Create User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ConfirmArchiveModal: React.FC<{ 
    isOpen: boolean; 
    userName: string;
    onClose: () => void; 
    onConfirm: () => void 
}> = ({ isOpen, userName, onClose, onConfirm }) => {
    const [input, setInput] = useState('');
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gloov-card border border-red-900/50 rounded-xl w-full max-w-sm shadow-2xl">
                <div className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                        <Trash2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Archive User?</h3>
                    <p className="text-gray-400 text-sm">
                        This action will disable access for <span className="text-white font-medium">{userName}</span>. 
                        To confirm, please type <span className="font-mono text-red-400 font-bold">ARCHIVE</span> below.
                    </p>
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="w-full bg-black/20 border border-gray-700 rounded-lg p-2 text-center text-white focus:border-red-500 focus:outline-none font-mono tracking-widest uppercase"
                        placeholder="ARCHIVE"
                    />
                    <div className="flex gap-3 mt-4">
                        <button onClick={onClose} className="flex-1 px-4 py-2 border border-gloov-border rounded-lg text-gray-400 hover:text-white">Cancel</button>
                        <button 
                            disabled={input !== 'ARCHIVE'}
                            onClick={() => { onConfirm(); setInput(''); }}
                            className="flex-1 px-4 py-2 bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RoleChangeModal: React.FC<{
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onConfirm: (newRole: Role) => void;
}> = ({ isOpen, user, onClose, onConfirm }) => {
    if (!isOpen || !user) return null;
    const [selectedRole, setSelectedRole] = useState<Role>(user.role);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gloov-card border border-gloov-border rounded-xl w-full max-w-sm shadow-2xl">
                <div className="p-6 border-b border-gloov-border">
                    <h3 className="text-lg font-bold text-white">Change Role</h3>
                    <p className="text-xs text-gray-500">For {user.name}</p>
                </div>
                <div className="p-6 space-y-3">
                    {(['Admin', 'Manager', 'Employee', 'Client'] as Role[]).map(role => (
                        <label key={role} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedRole === role 
                                ? 'bg-gloov-teal/10 border-gloov-teal' 
                                : 'bg-black/20 border-gloov-border hover:border-gray-500'
                        }`}>
                            <input 
                                type="radio" 
                                name="role_select" 
                                checked={selectedRole === role}
                                onChange={() => setSelectedRole(role)}
                                className="mr-3 text-gloov-teal focus:ring-gloov-teal bg-black border-gray-600"
                            />
                            <span className={selectedRole === role ? 'text-white' : 'text-gray-400'}>{role}</span>
                        </label>
                    ))}
                </div>
                <div className="p-6 pt-0 flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2 border border-gloov-border rounded-lg text-gray-400 hover:text-white">Cancel</button>
                    <button onClick={() => onConfirm(selectedRole)} className="flex-1 px-4 py-2 bg-gloov-teal text-black font-semibold rounded-lg hover:bg-gloov-tealDark">Update</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [logs, setLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [showArchived, setShowArchived] = useState(false);
    
    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [archiveTarget, setArchiveTarget] = useState<User | null>(null);
    const [roleTarget, setRoleTarget] = useState<User | null>(null);

    // -- Actions --

    const addLog = (action: string, target: string, details: string) => {
        const newEntry: AuditLogEntry = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            action,
            targetUser: target,
            details
        };
        setLogs(prev => [newEntry, ...prev]);
    };

    const handleAddUser = (data: Partial<User>) => {
        const newUser: User = {
            id: `u-${Date.now()}`,
            name: data.name!,
            email: data.email!,
            role: data.role!,
            department: data.department || 'General',
            isActive: true,
            isArchived: false,
            lastLogin: 'Never',
            createdAt: new Date().toISOString().split('T')[0]
        };
        setUsers(prev => [newUser, ...prev]);
        addLog('CREATE_USER', newUser.name, `Created new ${newUser.role}`);
    };

    const handleToggleStatus = (user: User) => {
        const newState = !user.isActive;
        setUsers(users.map(u => u.id === user.id ? { ...u, isActive: newState } : u));
        addLog(newState ? 'ACTIVATE' : 'DEACTIVATE', user.name, newState ? 'User activated' : 'User deactivated');
    };

    const handleArchiveConfirm = () => {
        if (!archiveTarget) return;
        setUsers(users.map(u => u.id === archiveTarget.id ? { ...u, isArchived: true, isActive: false } : u));
        addLog('ARCHIVE', archiveTarget.name, 'User archived and deactivated');
        setArchiveTarget(null);
    };

    const handleRoleChangeConfirm = (newRole: Role) => {
        if (!roleTarget) return;
        if (roleTarget.role !== newRole) {
            setUsers(users.map(u => u.id === roleTarget.id ? { ...u, role: newRole } : u));
            addLog('ROLE_CHANGE', roleTarget.name, `Role changed from ${roleTarget.role} to ${newRole}`);
        }
        setRoleTarget(null);
    };

    const handleExport = () => {
        const headers = ['ID,Name,Email,Role,Department,Status,Archived,Joined'];
        const rows = users.map(u => 
            `${u.id},"${u.name}",${u.email},${u.role},"${u.department || ''}",${u.isActive ? 'Active' : 'Inactive'},${u.isArchived},${u.createdAt}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter Logic
    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesArchive = showArchived ? true : !u.isArchived;
        return matchesSearch && matchesArchive;
    });

    // Stats
    const stats = {
        total: users.length,
        active: users.filter(u => u.isActive && !u.isArchived).length,
        employees: users.filter(u => u.role === 'Employee').length,
        admins: users.filter(u => u.role === 'Admin' || u.role === 'Manager').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        User Access Control
                        <Shield className="text-gloov-teal" size={24} />
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Manage employees, clients, and system access.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-gloov-teal text-black font-semibold px-4 py-2 rounded-lg hover:bg-gloov-tealDark transition-colors shadow-lg shadow-gloov-teal/10"
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Total Users" 
                    value={stats.total} 
                    icon={<UsersIcon size={20} />} 
                />
                <StatCard 
                    title="Active Now" 
                    value={stats.active} 
                    trend="up" 
                    change="1 online"
                    icon={<Activity size={20} />} 
                />
                <StatCard 
                    title="Employees" 
                    value={stats.employees} 
                    icon={<UserCheck size={20} />} 
                />
                <StatCard 
                    title="Admins & Managers" 
                    value={stats.admins} 
                    icon={<Shield size={20} />} 
                />
            </div>

            {/* Controls */}
            <div className="bg-gloov-card p-4 rounded-xl border border-gloov-border shadow-sm flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-black/20 border border-gloov-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gloov-teal"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
                        <input 
                            type="checkbox" 
                            checked={showArchived} 
                            onChange={e => setShowArchived(e.target.checked)}
                            className="rounded border-gray-600 bg-black/40 text-gloov-teal focus:ring-0" 
                        />
                        Show Archived
                    </label>
                    <div className="h-6 w-px bg-gloov-border mx-1"></div>
                    <button onClick={handleExport} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* User List Table */}
                <div className="lg:col-span-2 bg-gloov-card rounded-xl shadow-md border border-gloov-border overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-black/40 text-gray-400 font-medium border-b border-gloov-border">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                    <tr key={user.id} className={`hover:bg-gloov-hover transition-colors ${user.isArchived ? 'opacity-50 bg-black/20' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700 font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-200">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <RoleBadge role={user.role} />
                                            {user.department && <p className="text-xs text-gray-500 mt-1">{user.department}</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <ToggleActiveButton isActive={user.isActive} onClick={() => !user.isArchived && handleToggleStatus(user)} />
                                                <span className={`text-xs ${user.isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {!user.isArchived && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => setRoleTarget(user)}
                                                        title="Edit Role"
                                                        className="p-1.5 text-gray-400 hover:text-gloov-teal hover:bg-gloov-teal/10 rounded transition-colors"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => setArchiveTarget(user)}
                                                        title="Archive User"
                                                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                            {user.isArchived && <span className="text-xs text-red-500 font-medium">ARCHIVED</span>}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Audit Trail Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gloov-card rounded-xl shadow-md border border-gloov-border p-6 h-full max-h-[600px] flex flex-col">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-gloov-teal" />
                            Audit Trail
                        </h3>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            {logs.map((log) => (
                                <div key={log.id} className="relative pl-4 border-l-2 border-gray-700 hover:border-gloov-teal transition-colors pb-1">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-700"></div>
                                    <p className="text-xs text-gray-500 mb-0.5 font-mono">
                                        {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        <span className="mx-1">•</span>
                                        {new Date(log.timestamp).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm font-medium text-gray-300">{log.action}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{log.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <UserFormModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onSubmit={handleAddUser} 
            />
            <ConfirmArchiveModal 
                isOpen={!!archiveTarget} 
                userName={archiveTarget?.name || ''} 
                onClose={() => setArchiveTarget(null)} 
                onConfirm={handleArchiveConfirm} 
            />
            <RoleChangeModal 
                isOpen={!!roleTarget} 
                user={roleTarget} 
                onClose={() => setRoleTarget(null)} 
                onConfirm={handleRoleChangeConfirm} 
            />
        </div>
    );
};

export default Users;