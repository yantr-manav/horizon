
import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Paintbrush, Moon, Zap, Monitor, Volume2, VolumeX, Music, Cloud, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ThemeSwitcher = () => {
  const { 
    theme, 
    setTheme, 
    soundTheme, 
    setSoundTheme, 
    isSoundPlaying, 
    setIsSoundPlaying 
  } = useAppContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const themes = [
    { id: 'cyberpunk', name: 'Cyberpunk', icon: <Zap size={16} />, color: 'bg-cyan-400' },
    { id: 'hacker', name: 'Hacker', icon: <Moon size={16} />, color: 'bg-green-400' },
    { id: 'dark', name: 'Dark', icon: <Moon size={16} />, color: 'bg-purple-400' },
    { id: 'neon', name: 'Neon', icon: <Zap size={16} />, color: 'bg-pink-400' },
  ];
  
  const soundThemes = [
    { id: 'rain', name: 'Rainfall', icon: <Cloud size={16} /> },
    { id: 'lofi', name: 'Lo-Fi Beats', icon: <Music size={16} /> },
    { id: 'cyberwave', name: 'Cyberwave', icon: <Zap size={16} /> },
    { id: 'silence', name: 'Silence', icon: <VolumeX size={16} /> },
  ];
  
  const toggleSoundPlayback = () => {
    if (soundTheme === 'silence') {
      toast({
        title: "No sound selected",
        description: "Please select a sound theme first.",
      });
      return;
    }
    
    setIsSoundPlaying(!isSoundPlaying);
    
    toast({
      title: isSoundPlaying ? "Sound paused" : "Sound playing",
      description: `${isSoundPlaying ? 'Paused' : 'Now playing'} ${
        soundThemes.find(s => s.id === soundTheme)?.name
      }`,
    });
  };
  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any);
    toast({
      title: "Theme changed",
      description: `Theme changed to ${
        themes.find(t => t.id === newTheme)?.name
      }`,
    });
  };
  
  const handleSoundThemeChange = (newSound: string) => {
    setSoundTheme(newSound as any);
    toast({
      title: "Sound theme changed",
      description: `Sound theme changed to ${
        soundThemes.find(s => s.id === newSound)?.name
      }`,
    });
    
    if (newSound !== 'silence' && !isSoundPlaying) {
      setIsSoundPlaying(true);
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        title="Customize theme"
      >
        <Paintbrush size={18} className="text-cyan-400" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg glass-panel shadow-lg z-50">
          <div className="p-3 border-b border-white/10">
            <h3 className="text-xs font-medium text-cyan-400">Appearance</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`flex items-center px-3 py-2 text-xs rounded ${
                    theme === t.id ? 'bg-white/10 border border-cyan-500/30' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${t.color} mr-2`}></span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-3">
            <h3 className="text-xs font-medium text-cyan-400 flex items-center justify-between">
              <span>Sound Atmosphere</span>
              <button
                onClick={toggleSoundPlayback}
                className="p-1 rounded hover:bg-white/10"
                disabled={soundTheme === 'silence'}
              >
                {isSoundPlaying ? 
                  <Pause size={14} className="text-cyan-400" /> : 
                  <Play size={14} className="text-gray-400" />
                }
              </button>
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {soundThemes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSoundThemeChange(s.id)}
                  className={`flex items-center px-3 py-2 text-xs rounded ${
                    soundTheme === s.id ? 'bg-white/10 border border-cyan-500/30' : 'hover:bg-white/5'
                  }`}
                >
                  {React.cloneElement(s.icon, { 
                    className: soundTheme === s.id ? 'text-cyan-400 mr-2' : 'text-gray-400 mr-2' 
                  })}
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
