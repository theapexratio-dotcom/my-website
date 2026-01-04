
import React, { useState, useRef } from 'react';
import { Sidebar } from '../components/Sidebar.tsx';
import { BookingSystem } from '../components/BookingSystem.tsx';
import { PaymentTracker } from '../components/PaymentTracker.tsx';
import { CheckInSystem } from '../components/CheckInSystem.tsx';
import { 
  Plus, Search, X, UserPlus, Upload, Zap, Trash2, 
  AlertTriangle, FileText, Send, ShieldCheck, 
  MoreHorizontal, Filter, BarChart3, MessageSquare, CheckCircle2
} from 'lucide-react';
import { UserProfile, ProtocolPlan, CheckInResult } from '../types.ts';

interface CoachPortalProps {
  onLogout: () => void;
}

export const CoachPortal: React.FC<CoachPortalProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('clients');
  const [portalType, setPortalType] = useState<'F2F' | 'Online'>('F2F');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'Diet' | 'Training'>('Diet');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clients, setClients] = useState<UserProfile[]>([
    { 
      uid: '1', 
      email: 'alex@exec.com', 
      displayName: 'Alex Johnson', 
      avatarUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&w=400&q=80',
      sessionBalance: 12, 
      accountCredit: 500, 
      serviceType: 'Face-to-Face', 
      plan: 'Elite Protocol', 
      bookedDates: [{ id: 'b1', date: '2024-10-25', time: '10:00 AM' }],
      sessionHistory: [{ id: 'h1', date: '2024-10-14', sessionNumber: 1, remainingBalance: 12, notes: 'Intro Session' }],
      progressHistory: [{ month: 'Oct', weight: 85, apexScore: 7.1, rhr: 64 }],
      photoHistory: [], 
      checkInHistory: [],
      transformations: [], 
      assignedExercises: [], 
      messages: [], 
      unreadCount: 0, 
      isCoach: false, 
      subscriptionStatus: 'Active', 
      paymentStatus: 'Paid', 
      currentWeight: '83.8',
      dietPlan: { name: 'Metabolic Matrix 1.0', url: '#', assignedDate: '2024-10-01', type: 'Diet' }
    }
  ]);

  const handleCheckInComplete = (clientId: string, result: CheckInResult) => {
    setClients(prev => prev.map(c => c.uid === clientId ? { ...c, latestCheckIn: result } : c));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedClient) {
      const newPlan: ProtocolPlan = {
        name: file.name,
        url: URL.createObjectURL(file),
        assignedDate: new Date().toLocaleDateString(),
        type: uploadType
      };

      setClients(prev => prev.map(c => {
        if (c.uid === selectedClient.uid) {
          return uploadType === 'Diet' ? { ...c, dietPlan: newPlan } : { ...c, trainingPlan: newPlan };
        }
        return c;
      }));
      
      setIsUploadModalOpen(false);
      alert(`${uploadType} Architecture Deployed: ${file.name}`);
    }
  };

  const renderClients = () => (
    <div className="animate-in fade-in duration-500 overflow-visible space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 overflow-visible">
        <div className="flex space-x-2 p-1.5 bg-zinc-900/40 rounded-2xl border border-white/5">
          <button onClick={() => setPortalType('F2F')} className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${portalType === 'F2F' ? 'bg-[#a855f7] text-white shadow-lg shadow-purple-500/20' : 'text-zinc-500 hover:text-white'}`}>Face-to-Face</button>
          <button onClick={() => setPortalType('Online')} className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${portalType === 'Online' ? 'bg-[#a855f7] text-white shadow-lg shadow-purple-500/20' : 'text-zinc-500 hover:text-white'}`}>Online Academy</button>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#a855f7] transition" />
          <input 
            type="text" 
            placeholder="Search managed roster..." 
            className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-[#a855f7]/50 transition text-white placeholder:text-zinc-700" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1100px]">
            <thead className="bg-black/40 border-b border-white/5">
              <tr>
                <th className="py-6 px-10 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Athlete Entity</th>
                <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Service Logic</th>
                <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Metrics Delta</th>
                <th className="py-6 px-10 text-right text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Command Center</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.filter(c => (portalType === 'F2F' ? c.serviceType === 'Face-to-Face' : c.serviceType === 'Online') && (c.displayName?.toLowerCase().includes(searchQuery.toLowerCase()))).map((client) => (
                <tr key={client.uid} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedClient(client)}>
                  <td className="py-8 px-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-800 border-2 border-white/10 overflow-hidden group-hover:border-[#a855f7] transition shadow-2xl">
                        <img src={client.avatarUrl} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-wider">{client.displayName}</p>
                        <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-6 text-xs font-bold text-[#a855f7] uppercase tracking-widest">{client.serviceType}</td>
                  <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase text-zinc-500">Score:</span>
                        <span className="font-display text-3xl text-white">{client.latestCheckIn?.stats.apexScore.current || '7.1'}</span>
                      </div>
                  </td>
                  <td className="py-8 px-10 text-right overflow-visible">
                      <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                        <CheckInSystem 
                          athlete={client} 
                          onComplete={(res) => handleCheckInComplete(client.uid, res)} 
                        />
                        <button 
                          onClick={() => { setUploadType('Diet'); setSelectedClient(client); setIsUploadModalOpen(true); }}
                          className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-lg active:scale-95"
                        >Nutrition</button>
                        <button 
                          onClick={() => { setUploadType('Training'); setSelectedClient(client); setIsUploadModalOpen(true); }}
                          className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-purple-500 hover:bg-purple-500 hover:text-white transition-all shadow-lg active:scale-95"
                        >Training</button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12"><BookingSystem clients={clients} onBookSession={() => {}} /><PaymentTracker clients={clients} /></div>
    </div>
  );

  const renderSecureComms = () => (
    <div className="h-full flex flex-col animate-in fade-in duration-500 overflow-hidden bg-[#050505]">
      <div className="p-8 border-b border-white/5 bg-zinc-950/40 flex justify-between items-center shrink-0 overflow-visible">
        <div className="overflow-visible">
          <h3 className="font-display text-4xl text-white italic uppercase italic-fix pr-6">Tactical Comms Hub</h3>
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-1">End-to-End Secure Channel</p>
        </div>
        <div className="flex items-center gap-4">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Encrypted Relay Active</span>
        </div>
      </div>
      <div className="flex-grow flex overflow-hidden">
        {/* Roster sidebar */}
        <div className="w-80 border-r border-white/5 bg-black overflow-y-auto custom-scrollbar">
          {clients.map(c => (
            <button key={c.uid} onClick={() => setSelectedClient(c)} className={`w-full p-8 border-b border-white/5 text-left transition-all ${selectedClient?.uid === c.uid ? 'bg-[#a855f7] text-white' : 'hover:bg-white/5'}`}>
              <p className="text-xs font-bold uppercase tracking-wider">{c.displayName}</p>
              <p className={`text-[9px] font-black uppercase mt-1 ${selectedClient?.uid === c.uid ? 'text-black/60' : 'text-zinc-600'}`}>Tier: {c.plan}</p>
            </button>
          ))}
        </div>
        {/* Chat window */}
        <div className="flex-grow flex flex-col relative overflow-hidden">
          {selectedClient ? (
            <>
              <div className="flex-grow p-12 overflow-y-auto space-y-10 flex flex-col-reverse custom-scrollbar">
                <div className="flex justify-start">
                   <div className="max-w-md p-8 bg-zinc-900 rounded-[2rem] rounded-bl-none text-sm text-zinc-400 border border-white/5 leading-relaxed shadow-xl">
                     <p className="text-[8px] font-black uppercase text-[#a855f7] mb-2 tracking-widest">Athlete Signal</p>
                     Coach, I've hit a plateau on the RDLs. My lower back feels excessively fatigued by set 3. Should I pivot to Rack Pulls?
                   </div>
                </div>
                <div className="flex justify-end">
                   <div className="max-w-md p-8 bg-[#a855f7] rounded-[2rem] rounded-br-none text-sm text-white font-bold leading-relaxed shadow-[0_10px_40px_rgba(168,85,247,0.2)]">
                     <p className="text-[8px] font-black uppercase text-black/50 mb-2 tracking-widest">Head Coach directive</p>
                     Acknowledge. This is a common neurological stall. Switch to 45-degree Hyperextensions with a 3-second isometric hold. We will revisit the RDL in Cycle 2. Protocol update pushed.
                   </div>
                </div>
              </div>
              <div className="p-10 bg-black border-t border-white/5">
                <div className="relative group">
                   <input type="text" placeholder="Type tactical directive..." className="w-full bg-zinc-950 border border-white/10 rounded-3xl py-6 px-10 text-sm focus:border-[#a855f7] outline-none text-white transition shadow-inner placeholder:text-zinc-800" />
                   <button className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#a855f7] text-white rounded-2xl hover:scale-110 transition active:scale-95 shadow-xl"><Send size={20} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-10">
              <ShieldCheck size={160} className="mb-8" />
              <p className="text-[10px] font-black uppercase tracking-[0.8em]">Select Target Entity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-[#0a0a0a] h-screen w-screen text-white font-sans overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <main className="flex-grow flex flex-col h-full overflow-hidden">
        {/* Full-Screen Header */}
        <header className="flex justify-between items-center p-12 border-b border-white/5 bg-black shrink-0 z-20 overflow-visible">
          <div className="overflow-visible">
            <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-3">Richard Al-ameen • Team Al-ameen Hub</span>
            <div className="heading-safe-container overflow-visible">
              <h1 className="font-display text-4xl md:text-5xl text-white italic uppercase italic-fix pr-12 leading-none">
                {activeView === 'clients' && "Apex Command Hub"}
                {activeView === 'comms' && "Secure Comms Hub"}
                {activeView === 'library' && "Protocol Vault"}
                {activeView === 'finances' && "Revenue Audit"}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-6">
             <button onClick={() => setIsAdmissionModalOpen(true)} className="bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 hover:bg-[#a855f7] hover:text-white transition-all shadow-xl active:scale-95 group">
                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                <span>Manual Admission</span>
             </button>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <div className="flex-1 overflow-hidden relative">
          {activeView === 'clients' && (
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-12 pb-40">
               {renderClients()}
            </div>
          )}

          {activeView === 'comms' && renderSecureComms()}

          {activeView === 'library' && (
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-12 pb-40 space-y-12">
               <div className="heading-safe-container overflow-visible">
                 <h2 className="font-display text-6xl text-white italic uppercase italic-fix pr-12">Protocol Archive</h2>
               </div>
               {/* Simplified Vault List for Admin */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {['Nutrition Matrices', 'Movement Blueprints', 'Recovery Cycles'].map(cat => (
                    <div key={cat} className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-zinc-900/20 group hover:border-[#a855f7]/50 transition duration-500">
                       <h3 className="font-display text-3xl text-white uppercase italic italic-fix pr-4 mb-6">{cat}</h3>
                       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-10">Total Assets: 24</p>
                       <button className="w-full py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:bg-[#a855f7] group-hover:text-white transition-all">Audit Vault</button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeView === 'finances' && (
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-12 pb-40">
               <PaymentTracker clients={clients} />
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setIsUploadModalOpen(false)}></div>
            <div className="relative w-full max-w-xl bg-zinc-950 p-16 rounded-[4rem] border border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.1)] animate-in zoom-in-95">
               <div className="text-center mb-10 overflow-visible">
                  <div className={`w-24 h-24 mx-auto mb-10 rounded-[2.5rem] flex items-center justify-center border-2 ${uploadType === 'Diet' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/20'}`}>
                    <Upload size={40} />
                  </div>
                  <div className="heading-safe-container overflow-visible">
                    <h3 className="font-display text-5xl text-white uppercase italic italic-fix pr-12">{uploadType} Deployment</h3>
                  </div>
                  <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mt-4">Target Entity: {selectedClient?.displayName}</p>
               </div>
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="aspect-video w-full border-2 border-dashed border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-[#a855f7]/50 hover:bg-white/5 transition-all group shadow-inner"
               >
                  <FileText className="text-zinc-800 group-hover:text-[#a855f7] transition duration-500" size={64} />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-700 group-hover:text-white transition">Initialize Protocol Dispatch</span>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
               </div>
               <div className="flex flex-col gap-4 mt-12">
                  <button onClick={() => setIsUploadModalOpen(false)} className="w-full py-6 bg-white/5 text-zinc-600 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:text-white transition">Abort Sync</button>
               </div>
            </div>
          </div>
        )}

        {/* Manual Admission Modal */}
        {isAdmissionModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsAdmissionModalOpen(false)}></div>
            <div className="relative w-full max-w-xl bg-zinc-950 rounded-[4rem] border border-white/10 p-16 animate-in zoom-in-95 duration-500 shadow-2xl">
               <button onClick={() => setIsAdmissionModalOpen(false)} className="absolute top-10 right-10 text-zinc-700 hover:text-white transition"><X size={32} /></button>
               <div className="text-center mb-12 overflow-visible">
                  <div className="w-20 h-20 bg-[#a855f7]/10 rounded-3xl flex items-center justify-center text-[#a855f7] mx-auto mb-8 border border-[#a855f7]/20 shadow-inner"><UserPlus size={40} /></div>
                  <div className="heading-safe-container overflow-visible"><h2 className="font-display text-5xl text-white italic-fix pr-12 uppercase italic">Elite Onboarding</h2></div>
                  <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-4">Manual Athlete Entry Protocol</p>
               </div>
               <form onSubmit={(e) => { e.preventDefault(); setIsAdmissionModalOpen(false); }} className="space-y-8">
                  <div className="space-y-4">
                    <input required type="text" placeholder="Athlete Full Identity" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm focus:border-[#a855f7] outline-none text-white placeholder:text-zinc-800 transition" />
                    <input required type="email" placeholder="Verified Strategic Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm focus:border-[#a855f7] outline-none text-white placeholder:text-zinc-800 transition" />
                  </div>
                  <button type="submit" className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[#a855f7] hover:text-white transition-all shadow-2xl active:scale-95">Deploy Athlete To Protocol</button>
               </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
