import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/academyData';

export default function InteractiveFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="curriculum" className="py-16 sm:py-32 bg-white relative overflow-hidden border-t border-[#26252a]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 sm:space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7615d9]">
            <HelpCircle className="w-3.5 h-3.5" />
            Admissions & Student Guidance
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#1e1d24]">
            Frequently Asked Questions.
          </h2>
          <p className="text-xs sm:text-base text-[#575560] max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our batch structures, software requirements, and design studio career pathways.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#fbf9ff] border-[#7615d9]/40 shadow-md ring-1 ring-[#7615d9]/20'
                    : 'bg-[#fafafc] border-[#26252a]/10 hover:border-[#26252a]/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 select-none cursor-pointer min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-mono text-xs text-[#ef146b] font-bold">
                      0{idx + 1}
                    </span>
                    <span className="font-extrabold text-sm sm:text-lg text-[#1e1d24] uppercase tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-[#7615d9] text-white' : 'bg-[#1e1d24]/5 text-[#1e1d24]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-[#575560] leading-relaxed border-t border-[#26252a]/10 pt-3 sm:pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
