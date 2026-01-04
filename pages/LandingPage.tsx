
import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero.tsx';
import { HowItWorks } from '../components/HowItWorks.tsx';
import { Pricing } from '../components/Pricing.tsx';
import { Transformations } from '../components/Transformations.tsx';
import { BookingForm } from '../components/BookingForm.tsx';
import { Activity, Zap, Shield, Play } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="pb-20 bg-[#0a0a0a] overflow-x-hidden">
      <Hero />
      <HowItWorks />

      {/* Philosophy Brief with Boardroom Faded Background */}
      <section className="relative py-40 px-6 overflow-visible bg-black">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.06] grayscale"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
           <div className="relative group">
             <div className="absolute -inset-4 bg-gradient-to-r from-[#a855f7] to-purple-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
             <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 aspect-[4/5] shadow-2xl bg-[#141414]">
               <img 
                 src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" 
                 className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 scale-110 group-hover:scale-100 group-hover:grayscale-0 group-hover:opacity-100" 
                 alt="Richard Al-ameen - Apex Architecture" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
             </div>
             <div className="absolute -bottom-10 -right-10 bg-black border border-white/10 p-10 rounded-[2.5rem] shadow-2xl transform group-hover:scale-110 transition-transform duration-700">
                <p className="text-7xl font-display italic text-[#a855f7] italic-fix leading-none pr-4">9.2</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mt-2">Elite Benchmark</p>
             </div>
           </div>
           
           <div className="overflow-visible">
             <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-8">The Philosophy</span>
             <div className="heading-safe-container">
                <h2 className="font-display text-4xl md:text-7xl mb-10 leading-[0.9] italic uppercase italic-fix text-white pr-10">
                  Your Body is Your <br/> High-Performance Asset.
                </h2>
             </div>
             <p className="text-zinc-400 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-lg">
               Richard Al-ameen focuses on the <strong className="text-white">Apex Ratio</strong>—a proprietary scoring system that balances Aesthetic Influence with Metabolic Resilience. 
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start space-x-4">
                  <Shield className="w-5 h-5 text-[#a855f7] shrink-0 mt-1" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Physiological Audit</p>
                </div>
                <div className="flex items-start space-x-4">
                  <Activity className="w-5 h-5 text-[#a855f7] shrink-0 mt-1" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Metabolic Tuning</p>
                </div>
             </div>

             {/* Flashing Neon Purple Button */}
             <Link 
              to="/transformations" 
              className="inline-flex items-center space-x-6 px-12 py-6 bg-[#a855f7] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 animate-flash-purple group border-b-4 border-black/30"
             >
               <span>Success Case Studies</span>
               <Play size={14} className="fill-current group-hover:translate-x-2 transition-transform" />
             </Link>
           </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section className="py-40 px-6 bg-[#0a0a0a] overflow-visible border-y border-white/5">
        <div className="max-w-7xl mx-auto overflow-visible">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 overflow-visible">
            <div className="max-w-2xl overflow-visible text-white">
               <div className="heading-safe-container">
                 <h2 className="font-display text-5xl md:text-9xl uppercase italic italic-fix pr-12 text-white">Transformations</h2>
               </div>
               <p className="text-zinc-500 mt-6 text-base md:text-xl font-light uppercase tracking-widest leading-loose max-w-lg">
                 Protocol outcomes that redefine the executive standard.
               </p>
            </div>
            <Link to="/transformations" className="btn-secondary px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-widest">Browse Archive</Link>
          </div>
          
          <Transformations />
        </div>
      </section>

      {/* Booking Form Integration */}
      <section className="py-40 px-6 bg-black relative">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </section>

      <Pricing />
    </div>
  );
};
