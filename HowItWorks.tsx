
import React from 'react';
import { UserPlus, PlayCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Methodology</span>
          <h2 className="font-display text-5xl md:text-7xl uppercase italic mb-4 text-white italic-fix pr-10">Protocol Engine</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-light uppercase tracking-widest text-[10px] tracking-[0.4em]">Experience based results &bull; Precision execution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Setup Card */}
          <Link 
            to="/onboarding"
            className="glass-panel p-12 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-[#a855f7]/40 transition-all duration-700 shadow-xl bg-[#141414] animate-flash-purple block"
          >
            <div className="mb-10 w-20 h-20 bg-[#a855f7]/10 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#a855f7] transition-all duration-500">
              <UserPlus className="w-8 h-8 text-[#a855f7] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-display text-3xl mb-6 italic uppercase text-white italic-fix pr-4">THE SETUP</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">Complete your physiological audit. We establish your baseline SWR and RHR immediately via our secure API.</p>
            <div className="mt-auto py-3 px-8 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[#a855f7] transition">Phase 01</div>
          </Link>

          {/* Academy Card */}
          <Link 
            to="/academy" 
            className="p-12 rounded-[2.5rem] flex flex-col items-center text-center group transition-all duration-700 relative bg-[#a855f7] shadow-2xl shadow-[#a855f7]/20 scale-105 z-10 border-b-8 border-[#7e22ce]/50 block"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-[#a855f7] shadow-xl border border-white/10">VIP ENTRY</div>
            <div className="mb-10 w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
              <PlayCircle className="w-10 h-10 text-[#a855f7] fill-[#a855f7]/20" />
            </div>
            <h3 className="font-display text-4xl mb-6 italic uppercase text-white italic-fix pr-6">THE ACADEMY</h3>
            <p className="text-white/90 text-sm leading-relaxed mb-10 font-bold uppercase tracking-wide">Experience the elite standard. Access private transformations and apply for training architecture.</p>
            <div className="mt-auto flex items-center space-x-4 bg-black text-[#a855f7] px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-colors">
               <span>Enter Vault</span>
               <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          {/* Result Card */}
          <Link 
            to="/transformations"
            className="glass-panel p-12 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-[#a855f7]/40 transition-all duration-700 shadow-xl bg-[#141414] animate-flash-purple block"
          >
            <div className="mb-10 w-20 h-20 bg-[#a855f7]/10 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#a855f7] transition-all duration-500">
              <TrendingUp className="w-8 h-8 text-[#a855f7] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-display text-3xl mb-6 italic uppercase text-white italic-fix pr-4">THE RESULT</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">Log movements, track metabolic trends, and watch your Apex Score climb. Bi-weekly adjustments ensure zero plateaus.</p>
            <div className="mt-auto py-3 px-8 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[#a855f7] transition">Phase 03</div>
          </Link>
        </div>
      </div>
    </section>
  );
};
