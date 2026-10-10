import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface NavigationProps {
  onApplyClick: () => void;
}

export default function Navigation({ onApplyClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Programs', href: '#programs' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#26252a]/10 py-2.5 sm:py-3 shadow-md'
            : 'bg-white/80 backdrop-blur-md border-b border-[#26252a]/5 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#top" className="flex items-center gap-2 sm:gap-3 group shrink-0" aria-label="Design Academy by Sanfollx">
            <Logo className="h-8 sm:h-11 w-auto transition-transform group-hover:scale-105" variant="light" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest text-[#575560] hover:text-[#1e1d24] font-semibold transition-colors relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#7615d9] via-[#ef146b] to-[#ffb51c] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* CTA Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Brochure Download Link */}
            <a
              href="https://drive.google.com/file/d/1ydLZ7vs4OQQcdGMRb_5tEGlfc94gwBEu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#26252a]/15 bg-white hover:bg-[#fafafc] hover:border-[#7615d9] text-[#1e1d24] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm min-h-[40px]"
              title="Download Course Brochure"
            >
              <span>Brochure</span>
              <Download className="w-3.5 h-3.5 text-[#7615d9]" />
            </a>

            {/* Apply Button */}
            <button
              onClick={onApplyClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1e1d24] text-white hover:bg-gradient-brand font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md hover:shadow-purple-500/25 hover:-translate-y-0.5 min-h-[38px] sm:min-h-[44px] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffb51c]" />
              <span>Apply</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#26252a]/15 bg-white text-[#1e1d24] hover:text-[#7615d9] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[58px] left-0 right-0 z-40 bg-white shadow-2xl px-5 sm:px-8 py-6 flex flex-col justify-between lg:hidden max-h-[calc(100vh-60px)] overflow-y-auto border-b border-[#26252a]/15 rounded-b-3xl"
            >
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-[#74727d] uppercase tracking-widest block mb-2 font-bold">
                  Menu
                </span>
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#1e1d24] hover:text-[#7615d9] py-2.5 border-b border-[#26252a]/10 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="pt-6 mt-4 border-t border-[#26252a]/10 space-y-3">
                <a
                  href="https://drive.google.com/file/d/1ydLZ7vs4OQQcdGMRb_5tEGlfc94gwBEu/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#26252a]/20 font-mono text-xs uppercase tracking-wider text-[#1e1d24] font-semibold min-h-[44px]"
                >
                  <Download className="w-4 h-4 text-[#7615d9]" />
                  <span>Download Course Brochure</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onApplyClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-brand text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg min-h-[48px] cursor-pointer"
                >
                  <span>Reserve Seat for 2026 Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
