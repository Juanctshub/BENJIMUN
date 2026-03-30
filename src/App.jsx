import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Delegates from './components/Delegates';
import { Mail, ArrowRight } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-accent selection:text-primary">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Navbar />
            
            <main>
              <Hero />
              
              <Delegates />

              {/* Elite Contact Section */}
              <section id="contact" className="py-60 px-10 relative overflow-hidden bg-black/40">
                <div className="max-w-5xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass-premium p-20 md:p-32 rounded-[4rem] relative overflow-hidden group border-white/5"
                  >
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                       <Mail size={200} />
                    </div>
                    
                    <h2 className="syncopate text-4xl md:text-7xl font-black mb-12 leading-none tracking-tighter">
                      EL PULSO <br/>
                      <span className="text-accent underline decoration-white/5 underline-offset-8">ESTRATÉGICO</span>
                    </h2>
                    
                    <p className="text-text-muted text-2xl mb-16 max-w-lg mx-auto font-bold opacity-80 decoration-accent/20">
                      Conecta con la delegación que está redefiniendo negociaciones en Barquisimeto.
                    </p>

                    <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                      <input 
                        type="email" 
                        placeholder="EMAIL INSTITUCIONAL" 
                        className="flex-grow bg-white/5 border border-white/10 rounded-none px-8 py-6 focus:border-accent outline-none transition-colors font-black uppercase text-xs tracking-widest syncopate text-white placeholder-white/20"
                      />
                      <button className="glow-btn whitespace-nowrap flex items-center justify-center gap-3">
                         ENVIAR <ArrowRight size={20} />
                      </button>
                    </form>
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer Elite */}
            <footer className="py-24 px-10 border-t border-white/5 bg-black/60">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
                <div className="text-center md:text-left">
                  <h4 className="syncopate text-3xl font-black tracking-tighter">BENJIMUN</h4>
                  <p className="text-text-muted text-xs mt-4 font-black uppercase tracking-[0.4em] opacity-40">
                    © 2026 BLOQUE ESTRATÉGICO DE NEGOCIACIÓN JUVENIL.
                  </p>
                </div>
                
                <div className="flex gap-12">
                  <a href="#" className="text-white/20 hover:text-accent transition-colors">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="text-white/20 hover:text-accent transition-colors">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.17-2 4a10 10 0 1 1-12.2 11.6L2 22l4.58-4.58A10.74 10.74 0 0 0 12 18a10.28 10.28 0 0 0 7.31-3.04L22 4z"></path></svg>
                  </a>
                  <a href="#" className="text-white/20 hover:text-accent transition-colors">
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
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
