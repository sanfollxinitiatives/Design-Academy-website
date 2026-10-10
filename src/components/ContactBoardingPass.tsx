import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, PhoneCall, MapPin } from 'lucide-react';
import Logo from './Logo';

interface ContactBoardingPassProps {
  onApplyClick: () => void;
}

export default function ContactBoardingPass({ onApplyClick }: ContactBoardingPassProps) {
  const [passengerName, setPassengerName] = useState('Future Designer');

  return (
    <section id="contact" className="py-16 sm:py-32 bg-[#fafafc] relative overflow-hidden border-t border-[#26252a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Boarding Pass Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-3xl p-5 sm:p-12 lg:p-14 border border-[#26252a]/12 shadow-2xl shadow-purple-950/5 overflow-hidden"
        >
          {/* Top Chromatic Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7615d9] via-[#3e6fd8] via-[#22b8a5] via-[#ef146b] to-[#ffb51c]" />

          {/* Boarding Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#74727d] uppercase tracking-wider sm:tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#ef146b] animate-ping" />
                Boarding Pass · Your Creative Career
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#1e1d24] leading-tight">
                Let's Design <br className="hidden sm:inline" />
                <span className="text-gradient-warm">Your Future.</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onApplyClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand hover:brightness-110 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
              >
                <span>Apply for 2026 Batch</span>
              </button>

              <a
                href="https://wa.me/+911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1e1d24] hover:bg-[#22b8a5] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md hover:-translate-y-0.5 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#22b8a5] group-hover:text-white" />
                <span>Message on WhatsApp</span>
              </a>

              <a
                href="tel:+911234567890"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#26252a]/15 hover:border-[#1e1d24] hover:bg-[#fafafc] text-[#1e1d24] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-xs min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4 text-[#7615d9]" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Perforation Line with Circle Cutouts */}
          <div className="relative my-6 sm:my-8 border-t-2 border-dashed border-[#26252a]/12 -mx-5 sm:-mx-12 lg:-mx-14">
            <div className="absolute -left-3 -top-3 w-6 h-6 bg-[#fafafc] rounded-full border-r border-[#26252a]/12 hidden sm:block" />
            <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#fafafc] rounded-full border-l border-[#26252a]/12 hidden sm:block" />
          </div>

          {/* Boarding Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 py-2 sm:py-4">
            <div className="space-y-1.5 p-3.5 sm:p-4 rounded-2xl bg-[#fafafc] border border-[#26252a]/8">
              <span className="font-mono text-[10px] text-[#74727d] uppercase tracking-wider font-semibold block">
                Passenger Name
              </span>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full font-mono text-sm font-bold text-[#1e1d24] bg-transparent border-b border-transparent focus:border-[#7615d9] focus:outline-none transition-colors"
                placeholder="Enter Your Name"
              />
            </div>

            <div className="space-y-1.5 p-3.5 sm:p-4 rounded-2xl bg-[#fafafc] border border-[#26252a]/8">
              <span className="font-mono text-[10px] text-[#74727d] uppercase tracking-wider font-semibold block">
                Destination
              </span>
              <span className="font-mono text-sm font-bold text-[#7615d9] block">
                Design Studio Career
              </span>
            </div>

            <div className="space-y-1.5 p-3.5 sm:p-4 rounded-2xl bg-[#fafafc] border border-[#26252a]/8">
              <span className="font-mono text-[10px] text-[#74727d] uppercase tracking-wider font-semibold block">
                Studio Gate
              </span>
              <span className="font-mono text-sm font-bold text-[#1e1d24] block">
                Pattambi, Kerala
              </span>
            </div>

            <div className="space-y-1.5 p-3.5 sm:p-4 rounded-2xl bg-[#fafafc] border border-[#26252a]/8">
              <span className="font-mono text-[10px] text-[#74727d] uppercase tracking-wider font-semibold block">
                Inquiries & Seat
              </span>
              <a
                href="mailto:designacademybysanfollx@gmail.com"
                className="font-mono text-xs sm:text-sm font-bold text-[#1e1d24] hover:text-[#7615d9] transition-colors block truncate"
              >
                designacademybysanfollx@gmail.com
              </a>
            </div>
          </div>

          {/* Address & Socials */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#26252a]/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#575560] text-center md:text-left">
              <MapPin className="w-4 h-4 text-[#ef146b] flex-shrink-0" />
              <span>BM Arcade, Irumbakassery P.O, Thirumittacode, Pattambi, Kerala 679532</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-wider font-medium">
              <a href="https://www.instagram.com/sanfollx.initiatives/" target="_blank" rel="noopener noreferrer" className="text-[#575560] hover:text-[#ef146b] transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/sanfollxinitiatives/" target="_blank" rel="noopener noreferrer" className="text-[#575560] hover:text-[#3e6fd8] transition-colors">LinkedIn</a>
              <a href="https://www.facebook.com/sanfollx.initiatives" target="_blank" rel="noopener noreferrer" className="text-[#575560] hover:text-[#7615d9] transition-colors">Facebook</a>
              <a href="https://in.pinterest.com/Sanfollxinitiatives/" target="_blank" rel="noopener noreferrer" className="text-[#575560] hover:text-[#ffb51c] transition-colors">Pinterest</a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#26252a]/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#74727d] text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <Logo className="h-6 w-auto" showSubtitle={false} />
            <span>© 2026 Design Academy by Sanfollx Initiatives. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Pattambi, Palakkad, Kerala</span>
            <span>·</span>
            <span>+91 1234567890</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
