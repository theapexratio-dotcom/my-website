
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Added FileText and CheckCircle2 to imports
import { 
  LogOut, Activity, CreditCard, History, 
  ShieldCheck, Zap, PieChart, Home, ArrowRight,
  Download, Lock, ClipboardCheck, Sparkles,
  FileText, CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types.ts';
import { ClientProgressTable } from '../components/ClientProgressTable.tsx';
import { ProgressPictures } from '../components/ProgressPictures.tsx';
import { ApexCalculator } from '../components/ApexCalculator.tsx';

interface ClientDashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'progress' | 'training' | 'nutrition' | 'billing'>('home');
  const [localApexScore, setLocalApexScore] = useState(user.apexScore || '8.2');
  
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'progress', label: 'My Progress', icon: <PieChart size={18} /> },
    { id: 'training', label: 'Protocol', icon: <Activity size={18} /> },
    { id: 'billing', label: 'Admin', icon: <CreditCard size={18} /> },
  ];

  const progress = {
    label: user.serviceType === 'Face-to-Face' ? 'Sessions Remaining' : 'Days Until Renewal',
    value: user.sessionBalance || 8,
    percent: Math.round(((user.sessionBalance || 8) / 12) * 100)
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24 px-6 relative overflow-x-hidden">
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#a855f7]/5 rounded-full blur-[200px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between bg-[#141414]/80 backdrop-blur-xl p-3 rounded-[2rem] border border-white/5 mb-12 sticky top-24 z-50 shadow-2xl">
           <div className="flex gap-2">
             {navItems.map(item => (
               <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id as any)} 
                className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeTab === item.id ? 'bg-[#a855f7] text-white shadow-xl' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
               >
                 {item.icon} <span className="hidden md:inline">{item.label}</span>
               </button>
             ))}
           </div>
           <div className="flex items-center gap-4">
              {user.unreadCount > 0 && (
                <div className="flex items-center gap-3 px-4 py-2 bg-amber-400/10 rounded-full border border-amber-400/20">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest">New Directive</span>
                </div>
              )}
              <button onClick={onLogout} className="px-6 py-4 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                <LogOut size={14} /> <span className="hidden sm:inline">Exit</span>
              </button>
           </div>
        </div>

        {/* CRITICAL: AI FOCUS BOX - FIRST THING THEY SEE */}
        {activeTab === 'home' && user.latestCheckIn && (
          <div className="mb-12 glass-panel p-10 md:p-14 rounded-[4rem] border border-amber-400/30 bg-gradient-to-br from-amber-400/10 to-transparent relative overflow-hidden animate-in slide-in-from-top-12 duration-1000">
             <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none rotate-12">
               <Sparkles size={180} className="text-amber-400" />
             </div>
             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 overflow-visible relative z-10">
                <div className="overflow-visible">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-amber-400 rounded-[1.25rem] flex items-center justify-center text-black shadow-[0_10px_30px_rgba(251,191,36,0.3)]"><Zap size={28} /></div>
                      <div className="overflow-visible">
                        <h3 className="font-display text-4xl text-white uppercase italic italic-fix pr-8 leading-none">Elite Tactical Focus</h3>
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-2">Active Protocol Block: ${user.latestCheckIn.date}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {user.latestCheckIn.actionPoints.map((point, idx) => (
                        <div key={idx} className="p-8 bg-black/60 rounded-[2rem] border border-white/5 relative group hover:border-amber-400/50 transition-all duration-500 shadow-xl">
                           <span className="absolute -top-3 -left-3 w-10 h-10 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-[12px] font-black text-amber-400 shadow-2xl">0{idx + 1}</span>
                           <p className="text-[12px] text-zinc-300 font-bold uppercase leading-relaxed tracking-wider group-hover:text-white transition-colors">{point}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="w-full lg:w-96 shrink-0">
                  <div className="p-10 bg-[#a855f7] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                     <div className="absolute top-0 right-0 p-6 opacity-20"><ShieldCheck size={80} className="text-white fill-white" /></div>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-80">Mantra of Intent</p>
                     <p className="font-display text-5xl leading-none uppercase italic italic-fix pr-4 mb-2">"{user.latestCheckIn.focusMantra}"</p>
                  </div>
                </div>
             </div>
          </div>
        )}

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           {activeTab === 'home' && (
             <div className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                   <div className="lg:col-span-8 overflow-visible h-full">
                      <div className="glass-panel p-10 md:p-16 rounded-[4.5rem] border border-[#a855f7]/20 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-[#141414] to-black h-full shadow-2xl">
                         <div className="relative group shrink-0">
                            <div className="absolute -inset-3 bg-gradient-to-r from-[#a855f7] to-indigo-500 rounded-[3rem] blur opacity-25 transition duration-500"></div>
                            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-900">
                               <img src={user.avatarUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105" alt="Profile" />
                            </div>
                         </div>
                         <div className="text-center md:text-left overflow-visible">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                               <span className="px-4 py-1.5 bg-[#a855f7]/10 text-[#a855f7] text-[10px] font-black uppercase tracking-[0.4em] rounded-full border border-[#a855f7]/20 shadow-inner">Elite Athlete</span>
                               <span className="text-green-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Bio-Sync Active</span>
                            </div>
                            <div className="heading-safe-container overflow-visible">
                              <h1 className="font-display text-7xl md:text-9xl text-white italic uppercase italic-fix pr-12 leading-none">{user.displayName?.split(' ')[0]} <span className="text-gradient">Al-ameen</span></h1>
                            </div>
                            <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.6em] mt-8 leading-relaxed">System Tier: {user.plan} Specialist &bull; {user.serviceType}</p>
                         </div>
                      </div>
                   </div>
                   <div className="lg:col-span-4 h-full">
                      <div className="glass-panel p-12 rounded-[4.5rem] bg-[#a855f7] text-white shadow-[0_30px_100px_rgba(168,85,247,0.3)] h-full flex flex-col justify-between relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap size={140} className="fill-white" /></div>
                         <div className="relative z-10">
                            <span className="text-[11px] font-black uppercase tracking-[0.5em] mb-8 block opacity-70">Apex Physical Score</span>
                            <p className="text-8xl font-display tracking-tighter leading-none mb-4">{localApexScore}</p>
                            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Calculated via System Audit</span>
                         </div>
                         <button onClick={() => navigate('/check-in')} className="relative z-10 mt-12 w-full py-7 bg-black text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 shadow-2xl border-b-8 border-zinc-900 active:translate-y-2 active:border-b-0">
                            <ClipboardCheck size={20} /> Initialize Weekly Review
                         </button>
                      </div>
                   </div>
                </div>

                {/* Progress Table Audit with Trend Indicators */}
                {user.latestCheckIn && <ClientProgressTable checkIn={user.latestCheckIn} />}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                   <div className="glass-panel p-10 rounded-[3.5rem] bg-[#141414] border border-white/5 relative overflow-hidden group hover:border-[#a855f7]/30 transition-all">
                      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-6">Mass Audit</p>
                      <div className="flex items-baseline gap-3"><span className="font-display text-6xl text-white">{user.currentWeight}</span><span className="text-zinc-500 text-sm font-bold uppercase">KG</span></div>
                      <div className="mt-6 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Target Benchmark: {user.targetWeight}kg</span>
                      </div>
                   </div>
                   <div className="glass-panel p-10 rounded-[3.5rem] bg-[#141414] border border-white/5 relative overflow-hidden group hover:border-[#a855f7]/30 transition-all">
                      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-6">System Inventory</p>
                      <div className="flex items-baseline gap-3"><span className="font-display text-6xl text-white">{progress.value}</span><span className="text-zinc-500 text-sm font-bold uppercase">Remaining</span></div>
                      <div className="h-2 w-full bg-black rounded-full overflow-hidden mt-6"><div className="h-full bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-1000" style={{width: `${progress.percent}%`}}></div></div>
                   </div>
                   <button onClick={() => setActiveTab('training')} className="glass-panel p-10 rounded-[3.5rem] bg-[#141414] border border-white/5 text-left group hover:border-[#a855f7]/50 transition-all duration-700 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-6 transition-transform"><PieChart size={100} /></div>
                      <p className="text-[#a855f7] text-[10px] font-black uppercase tracking-[0.4em] mb-6 group-hover:translate-x-3 transition-transform">Architecture Access</p>
                      <div className="flex items-center justify-between overflow-visible">
                         <span className="font-display text-5xl text-white uppercase italic italic-fix pr-4">My Vault</span>
                         <ArrowRight size={40} className="text-zinc-800 group-hover:text-white group-hover:translate-x-3 transition-all duration-500" />
                      </div>
                   </button>
                </div>
             </div>
           )}

           {activeTab === 'progress' && (
             <div className="space-y-20 animate-in fade-in duration-1000">
                <ApexCalculator initialSWR="1.4" initialRHR="58" onScoreCalculated={(s) => setLocalApexScore(s.toString())} />
                <ProgressPictures photoHistory={user.photoHistory || []} onUpload={(set) => console.log('New set:', set)} />
             </div>
           )}

           {activeTab === 'training' && (
              <div className="space-y-12 animate-in fade-in duration-1000">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="glass-panel p-12 rounded-[4rem] bg-[#141414] border border-white/5 relative overflow-hidden group hover:border-green-500/30 transition-all">
                       <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform"><FileText size={120} /></div>
                       <div className="flex items-center gap-8 mb-12 overflow-visible">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_10px_30px_rgba(34,197,94,0.1)]"><Zap size={32} /></div>
                          <h4 className="font-display text-4xl text-white uppercase italic italic-fix pr-8">Metabolic Logic</h4>
                       </div>
                       {user.dietPlan ? (
                         <div className="space-y-8">
                            <p className="text-zinc-400 text-lg italic leading-relaxed">"Strategic fuel architecture deployed. Focus on the insulin-sensitivity window post-training."</p>
                            <div className="flex items-center justify-between p-8 bg-black/40 rounded-3xl border border-white/5 group-hover:border-green-500/20 transition">
                               <div><p className="text-[10px] font-black uppercase text-zinc-600 mb-2">Active Protocol</p><p className="text-white font-bold uppercase tracking-widest">{user.dietPlan.name}</p></div>
                               <button className="p-5 bg-white/5 hover:bg-green-500 hover:text-black rounded-2xl transition shadow-2xl active:scale-90"><Download size={24} /></button>
                            </div>
                         </div>
                       ) : (
                         <div className="py-24 text-center opacity-30"><Lock size={48} className="mx-auto mb-6" /><p className="text-[11px] font-black uppercase tracking-[0.5em]">Protocol Sync Pending</p></div>
                       )}
                    </div>

                    <div className="glass-panel p-12 rounded-[4rem] bg-[#141414] border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
                       <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform"><Activity size={120} /></div>
                       <div className="flex items-center gap-8 mb-12 overflow-visible">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 shadow-[0_10px_30px_rgba(168,85,247,0.1)]"><ShieldCheck size={32} /></div>
                          <h4 className="font-display text-4xl text-white uppercase italic italic-fix pr-8">Movement Matrix</h4>
                       </div>
                       {user.trainingPlan ? (
                         <div className="space-y-8">
                            <p className="text-zinc-400 text-lg italic leading-relaxed">"Neuro-mechanical blueprints synchronized. Absolute control on the eccentric phase required."</p>
                            <div className="flex items-center justify-between p-8 bg-black/40 rounded-3xl border border-white/5 group-hover:border-purple-500/20 transition">
                               <div><p className="text-[10px] font-black uppercase text-zinc-600 mb-2">Active Blueprint</p><p className="text-white font-bold uppercase tracking-widest">{user.trainingPlan.name}</p></div>
                               <button className="p-5 bg-white/5 hover:bg-purple-500 hover:text-black rounded-2xl transition shadow-2xl active:scale-90"><Download size={24} /></button>
                            </div>
                         </div>
                       ) : (
                         <div className="py-24 text-center opacity-30"><Lock size={48} className="mx-auto mb-6" /><p className="text-[11px] font-black uppercase tracking-[0.5em]">Blueprint Sync Pending</p></div>
                       )}
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'billing' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-1000">
                 <div className="glass-panel p-12 rounded-[4rem] bg-[#141414] border border-white/5 h-full">
                    <div className="flex items-center gap-6 mb-12 overflow-visible"><CreditCard className="text-[#a855f7]" size={32} /><h4 className="font-display text-4xl uppercase italic italic-fix pr-8">Active Tiers</h4></div>
                    <div className="p-12 bg-black/40 rounded-[3rem] border border-white/5 relative overflow-hidden group shadow-2xl">
                       <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck size={140} /></div>
                       <p className="text-[#a855f7] text-[11px] font-black uppercase tracking-[0.5em] mb-6">Subscription Protocol</p>
                       <h5 className="font-display text-5xl text-white italic uppercase mb-8 leading-none italic-fix pr-4">{user.plan || 'Elite Protocol'}</h5>
                       <div className="space-y-6">
                          <div className="flex justify-between text-[12px] font-bold uppercase tracking-widest border-b border-white/5 pb-6"><span className="text-zinc-600">Sync Status</span><span className="text-green-500 font-black">Operational</span></div>
                          <div className="flex justify-between text-[12px] font-bold uppercase tracking-widest border-b border-white/5 pb-6"><span className="text-zinc-600">Renewal Cycle</span><span className="text-white font-black">{user.renewalDate || 'Oct 30, 2024'}</span></div>
                       </div>
                       <button className="w-full mt-12 py-6 bg-white text-black rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#a855f7] hover:text-white transition-all shadow-2xl">Upgrade Strategy</button>
                    </div>
                 </div>
                 <div className="glass-panel p-12 rounded-[4rem] bg-[#141414] border border-white/5 h-full">
                    <div className="flex items-center gap-6 mb-12 overflow-visible"><History className="text-[#a855f7]" size={32} /><h4 className="font-display text-4xl uppercase italic italic-fix pr-8">Audit Archive</h4></div>
                    <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar pr-4">
                       {user.checkInHistory && user.checkInHistory.length > 0 ? user.checkInHistory.map(log => (
                          <div key={log.id} className="p-10 bg-black/20 rounded-[2.5rem] flex justify-between items-center border border-white/5 group hover:border-[#a855f7]/30 transition duration-500">
                             <div>
                                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest block mb-2">{log.date}</span>
                                <span className="text-sm font-bold text-white uppercase tracking-widest">Audit Result: Apex {log.apexScore}</span>
                             </div>
                             <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-green-500/30 transition-colors">
                                <CheckCircle2 className="text-zinc-800 group-hover:text-green-500 transition-colors" size={24} />
                             </div>
                          </div>
                       )) : (
                          <div className="flex flex-col items-center justify-center py-32 text-center opacity-10"><Zap size={80} className="mb-6" /><p className="text-[11px] font-black uppercase tracking-[0.8em]">Empty Archive</p></div>
                       )}
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
