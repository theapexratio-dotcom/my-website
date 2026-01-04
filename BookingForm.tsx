
import React, { useState } from 'react';

export const BookingForm: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: '',
    experience: 'beginner'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    try {
      const response = await fetch('https://formspree.io/f/mqeadbzd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', goals: '', experience: 'beginner' });
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="glass-panel p-12 rounded-[3rem] border-t-2 border-[#a855f7] shadow-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#a855f7]/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-4xl mb-4 uppercase italic italic-fix pr-4">Strategy Locked</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">Richard Al-ameen will personally review your profile. Expect contact within 24 hours.</p>
        <button 
          onClick={() => setStatus('IDLE')}
          className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] hover:underline"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-10 md:p-16 rounded-[3.5rem] border-t-2 border-[#a855f7]/50 shadow-2xl relative overflow-hidden group">
      {/* Background HUD accent */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
        <svg viewBox="0 0 24 24" className="w-64 h-64 text-white" fill="currentColor">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      </div>

      <div className="mb-12 relative z-10">
        <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-4">Phase 00: Initial Contact</span>
        <h2 className="font-display text-4xl md:text-6xl mb-4 uppercase italic italic-fix pr-8 text-white">Reserve Your <br/> Strategy Call</h2>
        <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Limited spaces available for VIP 1-on-1 coaching.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Full Identity</label>
            <input 
              name="name"
              type="text" 
              required
              placeholder="e.g. John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#a855f7] transition-all duration-300 text-white placeholder:text-zinc-800"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Secure Email</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="john@executive.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#a855f7] transition-all duration-300 text-white placeholder:text-zinc-800"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Protocol Experience</label>
          <div className="relative">
            <select 
              name="experience"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#a855f7] transition-all duration-300 text-white appearance-none cursor-pointer"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
            >
              <option value="beginner" className="bg-zinc-900">Initiate (0-1 Years)</option>
              <option value="intermediate" className="bg-zinc-900">Intermediate (1-3 Years)</option>
              <option value="advanced" className="bg-zinc-900">Advanced Specialist (3+ Years)</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Primary Objective</label>
          <textarea 
            name="goals"
            required
            rows={4}
            placeholder="What is the one thing you want to achieve in the next 12 weeks?"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#a855f7] transition-all duration-300 text-white placeholder:text-zinc-800 resize-none leading-relaxed"
            value={formData.goals}
            onChange={(e) => setFormData({...formData, goals: e.target.value})}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'SUBMITTING'}
          className="btn-primary w-full py-7 rounded-2xl text-[12px] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{status === 'SUBMITTING' ? 'Synchronizing Data...' : 'Secure Consultation Slot'}</span>
          <svg className={`w-5 h-5 transition-transform duration-500 ${status === 'SUBMITTING' ? 'animate-spin' : 'group-hover:translate-x-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {status === 'SUBMITTING' ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            )}
          </svg>
        </button>
        
        <div className="flex items-center justify-center gap-6 mt-8 opacity-40">
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Stripe Integrated</span>
           <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Firebase Secured</span>
        </div>
        
        {status === 'ERROR' && (
          <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center mt-4 animate-pulse">
            Transmission Interrupted. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};
