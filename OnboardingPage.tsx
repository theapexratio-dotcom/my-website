
import React, { useState, useEffect } from 'react';
import { OnboardingForm } from '../components/OnboardingForm.tsx';
import { ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export const OnboardingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const protocolType = searchParams.get('type') === 'f2f' ? 'Face-to-Face' : 'Online Academy';
  
  // This state will be synced with the OnboardingForm
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen py-32 px-6 relative bg-white overflow-hidden text-black">
      {/* Global Protocol Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-[100]">
        <div 
          className="h-full bg-[#a855f7] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          style={{ width: `${progressPercent}%` }}
        ></div>
        <div className="absolute top-1.5 right-6 bg-[#a855f7] px-4 py-1.5 rounded-b-xl shadow-xl">
           <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Protocol Sync: {Math.round(progressPercent)}%</span>
        </div>
      </div>

      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 px-6 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-100 transition mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Site</span>
        </Link>

        <div className="text-center mb-16 overflow-visible">
          <span className="text-[#a855f7] font-black text-[11px] uppercase tracking-[0.4em] mb-4 block">Selected Protocol: {protocolType}</span>
          <div className="heading-safe-container overflow-visible inline-block">
            <h1 className="font-display text-5xl md:text-8xl mb-4 italic uppercase tracking-tighter italic-fix pr-12">
              Apex <span className="text-gradient">Onboarding</span>
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto font-light uppercase tracking-widest text-[10px] leading-relaxed mt-4">
            Every elite transformation begins with precise data. <br className="hidden md:block"/> Tell us exactly where you are starting from.
          </p>
        </div>

        <OnboardingForm onStepChange={setCurrentStep} />
      </div>
    </div>
  );
};
