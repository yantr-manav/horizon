
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'cyberpunk' | 'hacker' | 'dark' | 'neon';
export type SoundTheme = 'rain' | 'lofi' | 'cyberwave' | 'silence';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  soundTheme: SoundTheme;
  setSoundTheme: (sound: SoundTheme) => void;
  isSoundPlaying: boolean;
  setIsSoundPlaying: (isPlaying: boolean) => void;
  isLearningMode: boolean;
  setIsLearningMode: (isLearning: boolean) => void;
  isDebugMode: boolean;
  setIsDebugMode: (isDebug: boolean) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (isOpen: boolean) => void;
  isMultiplayerMode: boolean;
  setIsMultiplayerMode: (isMultiplayer: boolean) => void;
  isPresentationMode: boolean;
  setIsPresentationMode: (isPresentation: boolean) => void;
  currentUserId: string;
  currentUsername: string;
  setCurrentUsername: (username: string) => void;
}

const defaultContext: AppContextType = {
  theme: 'cyberpunk',
  setTheme: () => {},
  soundTheme: 'silence',
  setSoundTheme: () => {},
  isSoundPlaying: false,
  setIsSoundPlaying: () => {},
  isLearningMode: false,
  setIsLearningMode: () => {},
  isDebugMode: false,
  setIsDebugMode: () => {},
  isTerminalOpen: false,
  setIsTerminalOpen: () => {},
  isMultiplayerMode: false,
  setIsMultiplayerMode: () => {},
  isPresentationMode: false,
  setIsPresentationMode: () => {},
  currentUserId: 'user-' + Math.random().toString(36).substr(2, 9),
  currentUsername: 'Coder',
  setCurrentUsername: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export function useAppContext() {
  return useContext(AppContext);
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('cyberpunk');
  const [soundTheme, setSoundTheme] = useState<SoundTheme>('silence');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMultiplayerMode, setIsMultiplayerMode] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentUserId] = useState('user-' + Math.random().toString(36).substr(2, 9));
  const [currentUsername, setCurrentUsername] = useState('Coder');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    soundTheme,
    setSoundTheme,
    isSoundPlaying,
    setIsSoundPlaying,
    isLearningMode,
    setIsLearningMode,
    isDebugMode,
    setIsDebugMode,
    isTerminalOpen,
    setIsTerminalOpen,
    isMultiplayerMode,
    setIsMultiplayerMode,
    isPresentationMode,
    setIsPresentationMode,
    currentUserId,
    currentUsername,
    setCurrentUsername,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
