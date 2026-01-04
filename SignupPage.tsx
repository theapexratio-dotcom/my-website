
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ChevronRight, Activity, Target } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // logic: pull data from local storage (onboarding simulation)
    const onboardingData = localStorage.getItem('apex_onboarding_pending');
    
    // Simulate Firebase logic
    setTimeout(() => {
      // Create user profile in storage
      const newUser = {
        uid: 'user_' + Date.now(),
        email: email,
        displayName: 'New Athlete',
        isCoach: false,
        serviceType: 'Online', // Default
        sessionBalance: 0,
        sessionHistory: [],
        subscriptionStatus: 'Pending',
        currentWeight: '0',
        targetWeight: '0',
        mainGoal: 'Elite Performance'
      };

      localStorage.setItem('apex_user', JSON.stringify(newUser));
      localStorage.setItem('apex_auth', 'true');
      alert("Portal Synchronized. Welcome to the Apex Standard.");
      window.location.hash = '#/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-black to-indigo-900/10 pointer-events-none"></div>
      
      <div className="relative w-full max-w-xl glass-panel p-12 md:p-16 rounded-[3.5rem] shadow-[0_0_100px_rgba(168,85,247,0.1)] border border-white/10 overflow-visible">
        <div className="text-center mb-16 overflow-visible">
          <div className="heading-safe-container overflow-visible mb-6">
            <h1 className="font-display text-5xl md:text-6xl text-white uppercase italic italic-fix pr-6">
              Apex <span className="text-[#a855f7]">Academy</span> Portal
            </h1>
          </div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Finalize Your Professional Enrollment</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <Activity className="text-[#a855f7] mb-3" size={24} />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Service Model</span>
              <span className="text-white text-[11px] font-bold uppercase tracking-wider mt-1">Tier 1: Managed</span>
           </div>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <Target className="text-[#a855f7] mb-3" size={24} />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Audit Status</span>
              <span className="text-white text-[11px] font-bold uppercase tracking-wider mt-1">Pending Sync</span>
           </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-8">
          <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-8">
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Verified Identity (Email)</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-[#a855f7] outline-none transition text-white placeholder:text-zinc-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Protocol Key (Password)</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-[#a855f7] outline-none transition text-white placeholder:text-zinc-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
             </div>
          </div>

          <div className="flex items-start gap-4 px-4">
             <div className="w-5 h-5 rounded bg-[#a855f7]/20 flex items-center justify-center shrink-0 mt-1 border border-[#a855f7]/30">
                <Sparkles size={12} className="text-[#a855f7]" />
             </div>
             <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] leading-relaxed">
               By initializing this portal, I accept the Apex <span className="text-white underline">Privacy Protocol</span> and confirm that my physiological data is accurate.
             </p>
          </div>

          <button 
            type="submit" 
            disabled={isCreating}
            className="btn-primary w-full py-7 rounded-2xl flex items-center justify-center gap-4 text-xs shadow-2xl shadow-purple-500/20"
          >
            <span>{isCreating ? 'Synchronizing Assets...' : 'Initialize Academy Access'}</span>
            <ChevronRight size={20} />
          </button>
        </form>

        <div className="mt-12 text-center pt-10 border-t border-white/5">
           <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition">
             Existing Athlete? <span className="text-[#a855f7]">Authenticate Hub</span>
           </Link>
        </div>
      </div>
    </div>
  );
};
