import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import hayImage from '../assets/hay.png';

// Transparent Background Engine (Canvas)
function useRemoveWhiteBackground(src) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const brightness = (r + g + b) / 3;
        const saturation = Math.max(r, g, b) - Math.min(r, g, b);

        if (brightness > 245 && saturation < 20) {
          d[i + 3] = 0;
        } else if (brightness > 220 && saturation < 40) {
          const alpha = Math.max(0, ((255 - brightness) / 35) * 255);
          d[i + 3] = Math.min(d[i + 3], Math.round(alpha));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setResult(canvas.toDataURL('image/png'));
    };
  }, [src]);

  return result;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const processedImage = useRemoveWhiteBackground(hayImage);
  const { scrollY } = useScroll();

  // Subtle mouse 3D for depth
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { damping: 40, stiffness: 100 });
  const sY = useSpring(mY, { damping: 40, stiffness: 100 });
  const rotY = useTransform(sX, [-0.5, 0.5], ['-5deg', '5deg']);
  const rotX = useTransform(sY, [-0.5, 0.5], ['5deg', '-5deg']);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    mX.set((clientX / window.innerWidth) - 0.5);
    mY.set((clientY / window.innerHeight) - 0.5);
  };

  const textY = useTransform(scrollY, [0, 500], [0, -60]);
  const imgY = useTransform(scrollY, [0, 500], [0, 40]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-primary px-4 md:px-0"
      style={{ perspective: '1200px' }}
    >
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} 
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        {/* COMPACT COMPOSITION: Text behind Person */}
        <div className="relative w-full flex items-center justify-center min-h-[500px]">
          
          {/* Layer 1: BENJIMUN Massive Illuminated Text */}
          <motion.h1
            style={{ y: textY, opacity: opacityText }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-display font-black text-center leading-none select-none tracking-[-0.05em] pointer-events-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.05)',
              textShadow: '0 0 50px rgba(201,168,76,0.3)',
            }}
          >
            BENJIMUN
          </motion.h1>

          {/* Layer 2: Person floating ON TOP of the text */}
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, y: imgY }}
            className="absolute inset-0 flex items-center justify-center transform-gpu pointer-events-none z-20"
          >
            {/* Glow Aura behind him but in front of text */}
            <div className="absolute w-[40%] h-[60%] rounded-full bg-accent/20 blur-[100px] mix-blend-screen opacity-40" />

            {processedImage ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                src={processedImage}
                alt="Representative"
                className="relative h-[65vh] md:h-[75vh] w-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                <span className="text-[10px] font-bold text-accent/50 uppercase tracking-widest">Constructing 3D Model</span>
              </div>
            )}
          </motion.div>

          {/* Secondary Title Overlay for "Glow Fill" effect where he doesn't cover */}
          <motion.h1
            style={{ y: textY, opacity: useTransform(scrollY, [0, 500], [0.8, 0.1]) }}
            className="absolute inset-0 flex items-center justify-center font-display font-black text-center leading-none select-none tracking-[-0.05em] pointer-events-none z-10"
            style={{
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              color: 'white',
              mixBlendMode: 'overlay'
            }}
          >
            BENJIMUN
          </motion.h1>
        </div>

        {/* CTA & SUBTITLE - Compactly below image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative z-30 text-center -mt-16 md:-mt-24 space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-text-main">
              "Un solo mundo, un solo latido"
            </h2>
            <div className="flex items-center justify-center gap-3 text-accent font-black text-[11px] tracking-[0.6em] uppercase">
               <span className="h-px w-8 bg-accent/30" />
               Barquisimeto • Lara
               <span className="h-px w-8 bg-accent/30" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-accent text-primary font-black text-xs tracking-[0.4em] uppercase rounded-sm hover:bg-white hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] transition-all duration-500 shadow-xl"
            >
              Explorar Elitismo
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border border-white/10 glass text-white font-black text-xs tracking-[0.4em] uppercase rounded-sm hover:bg-white/5 hover:text-white transition-all"
            >
              Contactar
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden lg:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden lg:block" />
    </section>
  );
}
