import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import hayImage from '../assets/hay.png';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // High-Precision Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  // Parallax Values
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-[#020617]"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Animated Grid Mesh */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      {/* BENJIMUN Background Text - Glitchy/Split Style */}
      <div className="absolute inset-0 flex items-center justify-center z-0 select-none overflow-hidden">
        <motion.div
           initial={{ opacity: 0, scale: 0.5, letterSpacing: "1em" }}
           animate={{ opacity: 0.1, scale: 1.1, letterSpacing: "0.2em" }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="syncopate text-[22vw] font-black leading-none flex"
        >
          {/* Layered Text for Pseudo-3D Depth */}
          <span className="relative">
            BENJIMUN
            <span className="absolute left-1 top-1 text-accent opacity-30">BENJIMUN</span>
          </span>
        </motion.div>
      </div>

      {/* The Central Persona with Background Removal Filter */}
      <motion.div 
        style={{ rotateX, rotateY, z: 100 }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center p-4 transform-gpu"
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Intense Glow Aura */}
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-[120px] mix-blend-screen scale-110 group-hover:bg-accent/30 transition-all duration-700" />
          
          {/* The Image with CSS Filter Logic to 'Remove' White Background */}
          {/* Using multiply blend mode on a white background image effectively removes the white if the parent is dark */}
          {/* Better yet: We use a mask if the background is predictable */}
          <img 
            src={hayImage} 
            alt="Mascot" 
            className="relative w-full h-auto max-h-[75vh] object-contain transition-transform duration-500 hover:scale-105"
            style={{ 
              filter: 'contrast(1.1) brightness(1.2) drop-shadow(0 0 30px rgba(245,158,11,0.3))',
              mixBlendMode: 'plus-lighter' // This works well on dark backgrounds to merge white/bright areas
            }}
          />
          
          {/* SVG Filter Definition for advanced removal (Chromakey-like) */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="remove-white">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 1 0" />
              </filter>
            </defs>
          </svg>
        </motion.div>

        {/* Content Reveal Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-4 space-y-6 max-w-3xl"
        >
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-accent/40" />
             <span className="text-accent text-[10px] uppercase font-black tracking-[0.5em] syncopate">Barquisimeto • Lara</span>
             <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
            Bloque Estratégico de <span className="text-accent underline decoration-accent/20 underline-offset-8">Negociación Juvenil</span>
          </h1>
          
          <p className="text-text-muted text-sm md:text-base font-medium uppercase tracking-[0.1em] opacity-80 max-w-xl mx-auto">
            Impulso al Modelo de las Naciones Unidas. <br/>
            "Un solo mundo, un solo latido"
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <button className="glow-btn">Explorar</button>
            <button className="px-10 py-5 bg-white/5 border border-white/5 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all syncopate">
              Contactar
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-0 right-0 p-12 overflow-hidden pointer-events-none opacity-20">
         <span className="text-[200px] font-black text-white/5 syncopate leading-none">MUN</span>
      </div>
    </section>
  );
}
