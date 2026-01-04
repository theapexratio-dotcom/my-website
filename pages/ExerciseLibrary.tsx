
import React, { useState } from 'react';

const CATEGORIES = ['All', 'Upper', 'Lower', 'Core', 'Cardio'];

const EXERCISES = [
  { id: '1', title: 'Barbell Bench Press', cat: 'Upper', thumb: 'https://picsum.photos/id/101/400/225' },
  { id: '2', title: 'Bulgarian Split Squat', cat: 'Lower', thumb: 'https://picsum.photos/id/102/400/225' },
  { id: '3', title: 'Hanging Leg Raise', cat: 'Core', thumb: 'https://picsum.photos/id/103/400/225' },
  { id: '4', title: 'Romanian Deadlift', cat: 'Lower', thumb: 'https://picsum.photos/id/104/400/225' },
  { id: '5', title: 'Incline DB Press', cat: 'Upper', thumb: 'https://picsum.photos/id/105/400/225' },
  { id: '6', title: 'Plank with Reach', cat: 'Core', thumb: 'https://picsum.photos/id/106/400/225' },
];

export const ExerciseLibrary: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = EXERCISES.filter(ex => 
    (filter === 'All' || ex.cat === filter) &&
    ex.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto py-20">
      <div className="mb-12">
        <h1 className="font-display text-4xl mb-4 uppercase italic">Exercise Vault</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition ${filter === cat ? 'apex-gradient text-white' : 'glass-panel text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search movement..."
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 w-full md:w-64 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(ex => (
          <div key={ex.id} className="glass-panel group cursor-pointer overflow-hidden rounded-2xl border border-white/5 hover:border-indigo-500/50 transition duration-500">
            <div className="relative aspect-video overflow-hidden">
               <img src={ex.thumb} alt={ex.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 brightness-75 group-hover:brightness-100" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                 <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                   <svg className="w-6 h-6 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
               </div>
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{ex.cat}</span>
              <h4 className="font-bold text-white mt-1 group-hover:text-indigo-400 transition">{ex.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 uppercase tracking-widest text-xs">No matching movements found in the vault.</p>
        </div>
      )}
    </div>
  );
};
