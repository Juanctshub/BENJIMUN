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

              <Delegates />

              {/* About Section */}
              <section id="about" className="py-32 px-6 bg-secondary/50">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-accent text-xs font-extrabold tracking-[0.5em] uppercase">
                      🌐 Quiénes Somos
                    </span>
                    <h2 className="syncopate text-3xl md:text-5xl font-bold mt-4 mb-8 tracking-tight">
                      Un Solo <span className="text-accent">Latido</span>
                    </h2>
                    <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                      <strong className="text-white">BENJIMUN</strong> es el Bloque Estratégico de
                      Negociación Juvenil e Impulso al Modelo de las Naciones Unidas, con sede en
                      Barquisimeto, Estado Lara. Nuestra misión es formar líderes diplomáticos
                      comprometidos con el diálogo, la paz y la justicia global.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-3xl p-12 md:p-20 relative overflow-hidden"
                  >
                    {/* Background icon */}
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
                  {/* Instagram */}
                  <a href="#" className="text-white/30 hover:text-accent transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                  {/* X / Twitter */}
                  <a href="#" className="text-white/30 hover:text-accent transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                  </a>
                  {/* LinkedIn */}
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
