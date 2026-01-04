
import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { name: 'Training App Access', starter: true, athlete: true },
  { name: '2 Training Blocks Included', starter: true, athlete: true },
  { name: 'Apex Ratio Scoreboard', starter: true, athlete: true },
  { name: 'Personalized Macro Coaching', starter: false, athlete: true },
  { name: 'Direct WhatsApp Support', starter: false, athlete: true },
  { name: 'Bi-Weekly Strategy Calls', starter: false, athlete: true },
  { name: 'Physiological Audits', starter: false, athlete: true },
  { name: 'VIP Community Entry', starter: true, athlete: true },
];

export const PricingTable: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden">
      {/* Mobile view: Horizontal Scroll or Stack */}
      <div className="overflow-x-auto md:overflow-visible">
        <table className="w-full border-collapse min-w-[600px] md:min-w-0">
          <thead>
            <tr>
              <th className="text-left py-8 pr-6 border-b border-white/10">
                <div className="heading-safe-container">
                  <span className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em] block mb-2 italic-fix">Compare Levels</span>
                  <h3 className="font-display text-4xl text-white italic uppercase italic-fix pr-4">Protocol</h3>
                </div>
              </th>
              <th className="text-center py-8 px-6 border-b border-white/10 bg-zinc-900/30">
                <div className="heading-safe-container">
                  <h4 className="font-display text-3xl text-white italic uppercase italic-fix pr-4">The Starter</h4>
                  <p className="text-[#a855f7] font-black text-[10px] mt-2 tracking-widest">SELF-GUIDED</p>
                </div>
              </th>
              <th className="text-center py-8 px-6 border-b border-white/10 bg-black">
                <div className="heading-safe-container">
                  <h4 className="font-display text-3xl text-white italic uppercase italic-fix pr-4">The Apex Athlete</h4>
                  <p className="text-[#a855f7] font-black text-[10px] mt-2 tracking-widest">FULLY COACHED</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feature, idx) => (
              <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                <td className="py-6 pr-6 text-[11px] font-black uppercase tracking-widest text-zinc-400 table-row-border group-hover:text-white transition-colors">
                  {feature.name}
                </td>
                <td className="py-6 px-6 text-center table-row-border bg-zinc-900/20">
                  {feature.starter ? (
                    <Check className="w-5 h-5 text-[#a855f7] mx-auto drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                  ) : (
                    <X className="w-5 h-5 text-zinc-800 mx-auto" />
                  )}
                </td>
                <td className="py-6 px-6 text-center table-row-border bg-black">
                  {feature.athlete ? (
                    <Check className="w-5 h-5 text-[#a855f7] mx-auto drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                  ) : (
                    <X className="w-5 h-5 text-zinc-800 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-12 pr-6"></td>
              <td className="py-12 px-6 bg-zinc-900/30 text-center">
                <Link 
                  to="/onboarding?type=online" 
                  className="btn-stark px-8 py-4 rounded-xl text-[10px] flex items-center justify-center gap-2 group mx-auto"
                >
                  Get Started <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </td>
              <td className="py-12 px-6 bg-black text-center">
                <Link 
                  to="/onboarding?type=f2f" 
                  className="btn-primary px-8 py-4 rounded-xl text-[10px] flex items-center justify-center gap-2 group mx-auto"
                >
                  Join Academy <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-16 text-center max-w-2xl mx-auto space-y-4 px-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 leading-loose">
          Subscriptions automatically renew unless cancelled 24 hours before the period ends.
        </p>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 leading-loose">
          14-day money-back guarantee on all annual plans.
        </p>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 leading-loose">
          New training programs for Starter members are available for a one-off fee after the initial two are completed.
        </p>
      </div>
    </div>
  );
};
