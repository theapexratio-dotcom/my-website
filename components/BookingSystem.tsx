
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { UserProfile, BookedSession } from '../types.ts';

interface BookingSystemProps {
  clients: UserProfile[];
  onBookSession: (clientId: string, date: string, time: string) => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ clients, onBookSession }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const f2fClients = clients.filter(c => c.serviceType === 'Face-to-Face');

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleBooking = () => {
    if (!selectedClientId) return alert("Select an Athlete");
    const dateStr = selectedDate.toISOString().split('T')[0];
    onBookSession(selectedClientId, dateStr, selectedTime);
    alert(`Protocol Locked: ${selectedTime} on ${dateStr}`);
  };

  return (
    <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-10 overflow-visible">
        <div className="overflow-visible">
          <h3 className="font-display text-3xl text-white italic-fix uppercase pr-4">Slot Allocation</h3>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Managed Booking Engine</p>
        </div>
        <CalendarIcon className="text-amber-400" size={24} />
      </div>

      <div className="space-y-8 flex-grow">
        {/* Athlete Selection */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Assigned Athlete</label>
          <select 
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-amber-400 outline-none text-white appearance-none"
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
          >
            <option value="">Select Target...</option>
            {f2fClients.map(c => (
              <option key={c.uid} value={c.uid}>{c.displayName} ({c.sessionBalance} Left)</option>
            ))}
          </select>
        </div>

        {/* Date Selector Simple */}
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
          <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))} className="p-2 hover:bg-white/10 rounded-lg transition text-zinc-400">
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] font-black uppercase tracking-widest text-white">
            {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))} className="p-2 hover:bg-white/10 rounded-lg transition text-zinc-400">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 ${
                selectedTime === time ? 'bg-amber-400 text-black border-amber-400 shadow-lg' : 'bg-black/20 text-zinc-500 border-white/5 hover:border-white/20'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <button 
          onClick={handleBooking}
          className="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl mt-4"
        >
          Confirm Slot Protocol
        </button>
      </div>
    </div>
  );
};
