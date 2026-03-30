import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, MessageCircle, Info, Bookmark } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const links = [
    { label: 'Inicio', href: '#', icon: Home },
    { label: 'Significado', href: '#meaning', icon: Bookmark },
    { label: 'Delegados', href: '#delegados', icon: Users },
    { label: 'Contáctanos', href: '#contact', icon: MessageCircle },
  ];

  return (
    <>
      {/* Top bar — only visible when scrolled */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-[999] glass px-6 py-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-display font-bold text-lg tracking-[0.1em]">BENJIMUN</span>
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.label} href={l.href} className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors no-underline">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-block px-5 py-2.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold tracking-widest uppercase hover:bg-accent/20 transition-colors no-underline">
            Inscríbete
          </a>
        </div>
      </motion.header>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 z-[1000] md:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-16 right-0 glass rounded-2xl p-2 min-w-[200px]"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.label} href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-accent hover:bg-white/5 transition-all no-underline text-sm font-semibold"
                >
                  <l.icon size={16} /> {l.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent cursor-pointer"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </>
  );
}
