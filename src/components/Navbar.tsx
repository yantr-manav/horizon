
import React, { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Code, User, Settings, Bell, 
  Mic, MicOff, Share, Users, Menu,
  Terminal, Laptop, Cloud, Database
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  onToggleTerminal?: () => void;
}

const Navbar = ({ onToggleTerminal }: NavbarProps) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="glass-panel h-12 md:h-14 flex items-center justify-between px-2 md:px-4 mb-2 md:mb-4 relative">
      <div className="flex items-center">
        <SidebarTrigger />
        <div className="ml-2 md:ml-4 text-cyan-400 font-bold tracking-wider flex items-center">
          <Code className="mr-1 md:mr-2 text-cyan-400 h-4 w-4 md:h-5 md:w-5" />
          <span className="cyber-gradient text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm md:text-base">
            HORIZON CODE
          </span>
          <span className="text-[10px] md:text-xs ml-1 md:ml-2 text-cyan-300/60 hidden sm:inline-block">SYMPHONY</span>
        </div>
      </div>
      
      {/* Center controls (only on desktop) */}
      {!isMobile && (
        <div className="flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
          <button className="px-2 py-0.5 rounded bg-black/30 border border-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-900/20 transition-colors flex items-center">
            <Laptop className="h-3 w-3 mr-1" />
            <span>Local</span>
          </button>
          <button className="px-2 py-0.5 rounded bg-black/30 border border-cyan-500/20 text-gray-400 text-xs hover:bg-cyan-900/20 hover:text-cyan-400 transition-colors flex items-center">
            <Cloud className="h-3 w-3 mr-1" />
            <span>Cloud</span>
          </button>
          <button className="px-2 py-0.5 rounded bg-black/30 border border-cyan-500/20 text-gray-400 text-xs hover:bg-cyan-900/20 hover:text-cyan-400 transition-colors flex items-center">
            <Database className="h-3 w-3 mr-1" />
            <span>Database</span>
          </button>
        </div>
      )}
      
      {isMobile ? (
        // Mobile menu button
        <div className="flex items-center">
          <button 
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5 text-cyan-400" />
          </button>
          
          {/* Mobile dropdown menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 glass-panel z-50 rounded-lg overflow-hidden py-2 w-48">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center"
                onClick={() => setIsMicActive(!isMicActive)}
              >
                {isMicActive ? (
                  <><Mic className="h-4 w-4 mr-2 text-cyan-400" /> Voice Active</>
                ) : (
                  <><MicOff className="h-4 w-4 mr-2 text-gray-400" /> Voice Inactive</>
                )}
              </button>
              
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center">
                <Share className="h-4 w-4 mr-2 text-gray-400" /> Share
              </button>
              
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" /> Collaborate
              </button>
              
              <button 
                className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center"
                onClick={onToggleTerminal}
              >
                <Terminal className="h-4 w-4 mr-2 text-gray-400" /> Terminal
              </button>
              
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center">
                <Bell className="h-4 w-4 mr-2 text-gray-400" /> Notifications
              </button>
              
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 flex items-center">
                <Settings className="h-4 w-4 mr-2 text-gray-400" /> Settings
              </button>
              
              <div className="border-t border-cyan-500/20 mt-2 pt-2 px-4 flex items-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="ml-2 text-sm text-gray-300">Profile</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Desktop navigation
        <div className="flex items-center space-x-1 md:space-x-2">
          <button 
            className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => setIsMicActive(!isMicActive)}
          >
            {isMicActive ? (
              <Mic className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
            ) : (
              <MicOff className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            )}
          </button>
          
          <button className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors">
            <Share className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
          
          <button className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
          
          <button 
            className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={onToggleTerminal}
          >
            <Terminal className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
          
          <button className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors">
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
          
          <button className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors">
            <Settings className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
          
          <div className="ml-2 flex items-center">
            <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
