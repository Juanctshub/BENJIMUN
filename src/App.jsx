import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Delegates from './components/Delegates';
import { Mail, ArrowRight, ShieldCheck, Globe, Users } from 'lucide-react';

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

              {/* ¿QUÉ SIGNIFICA BENJIMUN? - Section 2026 Style */}
              <section id="meaning" className="py-40 px-6 relative overflow-hidden bg-secondary/30">
                {/* Background UN Emblem (Subtle) */}
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

                      {/* Acronym Breakdown - Bento/Grid inspired */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
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

                      <div className="pt-20">
                         <p className="text-text-muted text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            🌐 <strong className="text-white">Bloque Estratégico de Negociación Juvenil e Impulso al Modelo de las Naciones Unidas</strong>. Un ecosistema diseñado para formar a los líderes del mañana en el corazón de Barquisimeto.
                         </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </section>

              <Delegates />

              {/* Contact / Inscriptions - Conversion Oriented */}
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
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Nombre Completo</label>
                           <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-6 py-4 text-white text-sm focus:border-accent outline-none transition-all font-bold uppercase tracking-widest placeholder-white/10" placeholder="Apellido, Nombre" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Email Institucional</label>
                           <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-6 py-4 text-white text-sm focus:border-accent outline-none transition-all font-bold uppercase tracking-widest placeholder-white/10" placeholder="delegado@benjimun.com" />
                        </div>
                        <div className="pt-4">
                           <button className="w-full py-6 bg-accent text-primary font-black text-xs tracking-[0.5em] uppercase hover:bg-white hover:shadow-[0_0_50px_rgba(201,168,76,0.3)] transition-all flex items-center justify-center gap-4">
                              Enviar Solicitud <ArrowRight size={18} />
                           </button>
                        </div>
                      </form>
                    </div>
                  </FadeIn>
                </div>
              </section>
            </main>

            <footer className="py-20 px-6 border-t border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
               <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="space-y-4 text-center md:text-left">
                    <h4 className="font-display text-4xl font-black tracking-tighter text-white">BENJIMUN</h4>
                    <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                       BLOQUE ESTRATÉGICO DE NEGOCIACIÓN JUVENIL <br/>
                       & IMPULSO AL MODELO DE LAS NACIONES UNIDAS.
                    </p>
                 </div>
                 
                 <div className="flex gap-10">
                    {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map(social => (
                      <a key={social} href="#" className="text-text-muted text-[10px] font-black tracking-[0.2em] hover:text-accent transition-colors relative group">
                        {social}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                      </a>
                    ))}
                 </div>
               </div>
               <div className="text-center pt-20">
                  <p className="text-text-muted text-[9px] font-black uppercase tracking-[0.1em] opacity-20">© 2026 BARQUISIMETO, LARA • VENEZUELA</p>
               </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
