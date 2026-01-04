import Link from "next/link"
import { Quote, ChevronRight, Target, Shield, Zap } from "lucide-react"

export default function AboutCoachPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-0">
        <div
          className="w-full h-full bg-fixed bg-center bg-cover opacity-15"
          style={{
            backgroundImage: "url('/images/parallax-background.jpeg')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
      </div>

      <div className="relative z-10 pt-40 pb-32">
        {/* Hero Section */}
        <section className="px-6 mb-32 overflow-visible">
          <div className="max-w-7xl mx-auto text-center overflow-visible">
            <span className="text-[#a855f7] font-black text-[11px] uppercase tracking-[0.5em] block mb-8">
              Executive Architect
            </span>
            <div className="heading-safe-container overflow-visible">
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl italic uppercase tracking-tighter italic-fix pr-8">
                <span className="text-white">Get To Know</span> <span className="text-[#a855f7]">Your Coach</span>
              </h1>
            </div>
            <p className="text-zinc-500 max-w-2xl mx-auto font-light uppercase tracking-widest text-xs leading-loose mt-8">
              The man behind the protocol. Richard Al-ameen is not just a coach; he is a specialist in metabolic mastery
              and executive performance.
            </p>
          </div>
        </section>

        {/* The Story Section */}
        <section className="px-6 py-32 bg-[#0e0e0e] border-y border-white/5 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <Link href="/bio" className="relative group cursor-pointer">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#a855f7] to-purple-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 aspect-[4/5] bg-zinc-900 shadow-2xl">
                <img
                  src="/images/hero-transformation.png"
                  alt="Coach Richard Al-ameen Transformation"
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-black uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Full Bio
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-black border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                <p className="font-display text-4xl text-[#a855f7] italic italic-fix pr-4">EST. 2018</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">
                  Team Al-ameen Origin
                </p>
              </div>
            </Link>

            {/* Bio Content */}
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Target className="w-6 h-6 text-[#a855f7]" />
                  <h2 className="font-display text-4xl uppercase italic text-white italic-fix">My Mission</h2>
                </div>
                <p className="text-zinc-400 font-light leading-loose tracking-wide">
                  To bridge the gap between aesthetic physique and actual physiological health. We don't just build
                  bodies that look good in a suit; we build systems that thrive under the pressure of a boardroom. My
                  mission is to give every high-performer the metabolic resilience they deserve.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Zap className="w-6 h-6 text-[#a855f7]" />
                  <h2 className="font-display text-4xl uppercase italic text-white italic-fix">My Philosophy</h2>
                </div>
                <p className="text-zinc-400 font-light leading-loose tracking-wide">
                  The Apex Ratio is about leverage. How much energy can you output for the smallest amount of input?
                  Efficiency is everything. We prioritize movement quality, nutrient partitioning, and nervous system
                  recovery to ensure your "Apex Score" stays at its peak year-round.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Shield className="w-6 h-6 text-[#a855f7]" />
                  <h2 className="font-display text-4xl uppercase italic text-white italic-fix">The Apex Standard</h2>
                </div>
                <p className="text-zinc-400 font-light leading-loose tracking-wide">
                  Team Al-ameen doesn't do "quick fixes." We do architecture. We build a lifestyle structure that
                  survives travel, late nights, and stress. If it isn't sustainable for an executive, it isn't part of
                  our protocol.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Journey Section */}
        <section className="px-6 py-40 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 overflow-visible">
              <h2 className="font-display text-5xl md:text-7xl uppercase italic text-white mb-6 italic-fix pr-6">
                My Transformation Journey
              </h2>
              <p className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.5em]">
                The proof is in the process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  label: "Before",
                  date: "September 2017 - August 2018",
                  milestone: "The Baseline",
                  img: "/images/baseline-transformation.png",
                },
                {
                  label: "During",
                  date: "August 2017 - Feb 2019",
                  milestone: "The Metabolic Shift",
                  img: "/images/metabolic-shift-transformation.png",
                },
                {
                  label: "After",
                  date: "2020...",
                  milestone: "The Apex Ratio",
                  img: "/images/apex-ratio-transformation.png",
                },
              ].map((step, idx) => (
                <div key={idx} className="group overflow-visible">
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 mb-8 shadow-2xl bg-zinc-900">
                    <img
                      src={step.img || "/placeholder.svg"}
                      alt={step.label}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{step.label}</span>
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="font-display text-2xl text-white uppercase italic italic-fix pr-2">
                      {step.milestone}
                    </h4>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-2">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The "Why" Section */}
        <section className="px-6 py-48 bg-black relative overflow-hidden border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Quote className="w-20 h-20 text-[#a855f7]/20 mx-auto mb-12" />
            <div className="heading-safe-container overflow-visible">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic uppercase leading-tight text-white italic-fix pr-6">
                "I don't just coach this, <br /> <span className="text-[#a855f7]">I live it."</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] mt-12">The Apex Promise</p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 py-40">
          <div className="max-w-5xl mx-auto glass-panel p-16 md:p-24 rounded-[4rem] text-center border-b-8 border-[#7e22ce]/50 relative overflow-visible">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#a855f7] px-8 py-3 rounded-full shadow-2xl shadow-purple-500/30">
              <span className="text-[11px] font-black uppercase tracking-widest text-white">
                Application Window Open
              </span>
            </div>
            <div className="heading-safe-container overflow-visible mb-12">
              <h2 className="font-display text-5xl md:text-8xl uppercase italic text-white italic-fix pr-8">
                Ready to Start Your <br /> <span className="text-[#a855f7]">Transformation?</span>
              </h2>
            </div>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-6 px-16 py-8 rounded-[2rem] text-sm group bg-[#a855f7] hover:bg-[#9333ea] text-white font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
            >
              <span>Join The Academy</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mt-12">
              Limited slots per quarter. Strict acceptance criteria.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
