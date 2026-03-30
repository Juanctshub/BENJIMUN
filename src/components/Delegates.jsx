import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Delegates() {
  const features = [
    {
      title: "Liderazgo",
      desc: "Formamos el carácter de los líderes del mañana a través del debate.",
      icon: <TrendingUp className="text-accent" />,
    },
    {
      title: "Diplomacia",
      desc: "Resolución de conflictos internacionales con elegancia y estrategia.",
      icon: <Award className="text-accent" />,
    },
    {
      title: "Impacto Social",
      desc: "Un solo latido que resuena en toda la comunidad juvenil de Lara.",
      icon: <ShieldCheck className="text-accent" />,
    }
  ];

  return (
    <section id="delegados" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-accent font-black tracking-widest text-sm uppercase mb-4"
            >
              Nuestra Comunidad
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black"
            >
              Forjando los mejores <span className="text-accent">Delegados</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex-shrink-0"
          >
            {/* Unique Uiverse-Style Button */}
            <button className="uiverse-btn group relative overflow-hidden px-8 py-5 rounded-2xl bg-secondary border border-glass-border font-bold text-lg tracking-wide transition-all hover:scale-105 active:scale-95 shadow-2xl">
              <span className="relative z-10 flex items-center gap-3">
                <Star size={22} className="fill-accent text-accent" />
                Descubrir DELEGADO TOP
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2.5rem] hover:bg-white/[0.07] transition-colors border-white/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h4 className="text-2xl font-black mb-4">{f.title}</h4>
              <p className="text-text-muted leading-relaxed text-lg">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .uiverse-btn {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          box-shadow: 0 10px 40px -10px rgba(245, 158, 11, 0.4);
          overflow: hidden;
        }
        .uiverse-btn::after {
          content: '';
          position: absolute;
          width: 50px;
          height: 100%;
          background-color: #fff;
          top: 0;
          left: -100%;
          filter: blur(30px);
          opacity: 0.2;
          transform: skewX(-20deg);
          animation: btn-shine 3s infinite;
        }
        @keyframes btn-shine {
          0% { left: -100%; }
          20%, 100% { left: 200%; }
        }
      `}} />
    </section>
  );
}
