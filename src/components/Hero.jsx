import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import hayImage from '../assets/hay.png';
import bgVideo from '../assets/ya.mp4';

// Transparent Background Engine (Canvas) - Optimized for Performance
function useRemoveWhiteBackground(src) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      if (!active) return;
      
      const MAX_WIDTH = window.innerWidth < 768 ? 600 : 1000;
      let width = img.width;
      let height = img.height;
      if (width > MAX_WIDTH) {
         height = Math.round((MAX_WIDTH * height) / width);
         width = MAX_WIDTH;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
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
      setResult(canvas.toDataURL('image/png', 0.8));
    };
    return () => { active = false; };
  }, [src]);

  return result;
}

const HUDElement = ({ label, value, className, side = "left" }) => (
  <motion.div 
    initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.8 }}
    className={`flex flex-col gap-1 border-white/5 pb-2 ${className}`}
  >
    <span className="text-[9px] font-black text-accent uppercase tracking-[0.5em]">{label}</span>
    <span className="text-[14px] font-bold text-white uppercase tracking-[0.2em]">{value}</span>
    <div className={`h-[1px] w-12 bg-accent/40 mt-1 ${side === "right" ? "ml-auto" : ""}`} />
  </motion.div>
);

export default function Hero() {
  const sectionRef = useRef(null);
  const processedImage = useRemoveWhiteBackground(hayImage);
  const { scrollY } = useScroll();

  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { damping: 50, stiffness: 80 });
  const sY = useSpring(mY, { damping: 50, stiffness: 80 });
  
  const rotY = useTransform(sX, [-0.5, 0.5], ['-3deg', '3deg']);
  const rotX = useTransform(sY, [-0.5, 0.5], ['3deg', '-3deg']);

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
      className="relative h-screen flex items-center justify-center overflow-hidden bg-primary"
      style={{ perspective: '2000px' }}
    >
      {/* 1. LAYER: Background Video (Behind everything) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 md:opacity-60 blur-[2px] md:blur-[4px]" // Optimized performance for mobile
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/20 to-primary" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-between py-24">
        
        {/* HUD: Meta Info - Hidden on Mobile to maximize space */}
        <div className="hidden md:flex justify-between items-start z-10 pt-10 md:pt-0">
           <HUDElement label="Location" value="Barquisimeto • Lara" />
           <HUDElement label="Status" value="Representative Elite" side="right" className="items-end text-right hidden sm:flex" />
        </div>

        {/* 2 & 3. LAYERS: BENJIMUN Glow Text & Character */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            
            {/* 2. LAYER: BENJIMUN Illuminated (Behind character) */}
            <motion.div
              style={{ y: textY }}
              className="absolute inset-0 flex items-start pt-32 sm:pt-0 sm:items-center justify-center -z-10"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="font-display font-black text-center leading-none tracking-[-0.04em] select-none"
                style={{
                  fontSize: 'clamp(5rem, 20vw, 16rem)',
                  color: 'white',
                  // 100% Illuminated with horizontal/lateral blur
                  textShadow: `
                    0 0 20px rgba(255,255,255,1),
                    0 0 40px rgba(201,168,76,0.8),
                    -80px 0 100px rgba(201,168,76,0.5),
                    80px 0 100px rgba(201,168,76,0.5)
                  `,
                  filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))'
                }}
              >
                BENJIMUN
              </motion.h1>
              
              {/* Extra lateral light beams */}
              <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent blur-md mt-[10%]" />
            </motion.div>

            {/* 3. LAYER: 3D Character (On top of text) */}
            <motion.div
              style={{ rotateX: rotX, rotateY: rotY, y: imgY }}
              className="absolute inset-0 flex items-start sm:items-center justify-center pt-28 sm:pt-0 z-10"
            >
              {/* Backglow Aura */}
              <div className="absolute w-[80%] sm:w-[50%] h-[40%] sm:h-[60%] rounded-full bg-accent/20 blur-[80px] sm:blur-[130px] opacity-60 mix-blend-screen" />

              {processedImage ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                  src={processedImage}
                  alt="Representative"
                  className="relative h-[45vh] sm:h-[75vh] lg:h-[90vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] sm:drop-shadow-[0_45px_120px_rgba(0,0,0,0.9)]"
                />
              ) : (
                <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              )}
            </motion.div>
          </div>
        </div>

        {/* 4. LAYER: HUD BOTTOM (Slogan & Buttons) - AT THE FRONT */}
        <div className="flex flex-col md:flex-row justify-end md:justify-between items-center md:items-end gap-6 md:gap-16 relative z-50 pb-28 md:pb-10 w-full mt-auto">
          {/* Faded gradient overlay on mobile to make text pop against image */}
          <div className="absolute inset-x-[-2rem] bottom-[-2rem] h-[60vh] bg-gradient-to-t from-primary via-primary/80 to-transparent pointer-events-none md:hidden -z-10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
            className="space-y-2 md:space-y-5 w-full text-center md:text-left drop-shadow-2xl flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center gap-3">
               <div className="hidden md:block w-8 h-[1px] bg-accent/30" />
               <span className="text-[10px] md:text-[10px] font-black text-accent uppercase tracking-[0.4em] md:tracking-[0.6em] block px-1">Motto Oficial</span>
            </div>
            <div className="overflow-visible">
               <h2 className="text-[1.7rem] sm:text-3xl md:text-5xl font-black text-white leading-[1.1] uppercase tracking-[-0.03em] clash-display text-shadow-xl drop-shadow-lg">
                "Un solo mundo, <br className="hidden md:block"/>
                <span className="text-accent italic"> un solo latido"</span>
               </h2>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
            className="hidden md:flex flex-col sm:flex-row gap-3 md:gap-6 w-full md:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://www.instagram.com/benjimun_/', '_blank')}
              className="px-6 py-4 md:px-14 md:py-7 bg-accent text-primary font-black text-[12px] md:text-[13px] tracking-[0.4em] md:tracking-[0.5em] uppercase hover:bg-white transition-all shadow-xl md:shadow-[0_30px_70px_rgba(201,168,76,0.3)] backdrop-blur-xl relative group overflow-hidden border border-accent w-full sm:w-auto rounded-lg md:rounded-none"
            >
              <span className="relative z-10 font-bold">Visítanos!</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 md:px-14 md:py-7 glass border-white/10 text-white font-black text-[12px] md:text-[13px] tracking-[0.4em] md:tracking-[0.5em] uppercase hover:bg-white/10 backdrop-blur-xl transition-all shadow-2xl relative overflow-hidden w-full sm:w-auto rounded-lg md:rounded-none"
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 hover:opacity-100 transition-opacity" />
              <span className="relative z-10 font-bold">Contactar</span>
            </motion.button>
          </motion.div>
        </div>


      </div>

      {/* Decorative vertical scanner lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/5 -z-10" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/5 -z-10" />
    </section>
  );
}
