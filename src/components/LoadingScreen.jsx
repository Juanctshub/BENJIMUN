import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Inline UN emblem SVG (simplified olive wreath + globe)
const UNLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
    <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
    {/* Globe grid lines */}
    <ellipse cx="100" cy="100" rx="40" ry="55" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <ellipse cx="100" cy="100" rx="20" ry="55" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="100" y1="45" x2="100" y2="155" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <ellipse cx="100" cy="80" rx="40" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    <ellipse cx="100" cy="100" rx="40" ry="10" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    <ellipse cx="100" cy="120" rx="40" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    {/* Olive branches */}
    <path d="M30 150 C40 130, 45 110, 50 90 C52 80, 48 70, 45 60 C42 50, 38 42, 35 35" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M170 150 C160 130, 155 110, 150 90 C148 80, 152 70, 155 60 C158 50, 162 42, 165 35" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* Leaves left */}
    <ellipse cx="38" cy="130" rx="8" ry="3" transform="rotate(-50 38 130)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <ellipse cx="42" cy="110" rx="8" ry="3" transform="rotate(-40 42 110)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <ellipse cx="48" cy="90" rx="8" ry="3" transform="rotate(-30 48 90)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <ellipse cx="47" cy="72" rx="7" ry="3" transform="rotate(-20 47 72)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    {/* Leaves right */}
    <ellipse cx="162" cy="130" rx="8" ry="3" transform="rotate(50 162 130)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <ellipse cx="158" cy="110" rx="8" ry="3" transform="rotate(40 158 110)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <ellipse cx="152" cy="90" rx="8" ry="3" transform="rotate(30 152 90)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <ellipse cx="153" cy="72" rx="7" ry="3" transform="rotate(20 153 72)" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
  </svg>
);

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + Math.random() * 2.5 + 0.8;
      });
    }, 35);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* UN Logo spinning slowly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            <UNLogo className="w-28 h-28 md:w-36 md:h-36 text-accent" />
          </motion.div>
          {/* Glow behind logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-accent/10 blur-[40px]" />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-3xl md:text-4xl font-bold tracking-[0.15em] text-text-main mb-2"
        >
          BENJIMUN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] tracking-[0.5em] uppercase text-text-muted font-semibold mb-10"
        >
          Model United Nations
        </motion.p>

        {/* Progress bar */}
        <div className="w-40">
          <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-[9px] text-accent/50 font-bold text-center mt-3 tabular-nums tracking-widest">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
