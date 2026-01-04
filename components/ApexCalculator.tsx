
import React, { useState, useEffect } from 'react';
import { Info, Target, Activity, Zap, TrendingUp } from 'lucide-react';

interface ApexCalculatorProps {
  initialSWR?: string;
  initialRHR?: string;
  onScoreCalculated: (score: number) => void;
}

export const ApexCalculator: React.FC<ApexCalculatorProps> = ({ initialSWR = '1.2', initialRHR = '65', onScoreCalculated }) => {
  const [swr, setSwr] = useState(initialSWR);
  const [rhr, setRhr] = useState(initialRHR);
  const [score, setScore] = useState<number>(0);

  const calculateScore = () => {
    const sValue = parseFloat(swr) || 0;
    const rValue = parseFloat(rhr) || 0;

    // Proprietary Apex Logic:
    // SWR (0-2.5 range) - Ideal is 2.0+
    const swrComponent = Math.min((sValue / 2.0) * 5, 5);
    
    // RHR (40-100 range) - Ideal is < 50
    // 100 bpm = 0 points, 40 bpm = 5 points
    const rhrComponent = Math.max(0, Math.min(((100 - rValue) / 60) * 5, 5));

    const finalScore = Number((swrComponent + rhrComponent).toFixed(1));
    setScore(finalScore);
    onScoreCalculated(finalScore);
  };

  useEffect(() => {
    calculateScore();
  }, [swr, rhr]);

  return (
    <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] bg-[#141414] border border-[#a855f7]/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
        <Zap size={200} />
      </div>

      <div className="mb-12 overflow-visible">
        <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-4">Metabolic Architecture</span>
        <h3 className="font-display text-4xl md:text-5xl text-white italic uppercase italic-fix pr-10">Apex Ratio Calculator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target size={16} className="text-[#a855f7]" />
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">SWR (Strength-to-Weight Ratio)</label>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={swr}
                onChange={(e) => setSwr(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-display text-white focus:border-[#a855f7] outline-none transition"
              />
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest leading-loose">Calculated by: Total Big 3 Lift Volume / Bodyweight.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Activity size={16} className="text-[#a855f7]" />
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">RHR (Resting Heart Rate)</label>
              </div>
              <input 
                type="number" 
                value={rhr}
                onChange={(e) => setRhr(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-display text-white focus:border-[#a855f7] outline-none transition"
              />
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest leading-loose">The BPM of your engine at total stillness. Elite baseline is &lt; 55.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-[#a855f7] rounded-full blur-[60px] opacity-20 animate-pulse"></div>
            <div className="w-56 h-56 rounded-full border-4 border-[#a855f7]/30 flex flex-col items-center justify-center relative z-10 bg-black/40">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a855f7] mb-2">Apex Score</span>
              <span className="font-display text-8xl text-white leading-none tracking-tighter">{score}</span>
              <span className="text-zinc-600 text-[10px] font-bold uppercase mt-2">/ 10.0</span>
            </div>
          </div>

          <div className="space-y-4 text-center max-w-xs">
            <div className="flex items-center justify-center gap-2 text-white">
              <Info size={14} className="text-[#a855f7]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Protocol Insight</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed italic">
              "Your Apex Ratio measures the balance between raw power output and cardiovascular efficiency. A higher score indicates a more resilient, high-performance physiological asset."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
