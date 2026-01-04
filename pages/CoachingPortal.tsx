
import React, { useState } from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';

interface CoachingPortalProps {
  navigate: (view: any) => void;
  onLogout?: () => void;
}

export const CoachingPortal: React.FC<CoachingPortalProps> = ({ navigate, onLogout }) => {
  const [stats, setStats] = useState({
    swr: '1.45',
    rhr: '58',
    score: '8.5'
  });

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="font-display text-4xl mb-1 uppercase italic">Command Center</h1>
          <p className="text-gray-500 font-light uppercase tracking-widest text-[10px]">Client: Alex Johnson (Elite Tier)</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 px-6 py-2 glass-panel rounded-full text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
          <button className="px-6 py-2 apex-gradient rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">Check-in</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Score Card */}
        <div className="glass-panel p-8 rounded-3xl border-l-4 border-indigo-500">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Apex Score</p>
          <div className="flex items-end space-x-2">
            <span className="text-5xl font-display text-indigo-400 leading-none tracking-tighter">{stats.score}</span>
            <span className="text-gray-600 mb-1">/ 10</span>
          </div>
          <div className="mt-4 w-full bg-white/5 h-2 rounded-full overflow-hidden">
             <div className="h-full apex-gradient" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Metabolic Card */}
        <div className="glass-panel p-8 rounded-3xl">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Resilience (RHR)</p>
          <div className="flex items-end space-x-2">
            <span className="text-5xl font-display text-white leading-none tracking-tighter">{stats.rhr}</span>
            <span className="text-gray-600 mb-1 uppercase text-xs tracking-widest font-bold">BPM</span>
          </div>
          <p className="mt-4 text-[10px] text-green-500 uppercase font-bold">↓ 4% vs Last Month</p>
        </div>

        {/* Physical Card */}
        <div className="glass-panel p-8 rounded-3xl">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Power Shape (SWR)</p>
          <div className="flex items-end space-x-2">
            <span className="text-5xl font-display text-white leading-none tracking-tighter">{stats.swr}</span>
            <span className="text-gray-600 mb-1 uppercase text-xs tracking-widest font-bold">Ratio</span>
          </div>
          <p className="mt-4 text-[10px] text-indigo-400 uppercase font-bold">Optimal Range</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Training Log */}
        <div className="glass-panel p-8 rounded-3xl">
           <div className="flex justify-between items-center mb-8">
             <h3 className="font-display text-2xl uppercase italic">Current Block</h3>
             <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">Week 4 of 12</span>
           </div>
           <div className="space-y-4">
             {[
               { day: 'Mon', focus: 'Upper Body A', status: 'Completed' },
               { day: 'Tue', focus: 'Low Intensity Steady State', status: 'Missed' },
               { day: 'Wed', focus: 'Lower Body A', status: 'Pending' }
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/5">
                 <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 flex items-center justify-center font-bold text-xs bg-indigo-500/10 text-indigo-400 rounded-lg">{item.day}</div>
                   <div>
                     <p className="text-sm font-bold uppercase tracking-widest">{item.focus}</p>
                   </div>
                 </div>
                 <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${item.status === 'Completed' ? 'bg-green-500/10 text-green-500' : item.status === 'Missed' ? 'bg-red-500/10 text-red-500' : 'text-gray-500'}`}>
                   {item.status}
                 </span>
               </div>
             ))}
           </div>
        </div>

        {/* AI Insights */}
        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)]">
           <div className="flex items-center space-x-2 mb-8">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
             <h3 className="font-display text-2xl uppercase italic text-gradient">Apex Coach Insights</h3>
           </div>
           <div className="space-y-6">
             <div className="p-4 bg-black/40 rounded-xl">
               <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">Weekly Action Plan</h4>
               <p className="text-sm text-gray-300 leading-relaxed italic">
                 "Your RHR is trending perfectly. We will increase training intensity by 10% this week. Focus on the 'Prioritization' Pillar—ensure you are training during your highest cognitive energy window."
               </p>
             </div>
             <button className="w-full py-4 glass-panel border border-indigo-500/50 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition">
               Regenerate Focus Mantra
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
