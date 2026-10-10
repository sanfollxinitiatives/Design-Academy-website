import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Box, Cpu } from 'lucide-react';
import Interactive3DSandbox from './3d/Interactive3DSandbox';

export default function Studio3DSection() {
  return (
    <section id="3d-studio" className="py-16 sm:py-32 bg-[#08080d] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/40 font-mono text-[11px] sm:text-xs text-[#9d4edd] font-bold uppercase tracking-wider sm:tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Design Curriculum</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Design for the <span className="text-gradient-brand">3D & Spatial Web.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Modern digital brands are no longer flat. At Design Academy, you will learn to craft 3D visual assets, packaging mockups, interactive WebGL primitives, and kinetic typography that stand out in international client portfolios.
            </p>

            <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              {[
                { title: "Real-time 3D Lighting & Materials", desc: "Metallic luster, chromatic refraction, glass shaders and studio lighting." },
                { title: "Spatial Web Prototyping", desc: "Integrating 3D interactive hero models into WordPress, Shopify and Three.js." },
                { title: "Commercial 3D Packaging Mockups", desc: "Presenting client brand identities with photo-real dimension and perspective." }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#10101a] border border-white/10 shadow-xs">
                  <div className="w-6 h-6 rounded-lg bg-[#7615d9]/20 text-[#9d4edd] flex items-center justify-center font-mono text-xs font-bold mt-0.5 border border-[#7615d9]/30 shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-white">{feature.title}</h4>
                    <p className="text-[11px] sm:text-xs text-white/60 leading-normal">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Sandbox */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <Interactive3DSandbox />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
