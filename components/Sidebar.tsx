
import React from 'react';
import { LayoutDashboard, Users, BookOpen, CircleDollarSign, LogOut, ChevronRight, ChevronLeft, BarChart3, Mail, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, activeView, setActiveView, isCollapsed, onToggle }) => {
  const menuItems = [
    { id: 'clients', label: 'Managed Roster', icon: <Users size={18} /> },
    { id: 'library', label: 'Protocol Vault', icon: <BookOpen size={18} /> },
    { id: 'finances', label: 'Revenue Audit', icon: <BarChart3 size={18} /> },
    { id: 'comms', label: 'Secure Comms', icon: <Mail size={18} /> },
  ];

  return (
    <aside className={`h-screen bg-black border-r border-white/5 flex flex-col z-50 transition-all duration-500 ease-in-out shrink-0 ${isCollapsed ? 'w-24' : 'w-80'}`}>
      <div className={`p-12 border-b border-white/5 flex items-center ${isCollapsed ? 'justify-center p-8' : 'space-x-6'} overflow-visible relative`}>
        <div className="p-3 bg-amber-400 rounded-2xl shadow-2xl shadow-amber-400/20 shrink-0">
          <ShieldCheck size={24} className="text-black" />
        </div>
        {!isCollapsed && (
          <div className="overflow-visible animate-in fade-in slide-in-from-left-2 duration-500">
            <h2 className="font-display text-3xl leading-none text-white italic-fix pr-4 uppercase italic">Admin</h2>
            <p className="text-[8px] font-black tracking-[0.4em] text-amber-400 uppercase mt-2">Richard Al-ameen</p>
          </div>
        )}
        
        {/* Toggle Button Inside Sidebar */}
        <button 
          onClick={onToggle}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform active:scale-90 border-4 border-[#0a0a0a]"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className={`flex-grow p-8 space-y-3 mt-10 ${isCollapsed ? 'px-4' : ''}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center rounded-2xl transition-all duration-500 group relative ${
              isCollapsed ? 'justify-center py-5' : 'justify-between px-8 py-5'
            } ${
              activeView === item.id 
                ? 'bg-amber-400 text-black shadow-2xl shadow-amber-400/10' 
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-5'}`}>
              <span className={activeView === item.id ? 'text-black' : 'text-zinc-600 group-hover:text-amber-400 transition-colors'}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in duration-500">{item.label}</span>}
            </div>
            
            {isCollapsed && (
              <div className="absolute left-full ml-6 px-4 py-3 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 border border-white/10 shadow-2xl">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className={`p-10 border-t border-white/5 ${isCollapsed ? 'p-6 flex justify-center' : ''}`}>
        <button 
          onClick={onLogout}
          className={`flex items-center text-zinc-600 hover:text-red-500 transition-all duration-500 group ${isCollapsed ? 'justify-center w-full py-5' : 'w-full space-x-5 px-8 py-5 rounded-2xl hover:bg-red-500/10'}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in duration-500">Terminate Access</span>}
        </button>
      </div>
    </aside>
  );
};
