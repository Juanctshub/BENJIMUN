import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Delegates from './components/Delegates';
import { Mail, ArrowRight } from 'lucide-react';

function App() {
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
            transition={{ duration: 1 }}
          >
            <Navbar />

            <main>
              <Hero />

              {/* ¿QUÉ SIGNIFICA BENJIMUN? */}
              <section id="meaning" className="py-28 px-6 relative">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-8 h-[2px] bg-accent" />
                      <span className="text-accent text-[10px] font-extrabold tracking-[0.5em] uppercase">
                        Significado
                      </span>
                      <div className="w-8 h-[2px] bg-accent" />
                    </div>

                    <h2 className="syncopate text-3xl md:text-5xl font-bold mb-8 tracking-tight">
                      ¿Qué significa <span className="text-accent">BENJIMUN</span>?
                    </h2>

                    <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                      🌐 <strong className="text-white">B</strong>loque{' '}
                      <strong className="text-white">E</strong>stratégico de{' '}
                      <strong className="text-white">N</strong>egociación{' '}
                      <strong className="text-white">J</strong>uvenil e{' '}
                      <strong className="text-white">I</strong>mpulso al{' '}
                      <strong className="text-white">M</strong>odelo de las{' '}
                      <strong className="text-white">N</strong>aciones{' '}
                      <strong className="text-white">U</strong>nidas
                    </p>

                    <p className="text-text-muted text-base leading-relaxed max-w-2xl mx-auto">
                      Con sede en <strong className="text-white">Barquisimeto, Estado Lara</strong>,
                      nuestra misión es formar líderes diplomáticos comprometidos con el diálogo, la paz
                      y la justicia global. A través del debate y la simulación de Naciones Unidas,
                      potenciamos las habilidades de negociación de la juventud venezolana.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Delegados */}
              <Delegates />

              {/* Contact */}
              <section id="contact" className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-3xl p-12 md:p-20 relative overflow-hidden"
                  >
                    <div className="absolute top-8 right-8 opacity-[0.03] pointer-events-none">
                      <Mail size={200} />
                    </div>

                    <div className="relative z-10 text-center">
                      <span className="text-accent text-xs font-extrabold tracking-[0.5em] uppercase">
                        Conecta
                      </span>
                      <h2 className="syncopate text-3xl md:text-5xl font-bold mt-4 mb-4 tracking-tight">
                        Contáctanos
                      </h2>
                      <p className="text-text-muted text-lg mb-10 max-w-md mx-auto">
                        ¿Listo para ser parte del impulso estratégico? Escríbenos.
                      </p>

                      <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors font-semibold"
                        />
                        <button
                          type="submit"
                          className="px-8 py-4 bg-accent text-primary font-extrabold text-sm tracking-widest uppercase rounded-lg hover:bg-white hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Enviar <ArrowRight size={16} />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="py-16 px-6 border-t border-white/5">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <span className="syncopate text-xl font-bold">BENJIMUN</span>
                  <p className="text-text-muted text-xs mt-2 tracking-widest uppercase font-semibold opacity-60">
                    © 2026 Bloque Estratégico de Negociación Juvenil
                  </p>
                </div>
                <div className="flex gap-6">
                  <a href="#" className="text-white/30 hover:text-accent transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                  <a href="#" className="text-white/30 hover:text-accent transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                  </a>
                  <a href="#" className="text-white/30 hover:text-accent transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
