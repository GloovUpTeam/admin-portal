import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { NAV_ITEMS, THEME } from '../constants';

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gloov-teal to-gloov-tealDark flex items-center justify-center text-white">
      G
    </div>
    <span>Gloov Up</span>
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const current = NAV_ITEMS.find(item => item.path === location.pathname);
    return current ? current.label : 'Portal';
  };

  return (
    <div className="min-h-screen bg-gloov-bg flex font-sans text-neutral-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gloov-card border-r border-gloov-border 
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gloov-border">
            <Logo />
            <button 
              className="ml-auto lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-gloov-teal/20 to-transparent text-gloov-teal border-l-4 border-gloov-teal' 
                    : 'text-gray-400 hover:bg-gloov-hover hover:text-white'}
                `}
              >
                <span className={location.pathname === item.path ? 'text-gloov-teal' : 'text-gray-500 group-hover:text-white'}>
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gloov-border">
            <div className="flex items-center gap-3 px-3 py-3">
              <img 
                src="https://picsum.photos/40/40" 
                alt="Admin" 
                className="w-10 h-10 rounded-full border border-gray-600"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-gray-200">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@gloovup.com</p>
              </div>
              <button className="text-gray-500 hover:text-red-400 transition-colors" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gloov-bg">
        {/* Top Header */}
        <header className="h-16 bg-gloov-card border-b border-gloov-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-400 p-1 rounded-md hover:bg-gloov-hover"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <span className="flex items-center gap-1 hover:text-gray-300 transition-colors cursor-default">
                Portal <ChevronRight size={14} /> {getPageTitle()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;