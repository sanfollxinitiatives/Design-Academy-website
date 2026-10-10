import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface IntroSectionProps {
  onSelectTrack?: (trackId: string) => void;
}

export default function IntroSection({ onSelectTrack }: IntroSectionProps) {
  return (
    <section className="py-16 sm:py-28 relative bg-white border-b border-[#26252a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Quote / Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7615d9] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7615d9]" />
              The Design Academy Philosophy
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#1e1d24] leading-[1.08]">
              Where creativity meets <span className="text-gradient-warm">practical skills.</span>
            </h2>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#fafafc] border border-[#26252a]/10 shadow-xs space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#22b8a5] font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Studio Sprints vs Rote Theory</span>
              </div>
              <p className="text-xs sm:text-sm text-[#575560] leading-relaxed">
                At Sanfollx Initiatives, we do not teach dry software manuals. Every student works through real-world briefs, client revisions, brand guidelines, and responsive live sites — building the exact muscles top studios recruit for.
              </p>
            </div>
          </motion.div>

          {/* Narrative Body */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 space-y-4 sm:space-y-5 text-[#575560] text-sm sm:text-lg leading-relaxed"
          >
            <p>
              Design Academy is purpose-built for aspiring creatives who want to transform natural visual curiosity into a high-demand professional trade. Our specialized programs focus on branding, graphic systems, and interactive digital interfaces.
            </p>
            <p>
              You learn inside an active design agency environment in Pattambi with direct mentorship from practicing art directors. By graduation, your portfolio is not a collection of tutorials, but commercial-grade case studies that win clients.
            </p>

            <div className="pt-2 sm:pt-4 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#74727d]">
              <span className="w-8 h-[1px] bg-[#26252a]/20" />
              <span>Sanfollx Initiatives · Design Academy</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
