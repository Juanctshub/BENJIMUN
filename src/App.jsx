import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Committees from './components/Committees';
import Delegates from './components/Delegates';
import { Mail, ArrowRight, ShieldCheck, Globe, Users, Timer, Target, Award } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

const Countdown = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto py-10">
            {[
                { label: 'Días', val: '??' },
                { label: 'Horas', val: '??' },
                { label: 'Minutos', val: '??' },
                { label: 'Segundos', val: '??' }
            ].map((unit, i) => (
                <div key={i} className="glass p-6 rounded-2xl border-white/10 flex flex-col items-center">
                    <span className="font-display text-4xl font-black text-accent">{unit.val}</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mt-1">{unit.label}</span>
                </div>
            ))}
        </div>
    );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-primary min-h-screen selection:bg-accent selection:text-primary">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Navbar />

            <main>
              <Hero />

              {/* EVENT COUNTDOWN - MYSTERY STATE */}
              <section className="py-20 px-6 relative overflow-hidden bg-secondary/10">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                   <div className="inline-flex items-center gap-3 text-accent text-[11px] uppercase font-black tracking-[0.5em]">
                      <Timer size={14} /> El Reloj Estratégico
                   </div>
                   <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none clash-display whitespace-nowrap">
                      BENJIMUN I <span className="text-accent italic">Edición?</span>
                   </h2>
                   <Countdown />
                </div>
              </section>

              {/* ¿QUÉ SIGNIFICA BENJIMUN? */}
              <section id="meaning" className="py-40 px-6 relative overflow-hidden bg-secondary/30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                  <svg className="w-[800px] h-[800px]" viewBox="0 0 200 200" fill="currentColor">
                    <path d="M100 10c-49.7 0-90 40.3-90 90s40.3 90 90 90 90-40.3 90-90-40.3-90-90-90zm0 162c-39.7 0-72-32.3-72-72s32.3-72 72-72 72 32.3 72 72-32.3 72-72 72z"/>
                    <path d="M100 45c-30.3 0-55 24.7-55 55s24.7 55 55 55 55-24.7 55-55-24.7-55-55-55zm0 98c-23.7 0-43-19.3-43-43s19.3-43 43-43 43 19.3 43 43-19.3 43-43 43z"/>
                  </svg>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                  <FadeIn>
                    <div className="text-center space-y-12">
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-accent/10 bg-accent/[0.03] text-accent text-[10px] uppercase font-black tracking-[0.5em] mb-4">
                        EL SIGNIFICADO
                      </div>
                      
                      <h2 className="font-display text-4xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase text-white mb-20 max-w-4xl mx-auto">
                        MÁS QUE UN NOMBRE, <br/>
                        <span className="text-accent underline decoration-white/5 underline-offset-16">UNA MISIÓN</span>
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        {[
                          { l: 'B', t: 'Bloque', d: 'Unión cohesionada de talento joven.' },
                          { l: 'E', t: 'Estratégico', d: 'Pensamiento crítico y acción planificada.' },
                          { l: 'N', t: 'Negociación', d: 'El arte de encontrar el punto medio.' },
                          { l: 'J', t: 'Juvenil', d: 'El motor del cambio actual.' },
                          { l: 'I', t: 'Impulso', d: 'Fuerza que proyecta nuevas ideas.' },
                          { l: 'M', t: 'Modelo', d: 'La excelencia como estándar de vida.' },
                          { l: 'U', t: 'Unidas', d: 'Fraternidad diplomática sin fronteras.' },
                          { l: 'N', t: 'Naciones', d: 'Respeto a la soberanía y diversidad.' }
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.02)" }}
                            className="glass p-8 rounded-2xl group transition-all duration-300"
                          >
                            <span className="block font-display text-5xl font-black text-accent mb-4 opacity-40 group-hover:opacity-100 transition-opacity">{item.l}</span>
                            <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight uppercase">{item.t}</h3>
                            <p className="text-text-muted text-sm font-medium leading-relaxed">{item.d}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </section>

              <Committees />

              {/* MISSION / VISION SECTION */}
              <section className="py-40 px-6 border-y border-white/5 bg-secondary/10">
                 <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    <FadeIn>
                       <div className="space-y-6">
                          <div className="flex items-center gap-3 text-accent text-[11px] font-black tracking-widest uppercase">
                             <Target size={16} /> Objetivos 2026
                          </div>
                          <h3 className="font-display text-5xl font-black text-white uppercase leading-none">Nuestra <br/> <span className="text-accent italic">Estrategia</span></h3>
                          <p className="text-text-muted text-lg leading-relaxed max-w-md">
                             En BENJIMUN no solo simulamos la diplomacia; creamos un laboratorio de liderazgo donde cada decisión moldea el carácter de nuestros delegados.
                          </p>
                          <ul className="space-y-4 pt-10">
                             {[
                               'Excelencia en Oratoria y Retórica',
                               'Análisis Geopolítico de Vanguardia',
                               'Liderazgo Ético y Fraternidad'
                             ].map((li, i) => (
                               <li key={i} className="flex items-center gap-4 text-white text-xs font-bold uppercase tracking-widest">
                                 <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(201,168,76,1)]" /> {li}
                               </li>
                             ))}
                          </ul>
                       </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                       <div className="glass p-10 rounded-[3rem] border-accent/20 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-accent/5 blur-[80px] -z-10" />
                          <Award size={80} className="text-accent mb-4" />
                          <h4 className="font-display text-3xl font-black text-white uppercase">Elitismo Académico</h4>
                          <p className="text-text-muted text-sm leading-relaxed px-6">
                            Reconocidos como el bloque de negociación más influyente de la región, BENJIMUN es el estándar de oro para los futuros diplomáticos.
                          </p>
                       </div>
                    </FadeIn>
                 </div>
              </section>

              <Delegates />

              {/* Contact / Inscriptions */}
              <section id="contact" className="py-40 px-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <FadeIn>
                    <div className="space-y-8">
                       <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                         Lidera el <br/>
                         <span className="text-accent underline decoration-white/5 underline-offset-16">Cambio</span>
                       </h2>
                       <p className="text-text-muted text-lg md:text-xl font-medium max-w-md leading-relaxed">
                          Sé parte de la delegación más prestigiosa. Las inscripciones para el próximo ciclo estratégico están abiertas.
                       </p>
                       
                       <div className="space-y-6 pt-4">
                          {[
                            { i: ShieldCheck, t: 'Certificación Oficial', d: 'Avalada internacionalmente.' },
                            { i: Globe, t: 'Impacto Global', d: 'Conéctate con redes diplomáticas.' },
                            { i: Users, t: 'Mentoría Pro', d: 'Aprende de los mejores negociadores.' }
                          ].map((feat, idx) => (
                            <div key={idx} className="flex gap-4">
                              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-accent shrink-0">
                                <feat.i size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-text-main text-sm uppercase tracking-widest">{feat.t}</h4>
                                <p className="text-text-muted text-xs font-medium">{feat.d}</p>
                              </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div className="glass p-10 md:p-16 rounded-[3rem] relative group border-white/5">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <h3 className="syncopate text-xl font-black mb-10 tracking-[0.2em] text-center">SOLICITUD DE INGRESO</h3>
                      
                      <form className="space-y-6">
                        {/* Custom Input Styles */}
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Nombre Completo</label>
                           <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-6 py-4 text-white text-sm focus:border-accent outline-none transition-all font-bold uppercase tracking-widest placeholder-white/10" placeholder="Apellido, Nombre" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Email Institucional</label>
                           <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-6 py-4 text-white text-sm focus:border-accent outline-none transition-all font-bold uppercase tracking-widest placeholder-white/10" placeholder="delegado@benjimun.com" />
                        </div>
                        <div className="pt-4">
                           <button className="w-full py-6 bg-accent text-primary font-black text-xs tracking-[0.5em] uppercase hover:bg-white hover:border-accent transition-all flex items-center justify-center gap-4">
                              Enviar Solicitud <ArrowRight size={18} />
                           </button>
                        </div>
                      </form>
                    </div>
                  </FadeIn>
                </div>
              </section>
            </main>

            <footer className="py-24 px-6 border-t border-white/5 relative overflow-hidden bg-primary/50">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
               <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
                 
                 {/* Brand */}
                 <div className="space-y-4 text-center md:text-left">
                    <h4 className="font-display text-4xl font-black tracking-tighter text-white clash-display">BENJIMUN</h4>
                    <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.4em] opacity-40 leading-relaxed">
                       BLOQUE ESTRATÉGICO DE NEGOCIACIÓN JUVENIL <br/>
                       & IMPULSO AL MODELO DE LAS NACIONES UNIDAS.
                    </p>
                 </div>

                 {/* Socials - Only Instagram */}
                 <div className="flex justify-center gap-12">
                    <a 
                      href="https://www.instagram.com/benjimun_/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-text-muted text-[11px] font-black tracking-[0.3em] hover:text-accent transition-all duration-300 relative group no-underline"
                    >
                      FOLLOW INSTAGRAM
                      <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
                    </a>
                 </div>

                 {/* Credits - fotagreda */}
                 <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Crafted For Excellence</span>
                    <a 
                      href="https://agreda-portfolio.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-[12px] font-black tracking-[0.2em] uppercase hover:text-accent transition-all duration-500 group relative no-underline px-4 py-2"
                    >
                      <span className="relative z-10">Creado por fotagreda</span>
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity animate-pulse" />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/20 group-hover:bg-accent transition-colors" />
                    </a>
                 </div>
               </div>

               <div className="text-center pt-24">
                  <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
                    © 2026 BARQUISIMETO, LARA • VENEZUELA
                  </p>
               </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
