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
      <AnimatePresence>
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

              {/* Ultra-Modern Contact Section */}
              <section id="contact" className="py-40 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass-premium p-12 md:p-24 rounded-[3rem] relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                       <Mail size={150} />
                    </div>
                    
                    <h2 className="syncopate text-3xl md:text-5xl font-black mb-8 leading-tight">
                      EL PULSO <br/>
                      <span className="text-accent">ESTRATÉGICO</span>
                    </h2>
                    
                    <p className="text-text-muted text-lg mb-12 max-w-sm mx-auto font-medium">
                      Conecta con la delegación que está redefiniendo el Modelo de las Naciones Unidas.
                    </p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                      <input 
                        type="email" 
                        placeholder="Email institucional" 
                        className="flex-grow bg-white/5 border border-white/10 rounded-none px-6 py-4 focus:border-accent outline-none transition-colors font-bold uppercase text-[10px] tracking-widest syncopate text-white"
                      />
                      <button className="glow-btn whitespace-nowrap flex items-center justify-center gap-2">
                         Enviar <ArrowRight size={16} />
                      </button>
                    </form>
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer Minimalista Elite */}
            <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left">
                  <h4 className="syncopate text-xl font-black tracking-tighter">BENJIMUN</h4>
                  <p className="text-text-muted text-[10px] mt-2 font-black uppercase tracking-[0.2em] opacity-40">
                    © 2026 Bloque Estratégico de Negociación Juvenil.
                  </p>
                </div>
                
                <div className="flex gap-8">
                  <a href="#" className="text-white/20 hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="text-white/20 hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.17-2 4a10 10 0 1 1-12.2 11.6L2 22l4.58-4.58A10.74 10.74 0 0 0 12 18a10.28 10.28 0 0 0 7.31-3.04L22 4z"></path></svg>
                  </a>
                  <a href="#" className="text-white/20 hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
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
