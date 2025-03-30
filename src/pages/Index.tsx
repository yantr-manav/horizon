
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import Visualization from '@/components/Visualization';
import VoiceCommand from '@/components/VoiceCommand';
import CollaborationPanel from '@/components/CollaborationPanel';
import AIAssistant from '@/components/AIAssistant';
import { useIsMobile } from '@/hooks/use-mobile';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Terminal } from '@/components/Terminal';
import { AppProvider, useAppContext } from '@/contexts/AppContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LearningMode from '@/components/LearningMode';
import DebugVisualizer from '@/components/DebugVisualizer';
import AmbientSoundSystem from '@/components/AmbientSoundSystem';
import { ScrollArea } from '@/components/ui/scroll-area';

const IndexContent = () => {
  const isMobile = useIsMobile();
  const { isTerminalOpen, isDebugMode } = useAppContext();
  
  // Handle cursor trail effect
  useEffect(() => {
    if (isMobile) return; // Don't create cursor trails on mobile
    
    const trailElements: HTMLDivElement[] = [];
    const maxTrails = 10;
    
    const createTrailElement = () => {
      const element = document.createElement('div');
      element.className = 'cursor-trail';
      document.body.appendChild(element);
      return element;
    };
    
    // Create initial trail elements
    for (let i = 0; i < maxTrails; i++) {
      trailElements.push(createTrailElement());
    }
    
    const updateTrails = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Update each trail element with a delay
      trailElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.left = `${mouseX}px`;
          element.style.top = `${mouseY}px`;
          element.style.opacity = `${1 - index / maxTrails}`;
          element.style.transform = `translate(-50%, -50%) scale(${1 - index / maxTrails})`;
        }, index * 40);
      });
    };
    
    window.addEventListener('mousemove', updateTrails);
    
    return () => {
      window.removeEventListener('mousemove', updateTrails);
      trailElements.forEach(element => {
        element.remove();
      });
    };
  }, [isMobile]);
  
  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <div className="grid-bg w-full h-full fixed inset-0 pointer-events-none"></div>
      
      <div className="flex flex-1 w-full relative z-10">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-auto p-2 md:p-4">
          <Navbar />
          
          {isMobile ? (
            // Mobile layout (stacked)
            <div className="flex-1 flex flex-col gap-4 pb-4">
              <div className="min-h-[300px]">
                <CodeEditor />
              </div>
              
              <div className="min-h-[200px]">
                <Visualization />
              </div>
              
              <div className="min-h-[150px]">
                <AIAssistant />
              </div>
              
              <div className="min-h-[150px]">
                <VoiceCommand />
              </div>
              
              <div className="min-h-[200px] mb-16">
                <CollaborationPanel />
              </div>
            </div>
          ) : (
            // Desktop layout (resizable panels with fixed minimum sizes)
            <div className="flex-1 overflow-auto">
              <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-80px)]">
                <ResizablePanel defaultSize={65} minSize={40} className="flex flex-col">
                  <ResizablePanelGroup direction="vertical" className="flex-1">
                    <ResizablePanel defaultSize={70} minSize={30} className="overflow-hidden">
                      <CodeEditor />
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    {isTerminalOpen && (
                      <>
                        <ResizablePanel defaultSize={30} minSize={15} className="overflow-hidden">
                          <Terminal />
                        </ResizablePanel>
                      </>
                    )}
                  </ResizablePanelGroup>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={35} minSize={25} className="flex flex-col">
                  <ResizablePanelGroup direction="vertical" className="flex-1">
                    <ResizablePanel defaultSize={50} minSize={30} className="overflow-hidden">
                      <Visualization />
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    <ResizablePanel defaultSize={50} minSize={20} className="flex flex-col space-y-4">
                      <div className="flex-1">
                        <AIAssistant />
                      </div>
                      
                      <div className="flex-1">
                        <VoiceCommand />
                      </div>
                      
                      <div className="flex-1">
                        <CollaborationPanel />
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          )}
        </div>
      </div>
      
      {/* Learning Mode Component (conditionally rendered) */}
      <LearningMode />
      
      {/* Debug Visualizer (conditionally rendered) */}
      {isDebugMode && <DebugVisualizer />}
      
      {/* Audio system for ambient sounds */}
      <AmbientSoundSystem />
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <SidebarProvider>
        <IndexContent />
      </SidebarProvider>
    </AppProvider>
  );
};

export default Index;
