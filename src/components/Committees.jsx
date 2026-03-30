import { motion } from 'framer-motion';
import { Shield, Globe, Heart, Scale, Zap, Info } from 'lucide-react';

const committees = [
  { 
    id: 'unsc', 
    name: 'Consejo de Seguridad', 
    acronym: 'UNSC',
    description: 'Mantenimiento de la paz y seguridad internacional en zonas de conflicto crítico.',
    icon: Shield,
    color: '#3b82f6'
  },
  { 
    id: 'unhrc', 
    name: 'Derechos Humanos', 
    acronym: 'UNHRC',
    description: 'Protección y promoción de los derechos fundamentales en el siglo XXI.',
    icon: Scale,
    color: '#10b981'
  },
  { 
    id: 'eco-soc', 
    name: 'Económico y Social', 
    acronym: 'ECOSOC',
    description: 'Desarrollo sostenible y cooperación global ante crisis económicas.',
    icon: Globe,
    color: '#f59e0b'
  },
  { 
    id: 'who', 
    name: 'Salud Mundial', 
    acronym: 'WHO',
    description: 'Respuesta estratégica ante emergencias sanitarias y bioseguridad.',
    icon: Heart,
    color: '#ef4444'
  },
  { 
    id: 'crisis', 
    name: 'Gabinete de Crisis', 
    acronym: 'CRISIS',
    description: 'Simulación de alta presión con dinámicas de tiempo real y eventos imprevistos.',
    icon: Zap,
    color: '#8b5cf6'
  }
];

export default function Committees() {
  return (
    <section id="committees" className="py-40 px-6 relative overflow-hidden bg-primary">
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-10">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-accent text-[11px] font-black tracking-[0.6em] uppercase">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Ecosistema de Debate
              </div>
              <h2 className="font-display text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                COMITÉS <span className="text-white/10">2026</span>
              </h2>
           </div>
           <p className="text-text-muted text-lg max-w-sm font-medium leading-relaxed">
             Cinco escenarios diseñados para la confrontación de ideas y la resolución de conflictos globales.
           </p>
        </div>

        {/* Committees Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 h-full">
           {committees.map((com, i) => (
             <motion.div
               key={com.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
               className="relative glass group p-8 rounded-[2rem] border-white/5 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-500 h-[450px]"
             >
                {/* Background Acronym */}
                <span className="absolute -top-10 -right-10 font-display text-9xl font-black text-white/[0.02] group-hover:text-accent/[0.05] transition-colors pointer-events-none">
                  {com.acronym}
                </span>

                <div className="space-y-6">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                      <com.icon size={24} />
                   </div>
                   <div className="space-y-2 pt-4">
                      <span className="text-accent text-[10px] font-black tracking-[0.4em] uppercase">{com.acronym}</span>
                      <h3 className="font-display text-2xl font-black text-white uppercase leading-tight group-hover:text-accent transition-colors">
                        {com.name}
                      </h3>
                   </div>
                </div>

                <div className="space-y-6">
                   <p className="text-text-muted text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                     {com.description}
                   </p>
                   <button className="flex items-center gap-3 text-accent text-[9px] font-black uppercase tracking-[0.3em] hover:gap-6 transition-all">
                      Ver Guía Académica <Info size={14} />
                   </button>
                </div>

                {/* Accent Line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-accent transition-all duration-500 opacity-0 group-hover:opacity-100" 
                  style={{ width: '0%', groupHover: { width: '100%' } }} 
                />
             </motion.div>
           ))}
        </div>

      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] -z-10" />
    </section>
  );
}
