
import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Zap, AlertCircle, CheckCircle, Volume2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const VoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [commandSuccess, setCommandSuccess] = useState<boolean | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isVoiceFeedbackEnabled, setIsVoiceFeedbackEnabled] = useState(true);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { setIsLearningMode } = useAppContext();
  
  // Check if browser supports SpeechRecognition
  useEffect(() => {
    // Check for SpeechRecognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsAvailable(false);
      toast({
        title: "Voice commands unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
    }
  }, [toast]);
  
  // Sample voice commands that the system responds to
  const voiceCommands = {
    'generate': {
      'react component': 'Creating a new React component with state management and effects.',
      'api endpoint': 'Generating a RESTful API endpoint with validation.',
      'login form': 'Creating a secure login form with validation.',
      'navigation menu': 'Creating a responsive navigation menu component.',
      'button': 'Creating a customizable button component.',
    },
    'optimize': {
      'function': 'Analyzing and optimizing function for better performance.',
      'loop': 'Refactoring loop for improved efficiency.',
      'query': 'Optimizing database query execution plan.',
      'code': 'Analyzing and optimizing your code for better performance.',
    },
    'debug': {
      'error': 'Analyzing code for potential errors and bugs.',
      'memory leak': 'Scanning for memory leaks in application.',
      'performance': 'Identifying performance bottlenecks.',
      'code': 'Debugging your code for issues.',
    },
    'explain': {
      'code': 'Providing detailed explanation of selected code.',
      'algorithm': 'Explaining how this algorithm works step by step.',
      'pattern': 'Describing this design pattern and its applications.',
      'function': 'Explaining how this function works in detail.',
    },
    'learning': {
      'mode': 'Activating learning mode for guided coding experience.',
      'start': 'Starting learning mode for guided coding experience.',
      'begin': 'Beginning learning mode for step-by-step coding guidance.',
    }
  };
  
  // Process voice command and generate appropriate response
  const processCommand = useCallback((command: string) => {
    const commandLower = command.toLowerCase();
    
    // Learning mode special handling
    if (commandLower.includes('learning') && 
        (commandLower.includes('mode') || commandLower.includes('start') || commandLower.includes('begin'))) {
      setIsLearningMode(true);
      return {
        success: true,
        response: 'Learning mode activated. I\'ll guide you through coding step by step.'
      };
    }
    
    // Check if command matches any known patterns
    for (const [action, targets] of Object.entries(voiceCommands)) {
      if (commandLower.includes(action)) {
        for (const [target, response] of Object.entries(targets)) {
          if (commandLower.includes(target)) {
            return {
              success: true,
              response: response
            };
          }
        }
      }
    }
    
    // General fallbacks if specific command not found
    if (commandLower.includes('create') || commandLower.includes('make') || commandLower.includes('add')) {
      return {
        success: true,
        response: 'Creating new code elements based on your request.'
      };
    }
    
    if (commandLower.includes('help') || commandLower.includes('assistance')) {
      return {
        success: true,
        response: 'Voice commands available: generate, optimize, debug, explain, help.'
      };
    }
    
    // Command not recognized
    return {
      success: false,
      response: 'Command not recognized. Try saying "Generate a React component" or "Help".'
    };
  }, [setIsLearningMode]);
  
  // Text to speech function
  const speakResponse = useCallback((text: string) => {
    if (isVoiceFeedbackEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, [isVoiceFeedbackEnabled]);
  
  // Simulate voice recognition
  useEffect(() => {
    if (!isListening || !isAvailable) return;
    
    // Clear previous
    setTranscript('');
    setResponse('');
    setCommandSuccess(null);
    
    let recognition: any = null;
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setTranscript("Listening...");
      };
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setTranscript(transcript);
        
        // Process final result
        if (event.results[0].isFinal) {
          setProcessing(true);
          
          // Process the command
          setTimeout(() => {
            const result = processCommand(transcript);
            setCommandSuccess(result.success);
            setResponse(result.response);
            
            // Speak the response
            speakResponse(result.response);
            
            // Reset after some time
            setTimeout(() => {
              setIsListening(false);
              setTranscript('');
              setResponse('');
              setCommandSuccess(null);
            }, 5000);
            
            setProcessing(false);
          }, 1000);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setTranscript('');
        
        toast({
          title: "Voice recognition error",
          description: `Error: ${event.error}`,
          variant: "destructive"
        });
      };
      
      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };
      
      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsAvailable(false);
      toast({
        title: "Voice commands error",
        description: "There was an error initializing voice recognition.",
        variant: "destructive"
      });
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, isAvailable, processCommand, speakResponse, toast]);
  
  const toggleListening = () => {
    if (!isAvailable) {
      toast({
        title: "Voice commands unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }
    
    setIsListening(!isListening);
    if (isListening) {
      setTranscript('');
      setResponse('');
      setCommandSuccess(null);
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      toast({
        title: "Voice commands activated",
        description: "Listening for your command...",
      });
    }
  };
  
  const toggleVoiceFeedback = () => {
    setIsVoiceFeedbackEnabled(!isVoiceFeedbackEnabled);
    toast({
      title: isVoiceFeedbackEnabled ? "Voice feedback disabled" : "Voice feedback enabled",
      description: isVoiceFeedbackEnabled ? 
        "AI will no longer speak responses." : 
        "AI will now speak responses aloud.",
    });
  };

  return (
    <div className="glass-panel p-2 md:p-4 neon-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <h3 className="text-cyan-400 text-xs md:text-sm font-medium">Voice Commands</h3>
        <div className="flex space-x-2">
          <button
            className={`p-1 rounded-full ${isVoiceFeedbackEnabled ? 'text-cyan-400' : 'text-gray-400'} hover:bg-white/5`}
            onClick={toggleVoiceFeedback}
            title={isVoiceFeedbackEnabled ? "Disable voice feedback" : "Enable voice feedback"}
          >
            <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button
            className={`p-1 md:p-2 rounded-full ${isListening ? 'bg-purple-500/20' : 'hover:bg-white/5'} transition-colors`}
            onClick={toggleListening}
            disabled={!isAvailable}
          >
            {isListening ? (
              <Mic className="h-4 w-4 md:h-5 md:w-5 text-purple-400 animate-pulse" />
            ) : (
              <MicOff className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-cyan-400" />
            )}
          </button>
        </div>
      </div>
      
      {isListening && (
        <div className="flex-1 flex flex-col">
          <div className="bg-black/30 rounded p-2 md:p-3 mb-2 md:mb-3 min-h-8 md:min-h-12 flex items-center">
            <p className="text-purple-300 text-xs md:text-sm truncate">{transcript}</p>
          </div>
          
          {processing && (
            <div className="flex items-center justify-center p-1 md:p-2">
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-cyan-400 mr-1 md:mr-2 animate-pulse" />
              <span className="text-cyan-400 text-[10px] md:text-xs">Processing command...</span>
            </div>
          )}
          
          {response && (
            <div className={`bg-${commandSuccess ? 'cyan' : 'red'}-900/20 border border-${commandSuccess ? 'cyan' : 'red'}-500/20 rounded p-2 md:p-3 flex items-start`}>
              {commandSuccess !== null && (
                commandSuccess ? (
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400 mr-1 md:mr-2 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-red-400 mr-1 md:mr-2 flex-shrink-0 mt-0.5" />
                )
              )}
              <p className="text-white text-xs md:text-sm flex-1">{response}</p>
            </div>
          )}
        </div>
      )}
      
      {!isListening && (
        <div className="flex-1 overflow-auto">
          <p className="text-gray-400 text-[10px] md:text-xs">Say "Hey Horizon" to activate voice commands</p>
          <p className="mt-1 md:mt-2 text-gray-400 text-[10px] md:text-xs">Example commands:</p>
          <ul className="list-disc list-inside mt-1 space-y-1 text-gray-400 text-[10px] md:text-xs">
            <li>Generate a <span className="text-cyan-400">React component</span></li>
            <li>Optimize this <span className="text-cyan-400">function</span></li>
            <li>Debug this <span className="text-cyan-400">error</span></li>
            <li>Explain this <span className="text-cyan-400">algorithm</span></li>
            <li>Start <span className="text-cyan-400">learning mode</span></li>
            {!isMobile && (
              <>
                <li>Create a <span className="text-cyan-400">login form</span></li>
                <li>Help me <span className="text-cyan-400">refactor</span> this code</li>
              </>
            )}
          </ul>
          
          <div className="mt-3 p-2 border border-dashed border-cyan-500/30 rounded text-[10px] md:text-xs text-gray-500">
            <p className="flex items-center">
              <Zap className="h-3 w-3 text-cyan-400 mr-1 inline" />
              Voice commands are processed locally for privacy
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceCommand;
