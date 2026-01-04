
import React, { useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

type Currency = 'GBP' | 'USD' | 'EUR';
type Frequency = 'monthly' | 'block';

const CURRENCY_CONFIG: Record<Currency, { symbol: string; rate: number }> = {
  GBP: { symbol: '£', rate: 1 },
  USD: { symbol: '$', rate: 1.27 },
  EUR: { symbol: '€', rate: 1.17 },
};

const PLANS = [
  {
    name: 'Monthly Protocol',
    id: 'monthly',
    baseGbpPrice: 150,
    durationMonths: 1,
    subtitle: 'Standard Tier',
    features: ['Standard Training App', 'Apex Score Calculator', 'Bi-weekly Check-ins', 'Basic Nutrition Guide'],
    accent: false
  },
  {
    name: 'Quarterly Elite',
    id: 'quarterly',
    baseGbpPrice: 499,
    durationMonths: 3,
    subtitle: 'High Performance',
    features: ['Personalized Nutrition', 'Apex Ratio Full Analysis', 'Priority Whatsapp Support', 'Executive Stress Audit'],
    accent: true
  },
  {
    name: 'Annual Protocol',
    id: 'annual',
    baseGbpPrice: 1499,
    durationMonths: 12,
    subtitle: 'Lifestyle Architecture',
    features: ['All Elite Features', 'In-Person Strategy Day', 'Lifetime Library Access', '24/7 Concierge Support'],
    accent: false
  }
];

export const Pricing: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('GBP');
  const [frequency, setFrequency] = useState<Frequency>('block');

  const formatPrice = (gbpPrice: number, duration: number) => {
    const config = CURRENCY_CONFIG[currency];
    const totalInCurrency = gbpPrice * config.rate;
    
    if (frequency === 'monthly') {
      const monthlyRate = totalInCurrency / duration;
      return `${config.symbol}${Math.round(monthlyRate)}`;
    }
    
    return `${config.symbol}${Math.round(totalInCurrency).toLocaleString()}`;
  };

  return (
    <section className="py-32 px-6 bg-black relative overflow-visible">
      <div className="max-w-7xl mx-auto overflow-visible">
        {/* Header with Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-12 overflow-visible">
          <div className="text-center md:text-left overflow-visible">
            <span className="text-[#efff00] font-black text-[11px] uppercase tracking-[0.5em] block mb-4">Investment Selection</span>
            <div className="heading-safe-container overflow-visible">
              <h2 className="font-display text-5xl md:text-8xl uppercase italic italic-fix heading-safe text-white pr-6">Tier Structure</h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Currency Dropdown */}
            <div className="relative group">
              <div className="flex items-center space-x-3 px-8 py-4 bg-[#141414] border border-white/10 rounded-2xl cursor-pointer hover:border-[#efff00] transition-all duration-300 shadow-sm">
                <Globe className="w-4 h-4 text-[#efff00]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">{currency}</span>
                <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/10 rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl">
                {(['GBP', 'USD', 'EUR'] as Currency[]).map((c) => (
                  <button 
                    key={c}
                    onClick={() => setCurrency(c)}
                    className="w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#efff00] hover:bg-white/5 transition"
                  >
                    {c} ({CURRENCY_CONFIG[c].symbol})
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Toggle */}
            <div className="flex bg-[#141414] p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setFrequency('monthly')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${frequency === 'monthly' ? 'bg-[#efff00] text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setFrequency('block')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${frequency === 'block' ? 'bg-[#efff00] text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                Block
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`p-12 rounded-[3.5rem] border flex flex-col transition-all duration-500 hover:translate-y-[-12px] ${
                plan.accent 
                  ? 'border-[#efff00] bg-[#141414] shadow-[0_40px_80px_-20px_rgba(239,255,0,0.15)] scale-105 z-10' 
                  : 'border-white/5 bg-[#0e0e0e] shadow-xl hover:border-white/20'
              }`}
            >
              {plan.accent && (
                <div className="inline-block self-start px-5 py-2 bg-[#efff00] text-black text-[9px] font-black uppercase tracking-[0.4em] rounded-full mb-10 shadow-lg shadow-[#efff00]/30 animate-pulse">
                  Elite Standard
                </div>
              )}
              
              <div className="mb-12">
                <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 ${plan.accent ? 'text-[#efff00]' : 'text-zinc-500'}`}>
                  {plan.subtitle}
                </h3>
                <h4 className="font-display text-4xl text-white uppercase italic italic-fix mb-8 pr-4">{plan.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-display text-white tracking-tighter">
                    {formatPrice(plan.baseGbpPrice, plan.durationMonths)}
                  </span>
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                    {frequency === 'monthly' ? '/ Month' : `Full ${plan.durationMonths > 1 ? plan.durationMonths + 'mo' : ''} Block`}
                  </span>
                </div>
              </div>

              <ul className="space-y-6 mb-16 flex-grow">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center text-[11px] text-zinc-400 uppercase tracking-widest font-medium gap-5">
                    <Check className={`w-5 h-5 shrink-0 ${plan.accent ? 'text-[#efff00]' : 'text-zinc-700'}`} /> 
                    {feat}
                  </li>
                ))}
              </ul>

              <Link 
                to={`/onboarding?type=online&plan=${plan.id}`} 
                className={`w-full py-6 rounded-2xl text-center text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-2xl active:scale-95 border-b-4 ${
                  plan.accent 
                    ? 'bg-[#efff00] text-black hover:bg-white border-black/20' 
                    : 'bg-white/5 text-white hover:bg-[#efff00] hover:text-black border-white/5'
                }`}
              >
                Start Protocol
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
