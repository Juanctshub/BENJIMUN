import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  const variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-6 touch-none"
    >
      <div className="w-full max-w-sm overflow-hidden mb-8">
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          className="text-white text-xs font-black uppercase text-center syncopate mb-4"
        >
          BENJIMUN
        </motion.h2>
        
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="absolute inset-0 bg-accent origin-left"
          />
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-white/40 tracking-widest font-black uppercase">Initializing Strategic Core</span>
          <span className="text-[10px] text-accent tracking-tighter font-black">{progress}%</span>
        </div>
      </div>

      {/* Glossy Visual Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />
    </motion.div>
  );
}
