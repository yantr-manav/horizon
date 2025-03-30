
import React from 'react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';

import { 
  Code, FileCode, Terminal, Play, 
  Database, Settings, HelpCircle, Book,
  Users, Share, Zap, FileText
} from 'lucide-react';

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-cyan-900/30 bg-cyber-dark-blue">
      <SidebarHeader className="flex h-14 items-center border-b border-cyan-900/30 px-4">
        <Code className="h-6 w-6 text-cyan-400 mr-2" />
        <span className="text-cyan-400 font-bold">Horizon IDE</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-cyan-400/70">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <FileCode className="h-4 w-4 mr-3 text-cyan-400" />
                    <span>Editor</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <Terminal className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Terminal</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <Play className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Run & Debug</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <Database className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Database</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-cyan-400/70">AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <Zap className="h-4 w-4 mr-3 text-purple-400" />
                    <span>AI Assistant</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <FileText className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Auto-Documentation</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-cyan-400/70">Collaboration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <Users className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Live Share</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center py-2">
                    <Share className="h-4 w-4 mr-3 text-gray-400" />
                    <span>Export Project</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-cyan-900/30 p-4">
        <div className="flex space-x-4 text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">
            <Settings className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors">
            <Book className="h-5 w-5" />
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
