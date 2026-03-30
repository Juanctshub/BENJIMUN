import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, Award, Search, ArrowUpRight, Users } from 'lucide-react';


export default function Delegates() {
  return (
    <section id="delegados" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Header - Cinematic 2026 Style */}
        <div className="text-center space-y-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 text-accent text-[11px] font-black tracking-[0.6em] uppercase mb-4"
           >
             <Star size={14} fill="currentColor" /> Nuestra Élite
           </motion.div>
           <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] uppercase">
             DELEGADOS <br/>
             <span className="text-accent underline decoration-white/5 underline-offset-16 italic">TOP TIER</span>
           </h2>
        </div>

        {/* Action Button */}
        <div className="flex justify-center items-center py-10">
           <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 md:px-20 py-8 md:py-10 bg-accent text-primary font-black text-[12px] md:text-[15px] tracking-[0.5em] uppercase hover:bg-white transition-all shadow-[0_30px_70px_rgba(201,168,76,0.4)] backdrop-blur-xl relative group overflow-hidden border border-accent rounded-2xl md:rounded-3xl"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 font-bold flex items-center justify-center gap-4 whitespace-nowrap">
                 <Search size={24} className="animate-pulse" /> DESCUBRIR DELEGADO TOP
              </span>
            </motion.button>
        </div>

        {/* Top 1 Billboard - Spotlight Feature */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-[3rem] p-12 md:p-20 overflow-hidden border-accent/20 group cursor-default"
        >
           <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
              <Award size={400} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center md:text-left">
                <div className="space-y-4">
                   <div className="px-4 py-1.5 rounded-full bg-accent text-primary text-[10px] font-black tracking-widest uppercase inline-block">
                     DELEGADO ELITE 2026
                   </div>
                   <h3 className="font-display text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
                     Saber <br/>
                     <span className="text-accent italic">Prevalecer</span>
                   </h3>
                </div>
                <p className="text-text-muted text-lg font-medium leading-relaxed max-w-sm">
                  Reconocimiento especial a la trayectoria de excelencia diplomática en el circuito nacional.
                </p>
                <div className="pt-4 lg:pt-10">
                   <button className="flex items-center gap-4 text-accent text-xs font-black tracking-[0.4em] uppercase hover:gap-8 transition-all group-hover:text-white">
                      Ver Trayectoria Completa <ArrowUpRight size={20} />
                   </button>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                 <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-accent/20 p-4 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
                    <div className="w-full h-full rounded-full glass flex items-center justify-center relative overflow-hidden">
                       {/* Abstract placeholder shape/glow */}
                       <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(201,168,76,0.3),transparent)] animate-[spin_10s_linear_infinite]" />
                       <Award size={80} className="text-accent relative z-10" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Backdrop Glow */}
           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>

      </div>
    </section>
  );
}
