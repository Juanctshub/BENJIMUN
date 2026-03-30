import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import hayImage from '../assets/hay.png';

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

        if (brightness > 230 && saturation < 35) {
          d[i + 3] = 0;
        } else if (brightness > 200 && saturation < 55) {
          const alpha = Math.max(0, ((255 - brightness) / 55) * 255);
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

  // Subtle mouse 3D
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { damping: 30, stiffness: 80 });
  const sY = useSpring(mY, { damping: 30, stiffness: 80 });
  const rotY = useTransform(sX, [-0.5, 0.5], ['-3deg', '3deg']);
  const rotX = useTransform(sY, [-0.5, 0.5], ['3deg', '-3deg']);

  const handleMouse = (e) => {
    mX.set((e.clientX / window.innerWidth) - 0.5);
    mY.set((e.clientY / window.innerHeight) - 0.5);
  };

  const textY = useTransform(scrollY, [0, 500], [0, -40]);
  const imgY = useTransform(scrollY, [0, 500], [0, 30]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,158,11,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,.2) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)',
          }}
        />
      </div>

      {/* Core Composition: Text behind, Person in front */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6">
        {/*
          LAYERED COMPOSITION:
          - Layer 1 (back): "BENJIMUN" text, massive, glowing
          - Layer 2 (front): Person image, overlapping the text
          - Layer 3 (bottom): Subtitle + CTA
        */}
        <div className="relative flex items-center justify-center">
          {/* Layer 1: BENJIMUN illuminated text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="syncopate font-bold text-center leading-none select-none whitespace-nowrap"
            style={{
              y: textY,
              fontSize: 'clamp(4rem, 14vw, 12rem)',
              textShadow: '0 0 80px rgba(245,158,11,0.25), 0 0 160px rgba(245,158,11,0.1)',
              color: 'rgba(245,158,11,0.9)',
              letterSpacing: '-0.03em',
            }}
          >
            BENJIMUN
          </motion.h1>

          {/* Layer 2: Person image ON TOP of the text */}
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, y: imgY }}
            className="absolute inset-0 flex items-center justify-center transform-gpu pointer-events-none"
          >
            {/* Glow aura */}
            <div className="absolute w-[60%] h-[80%] rounded-full bg-accent/10 blur-[80px]" />

            {processedImage ? (
              <motion.img
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                src={processedImage}
                alt="BENJIMUN Mascot"
                className="relative h-[clamp(280px,50vw,550px)] w-auto object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              />
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Layer 3: Subtitle + CTA below the composition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-8 relative z-20"
        >
          <p className="text-white/50 text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6">
            "Un solo mundo, un solo latido"
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent/40" />
            <span className="text-accent text-[10px] font-extrabold tracking-[0.5em] uppercase">
              📍 Barquisimeto, Lara
            </span>
            <div className="h-px w-8 bg-accent/40" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#meaning"
              className="px-8 py-4 bg-accent text-primary font-extrabold text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer no-underline"
            >
              Descubre más
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/10 text-white/60 font-bold text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-white/5 hover:text-white transition-all duration-300 no-underline"
            >
              Contáctanos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
