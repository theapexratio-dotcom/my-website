
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* HUD Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black opacity-50"></div>
      
      <div className="relative w-full max-w-md glass-panel p-10 md:p-14 rounded-[3rem] shadow-[0_0_100px_rgba(168,85,247,0.1)] border border-white/10 z-10 overflow-visible">
        <div className="text-center mb-12 overflow-visible">
          <div className="mb-10 flex justify-center">
            <div className="w-20 h-20 bg-[#a855f7]/10 rounded-3xl flex items-center justify-center text-[#a855f7] border border-[#a855f7]/20 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <ShieldCheck size={40} />
            </div>
          </div>
          <div className="heading-safe-container overflow-visible">
            <h2 className="font-display text-4xl uppercase italic tracking-tighter text-white italic-fix pr-6">
              Apex Ratio <span className="text-[#a855f7]">Academy</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-5 font-black">Elite Entry Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Identity (Email)</label>
            <input 
              type="email" 
              required
              placeholder="username@apex.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#a855f7] transition-all duration-300 text-white placeholder:text-zinc-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Protocol Key</label>
              <button type="button" className="text-[9px] font-black uppercase tracking-widest text-[#a855f7] hover:underline">Reset Logic</button>
            </div>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#a855f7] transition-all duration-300 text-white placeholder:text-zinc-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full py-6 rounded-2xl text-[11px] flex items-center justify-center gap-3 group"
          >
            <span>Authenticate Access</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-4">
            Unauthorized access is strictly prohibited.
          </p>
          <a href="#/onboarding" className="text-[#a855f7] font-black hover:underline tracking-[0.2em] uppercase text-[9px] border border-[#a855f7]/20 px-4 py-2 rounded-full inline-block">Apply for Academy Enrollment</a>
        </div>
      </div>
    </div>
  );
};
