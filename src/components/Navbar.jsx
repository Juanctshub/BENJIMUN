import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Bookmark, MessageCircle, Info } from 'lucide-react';
import benjiLogo from '../assets/benji.png';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const links = [
    { label: 'Inicio', href: '#', icon: Home },
    { label: 'Significado', href: '#meaning', icon: Bookmark },
    { label: 'Delegados', href: '#delegados', icon: Users },
    { label: 'Contáctanos', href: '#contact', icon: MessageCircle },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'py-4 bg-primary/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img src={benjiLogo} alt="BENJIMUN Logo" className="w-12 h-12 object-contain" />
            <span className="font-display font-black text-2xl tracking-tighter text-white clash-display">BENJIMUN</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-black uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button 
              onClick={() => window.open('https://www.instagram.com/benjimun_/', '_blank')}
              className="px-8 py-3 bg-accent text-primary font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_15px_40px_rgba(201,168,76,0.3)]"
            >
              Visitanos!
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        className="fixed inset-y-0 right-0 w-80 bg-secondary z-[150] shadow-2xl md:hidden p-12 flex flex-col gap-8"
      >
        <button onClick={() => setMobileMenuOpen(false)} className="self-end text-white"><X size={32} /></button>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-6 text-xl font-black uppercase tracking-tighter text-white hover:text-accent transition-colors"
          >
            <link.icon size={24} className="text-accent" />
            {link.label}
          </a>
        ))}
      </motion.div>
    </>
  );
}
