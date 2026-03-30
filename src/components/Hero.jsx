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

const HUDElement = ({ label, value, className }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`flex flex-col gap-1 ${className}`}
  >
    <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">{label}</span>
    <span className="text-[13px] font-bold text-white uppercase tracking-widest">{value}</span>
    <div className="h-[1px] w-full bg-accent/20 mt-2" />
  </motion.div>
);

export default function Hero() {
  const sectionRef = useRef(null);
  const processedImage = useRemoveWhiteBackground(hayImage);
  const { scrollY } = useScroll();

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

  const textY = useTransform(scrollY, [0, 500], [0, -30]);
  const imgY = useTransform(scrollY, [0, 500], [0, 50]);

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
          className="w-full h-full object-cover opacity-30 blur-[4px]"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/60 to-primary" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-screen flex flex-col justify-between py-24">
        
        {/* TOP HUD ROW */}
        <div className="flex justify-between items-start">
           <HUDElement label="Location" value="Barquisimeto • Lara" />
           <HUDElement label="Role" value="Representative Elite" className="items-end text-right" />
        </div>

        {/* CENTER COMPOSITION: Title + Person */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Massive Backdrop Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="font-display font-black text-center leading-none tracking-[-0.05em]"
              style={{
                y: textY,
                fontSize: 'clamp(5rem, 18vw, 16rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                textShadow: '0 0 60px rgba(201,168,76,0.15)',
              }}
            >
              BENJIMUN
            </motion.h1>

            {/* 3D Person */}
            <motion.div
              style={{ rotateX: rotX, rotateY: rotY, y: imgY }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="absolute w-[35%] h-[60%] rounded-full bg-accent/15 blur-[120px] mix-blend-screen opacity-40 shrink-0" />

              {processedImage ? (
                <motion.img
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  src={processedImage}
                  alt="Representative"
                  className="relative h-[65vh] md:h-[85vh] w-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
                />
              ) : (
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              )}
            </motion.div>
          </div>
        </div>

        {/* BOTTOM HUD ROW - SLOGAN & BUTTONS */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-4 max-w-sm text-center md:text-left"
          >
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.5em]">Official Motto 2026</span>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight uppercase tracking-tighter">
              "Un solo mundo, <br/> un solo latido"
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <button className="px-10 py-5 bg-accent text-primary font-black text-xs tracking-[0.4em] uppercase hover:bg-white transition-all shadow-[0_20px_50px_rgba(201,168,76,0.2)]">
              Explorar Elitismo
            </button>
            <button className="px-10 py-5 glass border-white/10 text-white font-black text-xs tracking-[0.4em] uppercase hover:bg-white/10 transition-all">
              Contactar
            </button>
          </motion.div>
        </div>

      </div>

      {/* Decorative vertical scanner lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/5" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/5" />
    </section>
  );
}
