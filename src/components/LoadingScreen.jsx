import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs">
        {/* Logo Letter */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center"
        >
          <span className="syncopate text-primary text-3xl font-bold">B</span>
        </motion.div>

        {/* Progress */}
        <div className="w-full">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-[10px] text-white/30 font-bold tracking-[0.3em] uppercase">
              Initializing
            </span>
            <span className="text-[10px] text-accent font-bold tabular-nums">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
