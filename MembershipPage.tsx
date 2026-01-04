
import React from 'react';
import { PricingTable } from '../components/PricingTable.tsx';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MembershipPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[150px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 overflow-visible">
        <div className="mb-20 text-center overflow-visible">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>

          <div className="heading-safe-container overflow-visible">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl italic uppercase tracking-tighter italic-fix pr-4">
              Membership <span className="text-[#a855f7]">Tiers</span>
            </h1>
          </div>
          <p className="text-zinc-500 max-w-2xl mx-auto font-light uppercase tracking-widest text-xs leading-loose mt-8">
            Select your entry level. From self-guided metabolic resets to elite physiological architecture.
          </p>
        </div>

        <PricingTable />
      </div>
    </div>
  );
};
