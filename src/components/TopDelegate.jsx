import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Award, Star } from 'lucide-react';
import carCrashVideo from '../assets/download.mp4';
import telefonoAudio from '../assets/telefono.mp3';

export default function TopDelegate({ onClose }) {
  const [stage, setStage] = useState('video'); // 'video', 'tvOff', 'content'
  const audioRef = useRef(null);

  // Mute global audio right away
  useEffect(() => {
    window.dispatchEvent(new Event('mute-global-audio'));
    return () => {
       // If we close this, we may want to reinstate audio, but for now we just keep it muted or let user reload
    };
  }, []);

  // Initiate new audio when entering content stage with fadein
  useEffect(() => {
    if (stage === 'content') {
      const audio = new Audio(telefonoAudio);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;

      const attemptPlay = async () => {
        try {
          await audio.play();
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.3) {
              vol += 0.02;
              audio.volume = Math.min(vol, 0.3);
            } else {
              clearInterval(fade);
            }
          }, 150);
        } catch (err) {
          console.warn('Autoplay blocked for telefono.mp3', err);
        }
      };
      
      attemptPlay();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [stage]);

  const handleVideoEnded = () => {
    setStage('tvOff');
    setTimeout(() => {
      setStage('content');
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center overflow-y-auto"
    >
      <AnimatePresence mode="wait">
        {stage === 'video' && (
          <motion.div
            key="cinematic"
            exit={{ scaleY: 0.01, scaleX: 1, filter: 'brightness(2)', opacity: 0 }}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className="w-full h-full flex items-center justify-center bg-black relative"
          >
            <video 
              autoPlay 
              muted 
              playsInline
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover"
            >
              <source src={carCrashVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 glass px-6 py-3 rounded-full text-white/50 text-[10px] tracking-[0.5em] font-black uppercase">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               Cargando Top Delegate...
            </div>
          </motion.div>
        )}

        {stage === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full min-h-screen bg-primary/95 backdrop-blur-3xl p-6 md:p-12 lg:p-24 pb-40 text-white relative flex flex-col items-center selection:bg-accent selection:text-black"
          >
            <button 
               onClick={onClose}
               className="fixed top-8 right-8 z-[350] text-[#ff3333] hover:text-white transition-colors text-[9px] uppercase tracking-[0.4em] font-black glass px-6 py-3 rounded-full border border-red-500/20"
            >
               Cerrar Archivo
            </button>
            
            <div className="max-w-5xl w-full space-y-20 relative z-10">
               {/* Premium Header */}
               <div className="text-center space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-3 text-accent text-[12px] uppercase tracking-[0.6em] font-black px-8 py-3 rounded-full border border-accent/20 bg-accent/[0.03]"
                  >
                     <Award size={16} /> PERFIL CLASIFICADO
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="font-display text-5xl md:text-8xl font-black clash-display tracking-[-0.03em] uppercase leading-[0.9]"
                    style={{ textShadow: "0 0 80px rgba(255,255,255,0.2)" }}
                  >
                     DELEGADO <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent">TOP</span> <br/>
                     Santiago Mujica
                  </motion.h1>
               </div>

               {/* Introduction Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="space-y-6"
                 >
                    <p className="text-xl md:text-2xl font-medium text-text-muted leading-relaxed">
                       La delegación del Bloque Estratégico de Negociación Juvenil e Impulso para las Naciones Unidas dijo:
                    </p>
                    <h3 className="font-display text-4xl font-black text-white italic clash-display">
                       ¡Presente y Votando!
                    </h3>
                    <div className="w-16 h-1 bg-accent/40 rounded-full" />
                    <p className="text-sm tracking-wide text-text-muted leading-loose max-w-lg">
                       En la primera Edición del Modelo de las Naciones Unidas del Colegio Pablo VI de Barquisimeto PAVIMUN. En este modelo nuestra delegación obtuvo los siguientes reconocimientos.
                    </p>
                 </motion.div>

                 {/* Honors / Achievements Box */}
                 <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                 >
                    <div className="glass p-10 rounded-[3rem] border-accent/20 relative space-y-10 group overflow-hidden">
                       <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 blur-[80px]" />
                       
                       <div className="space-y-4">
                          <div className="flex items-center gap-4 text-accent">
                             <Star size={24} fill="currentColor" />
                             <span className="text-xs font-black uppercase tracking-[0.4em]">Trofeo Estratégico</span>
                          </div>
                          <h4 className="text-2xl font-bold font-display uppercase tracking-tighter">
                             Santiago Mujica <br/> <span className="text-accent">1era Mención Honorífica</span>
                          </h4>
                          <p className="text-text-muted text-sm font-medium">En el comité de crisis: Auge y Caída del Petroestado</p>
                       </div>

                       <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />

                       <div className="space-y-4">
                          <div className="flex items-center gap-4 text-accent">
                             <Award size={24} />
                             <span className="text-xs font-black uppercase tracking-[0.4em]">Escrito Sobresaliente</span>
                          </div>
                          <h4 className="text-2xl font-bold font-display uppercase tracking-tighter">
                             Santiago Mujica <br/> <span className="text-accent">Mejor DPO</span>
                          </h4>
                          <p className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">(Documento de Posición Oficial)</p>
                       </div>
                    </div>
                 </motion.div>
               </div>

               {/* Gallery Grid - Using Unsplash placeholders with fallback paths */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.3 }}
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
               >
                 {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="relative group overflow-hidden rounded-3xl aspect-[3/4] glass border-white/5">
                       {/* Try loading specific local images, or falling back */}
                       <img 
                          src={`/assets/${num}.jpg`}
                          onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1556761175-5973fc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`; }}
                          alt={`Santiago Mujica ${num}`}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                       <span className="absolute bottom-6 left-6 text-white/50 text-xs font-black uppercase tracking-[0.4em]">FOTO 0{num}</span>
                    </div>
                 ))}
               </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
