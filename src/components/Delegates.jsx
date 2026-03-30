import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Crown, Zap, ShieldCheck, Sparkles } from 'lucide-react';

function SpotlightCard({ title, description, icon: Icon, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(245,158,11,0.08), transparent 40%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      className="group relative glass-card rounded-3xl p-10 h-[380px] flex flex-col justify-between hover:border-accent/30 transition-colors duration-500"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background }}
      />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
          <Icon size={26} />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="syncopate text-xl font-bold mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-text-muted text-base leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Delegates() {
  const cards = [
    {
      title: 'Excelencia',
      description: 'El estándar más alto de negociación para jóvenes líderes mundiales del mañana.',
      icon: Crown,
    },
    {
      title: 'Agilidad',
      description: 'Decisiones estratégicas rápidas y efectivas en entornos de presión.',
      icon: Zap,
    },
    {
      title: 'Protocolo',
      description: 'Dominio absoluto de la etiqueta y el formalismo internacional.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="delegados" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-xs font-extrabold tracking-[0.5em] uppercase">
                Comunidad
              </span>
            </div>
            <h2 className="syncopate text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              DELEGADOS
              <br />
              <span className="text-accent">BENJIMUN</span>
            </h2>
            <p className="text-text-muted text-lg mt-6 max-w-lg leading-relaxed font-medium">
              Formamos el futuro de la diplomacia con un enfoque táctico y una visión global inquebrantable.
            </p>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-10 py-5 bg-white text-primary font-extrabold text-sm tracking-[0.3em] uppercase overflow-hidden group cursor-pointer rounded-lg shadow-[0_15px_50px_rgba(245,158,11,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
              <Sparkles size={18} />
              Descubrir DELEGADO TOP
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          </motion.button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <SpotlightCard key={i} index={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
