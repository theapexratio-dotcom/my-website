
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronRight, ChevronLeft, Check, Sparkles, User, Activity, Target, ShieldCheck, ArrowRight, Stethoscope } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface OnboardingFormData {
  name: string;
  email: string;
  age: number;
  currentWeight: string;
  targetWeight: string;
  jobType: 'sedentary' | 'active' | 'highly-active';
  trainingFrequency: string;
  trainingHistory: string;
  medicalHistory: string;
  biggestStruggle: string;
  mainGoal: 'fat-loss' | 'muscle-gain' | 'performance';
  commitment: boolean;
  protocolType: string;
}

interface OnboardingFormProps {
  onStepChange?: (step: number) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onStepChange }) => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<OnboardingFormData>({
    defaultValues: {
      jobType: 'sedentary',
      mainGoal: 'performance',
      commitment: false,
      protocolType: searchParams.get('type') || 'online'
    }
  });

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['name', 'email', 'age', 'currentWeight', 'targetWeight'];
    if (step === 2) fieldsToValidate = ['jobType', 'trainingFrequency', 'trainingHistory'];
    if (step === 3) fieldsToValidate = ['biggestStruggle', 'medicalHistory', 'mainGoal'];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data: OnboardingFormData) => {
    setStatus('SUBMITTING');

    try {
      // Save data locally for the signup phase to pick up
      localStorage.setItem('apex_onboarding_pending', JSON.stringify(data));

      const response = await fetch('https://formspree.io/f/mqeadbzd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setTimeout(() => {
          // Move to account creation phase
          window.location.hash = '#/signup';
        }, 3000);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="bg-white p-10 md:p-16 rounded-[40px] text-center animate-in fade-in zoom-in duration-700 border border-gray-100 shadow-2xl">
        <div className="w-24 h-24 bg-[#a855f7] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl mb-6 uppercase italic leading-tight italic-fix text-black pr-4">Audit Captured.</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Initial physiological sync complete. Now, establish your secure access protocol.
        </p>
        <div className="flex items-center justify-center gap-3 text-[#a855f7] animate-pulse">
           <Sparkles size={18} />
           <span className="text-[10px] font-black uppercase tracking-widest">Redirecting to Final Enrollment...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-[#a855f7] font-black text-[11px] uppercase tracking-[0.4em] block mb-2">Protocol Admission</span>
            <h3 className="font-display text-3xl md:text-4xl uppercase italic italic-fix text-black pr-4">Phase {step} of {totalSteps}</h3>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Audit Status</span>
             <span className="text-xl font-display text-black">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-[1px]">
          <div 
            className="h-full bg-[#a855f7] transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-14 rounded-[40px] border border-gray-100 shadow-2xl relative overflow-visible">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 overflow-visible">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-[#a855f7]/10 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-[#a855f7]" />
              </div>
              <h4 className="font-display text-2xl uppercase italic italic-fix text-black pr-4">Personal Baseline</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                <input 
                  {...register('name', { required: true })}
                  placeholder="Richard Al-ameen"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition text-lg font-light text-black"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Secure Email</label>
                <input 
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="richard@apex.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition text-lg font-light text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Age</label>
                <input 
                  type="number"
                  {...register('age', { required: true, min: 18 })}
                  placeholder="25"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition text-lg text-black"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Weight (KG)</label>
                <input 
                  {...register('currentWeight', { required: true })}
                  placeholder="85"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition text-lg text-black"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Target (KG)</label>
                <input 
                  {...register('targetWeight', { required: true })}
                  placeholder="78"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition text-lg text-black"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-[#a855f7]/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#a855f7]" />
              </div>
              <h4 className="font-display text-2xl uppercase italic italic-fix text-black pr-4">Metabolic & Training Input</h4>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Daily Activity Level</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'sedentary', label: 'Sedentary', desc: 'Office bound' },
                  { id: 'active', label: 'Active', desc: 'Regular walking' },
                  { id: 'highly-active', label: 'Highly Active', desc: 'Elite output' }
                ].map(opt => (
                  <label key={opt.id} className="relative cursor-pointer group">
                    <input 
                      type="radio" 
                      value={opt.id}
                      {...register('jobType')} 
                      className="peer sr-only"
                    />
                    <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 transition group-hover:bg-gray-100 peer-checked:border-[#a855f7] peer-checked:bg-[#a855f7]/5">
                      <div className="flex justify-between items-center">
                         <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-black">{opt.label}</p>
                            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{opt.desc}</p>
                         </div>
                         <div className="w-4 h-4 rounded-full border border-gray-200 peer-checked:border-[#a855f7] peer-checked:bg-[#a855f7]"></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Training History & Experience</label>
              <textarea 
                {...register('trainingHistory', { required: true })}
                placeholder="Detail your previous training experience, years active, and style of training (e.g., bodybuilding, powerlifting, HIIT)."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition min-h-[120px] resize-none leading-relaxed text-black"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Current Training Frequency (Days/Week)</label>
              <input 
                {...register('trainingFrequency', { required: true })}
                placeholder="e.g. 4 days per week"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#a855f7] transition text-lg text-black"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-[#a855f7]/10 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-[#a855f7]" />
              </div>
              <h4 className="font-display text-2xl uppercase italic italic-fix text-black pr-4">Health & Objective Blueprint</h4>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Stethoscope className="w-3 h-3 text-[#a855f7]" />
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Relevant Medical History</label>
              </div>
              <textarea 
                {...register('medicalHistory', { required: true })}
                placeholder="List any injuries, medical conditions, or medications we should be aware of for safety and protocol optimization."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-6 focus:outline-none focus:border-[#a855f7] transition min-h-[120px] resize-none leading-relaxed text-black"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Biggest Struggle</label>
              <textarea 
                {...register('biggestStruggle', { required: true })}
                placeholder="What is the single biggest obstacle holding you back right now?"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-6 focus:outline-none focus:border-[#a855f7] transition min-h-[120px] resize-none leading-relaxed text-black"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Primary Objective</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'fat-loss', label: 'Fat Loss', desc: 'Physique refinement' },
                  { id: 'muscle-gain', label: 'Muscle Gain', desc: 'SWR Architecture' },
                  { id: 'performance', label: 'Performance', desc: 'Metabolic Mastery' }
                ].map(opt => (
                  <label key={opt.id} className="relative cursor-pointer group">
                    <input 
                      type="radio" 
                      value={opt.id}
                      {...register('mainGoal')} 
                      className="peer sr-only"
                    />
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 transition group-hover:bg-gray-100 peer-checked:border-[#a855f7] peer-checked:bg-[#a855f7]/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black">{opt.label}</p>
                      <p className="text-[8px] text-gray-500 mt-1 uppercase tracking-wider">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-[#a855f7]/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#a855f7]" />
              </div>
              <h4 className="font-display text-2xl uppercase italic italic-fix text-black pr-4">Final Commitment</h4>
            </div>
            
            <label className="flex items-start gap-6 p-8 bg-gray-50 rounded-3xl cursor-pointer hover:bg-gray-100 transition border border-gray-100 group">
              <input 
                type="checkbox" 
                {...register('commitment', { required: true })}
                className="peer h-6 w-6 rounded-lg border-gray-300 text-[#a855f7] focus:ring-[#a855f7]"
              />
              <div className="flex-grow">
                <span className="text-xs font-black uppercase tracking-widest text-black">Protocol Accepted</span>
                <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">I confirm that I am ready to commit to the elite physical standard demanded by Team Al-ameen and that the medical information provided is accurate.</p>
              </div>
            </label>
          </div>
        )}

        {status === 'ERROR' && (
          <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center mt-4 animate-pulse">
            Transmission Error. Protocol Sync Failed.
          </p>
        )}

        {/* Navigation */}
        <div className="mt-16 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between gap-6">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="w-full md:w-auto px-10 py-5 bg-gray-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition flex items-center justify-center gap-3"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Phase
            </button>
          )}
          
          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="w-full md:w-auto ml-auto px-14 py-5 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#a855f7] transition flex items-center justify-center gap-3"
            >
              Analyze & Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="submit"
              disabled={status === 'SUBMITTING'}
              className="w-full md:w-auto ml-auto px-16 py-6 bg-black text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-[#a855f7] transition flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {status === 'SUBMITTING' ? 'Synchronizing...' : 'Submit Assessment'}
              <Sparkles className={`w-5 h-5 ${status === 'SUBMITTING' ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
