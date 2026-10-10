import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Users, TrendingUp, Award, Check, X, Sparkles, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { PILLARS, SLS_STAGES, BROCHURE_PILLARS, TARGET_AUDIENCE } from '../data/academyData';

const iconMap = {
  Briefcase: Briefcase,
  Users: Users,
  TrendingUp: TrendingUp,
  Award: Award,
};

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-16 sm:py-32 bg-white relative overflow-hidden border-t border-[#26252a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Stat Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="font-extrabold text-[60px] xs:text-[80px] sm:text-[120px] md:text-[140px] leading-none tracking-[-0.07em] text-gradient-brand">
              2019
            </div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#74727d] font-semibold block mt-2 sm:mt-3">
              ✦ Training & Mentoring Elite Designers in Kerala Since ✦
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ef146b] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef146b]" />
              Why Design Academy
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#1e1d24] leading-tight">
              We Don't Just Teach Design. We Develop Creative Thinkers.
            </h2>
            <p className="text-sm sm:text-lg text-[#575560] leading-relaxed">
              We build problem solvers. We encourage innovation. We inspire entrepreneurship. We help learners create opportunities—not wait for them.
            </p>
          </motion.div>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.iconName as keyof typeof iconMap] || Briefcase;

            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-5 sm:p-7 rounded-3xl bg-[#fafafc] border border-[#26252a]/10 shadow-xs hover:shadow-xl hover:border-[#7615d9]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#7615d9]/10 via-[#ef146b]/10 to-[#ffb51c]/10 flex items-center justify-center text-[#7615d9] border border-[#26252a]/8">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#74727d]">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg uppercase tracking-tight text-[#1e1d24] mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#575560] leading-relaxed mb-3 sm:mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#26252a]/10">
                  <p className="text-[11px] sm:text-[11.5px] text-[#74727d] leading-normal italic">
                    "{pillar.details}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Sanfollx Learning System (SLS) 7-Stage Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-24 rounded-3xl bg-[#1e1d24] text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6 sm:space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ffb51c] font-bold uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Methodology Framework
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
                  The Sanfollx Learning System <span className="text-gradient-warm">(SLS)</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 max-w-md">
                Our 7-stage learning methodology helps learners understand not only <strong className="text-white">how</strong> to create, but <strong className="text-white">why</strong> they create.
              </p>
            </div>

            {/* 7 Stages Horizontal Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
              {SLS_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-start space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#22b8a5] font-bold">{stage.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7615d9]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base uppercase tracking-tight text-white mb-1">
                      {stage.name}
                    </h4>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3 Learning Dimensions (Page 8 of Brochure) */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#7615d9] font-bold">
              3 Core Dimensions · Holistic Creative Education
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1e1d24]">
              Work. Build. Create.
            </h3>
            <p className="text-xs sm:text-base text-[#575560]">
              From mastering the craft to managing clients and scaling your own studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BROCHURE_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#fafafc] border border-[#26252a]/10 hover:border-[#7615d9]/40 hover:shadow-lg transition-all"
              >
                <div className="font-mono text-xs uppercase tracking-widest font-bold mb-1" style={{ color: pillar.color }}>
                  {pillar.subtitle}
                </div>
                <h4 className="text-2xl font-extrabold uppercase tracking-tight text-[#1e1d24] mb-6">
                  {pillar.title}
                </h4>

                <ul className="space-y-3">
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#575560]">
                      <Check className="w-4 h-4 text-[#22b8a5] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Target Audience ("Who is this for?") */}
        <div className="mb-16 sm:mb-24 rounded-3xl bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 border border-[#26252a]/10 p-6 sm:p-10 lg:p-12">
          <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ef146b] font-bold">
              Admissions & Eligibility
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1e1d24]">
              Who Is This Program For?
            </h3>
            <p className="text-xs sm:text-sm text-[#575560]">
              No prior design experience required. Basic English communication skills are required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TARGET_AUDIENCE.map((aud, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#26252a]/10 shadow-xs space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[#7615d9]">
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <h4 className="font-extrabold text-sm sm:text-base text-[#1e1d24] uppercase tracking-tight">
                    {aud.title}
                  </h4>
                </div>
                <p className="text-xs text-[#575560] leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Creed (Page 9 of Brochure) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-24 text-center max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#1e1d24] text-white space-y-4 shadow-xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#ffb51c] font-bold">
            Studio Philosophy & Creed
          </span>
          <blockquote className="text-lg sm:text-2xl font-extrabold uppercase tracking-tight leading-snug text-white">
            "We don't believe in shortcuts. We don't sell unrealistic promises. We believe in skills, practice, mentorship and consistency."
          </blockquote>
          <p className="text-xs sm:text-sm text-[#22b8a5] font-mono uppercase tracking-wider font-semibold">
            ✦ Because a certificate alone doesn't build a career. Capability does. ✦
          </p>
        </motion.div>

        {/* Comparison Matrix: Traditional vs Sanfollx Academy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-[#26252a]/10 bg-white p-5 sm:p-10 lg:p-12 shadow-xl overflow-hidden"
        >
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#7615d9] font-bold">
              The Methodological Difference
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#1e1d24]">
              Traditional Courses vs Design Academy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Traditional column */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fafafc] border border-[#26252a]/10 space-y-3 sm:space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#74727d] font-bold">
                Generic Institutes
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#575560]">
                {[
                  "Theoretical tool lectures copying generic templates",
                  "Large batches with no individual 1-on-1 critique",
                  "Static PDF portfolios with fictional unverified prompts",
                  "Zero teaching on freelance pricing, proposals, or contracts",
                  "Disconnected from actual working design agencies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-[#ef146b] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Design Academy column */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50/70 via-white to-pink-50/70 border-2 border-[#7615d9] shadow-md space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#7615d9] font-bold">
                  Design Academy by Sanfollx
                </h4>
              </div>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#1e1d24] font-medium">
                {[
                  "Live commercial project briefs with real client constraints",
                  "Strict small mentor-led batches with direct art director feedback",
                  "WordPress, Elementor, Shopify e-commerce & Behance case studies",
                  "Complete agency business playbook: pitching, pricing & contracts",
                  "Direct pipeline to Sanfollx Initiatives client network"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#22b8a5] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Angled Skills Ribbon */}
      <div className="mt-12 sm:mt-20 -rotate-1 bg-[#1e1d24] text-white py-4 sm:py-6 overflow-hidden select-none border-y border-[#26252a]/20 shadow-md">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-12 font-extrabold text-lg sm:text-2xl uppercase tracking-tight pr-6 sm:pr-12">
              <span>Photoshop</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#ffb51c] px-2 py-0.5 rounded bg-white/10">TOOL</span>
              <span>Illustrator</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#22b8a5] px-2 py-0.5 rounded bg-white/10">TOOL</span>
              <span className="text-gradient-warm font-extrabold">Brand Identity</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#ef146b] px-2 py-0.5 rounded bg-white/10">SKILL</span>
              <span>WordPress & Elementor</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#3e6fd8] px-2 py-0.5 rounded bg-white/10">TOOL</span>
              <span>WooCommerce & Shopify</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#7615d9] px-2 py-0.5 rounded bg-white/10">E-COMMERCE</span>
              <span>AI Integration</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#ffb51c] px-2 py-0.5 rounded bg-white/10">MODERN AI</span>
              <span className="text-gradient-brand font-extrabold">Freelancing & Business</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#22b8a5] px-2 py-0.5 rounded bg-white/10">ENTREPRENEURSHIP</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
