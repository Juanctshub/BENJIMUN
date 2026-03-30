import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import hayImage from '../assets/hay.png';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Mouse-based 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event) => {
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Parallax effects
  const yOffset = useTransform(scrollY, [0, 500], [0, 150]);
  const textYOffset = useTransform(scrollY, [0, 500], [0, -80]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ perspective: "1000px" }}
    >
      {/* Background Typography */}
      <motion.div 
        style={{ y: textYOffset }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 0.15, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[20vw] font-black tracking-tighter text-white uppercase leading-none opacity-10"
        >
          BENJIMUN
        </motion.h1>
      </motion.div>

      {/* Main Persona Container */}
      <motion.div 
        style={{ scale, y: yOffset, rotateX, rotateY }}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center p-4 transform-gpu"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Animated Glow Behind Image */}
          <div className="absolute inset-0 bg-accent rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          
          <img 
            src={hayImage} 
            alt="Benjimun Mascot" 
            className="relative w-full h-auto max-h-[70vh] object-contain drop-shadow-[0_0_50px_rgba(245,158,11,0.2)]"
            style={{ 
              filter: 'contrast(1.1) brightness(1.1)',
              mixBlendMode: 'plus-lighter' // Suggestion: Use plus-lighter if it has a white back on dark theme, or just transparent
            }}
          />
        </motion.div>

        {/* Content Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 space-y-4"
        >
          <div className="inline-block px-4 py-1 glass rounded-full text-accent font-bold text-sm tracking-widest uppercase bg-accent/10 border-accent/20">
            📍 Barquisimeto, Lara
          </div>
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent drop-shadow-sm">
            Un solo mundo, un solo latido
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-lg md:text-xl font-medium">
            Bloque Estratégico de Negociación Juvenil e Impulso al Modelo de las Naciones Unidas
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <button className="btn-premium">Empezar Ahora</button>
            <button className="px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all">Saber Más</button>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent border border-accent/20 rounded-full blur-[150px] opacity-5 -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary border border-white/5 rounded-full blur-[150px] opacity-10 -z-10" />
    </section>
  );
}
