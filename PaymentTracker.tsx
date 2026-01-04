
import React from 'react';
import { DollarSign, ExternalLink, Send, CreditCard, PieChart } from 'lucide-react';
import { UserProfile } from '../types.ts';

interface PaymentTrackerProps {
  clients: UserProfile[];
}

export const PaymentTracker: React.FC<PaymentTrackerProps> = ({ clients }) => {
  const totalRevenue = clients.reduce((acc, c) => acc + (c.accountCredit || 0), 0);
  const pendingPayments = clients.filter(c => c.paymentStatus !== 'Paid').length;

  return (
    <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-10 overflow-visible">
        <div className="overflow-visible">
          <h3 className="font-display text-3xl text-white italic-fix uppercase pr-4">Revenue Audit</h3>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Financial Intelligence</p>
        </div>
        <PieChart className="text-amber-400" size={24} />
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">Total Credit</p>
            <p className="text-2xl font-display text-white italic pr-2">£{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">Pending</p>
            <p className="text-2xl font-display text-amber-400 italic pr-2">{pendingPayments}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Awaiting Action</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {clients.filter(c => c.paymentStatus !== 'Paid').map(client => (
              <div key={client.uid} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-amber-400/30 transition">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 text-[10px] font-black">
                    {client.displayName?.charAt(0)}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white">{client.displayName}</p>
                    <p className="text-[8px] font-black uppercase text-zinc-500">{client.serviceType}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-amber-400 hover:text-black rounded-lg transition text-zinc-400" title="Send Stripe Link">
                  <Send size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
           <button className="w-full flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
              <ExternalLink size={14} />
              Open Stripe Dashboard
           </button>
        </div>
      </div>
    </div>
  );
};
