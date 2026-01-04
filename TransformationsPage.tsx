
import React, { useState } from 'react';
import { X, Trophy, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORIES = [
  {
    id: '1',
    name: 'Marcus K.',
    before: 'https://images.unsplash.com/photo-1506143925201-0252c51780b0?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&w=400&q=80',
    loss: '-12kg',
    time: '12 Weeks',
    quote: "The Apex Ratio changed my life. I have more energy for my business than ever.",
    fullText: "Marcus came to us as a high-level CEO suffering from chronic fatigue. By implementing the Apex protocol, he not only dropped 12kg of body fat but improved his resting heart rate by 15bpm. His productivity has doubled.",
    goals: ['Fat Loss', 'Metabolic Reset', 'Muscle Preservation']
  },
  {
    id: '2',
    name: 'Sarah J.',
    before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80',
    loss: '+4kg Muscle',
    time: '16 Weeks',
    quote: "I didn't think I could look this powerful. The strength gains are unreal.",
    fullText: "Sarah wanted to move away from 'skinny fat' to 'athletic powerhouse'. We focused on heavy compound movements and high-protein partitioning. Her Apex Score jumped from 4.2 to 8.9.",
    goals: ['Hypertrophy', 'Strength', 'Power Shape']
  },
  {
    id: '3',
    name: 'David L.',
    before: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-149175235542e-ddaa51242bac?auto=format&fit=crop&w=400&q=80',
    loss: '-8kg Fat',
    time: '8 Weeks',
    quote: "Sprinting through the 8-week challenge was the best decision I ever made.",
    fullText: "David needed a quick reset for a major event. We pushed the intensity to the limit while maintaining a strict executive-friendly diet protocol. Minimal time, maximum impact.",
    goals: ['Rapid Shred', 'Core Definition', 'Vascularity']
  }
];

export const TransformationsPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<typeof STORIES[0] | null>(null);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen overflow-visible">
      <div className="text-center mb-24 overflow-visible">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-8 italic uppercase italic-fix heading-safe">Body Transformations</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-lg tracking-wide">
          Elite results are never accidental. These case studies represent the standard of the Apex Ratio Protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {STORIES.map((story) => (
          <div 
            key={story.id} 
            className="group cursor-pointer glass-panel rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-500 hover:translate-y-[-8px] shadow-2xl"
            onClick={() => setSelectedStory(story)}
          >
            <div className="flex h-96">
              <div className="w-1/2 overflow-hidden border-r border-black relative">
                <img src={story.before} className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition duration-700" alt="Before" />
                <div className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full">Before</div>
              </div>
              <div className="w-1/2 overflow-hidden relative">
                <img src={story.after} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="After" />
                <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest bg-accent-purple px-3 py-1.5 rounded-full shadow-lg">After</div>
              </div>
            </div>
            <div className="p-10">
               <div className="flex justify-between items-start mb-6">
                 <h3 className="font-display text-3xl uppercase italic italic-fix heading-safe">{story.name}</h3>
                 <span className="text-accent-purple font-black text-xs uppercase tracking-widest border border-accent-purple/30 px-3 py-1 rounded-full">{story.loss}</span>
               </div>
               <p className="text-gray-400 text-sm italic mb-8 leading-relaxed">"{story.quote}"</p>
               <div className="flex items-center text-[9px] font-black text-gray-500 uppercase tracking-widest gap-6 border-t border-white/5 pt-6">
                 <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent-purple"/> {story.time}</span>
                 <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-accent-purple"/> Elite Execution</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Case Study */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedStory(null)}></div>
          <div className="relative glass-panel w-full max-w-4xl rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.15)] animate-in zoom-in-95 duration-300">
            <button 
              className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-accent-purple text-white z-10 transition-all duration-300 group"
              onClick={() => setSelectedStory(null)}
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>
            <div className="flex flex-col md:flex-row min-h-[600px]">
              <div className="md:w-[45%] aspect-square md:aspect-auto">
                 <img src={selectedStory.after} className="w-full h-full object-cover" alt="Success" />
              </div>
              <div className="md:w-[55%] p-12 md:p-16 flex flex-col justify-center overflow-visible">
                 <span className="text-accent-purple font-black text-[10px] uppercase tracking-[0.4em] mb-6 block animate-pulse">Case Study Profile</span>
                 <h2 className="font-display text-5xl md:text-6xl mb-8 italic uppercase italic-fix heading-safe">{selectedStory.name}</h2>
                 <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light italic">
                   {selectedStory.fullText}
                 </p>
                 <div className="flex flex-wrap gap-3 mb-12">
                    {selectedStory.goals.map(g => (
                      <div key={g} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/80">
                        <Zap className="w-3 h-3 text-accent-purple fill-accent-purple" /> {g}
                      </div>
                    ))}
                 </div>
                 <Link to="/onboarding" className="w-full py-5 bg-white text-black text-center font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-accent-purple hover:text-white transition-all duration-300 shadow-2xl active:scale-95">REPLICATE THESE RESULTS &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Conversion Section */}
      <div className="mt-40 p-16 md:p-24 glass-panel rounded-[3.5rem] border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent text-center relative overflow-visible">
         <div className="absolute -top-12 -right-12 p-20 opacity-10 rotate-12 pointer-events-none">
            <Trophy className="w-64 h-64 text-accent-purple" />
         </div>
         <div className="max-w-3xl mx-auto overflow-visible">
            <h2 className="font-display text-5xl md:text-8xl uppercase italic mb-10 italic-fix heading-safe">Ready to Lead?</h2>
            <p className="text-gray-400 mb-12 text-lg md:text-xl font-light tracking-wide italic leading-loose">
              If you demand elite output from your business and life, your physiology must be the foundation. Join the Apex Protocol.
            </p>
            <Link to="/onboarding" className="inline-block px-16 py-6 bg-accent-purple text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-full shadow-2xl hover:scale-110 hover:shadow-purple-500/40 transition-all duration-500 transform">Apply for Academy Entry</Link>
         </div>
      </div>
    </div>
  );
};
