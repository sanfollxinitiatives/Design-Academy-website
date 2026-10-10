import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, ArrowUp, Sparkles } from 'lucide-react';

interface QuickActionDockProps {
  onApplyClick: () => void;
}

export default function QuickActionDock({ onApplyClick }: QuickActionDockProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#26252a]/15 text-[#1e1d24] hover:bg-[#1e1d24] hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-[#26252a]/15 shadow-2xl shadow-purple-950/10">
        <a
          href="https://wa.me/919846474143"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#22b8a5] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
          title="WhatsApp Direct Chat"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        <a
          href="tel:+919846474143"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fafafc] text-[#1e1d24] border border-[#26252a]/10 flex items-center justify-center hover:bg-[#7615d9] hover:text-white hover:border-[#7615d9] transition-colors shadow-xs hidden sm:flex"
          title="Call Now"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          onClick={onApplyClick}
          className="px-3.5 sm:px-4 py-2 rounded-full bg-gradient-brand text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-md shadow-purple-500/20 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer min-h-[36px]"
        >
          <Sparkles className="w-3 h-3 text-[#ffb51c]" />
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
}
