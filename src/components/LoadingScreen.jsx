import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const letters = 'BENJIMUN'.split('');

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0 = loading, 1 = reveal

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase(1);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + Math.random() * 2 + 0.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.07] blur-[120px]" />
      </div>

      {/* Animated Letters */}
      <div className="relative z-10 flex items-center justify-center mb-12">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{
              opacity: phase === 1 ? [1, 1, 0] : 1,
              y: phase === 1 ? [0, -10, -30] : 0,
              rotateX: 0,
              scale: phase === 1 ? [1, 1.1, 0.9] : 1,
            }}
            transition={{
              delay: phase === 0 ? i * 0.08 : i * 0.04,
              duration: phase === 0 ? 0.6 : 0.8,
              ease: 'easeOut',
            }}
            className="syncopate text-5xl md:text-7xl font-bold inline-block"
            style={{
              textShadow: progress > 50 ? `0 0 ${20 + progress * 0.3}px rgba(245,158,11,${0.2 + progress * 0.003})` : 'none',
              color: progress > 50 ? '#f59e0b' : '#f8fafc',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48">
        <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-[9px] text-white/20 font-bold tracking-[0.4em] uppercase">
            Loading
          </span>
          <span className="text-[9px] text-accent/60 font-bold tabular-nums">
            {Math.min(Math.round(progress), 100)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
