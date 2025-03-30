
import React, { useState, useEffect } from 'react';
import { Terminal, Zap, Clock, Play, Download, Settings, Lightbulb, Sparkles, Code } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Suggestion {
  id: string;
  text: string;
  type: 'optimization' | 'bug' | 'enhancement' | 'info';
}

const CodeEditor = () => {
  const [code, setCode] = useState(`// Welcome to Horizon Code Symphony
// A next-generation AI coding environment

function fibonacci(n) {
  // Base case
  if (n <= 1) return n;
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the first 10 Fibonacci numbers
const results = [];
for (let i = 0; i < 10; i++) {
  results.push(fibonacci(i));
}

console.log("Fibonacci sequence:", results);
`);
  
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isCodeAnalyzing, setIsCodeAnalyzing] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState({
    timeComplexity: 'O(2^n) - Exponential',
    spaceComplexity: 'O(n) - Linear stack space',
    optimizationPotential: 'High'
  });

  const { 
    isDebugMode, 
    setIsDebugMode, 
    isTerminalOpen, 
    setIsTerminalOpen, 
    isLearningMode, 
    setIsLearningMode 
  } = useAppContext();
  
  const { toast } = useToast();

  // Simulate cursor blinking
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate AI suggestions based on current code
  useEffect(() => {
    // This would be replaced with actual AI processing
    const generateSuggestions = () => {
      setIsCodeAnalyzing(true);
      
      setTimeout(() => {
        const aiSuggestionExamples: Suggestion[] = [
          {
            id: 's1',
            text: "Optimize fibonacci with memoization to improve performance",
            type: 'optimization'
          },
          {
            id: 's2',
            text: "Add error handling for negative inputs in fibonacci function",
            type: 'bug'
          },
          {
            id: 's3',
            text: "Consider using iterative approach instead of recursive for better efficiency",
            type: 'enhancement'
          },
          {
            id: 's4',
            text: "Add JSDoc comments to document function parameters and return values",
            type: 'info'
          },
          {
            id: 's5',
            text: "Extract the sequence generation to a separate helper function",
            type: 'enhancement'
          }
        ];
        
        setSuggestions(aiSuggestionExamples);
        setIsCodeAnalyzing(false);
      }, 1000);
    };
    
    generateSuggestions();
  }, [code]);
  
  // Handle code execution
  const executeCode = () => {
    setIsTerminalOpen(true);
    
    toast({
      title: "Code execution started",
      description: "Your code is now running in the terminal.",
    });
  };
  
  // Start debug visualization
  const startDebugVisualization = () => {
    setIsDebugMode(true);
    
    toast({
      title: "Debug mode activated",
      description: "Visualizing code execution in debug mode.",
    });
  };
  
  // Toggle learning mode
  const toggleLearningMode = () => {
    setIsLearningMode(!isLearningMode);
    
    toast({
      title: isLearningMode ? "Learning mode deactivated" : "Learning mode activated",
      description: isLearningMode ? 
        "You've exited the guided learning experience." : 
        "Step-by-step guidance is now available.",
    });
  };
  
  // Apply suggestion to code
  const applySuggestion = (suggestion: Suggestion) => {
    if (suggestion.type === 'optimization' && suggestion.id === 's1') {
      // Apply memoization optimization
      const optimizedCode = `// Welcome to Horizon Code Symphony
// A next-generation AI coding environment

// Optimized fibonacci with memoization
function fibonacci(n, memo = {}) {
  // Check if we've already calculated this value
  if (n in memo) return memo[n];
  
  // Base case
  if (n <= 1) return n;
  
  // Store the result in our cache
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Calculate the first 10 Fibonacci numbers
const results = [];
for (let i = 0; i < 10; i++) {
  results.push(fibonacci(i));
}

console.log("Fibonacci sequence:", results);
`;
      setCode(optimizedCode);
      
      toast({
        title: "Optimization applied",
        description: "Memoization has been added to improve performance.",
      });
      
      // Update analysis
      setCodeAnalysis({
        timeComplexity: 'O(n) - Linear',
        spaceComplexity: 'O(n) - Linear memo cache',
        optimizationPotential: 'Low'
      });
      
    } else if (suggestion.type === 'bug' && suggestion.id === 's2') {
      // Apply error handling
      const codeWithErrorHandling = `// Welcome to Horizon Code Symphony
// A next-generation AI coding environment

function fibonacci(n, memo = {}) {
  // Input validation for negative numbers
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }
  
  // Check if we've already calculated this value
  if (n in memo) return memo[n];
  
  // Base case
  if (n <= 1) return n;
  
  // Store the result in our cache
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Calculate the first 10 Fibonacci numbers
const results = [];
try {
  for (let i = 0; i < 10; i++) {
    results.push(fibonacci(i));
  }
  console.log("Fibonacci sequence:", results);
} catch (error) {
  console.error("Error:", error.message);
}
`;
      setCode(codeWithErrorHandling);
      
      toast({
        title: "Error handling added",
        description: "Your code now validates inputs and handles errors gracefully.",
      });
    } else {
      toast({
        title: "Suggestion available",
        description: "This suggestion can be applied with a paid subscription.",
      });
    }
  };

  // Format code with syntax highlighting (simplified version)
  const formatCode = (codeStr: string) => {
    const lines = codeStr.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Very simple syntax highlighting (would be replaced with a more robust solution)
      const processedLine = line
        .replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>')
        .replace(/\b(function|const|let|var|return|if|for|while|try|catch|throw|new|Error)\b/g, '<span class="token-keyword">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>')
        .replace(/(["'`].*?["'`])/g, '<span class="token-string">$1</span>')
        .replace(/\b([a-zA-Z]+(?=\())\b/g, '<span class="token-function">$1</span>');
      
      return (
        <div key={lineIndex} className="flex">
          <span className="line-number">{lineIndex + 1}</span>
          <span 
            dangerouslySetInnerHTML={{ __html: processedLine }}
            className="flex-1"
          />
          {cursorPosition.line === lineIndex && cursorVisible && (
            <span className="terminal-cursor"></span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="glass-panel p-2 mb-2">
          <div className="flex items-center text-xs text-gray-400">
            <span className="bg-cyan-400/10 px-2 py-1 rounded text-cyan-400 font-medium">main.js</span>
            <span className="ml-2">JavaScript</span>
            <div className="ml-auto flex space-x-2">
              <button 
                className="p-1 hover:bg-white/5 rounded"
                onClick={toggleLearningMode}
                title="Learning mode"
              >
                <Lightbulb className={`h-4 w-4 ${isLearningMode ? 'text-yellow-400' : 'text-gray-400'}`} />
              </button>
              <button 
                className="p-1 hover:bg-white/5 rounded"
                onClick={startDebugVisualization}
                title="Debug visualization"
              >
                <Sparkles className={`h-4 w-4 ${isDebugMode ? 'text-purple-400' : 'text-gray-400'}`} />
              </button>
              <button 
                className="p-1 hover:bg-white/5 rounded"
                onClick={executeCode}
                title="Run code"
              >
                <Play className="h-4 w-4 text-green-400" />
              </button>
              <button 
                className="p-1 hover:bg-white/5 rounded"
                title="Download code"
              >
                <Download className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 glass-panel overflow-hidden neon-border">
          <ScrollArea className="h-full">
            <div className="code-editor grid-bg p-4">
              {formatCode(code)}
            </div>
          </ScrollArea>
        </div>
        
        <div className="glass-panel mt-2 p-2 flex items-center">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            role="button"
            aria-label={isTerminalOpen ? "Hide terminal" : "Show terminal"}
          >
            <Terminal 
              className={`h-4 w-4 mr-2 ${isTerminalOpen ? 'text-cyan-400' : 'text-gray-400'}`} 
            />
            <span className="text-xs text-gray-400">
              {isTerminalOpen ? "Terminal active" : "Console ready"}
            </span>
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-xs text-gray-400">AI Assistant Active</span>
            <Zap className="h-4 w-4 ml-2 text-cyan-400 animate-pulse-neon" />
          </div>
        </div>
      </div>
      
      <div className="w-80 ml-4 glass-panel p-4 overflow-hidden hidden md:block">
        <ScrollArea className="h-full">
          <div className="mb-4">
            <h3 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              AI Suggestions
            </h3>
            {isCodeAnalyzing ? (
              <div className="flex justify-center items-center py-8">
                <div className="h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-xs text-gray-300">Analyzing code...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    className="text-xs p-2 border border-cyan-500/20 rounded bg-black/20 hover:bg-cyan-900/20 cursor-pointer transition-colors"
                    onClick={() => applySuggestion(suggestion)}
                  >
                    <div className="flex items-start">
                      {suggestion.type === 'optimization' && (
                        <Zap className="h-3 w-3 text-yellow-400 mt-0.5 mr-1.5 flex-shrink-0" />
                      )}
                      {suggestion.type === 'bug' && (
                        <Code className="h-3 w-3 text-red-400 mt-0.5 mr-1.5 flex-shrink-0" />
                      )}
                      {suggestion.type === 'enhancement' && (
                        <Sparkles className="h-3 w-3 text-purple-400 mt-0.5 mr-1.5 flex-shrink-0" />
                      )}
                      {suggestion.type === 'info' && (
                        <Lightbulb className="h-3 w-3 text-cyan-400 mt-0.5 mr-1.5 flex-shrink-0" />
                      )}
                      {suggestion.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="border-t border-cyan-900/30 pt-4 mt-4">
            <h3 className="text-purple-400 text-sm font-medium mb-2 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Code Analysis
            </h3>
            <div className="text-xs text-gray-300">
              <p className="mb-2 flex justify-between">
                <span>Time complexity:</span>
                <span className="text-cyan-300">{codeAnalysis.timeComplexity}</span>
              </p>
              <p className="mb-2 flex justify-between">
                <span>Space complexity:</span>
                <span className="text-cyan-300">{codeAnalysis.spaceComplexity}</span>
              </p>
              <p className="flex justify-between">
                <span>Optimization potential:</span>
                <span className={`${
                  codeAnalysis.optimizationPotential === 'High' 
                    ? 'text-red-400' 
                    : codeAnalysis.optimizationPotential === 'Medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}>
                  {codeAnalysis.optimizationPotential}
                </span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-cyan-900/30 pt-4 mt-4">
            <h3 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Editor Settings
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Auto-indent</span>
                <div className="w-8 h-4 bg-cyan-900/30 rounded-full relative">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full left-4 top-0.5"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Highlight matches</span>
                <div className="w-8 h-4 bg-cyan-900/30 rounded-full relative">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full left-4 top-0.5"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">AI suggestions</span>
                <div className="w-8 h-4 bg-cyan-900/30 rounded-full relative">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full left-4 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CodeEditor;
