import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Ticket3DHoverProps {
  onApplyClick?: () => void;
}

export default function Ticket3DHover({ onApplyClick }: Ticket3DHoverProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(7);
  const [rotateY, setRotateY] = useState(-5);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28
    });
  };

  const handleMouseLeave = () => {
    setRotateX(7);
    setRotateY(-5);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onApplyClick}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      className="relative w-56 sm:w-60 bg-[#0e0e16]/95 rounded-2xl p-5 border border-white/15 shadow-[0_25px_60px_-18px_rgba(118,21,217,0.4)] cursor-pointer transition-transform duration-150 ease-out select-none group"
    >
      {/* Chromatic top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7615d9] via-[#ef146b] to-[#ffb51c] rounded-t-2xl" />

      {/* Holographic dynamic glare overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.2) 0%, transparent 65%)`,
          opacity: glarePos.opacity
        }}
      />

      {/* Ticket Top Row */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/50 mb-3">
        <span className="flex items-center gap-1.5 font-bold text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef146b] animate-ping" />
          Admit One
        </span>
        <span className="text-[#9d4edd] font-bold">2026 Batch</span>
      </div>

      {/* Ticket Main Heading */}
      <div className="space-y-0.5 my-2">
        <div className="font-extrabold text-2xl uppercase tracking-tight text-white leading-none group-hover:text-[#9d4edd] transition-colors">
          Admission
        </div>
        <div className="font-extrabold text-2xl uppercase tracking-tight text-gradient-warm leading-none">
          Open Now
        </div>
      </div>

      {/* Perforation Line */}
      <div className="relative my-3.5 -mx-5 border-t border-dashed border-white/20">
        <div className="absolute -left-2.5 -top-2 w-4 h-4 bg-[#050505] rounded-full border-r border-white/15" />
        <div className="absolute -right-2.5 -top-2 w-4 h-4 bg-[#050505] rounded-full border-l border-white/15" />
      </div>

      {/* Barcode & Meta */}
      <div className="flex items-end justify-between pt-1">
        <div className="space-y-1">
          <span className="block font-mono text-[9.5px] uppercase tracking-widest text-white/50">
            Pattambi · Kerala
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#22b8a5] font-semibold">
            <Sparkles className="w-3 h-3" />
            Limited 12 Seats
          </span>
        </div>

        {/* Stylized Barcode Graphic */}
        <div className="flex gap-[2.5px] h-6 items-end">
          <span className="w-[3px] h-full bg-white/80" />
          <span className="w-[1.5px] h-[60%] bg-[#7615d9]" />
          <span className="w-[4px] h-[90%] bg-white/80" />
          <span className="w-[2px] h-[40%] bg-[#ef146b]" />
          <span className="w-[3px] h-[80%] bg-white/80" />
          <span className="w-[1.5px] h-full bg-[#ffb51c]" />
          <span className="w-[3.5px] h-[55%] bg-white/80" />
          <span className="w-[2px] h-[95%] bg-[#22b8a5]" />
          <span className="w-[3px] h-[70%] bg-white/80" />
        </div>
      </div>

      {/* Hover action prompt */}
      <div className="mt-3.5 pt-2 border-t border-white/10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9d4edd] font-bold group-hover:underline">
          Tap to Reserve Seat →
        </span>
      </div>
    </motion.div>
  );
}
