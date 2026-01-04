
import React from 'react';
import { Minus, Plus, Mail } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  sessionBalance: number;
  lastCheckIn: string;
  plan: string;
}

interface ClientRowProps {
  client: Client;
  onUpdateSession: (id: string, delta: number) => void;
}

export const ClientRow: React.FC<ClientRowProps> = ({ client, onUpdateSession }) => {
  const isLow = client.sessionBalance <= 2;

  return (
    <tr className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="py-6 px-6">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-display text-lg text-white">
            {client.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-wider">{client.name}</p>
            <div className="flex items-center text-[10px] text-zinc-500 mt-0.5 space-x-2">
              <Mail size={10} />
              <span>{client.email}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="py-6 px-6">
        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-white/10">
          {client.plan}
        </span>
      </td>
      <td className="py-6 px-6">
        <div className={`flex items-center space-x-4 ${isLow ? 'text-red-400' : 'text-white'}`}>
          <div className="flex items-center space-x-3 bg-black/40 p-2 rounded-xl border border-white/5">
            <button 
              onClick={() => onUpdateSession(client.id, -1)}
              className="p-1.5 hover:bg-red-500/20 rounded-md transition text-zinc-500 hover:text-red-400"
            >
              <Minus size={14} />
            </button>
            <span className="font-display text-2xl w-8 text-center">{client.sessionBalance}</span>
            <button 
              onClick={() => onUpdateSession(client.id, 10)}
              className="p-1.5 hover:bg-green-500/20 rounded-md transition text-zinc-500 hover:text-green-400"
            >
              <Plus size={14} />
            </button>
          </div>
          {isLow && (
            <span className="text-[8px] font-black uppercase tracking-widest animate-pulse">Needs Renewal</span>
          )}
        </div>
      </td>
      <td className="py-6 px-6 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
        {client.lastCheckIn}
      </td>
      <td className="py-6 px-6 text-right">
        <button className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] hover:text-white transition">
          View Audit
        </button>
      </td>
    </tr>
  );
};
