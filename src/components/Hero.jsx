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
        // Detect near-white pixels and feather edges
        const brightness = (r + g + b) / 3;
        const saturation = Math.max(r, g, b) - Math.min(r, g, b);
        
        if (brightness > 235 && saturation < 30) {
          // Hard white — fully transparent
          d[i + 3] = 0;
        } else if (brightness > 210 && saturation < 50) {
          // Edge feather zone — semi-transparent for smooth edges
          const alpha = Math.max(0, ((255 - brightness) / 45) * 255);
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

  // Subtle 3D mouse tracking
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { damping: 30, stiffness: 100 });
  const sY = useSpring(mY, { damping: 30, stiffness: 100 });
  const rotY = useTransform(sX, [-0.5, 0.5], ["-4deg", "4deg"]);
  const rotX = useTransform(sY, [-0.5, 0.5], ["4deg", "-4deg"]);

  const handleMouse = (e) => {
    mX.set((e.clientX / window.innerWidth) - 0.5);
    mY.set((e.clientY / window.innerHeight) - 0.5);
  };

  // Parallax
  const bgTextY = useTransform(scrollY, [0, 600], [0, -80]);
  const personY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Grid floor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,158,11,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
          }}
        />
      </div>

      {/* "BENJIMUN" massive background text */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="syncopate font-bold text-white/[0.06] leading-none whitespace-nowrap"
          style={{ fontSize: 'min(22vw, 300px)' }}
        >
          BENJIMUN
        </motion.span>
      </motion.div>

      {/* Person + Content wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center pt-24 pb-16">
        {/* 3D Person */}
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, y: personY }}
          className="relative transform-gpu mb-8"
        >
          {/* Glow behind person */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] rounded-full bg-accent/15 blur-[100px]" />
          </div>

          {processedImage ? (
            <motion.img
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              src={processedImage}
              alt="BENJIMUN Mascot"
              className="relative max-h-[55vh] w-auto object-contain drop-shadow-[0_20px_60px_rgba(245,158,11,0.15)]"
            />
          ) : (
            <div className="h-[55vh] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center max-w-3xl"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-accent/50" />
            <span className="text-accent text-[11px] font-extrabold tracking-[0.5em] uppercase">
              Barquisimeto • Lara
            </span>
            <div className="h-px w-10 bg-accent/50" />
          </div>

          {/* Main heading */}
          <h1 className="syncopate text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            Bloque Estratégico<br />
            de{' '}
            <span className="text-accent">Negociación</span>
          </h1>

          {/* Subtitle */}
          <p className="text-text-muted text-lg md:text-xl font-semibold mb-4 max-w-xl mx-auto leading-relaxed">
            Impulso al Modelo de las Naciones Unidas
          </p>
          <p className="text-white/40 text-sm tracking-[0.25em] uppercase font-bold mb-10">
            "Un solo mundo, un solo latido"
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-accent text-primary font-extrabold text-sm tracking-widest uppercase rounded-lg hover:bg-white hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer">
              Explorar
            </button>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/10 text-white/70 font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-white/5 hover:text-white transition-all duration-300 no-underline"
            >
              Contáctanos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
