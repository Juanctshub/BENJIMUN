import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, MessageCircle, Info } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Inicio', href: '#', icon: Home },
    { label: 'Delegados', href: '#delegados', icon: Users },
    { label: 'Nosotros', href: '#about', icon: Info },
    { label: 'Contáctanos', href: '#contact', icon: MessageCircle },
  ];

  return (
    <nav className="fixed bottom-8 right-8 z-[1000]">
      {/* Expanded Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-20 right-0 glass-card rounded-2xl p-3 min-w-[220px]"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-white/70 hover:text-accent hover:bg-white/5 transition-all group no-underline"
              >
                <link.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold tracking-wide">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-accent cursor-pointer relative group"
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.div>
        <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.button>
    </nav>
  );
}
