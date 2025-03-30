
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/contexts/AppContext';

const AmbientSoundSystem = () => {
  const { soundTheme, isSoundPlaying } = useAppContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize or update audio element based on selected theme
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    
    // Update source based on theme
    if (soundTheme !== 'silence') {
      const sources = {
        rain: 'https://freesound.org/data/previews/346/346170_5861240-lq.mp3', // Gentle rain ambience
        lofi: 'https://freesound.org/data/previews/519/519233_7724198-lq.mp3', // Lo-fi beat
        cyberwave: 'https://freesound.org/data/previews/167/167563_2026065-lq.mp3', // Cyberpunk-ish sound
      };
      
      // Set source if available for theme
      if (sources[soundTheme as keyof typeof sources]) {
        audioRef.current.src = sources[soundTheme as keyof typeof sources];
      }
    }
    
    // Handle playback state
    if (isSoundPlaying && soundTheme !== 'silence') {
      audioRef.current.play().catch(error => {
        console.error('Audio playback error:', error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundTheme, isSoundPlaying]);
  
  // This component doesn't render anything visible
  return null;
};

export default AmbientSoundSystem;
