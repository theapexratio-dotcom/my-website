
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Star, BookOpen, X, ChevronRight, LayoutList, User, ShieldCheck, LayoutDashboard, LogOut } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { name: 'Membership', path: '/membership', icon: <LayoutList className="w-4 h-4" /> },
    { name: 'About Coach', path: '/about-coach', icon: <User className="w-4 h-4" /> },
    { name: 'Body Transformations', path: '/transformations', icon: <Star className="w-4 h-4" /> },
    { name: 'Exercise Vault', path: '/library', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20 border-b border-white/5 bg-black/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center overflow-visible">
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center space-x-5 group overflow-visible">
          <div className="relative flex items-center justify-center overflow-visible">
            <svg 
              viewBox="0 0 24 24" 
              className="w-10 h-10 text-[#a855f7] transform group-hover:scale-110 transition-all duration-500 ease-out drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 2L2 22h20L12 2z" strokeLinejoin="round" />
              <path d="M12 2L7 12h10l-5-10z" fill="currentColor" opacity="0.3" />
              <path d="M12 16l-2 4h4l-2-4z" fill="#a855f7" />
            </svg>
          </div>
          <div className="flex flex-col overflow-visible pt-1 border-l border-white/10 pl-5">
            <div className="heading-safe-container leading-none -mt-1">
              <h1 className="font-display text-xl md:text-2xl tracking-[0.05em] leading-none text-white whitespace-nowrap italic-fix pr-6">
                Apex Ratio Coaching
              </h1>
            </div>
            <span className="text-[10px] text-[#a855f7] uppercase tracking-[0.5em] leading-none font-black mt-1">Team Al-ameen</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {menuItems.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.3em] font-black transition-all duration-300 hover:text-white ${
                isActive(link.path) ? 'text-[#a855f7] border-b border-[#a855f7]/50 pb-1' : 'text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated && (
            <Link 
              to="/login"
              className="hidden lg:flex items-center space-x-2 px-5 py-2.5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <ShieldCheck size={14} />
              <span>Coach Access</span>
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
               <Link 
                to="/dashboard"
                className="flex items-center space-x-3 px-8 py-3 bg-white text-black font-black text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-[#a855f7] hover:text-white transition-all duration-500 shadow-xl active:scale-95 group border-b-4 border-black/20"
              >
                <LayoutDashboard size={16} />
                <span>My Dashboard</span>
              </Link>
              <button 
                onClick={onLogout}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                title="Logout Protocol"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link 
              to="/onboarding?type=online"
              className="hidden sm:flex items-center space-x-3 px-8 py-3 bg-[#a855f7] text-white font-black text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-[#a855f7]/20 active:scale-95 group border-b-4 border-[#7e22ce]/50"
            >
              <span>Join Now</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-3 text-white hover:text-[#a855f7] transition-colors bg-white/5 rounded-xl border border-white/5"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-black z-40 p-8 flex flex-col space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-8 flex flex-col">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-display text-white tracking-widest italic italic-fix pr-6"
            >
              Home
            </Link>
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-display text-white tracking-widest italic italic-fix pr-6"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-4">
             {isAuthenticated ? (
               <Link 
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-6 bg-white text-black font-black text-center text-sm uppercase tracking-widest rounded-2xl shadow-2xl border-b-4 border-gray-200 block"
              >
                My Dashboard
              </Link>
             ) : (
               <Link 
                to="/onboarding?type=online"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-6 bg-[#a855f7] text-white font-black text-center text-sm uppercase tracking-widest rounded-2xl shadow-2xl border-b-4 border-[#7e22ce] block"
              >
                Final Assessment Entry
              </Link>
             )}
             {isAuthenticated && (
               <button 
                onClick={() => { onLogout?.(); setIsMobileMenuOpen(false); }}
                className="w-full py-6 bg-red-500/10 text-red-500 font-black text-center text-sm uppercase tracking-widest rounded-2xl border border-red-500/20"
              >
                Terminate Session
              </button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};
