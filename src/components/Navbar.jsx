import { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Menu, X, Home, Users, Info, MessageSquare, Shield } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic Spring Physics
  const springConfig = { damping: 15, stiffness: 150 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, target } = e;
    const { left, top, width, height } = target.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const navItems = [
    { label: 'Inicio', icon: <Home size={18} />, href: '#' },
    { label: 'Delegados', icon: <Users size={18} />, href: '#delegados' },
    { label: 'Nosotros', icon: <Info size={18} />, href: '#about' },
    { label: 'Seguridad', icon: <Shield size={18} />, href: '#security' },
    { label: 'Contacto', icon: <MessageSquare size={18} />, href: '#contact' },
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[1001]">
      {/* Radial Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: (navItems.length - i) * 0.05 }}
                className="flex items-center gap-4 group no-underline"
              >
                <div className="glass-premium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.label}</span>
                </div>
                <div className="w-12 h-12 glass-premium rounded-xl flex items-center justify-center text-white/70 group-hover:text-accent group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  {item.icon}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Magnetic Trigger */}
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(!isOpen)}
        style={{ x: magneticX, y: magneticY }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 glass-premium rounded-2xl flex items-center justify-center relative cursor-none group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-accent"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
}
