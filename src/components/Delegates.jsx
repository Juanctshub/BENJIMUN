import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative h-96 w-full overflow-hidden rounded-[2rem] glass-premium p-8 transition-all hover:border-accent/40"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(245, 158, 11, 0.1), transparent 40%)`
          ),
        }}
      />
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="syncopate text-lg font-bold mb-4 tracking-tight group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed font-medium">
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
      description: "El estándar más alto de negociación para jóvenes líderes mundiales.",
      icon: Crown,
      delay: 0.1
    },
    {
      title: "Agilidad",
      description: "Toma de decisiones estratégica en entornos de alta presión diplomática.",
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
    <section id="delegados" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="syncopate text-4xl md:text-6xl font-black mb-8 leading-[1.1]">
              Comunidad <br/>
              <span className="text-accent italic">DELEGADOS ELITE</span>
            </h2>
            <p className="text-text-muted text-lg max-w-lg leading-relaxed font-medium">
              Formamos el futuro de la diplomacia con un enfoque táctico y una visión global inquebrantable.
            </p>
          </div>

          <motion.div 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative"
          >
            {/* Liquid / Top Tier Button */}
            <button className="liquid-btn relative px-12 py-6 rounded-none syncopate font-black text-xs tracking-[0.3em] uppercase bg-white text-primary hover:text-white transition-colors overflow-hidden group">
               <span className="relative z-10 flex items-center gap-2">
                 <Sparkles size={16} />
                 Descubrir DELEGADO TOP
               </span>
               <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
            </button>
            <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full -z-10 animate-pulse" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <SpotlightCard key={i} {...card} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .liquid-btn {
          box-shadow: 0 20px 50px rgba(245, 158, 11, 0.3);
        }
      `}} />
    </section>
  );
}
