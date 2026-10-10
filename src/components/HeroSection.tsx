import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2, MapPin, Calendar, Users, Award } from 'lucide-react';
import Logo from './Logo';

interface HeroSectionProps {
  onApplyClick: () => void;
}

export default function HeroSection({ onApplyClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-36 pb-10 sm:pb-12 overflow-hidden bg-[#fafafc]">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 hero-grid-pattern opacity-60 pointer-events-none" />

      {/* Soft Ambient Light Glow Accents */}
      <div className="absolute top-1/4 left-5 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Eyebrow Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-[#26252a]/10 shadow-xs">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm bg-gradient-to-tr from-[#ef146b] via-[#ff6a38] to-[#ffb51c] rotate-45 shadow-xs" />
            <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#7615d9] font-bold">
              Sanfollx Initiatives · Pattambi, Kerala
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#575560] bg-white border border-[#26252a]/10 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#ffb51c]" />
              <span>Admissions 2026</span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#74727d] font-bold hidden sm:inline-block">
              Est. 2019
            </span>
          </div>
        </motion.div>

        {/* Hero Grid with Giant Typography & Admission Pass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Headline */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, staggerChildren: 0.12 }}
              className="font-extrabold text-[44px] xs:text-[54px] sm:text-[80px] md:text-[98px] lg:text-[114px] leading-[0.92] sm:leading-[0.9] tracking-[-0.04em] uppercase text-[#1e1d24]"
            >
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Design
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent stroke-text"
                style={{
                  WebkitTextStroke: '2px #1e1d24',
                  color: 'transparent'
                }}
              >
                Your
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient-warm"
              >
                Future.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl text-sm sm:text-lg text-[#575560] leading-relaxed font-normal pt-1 sm:pt-2"
            >
              A hands-on, studio-style design academy in <strong className="text-[#1e1d24] font-bold">Pattambi, Kerala</strong> where you master graphic design, branding systems, and interactive UI/UX the way elite commercial agencies actually build.
            </motion.p>
          </div>

          {/* Admission Pass Card (Clean Light Styling) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-7 border border-[#26252a]/12 shadow-xl shadow-purple-950/5 relative overflow-hidden"
            >
              {/* Top Chromatic Gradient Stripe */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-brand" />

              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-[#26252a]/8 pb-3.5 sm:pb-4 mb-4 sm:mb-5">
                <div className="flex items-center gap-2.5">
                  <Logo className="h-7 sm:h-8 w-auto" showSubtitle={false} />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#7615d9]/10 text-[#7615d9] font-mono text-[10px] font-bold uppercase tracking-wider">
                  Official Pass
                </span>
              </div>

              {/* Pass Details Grid */}
              <div className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#fafafc] border border-[#26252a]/6">
                    <div className="flex items-center gap-1.5 text-[#74727d] font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1">
                      <MapPin className="w-3 h-3 text-[#ef146b]" />
                      Location
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-[#1e1d24] block">
                      Pattambi, Kerala
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#fafafc] border border-[#26252a]/6">
                    <div className="flex items-center gap-1.5 text-[#74727d] font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1">
                      <Calendar className="w-3 h-3 text-[#7615d9]" />
                      Duration
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-[#1e1d24] block">
                      3–6 Months
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-[#7615d9]/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7615d9] font-bold flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Class Ratio
                    </span>
                  </div>
                  <p className="text-xs text-[#575560] leading-snug">
                    Direct art director critique & commercial client briefs on every sprint.
                  </p>
                </div>

                {/* Checklist Badges */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1 font-mono text-[10.5px] sm:text-[11px] text-[#575560]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22b8a5] shrink-0" />
                    <span>Real Client Briefs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22b8a5] shrink-0" />
                    <span>Portfolio Mastery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22b8a5] shrink-0" />
                    <span>Freelance Strategy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22b8a5] shrink-0" />
                    <span>Internship Support</span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <button
                  onClick={onApplyClick}
                  className="w-full py-3.5 rounded-2xl bg-[#1e1d24] hover:bg-gradient-brand text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-2 mt-2 min-h-[44px] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#ffb51c]" />
                  <span>Reserve Your Seat Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subtitle and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-[#26252a]/10"
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5">
            <a
              href="#programs"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1e1d24] hover:bg-gradient-brand text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md hover:shadow-purple-500/25 hover:-translate-y-0.5 group min-h-[44px]"
            >
              <span>See Programs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://wa.me/919846474143"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#26252a]/15 bg-white hover:bg-[#fafafc] hover:border-[#22b8a5] hover:text-[#22b8a5] text-[#1e1d24] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-xs min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-[#22b8a5]" />
              <span>WhatsApp Inquiries</span>
            </a>

            <a
              href="#why-us"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#26252a]/15 bg-white hover:bg-[#fafafc] text-[#575560] hover:text-[#1e1d24] font-mono text-xs uppercase tracking-wider font-semibold transition-all min-h-[44px]"
            >
              <Award className="w-4 h-4 text-[#7615d9]" />
              <span>Why Design Academy</span>
            </a>
          </div>

          <div className="font-mono text-xs text-[#74727d] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22b8a5] animate-pulse" />
            <span>Next Studio Batch · Applications Open</span>
          </div>
        </motion.div>
      </div>

      {/* Infinite Animated Marquee Ribbon (Clean Light Styling) */}
      <div className="mt-16 border-y border-[#26252a]/10 bg-white py-4 overflow-hidden select-none shadow-xs">
        <div className="flex whitespace-nowrap gap-8 animate-[marquee_28s_linear_infinite]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 font-mono text-xs sm:text-sm uppercase tracking-widest text-[#575560] font-semibold">
              <span className="text-[#1e1d24] font-bold">Professional Graphic Design</span>
              <span className="text-[#ef146b]">✦</span>
              <span className="text-gradient-warm font-extrabold">Brand Strategy & Identity</span>
              <span className="text-[#7615d9]">✦</span>
              <span className="text-[#1e1d24] font-bold">Website Design</span>
              <span className="text-[#22b8a5]">✦</span>
              <span>WordPress, Elementor & Shopify</span>
              <span className="text-[#ffb51c]">✦</span>
              <span className="text-gradient-brand font-extrabold">WooCommerce E-Commerce</span>
              <span className="text-[#3e6fd8]">✦</span>
              <span>AI Integration & Workflows</span>
              <span className="text-[#ef146b]">✦</span>
              <span>Agency Sprints & Mentorship</span>
              <span className="text-[#7615d9]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
