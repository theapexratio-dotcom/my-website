
import React, { useState } from 'react';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CheckInResult } from '../types.ts';

interface CheckInSystemProps {
  athlete: UserProfile;
  onComplete: (result: CheckInResult) => void;
}

export const CheckInSystem: React.FC<CheckInSystemProps> = ({ athlete, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAIScan = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Simulate scanning logic for the AI prompt
      // In a real app, this would query historical snapshots from Firestore
      const prompt = `
        Perform an elite coaching audit for Athlete: ${athlete.displayName}.
        Goal: ${athlete.mainGoal || 'Physique Optimization'}.
        Current Weight: ${athlete.currentWeight}kg.
        Recent SWR: 1.45.
        Recent RHR: 58bpm.
        
        Scan logic: 
        1. Compare current weight vs 2 weeks ago (85.2kg).
        2. Analyze progress photos (Athlete showing improved shoulder cap and lower back tightness).
        3. Audit session inventory (${athlete.sessionBalance} sessions remaining).

        Return a JSON object with:
        - actionPoints (Array of 3 strings: tactical physical/nutrition advice)
        - focusMantra (1 string: high-energy motivational focus)
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              actionPoints: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "3 high-priority action items for the coming week."
              },
              focusMantra: { 
                type: Type.STRING,
                description: "A concise, powerful mantra for the athlete's mindset."
              }
            },
            required: ["actionPoints", "focusMantra"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      
      const result: CheckInResult = {
        id: `ci_${Date.now()}`,
        date: new Date().toLocaleDateString(),
        stats: {
          weight: { current: parseFloat(athlete.currentWeight || '83.8'), previous: 85.2, trend: 'down' },
          apexScore: { current: 8.5, previous: 7.2, trend: 'up' },
          rhr: { current: 58, previous: 62, trend: 'down' },
          sessionsUsed: 2
        },
        actionPoints: data.actionPoints || [
          "Increase NEAT by 2,000 steps daily",
          "Add 10g EAAs to intra-workout protocol",
          "Prioritize 8 hours of deep recovery"
        ],
        focusMantra: data.focusMantra || "Precision Over Intensity"
      };

      onComplete(result);
    } catch (error) {
      console.error("AI Scan failed", error);
      alert("Intelligence Sync Interrupted. Verify API protocol.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        runAIScan();
      }}
      disabled={isAnalyzing}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl group ${
        isAnalyzing ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#a855f7] text-white hover:bg-white hover:text-black active:scale-95'
      }`}
    >
      {isAnalyzing ? (
        <Clock size={14} className="animate-spin" />
      ) : (
        <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
      )}
      <span>{isAnalyzing ? 'Scanning Roster...' : 'Ready for Check-In'}</span>
    </button>
  );
};
