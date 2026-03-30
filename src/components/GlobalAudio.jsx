import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import gargolaAudio from '../assets/gargola.mp3';

export default function GlobalAudio() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(gargolaAudio);
    audio.loop = true;
    audio.volume = 0; // Initialize at 0 for fade-in effect
    audioRef.current = audio;

    const attemptPlay = async () => {
      try {
        await audio.play();
        // Fade in effect
        let currentVol = 0;
        const fadeInterval = setInterval(() => {
          if (currentVol < 0.3) {
            currentVol += 0.02;
            audio.volume = Math.min(currentVol, 0.3);
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      } catch (err) {
        // If autoplay is blocked by browser policies, wait for absolute strictly first interaction
        const startOnInteract = async () => {
          try {
            audio.volume = 0;
            await audio.play();
            
            // Fade in effect after interact
            let currentVol = 0;
            const fadeInterval = setInterval(() => {
              if (currentVol < 0.3) {
                currentVol += 0.05;
                audio.volume = Math.min(currentVol, 0.3);
              } else {
                clearInterval(fadeInterval);
              }
            }, 100);
            
            ['click', 'scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => {
              document.removeEventListener(evt, startOnInteract);
            });
          } catch (e) {
            // silent ignore if failing
          }
        };
        
        ['click', 'scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => {
           document.addEventListener(evt, startOnInteract, { once: true });
        });
      }
    };

    attemptPlay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleForceMute = () => {
      if (audioRef.current && !isMuted) {
        // Fade out
        let vol = audioRef.current.volume;
        const fadeOut = setInterval(() => {
          if (vol > 0.05) {
            vol -= 0.05;
            audioRef.current.volume = vol;
          } else {
            audioRef.current.volume = 0;
            audioRef.current.muted = true;
            setIsMuted(true);
            clearInterval(fadeOut);
          }
        }, 100);
      }
    };

    window.addEventListener('mute-global-audio', handleForceMute);
    return () => {
      window.removeEventListener('mute-global-audio', handleForceMute);
    };
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <button 
      onClick={toggleMute}
      className="fixed bottom-28 right-6 md:bottom-6 md:left-6 md:top-auto md:right-auto z-[200] w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-accent hover:bg-white/5 transition-all duration-300 shadow-xl border border-white/5"
      aria-label="Toggle Global Background Audio"
    >
      {isMuted ? <VolumeX size={16} className="md:w-[18px]" /> : <Volume2 size={16} className="md:w-[18px]" />}
    </button>
  );
}
