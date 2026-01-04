
import React from 'react';

const TRANSFORMATION_DATA = [
  {
    id: '1',
    name: 'Marcus K.',
    before: 'https://picsum.photos/id/64/400/500',
    after: 'https://picsum.photos/id/129/400/500',
    stat: '-12kg Fat / +5kg Muscle',
    time: '12 Weeks'
  },
  {
    id: '2',
    name: 'David L.',
    before: 'https://picsum.photos/id/22/400/500',
    after: 'https://picsum.photos/id/33/400/500',
    stat: 'Reversed Type II Diabetes',
    time: '16 Weeks'
  },
  {
    id: '3',
    name: 'Sarah T.',
    before: 'https://picsum.photos/id/177/400/500',
    after: 'https://picsum.photos/id/277/400/500',
    stat: 'Peak Athletic Condition',
    time: '8 Weeks'
  }
];

export const Transformations: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {TRANSFORMATION_DATA.map((item) => (
        <div key={item.id} className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
            <div className="absolute inset-0 flex">
              <div className="w-1/2 overflow-hidden border-r border-black">
                <img src={item.before} alt="Before" className="w-full h-full object-cover grayscale brightness-75 transition group-hover:scale-110 duration-700" />
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase">Before</div>
              </div>
              <div className="w-1/2 overflow-hidden">
                <img src={item.after} alt="After" className="w-full h-full object-cover transition group-hover:scale-110 duration-700" />
                <div className="absolute top-2 right-2 bg-indigo-600 px-2 py-1 text-[10px] font-bold uppercase">After</div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h4 className="font-display text-xl">{item.name}</h4>
            </div>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{item.stat}</span>
            <span className="text-[10px] text-gray-500 uppercase">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
