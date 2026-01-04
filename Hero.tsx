
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onCTA?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCTA }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-[#0a0a0a]">
      {/* Background Visual - Subtle HUD Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.12] grayscale"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Neon Purple Glows */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#a855f7]/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="relative z-10 text-center px-6 max-w-[95rem] w-full overflow-visible">
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-visible">
          <div className="mb-14">
            <span className="inline-block px-8 py-2.5 rounded-full border border-white/10 bg-white/5 text-[#a855f7] text-[10px] font-black uppercase tracking-[0.5em] shadow-sm backdrop-blur-md">
              Richard Al-ameen • Elite Performance Protocol
            </span>
          </div>
          
          <div className="heading-safe-container overflow-visible">
            <h1 className="hero-title font-display text-[15vw] sm:text-[12vw] lg:text-[11.5vw] leading-[0.8] tracking-tight uppercase mb-16 overflow-visible italic-fix pr-24">
              <span className="block text-white italic-fix">Apex Ratio</span>
              <span className="text-[#a855f7] italic block italic-fix mt-4 sm:-mt-6">Coaching</span>
            </h1>
          </div>
          
          <p className="text-zinc-400 text-base md:text-xl lg:text-2xl mb-20 max-w-4xl mx-auto font-light leading-relaxed tracking-widest px-4 uppercase">
            Mastering the Executive Power Score. <br className="hidden md:block" /> 
            Physiological Dominance & Metabolic Resilience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <Link 
            to="/onboarding"
            className="btn-primary w-full sm:w-auto px-20 py-8 rounded-2xl text-[14px] flex items-center justify-center space-x-4"
          >
            <span>Start Assessment</span>
            <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
          <Link 
            to="/transformations"
            className="btn-secondary w-full sm:w-auto px-20 py-8 rounded-2xl text-[14px] font-black uppercase tracking-[0.3em] active:scale-95"
          >
            Elite Results
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 opacity-30 hover:opacity-100 transition-opacity duration-700 group cursor-default">
        <span className="text-[10px] uppercase tracking-[0.7em] font-black text-white group-hover:text-[#a855f7] transition-colors">Enter Protocol</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#a855f7] to-transparent"></div>
      </div>
    </section>
  );
};
