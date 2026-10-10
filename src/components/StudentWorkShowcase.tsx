import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { STUDENT_WORKS } from '../data/academyData';
import { StudentWork } from '../types';

export default function StudentWorkShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedWork, setSelectedWork] = useState<StudentWork | null>(null);

  const categories = ['All', 'Branding', 'Website', 'UI/UX', 'Motion & 3D'];

  const filteredWorks =
    activeCategory === 'All'
      ? STUDENT_WORKS
      : STUDENT_WORKS.filter((w) => w.category === activeCategory);

  return (
    <section id="showcase" className="py-16 sm:py-32 bg-[#fafafc] relative overflow-hidden border-t border-[#26252a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#22b8a5] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Studio Output
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1e1d24] leading-tight">
              Student Work & Case Studies.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1 sm:p-1.5 rounded-2xl border border-[#26252a]/10 shadow-xs overflow-x-auto max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 min-h-[36px] cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1e1d24] text-white font-bold shadow-xs'
                    : 'text-[#575560] hover:text-[#1e1d24] hover:bg-[#fafafc]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedWork(work)}
                className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-[#26252a]/10 hover:border-[#7615d9]/40 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Header Mockup Card */}
                <div
                  className="h-40 sm:h-48 rounded-2xl p-4 sm:p-5 mb-4 sm:mb-5 flex flex-col justify-between relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${work.accentColor}18 0%, ${work.accentColor}06 100%)`,
                    border: `1px solid ${work.accentColor}35`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-white/90 shadow-xs border border-[#26252a]/10"
                      style={{ color: work.accentColor }}
                    >
                      {work.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#1e1d24] group-hover:text-white flex items-center justify-center text-[#1e1d24] transition-colors shadow-xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <div className="font-extrabold text-lg sm:text-xl uppercase tracking-tight text-[#1e1d24] line-clamp-1 mb-1">
                      {work.title}
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs text-[#74727d]">
                      By {work.studentName} · Design Academy Fellow
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-[#575560] leading-relaxed line-clamp-2">
                    {work.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {work.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-[#fafafc] border border-[#26252a]/10 font-mono text-[10px] text-[#575560]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal Preview */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-[#1e1d24] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 border border-[#26252a]/15 shadow-2xl space-y-4 sm:space-y-5"
            >
              <div className="flex items-start justify-between border-b border-[#26252a]/10 pb-4">
                <div>
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-widest"
                    style={{ color: selectedWork.accentColor }}
                  >
                    {selectedWork.category} Project
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#1e1d24]">
                    {selectedWork.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="p-2 rounded-full hover:bg-[#26252a]/10 text-[#1e1d24] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-[#575560] leading-relaxed">
                  {selectedWork.description}
                </p>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fafafc] border border-[#26252a]/10 space-y-1">
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#74727d] uppercase tracking-wider block">
                    Student Creator
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-[#1e1d24]">
                    {selectedWork.studentName}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#26252a]/10 flex gap-3">
                <button
                  onClick={() => setSelectedWork(null)}
                  className="w-full py-3 rounded-xl bg-[#1e1d24] text-white hover:bg-gradient-brand font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm min-h-[44px] cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
