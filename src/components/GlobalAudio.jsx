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
          if (currentVol < 0.3) { // Max volume 30% to serve as background
            currentVol += 0.02;
            audio.volume = Math.min(currentVol, 0.3);
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      } catch (err) {
        console.warn('Autoplay prevented. Waiting for user interaction.');
        // If autoplay is blocked by browser policies, wait for first interaction
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
            
            document.removeEventListener('click', startOnInteract);
            document.removeEventListener('scroll', startOnInteract);
            document.removeEventListener('mousemove', startOnInteract);
          } catch (e) {
            console.error('Playback failed:', e);
          }
        };
        
        document.addEventListener('click', startOnInteract);
        document.addEventListener('scroll', startOnInteract, { once: true });
        document.addEventListener('mousemove', startOnInteract, { once: true });
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
      className="fixed bottom-6 left-6 z-[200] w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-accent hover:bg-white/5 transition-all duration-300 shadow-xl border border-white/5"
      aria-label="Toggle Global Background Audio"
    >
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
