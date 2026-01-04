
import React from 'react';
import { Link } from 'react-router-dom';
import { TransformationsPage } from './TransformationsPage.tsx';
import { SignupPage } from './SignupPage.tsx';
import { ArrowLeft } from 'lucide-react';

export const AcademyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Back to Home Button Sticky */}
      <div className="fixed top-24 left-6 z-[60]">
        <Link 
          to="/" 
          className="flex items-center space-x-2 px-5 py-2.5 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full text-[11px] font-black uppercase tracking-widest text-white hover:bg-accent-purple transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </Link>
      </div>

      <div className="relative z-10 overflow-visible">
        {/* Header Section */}
        <section className="pt-48 pb-24 bg-gradient-to-b from-purple-950/20 via-black to-black overflow-visible">
          <div className="text-center px-6 overflow-visible max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="text-accent-purple font-black uppercase tracking-[0.5em] text-[11px] inline-block animate-pulse">Academy Protocol Admission</span>
            </div>
            
            {/* Heading with explicit clipping fixes */}
            <div className="overflow-visible inline-block relative px-4 sm:px-12">
               <div className="heading-safe-container">
                 <h1 className="font-display text-6xl md:text-8xl lg:text-9xl italic uppercase tracking-tighter mb-10 italic-fix leading-tight">
                  The Apex <span className="text-gradient">Academy</span>
                 </h1>
               </div>
            </div>
            
            <p className="text-gray-500 max-w-3xl mx-auto text-[10px] md:text-xs uppercase tracking-[0.6em] font-black opacity-60 leading-loose mt-8">
              Experience Based Results &bull; Elite Execution &bull; Metabolic Mastery
            </p>
          </div>
        </section>

        {/* Part 1: Transformations */}
        <div className="overflow-hidden">
          <TransformationsPage />
        </div>
        
        {/* Visual Separator */}
        <div className="py-40 flex flex-col items-center justify-center overflow-visible">
           <div className="w-[2px] h-64 bg-gradient-to-b from-accent-purple via-accent-purple/20 to-transparent"></div>
           <div className="mt-12 overflow-visible">
             <span className="text-[12px] font-black uppercase tracking-[0.6em] text-accent-purple animate-bounce block text-center">Final Entry Point</span>
           </div>
        </div>

        {/* Part 2: Onboarding Trigger / Signup Section */}
        <div className="pb-40">
           <SignupPage />
        </div>
      </div>
      
      {/* Background Decorators */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[200px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[200px] opacity-30"></div>
      </div>
    </div>
  );
};
