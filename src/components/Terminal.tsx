
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, XCircle, Copy, Trash, Download, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

export const Terminal = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Horizon Terminal v1.0.0',
    'Type "help" for available commands',
    '> '
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { setIsTerminalOpen } = useAppContext();
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalOutput]);

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;
    
    const newOutput = [...terminalOutput];
    newOutput[newOutput.length - 1] = `> ${command}`;
    
    // Add command to history
    if (command.trim() !== '') {
      setCommandHistory(prev => [command, ...prev.slice(0, 19)]);
      setHistoryIndex(-1);
    }
    
    // Process commands
    switch (command.toLowerCase()) {
      case 'help':
        newOutput.push('Available commands:');
        newOutput.push('  help - Show this help message');
        newOutput.push('  clear - Clear terminal');
        newOutput.push('  run - Execute current code');
        newOutput.push('  debug - Start debug session');
        newOutput.push('  version - Show version information');
        newOutput.push('  npm [command] - Run npm commands (e.g., npm install react)');
        newOutput.push('  git [command] - Run git commands (e.g., git status)');
        newOutput.push('  ls - List files in current directory');
        newOutput.push('  cat [file] - Display file contents');
        newOutput.push('  echo [text] - Print text to terminal');
        newOutput.push('  exit - Close terminal');
        break;
      case 'clear':
        setTerminalOutput(['Horizon Terminal v1.0.0', '> ']);
        setCurrentInput('');
        return;
      case 'exit':
        setIsTerminalOpen(false);
        return;
      case 'run':
        setIsExecuting(true);
        newOutput.push('Running code...');
        
        // Simulate code execution
        await new Promise(resolve => setTimeout(resolve, 800));
        newOutput.push('Compilation successful!');
        newOutput.push('Output:');
        newOutput.push('Hello, Horizon Code!');
        setIsExecuting(false);
        break;
      case 'debug':
        setIsExecuting(true);
        newOutput.push('Starting debug session...');
        
        // Simulate debug process
        await new Promise(resolve => setTimeout(resolve, 600));
        newOutput.push('Breakpoints set.');
        await new Promise(resolve => setTimeout(resolve, 400));
        newOutput.push('Variables initialized.');
        await new Promise(resolve => setTimeout(resolve, 300));
        newOutput.push('Debug session active. Use step/continue commands.');
        setIsExecuting(false);
        break;
      case 'version':
        newOutput.push('Horizon Code Symphony v1.0.0');
        newOutput.push('Build: 20250330-1');
        newOutput.push('Engine: HCS Runtime v2.4.2');
        newOutput.push('Node: v18.12.1');
        break;
      case 'ls':
        newOutput.push('main.js');
        newOutput.push('styles.css');
        newOutput.push('index.html');
        newOutput.push('package.json');
        newOutput.push('README.md');
        break;
      default:
        if (command.startsWith('npm ')) {
          const npmCommand = command.substring(4);
          setIsExecuting(true);
          newOutput.push(`Executing npm command: ${npmCommand}...`);
          
          // Simulate npm command execution
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          if (npmCommand.includes('install')) {
            newOutput.push('Installing packages...');
            await new Promise(resolve => setTimeout(resolve, 800));
            newOutput.push('+ react@18.2.0');
            await new Promise(resolve => setTimeout(resolve, 200));
            newOutput.push('+ react-dom@18.2.0');
            await new Promise(resolve => setTimeout(resolve, 300));
            newOutput.push('added 3 packages in 1.2s');
          } else if (npmCommand.includes('start')) {
            newOutput.push('Starting development server...');
            await new Promise(resolve => setTimeout(resolve, 800));
            newOutput.push('Compiled successfully!');
            newOutput.push('Server running at http://localhost:3000/');
          } else {
            newOutput.push(`npm command '${npmCommand}' completed successfully.`);
          }
          setIsExecuting(false);
        } else if (command.startsWith('git ')) {
          const gitCommand = command.substring(4);
          setIsExecuting(true);
          newOutput.push(`Executing git command: ${gitCommand}...`);
          
          // Simulate git command execution
          await new Promise(resolve => setTimeout(resolve, 800));
          
          if (gitCommand === 'status') {
            newOutput.push('On branch main');
            newOutput.push('Your branch is up to date with \'origin/main\'.');
            newOutput.push('Changes not staged for commit:');
            newOutput.push('  modified:   src/components/CodeEditor.tsx');
            newOutput.push('  modified:   src/components/Terminal.tsx');
          } else if (gitCommand.startsWith('commit')) {
            newOutput.push('[main 5a7e8f9] ' + (gitCommand.includes('-m') ? gitCommand.split('-m')[1].trim() : 'Commit changes'));
            newOutput.push('2 files changed, 45 insertions(+), 12 deletions(-)');
          } else {
            newOutput.push(`git command '${gitCommand}' completed successfully.`);
          }
          setIsExecuting(false);
        } else if (command.startsWith('echo ')) {
          const message = command.substring(5);
          newOutput.push(message);
        } else if (command.startsWith('cat ')) {
          const fileName = command.substring(4).trim();
          if (fileName === 'main.js') {
            newOutput.push('// Main JavaScript file');
            newOutput.push('function calculateFibonacci(n) {');
            newOutput.push('  if (n <= 1) return n;');
            newOutput.push('  return calculateFibonacci(n-1) + calculateFibonacci(n-2);');
            newOutput.push('}');
            newOutput.push('');
            newOutput.push('console.log("Fibonacci(10) =", calculateFibonacci(10));');
          } else if (fileName === 'package.json') {
            newOutput.push('{');
            newOutput.push('  "name": "horizon-code-project",');
            newOutput.push('  "version": "1.0.0",');
            newOutput.push('  "description": "Next-gen coding experience",');
            newOutput.push('  "main": "index.js",');
            newOutput.push('  "dependencies": {');
            newOutput.push('    "react": "^18.2.0",');
            newOutput.push('    "react-dom": "^18.2.0"');
            newOutput.push('  }');
            newOutput.push('}');
          } else {
            newOutput.push(`File not found: ${fileName}`);
          }
        } else {
          newOutput.push(`Command not recognized: ${command}`);
          newOutput.push('Type "help" for available commands');
        }
    }
    
    newOutput.push('> ');
    setTerminalOutput(newOutput);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const clearTerminal = () => {
    setTerminalOutput(['Horizon Terminal v1.0.0', '> ']);
    setCurrentInput('');
  };

  const copyTerminalContent = () => {
    const content = terminalOutput.join('\n');
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Terminal content has been copied to your clipboard.",
    });
  };

  const runCode = () => {
    executeCommand('run');
  };

  const closeTerminal = () => {
    setIsTerminalOpen(false);
  };

  return (
    <div className="glass-panel p-2 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <TerminalIcon size={14} className="text-cyan-400 mr-2" />
          <span className="text-xs font-mono text-cyan-400">Terminal</span>
        </div>
        <div className="flex space-x-1">
          <button 
            className="p-1 rounded hover:bg-white/10"
            title="Run code"
            onClick={runCode}
            disabled={isExecuting}
          >
            <Play size={12} className={`${isExecuting ? 'text-gray-400' : 'text-green-400'}`} />
          </button>
          <button 
            className="p-1 rounded hover:bg-white/10"
            title="Copy content"
            onClick={copyTerminalContent}
          >
            <Copy size={12} className="text-cyan-400" />
          </button>
          <button 
            className="p-1 rounded hover:bg-white/10"
            title="Clear terminal"
            onClick={clearTerminal}
          >
            <Trash size={12} className="text-gray-400" />
          </button>
          <button 
            className="p-1 rounded hover:bg-white/10"
            title="Close terminal"
            onClick={closeTerminal}
          >
            <XCircle size={12} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 bg-black/30 rounded p-2 overflow-auto mb-2 font-mono text-xs text-green-300"
      >
        {terminalOutput.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
            {index === terminalOutput.length - 1 && !isExecuting && (
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-green-300 font-mono text-xs w-auto inline-block"
                autoFocus
                disabled={isExecuting}
              />
            )}
            {index === terminalOutput.length - 1 && isExecuting && (
              <span className="animate-pulse">█</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
