import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Delegates from './components/Delegates';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Camera, Send, MessageSquare } from 'lucide-react';

function App() {
  return (
    <div className="antialiased text-text-main">
      <Navbar />
      
      <main>
        <Hero />
        
        <Delegates />

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-5xl font-black mb-6">Contáctanos</h2>
                <p className="text-text-muted text-lg mb-12 max-w-md">
                  ¿Tienes dudas sobre las delegaciones o el evento? Nuestro equipo estratégico está listo para impulsarte.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Email</p>
                      <p className="font-bold">contacto@benjimun.org</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Teléfono</p>
                      <p className="font-bold">+58 412-1234567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Ubicación</p>
                      <p className="font-bold">Barquisimeto, Lara - Venezuela</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold secondary">Nombre Completo</label>
                    <input type="text" placeholder="Tu nombre" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Email Institucional</label>
                    <input type="email" placeholder="correo@ejemplo.com" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Mensaje</label>
                    <textarea placeholder="Cuéntanos..." rows="4" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors resize-none"></textarea>
                  </div>
                  <button className="btn-premium w-full">Enviar Mensaje Estratégico</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 mt-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black tracking-tighter">BENJIMUN</h4>
            <p className="text-text-muted text-sm mt-2">© 2026 Bloque Estratégico de Negociación Juvenil.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-accent transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-text-muted hover:text-accent transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.17-2 4a10 10 0 1 1-12.2 11.6L2 22l4.58-4.58A10.74 10.74 0 0 0 12 18a10.28 10.28 0 0 0 7.31-3.04L22 4z"></path></svg>
            </a>
            <a href="#" className="text-text-muted hover:text-accent transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
