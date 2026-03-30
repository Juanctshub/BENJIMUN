import { motion } from 'framer-motion';

export default function Secretario() {
  return (
    <section id="secretario" className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden">
      {/* Elegance Grid & Blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Mobile & Desktop Photography Grid */}
          <div className="w-full lg:w-5/12 grid grid-cols-2 grid-rows-2 gap-3 md:gap-6 relative">
             <div className="absolute -inset-10 bg-gradient-to-tr from-accent/5 to-transparent rounded-[3rem] -z-10 blur-xl md:block hidden" />
             
             {/* Main Portrait */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="col-span-2 row-span-2 md:col-span-1 md:row-span-1 glass border-white/10 rounded-[2rem] overflow-hidden aspect-[4/5] relative group shadow-2xl"
             >
                <img src="/assets/o.jpg" alt="Benjamín - Secretario General" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 left-5 font-black text-white/50 text-[10px] uppercase tracking-[0.4em]">Visión</span>
             </motion.div>

             {/* Secondary Pics */}
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="glass border-white/10 rounded-3xl overflow-hidden aspect-square relative group hidden md:block"
             >
                <img src="/assets/oo.jpg" alt="Liderazgo 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="col-span-1 glass border-white/10 rounded-3xl overflow-hidden aspect-square relative group"
             >
                <img src="/assets/ooo.jpg" alt="Liderazgo 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="col-span-1 glass border-white/10 rounded-3xl overflow-hidden aspect-square relative group"
             >
                <img src="/assets/oooo.jpg" alt="Liderazgo 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </motion.div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="w-full lg:w-7/12 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
               <span className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-[0.4em]">Alto Mando</span>
            </motion.div>

            <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="text-[2.5rem] sm:text-5xl md:text-7xl font-black clash-display uppercase tracking-[-0.03em] leading-none"
            >
               Secretario <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white drop-shadow-lg">General</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-white/70 text-sm md:text-lg max-w-2xl leading-relaxed"
            >
              <p>
                <b>Benjamín</b> es la fuerza motriz detrás del Modelo de las Naciones Unidas. Como Secretario General, personifica la excelencia diplomática, el pensamiento estratégico y la resolución implacable de conflictos globales. Su liderazgo indiscutible forja la siguiente generación de delgados de élite.
              </p>
              <p>
                Reconocido por su capacidad analítica y su elocuencia en el estrado, ha establecido un estándar de exigencia insuperable. Su fortaleza no solo radica en el debate puro, sino en su visión arquitectónica para unir coaliciones donde otros ven barreras infranqueables.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="pt-6 border-t border-white/10 w-full"
            >
               <div className="flex items-center justify-center md:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="text-center">
                    <span className="block text-3xl font-black text-white clash-display mb-1">01</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent">Liderazgo</span>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <span className="block text-3xl font-black text-white clash-display mb-1">MAX</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent">Diplomacia</span>
                  </div>
                  <div className="w-px h-10 bg-white/20 hidden sm:block" />
                  <div className="text-center hidden sm:block">
                    <span className="block text-3xl font-black text-white clash-display mb-1">100%</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent">Estrategia</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
