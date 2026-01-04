
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, CheckCircle2, TrendingUp, Target, Activity, Zap, ClipboardList } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CheckInLog } from '../types.ts';

export const CheckInPage: React.FC<{ user: UserProfile }> = ({ user }) => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CheckInLog | null>(null);

  const performCheckIn = async () => {
    setIsAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Perform a professional fitness coaching audit for athlete: ${user.displayName}.
        Service Tier: ${user.plan}.
        Current Weight: ${user.currentWeight}kg. Target: ${user.targetWeight}kg.
        Latest RHR: 58bpm.
        SWR: 1.4.
        
        Compare this to the baseline (Weight: 88kg, RHR: 68bpm).
        Provide a concise comparison table summary, 3-4 specific action points for the next week, and one key strategic focus mantra.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              comparison: { type: Type.STRING },
              actionPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              focus: { type: Type.STRING }
            },
            required: ["comparison", "actionPoints", "focus"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      
      const newLog: CheckInLog = {
        id: `ch_${Date.now()}`,
        date: new Date().toLocaleDateString(),
        weight: parseFloat(user.currentWeight || '0'),
        rhr: 58,
        swr: 1.4,
        apexScore: 8.2,
        aiFeedback: result
      };

      setAnalysisResult(newLog);
      
      // Update local storage to simulate persistence
      const savedUser = JSON.parse(localStorage.getItem('apex_user') || '{}');
      savedUser.checkInHistory = [newLog, ...(savedUser.checkInHistory || [])];
      localStorage.setItem('apex_user', JSON.stringify(savedUser));

    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all mb-12">
          <ArrowLeft size={14} /> Back to Hub
        </button>

        <div className="text-center mb-16 overflow-visible">
          <span className="text-[#a855f7] font-black text-[11px] uppercase tracking-[0.5em] block mb-4">Phase Audit: Check-in</span>
          <div className="heading-safe-container overflow-visible">
            <h1 className="font-display text-6xl md:text-8xl text-white italic uppercase italic-fix pr-12">Protocol <span className="text-gradient">Review</span></h1>
          </div>
        </div>

        {!analysisResult ? (
          <div className="glass-panel p-12 md:p-20 rounded-[4rem] border border-white/5 bg-[#141414] text-center">
            <div className="w-24 h-24 bg-[#a855f7]/10 rounded-3xl flex items-center justify-center text-[#a855f7] mx-auto mb-10 border border-[#a855f7]/20">
               <ClipboardList size={48} />
            </div>
            <h3 className="font-display text-4xl text-white uppercase italic mb-6">Ready for Weekly Audit?</h3>
            <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed mb-12 uppercase tracking-widest font-bold">
              Our AI Intelligence will scan your latest metrics, training logs, and physique frames to optimize your next 7-day block.
            </p>
            <button 
              onClick={performCheckIn}
              disabled={isAnalyzing}
              className="px-16 py-8 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[#a855f7] hover:text-white transition-all shadow-2xl disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              <span>{isAnalyzing ? 'Synchronizing Intelligence...' : 'Initialize AI Audit'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Progress Matrix */}
            <div className="glass-panel p-10 rounded-[3rem] border border-[#a855f7]/20 bg-[#141414]">
               <div className="flex items-center gap-4 mb-8">
                  <TrendingUp className="text-[#a855f7]" size={24} />
                  <h3 className="font-display text-3xl text-white uppercase italic">Progress Matrix</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-white/5">
                       <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Metric</th>
                       <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Baseline</th>
                       <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Current</th>
                       <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Variance</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     <tr>
                       <td className="py-6 font-bold text-white uppercase text-xs tracking-wider">Body Mass</td>
                       <td className="py-6 text-zinc-400">88.0kg</td>
                       <td className="py-6 text-white font-display text-2xl">{analysisResult.weight}kg</td>
                       <td className="py-6 text-green-500 font-bold">-3.0kg</td>
                     </tr>
                     <tr>
                       <td className="py-6 font-bold text-white uppercase text-xs tracking-wider">Resting Heart Rate</td>
                       <td className="py-6 text-zinc-400">68bpm</td>
                       <td className="py-6 text-white font-display text-2xl">58bpm</td>
                       <td className="py-6 text-green-500 font-bold">-10bpm</td>
                     </tr>
                     <tr>
                       <td className="py-6 font-bold text-white uppercase text-xs tracking-wider">Apex Ratio</td>
                       <td className="py-6 text-zinc-400">6.2</td>
                       <td className="py-6 text-amber-400 font-display text-2xl">8.2</td>
                       <td className="py-6 text-green-500 font-bold">+2.0</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>

            {/* AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-panel p-10 rounded-[3rem] bg-gradient-to-br from-[#141414] to-black border border-white/5">
                  <div className="flex items-center gap-4 mb-8">
                     <Target className="text-[#a855f7]" size={20} />
                     <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Tactical Action Points</h4>
                  </div>
                  <ul className="space-y-6">
                    {analysisResult.aiFeedback.actionPoints.map((p, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="w-5 h-5 rounded-full bg-[#a855f7]/20 flex items-center justify-center shrink-0 mt-1">
                           <CheckCircle2 size={12} className="text-[#a855f7]" />
                        </div>
                        <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed tracking-wide">{p}</p>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="glass-panel p-10 rounded-[3rem] bg-[#a855f7] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <Zap size={100} className="fill-white" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                     <Activity className="text-white" size={20} />
                     <h4 className="text-[11px] font-black uppercase tracking-widest opacity-80">Strategic Focus Mantra</h4>
                  </div>
                  <p className="font-display text-4xl leading-tight uppercase italic mb-10 italic-fix pr-4">
                    "{analysisResult.aiFeedback.focus}"
                  </p>
                  <button onClick={() => navigate('/dashboard')} className="w-full py-4 bg-black text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                     Log to Hub Archive
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
