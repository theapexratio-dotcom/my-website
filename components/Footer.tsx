
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="mr-5">
              <svg 
                viewBox="0 0 24 24" 
                className="w-10 h-10 text-[#a855f7]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                <path d="M12 2L2 22h20L12 2z" strokeLinejoin="round" />
                <path d="M12 2L7 12h10l-5-10z" fill="currentColor" opacity="0.3" />
                <path d="M12 16l-2 4h4l-2-4z" fill="currentColor" />
              </svg>
            </div>
            <div>
               <p className="text-[10px] text-[#a855f7] font-black uppercase tracking-[0.5em] leading-none mb-1">Richard Al-ameen</p>
               <h2 className="font-display text-2xl tracking-tight uppercase italic leading-none text-white">Apex Ratio Coaching</h2>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 uppercase tracking-[0.3em] leading-loose font-medium opacity-60">
            &copy; 2024 Apex Performance Systems. <br className="hidden md:block"/> Professional Architecture by Team Al-ameen.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-10">
           <div className="flex flex-col space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-2">Social Protocol</span>
              <a href="#" className="text-gray-500 hover:text-[#a855f7] transition text-[11px] font-black uppercase tracking-widest">Instagram</a>
              <a href="#" className="text-gray-500 hover:text-[#a855f7] transition text-[11px] font-black uppercase tracking-widest">YouTube</a>
           </div>
           <div className="flex flex-col space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-2">Internal Gate</span>
              <Link to="/login" className="text-gray-500 hover:text-[#a855f7] transition text-[11px] font-black uppercase tracking-widest">Coach Hub</Link>
              <Link to="/membership" className="text-gray-500 hover:text-white transition text-[11px] font-black uppercase tracking-widest">Elite Access</Link>
           </div>
           <div className="flex flex-col space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-2">Legal Asset</span>
              <a href="#" className="text-gray-500 hover:text-white transition text-[11px] font-black uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition text-[11px] font-black uppercase tracking-widest">Terms of Entry</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
