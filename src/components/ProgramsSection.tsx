import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Clock, MapPin, Users, X } from 'lucide-react';
import { PROGRAMS } from '../data/academyData';
import { ProgramTrack } from '../types';

interface ProgramsSectionProps {
  onApplyTrack: (track: ProgramTrack) => void;
}

export default function ProgramsSection({ onApplyTrack }: ProgramsSectionProps) {
  const [selectedCurriculumTrack, setSelectedCurriculumTrack] = useState<ProgramTrack | null>(null);

  return (
    <section id="programs" className="py-16 sm:py-32 bg-[#fafafc] relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7615d9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7615d9]" />
              Academic Tracks · In-Person Studio
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#1e1d24] leading-tight">
              Pick Your Track.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-base text-[#575560] leading-relaxed">
            Limited seats per batch to guarantee individualized attention. All programs are held in-person at our studio in Pattambi, Kerala.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PROGRAMS.map((program) => {
            const isFeatured = program.featured;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#fbf9ff] text-[#1e1d24] border-2 border-[#7615d9] shadow-xl shadow-purple-950/5'
                    : 'bg-white text-[#1e1d24] border border-[#26252a]/10 shadow-md hover:border-[#7615d9]/40 hover:shadow-xl'
                }`}
              >
                {/* Perforation Cutouts on Sides */}
                <div
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fafafc] border-r border-[#26252a]/10 hidden sm:block"
                />
                <div
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fafafc] border-l border-[#26252a]/10 hidden sm:block"
                />

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span className="uppercase tracking-wider sm:tracking-widest font-semibold text-[#74727d] text-[11px] sm:text-xs">
                      {program.tag}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] sm:text-xs ${
                      isFeatured ? 'bg-[#7615d9] text-white' : 'bg-[#7615d9]/10 text-[#7615d9] border border-[#7615d9]/20'
                    }`}>
                      {program.code}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight mb-2 leading-tight text-[#1e1d24]">
                    {program.title}
                  </h3>

                  <p className="text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed text-[#575560]">
                    {program.description}
                  </p>

                  {/* Perforation Divider */}
                  <div className="my-4 sm:my-5 border-t-2 border-dashed border-[#26252a]/10" />

                  {/* Key Specs Table */}
                  <div className="space-y-2.5 font-mono text-xs uppercase tracking-wider mb-6">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#74727d]">
                        <Clock className="w-3.5 h-3.5 text-[#7615d9]" /> Duration
                      </span>
                      <span className="font-bold text-[#1e1d24]">{program.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#74727d]">
                        <MapPin className="w-3.5 h-3.5 text-[#ef146b]" /> Mode
                      </span>
                      <span className="font-bold text-[#1e1d24]">Offline Studio</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#74727d]">
                        <Users className="w-3.5 h-3.5 text-[#3e6fd8]" /> Batch
                      </span>
                      <span className="font-bold text-[#1e1d24]">{program.batchSize}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="pt-4 border-t border-[#26252a]/10 space-y-2.5">
                  <button
                    onClick={() => onApplyTrack(program)}
                    className="w-full py-3.5 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-md bg-[#1e1d24] text-white hover:bg-gradient-brand shadow-black/10 min-h-[44px] cursor-pointer"
                  >
                    <span>Apply for {program.code}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedCurriculumTrack(program)}
                    className="w-full py-2.5 px-3 rounded-xl font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 text-[#575560] hover:text-[#1e1d24] hover:bg-[#26252a]/5 min-h-[38px] cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#7615d9]" />
                    <span>View Full Syllabus</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Modal (White Theme) */}
      <AnimatePresence>
        {selectedCurriculumTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedCurriculumTrack(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-[#1e1d24] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 border border-[#26252a]/15 shadow-2xl space-y-5 sm:space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[#26252a]/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-[#7615d9] font-bold uppercase tracking-widest">
                    {selectedCurriculumTrack.code} · {selectedCurriculumTrack.duration}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1e1d24]">
                    {selectedCurriculumTrack.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCurriculumTrack(null)}
                  className="p-2 rounded-full hover:bg-[#26252a]/10 text-[#1e1d24] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-[#575560] leading-relaxed">
                  {selectedCurriculumTrack.overview}
                </p>

                {/* Modules Roadmap */}
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1e1d24] block">
                    Curriculum Timeline & Sprints
                  </span>
                  {selectedCurriculumTrack.curriculum.map((module, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-[#fafafc] border border-[#26252a]/10 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 font-mono text-xs">
                        <span className="text-[#ef146b] font-bold">{module.weekRange}</span>
                        <span className="text-[#1e1d24] font-bold">{module.title}</span>
                      </div>
                      <p className="text-xs text-[#575560]">{module.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {module.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-[#26252a]/10 font-mono text-[10px] text-[#1e1d24] font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools Grid */}
                <div className="pt-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1e1d24] block mb-2">
                    Industry Tools Taught
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCurriculumTrack.tools.map((tool, tIdx) => (
                      <div key={tIdx} className="p-2.5 rounded-xl border border-[#26252a]/10 bg-[#fafafc] flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1e1d24]">{tool.name}</span>
                        <span className="font-mono text-[10px] text-[#74727d]">{tool.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#26252a]/10 flex gap-3">
                <button
                  onClick={() => {
                    const track = selectedCurriculumTrack;
                    setSelectedCurriculumTrack(null);
                    onApplyTrack(track);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-brand text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:brightness-105 min-h-[44px] cursor-pointer"
                >
                  Apply for this Track
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
