import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Crown, Sparkles, Zap, ShieldAlert } from 'lucide-react';

const SpotlightCard = ({ title, description, icon: Icon, delay }) => {
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative h-[450px] w-full overflow-hidden rounded-[3rem] glass-premium p-12 transition-all hover:border-accent/40 bg-white/[0.02]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(245, 158, 11, 0.15), transparent 40%)`
          ),
        }}
      />
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-125 group-hover:bg-accent/20 transition-all duration-500">
          <Icon size={32} />
        </div>
        <div>
          <h3 className="syncopate text-2xl font-black mb-6 tracking-tighter group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-xl text-text-muted leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Delegates() {
  const cards = [
    {
      title: "Excelencia",
      description: "El estándar más alto de negociación para líderes mundiales.",
      icon: Crown,
      delay: 0.1
    },
    {
      title: "Agilidad",
      description: "Decisiones estratégicas en alta presión diplomática.",
      icon: Zap,
      delay: 0.2
    },
    {
      title: "Protocolo",
      description: "Dominio absoluto de la etiqueta y el formalismo internacional.",
      icon: ShieldAlert,
      delay: 0.3
    }
  ];

  return (
    <section id="delegados" className="py-48 px-10 relative bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-16 text-center md:text-left">
          <div className="max-w-3xl">
             <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <div className="w-8 h-[2px] bg-accent" />
                <span className="text-accent text-sm font-black uppercase tracking-[0.6em]">Comunidad ELITE</span>
             </div>
            <h2 className="syncopate text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              DELEGADOS <br/>
              <span className="text-accent italic">BENJIMUN</span>
            </h2>
            <p className="text-text-muted text-2xl leading-relaxed font-bold max-w-xl">
              Formamos el futuro de la diplomacia con visión global inquebrantable.
            </p>
          </div>

          <motion.div 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative pb-4"
          >
            <button className="liquid-btn relative px-16 py-8 rounded-none syncopate font-black text-sm tracking-[0.5em] uppercase bg-white text-primary hover:text-white transition-colors overflow-hidden group shadow-[0_20px_80px_rgba(245,158,11,0.3)]">
               <span className="relative z-10 flex items-center justify-center gap-3">
                 <Sparkles size={20} className="text-accent" />
                 DELEGADO TOP
               </span>
               <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
            </button>
            <div className="absolute -inset-8 bg-accent/10 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cards.map((card, i) => (
            <SpotlightCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
