
import React, { useState, useRef } from 'react';
import { Camera, Upload, ChevronRight, History, Maximize2, X, Zap, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { ProgressPhotoSet, PhotoSlotKey, PhotoSlot } from '../types.ts';

interface ProgressPicturesProps {
  photoHistory: ProgressPhotoSet[];
  onUpload: (set: ProgressPhotoSet) => void;
}

// Image Compression Utility
const compressImage = (file: File, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Return base64 string
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (e) => reject(e);
    };
    reader.onerror = (e) => reject(e);
  });
};

export const ProgressPictures: React.FC<ProgressPicturesProps> = ({ photoHistory, onUpload }) => {
  const [selectedSet, setSelectedSet] = useState<ProgressPhotoSet | null>(null);
  const [isCreatingSet, setIsCreatingSet] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [draftSet, setDraftSet] = useState<Partial<Record<PhotoSlotKey, string>>>({});
  
  const slots: PhotoSlotKey[] = ['Front', 'Side', 'Side Arm Up', 'Back', 'Flex', 'Lower Body'];
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const getLatestSet = () => photoHistory[0] || null;
  const getBaselineSet = () => photoHistory[photoHistory.length - 1] || null;

  const handleFileChange = async (key: PhotoSlotKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setDraftSet(prev => ({ ...prev, [key]: compressed }));
      } catch (err) {
        console.error('Compression failed', err);
      }
    }
  };

  const handleSaveSet = async () => {
    if (Object.keys(draftSet).length < slots.length) {
      alert("Please upload all 6 pose frames for a complete physiological audit.");
      return;
    }

    setIsUploading(true);

    // Prepare photos array
    const photos: PhotoSlot[] = slots.map(key => ({
      key,
      url: draftSet[key]!
    }));

    const newSet: ProgressPhotoSet = {
      id: `ps_${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      weekLabel: `Week ${photoHistory.length * 2 + 2}`, // Simple logic for demo
      photos
    };

    // Simulate Network/Firebase delay
    setTimeout(() => {
      onUpload(newSet);
      setIsUploading(false);
      setIsCreatingSet(false);
      setDraftSet({});
    }, 1500);
  };

  const isDraftComplete = Object.keys(draftSet).length === slots.length;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-visible">
        <div className="overflow-visible">
          <h3 className="font-display text-4xl text-white italic uppercase italic-fix pr-6 mb-2">Physique Blueprint</h3>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Visual Protocol Archive</p>
        </div>
        <button 
          onClick={() => setIsCreatingSet(true)}
          className="px-10 py-5 bg-[#a855f7] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-white hover:text-black transition-all shadow-2xl shadow-purple-500/20 active:scale-95 group"
        >
          <Camera size={16} className="group-hover:rotate-12 transition-transform" />
          <span>Capture New Pose Set</span>
        </button>
      </div>

      {/* Comparison View */}
      {photoHistory.length >= 2 && !isCreatingSet && (
        <div className="glass-panel p-10 rounded-[3rem] border border-[#a855f7]/20 bg-gradient-to-br from-[#a855f7]/5 to-transparent">
          <div className="flex items-center gap-4 mb-10">
            <Zap className="text-[#a855f7]" size={20} />
            <h4 className="font-display text-2xl text-white uppercase italic italic-fix pr-4 tracking-wider">Evolution Analysis (Baseline vs Latest)</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {slots.map(slot => {
              const baseline = getBaselineSet()?.photos.find(p => p.key === slot);
              const latest = getLatestSet()?.photos.find(p => p.key === slot);
              
              return (
                <div key={slot} className="space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 text-center">{slot}</p>
                  <div className="flex gap-1 aspect-[4/5] rounded-xl overflow-hidden border border-white/5 bg-black/20">
                    <div className="w-1/2 relative group">
                       {baseline ? (
                         <>
                           <img src={baseline.url} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition duration-700" />
                           <span className="absolute bottom-2 left-2 text-[7px] font-black uppercase tracking-widest bg-black/80 px-1.5 py-0.5 rounded">B</span>
                         </>
                       ) : <div className="w-full h-full bg-zinc-900 flex items-center justify-center"><X size={12} className="text-zinc-800" /></div>}
                    </div>
                    <div className="w-1/2 relative group">
                       {latest ? (
                         <>
                           <img src={latest.url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                           <span className="absolute bottom-2 right-2 text-[7px] font-black uppercase tracking-widest bg-[#a855f7] px-1.5 py-0.5 rounded">L</span>
                         </>
                       ) : <div className="w-full h-full bg-zinc-900 flex items-center justify-center"><X size={12} className="text-zinc-800" /></div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Initialize / Create Set View */}
      {isCreatingSet && (
        <div className="glass-panel p-12 rounded-[3.5rem] border border-[#a855f7] bg-black/40 animate-in slide-in-from-bottom-12 duration-700">
          <div className="flex justify-between items-start mb-12">
             <div className="overflow-visible">
                <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-4">New Protocol Entry</span>
                <h3 className="font-display text-4xl text-white uppercase italic italic-fix pr-8">Physiological Phase Set</h3>
             </div>
             <button onClick={() => setIsCreatingSet(false)} className="p-4 bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition">
                <X size={24} />
             </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
             {slots.map(slot => (
               <div key={slot} className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">{slot}</p>
                  <div 
                    onClick={() => fileInputRefs.current[slot]?.click()}
                    className={`aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-500 group overflow-hidden relative ${
                      draftSet[slot] ? 'border-[#a855f7] bg-[#a855f7]/5' : 'border-zinc-800 hover:border-[#a855f7]/50 bg-white/5'
                    }`}
                  >
                    {draftSet[slot] ? (
                      <img src={draftSet[slot]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    ) : (
                      <>
                        <Upload size={24} className="text-zinc-700 group-hover:text-[#a855f7] transition" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 text-center px-4">Upload {slot}</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={el => fileInputRefs.current[slot] = el}
                      onChange={(e) => handleFileChange(slot, e)}
                    />
                    {draftSet[slot] && (
                       <div className="absolute top-2 right-2 bg-[#a855f7] rounded-full p-1 shadow-xl">
                          <CheckCircle2 size={12} className="text-white" />
                       </div>
                    )}
                  </div>
               </div>
             ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
             <div className="flex items-center gap-4 text-zinc-500">
                <Sparkles size={16} className="text-[#a855f7]" />
                <p className="text-[10px] font-black uppercase tracking-widest">Auto-compressed for protocol optimization</p>
             </div>
             <button 
               onClick={handleSaveSet}
               disabled={!isDraftComplete || isUploading}
               className={`px-16 py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-4 shadow-2xl ${
                 isDraftComplete && !isUploading
                  ? 'bg-white text-black hover:bg-[#a855f7] hover:text-white'
                  : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'
               }`}
             >
               {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
               <span>{isUploading ? 'Synchronizing Cloud Data...' : 'Finalize Phase Set'}</span>
             </button>
          </div>
        </div>
      )}

      {/* History Feed */}
      {!isCreatingSet && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <History className="text-zinc-600" size={20} />
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Timeline Logs</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoHistory.map((set, idx) => (
              <div 
                key={set.id} 
                className="glass-panel group overflow-hidden rounded-[2.5rem] border border-white/5 hover:border-[#a855f7]/40 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedSet(set)}
              >
                 <div className="grid grid-cols-3 gap-1 p-2 bg-black/40">
                    {set.photos.slice(0, 3).map(p => (
                      <div key={p.key} className="aspect-square rounded-lg overflow-hidden">
                         <img src={p.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                      </div>
                    ))}
                 </div>
                 <div className="p-8 flex justify-between items-center">
                    <div>
                      <h5 className="font-display text-2xl text-white uppercase italic italic-fix pr-2">{set.weekLabel}</h5>
                      <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mt-1">{set.date}</p>
                    </div>
                    <button className="p-3 bg-white/5 rounded-xl text-[#a855f7] hover:bg-[#a855f7] hover:text-white transition-all">
                      <Maximize2 size={16} />
                    </button>
                 </div>
              </div>
            ))}

            {/* Upload Placeholder */}
            <button 
              onClick={() => setIsCreatingSet(true)}
              className="h-full min-h-[200px] rounded-[2.5rem] border-2 border-dashed border-zinc-800 bg-black/20 flex flex-col items-center justify-center gap-4 group hover:border-[#a855f7]/50 transition-all"
            >
               <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:bg-[#a855f7] group-hover:text-white transition-all">
                  <Upload size={20} />
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Initialize Next Phase Set</span>
            </button>
          </div>
        </div>
      )}

      {/* Detail Overlay */}
      {selectedSet && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedSet(null)}></div>
          <div className="relative w-full max-w-6xl glass-panel rounded-[3rem] border border-white/10 p-12 overflow-visible animate-in zoom-in-95 duration-300">
             <button onClick={() => setSelectedSet(null)} className="absolute -top-4 -right-4 p-4 bg-[#a855f7] text-white rounded-full shadow-2xl hover:scale-110 transition active:scale-95">
                <X size={24} />
             </button>
             <div className="mb-12 overflow-visible">
                <span className="text-[#a855f7] font-black text-[10px] uppercase tracking-[0.5em] block mb-4">Protocol Phase: {selectedSet.weekLabel}</span>
                <h3 className="font-display text-5xl text-white uppercase italic italic-fix pr-6">Pose Set Archive: {selectedSet.date}</h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {selectedSet.photos.map(p => (
                  <div key={p.key} className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">{p.key}</p>
                     <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={p.url} className="w-full h-full object-cover" />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
