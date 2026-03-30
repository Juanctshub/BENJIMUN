import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import hayImage from '../assets/hay.png';
import bgVideo from '../assets/ya.mp4';

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
  const rotY = useTransform(sX, [-0.5, 0.5], ['-4deg', '4deg']);
  const rotX = useTransform(sY, [-0.5, 0.5], ['4deg', '-4deg']);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    mX.set((clientX / window.innerWidth) - 0.5);
    mY.set((clientY / window.innerHeight) - 0.5);
  };

  const textY = useTransform(scrollY, [0, 500], [0, -40]);
  const imgY = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
      style={{ perspective: '1200px' }}
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 blur-[2px] transition-opacity duration-1000"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary" />
      </div>

      {/* Main Composition Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center pt-20 px-6">
        
        {/* CENTER COMPOSITION: Title + Person */}
        <div className="relative w-full flex items-center justify-center h-[400px] md:h-[600px]">
          
          {/* Layer 1: BENJIMUN Massive Backdrop */}
          <motion.h1
            style={{ y: textY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-display font-black text-center leading-none select-none tracking-[-0.05em] pointer-events-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
              textShadow: '0 0 40px rgba(201,168,76,0.2)',
            }}
          >
            BENJIMUN
          </motion.h1>

          {/* Layer 2: 3D Person overlapping the text */}
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, y: imgY }}
            className="absolute inset-0 flex items-center justify-center transform-gpu z-20 pointer-events-none"
          >
            {/* Glow Aura */}
            <div className="absolute w-[40%] h-[70%] rounded-full bg-accent/15 blur-[120px] opacity-40 mix-blend-screen" />

            {processedImage ? (
              <motion.img
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                src={processedImage}
                alt="Representative"
                className="relative h-[65vh] md:h-[80vh] w-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
              </div>
            )}
          </motion.div>

          {/* Floating 'Representative' Badge - anchored to the person */}
          <motion.div
            style={{ y: imgY, x: 180 }}
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 180 }}
            transition={{ delay: 1.5 }}
            className="absolute hidden lg:flex glass px-5 py-2 rounded-full border-accent/20 z-30 flex-col"
          >
            <span className="text-accent text-[9px] font-black uppercase tracking-[0.4em]">Representative</span>
            <span className="text-white text-[11px] font-bold uppercase tracking-widest">Delegation Elite</span>
          </motion.div>
        </div>

        {/* BOTTOM CONTENT: Slogan & CTA - Adjusted to 'frame' better */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative z-30 text-center -mt-20 md:-mt-28 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl font-black tracking-[0.2em] uppercase text-white">
              "Un solo mundo, un solo latido"
            </h2>
            <div className="flex items-center justify-center gap-4 text-accent font-black text-[10px] md:text-[12px] tracking-[0.6em] uppercase">
               <span className="h-px w-10 bg-accent/30" />
               Barquisimeto • Lara
               <span className="h-px w-10 bg-accent/30" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center items-center pt-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-accent text-primary font-black text-xs tracking-[0.4em] uppercase rounded-sm hover:bg-white hover:shadow-[0_0_50px_rgba(201,168,76,0.3)] transition-all duration-500 shadow-2xl"
            >
              Explorar Elitismo
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border border-white/10 glass text-white font-black text-xs tracking-[0.4em] uppercase rounded-sm hover:bg-white/10 transition-all shadow-xl"
            >
              Contactar
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Modern page indicators/socials for the 2026 vibe */}
      <div className="absolute bottom-10 left-10 hidden lg:flex flex-col gap-4 text-[9px] font-black uppercase tracking-widest text-white/20">
        <span>Scroll To Navigate</span>
        <div className="h-px w-20 bg-white/10" />
      </div>
    </section>
  );
}
