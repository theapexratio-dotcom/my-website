
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CheckInResult } from '../types.ts';

interface ClientProgressTableProps {
  checkIn: CheckInResult;
}

export const ClientProgressTable: React.FC<ClientProgressTableProps> = ({ checkIn }) => {
  const { stats } = checkIn;

  const renderTrend = (val: number, trend: 'up' | 'down' | 'stable', inverse = false) => {
    const isGood = inverse ? trend === 'up' : trend === 'down';
    if (trend === 'stable') return <Minus size={16} className="text-zinc-500" />;
    return trend === 'up' 
      ? <TrendingUp size={16} className={isGood ? 'text-green-500' : 'text-red-500'} />
      : <TrendingDown size={16} className={isGood ? 'text-green-500' : 'text-red-500'} />;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable', inverse = false) => {
    if (trend === 'stable') return 'text-zinc-400';
    const isGood = inverse ? trend === 'up' : trend === 'down';
    return isGood ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-[#141414] overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="font-display text-2xl text-white uppercase italic italic-fix pr-4">Metrics Delta Audit</h4>
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Snapshot: {checkIn.date}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/5">
            <tr>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Protocol Metric</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Previous</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Current</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-5 font-bold text-zinc-300 text-xs uppercase tracking-wider">Body Mass (kg)</td>
              <td className="py-5 text-zinc-500 font-mono">{stats.weight.previous}</td>
              <td className={`py-5 font-display text-2xl ${getTrendColor(stats.weight.trend)}`}>{stats.weight.current}</td>
              <td className="py-5">{renderTrend(stats.weight.current, stats.weight.trend)}</td>
            </tr>
            <tr>
              <td className="py-5 font-bold text-zinc-300 text-xs uppercase tracking-wider">Apex Ratio Score</td>
              <td className="py-5 text-zinc-500 font-mono">{stats.apexScore.previous}</td>
              <td className={`py-5 font-display text-2xl ${getTrendColor(stats.apexScore.trend, true)}`}>{stats.apexScore.current}</td>
              <td className="py-5">{renderTrend(stats.apexScore.current, stats.apexScore.trend, true)}</td>
            </tr>
            <tr>
              <td className="py-5 font-bold text-zinc-300 text-xs uppercase tracking-wider">Resting Heart Rate (bpm)</td>
              <td className="py-5 text-zinc-500 font-mono">{stats.rhr.previous}</td>
              <td className={`py-5 font-display text-2xl ${getTrendColor(stats.rhr.trend)}`}>{stats.rhr.current}</td>
              <td className="py-5">{renderTrend(stats.rhr.current, stats.rhr.trend)}</td>
            </tr>
            <tr>
              <td className="py-5 font-bold text-zinc-300 text-xs uppercase tracking-wider">Inventory Usage</td>
              <td className="py-5 text-zinc-500 font-mono">Archive</td>
              <td className="py-5 font-display text-2xl text-amber-400">-{stats.sessionsUsed}</td>
              <td className="py-5 text-[9px] font-black text-zinc-700 uppercase">Audit Lock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
