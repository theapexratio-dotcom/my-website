import Link from "next/link"
import { ArrowLeft, Award, Users, Target, TrendingUp } from "lucide-react"

export default function BioPage() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className="w-full h-full bg-fixed bg-center bg-cover opacity-20"
          style={{
            backgroundImage: "url('/images/parallax-background.jpeg')",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-40 pb-32">
        {/* Back Button */}
        <div className="max-w-5xl mx-auto mb-12">
          <Link
            href="/about-coach"
            className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-black uppercase tracking-widest">Back to About</span>
          </Link>
        </div>

        {/* Main Bio Content */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 overflow-visible">
            <span className="text-[#a855f7] font-black text-[11px] uppercase tracking-[0.5em] block mb-6">
              The Foundation
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl italic uppercase tracking-tighter text-white italic-fix pr-6 mb-8">
              Richard <span className="text-[#a855f7]">Al-Ameen</span>
            </h1>
            <p className="text-zinc-400 text-sm uppercase tracking-widest font-black">
              Executive Transformation Specialist
            </p>
          </div>

          {/* Bio Content Sections */}
          <div className="space-y-12 bg-black/40 backdrop-blur-sm rounded-[3rem] p-12 md:p-16 border border-white/10 shadow-2xl">
            {/* Main Bio */}
            <div className="space-y-6">
              <p className="text-white font-light leading-loose tracking-wide text-lg">
                I specialize in working with{" "}
                <span className="text-[#a855f7] font-semibold">high-earning executives and busy professionals</span> who
                demand the same excellence in their physical health as they do in their careers. After spending three
                years at Ultimate Performance, I've mastered the art of the world-class body transformation.
              </p>
              <p className="text-white font-light leading-loose tracking-wide text-lg">
                I don't just provide a plan; I provide a foundation built on years of experience, massive successes, and
                the lessons learned from my own losses. I've lived the results I coach, and I am passionate about using
                that roadmap to ensure my clients reach their peak without wasting a second of their valuable time.
              </p>
              <p className="text-white font-light leading-loose tracking-wide text-lg">
                Welcome to the most solid foundation for your body transformation.
              </p>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#a855f7]" />
                  <h3 className="font-display text-2xl uppercase italic text-white italic-fix">The Experience</h3>
                </div>
                <p className="text-zinc-300 font-light leading-relaxed">
                  7 years overall experience
                  <br />3 years at the world's leading transformation gym (UP).
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#a855f7]" />
                  <h3 className="font-display text-2xl uppercase italic text-white italic-fix">The Client</h3>
                </div>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Hard-working executives who need high-efficiency results.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#a855f7]" />
                  <h3 className="font-display text-2xl uppercase italic text-white italic-fix">The Mission</h3>
                </div>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Using every success and loss I've experienced to bypass the BS and get you to your goal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#a855f7]" />
                  <h3 className="font-display text-2xl uppercase italic text-white italic-fix">The Result</h3>
                </div>
                <p className="text-zinc-300 font-light leading-relaxed">
                  A foundation for your health that is as solid as your business.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-12 text-center border-t border-white/10">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-4 px-12 py-6 rounded-[2rem] text-sm group bg-[#a855f7] hover:bg-[#9333ea] text-white font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50"
              >
                <span>Start Your Transformation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Bio/page;
