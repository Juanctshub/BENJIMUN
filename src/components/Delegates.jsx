import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, Award, Search, ArrowUpRight, Users } from 'lucide-react';

const delegates = [
  { name: 'Andrea Valera', role: 'Presidenta', honors: 'Mejor Delegada SVP-MUN', accent: '#c9a84c' },
  { name: 'Juan Castillo', role: 'Secretario', honors: 'Mención Honorífica KAMEMUN', accent: '#f8fafc' },
  { name: 'Sofia Mendez', role: 'Delegada Padrino', honors: 'Mejor Oratoria 2025', accent: '#c9a84c' },
  { name: 'Ricardo Leon', role: 'Líder Estratégico', honors: 'Delegado Sobresaliente', accent: '#f8fafc' }
];

const DelegateCard = ({ delegate, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative bg-secondary/20 border border-white/5 rounded-[2.5rem] p-10 overflow-hidden transition-all duration-500 hover:border-accent/40"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(201,168,76,0.12), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-full glass border-white/10 flex items-center justify-center text-accent">
            <Users size={24} />
          </div>
          <motion.div 
            whileHover={{ rotate: 45 }}
            className="text-white/20 group-hover:text-accent transition-colors"
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>

        <div className="space-y-1">
          <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">
            {delegate.name}
          </h3>
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">
            {delegate.role}
          </p>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 text-text-muted text-[11px] font-bold uppercase tracking-wider">
            <Award size={14} className="text-accent" />
            {delegate.honors}
          </div>
        </div>
      </div>

      {/* Decorative Index */}
      <span className="absolute bottom-6 right-10 font-display text-8xl font-black text-white/[0.02] pointer-events-none group-hover:text-accent/[0.05] transition-colors">
        0{index + 1}
      </span>
    </motion.div>
  );
};

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

        {/* Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {delegates.map((d, i) => (
             <DelegateCard key={i} delegate={d} index={i} />
           ))}
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
