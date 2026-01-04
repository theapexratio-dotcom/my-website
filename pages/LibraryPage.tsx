
import React, { useState } from 'react';
import { Search, Play, X, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Mobility'];

const MOVEMENTS = [
  { id: '1', title: 'Low Incline DB Press', cat: 'Chest', thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80', video: 'placeholder' },
  { id: '2', title: 'Weighted Pull-Ups', cat: 'Back', thumb: 'https://images.unsplash.com/photo-1590487949421-2f813f690991?auto=format&fit=crop&w=600&q=80', video: 'placeholder' },
  { id: '3', title: 'Bulgarian Split Squats', cat: 'Legs', thumb: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80', video: 'placeholder' },
  { id: '4', title: 'Lateral Raise Protocol', cat: 'Shoulders', thumb: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=600&q=80', video: 'placeholder' },
  { id: '5', title: '90/90 Hip Flow', cat: 'Mobility', thumb: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', video: 'placeholder' },
  { id: '6', title: 'Deadstop Rows', cat: 'Back', thumb: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80', video: 'placeholder' },
];

export const LibraryPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filtered = MOVEMENTS.filter(m => 
    (activeCat === 'All' || m.cat === activeCat) &&
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="font-display text-5xl md:text-8xl mb-4 italic uppercase">Exercise Vault</h1>
          <p className="text-gray-500 font-light uppercase tracking-widest text-xs">200+ Elite Movement Tutorials</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent-purple transition" />
          <input 
            type="text" 
            placeholder="Search movement..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-purple-500/50 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCat === cat ? 'bg-accent-purple text-white shadow-lg shadow-purple-500/20' : 'glass-panel text-gray-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(mov => (
          <div 
            key={mov.id} 
            className="group cursor-pointer glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition duration-500"
            onClick={() => setActiveVideo(mov.title)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={mov.thumb} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition duration-700" alt={mov.title} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-purple group-hover:border-transparent transition">
                  <Play className="w-5 h-5 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-[8px] font-black uppercase tracking-widest rounded-full">{mov.cat}</span>
              </div>
            </div>
            <div className="p-6">
               <h4 className="font-bold text-white uppercase tracking-wider">{mov.title}</h4>
               <p className="text-[10px] text-gray-500 uppercase mt-2 tracking-widest font-bold">Standard Apex Execution</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Overlay Placeholder */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/95" onClick={() => setActiveVideo(null)}></div>
           <div className="relative w-full max-w-5xl aspect-video glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
              <button 
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
                onClick={() => setActiveVideo(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <Play className="w-20 h-20 text-accent-purple mx-auto mb-6 opacity-20" />
                <h3 className="font-display text-2xl uppercase italic text-gray-400">Streaming: {activeVideo}</h3>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-2">Demo Video Content Placeholder</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
