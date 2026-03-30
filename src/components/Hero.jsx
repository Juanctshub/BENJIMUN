import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import hayImage from '../assets/hay.png';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [processedImage, setProcessedImage] = useState(null);
  const { scrollY } = useScroll();
  
  // Real-time Mouse Tracking for Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  // 1. Transparent Background Engine (Canvas)
  useEffect(() => {
    const img = new Image();
    img.src = hayImage;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Cutout logic: anything near white becomes transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Alpha to 0
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL());
    };
  }, []);

  // Parallax & Motion Values
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const yOffset = useTransform(scrollY, [0, 800], [0, 200]);
  const textBgScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[140vh] flex flex-col items-center justify-start overflow-hidden pt-32"
      style={{ perspective: "1500px" }}
    >
      {/* 3D Grid Floor Effect */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:linear-gradient(to_top,#000,transparent)] opacity-10 pointer-events-none" />

      {/* Massive Background Title Behind Content */}
      <motion.div 
        style={{ scale: textBgScale, y: useTransform(scrollY, [0, 1000], [0, -100]) }}
        className="absolute top-1/3 inset-x-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0"
      >
        <span className="syncopate text-[28vw] font-black tracking-[-0.05em] leading-none whitespace-nowrap">
           BENJIMUN
        </span>
      </motion.div>

      {/* HERO CONTENT: RESTORATION OF SCALE */}
      <div className="relative z-20 w-full max-w-7xl px-8 flex flex-col items-center">
        
        {/* The Isolated Persona (Cutout) */}
        <motion.div 
          style={{ rotateX, rotateY, y: yOffset, z: 200 }}
          className="relative w-full max-w-5xl flex justify-center transform-gpu"
        >
          {processedImage ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="relative"
            >
               <div className="absolute inset-0 bg-accent/30 rounded-full blur-[150px] scale-110 opacity-40 animate-pulse" />
               <img 
                 src={processedImage} 
                 alt="Mascot" 
                 className="relative w-full h-auto max-h-[75vh] object-contain drop-shadow-[0_0_80px_rgba(245,158,11,0.2)]"
               />
            </motion.div>
          ) : (
            <div className="h-[60vh] flex items-center justify-center">
               <span className="syncopate text-xs tracking-widest animate-pulse opacity-50">Processing Asset...</span>
            </div>
          )}
        </motion.div>

        {/* Massive Hierarchical Text Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="relative z-30 text-center -mt-16 md:-mt-32 max-w-5xl"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
             <div className="h-[2px] w-16 bg-accent opacity-50" />
             <h2 className="hero-subtitle uppercase font-black text-accent tracking-[0.6em]">ESTRATEGIA • IMPULSO</h2>
             <div className="h-[2px] w-16 bg-accent opacity-50" />
          </div>

          <h1 className="hero-title font-black uppercase tracking-tighter mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
             Bloque Estratégico <br/>
             de <span className="text-accent underline decoration-white/10 underline-offset-8">Negociación</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-semibold text-text-muted uppercase tracking-widest leading-relaxed mb-12">
            "Un solo mundo, un solo latido" <br/>
            <span className="text-accent/60">Barquisimeto, Lara</span>
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
             <button className="glow-btn">Explorar Elitismo</button>
             <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-sm font-black text-xs tracking-[0.4em] uppercase hover:bg-white/15 transition-all">
                Contáctanos
             </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Meta-Elements */}
      <div className="absolute top-1/4 left-0 w-24 h-[1px] bg-white opacity-10" />
      <div className="absolute bottom-1/4 right-0 w-24 h-[1px] bg-white opacity-10" />
    </section>
  );
}
