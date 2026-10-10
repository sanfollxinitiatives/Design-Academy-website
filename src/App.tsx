import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ProgramsSection from './components/ProgramsSection';
import WhyUsSection from './components/WhyUsSection';
import InteractiveFAQ from './components/InteractiveFAQ';
import ContactBoardingPass from './components/ContactBoardingPass';
import ApplyModal from './components/ApplyModal';
import QuickActionDock from './components/QuickActionDock';
import { ProgramTrack } from './types';
import { PROGRAMS } from './data/academyData';

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<ProgramTrack | null>(null);

  // Global scroll progress indicator bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenApply = (track?: ProgramTrack) => {
    if (track) {
      setSelectedTrack(track);
    } else {
      setSelectedTrack(PROGRAMS[1]); // Default to Web Design
    }
    setIsApplyModalOpen(true);
  };

  const handleSelectTrack = (trackId: string) => {
    const found = PROGRAMS.find((p) => p.id === trackId);
    if (found) {
      setSelectedTrack(found);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-[#1e1d24] font-sans selection:bg-[#7615d9] selection:text-white">
      {/* Scroll Progress Bar at the Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7615d9] via-[#ef146b] to-[#ffb51c] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Navigation Bar with Official Logo */}
      <Navigation onApplyClick={() => handleOpenApply()} />

      {/* Hero Section */}
      <HeroSection onApplyClick={() => handleOpenApply()} />

      {/* Intro Philosophy & Quick Links */}
      <IntroSection onSelectTrack={handleSelectTrack} />

      {/* Academic Programs */}
      <ProgramsSection onApplyTrack={(track) => handleOpenApply(track)} />

      {/* Why Design Academy & Value Matrix */}
      <WhyUsSection />

      {/* FAQ Accordion */}
      <InteractiveFAQ />

      {/* Contact & Boarding Pass Section */}
      <ContactBoardingPass onApplyClick={() => handleOpenApply()} />

      {/* Quick Action Floating Dock */}
      <QuickActionDock onApplyClick={() => handleOpenApply()} />

      {/* Admission Reservation Modal */}
      {isApplyModalOpen && (
        <ApplyModal
          initialTrack={selectedTrack}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedTrack(null);
          }}
        />
      )}
    </div>
  );
}

