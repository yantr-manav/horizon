
import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Send, UserPlus, GitBranch, GitMerge, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const CollaborationPanel = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alex Chen', message: 'I just pushed a new update to the function', time: '10:30 AM', color: 'from-green-400 to-cyan-500', isNew: false },
    { id: 2, user: 'AI Assistant', message: 'I suggest optimizing the loop in line 23 for better performance', time: '10:32 AM', color: 'from-cyan-400 to-blue-500', isNew: false },
  ]);
  
  // Mock collaborators data
  const collaborators = [
    { id: 1, name: 'Alex Chen', status: 'online', avatar: 'A', color: 'from-green-400 to-cyan-500', lastActive: 'Now' },
    { id: 2, name: 'Morgan Wu', status: 'offline', avatar: 'M', color: 'from-purple-400 to-pink-500', lastActive: '2h ago' },
    { id: 3, name: 'AI Assistant', status: 'online', avatar: 'AI', color: 'from-cyan-400 to-blue-500', lastActive: 'Now' },
  ];
  
  // Mock changes
  const changes = [
    { id: 1, user: 'Alex Chen', type: 'commit', message: 'Add authentication logic', time: '1h ago', color: 'from-green-400 to-cyan-500' },
    { id: 2, user: 'Morgan Wu', type: 'branch', message: 'Created branch feature/ui-updates', time: '3h ago', color: 'from-purple-400 to-pink-500' },
    { id: 3, user: 'System', type: 'merge', message: 'Merged PR #42: Fix login validation', time: '1d ago', color: 'from-gray-400 to-gray-500' },
  ];
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Add new message
    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'from-purple-400 to-pink-500',
      isNew: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        user: 'AI Assistant',
        message: getAIResponse(message),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        color: 'from-cyan-400 to-blue-500',
        isNew: true
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Mark messages as not new after a delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => ({ ...msg, isNew: false }))
        );
      }, 2000);
      
    }, 1500);
  };
  
  // Simple AI response generator
  const getAIResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'Hello! How can I assist with your code today?';
    }
    
    if (lowerMsg.includes('help') || lowerMsg.includes('problem')) {
      return 'I\'d be happy to help. Could you share more details about what you\'re working on?';
    }
    
    if (lowerMsg.includes('bug') || lowerMsg.includes('error') || lowerMsg.includes('issue')) {
      return 'Let\'s debug this. Have you checked the console for error messages?';
    }
    
    if (lowerMsg.includes('feature') || lowerMsg.includes('implement')) {
      return 'That sounds like an interesting feature. Let\'s break it down into smaller tasks.';
    }
    
    return 'I see. Let me know if you need any specific help with your code.';
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="glass-panel p-1 md:p-2 mb-1 md:mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-3 w-3 md:h-4 md:w-4 text-cyan-400 mr-1 md:mr-2" />
          <h3 className="text-cyan-400 text-xs md:text-sm font-medium">Collaboration</h3>
        </div>
        
        {!isMobile && (
          <div className="flex space-x-1">
            <button 
              className={`text-[10px] px-2 py-0.5 rounded ${activeTab === 'chat' ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
            <button 
              className={`text-[10px] px-2 py-0.5 rounded ${activeTab === 'team' ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
            <button 
              className={`text-[10px] px-2 py-0.5 rounded ${activeTab === 'changes' ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
              onClick={() => setActiveTab('changes')}
            >
              Changes
            </button>
          </div>
        )}
      </div>
      
      <div className="glass-panel flex-1 neon-border overflow-hidden flex flex-col">
        {isMobile ? (
          // Mobile layout - focus on chat
          <div className="flex flex-col h-full">
            <div className="p-2 flex items-center justify-between border-b border-cyan-900/30">
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-cyan-400 mr-1" />
                <h4 className="text-xs text-gray-300">Team Chat</h4>
              </div>
              <button className="text-cyan-400 text-xs flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                {collaborators.filter(c => c.status === 'online').length} online
              </button>
            </div>
            
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-2">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isNew ? 'animate-pulse-fast' : ''}`}
                  >
                    <div className={`h-5 w-5 md:h-6 md:w-6 rounded-full bg-gradient-to-r ${message.color} flex items-center justify-center text-white text-[10px] md:text-xs font-medium shrink-0`}>
                      {message.user.charAt(0)}
                    </div>
                    <div className="ml-1 md:ml-2 bg-black/20 p-1 md:p-2 rounded text-xs md:text-sm text-gray-200 flex-1">
                      <div className="flex justify-between items-center mb-0.5 md:mb-1">
                        <span className="font-medium text-[10px] md:text-xs">{message.user}</span>
                        <span className="text-[8px] md:text-xs text-gray-400">{message.time}</span>
                      </div>
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-2">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="cyber-input w-full text-xs py-1 pr-7"
                />
                <button 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    message.trim() ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500'
                  }`}
                  onClick={sendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-3 w-3 md:h-4 md:w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout with tabs
          <div className="flex flex-col h-full">
            {activeTab === 'team' && (
              <ScrollArea className="h-full">
                <div className="p-3 md:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs md:text-sm text-gray-300">Active Collaborators</h4>
                    <button className="text-[10px] text-cyan-400 flex items-center">
                      <UserPlus className="h-3 w-3 mr-1" />
                      Invite
                    </button>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    {collaborators.map(user => (
                      <div key={user.id} className="flex items-center p-2 rounded hover:bg-white/5">
                        <div className={`h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r ${user.color} flex items-center justify-center text-white text-[10px] md:text-xs font-medium`}>
                          {user.avatar}
                        </div>
                        <div className="ml-2 md:ml-3">
                          <p className="text-xs md:text-sm text-white flex items-center">
                            {user.name}
                            <span className={`ml-2 w-1.5 h-1.5 rounded-full ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-400">Last active: {user.lastActive}</p>
                        </div>
                        <div className="ml-auto">
                          <button className="text-[10px] px-2 py-0.5 rounded border border-cyan-500/20 text-cyan-400 hover:bg-cyan-900/20">
                            Message
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 border border-dashed border-cyan-900/30 rounded">
                    <h5 className="text-xs text-gray-300 mb-2">Permissions</h5>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span>View code</span>
                        <span className="text-green-400">Everyone</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span>Edit code</span>
                        <span className="text-yellow-400">Team members</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span>Merge changes</span>
                        <span className="text-red-400">Admin only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
            
            {activeTab === 'changes' && (
              <ScrollArea className="h-full">
                <div className="p-3 md:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs md:text-sm text-gray-300">Recent Changes</h4>
                    <div className="flex items-center text-[10px] text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Updated 2m ago
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {changes.map(change => (
                      <div key={change.id} className="flex p-2 rounded hover:bg-white/5">
                        <div className="mt-1">
                          {change.type === 'commit' && (
                            <div className={`h-5 w-5 rounded-full bg-gradient-to-r ${change.color} flex items-center justify-center`}>
                              <GitBranch className="h-3 w-3 text-white" />
                            </div>
                          )}
                          {change.type === 'branch' && (
                            <div className={`h-5 w-5 rounded-full bg-gradient-to-r ${change.color} flex items-center justify-center`}>
                              <GitBranch className="h-3 w-3 text-white" />
                            </div>
                          )}
                          {change.type === 'merge' && (
                            <div className={`h-5 w-5 rounded-full bg-gradient-to-r ${change.color} flex items-center justify-center`}>
                              <GitMerge className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-white">{change.user}</span>
                            <span className="text-[10px] text-gray-400">{change.time}</span>
                          </div>
                          <p className="text-[10px] text-gray-300">{change.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full py-1.5 text-[10px] rounded bg-cyan-900/20 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-900/30">
                      View All Changes
                    </button>
                  </div>
                </div>
              </ScrollArea>
            )}
            
            {activeTab === 'chat' && (
              <>
                <ScrollArea className="flex-1">
                  <div className="p-3 md:p-4 space-y-3">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isNew ? 'animate-pulse-fast' : ''}`}
                      >
                        <div className={`h-6 w-6 md:h-7 md:w-7 rounded-full bg-gradient-to-r ${message.color} flex items-center justify-center text-white text-[10px] md:text-xs font-medium shrink-0`}>
                          {message.user.charAt(0)}
                        </div>
                        <div className="ml-2 md:ml-3 bg-black/20 p-2 md:p-3 rounded text-xs md:text-sm text-gray-200 flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-[10px] md:text-xs">{message.user}</span>
                            <span className="text-[8px] md:text-xs text-gray-400">{message.time}</span>
                          </div>
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-3 md:p-4 border-t border-cyan-900/30">
                  <div className="relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="cyber-input w-full text-xs md:text-sm py-1.5 md:py-2 pr-8"
                    />
                    <button 
                      className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                        message.trim() ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500'
                      }`}
                      onClick={sendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-3 w-3 md:h-4 md:w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPanel;
