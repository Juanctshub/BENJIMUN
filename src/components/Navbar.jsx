import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Users, Home, Info, Menu } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', icon: <Home size={20} />, href: '#' },
    { name: 'Delegados', icon: <Users size={20} />, href: '#delegados' },
    { name: 'Nosotros', icon: <Info size={20} />, href: '#about' },
    { name: 'Contáctanos', icon: <Mail size={20} />, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-primary shadow-[0_0_20px_var(--accent-glow)]">
            B
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden md:block">
            BENJIMUN
          </span>
        </motion.div>

        {/* Unique Desktop Navbar - Floating Pill */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ 
            y: 0,
            scale: scrolled ? 1 : 1.05,
            padding: scrolled ? '6px' : '10px'
          }}
          className={`pointer-events-auto hidden md:flex items-center gap-1 glass rounded-full px-2 py-1 transition-all duration-500 ${scrolled ? 'shadow-2xl' : 'bg-transparent border-transparent'}`}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors hover:text-accent"
            >
              {link.icon}
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden pointer-events-auto w-12 h-12 glass rounded-full flex items-center justify-center text-accent"
        >
          <Menu size={24} />
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute top-20 right-0 w-64 glass rounded-3xl p-4 md:hidden pointer-events-auto"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {link.icon}
                    <span className="font-bold">{link.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
