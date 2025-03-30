
import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Terminal, Volume2, VolumeX, Mic, Code, GraduationCap, Sparkles } from 'lucide-react';

// This component extends the Navbar functionality without modifying the original
const NavbarExtension = () => {
  const { 
    isTerminalOpen, 
    setIsTerminalOpen,
    isSoundPlaying,
    setIsSoundPlaying,
    isLearningMode,
    setIsLearningMode,
    isDebugMode,
    setIsDebugMode
  } = useAppContext();
  
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setIsLearningMode(!isLearningMode)}
        className={`p-2 rounded-full hover:bg-white/10 ${isLearningMode ? 'text-yellow-400' : 'text-gray-400'}`}
        title={isLearningMode ? "Exit learning mode" : "Enter learning mode"}
      >
        <GraduationCap size={18} />
      </button>
      
      <button
        onClick={() => setIsDebugMode(!isDebugMode)}
        className={`p-2 rounded-full hover:bg-white/10 ${isDebugMode ? 'text-purple-400' : 'text-gray-400'}`}
        title={isDebugMode ? "Exit debug visualization" : "Debug visualization"}
      >
        <Sparkles size={18} />
      </button>
      
      <button
        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
        className={`p-2 rounded-full hover:bg-white/10 ${isTerminalOpen ? 'text-cyan-400' : 'text-gray-400'}`}
        title={isTerminalOpen ? "Hide terminal" : "Show terminal"}
      >
        <Terminal size={18} />
      </button>
      
      <button
        onClick={() => setIsSoundPlaying(!isSoundPlaying)}
        className={`p-2 rounded-full hover:bg-white/10 ${isSoundPlaying ? 'text-cyan-400' : 'text-gray-400'}`}
        title={isSoundPlaying ? "Mute sounds" : "Enable sounds"}
      >
        {isSoundPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      
      <ThemeSwitcher />
    </div>
  );
};

export default NavbarExtension;
